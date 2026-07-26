import React, { useState } from 'react';
import { Sparkles, Moon, Sun, Languages, Search, Smartphone, User, Mail, UserCheck, Send, MessageCircle, Settings, ShieldCheck } from 'lucide-react';

export default function Navbar({ founder, lang, setLang, theme, setTheme, onOpenJoinTester, onOpenAdminPanel }) {
  const [searchQuery, setSearchQuery] = useState('');

  const siteLogo = founder?.logo || '/assets/logo.png';

  return (
    <header className="play-navbar">
      {/* Top Header Row: Logo + Language & Theme & Admin Action Controls */}
      <div className="play-navbar-top">
        <a href="#home" className="play-logo-box">
          <img src={siteLogo} alt="Baluka Soft Logo" className="play-header-logo" />
          <div className="play-brand-title">
            <span className="play-title-main">Baluka <span className="green-accent">Soft</span></span>
            <span className="play-subtitle">{lang === 'bn' ? 'অফিশিয়াল অ্যাপ স্টোর' : 'Official App Studio'}</span>
          </div>
        </a>

        {/* Top Right Action Buttons */}
        <div className="play-nav-actions">
          <button 
            className="play-icon-btn admin-badge-btn" 
            onClick={onOpenAdminPanel}
            title="Admin Control Panel"
            style={{ border: '1px solid rgba(0, 230, 118, 0.4)', background: 'rgba(0, 230, 118, 0.12)', color: '#00e676' }}
          >
            <ShieldCheck size={16} />
            <span className="btn-lang-text" style={{ fontWeight: '700' }}>Admin</span>
          </button>

          <button 
            className="play-icon-btn" 
            onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
            title="Switch Language"
          >
            <Languages size={16} />
            <span className="btn-lang-text">{lang === 'bn' ? 'EN' : 'বাংলা'}</span>
          </button>

          <button 
            className="play-icon-btn" 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>

      {/* Prominent Full-Width Play Store Search Bar */}
      <div className="play-prominent-search-wrapper">
        <div className="play-big-search-bar">
          <Search size={18} className="search-icon-big" />
          <input 
            type="text" 
            placeholder="Search mobile apps & beta releases..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Marquee Animated Running Category Navigation Track */}
      <div className="marquee-nav-wrapper">
        <div className="play-custom-category-grid marquee-track">
          {/* Main Pills Set */}
          <button 
            onClick={onOpenAdminPanel} 
            className="cat-pill color-green"
            style={{ cursor: 'pointer', border: 'none', font: 'inherit' }}
          >
            <Settings size={16} />
            <span>Admin Panel</span>
          </button>

          <a href="#apps" className="cat-pill color-green">
            <Smartphone size={16} />
            <span>Mobile Apps</span>
          </a>

          <a href="#beta" className="cat-pill color-gold">
            <Sparkles size={16} />
            <span>Beta Apps</span>
          </a>

          <button 
            onClick={onOpenJoinTester} 
            className="cat-pill color-orange"
            style={{ cursor: 'pointer', border: 'none', font: 'inherit' }}
          >
            <UserCheck size={16} />
            <span>Join Tester</span>
          </button>

          <a href="https://t.me/balukasoft" target="_blank" rel="noopener noreferrer" className="cat-pill color-telegram">
            <Send size={15} />
            <span>Telegram Group</span>
          </a>

          <a href="https://chat.whatsapp.com/Jg8hcOaPgnwKHptxLPEtGu" target="_blank" rel="noopener noreferrer" className="cat-pill color-whatsapp">
            <MessageCircle size={15} />
            <span>WhatsApp Group</span>
          </a>

          <a href="#founder" className="cat-pill color-blue">
            <User size={16} />
            <span>Developer</span>
          </a>

          <a href="#contact" className="cat-pill color-purple">
            <Mail size={16} />
            <span>Support</span>
          </a>

          {/* Duplicate Set for Loop */}
          <button 
            onClick={onOpenAdminPanel} 
            className="cat-pill color-green"
            style={{ cursor: 'pointer', border: 'none', font: 'inherit' }}
          >
            <Settings size={16} />
            <span>Admin Panel</span>
          </button>

          <a href="#apps" className="cat-pill color-green">
            <Smartphone size={16} />
            <span>Mobile Apps</span>
          </a>

          <a href="#beta" className="cat-pill color-gold">
            <Sparkles size={16} />
            <span>Beta Apps</span>
          </a>

          <button 
            onClick={onOpenJoinTester} 
            className="cat-pill color-orange"
            style={{ cursor: 'pointer', border: 'none', font: 'inherit' }}
          >
            <UserCheck size={16} />
            <span>Join Tester</span>
          </button>

          <a href="https://t.me/balukasoft" target="_blank" rel="noopener noreferrer" className="cat-pill color-telegram">
            <Send size={15} />
            <span>Telegram Group</span>
          </a>

          <a href="https://chat.whatsapp.com/Jg8hcOaPgnwKHptxLPEtGu" target="_blank" rel="noopener noreferrer" className="cat-pill color-whatsapp">
            <MessageCircle size={15} />
            <span>WhatsApp Group</span>
          </a>

          <a href="#founder" className="cat-pill color-blue">
            <User size={16} />
            <span>Developer</span>
          </a>

          <a href="#contact" className="cat-pill color-purple">
            <Mail size={16} />
            <span>Support</span>
          </a>
        </div>
      </div>
    </header>
  );
}
