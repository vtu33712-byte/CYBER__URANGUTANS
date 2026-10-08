import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';
import NotificationPanel from './components/NotificationPanel';
import Earth3DCursor from './components/Earth3DCursor';
import Preloader from './components/Preloader';
import { mockStore } from './supabase/supabaseClient';

// Import all 20 pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CitizenDashboardPage from './pages/CitizenDashboardPage';
import ReportIssuePage from './pages/ReportIssuePage';
import EvidenceUploadPage from './pages/EvidenceUploadPage';
import LocationSelectionPage from './pages/LocationSelectionPage';
import AIVerificationPage from './pages/AIVerificationPage';
import DuplicateResultPage from './pages/DuplicateResultPage';
import MyReportsPage from './pages/MyReportsPage';
import ComplaintDetailsPage from './pages/ComplaintDetailsPage';
import PublicTrackerPage from './pages/PublicTrackerPage';
import CityLiveMapPage from './pages/CityLiveMapPage';
import OfficerCommandCenterPage from './pages/OfficerCommandCenterPage';
import PriorityQueuePage from './pages/PriorityQueuePage';
import NotificationsPage from './pages/NotificationsPage';
import CityAnalyticsPage from './pages/CityAnalyticsPage';
import WardManagementPage from './pages/WardManagementPage';
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutPage';
import GreenFuturePage from './pages/GreenFuturePage';

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [pageParams, setPageParams] = useState({});
  const [isLightMode, setIsLightMode] = useState(false);
  const [currentUserRole, setCurrentUserRole] = useState('citizen');
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notificationsCount, setNotificationsCount] = useState(2);

  // Sync hash routing on mount and hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const [page, queryString] = hash.split('?');
        setCurrentPage(page || 'home');
        if (queryString) {
          const params = Object.fromEntries(new URLSearchParams(queryString));
          setPageParams(params);
        }
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update theme class on HTML element
  useEffect(() => {
    if (isLightMode) {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
  }, [isLightMode]);

  // Subscribe to real-time notification count
  useEffect(() => {
    const updateCount = () => {
      const notifs = mockStore.getNotifications();
      const unread = notifs.filter(n => !n.read).length;
      setNotificationsCount(unread || notifs.length);
    };

    updateCount();
    const unsub = mockStore.subscribe(() => updateCount());
    return () => unsub();
  }, []);

  const navigateTo = (pageId, params = {}) => {
    setCurrentPage(pageId);
    setPageParams(params);
    const queryString = new URLSearchParams(params).toString();
    window.location.hash = queryString ? `${pageId}?${queryString}` : pageId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleTheme = () => {
    setIsLightMode(prev => !prev);
  };

  const handleSwitchUserRole = (role) => {
    setCurrentUserRole(role);
  };

  // Render the active view among the 20 pages
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={navigateTo} isLightMode={isLightMode} />;
      case 'login':
        return <LoginPage onNavigate={navigateTo} onLoginSuccess={(role) => setCurrentUserRole(role)} />;
      case 'dashboard':
        return <CitizenDashboardPage onNavigate={navigateTo} />;
      case 'report':
        return (
          <ReportIssuePage 
            onNavigate={navigateTo} 
            onCompleteSubmission={(created) => navigateTo('tracker', { searchCode: created.trackingCode })} 
          />
        );
      case 'evidence-upload':
        return <EvidenceUploadPage onNavigate={navigateTo} />;
      case 'location-selection':
        return <LocationSelectionPage onNavigate={navigateTo} />;
      case 'ai-verification':
        return <AIVerificationPage onNavigate={navigateTo} />;
      case 'duplicate-demo':
      case 'duplicate-result':
        return <DuplicateResultPage onNavigate={navigateTo} />;
      case 'my-reports':
        return <MyReportsPage onNavigate={navigateTo} />;
      case 'complaint-details':
        return (
          <ComplaintDetailsPage 
            complaintId={pageParams.complaintId || 'comp-001'} 
            onNavigate={navigateTo} 
          />
        );
      case 'tracker':
        return (
          <PublicTrackerPage 
            searchCode={pageParams.searchCode || 'CIV-001'} 
          />
        );
      case 'map':
        return <CityLiveMapPage onNavigate={navigateTo} isLightMode={isLightMode} />;
      case 'officer':
        return <OfficerCommandCenterPage onNavigate={navigateTo} />;
      case 'priority-queue':
        return <PriorityQueuePage onNavigate={navigateTo} />;
      case 'notifications':
        return <NotificationsPage onNavigate={navigateTo} />;
      case 'analytics':
        return <CityAnalyticsPage onNavigate={navigateTo} />;
      case 'wards':
        return <WardManagementPage onNavigate={navigateTo} />;
      case 'profile':
        return (
          <ProfilePage
            currentUserRole={currentUserRole}
            onSwitchUserRole={handleSwitchUserRole}
            isLightMode={isLightMode}
            onToggleTheme={handleToggleTheme}
          />
        );
      case 'about':
        return <AboutPage onNavigate={navigateTo} />;
      case 'green-future':
        return <GreenFuturePage onNavigate={navigateTo} />;
      default:
        return <HomePage onNavigate={navigateTo} isLightMode={isLightMode} />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${isLightMode ? 'bg-slate-50 text-slate-900' : 'bg-brand-navyDark text-slate-100'}`}>
      
      {/* 3D Rotating Earth Ball Cursor */}
      <Earth3DCursor />

      {/* Futuristic 3D Earth & Smart City Initialization Preloader */}
      {isLoading && (
        <Preloader onFinish={() => setIsLoading(false)} />
      )}

      {/* Floating Glass Navigation Bar */}
      <Navbar
        activePage={currentPage}
        onNavigate={navigateTo}
        isLightMode={isLightMode}
        onToggleTheme={handleToggleTheme}
        currentUserRole={currentUserRole}
        onSwitchUserRole={handleSwitchUserRole}
        notificationsCount={notificationsCount}
        onOpenNotifications={() => setIsNotifOpen(true)}
      />

      {/* Main Content View Container */}
      <main className="flex-1 w-full pb-16 lg:pb-0">
        {renderCurrentPage()}
      </main>

      {/* Futuristic Global Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        activePage={currentPage}
        onNavigate={navigateTo}
        notificationsCount={notificationsCount}
      />

      {/* Real-time Notifications Slide-Over Panel */}
      <NotificationPanel
        isOpen={isNotifOpen}
        onClose={() => setIsNotifOpen(false)}
        onNavigate={navigateTo}
      />

    </div>
  );
}

export default App;
