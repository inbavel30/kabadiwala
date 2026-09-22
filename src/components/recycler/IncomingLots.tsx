import React, { useState } from 'react';
import {
  Package,
  Filter,
  MapPin,
  Calendar,
  Send,
  ArrowRight,
  Eye,
  CheckCircle2,
} from 'lucide-react';
import { MaterialLot, MaterialCategory, RecyclerEntity } from '../../types';
import { db } from '../../services/database';
import { translations, materialTranslations } from '../../localization/translations';
import { AppLanguage } from '../../types';
import { MakeOfferModal } from './MakeOfferModal';
import { LotDetailsModal } from '../collector/LotDetailsModal';

interface IncomingLotsProps {
  language: AppLanguage;
  recycler: RecyclerEntity;
}

export const IncomingLots: React.FC<IncomingLotsProps> = ({ language, recycler }) => {
  const t = translations[language];
  const [selectedLotForOffer, setSelectedLotForOffer] = useState<MaterialLot | null>(null);
  const [selectedLotForDetails, setSelectedLotForDetails] = useState<MaterialLot | null>(null);
  const [filterMaterial, setFilterMaterial] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const lots = db.getLots();

  const filteredLots = lots.filter((lot) => {
    if (filterMaterial !== 'ALL' && lot.materialCategory !== filterMaterial) return false;
    if (filterStatus !== 'ALL' && lot.status !== filterStatus) return false;
    return true;
  });

  const getStatusText = (status: string) => {
    switch (status) {
      case 'READY': return t.readyForQuotes;
      case 'QUOTED': return t.offersMade;
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
      <div className="bg-white p-4 rounded-2xl border border-blue-200 shadow-xs">
        <h1 className="text-xl font-extrabold text-blue-950">{t.incomingLots}</h1>
        <p className="text-xs text-blue-900/70 mt-0.5">{t.incomingLotsSubtitle}</p>

        {/* Filter row */}
        <div className="mt-3 flex flex-wrap gap-2">
          <select
            value={filterMaterial}
            onChange={(e) => setFilterMaterial(e.target.value)}
            className="bg-blue-50 border border-blue-200 rounded-xl px-3 py-1.5 text-xs font-bold text-blue-950 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">{t.allMaterialsFilter}</option>
            <option value="PCB">{materialTranslations[language]['PCB']}</option>
            <option value="Copper Cable">{materialTranslations[language]['Copper Cable']}</option>
            <option value="Batteries">{materialTranslations[language]['Batteries']}</option>
            <option value="Motors">{materialTranslations[language]['Motors']}</option>
            <option value="Computers">{materialTranslations[language]['Computers']}</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-blue-50 border border-blue-200 rounded-xl px-3 py-1.5 text-xs font-bold text-blue-950 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">{t.allStatuses}</option>
            <option value="READY">{t.readyForQuotes}</option>
            <option value="QUOTED">{t.offersMade}</option>
            <option value="PICKUP_SCHEDULED">{t.scheduledAndInTransit}</option>
            <option value="COMPLETED">{t.completedAndPaid}</option>
          </select>
        </div>
      </div>

      {/* Success Notification */}
      {successNotice && (
        <div className="p-3 bg-blue-50 border border-blue-300 rounded-xl text-xs font-bold text-blue-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
          <span>{successNotice}</span>
        </div>
      )}

      {/* Lots Grid */}
      <div className="space-y-3">
        {filteredLots.map((lot) => {
          const isQuotedByThis = lot.selectedRecyclerId === recycler.id;

          return (
            <div
              key={lot.id}
              className="bg-white rounded-2xl p-4 border border-blue-200 shadow-xs hover:border-blue-600 transition space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={lot.photoUrl}
                    alt={lot.materialCategory}
                    className="w-16 h-16 rounded-xl object-cover border border-blue-200 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-xs font-extrabold text-blue-600">{lot.id}</span>
                      <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.2 rounded-full border border-blue-200">
                        {getStatusText(lot.status)}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-blue-950 mt-0.5">
                      {materialTranslations[language][lot.materialCategory as MaterialCategory] || lot.materialCategory}
                    </h3>
                    <p className="text-xs text-blue-900/70">
                      {t.scaleWeight}: <strong className="text-blue-950">{lot.weightKg} {t.kgUnit}</strong>
                    </p>
                    <p className="text-[11px] text-blue-900/70 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-blue-600" />
                      <span className="truncate max-w-[170px]">{lot.location.areaName}</span>
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-base font-black text-blue-600">
                    ₹{(lot.finalTotalAmount || lot.estimatedTotalValue).toLocaleString('en-IN')}
                  </div>
                  <div className="text-[10px] text-blue-900/60">
                    ~₹{lot.estimatedPricePerKg}/{t.kgUnit}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-blue-100 flex items-center justify-between">
                <button
                  onClick={() => setSelectedLotForDetails(lot)}
                  className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{t.inspectDetails}</span>
                </button>

                {lot.status === 'READY' || lot.status === 'QUOTED' ? (
                  <button
                    onClick={() => setSelectedLotForOffer(lot)}
                    className="py-2 px-3.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition active:scale-95 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isQuotedByThis ? t.reviseOffer : t.makeOfferBtn}</span>
                  </button>
                ) : (
                  <span className="text-xs text-blue-900/70 font-semibold">
                    {lot.status === 'COMPLETED' ? t.completedAndPaid : t.underLogistics}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Offer Modal */}
      {selectedLotForOffer && (
        <MakeOfferModal
          lot={selectedLotForOffer}
          language={language}
          recycler={recycler}
          onClose={() => setSelectedLotForOffer(null)}
          onOfferSent={(offer) => {
            setSelectedLotForOffer(null);
            setSuccessNotice(
              language === 'hi'
                ? `कबाड़ीवाले को ₹${offer.offeredTotal} का ऑफर सफलतापूर्वक भेजा गया!`
                : language === 'mr'
                ? `कबाडीवाल्याला ₹${offer.offeredTotal} ची ऑफर यशस्वीरित्या पाठवली!`
                : `Offer of ₹${offer.offeredTotal} successfully sent to collector!`
            );
            setTimeout(() => setSuccessNotice(null), 4000);
          }}
        />
      )}

      {/* Inspect Lot Details Modal */}
      {selectedLotForDetails && (
        <LotDetailsModal
          lot={selectedLotForDetails}
          language={language}
          onClose={() => setSelectedLotForDetails(null)}
        />
      )}
    </div>
  );
};
