import React, { useState } from 'react';
import {
  ShieldCheck,
  MapPin,
  Truck,
  Phone,
  Clock,
  Star,
  Layers,
  ArrowRight,
  Filter,
  CheckCircle2,
  X,
  PhoneCall,
  Calendar,
} from 'lucide-react';
import { RecyclerEntity, MaterialCategory } from '../../types';
import { db } from '../../services/database';
import { translations, materialTranslations } from '../../localization/translations';
import { AppLanguage } from '../../types';

interface RecyclerDiscoveryProps {
  language: AppLanguage;
  onRequestOfferForLot?: (recycler: RecyclerEntity) => void;
}

export const RecyclerDiscovery: React.FC<RecyclerDiscoveryProps> = ({
  language,
  onRequestOfferForLot,
}) => {
  const t = translations[language];
  const recyclers = db.getRecyclers();

  const [selectedRecycler, setSelectedRecycler] = useState<RecyclerEntity | null>(null);
  const [filterMaterial, setFilterMaterial] = useState<string>('ALL');
  const [filterPickupOnly, setFilterPickupOnly] = useState<boolean>(false);
  const [requestSuccessNotice, setRequestSuccessNotice] = useState<string | null>(null);

  const filteredRecyclers = recyclers.filter((r) => {
    if (filterPickupOnly && !r.pickupAvailable) return false;
    if (filterMaterial !== 'ALL' && !r.acceptedMaterials.includes(filterMaterial as MaterialCategory)) {
      return false;
    }
    return true;
  });

  const handleRequestOffer = (r: RecyclerEntity) => {
    setRequestSuccessNotice(`${t.offerRequested}: ${r.name}`);
    setTimeout(() => setRequestSuccessNotice(null), 4000);
    if (onRequestOfferForLot) {
      onRequestOfferForLot(r);
    }
  };

  return (
    <div className="w-full max-w-md sm:max-w-lg mx-auto space-y-4 pb-20">
      {/* Header */}
      <div className="bg-white p-4 rounded-2xl border border-blue-100 shadow-xs">
        <h1 className="text-xl font-extrabold text-blue-950">{t.findRecyclerTitle}</h1>
        <p className="text-xs text-blue-800/70 mt-0.5">
          {t.govtCertifiedFacilities}
        </p>

        {/* Filter controls */}
        <div className="mt-3 flex flex-wrap gap-2">
          <select
            value={filterMaterial}
            onChange={(e) => setFilterMaterial(e.target.value)}
            className="bg-blue-50/50 border border-blue-200 rounded-xl px-3 py-1.5 text-xs font-bold text-blue-950"
          >
            <option value="ALL">{t.allMaterialsAccepted}</option>
            <option value="PCB">{materialTranslations[language]['PCB'] || 'PCB'}</option>
            <option value="Copper Cable">{materialTranslations[language]['Copper Cable'] || 'Copper Cable'}</option>
            <option value="Batteries">{materialTranslations[language]['Batteries'] || 'Batteries'}</option>
            <option value="Motors">{materialTranslations[language]['Motors'] || 'Motors'}</option>
            <option value="Computers">{materialTranslations[language]['Computers'] || 'Computers'}</option>
          </select>

          <button
            onClick={() => setFilterPickupOnly((prev) => !prev)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
              filterPickupOnly
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-blue-50 text-blue-800 border border-blue-200'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>{t.doorstepPickupOnly}</span>
          </button>
        </div>
      </div>

      {/* Success Notification Banner */}
      {requestSuccessNotice && (
        <div className="p-3 bg-blue-50 border border-blue-300 rounded-xl text-xs font-bold text-blue-900 flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
          <span>{requestSuccessNotice}</span>
        </div>
      )}

      {/* Recyclers List */}
      <div className="space-y-3">
        {filteredRecyclers.map((rec) => (
          <div
            key={rec.id}
            className="bg-white rounded-2xl p-4 border border-blue-100 shadow-xs hover:border-blue-500 transition space-y-3"
          >
            {/* Top Info */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase">
                    <ShieldCheck className="w-3 h-3 text-blue-600" />
                    {t.authorizedBadge}
                  </span>
                  <span className="text-xs text-blue-800/70 font-bold">
                    • {rec.distanceKm} {t.kmAway}
                  </span>
                </div>
                <h3 className="text-base font-bold text-blue-950 mt-1">{rec.name}</h3>
                <p className="text-xs text-blue-800/70 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <span>{rec.serviceArea}</span>
                </p>
              </div>

              <div className="text-right">
                <div className="inline-flex items-center gap-1 bg-blue-50 text-blue-800 px-2 py-0.5 rounded-lg text-xs font-bold border border-blue-200">
                  <Star className="w-3.5 h-3.5 fill-blue-600 text-blue-600" />
                  <span>{rec.rating}</span>
                </div>
              </div>
            </div>

            {/* Official Registration Number */}
            <div className="bg-blue-50/50 p-2.5 rounded-xl border border-blue-100 text-xs flex justify-between items-center">
              <span className="text-blue-800/70 font-medium">{t.authLicense}:</span>
              <span className="font-mono font-bold text-blue-950">{rec.authorizationNumber}</span>
            </div>

            {/* Accepted Materials Tags */}
            <div>
              <div className="text-[11px] font-bold text-blue-800/70 uppercase mb-1">
                {t.materialsAccepted}:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {rec.acceptedMaterials.map((mat) => (
                  <span
                    key={mat}
                    className="bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-lg text-xs font-semibold"
                  >
                    {materialTranslations[language][mat] || mat}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-2 border-t border-blue-100 flex items-center justify-between gap-2">
              <button
                onClick={() => setSelectedRecycler(rec)}
                className="py-2 px-3 text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-xl transition cursor-pointer"
              >
                {t.viewDetails}
              </button>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${rec.phone}`}
                  className="p-2 border border-blue-200 rounded-xl text-blue-700 hover:bg-blue-50 transition cursor-pointer"
                  title="Call Recycler"
                >
                  <PhoneCall className="w-4 h-4 text-blue-600" />
                </a>
                <button
                  onClick={() => handleRequestOffer(rec)}
                  className="py-2 px-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition active:scale-95 cursor-pointer"
                >
                  {t.requestOffer}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recycler Details Modal */}
      {selectedRecycler && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center p-0 sm:p-4 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-t-2xl sm:rounded-2xl max-h-[90vh] flex flex-col shadow-2xl border border-blue-200 overflow-hidden">
            {/* Modal Header */}
            <div className="bg-white px-5 py-4 border-b border-blue-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                  {selectedRecycler.authorizingBody}
                </span>
                <h2 className="text-base font-bold text-blue-950 mt-0.5">
                  {selectedRecycler.name}
                </h2>
              </div>
              <button
                onClick={() => setSelectedRecycler(null)}
                className="p-2 text-blue-700 hover:text-blue-950 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto space-y-4 flex-1 text-sm text-blue-950">
              {/* Government Accreditation Card */}
              <div className="bg-white p-4 rounded-xl border border-blue-200 space-y-2">
                <div className="text-xs font-bold text-blue-800/70 uppercase">{t.accreditationDetails}</div>
                <div className="flex justify-between py-1 border-b border-blue-50 text-xs">
                  <span className="text-blue-800/70">{t.registrationNo}:</span>
                  <span className="font-mono font-bold text-blue-950">{selectedRecycler.authorizationNumber}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-blue-50 text-xs">
                  <span className="text-blue-800/70">{t.regulatingBoard}:</span>
                  <span className="font-semibold text-blue-950">{selectedRecycler.authorizingBody}</span>
                </div>
                <div className="flex justify-between py-1 text-xs">
                  <span className="text-blue-800/70">{t.validTill}:</span>
                  <span className="font-semibold text-blue-700">
                    {selectedRecycler.authorizationExpiry}
                  </span>
                </div>
              </div>

              {/* Facility & Contact */}
              <div className="bg-white p-4 rounded-xl border border-blue-200 space-y-2">
                <div className="text-xs font-bold text-blue-800/70 uppercase">{t.facilityDetails}</div>
                <div className="text-xs space-y-1">
                  <div className="flex items-start gap-1.5">
                    <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{selectedRecycler.facilityLocation}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span>{selectedRecycler.workingHours}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-blue-600" />
                    <span>
                      {selectedRecycler.pickupAvailable
                        ? `${t.pickupAvailable} (${t.minPickupWeight}: ${selectedRecycler.minPickupWeightKg} ${t.kgUnit})`
                        : t.dropOffOnly}
                    </span>
                  </div>
                </div>
              </div>

              {/* Verified Rates */}
              <div className="bg-white p-4 rounded-xl border border-blue-200 space-y-2">
                <div className="text-xs font-bold text-blue-800/70 uppercase">{t.directBuyingRates}</div>
                <div className="divide-y divide-blue-50 text-xs">
                  {Object.entries(selectedRecycler.currentRates).map(([material, rate]) => (
                    <div key={material} className="py-2 flex justify-between items-center">
                      <span className="font-medium">{materialTranslations[language][material as MaterialCategory] || material}</span>
                      <span className="font-bold text-blue-600 text-sm">₹{rate} / {t.kgUnit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-4 bg-white border-t border-blue-100 flex gap-2">
              <a
                href={`tel:${selectedRecycler.phone}`}
                className="py-3 px-4 rounded-xl border border-blue-200 text-blue-950 font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-50 transition cursor-pointer"
              >
                <Phone className="w-4 h-4 text-blue-600" />
                {t.callRecycler}
              </a>
              <button
                onClick={() => {
                  handleRequestOffer(selectedRecycler);
                  setSelectedRecycler(null);
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition cursor-pointer"
              >
                <Truck className="w-4 h-4" />
                {t.requestOffer}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
