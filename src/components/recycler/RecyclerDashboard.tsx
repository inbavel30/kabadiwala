import React from 'react';
import {
  Package,
  Clock,
  Truck,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  Tag,
  ArrowRight,
  ShieldCheck,
  Building,
} from 'lucide-react';
import { RecyclerEntity } from '../../types';
import { db } from '../../services/database';
import { translations } from '../../localization/translations';
import { AppLanguage } from '../../types';

interface RecyclerDashboardProps {
  language: AppLanguage;
  recycler: RecyclerEntity;
  onNavigateTab: (tab: string) => void;
}

export const RecyclerDashboard: React.FC<RecyclerDashboardProps> = ({
  language,
  recycler,
  onNavigateTab,
}) => {
  const t = translations[language];
  const lots = db.getLots();
  const txns = db.getTransactions();

  const incomingLotsCount = lots.filter(
    (l) => l.status === 'READY' || l.status === 'QUOTED'
  ).length;
  const pendingOffersCount = db
    .getOffers()
    .filter((o) => o.recyclerId === recycler.id && o.status === 'PENDING').length;
  const pickupsTodayCount = lots.filter((l) => l.status === 'PICKUP_SCHEDULED').length;
  const pendingHandoversCount = lots.filter(
    (l) => l.status === 'COLLECTED' || l.status === 'HANDOVER_PENDING'
  ).length;
  const completedCount = txns.length;
  const totalPurchaseValue = txns.reduce((acc, t) => acc + t.amountPaid, 0);

  return (
    <div className="w-full max-w-md sm:max-w-lg mx-auto space-y-4 pb-20">
      {/* Top Welcome Card */}
      <div className="bg-white p-5 rounded-2xl border border-blue-200/80 shadow-xs flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            {t.authorizedRecyclerPortal}
          </div>
          <h1 className="text-xl font-extrabold text-blue-950 mt-1">{recycler.name}</h1>
          <p className="text-xs text-blue-700/80 font-mono">{recycler.authorizationNumber}</p>
        </div>
      </div>

      {/* Sourced Value Card */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white p-5 rounded-2xl shadow-md space-y-3">
        <div className="flex justify-between items-center text-xs text-white/80">
          <span>{t.totalPurchaseVal}</span>
          <span className="bg-white/20 px-2 py-0.5 rounded-full font-bold">{t.auditedSourcing}</span>
        </div>
        <div className="text-3xl font-black">
          ₹{totalPurchaseValue.toLocaleString('en-IN')}
        </div>
        <div className="pt-2 border-t border-white/20 flex justify-between text-xs text-white/90">
          <span>{completedCount} {t.certifiedLotsPurchased}</span>
          <span className="font-semibold text-blue-200">{t.traceable100}</span>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div
          onClick={() => onNavigateTab('incoming_lots')}
          className="bg-white p-4 rounded-2xl border border-blue-200/80 shadow-xs cursor-pointer hover:border-blue-500 hover:shadow-md transition"
        >
          <div className="flex items-center justify-between text-blue-900/70 text-xs font-semibold">
            <span>{t.incomingScrapLots}</span>
            <Package className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-blue-950 mt-1.5">{incomingLotsCount}</div>
          <div className="text-[11px] text-blue-600 font-bold mt-1">{t.availableToQuote} →</div>
        </div>

        <div
          onClick={() => onNavigateTab('pickups')}
          className="bg-white p-4 rounded-2xl border border-blue-200/80 shadow-xs cursor-pointer hover:border-blue-500 hover:shadow-md transition"
        >
          <div className="flex items-center justify-between text-blue-900/70 text-xs font-semibold">
            <span>{t.pickupsScheduled}</span>
            <Truck className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-blue-950 mt-1.5">{pickupsTodayCount}</div>
          <div className="text-[11px] text-blue-600 font-bold mt-1">{t.logisticsActive}</div>
        </div>

        <div
          onClick={() => onNavigateTab('pickups')}
          className="bg-white p-4 rounded-2xl border border-blue-200/80 shadow-xs cursor-pointer hover:border-blue-500 hover:shadow-md transition"
        >
          <div className="flex items-center justify-between text-blue-900/70 text-xs font-semibold">
            <span>{t.pendingHandovers}</span>
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-blue-950 mt-1.5">{pendingHandoversCount}</div>
          <div className="text-[11px] text-blue-700/80 font-bold mt-1">{t.awaitingScaleWeigh}</div>
        </div>

        <div
          onClick={() => onNavigateTab('rates')}
          className="bg-white p-4 rounded-2xl border border-blue-200/80 shadow-xs cursor-pointer hover:border-blue-500 hover:shadow-md transition"
        >
          <div className="flex items-center justify-between text-blue-900/70 text-xs font-semibold">
            <span>{t.acceptedMaterials}</span>
            <Tag className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-blue-950 mt-1.5">
            {recycler.acceptedMaterials.length}
          </div>
          <div className="text-[11px] text-blue-600 font-bold mt-1">{t.manageBuyingRates} →</div>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="bg-white p-4 rounded-2xl border border-blue-200/80 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-blue-950">{t.quickActions}</h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onNavigateTab('incoming_lots')}
            className="py-3 px-3 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-xs hover:bg-blue-700 transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Package className="w-4 h-4" />
            <span>{t.browseLotsQuote}</span>
          </button>
          <button
            onClick={() => onNavigateTab('rates')}
            className="py-3 px-3 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold hover:bg-blue-100 transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Tag className="w-4 h-4" />
            <span>{t.updateRateBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
