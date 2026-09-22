import React, { useState } from 'react';
import {
  Truck,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Scale,
  Receipt,
  AlertCircle,
  X,
} from 'lucide-react';
import { MaterialLot, RecyclerEntity, MaterialCategory, AppLanguage } from '../../types';
import { db } from '../../services/database';
import { translations, materialTranslations } from '../../localization/translations';
import { DigitalHandoverModal } from '../collector/DigitalHandoverModal';

interface RecyclerPickupsProps {
  language: AppLanguage;
  recycler: RecyclerEntity;
}

export const RecyclerPickups: React.FC<RecyclerPickupsProps> = ({ language, recycler }) => {
  const t = translations[language];
  const [activeTab, setActiveTab] = useState<'pending' | 'scheduled' | 'completed'>('scheduled');
  const [selectedLotForHandover, setSelectedLotForHandover] = useState<MaterialLot | null>(null);
  const [scheduleLot, setScheduleLot] = useState<MaterialLot | null>(null);
  const [pickupDate, setPickupDate] = useState<string>(
    new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [pickupSlot, setPickupSlot] = useState<string>('Morning (10:00 AM - 01:00 PM)');
  const [vehicleNo, setVehicleNo] = useState<string>('MH-04-AZ-2811');
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const lots = db.getLots();

  // Pickups where this recycler is involved or matched
  const pickups = lots.filter(
    (l) =>
      l.status === 'PICKUP_REQUESTED' ||
      l.status === 'PICKUP_SCHEDULED' ||
      l.status === 'COLLECTED' ||
      l.status === 'HANDOVER_PENDING' ||
      l.status === 'COMPLETED'
  );

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scheduleLot) return;

    db.schedulePickup(scheduleLot.id, pickupDate, pickupSlot, `Carrier vehicle: ${vehicleNo}`);
    setScheduleLot(null);
    setRefreshKey((k) => k + 1);
  };

  const handleMarkCollected = (lotId: string) => {
    db.markCollected(lotId);
    setRefreshKey((k) => k + 1);
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PICKUP_REQUESTED': return t.pickupRequests;
      case 'PICKUP_SCHEDULED': return t.scheduledAndInTransit;
      case 'COLLECTED': return t.underLogistics;
      case 'HANDOVER_PENDING': return t.pendingHandovers;
      case 'COMPLETED': return t.completedAndPaid;
      default: return status.replace(/_/g, ' ');
    }
  };

  return (
    <div className="w-full max-w-md sm:max-w-lg mx-auto space-y-4 pb-20">
      {/* Top Banner */}
      <div className="bg-white p-4 rounded-2xl border border-blue-100 shadow-xs">
        <h1 className="text-xl font-extrabold text-blue-950">{t.pickupsTitle}</h1>
        <p className="text-xs text-blue-800/70 mt-0.5">
          {language === 'hi'
            ? 'लॉजिस्टिक्स प्रेषण, घर से तौल और डिजिटल हस्तांतरण सत्यापन'
            : language === 'mr'
            ? 'लॉजिस्टिक्स पाठवणी, जागेवर वजन आणि डिजिटल हस्तांतरण पडताळणी'
            : 'Logistics dispatch, doorstep weighing & digital handover verification'}
        </p>

        {/* Tab switcher */}
        <div className="flex bg-blue-50/70 p-1 rounded-xl mt-3 border border-blue-200">
          <button
            onClick={() => setActiveTab('scheduled')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition cursor-pointer ${
              activeTab === 'scheduled'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-blue-900 hover:bg-blue-100/60'
            }`}
          >
            {t.scheduledAndInTransit}
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition cursor-pointer ${
              activeTab === 'pending'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-blue-900 hover:bg-blue-100/60'
            }`}
          >
            {t.pickupRequests}
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition cursor-pointer ${
              activeTab === 'completed'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-blue-900 hover:bg-blue-100/60'
            }`}
          >
            {t.completedSales}
          </button>
        </div>
      </div>

      {/* Pickups List */}
      <div className="space-y-3">
        {pickups
          .filter((lot) => {
            if (activeTab === 'pending') return lot.status === 'PICKUP_REQUESTED';
            if (activeTab === 'scheduled') {
              return (
                lot.status === 'PICKUP_SCHEDULED' ||
                lot.status === 'COLLECTED' ||
                lot.status === 'HANDOVER_PENDING'
              );
            }
            if (activeTab === 'completed') return lot.status === 'COMPLETED';
            return true;
          })
          .map((lot) => (
            <div
              key={lot.id}
              className="bg-white rounded-2xl p-4 border border-blue-100 shadow-xs space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-blue-600">{lot.id}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      {getStatusText(lot.status)}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-blue-950 mt-0.5">
                    {materialTranslations[language][lot.materialCategory as MaterialCategory] || lot.materialCategory} • {lot.weightKg} {t.kgUnit}
                  </h3>
                  <div className="text-xs text-blue-800/70 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    <span>{lot.location.areaName}</span>
                  </div>
                  <div className="text-xs text-blue-800/70">
                    {t.scrapCollector}: <strong>{lot.collectorName}</strong> ({lot.collectorPhone})
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-base font-black text-blue-600">
                    ₹{(lot.finalTotalAmount || lot.estimatedTotalValue).toLocaleString('en-IN')}
                  </div>
                  {lot.pickupDate && (
                    <div className="text-[11px] font-bold text-blue-600 mt-0.5">
                      {lot.pickupDate}
                    </div>
                  )}
                </div>
              </div>

              {/* Action buttons depending on status */}
              <div className="pt-2 border-t border-blue-100 flex items-center justify-between gap-2">
                {lot.status === 'PICKUP_REQUESTED' && (
                  <button
                    onClick={() => setScheduleLot(lot)}
                    className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
                  >
                    {t.schedulePickupTitle}
                  </button>
                )}

                {lot.status === 'PICKUP_SCHEDULED' && (
                  <button
                    onClick={() => handleMarkCollected(lot.id)}
                    className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
                  >
                    {t.markCollectedBtn}
                  </button>
                )}

                {(lot.status === 'COLLECTED' || lot.status === 'HANDOVER_PENDING') && (
                  <button
                    onClick={() => setSelectedLotForHandover(lot)}
                    className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Scale className="w-4 h-4" />
                    <span>{t.verifyHandoverBtn}</span>
                  </button>
                )}

                {lot.status === 'COMPLETED' && (
                  <button
                    onClick={() => setSelectedLotForHandover(lot)}
                    className="py-1.5 px-3 bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer"
                  >
                    <Receipt className="w-3.5 h-3.5" />
                    <span>{t.viewQrSlip}</span>
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>

      {/* Schedule Modal */}
      {scheduleLot && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center p-0 sm:p-4 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md sm:max-w-lg rounded-t-2xl sm:rounded-2xl p-5 shadow-2xl border border-blue-200">
            <div className="flex justify-between items-center pb-3 border-b border-blue-100">
              <h3 className="text-base font-bold text-blue-950">
                {language === 'hi'
                  ? `${scheduleLot.id} के लिए वाहन शेड्यूल करें`
                  : language === 'mr'
                  ? `${scheduleLot.id} साठी वाहन शेड्यूल करा`
                  : `Schedule Vehicle for ${scheduleLot.id}`}
              </h3>
              <button onClick={() => setScheduleLot(null)} className="cursor-pointer">
                <X className="w-5 h-5 text-blue-700" />
              </button>
            </div>

            <form onSubmit={handleScheduleSubmit} className="space-y-3 mt-3">
              <div>
                <label className="text-xs font-bold text-blue-900 block mb-1">{t.proposedPickupDate}</label>
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full p-2.5 bg-blue-50/40 border border-blue-200 rounded-xl text-xs font-bold text-blue-950 focus:bg-white focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-blue-900 block mb-1">{t.pickupSlotLabel}</label>
                <select
                  value={pickupSlot}
                  onChange={(e) => setPickupSlot(e.target.value)}
                  className="w-full p-2.5 bg-blue-50/40 border border-blue-200 rounded-xl text-xs font-bold text-blue-950 focus:bg-white focus:ring-2 focus:ring-blue-600"
                >
                  <option value="Morning (10:00 AM - 01:00 PM)">
                    {language === 'hi'
                      ? 'सुबह (10:00 AM - 01:00 PM)'
                      : language === 'mr'
                      ? 'सकाळी (10:00 AM - 01:00 PM)'
                      : 'Morning (10:00 AM - 01:00 PM)'}
                  </option>
                  <option value="Afternoon (02:00 PM - 05:00 PM)">
                    {language === 'hi'
                      ? 'दोपहर (02:00 PM - 05:00 PM)'
                      : language === 'mr'
                      ? 'दुपारी (02:00 PM - 05:00 PM)'
                      : 'Afternoon (02:00 PM - 05:00 PM)'}
                  </option>
                  <option value="Evening (05:00 PM - 07:30 PM)">
                    {language === 'hi'
                      ? 'शाम (05:00 PM - 07:30 PM)'
                      : language === 'mr'
                      ? 'संध्याकाळी (05:00 PM - 07:30 PM)'
                      : 'Evening (05:00 PM - 07:30 PM)'}
                  </option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-blue-900 block mb-1">
                  {language === 'hi' ? 'वाहन / चालक संदर्भ' : language === 'mr' ? 'वाहन / चालक संदर्भ' : 'Vehicle / Driver Ref'}
                </label>
                <input
                  type="text"
                  value={vehicleNo}
                  onChange={(e) => setVehicleNo(e.target.value)}
                  className="w-full p-2.5 bg-blue-50/40 border border-blue-200 rounded-xl text-xs text-blue-950 focus:bg-white focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-xs mt-2 cursor-pointer"
              >
                {t.scheduleBtn}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Handover Verification Modal */}
      {selectedLotForHandover && (
        <DigitalHandoverModal
          lot={selectedLotForHandover}
          language={language}
          onClose={() => setSelectedLotForHandover(null)}
          onHandoverComplete={() => {
            setRefreshKey((k) => k + 1);
          }}
        />
      )}
    </div>
  );
};
