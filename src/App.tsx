import React, { useState, useEffect } from 'react';
import {
  Recycle,
  Wifi,
  WifiOff,
  RefreshCw,
  Plus,
  Home,
  Tag,
  Package,
  Truck,
  ShieldAlert,
  Wallet,
  Building,
  User,
  ShieldCheck,
  ChevronDown,
  Layers,
  Settings,
  Bell,
  CheckCircle2,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { AppLanguage, UserRole, MaterialLot, RecyclerEntity, AuthUser } from './types';
import { translations } from './localization/translations';
import { db, DEFAULT_AUTH_USERS } from './services/database';
import { syncEngine } from './services/syncEngine';
import { AppLogo } from './components/common/AppLogo';
import { LoginPage } from './components/auth/LoginPage';

// Collector Components
import { CollectorHome } from './components/collector/CollectorHome';
import { PriceBoard } from './components/collector/PriceBoard';
import { CreateLotFlow } from './components/collector/CreateLotFlow';
import { MyLotsList } from './components/collector/MyLotsList';
import { RecyclerDiscovery } from './components/collector/RecyclerDiscovery';
import { EarningsPassbook } from './components/collector/EarningsPassbook';
import { SafetyGuide } from './components/collector/SafetyGuide';
import { DigitalHandoverModal } from './components/collector/DigitalHandoverModal';

// Recycler Components
import { RecyclerDashboard } from './components/recycler/RecyclerDashboard';
import { IncomingLots } from './components/recycler/IncomingLots';
import { RecyclerPickups } from './components/recycler/RecyclerPickups';
import { RecyclerRates } from './components/recycler/RecyclerRates';
import { RecyclerProfile } from './components/recycler/RecyclerProfile';

// Admin Component
import { AdminDashboard } from './components/admin/AdminDashboard';

export default function App() {
  const [language, setLanguage] = useState<AppLanguage>('en');
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => db.getActiveUser());
  const [role, setRole] = useState<UserRole>(() => db.getActiveUser()?.role || 'collector');
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [pendingSyncCount, setPendingSyncCount] = useState<number>(0);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [showCreateLot, setShowCreateLot] = useState<boolean>(false);
  const [activeHandoverLot, setActiveHandoverLot] = useState<MaterialLot | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const t = translations[language];
  const recyclers = db.getRecyclers();
  const currentRecycler = recyclers[0] || null;

  // Handle Logout
  const handleLogout = () => {
    db.setActiveUser(null);
    setCurrentUser(null);
    showToast(t.signedOut);
  };

  // Sync listener & network state
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      showToast(t.backOnline);
      handleManualSync();
    };

    const handleOffline = () => {
      setIsOnline(false);
      showToast(t.youAreOffline);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const unsubscribe = syncEngine.subscribe((status) => {
      setPendingSyncCount(status.pendingCount);
      setIsSyncing(status.isSyncing);
    });

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      unsubscribe();
    };
  }, [language]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleManualSync = async () => {
    setIsSyncing(true);
    const count = await syncEngine.syncNow();
    setIsSyncing(false);
    if (count > 0) {
      showToast(`${t.synced} (${count})`);
    } else {
      showToast(t.synced);
    }
  };

  const toggleNetworkSimulation = () => {
    const newStatus = !isOnline;
    setIsOnline(newStatus);
    if (newStatus) {
      handleManualSync();
    } else {
      showToast(t.simulatedOfflineEnabled);
    }
  };

  // Change tabs and active user according to role
  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    const targetUser = DEFAULT_AUTH_USERS.find((u) => u.role === newRole);
    if (targetUser) {
      setCurrentUser(targetUser);
      db.setActiveUser(targetUser);
    }
    if (newRole === 'collector') {
      setCurrentTab('home');
    } else if (newRole === 'recycler') {
      setCurrentTab('rec_dashboard');
    } else {
      setCurrentTab('admin');
    }
  };

  // If no user is logged in, show the Login Page
  if (!currentUser) {
    return (
      <LoginPage
        language={language}
        onLanguageChange={setLanguage}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          setRole(user.role);
          if (user.role === 'collector') {
            setCurrentTab('home');
          } else if (user.role === 'recycler') {
            setCurrentTab('rec_dashboard');
          } else {
            setCurrentTab('admin');
          }
          showToast(`${t.welcome}, ${user.name}!`);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-900/5 sm:bg-slate-200/60 text-blue-950 flex flex-col items-center justify-start font-sans selection:bg-blue-500/20">
      <div className="w-full max-w-md sm:max-w-lg min-h-screen flex flex-col bg-blue-50/20 sm:shadow-2xl sm:border-x sm:border-blue-200/80 relative">
        {/* TOP APP HEADER */}
        <header className="sticky top-0 z-40 bg-white border-b border-blue-200/80 shadow-xs">
          <div className="w-full px-3.5 sm:px-4 py-2.5 flex items-center justify-between gap-2">
            {/* Logo & Brand with AppLogo component */}
            <div className="flex items-center gap-2.5">
              <div className="p-1 rounded-xl bg-blue-50 border border-blue-200/60 shadow-xs">
                <AppLogo size="sm" showText={false} />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-base tracking-tight text-blue-950">
                    KABADI<span className="text-blue-600">2</span>RECYCLE
                  </span>
                  <span className="text-[9px] font-extrabold bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-sm uppercase tracking-wide">
                    E-Waste
                  </span>
                </div>
                <div className="text-[11px] text-blue-800/80 font-semibold leading-none truncate max-w-[130px] sm:max-w-xs">
                  {currentUser?.name}
                </div>
              </div>
            </div>

            {/* Right Controls: Language Switcher & Offline Status & Sign Out */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Language Selector */}
              <div className="flex bg-blue-50/80 p-0.5 rounded-xl border border-blue-200">
                {(['en', 'hi', 'mr'] as AppLanguage[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-2 py-0.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      language === lang
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-blue-900/70 hover:text-blue-900'
                    }`}
                  >
                    {lang === 'en' ? 'EN' : lang === 'hi' ? 'हिंदी' : 'मराठी'}
                  </button>
                ))}
              </div>

              {/* Offline/Online toggle badge */}
              <button
                onClick={toggleNetworkSimulation}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1 border transition cursor-pointer ${
                  isOnline
                    ? 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
                    : 'bg-blue-100 text-blue-900 border-blue-300'
                }`}
                title="Click to toggle simulated online/offline"
              >
                {isOnline ? (
                  <>
                    <Wifi className="w-3.5 h-3.5 text-blue-600" />
                    <span className="hidden sm:inline">{t.online}</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="w-3.5 h-3.5 text-blue-700" />
                    <span>{t.offline}</span>
                    {pendingSyncCount > 0 && (
                      <span className="bg-blue-600 text-white rounded-full px-1 text-[9px]">
                        {pendingSyncCount}
                      </span>
                    )}
                  </>
                )}
              </button>

              {/* Sign Out / Switch to Login Page */}
              <button
                onClick={handleLogout}
                className="p-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 hover:text-blue-900 transition flex items-center gap-1 text-xs font-bold cursor-pointer"
                title={t.logout}
              >
                <LogOut className="w-4 h-4 text-blue-600" />
                <span className="hidden md:inline">{t.logout}</span>
              </button>
            </div>
          </div>

          {/* OFFLINE QUEUE NOTICE BANNER (if offline or pending items) */}
          {(!isOnline || pendingSyncCount > 0) && (
            <div className="bg-blue-800 text-white border-t border-blue-700">
              <div className="w-full px-3.5 sm:px-4 py-1.5 text-xs font-semibold flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <WifiOff className="w-3.5 h-3.5 text-blue-200" />
                  <span>
                    {isOnline
                      ? `${pendingSyncCount} ${t.recordsWaitingSync}`
                      : t.offlineModeNotice}
                  </span>
                </div>
                {isOnline && (
                  <button
                    onClick={handleManualSync}
                    disabled={isSyncing}
                    className="bg-white/20 hover:bg-white/30 text-white px-2 py-0.5 rounded text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
                    <span>{isSyncing ? t.syncing : t.syncNow}</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </header>

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-blue-950 text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-bold flex items-center gap-2 animate-bounce border border-blue-800">
          <CheckCircle2 className="w-4 h-4 text-blue-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* MAIN VIEW CONTAINER (MOBILE APP WIDTH & SPACING) */}
      <main className="flex-1 max-w-md sm:max-w-lg w-full mx-auto p-3.5 sm:p-4 pb-24">
        {/* COLLECTOR FLOWS */}
        {role === 'collector' && (
          <>
            {currentTab === 'home' && (
              <CollectorHome
                language={language}
                onCreateLot={() => setShowCreateLot(true)}
                onNavigateTab={(tab) => setCurrentTab(tab)}
                onSelectLot={(lot) => {
                  setCurrentTab('lots');
                }}
              />
            )}

            {currentTab === 'prices' && (
              <PriceBoard
                language={language}
                onSelectMaterial={(category) => {
                  setShowCreateLot(true);
                }}
              />
            )}

            {currentTab === 'lots' && (
              <MyLotsList
                language={language}
                onCreateNewLot={() => setShowCreateLot(true)}
                onOpenHandover={(lot) => setActiveHandoverLot(lot)}
              />
            )}

            {currentTab === 'recyclers' && (
              <RecyclerDiscovery
                language={language}
                onRequestOfferForLot={() => {
                  showToast(
                    language === 'hi'
                      ? 'प्रमाणित रीसायकलर सुविधा से ऑफर का अनुरोध भेजा गया!'
                      : language === 'mr'
                      ? 'प्रमाणित रीसायकलर युनिटकडून ऑफरची विनंती पाठवली!'
                      : 'Offer requested from certified facility!'
                  );
                }}
              />
            )}

            {currentTab === 'safety' && <SafetyGuide language={language} />}

            {currentTab === 'earnings' && <EarningsPassbook language={language} />}
          </>
        )}

        {/* RECYCLER FLOWS */}
        {role === 'recycler' && currentRecycler && (
          <>
            {currentTab === 'rec_dashboard' && (
              <RecyclerDashboard
                language={language}
                recycler={currentRecycler}
                onNavigateTab={(tab) => setCurrentTab(tab)}
              />
            )}

            {currentTab === 'incoming_lots' && (
              <IncomingLots language={language} recycler={currentRecycler} />
            )}

            {currentTab === 'pickups' && (
              <RecyclerPickups language={language} recycler={currentRecycler} />
            )}

            {currentTab === 'rates' && (
              <RecyclerRates language={language} recycler={currentRecycler} />
            )}

            {currentTab === 'profile' && (
              <RecyclerProfile language={language} recycler={currentRecycler} />
            )}
          </>
        )}

        {/* ADMIN FLOW */}
        {role === 'admin' && <AdminDashboard language={language} />}
      </main>

      {/* CREATE LOT MODAL / STEPPER */}
      {showCreateLot && (
        <CreateLotFlow
          language={language}
          onClose={() => setShowCreateLot(false)}
          onLotCreated={(lot) => {
            setShowCreateLot(false);
            showToast(
              language === 'hi'
                ? `लॉट ${lot.id} पंजीकृत! रीसायकलर्स को सूचित किया गया।`
                : language === 'mr'
                ? `लॉट ${lot.id} नोंदणीकृत! रीसायकलर्सना सूचित केले.`
                : `Lot ${lot.id} registered! Recyclers notified.`
            );
            setCurrentTab('lots');
          }}
        />
      )}

      {/* DIGITAL HANDOVER RECEIPT MODAL */}
      {activeHandoverLot && (
        <DigitalHandoverModal
          lot={activeHandoverLot}
          language={language}
          onClose={() => setActiveHandoverLot(null)}
          onHandoverComplete={() => {
            showToast(t.handoverSuccess);
            setCurrentTab('earnings');
          }}
        />
      )}

      {/* BOTTOM NAVIGATION TABS (Touch target >= 44px) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-blue-100 shadow-lg">
        <div className="max-w-md sm:max-w-lg mx-auto flex items-center justify-around px-2 py-1">
          {role === 'collector' ? (
            <>
              <button
                onClick={() => setCurrentTab('home')}
                className={`flex-1 py-1.5 flex flex-col items-center justify-center min-h-[48px] rounded-xl transition cursor-pointer ${
                  currentTab === 'home'
                    ? 'text-blue-600 font-extrabold'
                    : 'text-blue-900/50 hover:text-blue-900'
                }`}
              >
                <Home className="w-5 h-5" />
                <span className="text-[10px] mt-0.5">{t.home}</span>
              </button>

              <button
                onClick={() => setCurrentTab('prices')}
                className={`flex-1 py-1.5 flex flex-col items-center justify-center min-h-[48px] rounded-xl transition cursor-pointer ${
                  currentTab === 'prices'
                    ? 'text-blue-600 font-extrabold'
                    : 'text-blue-900/50 hover:text-blue-900'
                }`}
              >
                <Tag className="w-5 h-5" />
                <span className="text-[10px] mt-0.5">{t.prices}</span>
              </button>

              {/* Central Quick Create Lot Action */}
              <button
                onClick={() => setShowCreateLot(true)}
                className="px-2 py-1 flex flex-col items-center justify-center min-h-[48px] -mt-5 cursor-pointer"
                title={t.addLot}
              >
                <div className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg shadow-blue-600/35 transition active:scale-95">
                  <Plus className="w-6 h-6 stroke-[3]" />
                </div>
                <span className="text-[10px] font-bold text-blue-600 mt-0.5">{t.addLot}</span>
              </button>

              <button
                onClick={() => setCurrentTab('lots')}
                className={`flex-1 py-1.5 flex flex-col items-center justify-center min-h-[48px] rounded-xl transition cursor-pointer ${
                  currentTab === 'lots'
                    ? 'text-blue-600 font-extrabold'
                    : 'text-blue-900/50 hover:text-blue-900'
                }`}
              >
                <Package className="w-5 h-5" />
                <span className="text-[10px] mt-0.5">{t.myLots}</span>
              </button>

              <button
                onClick={() => setCurrentTab('recyclers')}
                className={`flex-1 py-1.5 flex flex-col items-center justify-center min-h-[48px] rounded-xl transition cursor-pointer ${
                  currentTab === 'recyclers'
                    ? 'text-blue-600 font-extrabold'
                    : 'text-blue-900/50 hover:text-blue-900'
                }`}
              >
                <Building className="w-5 h-5" />
                <span className="text-[10px] mt-0.5">{t.recyclers}</span>
              </button>

              <button
                onClick={() => setCurrentTab('safety')}
                className={`flex-1 py-1.5 flex flex-col items-center justify-center min-h-[48px] rounded-xl transition cursor-pointer ${
                  currentTab === 'safety'
                    ? 'text-blue-600 font-extrabold'
                    : 'text-blue-900/50 hover:text-blue-900'
                }`}
              >
                <ShieldAlert className="w-5 h-5" />
                <span className="text-[10px] mt-0.5">{t.safety}</span>
              </button>

              <button
                onClick={() => setCurrentTab('earnings')}
                className={`flex-1 py-1.5 flex flex-col items-center justify-center min-h-[48px] rounded-xl transition cursor-pointer ${
                  currentTab === 'earnings'
                    ? 'text-blue-600 font-extrabold'
                    : 'text-blue-900/50 hover:text-blue-900'
                }`}
              >
                <Wallet className="w-5 h-5" />
                <span className="text-[10px] mt-0.5">{t.earnings}</span>
              </button>
            </>
          ) : role === 'recycler' ? (
            <>
              <button
                onClick={() => setCurrentTab('rec_dashboard')}
                className={`flex-1 py-1.5 flex flex-col items-center justify-center min-h-[48px] rounded-xl transition cursor-pointer ${
                  currentTab === 'rec_dashboard'
                    ? 'text-blue-600 font-extrabold'
                    : 'text-blue-900/50 hover:text-blue-900'
                }`}
              >
                <Home className="w-5 h-5" />
                <span className="text-[10px] mt-0.5">{t.overview}</span>
              </button>

              <button
                onClick={() => setCurrentTab('incoming_lots')}
                className={`flex-1 py-1.5 flex flex-col items-center justify-center min-h-[48px] rounded-xl transition cursor-pointer ${
                  currentTab === 'incoming_lots'
                    ? 'text-blue-600 font-extrabold'
                    : 'text-blue-900/50 hover:text-blue-900'
                }`}
              >
                <Package className="w-5 h-5" />
                <span className="text-[10px] mt-0.5">{t.browse}</span>
              </button>

              <button
                onClick={() => setCurrentTab('pickups')}
                className={`flex-1 py-1.5 flex flex-col items-center justify-center min-h-[48px] rounded-xl transition cursor-pointer ${
                  currentTab === 'pickups'
                    ? 'text-blue-600 font-extrabold'
                    : 'text-blue-900/50 hover:text-blue-900'
                }`}
              >
                <Truck className="w-5 h-5" />
                <span className="text-[10px] mt-0.5">{t.pickups}</span>
              </button>

              <button
                onClick={() => setCurrentTab('rates')}
                className={`flex-1 py-1.5 flex flex-col items-center justify-center min-h-[48px] rounded-xl transition cursor-pointer ${
                  currentTab === 'rates'
                    ? 'text-blue-600 font-extrabold'
                    : 'text-blue-900/50 hover:text-blue-900'
                }`}
              >
                <Tag className="w-5 h-5" />
                <span className="text-[10px] mt-0.5">{t.rates}</span>
              </button>

              <button
                onClick={() => setCurrentTab('profile')}
                className={`flex-1 py-1.5 flex flex-col items-center justify-center min-h-[48px] rounded-xl transition cursor-pointer ${
                  currentTab === 'profile'
                    ? 'text-blue-600 font-extrabold'
                    : 'text-blue-900/50 hover:text-blue-900'
                }`}
              >
                <Building className="w-5 h-5" />
                <span className="text-[10px] mt-0.5">{t.facility}</span>
              </button>
            </>
          ) : (
            <div className="w-full text-center py-2 text-xs font-bold text-blue-900">
              {t.regulatoryActive}
            </div>
          )}
        </div>
      </nav>
      </div>
    </div>
  );
}
