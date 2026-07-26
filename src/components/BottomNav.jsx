import React from 'react';
import { Home, Smartphone, Sparkles, User, Mail } from 'lucide-react';

export default function BottomNav({ lang, activeTab, setActiveTab }) {
  return (
    <div className="mobile-bottom-nav">
      <a 
        href="#apps" 
        className={`bottom-nav-item ${activeTab === 'apps' ? 'active' : ''}`}
        onClick={() => setActiveTab('apps')}
      >
        <Smartphone size={20} />
        <span>Mobile Apps</span>
      </a>

      <a 
        href="#beta" 
        className={`bottom-nav-item ${activeTab === 'beta' ? 'active' : ''}`}
        onClick={() => setActiveTab('beta')}
      >
        <Sparkles size={20} />
        <span>Beta Apps</span>
      </a>

      <a 
        href="#founder" 
        className={`bottom-nav-item ${activeTab === 'founder' ? 'active' : ''}`}
        onClick={() => setActiveTab('founder')}
      >
        <User size={20} />
        <span>Developer</span>
      </a>

      <a 
        href="#contact" 
        className={`bottom-nav-item ${activeTab === 'contact' ? 'active' : ''}`}
        onClick={() => setActiveTab('contact')}
      >
        <Mail size={20} />
        <span>Support</span>
      </a>
    </div>
  );
}
