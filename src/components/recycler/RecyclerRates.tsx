import React, { useState } from 'react';
import {
  Tag,
  Save,
  CheckCircle2,
  TrendingUp,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { RecyclerEntity, MaterialCategory } from '../../types';
import { db, SEED_MATERIALS } from '../../services/database';
import { translations, materialTranslations } from '../../localization/translations';
import { AppLanguage } from '../../types';

interface RecyclerRatesProps {
  language: AppLanguage;
  recycler: RecyclerEntity;
}

export const RecyclerRates: React.FC<RecyclerRatesProps> = ({ language, recycler }) => {
  const t = translations[language];
  const [rates, setRates] = useState<Partial<Record<MaterialCategory, number>>>(
    recycler.currentRates
  );
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const handleRateChange = (category: MaterialCategory, value: number) => {
    setRates((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const handleSave = () => {
    db.updateRecyclerRates(recycler.id, rates);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-4 pb-20">
      <div className="bg-white p-4 rounded-2xl border border-blue-200 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-blue-950">{t.ratesManagementTitle}</h1>
          <p className="text-xs text-blue-900/70 mt-0.5">
            Set your facility's live buying rates per kg for collectors
          </p>
        </div>
        <button
          onClick={handleSave}
          className="py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{t.updateRateBtn}</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-blue-50 border border-blue-300 rounded-xl text-xs font-bold text-blue-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-blue-600" />
          <span>Rates updated and broadcast to all local collectors!</span>
        </div>
      )}

      {/* Materials Rate Form */}
      <div className="space-y-2.5">
        {SEED_MATERIALS.map((mat) => {
          const currentVal = rates[mat.category] ?? mat.basePricePerKg;
          const isAccepted = recycler.acceptedMaterials.includes(mat.category);

          return (
            <div
              key={mat.id}
              className="bg-white p-3.5 rounded-2xl border border-blue-200 flex items-center justify-between gap-3 shadow-xs"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-blue-950">{mat.category}</span>
                  {isAccepted ? (
                    <span className="text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.2 rounded-full">
                      Accepted
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold bg-blue-50/50 text-blue-900/60 border border-blue-100 px-2 py-0.2 rounded-full">
                      Not Activated
                    </span>
                  )}
                </div>
                <div className="text-xs text-blue-900/70 mt-0.5">
                  Market Baseline: <strong className="text-blue-950">₹{mat.basePricePerKg}/kg</strong>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-blue-900/60">₹</span>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={currentVal}
                  onChange={(e) =>
                    handleRateChange(mat.category, parseFloat(e.target.value) || 0)
                  }
                  className="w-20 p-2 bg-blue-50/60 border border-blue-200 rounded-xl text-center font-black text-sm text-blue-950 focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-xs font-semibold text-blue-900/60">/ kg</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
