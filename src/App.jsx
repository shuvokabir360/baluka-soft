import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PublishedApps from './components/PublishedApps';
import BetaTesting from './components/BetaTesting';
import FounderProfile from './components/FounderProfile';
import Contact from './components/Contact';
import Footer from './components/Footer';
import DevDrawer from './components/DevDrawer';
import BottomNav from './components/BottomNav';
import JoinTesterModal from './components/JoinTesterModal';
import AdminPanel from './components/AdminPanel';

import { appsData as initialAppsData, founderDetails as initialFounderDetails, defaultSiteSettings } from './data/appsData';
import { translations } from './data/translations';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';
import './App.css';

export default function App() {
  const [lang, setLang] = useState('bn');
  const [theme, setTheme] = useState('dark');
  
  // Modals & Panels State
  const [isDevDrawerOpen, setIsDevDrawerOpen] = useState(false);
  const [isJoinTesterModalOpen, setIsJoinTesterModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  
  const [activeTab, setActiveTab] = useState('home');
  const [currentTime, setCurrentTime] = useState('00:27');

  // --- Persistent Dynamic Data State ---
  const [appsList, setAppsList] = useState(() => {
    try {
      const saved = localStorage.getItem('baluka_soft_apps');
      return saved ? JSON.parse(saved) : initialAppsData;
    } catch (e) {
      return initialAppsData;
    }
  });

  const [founder, setFounder] = useState(() => {
    try {
      const saved = localStorage.getItem('baluka_soft_founder');
      return saved ? JSON.parse(saved) : initialFounderDetails;
    } catch (e) {
      return initialFounderDetails;
    }
  });

  const [siteSettings, setSiteSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('baluka_soft_site_settings');
      return saved ? JSON.parse(saved) : defaultSiteSettings;
    } catch (e) {
      return defaultSiteSettings;
    }
  });

  const [testers, setTesters] = useState(() => {
    try {
      const saved = localStorage.getItem('baluka_soft_beta_testers');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const checkSecretAdminRoute = () => {
      const hash = window.location.hash;
      const query = window.location.search;
      if (hash === '#admin' || query.includes('admin=true') || query.includes('admin')) {
        setIsAdminPanelOpen(true);
      }
    };
    checkSecretAdminRoute();
    window.addEventListener('hashchange', checkSecretAdminRoute);
    return () => window.removeEventListener('hashchange', checkSecretAdminRoute);
  }, []);

  const t = translations[lang] || translations.bn;

  return (
    <div className={`web-app-wrapper ${theme}-mode`}>
      {/* Pure High-Tech Animated Background Layer */}
      {siteSettings?.enableAnimations !== false && (
        <div className="animated-bg-canvas">
          <div className="bg-grid-lines"></div>
          <div className="lightning-flash-overlay"></div>

          {/* Electric Bolt Graphic SVG */}
          <div className="electric-bolt-box bolt-1">
            <svg viewBox="0 0 100 200" fill="none" className="bolt-svg">
              <path d="M50 0 L20 90 L55 90 L10 200 L80 80 L45 80 Z" fill="url(#boltGrad1)" filter="drop-shadow(0 0 15px #00e676)" />
              <defs>
                <linearGradient id="boltGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="50%" stopColor="#00e676" />
                  <stop offset="100%" stopColor="#00b0ff" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="electric-bolt-box bolt-2">
            <svg viewBox="0 0 100 200" fill="none" className="bolt-svg">
              <path d="M50 0 L15 95 L50 95 L5 200 L85 75 L45 75 Z" fill="url(#boltGrad2)" filter="drop-shadow(0 0 15px #00b0ff)" />
              <defs>
                <linearGradient id="boltGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="50%" stopColor="#00b0ff" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Wandering Glowing Cosmic Stars */}
          <div className="wandering-star star-1">✦</div>
          <div className="wandering-star star-2">★</div>
          <div className="wandering-star star-3">✨</div>
          <div className="wandering-star star-4">✧</div>
          <div className="wandering-star star-5">★</div>
          <div className="wandering-star star-6">✦</div>
          <div className="wandering-star star-7">✨</div>
          <div className="wandering-star star-8">✧</div>
          <div className="wandering-star star-9">★</div>
          <div className="wandering-star star-10">✦</div>

          {/* Glowing Ambient Orbs */}
          <div className="bg-particle p-green-1"></div>
          <div className="bg-particle p-cyan-1"></div>
          <div className="bg-particle p-purple-1"></div>
          <div className="bg-particle p-gold-1"></div>
        </div>
      )}

      {/* Main Mobile App Phone Shell */}
      <div className="mobile-app-shell">
        {/* Scrollable Mobile App Content Body */}
        <main className="mobile-app-body">
          {/* Header Navbar inside scroll container */}
          <Navbar 
            founder={founder}
            lang={lang} 
            setLang={setLang} 
            theme={theme} 
            setTheme={setTheme} 
            onOpenJoinTester={() => setIsJoinTesterModalOpen(true)}
            onOpenAdminPanel={() => setIsAdminPanelOpen(true)}
          />
          <Hero 
            appsList={appsList}
            siteSettings={siteSettings}
            lang={lang} 
            t={t} 
          />
          <PublishedApps 
            appsList={appsList}
            lang={lang} 
            t={t} 
          />
          <BetaTesting 
            appsList={appsList}
            lang={lang} 
            t={t} 
            onOpenJoinTester={() => setIsJoinTesterModalOpen(true)}
          />
          <FounderProfile 
            founder={founder}
            lang={lang} 
            t={t} 
          />
          <Contact 
            siteSettings={siteSettings}
            lang={lang} 
            t={t} 
          />
          <Footer 
            founder={founder}
            siteSettings={siteSettings}
            lang={lang} 
            t={t} 
            onOpenDevDrawer={() => setIsDevDrawerOpen(true)} 
            onOpenAdminPanel={() => setIsAdminPanelOpen(true)}
          />
        </main>

        {/* Android Bottom Navigation Bar */}
        <BottomNav lang={lang} activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Join Tester Modal Popup */}
      <JoinTesterModal 
        isOpen={isJoinTesterModalOpen} 
        onClose={() => setIsJoinTesterModalOpen(false)} 
        onTesterAdded={(newList) => {
          setTesters(newList);
          localStorage.setItem('baluka_soft_beta_testers', JSON.stringify(newList));
        }} 
        lang={lang} 
      />

      {/* Secret Developer Drawer */}
      <DevDrawer 
        isOpen={isDevDrawerOpen} 
        onClose={() => setIsDevDrawerOpen(false)} 
        testers={testers} 
        setTesters={(newList) => {
          setTesters(newList);
          localStorage.setItem('baluka_soft_beta_testers', JSON.stringify(newList));
        }}
        lang={lang}
        t={t}
      />

      {/* Comprehensive Admin Control Panel Modal */}
      <AdminPanel 
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
        appsList={appsList}
        setAppsList={setAppsList}
        founder={founder}
        setFounder={setFounder}
        siteSettings={siteSettings}
        setSiteSettings={setSiteSettings}
        testers={testers}
        setTesters={setTesters}
        lang={lang}
      />
    </div>
  );
}
