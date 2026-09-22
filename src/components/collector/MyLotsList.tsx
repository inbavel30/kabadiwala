import React, { useState } from 'react';
import {
  Package,
  Filter,
  CheckCircle2,
  Clock,
  Truck,
  ArrowRight,
  Plus,
  RefreshCw,
} from 'lucide-react';
import { MaterialLot, LotStatus } from '../../types';
import { db } from '../../services/database';
import { translations, materialTranslations } from '../../localization/translations';
import { AppLanguage } from '../../types';
import { LotDetailsModal } from './LotDetailsModal';

interface MyLotsListProps {
  language: AppLanguage;
  onCreateNewLot: () => void;
  onOpenHandover: (lot: MaterialLot) => void;
}

type FilterOption = 'ALL' | LotStatus | 'SYNC_PENDING';

export const MyLotsList: React.FC<MyLotsListProps> = ({
  language,
  onCreateNewLot,
  onOpenHandover,
}) => {
  const t = translations[language];
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>('ALL');
  const [selectedLot, setSelectedLot] = useState<MaterialLot | null>(null);
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const lots = db.getLots();

  const filteredLots = lots.filter((lot) => {
    if (selectedFilter === 'ALL') return true;
    if (selectedFilter === 'SYNC_PENDING') return lot.syncStatus === 'PENDING';
    return lot.status === selectedFilter;
  });

  const handleAcceptOffer = (offerId: string, lotId: string) => {
    db.acceptOffer(offerId, lotId);
    setRefreshKey((k) => k + 1);
    const updated = db.getLotById(lotId);
    if (updated) {
      setSelectedLot(updated);
    }
  };

  const getStatusBadge = (status: MaterialLot['status'], syncStatus: MaterialLot['syncStatus']) => {
    if (syncStatus === 'PENDING') {
      return (
        <span className="bg-blue-100 text-blue-900 border border-blue-200 px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1">
          <RefreshCw className="w-2.5 h-2.5 animate-spin text-blue-700" />
          {t.syncPendingFilter}
        </span>
      );
    }

    switch (status) {
      case 'DRAFT':
        return <span className="bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded-full text-[11px] font-bold">{t.statusDraft}</span>;
      case 'READY':
        return <span className="bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full text-[11px] font-bold">{t.statusReady}</span>;
      case 'QUOTED':
        return <span className="bg-blue-100 text-blue-900 border border-blue-300 px-2 py-0.5 rounded-full text-[11px] font-bold">{t.statusQuoted}</span>;
      case 'PICKUP_REQUESTED':
        return <span className="bg-blue-100 text-blue-800 border border-blue-200 px-2 py-0.5 rounded-full text-[11px] font-bold">{t.statusPickupRequested}</span>;
      case 'PICKUP_SCHEDULED':
        return <span className="bg-blue-600 text-white px-2 py-0.5 rounded-full text-[11px] font-bold">{t.statusPickupScheduled}</span>;
      case 'COLLECTED':
        return <span className="bg-blue-700 text-white px-2 py-0.5 rounded-full text-[11px] font-bold">{t.statusCollected}</span>;
      case 'HANDOVER_PENDING':
        return <span className="bg-blue-100 text-blue-900 border border-blue-300 px-2 py-0.5 rounded-full text-[11px] font-bold">{t.statusHandoverPending}</span>;
      case 'COMPLETED':
        return (
          <span className="bg-blue-50 text-blue-700 border border-blue-300 px-2 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-0.5">
            <CheckCircle2 className="w-3 h-3 text-blue-600" /> {t.statusCompleted}
          </span>
        );
      default:
        return <span className="bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded-full text-[11px] font-bold">{status}</span>;
    }
  };

  const filters: { id: FilterOption; label: string }[] = [
    { id: 'ALL', label: t.allFilter },
    { id: 'READY', label: t.statusReady },
    { id: 'QUOTED', label: t.quotedFilter },
    { id: 'PICKUP_SCHEDULED', label: t.pickupScheduledFilter },
    { id: 'COMPLETED', label: t.completedFilter },
    { id: 'SYNC_PENDING', label: t.syncPendingFilter },
  ];

  return (
    <div className="w-full max-w-md sm:max-w-lg mx-auto space-y-4 pb-20">
      {/* Top Banner */}
      <div className="bg-white p-4 rounded-2xl border border-blue-200 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-blue-950">{t.myLots}</h1>
          <p className="text-xs text-blue-900/70 mt-0.5">
            {lots.length} {t.myLots}
          </p>
        </div>
        <button
          onClick={onCreateNewLot}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{t.addLot}</span>
        </button>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setSelectedFilter(f.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition cursor-pointer ${
              selectedFilter === f.id
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-blue-900/70 border border-blue-200 hover:bg-blue-50'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Lots List */}
      <div className="space-y-3">
        {filteredLots.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-blue-200 text-center space-y-3">
            <Package className="w-12 h-12 text-blue-300 mx-auto" />
            <p className="text-sm font-semibold text-blue-900/70">{t.noLotsFound}</p>
            <button
              onClick={onCreateNewLot}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              {t.createNewLot}
            </button>
          </div>
        ) : (
          filteredLots.map((lot) => {
            const translatedCat = materialTranslations[language][lot.materialCategory] || lot.materialCategory;
            return (
              <div
                key={lot.id}
                onClick={() => setSelectedLot(lot)}
                className="bg-white rounded-2xl p-4 border border-blue-200 shadow-xs hover:border-blue-600 transition cursor-pointer flex flex-col gap-2.5 active:scale-[0.99]"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={lot.photoUrl}
                      alt={lot.materialCategory}
                      className="w-14 h-14 rounded-xl object-cover border border-blue-200 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-blue-600">{lot.id}</span>
                        {getStatusBadge(lot.status, lot.syncStatus)}
                      </div>
                      <h3 className="text-sm font-bold text-blue-950 mt-0.5 line-clamp-1">
                        {translatedCat}
                      </h3>
                      <p className="text-xs text-blue-900/70">
                        {t.approxWeightKg}: <strong className="text-blue-950">{lot.weightKg} {t.kgUnit}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-base font-extrabold text-blue-600">
                      ₹{(lot.finalTotalAmount || lot.estimatedTotalValue).toLocaleString('en-IN')}
                    </div>
                    <div className="text-[10px] text-blue-900/60">
                      {new Date(lot.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                </div>

                {/* Bottom details / Active offer alert */}
                <div className="pt-2 border-t border-blue-100 flex items-center justify-between text-xs">
                  <div className="text-blue-900/70 flex items-center gap-1 truncate max-w-[220px]">
                    {lot.selectedRecyclerName ? (
                      <span className="text-blue-700 font-semibold">{lot.selectedRecyclerName}</span>
                    ) : (
                      <span>{t.awaitingQuotes}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 font-bold text-blue-600">
                    <span>{t.viewDetails}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Lot Details Modal */}
      {selectedLot && (
        <LotDetailsModal
          lot={selectedLot}
          language={language}
          onClose={() => setSelectedLot(null)}
          onOpenHandover={(lot) => {
            setSelectedLot(null);
            onOpenHandover(lot);
          }}
          onAcceptOffer={handleAcceptOffer}
        />
      )}
    </div>
  );
};
