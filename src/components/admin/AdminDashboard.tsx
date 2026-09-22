import React, { useState } from 'react';
import {
  ShieldAlert,
  Search,
  Database,
  RotateCcw,
  CheckCircle2,
  Building,
  Layers,
  FileCheck,
  AlertTriangle,
} from 'lucide-react';
import { db } from '../../services/database';
import { translations, materialTranslations } from '../../localization/translations';
import { AppLanguage, MaterialLot } from '../../types';

interface AdminDashboardProps {
  language: AppLanguage;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ language }) => {
  const t = translations[language];
  const lots = db.getLots();
  const recyclers = db.getRecyclers();
  const materials = db.getMaterials();
  const txns = db.getTransactions();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [resetSuccess, setResetSuccess] = useState<boolean>(false);

  const filteredLots = lots.filter(
    (l) =>
      l.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.collectorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.materialCategory.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleResetData = () => {
    if (window.confirm('Reset all local data back to the clean seed dataset?')) {
      db.resetAllToSeed();
      setResetSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 800);
    }
  };

  return (
    <div className="w-full max-w-md sm:max-w-lg mx-auto space-y-4 pb-20">
      <div className="bg-white p-4 rounded-2xl border border-blue-100 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-lg sm:text-xl font-extrabold text-blue-950">{t.adminPortal}</h1>
          <p className="text-xs text-blue-800/70 mt-0.5">
            {t.cpcbCompliance}
          </p>
        </div>
        <button
          onClick={handleResetData}
          className="py-2 px-3 border border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl text-xs font-bold flex items-center gap-1 transition cursor-pointer"
          title="Reset database to demo seed data"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{t.resetDemoData}</span>
        </button>
      </div>

      {resetSuccess && (
        <div className="p-3 bg-blue-50 border border-blue-300 rounded-xl text-xs font-bold text-blue-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-blue-600" />
          <span>{t.databaseResetSuccess}</span>
        </div>
      )}

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-white p-3 rounded-2xl border border-blue-100 text-center shadow-xs">
          <div className="text-[11px] font-bold text-blue-800/70 uppercase">{t.registeredRecyclers}</div>
          <div className="text-lg font-extrabold text-blue-600 mt-1">{recyclers.length}</div>
        </div>
        <div className="bg-white p-3 rounded-2xl border border-blue-100 text-center shadow-xs">
          <div className="text-[11px] font-bold text-blue-800/70 uppercase">{t.totalLots}</div>
          <div className="text-lg font-extrabold text-blue-950 mt-1">{lots.length}</div>
        </div>
        <div className="bg-white p-3 rounded-2xl border border-blue-100 text-center shadow-xs">
          <div className="text-[11px] font-bold text-blue-800/70 uppercase">{t.transactions}</div>
          <div className="text-lg font-extrabold text-blue-600 mt-1">{txns.length}</div>
        </div>
      </div>

      {/* Recycler Accreditation Registry */}
      <div className="bg-white p-4 rounded-2xl border border-blue-100 shadow-xs space-y-3">
        <h2 className="text-base font-bold text-blue-950">{t.authorizedRecyclerCompliance}</h2>
        <div className="divide-y divide-blue-50">
          {recyclers.map((r) => (
            <div key={r.id} className="py-2.5 flex items-center justify-between text-xs">
              <div>
                <div className="font-bold text-blue-950">{r.name}</div>
                <div className="text-blue-800/70 font-mono text-[11px]">{r.authorizationNumber}</div>
              </div>
              <div className="text-right">
                <span className="bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full font-bold text-[10px]">
                  {t.validTill} {r.authorizationExpiry}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Traceability Search */}
      <div className="bg-white p-4 rounded-2xl border border-blue-100 shadow-xs space-y-3">
        <h2 className="text-base font-bold text-blue-950">{t.lotTraceabilityExplorer}</h2>
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-blue-500" />
          <input
            type="text"
            placeholder={t.searchLotsPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-blue-50/30 border border-blue-200 rounded-xl text-xs text-blue-950 focus:bg-white focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="space-y-2">
          {filteredLots.map((lot) => (
            <div
              key={lot.id}
              className="p-3 bg-blue-50/40 rounded-xl border border-blue-200 text-xs space-y-1"
            >
              <div className="flex justify-between items-center">
                <span className="font-mono font-bold text-blue-600">{lot.id}</span>
                <span className="font-bold text-blue-600">₹{lot.estimatedTotalValue}</span>
              </div>
              <div className="text-blue-950 font-medium">
                {materialTranslations[language][lot.materialCategory] || lot.materialCategory} ({lot.weightKg} {t.kgUnit}) • {t.collectorName}: {lot.collectorName}
              </div>
              <div className="text-[11px] text-blue-800/70">
                {lot.traceability.length} {t.milestonesVerified}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
