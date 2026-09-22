import React from 'react';
import {
  Plus,
  TrendingUp,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldAlert,
  Flame,
  Volume2,
  RefreshCw,
  Wallet,
  Sparkles,
} from 'lucide-react';
import { db } from '../../services/database';
import { translations, materialTranslations } from '../../localization/translations';
import { AppLanguage, MaterialLot } from '../../types';

interface CollectorHomeProps {
  language: AppLanguage;
  onCreateLot: () => void;
  onNavigateTab: (tab: string) => void;
  onSelectLot: (lot: MaterialLot) => void;
}

export const CollectorHome: React.FC<CollectorHomeProps> = ({
  language,
  onCreateLot,
  onNavigateTab,
  onSelectLot,
}) => {
  const t = translations[language];
  const lots = db.getLots();
  const summary = db.getEarningsSummary();
  const materials = db.getMaterials();
  const recyclers = db.getRecyclers();

  const pendingLotsCount = lots.filter(
    (l) => l.status === 'READY' || l.status === 'QUOTED'
  ).length;
  const pendingPickupsCount = lots.filter(
    (l) => l.status === 'PICKUP_REQUESTED' || l.status === 'PICKUP_SCHEDULED'
  ).length;
  const completedSalesCount = lots.filter((l) => l.status === 'COMPLETED').length;

  // Active actionable lot (e.g. quoted or pickup scheduled)
  const activeLot = lots.find(
    (l) => l.status === 'QUOTED' || l.status === 'PICKUP_SCHEDULED' || l.status === 'HANDOVER_PENDING'
  );

  return (
    <div className="w-full max-w-md sm:max-w-lg mx-auto space-y-4 pb-20">
      {/* GIANT PRIMARY ACTION: + CREATE NEW LOT */}
      <button
        onClick={onCreateLot}
        className="w-full py-4 px-5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl shadow-lg shadow-blue-500/25 font-black text-lg flex items-center justify-between transition-all duration-200 active:scale-98 group cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center group-hover:rotate-90 transition-transform duration-300">
            <Plus className="w-7 h-7 text-white stroke-[2.5]" />
          </div>
          <div className="text-left">
            <div className="text-xs text-blue-100 uppercase tracking-wider font-semibold">
              {t.instantValuationQuotes}
            </div>
            <div className="text-base sm:text-lg font-extrabold">{t.createNewLot}</div>
          </div>
        </div>
        <ArrowRight className="w-6 h-6 text-white/90 group-hover:translate-x-1 transition-transform" />
      </button>

      {/* METRIC CARDS GRID (WHITE & BLUE) */}
      <div className="grid grid-cols-2 gap-3">
        {/* Today's Earnings */}
        <div
          onClick={() => onNavigateTab('earnings')}
          className="bg-white p-4 rounded-2xl border border-blue-200/80 shadow-xs cursor-pointer hover:border-blue-500 hover:shadow-md transition"
        >
          <div className="flex items-center justify-between text-blue-900/70 text-xs font-semibold">
            <span>{t.todayEarnings}</span>
            <Wallet className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-blue-950 mt-1.5">
            ₹{summary.todayEarnings.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-blue-700 font-bold mt-1 flex items-center gap-1">
            <span>{t.passbook}: ₹{summary.totalEarnings.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Pending Lots */}
        <div
          onClick={() => onNavigateTab('lots')}
          className="bg-white p-4 rounded-2xl border border-blue-200/80 shadow-xs cursor-pointer hover:border-blue-500 hover:shadow-md transition"
        >
          <div className="flex items-center justify-between text-blue-900/70 text-xs font-semibold">
            <span>{t.pendingLots}</span>
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-blue-950 mt-1.5">
            {pendingLotsCount}
          </div>
          <div className="text-[11px] text-blue-600/80 font-bold mt-1">
            {t.waitingForOffers}
          </div>
        </div>

        {/* Pickups */}
        <div
          onClick={() => onNavigateTab('lots')}
          className="bg-white p-4 rounded-2xl border border-blue-200/80 shadow-xs cursor-pointer hover:border-blue-500 hover:shadow-md transition"
        >
          <div className="flex items-center justify-between text-blue-900/70 text-xs font-semibold">
            <span>{t.pickupsPending}</span>
            <Truck className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-blue-950 mt-1.5">
            {pendingPickupsCount}
          </div>
          <div className="text-[11px] text-blue-600 font-bold mt-1">
            {t.scheduledVehicles}
          </div>
        </div>

        {/* Completed Transactions */}
        <div
          onClick={() => onNavigateTab('earnings')}
          className="bg-white p-4 rounded-2xl border border-blue-200/80 shadow-xs cursor-pointer hover:border-blue-500 hover:shadow-md transition"
        >
          <div className="flex items-center justify-between text-blue-900/70 text-xs font-semibold">
            <span>{t.completedTransactions}</span>
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-blue-950 mt-1.5">
            {completedSalesCount}
          </div>
          <div className="text-[11px] text-blue-700 font-bold mt-1">
            {t.verifiedAndSettled}
          </div>
        </div>
      </div>

      {/* ACTIVE LOT NOTIFICATION (if any actionable lot) */}
      {activeLot && (
        <div
          onClick={() => onSelectLot(activeLot)}
          className="bg-blue-50 border-2 border-blue-300 p-4 rounded-2xl shadow-xs cursor-pointer flex items-center justify-between gap-3 animate-fadeIn"
        >
          <div className="flex items-center gap-3">
            <img
              src={activeLot.photoUrl}
              alt={activeLot.materialCategory}
              className="w-12 h-12 rounded-xl object-cover border border-blue-200"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-xs font-extrabold text-blue-950">
                  {activeLot.id}
                </span>
                <span className="bg-blue-600 text-white px-2 py-0.2 rounded-full text-[10px] font-bold">
                  {activeLot.status.replace(/_/g, ' ')}
                </span>
              </div>
              <div className="text-xs font-bold text-blue-950 mt-0.5">
                {materialTranslations[language][activeLot.materialCategory] || activeLot.materialCategory} ({activeLot.weightKg} {t.kgUnit})
              </div>
              <div className="text-[11px] text-blue-700 font-medium">
                {activeLot.selectedRecyclerName ? `${t.offers}: ${activeLot.selectedRecyclerName}` : t.viewDetails}
              </div>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-blue-700 shrink-0" />
        </div>
      )}

      {/* MARKET SCRAP RATES SNAPSHOT WITH REAL-TIME ELECTRICAL COMPONENT PHOTOS */}
      <div className="bg-white p-4 rounded-2xl border border-blue-200/80 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-extrabold text-blue-950 flex items-center gap-1.5">
              <span>{t.priceBoardSnapshot}</span>
            </h2>
            <p className="text-xs text-blue-900/70">{t.cpcbCompliance}</p>
          </div>
          <button
            onClick={() => onNavigateTab('prices')}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 underline underline-offset-2 flex items-center gap-1"
          >
            {t.viewAllPrices} →
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {materials.slice(0, 4).map((mat) => {
            const translated = materialTranslations[language][mat.category] || mat.name;
            return (
              <div
                key={mat.id}
                onClick={() => onNavigateTab('prices')}
                className="bg-blue-50/40 p-2.5 rounded-xl border border-blue-200/70 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition group flex flex-col justify-between"
              >
                <div className="h-20 w-full rounded-lg overflow-hidden relative mb-2 bg-slate-100 border border-blue-100">
                  {mat.imageUrl ? (
                    <img
                      src={mat.imageUrl}
                      alt={mat.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : null}
                  <span className="absolute top-1 right-1 bg-blue-950/85 backdrop-blur-2xs text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded">
                    ₹{mat.basePricePerKg}/{t.kgUnit}
                  </span>
                </div>
                <div className="text-xs text-blue-950 font-bold truncate leading-tight">{translated}</div>
                <div className="text-[11px] text-blue-700/80 truncate mt-0.5">{mat.subcategory?.split('&')[0]}</div>
                <div className="text-[10px] font-extrabold text-blue-600 mt-1 flex items-center justify-between">
                  <span className="flex items-center gap-0.5">
                    <TrendingUp className="w-3 h-3" />
                    +{mat.trendPercent}%
                  </span>
                  <span className="text-[9px] text-blue-600 font-semibold">{t.viewDetails} →</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* NEARBY AUTHORIZED RECYCLERS */}
      <div className="bg-white p-4 rounded-2xl border border-blue-100 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-extrabold text-blue-950">
              {t.nearbyRecyclers}
            </h2>
            <p className="text-xs text-blue-800/70">{t.cpcbCompliance}</p>
          </div>
          <button
            onClick={() => onNavigateTab('recyclers')}
            className="text-xs font-bold text-blue-600 hover:underline"
          >
            {t.recyclers} →
          </button>
        </div>

        <div className="space-y-2">
          {recyclers.slice(0, 2).map((rec) => (
            <div
              key={rec.id}
              onClick={() => onNavigateTab('recyclers')}
              className="p-3 rounded-xl border border-blue-100 hover:border-blue-500 transition cursor-pointer flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.2 rounded-full border border-blue-200">
                    {t.authorizedBadge}
                  </span>
                  <span className="text-xs text-blue-800/70">{rec.distanceKm} {t.kmAway}</span>
                </div>
                <div className="text-sm font-bold text-blue-950 mt-0.5">{rec.name}</div>
                <div className="text-xs text-blue-800/70">{rec.serviceArea}</div>
              </div>
              <ArrowRight className="w-4 h-4 text-blue-600" />
            </div>
          ))}
        </div>
      </div>

      {/* SAFETY ALERT BANNER (PURE BLUE & WHITE) */}
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
          <ShieldAlert className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-bold text-blue-950">{t.safetyAlertTitle}</h3>
          <p className="text-xs text-blue-800 mt-0.5">{t.safetyAlertDesc}</p>
          <button
            onClick={() => onNavigateTab('safety')}
            className="mt-2 text-xs font-bold text-blue-700 underline flex items-center gap-1 hover:text-blue-900"
          >
            <span>{t.learnSafety}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
