import React, { useState } from 'react';
import {
  X,
  Send,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  Scale,
  Banknote,
} from 'lucide-react';
import { MaterialLot, RecyclerOffer, RecyclerEntity, MaterialCategory, AppLanguage } from '../../types';
import { translations, materialTranslations } from '../../localization/translations';
import { db } from '../../services/database';

interface MakeOfferModalProps {
  lot: MaterialLot;
  language: AppLanguage;
  recycler: RecyclerEntity;
  onClose: () => void;
  onOfferSent: (offer: RecyclerOffer) => void;
}

export const MakeOfferModal: React.FC<MakeOfferModalProps> = ({
  lot,
  language,
  recycler,
  onClose,
  onOfferSent,
}) => {
  const t = translations[language];

  // Default price from recycler current rates or estimated
  const defaultRate =
    recycler.currentRates[lot.materialCategory] || lot.estimatedPricePerKg || 185;

  const [pricePerKg, setPricePerKg] = useState<number>(defaultRate);
  const [pickupAvailable, setPickupAvailable] = useState<boolean>(recycler.pickupAvailable);
  const [proposedPickupDate, setProposedPickupDate] = useState<string>(
    new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [notes, setNotes] = useState<string>(
    language === 'hi'
      ? 'कैलिब्रेटेड डिजिटल वजन तराजू के साथ घर/दुकान से उठाव।'
      : language === 'mr'
      ? 'कॅलिब्रेटेड डिजिटल वजन काट्यासह जागेवरून उचल.'
      : 'Doorstep collection with calibrated digital weighing scale.'
  );

  const totalCalculated = Math.round(lot.weightKg * pricePerKg);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pricePerKg <= 0) return;

    const offer = db.makeOffer({
      lotId: lot.id,
      recyclerId: recycler.id,
      recyclerName: recycler.name,
      pricePerKg,
      offeredTotal: totalCalculated,
      pickupAvailable,
      proposedPickupDate,
      notes,
    });

    onOfferSent(offer);
  };

  const matName = materialTranslations[language][lot.materialCategory as MaterialCategory] || lot.materialCategory;
  const modalTitle =
    language === 'hi'
      ? `${matName} के लिए खरीद ऑफर दें`
      : language === 'mr'
      ? `${matName} साठी खरेदी ऑफर द्या`
      : `Make Buying Offer for ${lot.materialCategory}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center p-0 sm:p-4 backdrop-blur-xs">
      <div className="bg-blue-50/40 w-full max-w-md sm:max-w-lg rounded-t-2xl sm:rounded-2xl max-h-[92vh] flex flex-col shadow-2xl border border-blue-200 overflow-hidden">
        {/* Header */}
        <div className="bg-white px-5 py-4 border-b border-blue-100 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-blue-600">{lot.id}</span>
              <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full font-bold">
                {lot.weightKg} {t.kgUnit}
              </span>
            </div>
            <h2 className="text-base font-bold text-blue-950 mt-0.5">
              {modalTitle}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-blue-900/60 hover:text-blue-950 hover:bg-blue-50 rounded-full cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4 flex-1">
          {/* Lot Summary Card */}
          <div className="bg-white p-3.5 rounded-xl border border-blue-200 flex items-center gap-3">
            <img
              src={lot.photoUrl}
              alt={lot.materialCategory}
              className="w-14 h-14 rounded-lg object-cover border border-blue-200 shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="text-xs space-y-0.5">
              <div className="font-bold text-sm text-blue-950">{matName}</div>
              <div className="text-blue-900/70">
                {t.scaleWeight}: <strong>{lot.weightKg} {t.kgUnit}</strong> • {t.location}: <strong>{lot.location.areaName}</strong>
              </div>
              <div className="text-blue-900/70">
                {t.scrapCollector}: <strong>{lot.collectorName}</strong>
              </div>
            </div>
          </div>

          {/* Pricing Calculation Input */}
          <div className="bg-white p-4 rounded-xl border border-blue-200 space-y-3">
            <div>
              <label className="block text-xs font-bold text-blue-900/70 uppercase mb-1">
                {t.enterOfferPrice}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-lg font-bold text-blue-900/60">₹</span>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={pricePerKg}
                  onChange={(e) => setPricePerKg(parseFloat(e.target.value) || 0)}
                  className="w-full pl-8 pr-16 py-2.5 bg-blue-50/60 border border-blue-200 rounded-xl text-lg font-black text-blue-950 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
                <span className="absolute right-3.5 top-3.5 text-xs font-bold text-blue-900/60">
                  / {t.kgUnit}
                </span>
              </div>
            </div>

            {/* Quick Price Buttons */}
            <div className="flex gap-2">
              {[defaultRate - 10, defaultRate, defaultRate + 10, defaultRate + 20].map((rate) => (
                <button
                  key={rate}
                  type="button"
                  onClick={() => setPricePerKg(rate)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    pricePerKg === rate
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100'
                  }`}
                >
                  ₹{rate}
                </button>
              ))}
            </div>

            {/* Total Highlight */}
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-blue-950 block">{t.calculateTotal}</span>
                <span className="text-[11px] text-blue-700">
                  {lot.weightKg} {t.kgUnit} × ₹{pricePerKg}/{t.kgUnit}
                </span>
              </div>
              <div className="text-2xl font-black text-blue-600">
                ₹{totalCalculated.toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          {/* Pickup logistics */}
          <div className="bg-white p-4 rounded-xl border border-blue-200 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-blue-950">{t.doorstepPickup}</label>
              <input
                type="checkbox"
                checked={pickupAvailable}
                onChange={(e) => setPickupAvailable(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-blue-300"
              />
            </div>

            {pickupAvailable && (
              <div>
                <label className="block text-xs font-bold text-blue-900/70 uppercase mb-1">
                  {t.proposedPickupDate}
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 w-4 h-4 text-blue-900/60" />
                  <input
                    type="date"
                    value={proposedPickupDate}
                    onChange={(e) => setProposedPickupDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-blue-50/60 border border-blue-200 rounded-xl text-xs font-bold text-blue-950"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-blue-900/70 uppercase mb-1">
                {t.notesForCollector}
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={
                  language === 'hi'
                    ? 'उदा. डिजिटल तराजू साथ में है, तुरंत नकद भुगतान'
                    : language === 'mr'
                    ? 'उदा. डिजिटल वजन काटा सोबत आहे, त्वरित रोख भरणा'
                    : 'e.g. Weighing scale calibrated, immediate cash payment'
                }
                className="w-full p-2.5 bg-blue-50/60 border border-blue-200 rounded-xl text-xs text-blue-950 placeholder:text-blue-900/40"
              />
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm rounded-xl shadow-xs transition active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>{t.sendOfferBtn} (₹{totalCalculated})</span>
          </button>
        </form>
      </div>
    </div>
  );
};
