import React, { useState } from 'react';
import {
  Volume2,
  VolumeX,
  TrendingUp,
  TrendingDown,
  Minus,
  MapPin,
  Calendar,
  Layers,
  Sparkles,
  Info,
} from 'lucide-react';
import { MaterialCategory, MaterialItem } from '../../types';
import { db } from '../../services/database';
import { translations, materialTranslations } from '../../localization/translations';
import { speechService } from '../../services/speech';
import { AppLanguage } from '../../types';

interface PriceBoardProps {
  language: AppLanguage;
  onSelectMaterial?: (cat: MaterialCategory) => void;
}

export const PriceBoard: React.FC<PriceBoardProps> = ({ language, onSelectMaterial }) => {
  const t = translations[language];
  const materials = db.getMaterials();

  const [activeTab, setActiveTab] = useState<'current' | 'history' | 'area'>('current');
  const [selectedArea, setSelectedArea] = useState<string>('All Mumbai-Pune Scrap Hubs');
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const handleSpeak = (mat: MaterialItem) => {
    if (speakingId === mat.id) {
      speechService.stop();
      setSpeakingId(null);
      return;
    }

    setSpeakingId(mat.id);
    const translatedName = materialTranslations[language][mat.category] || mat.name;
    speechService.speakPrice(translatedName, mat.basePricePerKg, 'kg', mat.trend, language);

    // reset after speech finishes
    const checkInterval = setInterval(() => {
      if (!speechService.getIsSpeaking()) {
        setSpeakingId(null);
        clearInterval(checkInterval);
      }
    }, 500);
  };

  return (
    <div className="w-full max-w-md sm:max-w-lg mx-auto space-y-4 pb-20">
      {/* Header */}
      <div className="bg-white p-4 rounded-2xl border border-blue-200/80 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold text-blue-950">{t.priceBoardTitle}</h1>
            <p className="text-xs text-blue-900/70 mt-0.5">{t.priceBoardSnapshot}</p>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200/60">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              {t.lastUpdated}
            </span>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-blue-50/70 p-1 rounded-xl mt-3 border border-blue-200/60">
          <button
            onClick={() => setActiveTab('current')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition cursor-pointer ${
              activeTab === 'current'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-blue-900/70 hover:text-blue-950'
            }`}
          >
            {t.currentRates}
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition cursor-pointer ${
              activeTab === 'history'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-blue-900/70 hover:text-blue-950'
            }`}
          >
            {t.historicalRates}
          </button>
          <button
            onClick={() => setActiveTab('area')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition cursor-pointer ${
              activeTab === 'area'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-blue-900/70 hover:text-blue-950'
            }`}
          >
            {t.myAreaFilter}
          </button>
        </div>

        {/* Area selection banner if area tab */}
        {activeTab === 'area' && (
          <div className="mt-3 p-2.5 bg-blue-50/80 rounded-xl border border-blue-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 font-semibold text-blue-950">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>{selectedArea}</span>
            </div>
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="bg-white border border-blue-200 rounded-lg px-2 py-1 text-xs font-bold text-blue-700 cursor-pointer"
            >
              <option value="Dharavi, Mumbai">Dharavi (Mumbai)</option>
              <option value="Turbhe MIDC, Navi Mumbai">Turbhe (Navi Mumbai)</option>
              <option value="Bhosari MIDC, Pune">Bhosari (Pune)</option>
              <option value="Kalyan Scrap Yard, Thane">Kalyan (Thane)</option>
            </select>
          </div>
        )}
      </div>

      {/* Price Cards Grid */}
      <div className="space-y-3">
        {materials.map((mat) => {
          const isSpeakingThis = speakingId === mat.id;
          const translatedName = materialTranslations[language][mat.category] || mat.name;

          return (
            <div
              key={mat.id}
              className="bg-white rounded-2xl p-4 border border-blue-200/80 shadow-xs hover:border-blue-500 transition flex flex-col gap-3 group"
            >
              <div className="flex items-start justify-between gap-3">
                {/* Real-time Electrical Component Image */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-blue-200 bg-blue-50 shrink-0 relative shadow-2xs">
                  {mat.imageUrl ? (
                    <img
                      src={mat.imageUrl}
                      alt={mat.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-blue-500">
                      <Sparkles className="w-6 h-6" />
                    </div>
                  )}
                  <span className="absolute bottom-0 inset-x-0 bg-blue-900/80 backdrop-blur-2xs text-white text-[9px] text-center font-bold py-0.5">
                    {t.kgUnit.toUpperCase()}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-extrabold text-blue-700 uppercase tracking-wider">
                      {translatedName}
                    </span>
                    {/* Trend Pill */}
                    {mat.trend === 'up' && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-white bg-blue-600 px-2 py-0.5 rounded-full">
                        <TrendingUp className="w-3 h-3" />
                        +{mat.trendPercent}%
                      </span>
                    )}
                    {mat.trend === 'down' && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                        <TrendingDown className="w-3 h-3" />
                        {mat.trendPercent}%
                      </span>
                    )}
                    {mat.trend === 'stable' && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                        <Minus className="w-3 h-3" />
                        0.0%
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-extrabold text-blue-950 mt-1 leading-snug">
                    {translatedName}
                  </h3>
                  <p className="text-xs text-blue-900/70 mt-0.5 line-clamp-1">{mat.subcategory}</p>

                  {/* Recovery Specs Pill */}
                  {mat.recoverySpecs && (
                    <div className="mt-1 text-[11px] text-blue-800 font-medium bg-blue-50/80 px-2 py-0.5 rounded-md border border-blue-100 inline-block max-w-full truncate">
                      ⚡ {mat.recoverySpecs}
                    </div>
                  )}
                </div>

                {/* Price Display */}
                <div className="text-right shrink-0">
                  <div className="text-2xl font-black text-blue-600 leading-none">
                    ₹{mat.basePricePerKg}
                  </div>
                  <div className="text-[11px] font-bold text-blue-900/60 mt-1">{t.pricePerKg}</div>
                </div>
              </div>

              {/* Recycler Range & Audio Button */}
              <div className="pt-2 border-t border-blue-100 flex items-center justify-between">
                <div className="text-xs text-blue-900/80 font-medium">
                  {t.recyclerOffers}: <strong className="text-blue-950 font-bold">₹{mat.priceRange.min} - ₹{mat.priceRange.max}</strong>
                </div>

                {/* Audio Listen Button */}
                <button
                  onClick={() => handleSpeak(mat)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition active:scale-95 cursor-pointer ${
                    isSpeakingThis
                      ? 'bg-blue-600 text-white animate-pulse shadow-md shadow-blue-500/30'
                      : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
                  }`}
                  title="Listen price in your language"
                >
                  {isSpeakingThis ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  <span>{isSpeakingThis ? t.stopAudio : t.readAloud}</span>
                </button>
              </div>

              {/* Historical Trend Sparkline Preview when activeTab === 'history' */}
              {activeTab === 'history' && (
                <div className="mt-1 p-2.5 bg-blue-50/60 rounded-xl border border-blue-200 text-xs">
                  <div className="font-semibold text-blue-950 mb-1.5 flex justify-between">
                    <span>{t.trend30Days}</span>
                    <span className="text-blue-600 font-bold">▲ ₹{mat.basePricePerKg - 15} → ₹{mat.basePricePerKg}</span>
                  </div>
                  <div className="h-8 flex items-end gap-1.5 px-1">
                    {[65, 68, 70, 72, 75, 78, 80, 84, 88, 92, 95, 100].map((val, idx) => (
                      <div
                        key={idx}
                        className="flex-1 bg-blue-600 rounded-t-xs hover:bg-blue-700 transition"
                        style={{ height: `${val * 0.7}%` }}
                        title={`Day ${idx * 3}: ${Math.round(mat.basePricePerKg * (val / 100))} ₹`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
