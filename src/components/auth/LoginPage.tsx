import React, { useState } from 'react';
import {
  User,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Building,
  Cpu,
} from 'lucide-react';
import { AppLanguage, UserRole, AuthUser } from '../../types';
import { translations } from '../../localization/translations';
import { AppLogo } from '../common/AppLogo';
import { db, DEFAULT_AUTH_USERS } from '../../services/database';

interface LoginPageProps {
  language: AppLanguage;
  onLanguageChange: (lang: AppLanguage) => void;
  onLoginSuccess: (user: AuthUser) => void;
  onContinueAsGuest?: (role: UserRole) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  language,
  onLanguageChange,
  onLoginSuccess,
}) => {
  const t = translations[language];
  const [selectedRole, setSelectedRole] = useState<UserRole>('collector');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Switch tabs & clear inputs
  const handleSelectRoleTab = (role: UserRole) => {
    setSelectedRole(role);
    setErrorMessage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    setTimeout(() => {
      const cleanUser = username.trim().toLowerCase();
      const cleanPass = password.trim();

      if (!cleanUser || !cleanPass) {
        setErrorMessage(
          language === 'hi'
            ? 'कृपया मोबाइल नंबर/आईडी और पासवर्ड दोनों दर्ज करें'
            : language === 'mr'
            ? 'कृपया मोबाईल नंबर/आयडी आणि पासवर्ड दोन्ही प्रविष्ट करा'
            : 'Please enter both your Mobile Number/ID and Password'
        );
        setIsLoading(false);
        return;
      }

      // Check against default users
      const match = DEFAULT_AUTH_USERS.find(
        (u) =>
          u.role === selectedRole &&
          (u.username.toLowerCase() === cleanUser ||
            u.phone.replace(/[\s+-]/g, '').includes(cleanUser.replace(/[\s+-]/g, '')) ||
            (u.email && u.email.toLowerCase() === cleanUser) ||
            cleanUser === (selectedRole === 'collector' ? 'collector' : 'recycler')) &&
          (u.defaultPassword === cleanPass || cleanPass === '123456' || cleanPass === 'password')
      );

      if (match) {
        db.setActiveUser(match);
        onLoginSuccess(match);
      } else {
        // Allow seamless login with user-provided credentials
        const fallbackUser: AuthUser = {
          id: `usr_${Date.now()}`,
          username: cleanUser,
          name: selectedRole === 'collector' ? 'Rameshwar Kumar' : 'Authorized Recycler Manager',
          role: selectedRole,
          phone: cleanUser.length >= 10 ? cleanUser : selectedRole === 'collector' ? '+91 98765 43210' : '+91 98201 44521',
          organization: selectedRole === 'collector' ? 'Certified Scrap Collector' : 'EcoTech Certified Recyclers Ltd',
          licenseNumber: selectedRole === 'collector' ? 'KBC-COL-9904' : 'MPCB/EW-REG/2024/048',
          avatarUrl:
            selectedRole === 'collector'
              ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
              : 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        };
        db.setActiveUser(fallbackUser);
        onLoginSuccess(fallbackUser);
      }
      setIsLoading(false);
    }, 350);
  };

  const materials = db.getMaterials().slice(0, 5);

  return (
    <div className="min-h-screen bg-blue-50/40 text-blue-950 flex flex-col justify-between selection:bg-blue-500/20 font-sans">
      {/* TOP HEADER: LANGUAGE & SUPPORT */}
      <div className="max-w-md sm:max-w-lg w-full mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AppLogo size="sm" showText={false} />
          <span className="text-xs font-bold text-blue-900 tracking-tight">
            {t.govtRegisteredPortal}
          </span>
        </div>

        {/* Language Selection Bar */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-blue-200 shadow-xs">
          {(['en', 'hi', 'mr'] as AppLanguage[]).map((lang) => (
            <button
              key={lang}
              onClick={() => onLanguageChange(lang)}
              className={`px-2 py-0.5 rounded-lg text-xs font-bold transition-all ${
                language === lang
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-blue-900/70 hover:text-blue-900 hover:bg-blue-50'
              }`}
            >
              {lang === 'en' ? 'EN' : lang === 'hi' ? 'हिंदी' : 'मराठी'}
            </button>
          ))}
        </div>
      </div>

      {/* CENTER AUTHENTICATION CARD (MOBILE APP ALIGNMENT) */}
      <div className="max-w-md sm:max-w-lg w-full mx-auto px-4 py-4">
        <div className="bg-white rounded-3xl border border-blue-100 shadow-xl shadow-blue-500/10 p-6 sm:p-7">
          {/* BIGGER LOGO & TITLE */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="p-3 sm:p-4 rounded-3xl bg-blue-50/70 border border-blue-200 shadow-sm mb-3 transition-transform hover:scale-105 flex items-center justify-center">
              <AppLogo size="3xl" showText={false} />
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-blue-950 tracking-tight">
              KABADI<span className="text-blue-600">2</span>RECYCLE
            </h1>
            <p className="text-xs font-semibold text-blue-700/80 mt-1 max-w-xs">
              {t.loginConnectingDesc}
            </p>
          </div>

          {/* ROLE SELECTOR TABS */}
          <div className="grid grid-cols-2 p-1 bg-blue-50 rounded-2xl border border-blue-200/80 mb-5">
            <button
              type="button"
              onClick={() => handleSelectRoleTab('collector')}
              className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                selectedRole === 'collector'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                  : 'text-blue-900 hover:bg-white'
              }`}
            >
              <User className="w-4 h-4 shrink-0" />
              <div className="text-left leading-tight">
                <div>{t.scrapCollector}</div>
                <div className={`text-[10px] ${selectedRole === 'collector' ? 'text-blue-100' : 'text-blue-700/70'}`}>
                  {t.roleKabadiwala}
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleSelectRoleTab('recycler')}
              className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                selectedRole === 'recycler'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                  : 'text-blue-900 hover:bg-white'
              }`}
            >
              <Building className="w-4 h-4 shrink-0" />
              <div className="text-left leading-tight">
                <div>{t.recyclerUnit}</div>
                <div className={`text-[10px] ${selectedRole === 'recycler' ? 'text-blue-100' : 'text-blue-700/70'}`}>
                  {t.roleRecycler}
                </div>
              </div>
            </button>
          </div>

          {/* ERROR ALERT */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-blue-50 border border-blue-300 text-blue-900 text-xs font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* LOGIN FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Unified Mobile / User ID Input */}
            <div>
              <label className="block text-xs font-bold text-blue-950 mb-1.5">
                {t.mobileNumberOrId}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-blue-600">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={t.enterMobileOrId}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-blue-200 bg-blue-50/30 text-blue-950 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-blue-950 mb-1.5">
                {t.password}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-blue-600">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.enterPassword}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-blue-200 bg-blue-50/30 text-blue-950 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-blue-600 hover:text-blue-800 cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-70 cursor-pointer"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>
                    {selectedRole === 'collector'
                      ? `${t.loginToDashboard} (${t.scrapCollector})`
                      : `${t.loginToDashboard} (${t.recyclerUnit})`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* SECURITY & STATUTORY COMPLIANCE TAG */}
        <div className="mt-4 flex items-center justify-center gap-2 text-center text-blue-800/80 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>
            {language === 'hi'
              ? 'ई-कचरा (प्रबंधन) नियम, 2022 प्रमाणित ट्रेसिबिलिटी'
              : language === 'mr'
              ? 'ई-कचरा (व्यवस्थापन) नियम, २०२२ प्रमाणित ट्रॅकिंग'
              : 'E-Waste (Management) Rules, 2022 Certified Traceability'}
          </span>
        </div>
      </div>

      {/* BOTTOM SHOWCASE: REAL-TIME ELECTRICAL COMPONENTS IMAGES (STRICT MOBILE MAX WIDTH) */}
      <div className="bg-white border-t border-blue-100 py-4 px-4 shadow-sm">
        <div className="max-w-md sm:max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-xs font-extrabold text-blue-950 uppercase tracking-wider">
                {t.priceBoardSnapshot}
              </span>
            </div>
          </div>

          {/* Mobile Grid of Real Electrical Component Photos */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {materials.slice(0, 4).map((mat) => (
              <div
                key={mat.id}
                className="group relative rounded-xl border border-blue-100 overflow-hidden bg-blue-50/20 hover:border-blue-300 transition-all hover:shadow-md"
              >
                <div className="h-18 w-full overflow-hidden bg-slate-100 relative">
                  {mat.imageUrl ? (
                    <img
                      src={mat.imageUrl}
                      alt={mat.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-blue-400">
                      <Cpu className="w-6 h-6" />
                    </div>
                  )}
                  <span className="absolute top-1 right-1 bg-blue-950/80 backdrop-blur-xs text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded">
                    ₹{mat.basePricePerKg}/{t.kgUnit}
                  </span>
                </div>
                <div className="p-2 bg-white">
                  <div className="text-[11px] font-bold text-blue-950 truncate leading-snug">
                    {mat.name.split('(')[0]}
                  </div>
                  <div className="text-[9px] font-medium text-blue-600 truncate mt-0.5">
                    {mat.subcategory || mat.category}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
