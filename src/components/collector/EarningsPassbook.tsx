import React from 'react';
import {
  Wallet,
  TrendingUp,
  Banknote,
  Receipt,
  Clock,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import { db } from '../../services/database';
import { translations, materialTranslations } from '../../localization/translations';
import { AppLanguage, MaterialCategory } from '../../types';

interface EarningsPassbookProps {
  language: AppLanguage;
}

export const EarningsPassbook: React.FC<EarningsPassbookProps> = ({ language }) => {
  const t = translations[language];
  const summary = db.getEarningsSummary();
  const transactions = db.getTransactions();

  return (
    <div className="w-full max-w-md sm:max-w-lg mx-auto space-y-4 pb-20">
      {/* Total Earnings Card */}
      <div className="bg-blue-600 text-white p-5 rounded-2xl shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-semibold text-white/90 uppercase tracking-wider">
              {t.totalEarnings}
            </span>
          </div>
          <span className="text-xs bg-white/20 text-white px-2.5 py-0.5 rounded-full font-bold">
            {summary.transactionCount} {t.completedSales}
          </span>
        </div>

        <div>
          <div className="text-3xl font-black tracking-tight">
            ₹{summary.totalEarnings.toLocaleString('en-IN')}
          </div>
          <p className="text-xs text-blue-100 mt-1">
            {t.totalWeightRecycled}: <strong>{summary.totalWeightRecycledKg} {t.kgUnit}</strong>
          </p>
        </div>

        {/* Cash vs Digital breakdown */}
        <div className="pt-3 border-t border-white/20 grid grid-cols-2 gap-3 text-xs">
          <div className="bg-white/10 p-2.5 rounded-xl">
            <div className="text-white/80 flex items-center gap-1">
              <Banknote className="w-3.5 h-3.5" />
              <span>{t.cashCollected}</span>
            </div>
            <div className="text-sm font-bold mt-0.5">
              ₹{summary.cashAmount.toLocaleString('en-IN')}
            </div>
          </div>
          <div className="bg-white/10 p-2.5 rounded-xl">
            <div className="text-white/80 flex items-center gap-1">
              <Receipt className="w-3.5 h-3.5" />
              <span>{t.digitalCollected}</span>
            </div>
            <div className="text-sm font-bold mt-0.5">
              ₹{summary.digitalAmount.toLocaleString('en-IN')}
            </div>
          </div>
        </div>
      </div>

      {/* Time Breakdown Cards */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-white p-3 rounded-2xl border border-blue-100 text-center shadow-xs">
          <div className="text-[11px] font-bold text-blue-800/70 uppercase">{t.todaySummary}</div>
          <div className="text-sm font-extrabold text-blue-950 mt-1">
            ₹{summary.todayEarnings.toLocaleString('en-IN')}
          </div>
        </div>
        <div className="bg-white p-3 rounded-2xl border border-blue-100 text-center shadow-xs">
          <div className="text-[11px] font-bold text-blue-800/70 uppercase">{t.thisWeekSummary}</div>
          <div className="text-sm font-extrabold text-blue-950 mt-1">
            ₹{summary.thisWeekEarnings.toLocaleString('en-IN')}
          </div>
        </div>
        <div className="bg-white p-3 rounded-2xl border border-blue-100 text-center shadow-xs">
          <div className="text-[11px] font-bold text-blue-800/70 uppercase">{t.thisMonthSummary}</div>
          <div className="text-sm font-extrabold text-blue-950 mt-1">
            ₹{summary.thisMonthEarnings.toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      {/* Pending Payout Banner if any */}
      {summary.pendingPayouts > 0 && (
        <div className="p-3 bg-blue-50 rounded-2xl border border-blue-200 flex items-center justify-between text-xs text-blue-900">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <div>
              <span className="font-bold">{t.pendingPaymentLabel}</span>
              <span className="block text-[11px] text-blue-700">{t.underLogistics}</span>
            </div>
          </div>
          <div className="text-base font-extrabold text-blue-950">
            ₹{summary.pendingPayouts.toLocaleString('en-IN')}
          </div>
        </div>
      )}

      {/* Passbook Transaction History */}
      <div className="bg-white p-4 rounded-2xl border border-blue-100 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-blue-950">{t.passbookTitle}</h2>
          <span className="text-xs font-semibold text-blue-700">{t.passbookOfficialSlips}</span>
        </div>

        {transactions.length === 0 ? (
          <div className="text-center py-8 text-blue-800/70 text-xs">
            {t.noTransactions}
          </div>
        ) : (
          <div className="divide-y divide-blue-50">
            {transactions.map((tx) => (
              <div key={tx.id} className="py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-xs font-bold text-blue-600">{tx.lotId}</span>
                      <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full border border-blue-100">
                        {tx.paymentMethod}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-blue-950 mt-0.5">
                      {materialTranslations[language][tx.material as MaterialCategory] || tx.material} • {tx.weightKg} {t.kgUnit}
                    </div>
                    <div className="text-[11px] text-blue-800/70">
                      {tx.recyclerName} • {tx.date}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-base font-black text-blue-600">
                    +₹{tx.amountPaid.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[10px] text-blue-800/60 font-mono">{tx.id}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
