import React, { useState } from 'react';
import { 
  X, Plus, Edit3, Trash2, Save, Download, Upload, RotateCcw, 
  ShieldCheck, Lock, Smartphone, User, Settings, Mail, Globe, 
  Code2, Sparkles, Key, CheckCircle2, Layers, Sliders, Database,
  Eye, EyeOff, AlertTriangle, ArrowRight, ExternalLink, Image as ImageIcon,
  MessageSquare, Send, Reply, Check
} from 'lucide-react';
import { appsData as initialAppsData, founderDetails as initialFounderDetails, defaultSiteSettings } from '../data/appsData';
import './AdminPanel.css';

export default function AdminPanel({
  isOpen,
  onClose,
  appsList,
  setAppsList,
  founder,
  setFounder,
  siteSettings,
  setSiteSettings,
  testers,
  setTesters,
  contactMessages = [],
  setContactMessages,
  lang
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Active Tab: 'apps' | 'founder' | 'site' | 'testers' | 'backup'
  const [activeTab, setActiveTab] = useState('apps');
  const [inboxSubTab, setInboxSubTab] = useState('messages'); // 'messages' | 'testers'

  // App Editor Modal State
  const [editingApp, setEditingApp] = useState(null); // null when not editing/adding
  const [appFormData, setAppFormData] = useState(getEmptyAppForm());

  // Password Change Form State
  const [pwdChangeForm, setPwdChangeForm] = useState({ current: '', newPwd: '', confirmPwd: '' });
  const [showPwdFormToggle, setShowPwdFormToggle] = useState(false);

  // Toast alert
  const [toastMsg, setToastMsg] = useState('');

  if (!isOpen) return null;

  function showToast(msg) {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  }

  const handleUpdateAdminPassword = (e) => {
    e.preventDefault();
    const currentSaved = siteSettings?.adminPassword || 'admin';
    
    if (pwdChangeForm.current !== currentSaved) {
      alert(lang === 'bn' ? 'বর্তমান পাসওয়ার্ডটি সঠিক নয়!' : 'Current password does not match!');
      return;
    }

    if (!pwdChangeForm.newPwd) {
      alert(lang === 'bn' ? 'নতুন পাসওয়ার্ড প্রদান করুন!' : 'Please enter a new password!');
      return;
    }

    if (pwdChangeForm.newPwd !== pwdChangeForm.confirmPwd) {
      alert(lang === 'bn' ? 'নতুন দুটি পাসওয়ার্ড মিলছে না!' : 'New passwords do not match!');
      return;
    }

    const updatedSettings = { ...siteSettings, adminPassword: pwdChangeForm.newPwd };
    setSiteSettings(updatedSettings);
    localStorage.setItem('baluka_soft_site_settings', JSON.stringify(updatedSettings));
    setPwdChangeForm({ current: '', newPwd: '', confirmPwd: '' });
    showToast(lang === 'bn' ? 'অ্যাডমিন পাসওয়ার্ড সফলভাবে আপডেট হয়েছে! 🔑' : 'Admin password updated successfully! 🔑');
  };

  function getEmptyAppForm() {
    return {
      id: '',
      title: '',
      tagline: '',
      status: 'beta',
      category: 'Productivity & Utility',
      rating: 'Beta 1.0',
      reviewsCount: 'Closed Beta',
      downloads: 'Testing Mode',
      version: 'v1.0.0-beta',
      size: '15 MB',
      icon: '/assets/money_manage_pro_logo.png',
      banner: '/assets/money_manage_pro_logo.png',
      description: '',
      features: ['অটোমেটিক ক্লাউড সিঙ্ক ও ব্যাকআপ', 'ইউজার ফ্রেন্ডলি আধুনিক ইন্টারফেস'],
      playStoreUrl: 'https://play.google.com',
      internalTestUrl: 'https://play.google.com',
      webDemoUrl: '#',
      apkUrl: '#',
      isFeaturedBeta: false
    };
  }

  // --- Image Upload Helper (Converts File -> Base64 Data URL) ---
  const handleFileUpload = (e, callback) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert(lang === 'bn' ? 'দয়া করে একটি সঠিক ইমেজ ফাইল সিলেক্ট করুন (PNG, JPG, SVG, WebP)' : 'Please select a valid image file (PNG, JPG, SVG, WebP)');
      return;
    }
    const reader = new FileReader();
    reader.onload = (evt) => {
      callback(evt.target.result);
      showToast(lang === 'bn' ? 'ইমেজ আপলোড হয়েছে! 🖼️' : 'Image uploaded successfully! 🖼️');
    };
    reader.readAsDataURL(file);
  };

  // --- Auth Handler ---
  const handleLogin = (e) => {
    e.preventDefault();
    const correctPassword = siteSettings?.adminPassword || 'admin';
    if (passwordInput === correctPassword) {
      setIsAuthenticated(true);
      setAuthError('');
      setPasswordInput('');
    } else {
      setAuthError(lang === 'bn' ? 'ভুল পাসওয়ার্ড! আবার চেষ্টা করুন।' : 'Invalid Admin Password! Please try again.');
    }
  };

  // --- App Management Handlers ---
  const handleOpenAddApp = () => {
    const newForm = getEmptyAppForm();
    newForm.id = `app-${Date.now()}`;
    setEditingApp({ isNew: true });
    setAppFormData(newForm);
  };

  const handleOpenEditApp = (app) => {
    setEditingApp({ isNew: false, originalId: app.id });
    setAppFormData({ ...app });
  };

  const handleSaveAppForm = (e) => {
    e.preventDefault();
    if (!appFormData.title || !appFormData.description) {
      alert(lang === 'bn' ? 'দয়া করে অ্যাপের নাম ও বর্ণনা দিন' : 'Please provide app title & description');
      return;
    }

    let updatedApps = [...appsList];

    if (appFormData.isFeaturedBeta) {
      // Unset featured flag from other apps if this one is featured
      updatedApps = updatedApps.map(a => ({ ...a, isFeaturedBeta: false }));
    }

    if (editingApp.isNew) {
      updatedApps.unshift(appFormData);
    } else {
      updatedApps = updatedApps.map(a => a.id === editingApp.originalId ? appFormData : a);
    }

    setAppsList(updatedApps);
    localStorage.setItem('baluka_soft_apps', JSON.stringify(updatedApps));
    setEditingApp(null);
    showToast(lang === 'bn' ? 'অ্যাপ তথ্য সফলভাবে সংরক্ষিত হয়েছে! ✅' : 'App details saved successfully! ✅');
  };

  const handleDeleteApp = (appId) => {
    if (window.confirm(lang === 'bn' ? 'আপনি কি নিশ্চিত যে এই অ্যাপটি ডিলিট করতে চান?' : 'Are you sure you want to delete this app?')) {
      const updated = appsList.filter(a => a.id !== appId);
      setAppsList(updated);
      localStorage.setItem('baluka_soft_apps', JSON.stringify(updated));
      showToast(lang === 'bn' ? 'অ্যাপ ডিলিট করা হয়েছে! 🗑️' : 'App deleted! 🗑️');
    }
  };

  // --- Founder Profile Handlers ---
  const handleFounderChange = (field, value) => {
    const updated = { ...founder, [field]: value };
    setFounder(updated);
    localStorage.setItem('baluka_soft_founder', JSON.stringify(updated));
  };

  const handleFounderSocialChange = (key, value) => {
    const updated = {
      ...founder,
      socials: { ...founder.socials, [key]: value }
    };
    setFounder(updated);
    localStorage.setItem('baluka_soft_founder', JSON.stringify(updated));
  };

  const handleAddSkill = () => {
    const skillName = prompt(lang === 'bn' ? 'নতুন স্কিলের নাম দিন (যেমন: Kotlin):' : 'Enter new skill name:');
    if (!skillName) return;
    const skillLvl = prompt(lang === 'bn' ? 'দক্ষতার পর্যায় দিন (Expert/Advanced/Intermediate):' : 'Enter proficiency level:', 'Advanced');
    
    const updatedSkills = [...(founder.skills || []), { name: skillName, level: skillLvl || 'Advanced' }];
    const updated = { ...founder, skills: updatedSkills };
    setFounder(updated);
    localStorage.setItem('baluka_soft_founder', JSON.stringify(updated));
    showToast(lang === 'bn' ? 'নতুন স্কিল যুক্ত হয়েছে! ⚡' : 'New skill added! ⚡');
  };

  const handleDeleteSkill = (index) => {
    const updatedSkills = founder.skills.filter((_, i) => i !== index);
    const updated = { ...founder, skills: updatedSkills };
    setFounder(updated);
    localStorage.setItem('baluka_soft_founder', JSON.stringify(updated));
  };

  // --- Site Settings Handlers ---
  const handleSiteSettingChange = (field, value) => {
    const updated = { ...siteSettings, [field]: value };
    setSiteSettings(updated);
    localStorage.setItem('baluka_soft_site_settings', JSON.stringify(updated));
  };

  // --- Contact Messages Handlers ---
  const handleReplyToContactMessage = (msg) => {
    const mailSubject = encodeURIComponent(`Re: Inquiry from Baluka Soft`);
    const mailBody = encodeURIComponent(`Hi ${msg.name},\n\nThank you for reaching out to Baluka Soft!\n\nRegarding your message:\n"${msg.message}"\n\n---\nBest regards,\nKabir Hossen Shuvo\nFounder & Lead Developer, Baluka Soft\n${siteSettings?.supportEmail || 'contact@balukasoft.com'}`);
    
    // Open Mail Client
    window.location.href = `mailto:${msg.email}?subject=${mailSubject}&body=${mailBody}`;

    // Mark message as replied
    const updated = contactMessages.map(m => m.id === msg.id ? { ...m, status: 'replied' } : m);
    setContactMessages(updated);
    localStorage.setItem('baluka_soft_contact_messages', JSON.stringify(updated));
    showToast(lang === 'bn' ? 'ইমেইল ক্লায়েন্ট খোলা হচ্ছে... ✉️' : 'Opening Email Client... ✉️');
  };

  const handleDeleteContactMessage = (id) => {
    if (window.confirm(lang === 'bn' ? 'আপনি কি নিশ্চিত যে এই মেসেজটি মুছে ফেলতে চান?' : 'Are you sure you want to delete this message?')) {
      const updated = contactMessages.filter(m => m.id !== id);
      setContactMessages(updated);
      localStorage.setItem('baluka_soft_contact_messages', JSON.stringify(updated));
      showToast(lang === 'bn' ? 'মেসেজ ডিলিট করা হয়েছে! 🗑️' : 'Message deleted! 🗑️');
    }
  };

  // --- Beta Testers Handlers ---
  const handleReplyToTester = (t) => {
    const targetApp = t.appName || 'Money Manage Pro';
    const mailSubject = encodeURIComponent(`Google Play Internal Testing Invitation - Baluka Soft`);
    const mailBody = encodeURIComponent(`Hi ${t.name},\n\nThank you for applying to join the Google Play Internal Beta Testing program for "${targetApp}"!\n\nYour Google Play email (${t.email}) has been added to our authorized tester list.\n\nClick the link below to accept the testing invitation and download the app directly from Google Play Store:\nhttps://play.google.com/apps/internaltest/4701488665356819853\n\nBest regards,\nBaluka Soft Team`);

    window.location.href = `mailto:${t.email}?subject=${mailSubject}&body=${mailBody}`;
    showToast(lang === 'bn' ? 'টেস্টার ইনভাইট মেইল ক্লায়েন্ট খোলা হচ্ছে... ✉️' : 'Opening email invitation to tester... ✉️');
  };

  const handleAddManualTester = (e) => {
    e.preventDefault();
    const name = e.target.testerName.value;
    const email = e.target.testerEmail.value;
    const os = e.target.testerOs.value;
    const appName = e.target.testerApp.value;

    if (!name || !email) return;

    const newTester = {
      id: Date.now().toString(),
      name,
      email,
      os: os || 'Android',
      appName: appName || 'Money Manage Pro',
      date: new Date().toLocaleDateString('en-GB')
    };

    const updated = [newTester, ...testers];
    setTesters(updated);
    localStorage.setItem('baluka_soft_beta_testers', JSON.stringify(updated));
    e.target.reset();
    showToast(lang === 'bn' ? 'ম্যানুয়াল টেস্টার এনট্রি যুক্ত হয়েছে! 👤' : 'Tester added manually! 👤');
  };

  const handleDeleteTester = (id) => {
    const updated = testers.filter(t => t.id !== id);
    setTesters(updated);
    localStorage.setItem('baluka_soft_beta_testers', JSON.stringify(updated));
  };

  const handleExportCSV = () => {
    if (!testers || testers.length === 0) return alert('No testers available');
    const headers = ['ID', 'Name', 'Email', 'OS', 'Target App', 'Date'];
    const csvRows = [
      headers.join(','),
      ...testers.map(t => [`"${t.id}"`, `"${t.name}"`, `"${t.email}"`, `"${t.os}"`, `"${t.appName}"`, `"${t.date}"`].join(','))
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvRows.join('\n'));
    const link = document.createElement('a');
    link.href = csvContent;
    link.download = `baluka_soft_beta_testers_${Date.now()}.csv`;
    link.click();
  };

  // --- Export / Import Config & Reset ---
  const handleExportFullJSON = () => {
    const backupData = {
      timestamp: new Date().toISOString(),
      appsList,
      founder,
      siteSettings,
      testers,
      contactMessages
    };
    const jsonStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const link = document.createElement('a');
    link.href = jsonStr;
    link.download = `baluka_soft_full_backup_${Date.now()}.json`;
    link.click();
    showToast(lang === 'bn' ? 'সম্পূর্ণ ব্যাকআপ ফাইল ডাউনলোড হয়েছে! 📥' : 'Full site backup exported! 📥');
  };

  const handleImportFullJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (imported.appsList) {
          setAppsList(imported.appsList);
          localStorage.setItem('baluka_soft_apps', JSON.stringify(imported.appsList));
        }
        if (imported.founder) {
          setFounder(imported.founder);
          localStorage.setItem('baluka_soft_founder', JSON.stringify(imported.founder));
        }
        if (imported.siteSettings) {
          setSiteSettings(imported.siteSettings);
          localStorage.setItem('baluka_soft_site_settings', JSON.stringify(imported.siteSettings));
        }
        if (imported.testers) {
          setTesters(imported.testers);
          localStorage.setItem('baluka_soft_beta_testers', JSON.stringify(imported.testers));
        }
        if (imported.contactMessages) {
          setContactMessages(imported.contactMessages);
          localStorage.setItem('baluka_soft_contact_messages', JSON.stringify(imported.contactMessages));
        }
        showToast(lang === 'bn' ? 'ব্যাকআপ ডাটা সফলভাবে রিস্টোর হয়েছে! 🎉' : 'Backup restored successfully! 🎉');
      } catch (err) {
        alert('Invalid JSON File Format');
      }
    };
    reader.readAsText(file);
  };

  const handleResetToDefaults = () => {
    if (window.confirm(lang === 'bn' ? 'আপনি কি নিশ্চিত যে সকল এডিটেড ডাটা মুছে অরিজিনাল ডেফোল্ট ডাটায় রিস্টোর করতে চান?' : 'Are you sure you want to reset everything back to initial defaults?')) {
      localStorage.removeItem('baluka_soft_apps');
      localStorage.removeItem('baluka_soft_founder');
      localStorage.removeItem('baluka_soft_site_settings');
      localStorage.removeItem('baluka_soft_beta_testers');
      localStorage.removeItem('baluka_soft_contact_messages');

      setAppsList(initialAppsData);
      setFounder(initialFounderDetails);
      setSiteSettings(defaultSiteSettings);
      setTesters([]);
      setContactMessages([]);
      showToast(lang === 'bn' ? 'সকল ডাটা অরিজিনাল ডাটায় রিস্টোর করা হয়েছে! 🔄' : 'Reset to default data completed! 🔄');
    }
  };

  const unreadMessagesCount = contactMessages.filter(m => m.status === 'unread').length;

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-panel-container" onClick={e => e.stopPropagation()}>
        
        {/* Top Floating Notification Toast */}
        {toastMsg && (
          <div className="admin-toast-banner">
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Header Bar */}
        <div className="admin-panel-header">
          <div className="admin-header-title">
            <ShieldCheck size={26} className="green-accent-icon" />
            <div>
              <h2>Baluka Soft Admin Control Panel</h2>
              <p className="admin-subtext">
                {lang === 'bn' ? 'ফ্রন্টএন্ডের সকল কনটেন্ট, ইমেইল ইনবক্স ও বিটা টেস্টার পরিচালনা করুন' : 'Real-time Content Management & Frontend Control Center'}
              </p>
            </div>
          </div>

          <div className="admin-header-controls">
            {isAuthenticated && (
              <button className="admin-btn-logout" onClick={() => setIsAuthenticated(false)}>
                <Lock size={15} />
                <span>{lang === 'bn' ? 'লক করুন' : 'Lock Panel'}</span>
              </button>
            )}
            <button className="admin-close-btn" onClick={onClose} title="Close Admin Panel">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* If Not Authenticated -> Show Password Login Gate */}
        {!isAuthenticated ? (
          <div className="admin-login-wrapper">
            <div className="admin-login-card">
              <div className="login-icon-circle">
                <Lock size={32} className="green-accent-icon" />
              </div>
              <h3>{lang === 'bn' ? 'অ্যাডমিন সিকিউরিটি অ্যাক্সেস' : 'Admin Portal Authentication'}</h3>
              <p className="login-subtext">
                {lang === 'bn' ? 'অ্যাডমিন প্যানেলে প্রবেশ করতে সিকিউরিটি পাসওয়ার্ডটি লিখুন (ডিফল্ট: admin)' : 'Enter Admin Password to access panel (Default: admin)'}
              </p>

              <form onSubmit={handleLogin} className="admin-login-form">
                <div className="admin-password-box">
                  <Key size={18} className="input-prefix-icon" />
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    placeholder={lang === 'bn' ? 'পাসওয়ার্ড লিখুন...' : 'Enter password...'}
                    value={passwordInput}
                    onChange={e => setPasswordInput(e.target.value)}
                    autoFocus
                  />
                  <button 
                    type="button" 
                    className="pwd-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {authError && <div className="admin-error-alert">{authError}</div>}

                <button type="submit" className="admin-btn-primary full-width mt-3">
                  <span>{lang === 'bn' ? 'অ্যাডমিন প্যানেল খুলুন' : 'Unlock Control Panel'}</span>
                  <ArrowRight size={18} />
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Authenticated -> Show Full Admin Panel Tabs & Editors */
          <div className="admin-panel-body">
            
            {/* Admin Tabs Navigation Bar */}
            <div className="admin-tabs-bar">
              <button 
                className={`admin-tab-btn ${activeTab === 'apps' ? 'active' : ''}`}
                onClick={() => setActiveTab('apps')}
              >
                <Smartphone size={17} />
                <span>{lang === 'bn' ? 'অ্যাপস ম্যানেজমেন্ট (' + appsList.length + ')' : 'Apps Manager (' + appsList.length + ')'}</span>
              </button>

              <button 
                className={`admin-tab-btn ${activeTab === 'founder' ? 'active' : ''}`}
                onClick={() => setActiveTab('founder')}
              >
                <User size={17} />
                <span>{lang === 'bn' ? 'প্রতিষ্ঠাতা ও প্রোফাইল' : 'Founder & Studio'}</span>
              </button>

              <button 
                className={`admin-tab-btn ${activeTab === 'site' ? 'active' : ''}`}
                onClick={() => setActiveTab('site')}
              >
                <Sliders size={17} />
                <span>{lang === 'bn' ? 'হিরো ও সাইট সেটিংস' : 'Hero & Site Config'}</span>
              </button>

              <button 
                className={`admin-tab-btn ${activeTab === 'testers' ? 'active' : ''}`}
                onClick={() => setActiveTab('testers')}
              >
                <MessageSquare size={17} />
                <span>
                  {lang === 'bn' ? 'ইনবক্স ও টেস্টার' : 'Inbox & Testers'}
                  {unreadMessagesCount > 0 && <span className="tab-unread-badge">{unreadMessagesCount}</span>}
                </span>
              </button>

              <button 
                className={`admin-tab-btn ${activeTab === 'backup' ? 'active' : ''}`}
                onClick={() => setActiveTab('backup')}
              >
                <Settings size={17} />
                <span>{lang === 'bn' ? 'ব্যাকআপ ও সিস্টেম' : 'Backup & Security'}</span>
              </button>
            </div>

            {/* TAB 1: APPS MANAGEMENT */}
            {activeTab === 'apps' && (
              <div className="admin-tab-content">
                <div className="tab-actions-header">
                  <div>
                    <h3>{lang === 'bn' ? 'অ্যাপস তালিকা ও তথ্য সম্পাদনা' : 'Android App Catalog Management'}</h3>
                    <p className="subtext">{lang === 'bn' ? 'আপনার সকল পাবলিশড ও বিটা অ্যাপস যোগ, এডিট বা ডিলিট করুন' : 'Add, modify details, change status, or remove apps'}</p>
                  </div>
                  <button className="admin-btn-success" onClick={handleOpenAddApp}>
                    <Plus size={18} />
                    <span>{lang === 'bn' ? 'নতুন অ্যাপ যোগ করুন' : 'Add New App'}</span>
                  </button>
                </div>

                <div className="admin-apps-list-grid">
                  {appsList.map((app) => (
                    <div className="admin-app-item-card" key={app.id}>
                      <div className="app-card-left">
                        <img src={app.icon} alt={app.title} className="admin-app-thumb" />
                        <div className="app-card-meta">
                          <div className="flex items-center gap-2">
                            <h4 className="app-card-title">{app.title}</h4>
                            <span className={`admin-status-badge ${app.status}`}>
                              {app.status.toUpperCase()}
                            </span>
                            {app.isFeaturedBeta && (
                              <span className="admin-status-badge featured">⭐ Featured Beta</span>
                            )}
                          </div>
                          <p className="app-card-tagline">{app.tagline}</p>
                          <div className="app-card-subinfo">
                            <span>Category: <strong>{app.category}</strong></span> • 
                            <span> Version: <strong>{app.version}</strong></span> • 
                            <span> Size: <strong>{app.size}</strong></span>
                          </div>
                        </div>
                      </div>

                      <div className="app-card-right-actions">
                        <button 
                          className="admin-btn-edit"
                          onClick={() => handleOpenEditApp(app)}
                          title="Edit App Details"
                        >
                          <Edit3 size={16} />
                          <span>{lang === 'bn' ? 'এডিট' : 'Edit'}</span>
                        </button>
                        <button 
                          className="admin-btn-delete"
                          onClick={() => handleDeleteApp(app.id)}
                          title="Delete App"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: FOUNDER & STUDIO PROFILE */}
            {activeTab === 'founder' && (
              <div className="admin-tab-content">
                <div className="tab-actions-header">
                  <div>
                    <h3>{lang === 'bn' ? 'প্রতিষ্ঠাতা ও স্টুডিও প্রোফাইল এডিটর' : 'Founder & Company Details'}</h3>
                    <p className="subtext">{lang === 'bn' ? 'ডেভেলপারের তথ্য, বায়ো, ছবি, সাইট লোগো ও স্কিল সেট সমুহ আপডেট করুন' : 'Edit founder info, bios, images, site logo & skills'}</p>
                  </div>
                  <button className="admin-btn-primary" onClick={() => showToast('Founder details saved!')}>
                    <Save size={16} />
                    <span>{lang === 'bn' ? 'সংরক্ষিত হয়েছে' : 'Saved Live'}</span>
                  </button>
                </div>

                <div className="admin-form-grid-2col">
                  {/* Basic Info */}
                  <div className="admin-card-section">
                    <h4>👤 General Details</h4>
                    <div className="admin-input-field">
                      <label>Founder Name (নাম)</label>
                      <input 
                        type="text" 
                        value={founder.founderName || ''}
                        onChange={e => handleFounderChange('founderName', e.target.value)}
                      />
                    </div>

                    <div className="admin-input-field">
                      <label>Founder Role / Title (পদবী)</label>
                      <input 
                        type="text" 
                        value={founder.founderRole || ''}
                        onChange={e => handleFounderChange('founderRole', e.target.value)}
                      />
                    </div>

                    <div className="admin-input-field">
                      <label>Company Name (প্রতিষ্ঠানের নাম)</label>
                      <input 
                        type="text" 
                        value={founder.companyName || ''}
                        onChange={e => handleFounderChange('companyName', e.target.value)}
                      />
                    </div>

                    {/* Site Logo Uploader */}
                    <div className="admin-input-field">
                      <label>Site Logo (ওয়েবসাইট লোগো)</label>
                      <div className="admin-image-uploader-box">
                        <img src={founder.logo || '/assets/logo.png'} alt="Site Logo" className="image-preview-thumb logo" />
                        <div className="uploader-controls">
                          <label className="admin-upload-btn">
                            <Upload size={14} />
                            <span>{lang === 'bn' ? 'লোগো ফাইল আপলোড' : 'Upload Logo File'}</span>
                            <input 
                              type="file" 
                              accept="image/*"
                              onChange={e => handleFileUpload(e, dataUrl => handleFounderChange('logo', dataUrl))}
                              style={{ display: 'none' }}
                            />
                          </label>
                          <input 
                            type="text" 
                            placeholder="or Image URL..."
                            value={founder.logo || ''}
                            onChange={e => handleFounderChange('logo', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Founder Photo Uploader */}
                    <div className="admin-input-field">
                      <label>Founder Avatar Photo (ডেভেলপারের ছবি)</label>
                      <div className="admin-image-uploader-box">
                        <img src={founder.avatar || '/assets/shuvo_photo.png'} alt="Founder Photo" className="image-preview-thumb avatar" />
                        <div className="uploader-controls">
                          <label className="admin-upload-btn">
                            <Upload size={14} />
                            <span>{lang === 'bn' ? 'ছবি ফাইল আপলোড' : 'Upload Photo File'}</span>
                            <input 
                              type="file" 
                              accept="image/*"
                              onChange={e => handleFileUpload(e, dataUrl => handleFounderChange('avatar', dataUrl))}
                              style={{ display: 'none' }}
                            />
                          </label>
                          <input 
                            type="text" 
                            placeholder="or Image URL..."
                            value={founder.avatar || ''}
                            onChange={e => handleFounderChange('avatar', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bios */}
                  <div className="admin-card-section">
                    <h4>📝 Founder Bio & Taglines</h4>
                    <div className="admin-input-field">
                      <label>Bangla Bio (বাংলা বায়ো)</label>
                      <textarea 
                        rows="3"
                        value={founder.bioBn || ''}
                        onChange={e => handleFounderChange('bioBn', e.target.value)}
                      ></textarea>
                    </div>

                    <div className="admin-input-field">
                      <label>English Bio (ইংরেজি বায়ো)</label>
                      <textarea 
                        rows="3"
                        value={founder.bioEn || ''}
                        onChange={e => handleFounderChange('bioEn', e.target.value)}
                      ></textarea>
                    </div>
                  </div>

                  {/* Skills Editor */}
                  <div className="admin-card-section">
                    <div className="flex items-center justify-between mb-2">
                      <h4>⚡ Technical Skills ({founder.skills?.length || 0})</h4>
                      <button className="admin-btn-sm-success" onClick={handleAddSkill}>
                        <Plus size={14} /> Add Skill
                      </button>
                    </div>

                    <div className="skills-tags-manager">
                      {founder.skills?.map((sk, idx) => (
                        <div className="admin-skill-chip-edit" key={idx}>
                          <span><strong>{sk.name}</strong> ({sk.level})</span>
                          <button onClick={() => handleDeleteSkill(idx)} title="Remove skill">
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="admin-card-section">
                    <h4>🌐 Social Media & Contact Links</h4>
                    <div className="admin-input-field">
                      <label>Telegram Link</label>
                      <input 
                        type="text" 
                        value={founder.socials?.telegram || ''}
                        onChange={e => handleFounderSocialChange('telegram', e.target.value)}
                      />
                    </div>

                    <div className="admin-input-field">
                      <label>WhatsApp Group Link</label>
                      <input 
                        type="text" 
                        value={founder.socials?.whatsappGroup || ''}
                        onChange={e => handleFounderSocialChange('whatsappGroup', e.target.value)}
                      />
                    </div>

                    <div className="admin-input-field">
                      <label>Email Support</label>
                      <input 
                        type="text" 
                        value={founder.socials?.email || ''}
                        onChange={e => handleFounderSocialChange('email', e.target.value)}
                      />
                    </div>

                    <div className="admin-input-field">
                      <label>Play Store Developer Profile</label>
                      <input 
                        type="text" 
                        value={founder.socials?.playStore || ''}
                        onChange={e => handleFounderSocialChange('playStore', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: HERO & SITE CONFIG */}
            {activeTab === 'site' && (
              <div className="admin-tab-content">
                <div className="tab-actions-header">
                  <div>
                    <h3>{lang === 'bn' ? 'হিরো সেকশন ও ওয়েব পরিচিতি সেটিংস' : 'Hero Section & Site Customization'}</h3>
                    <p className="subtext">{lang === 'bn' ? 'ওয়েবসাইটের টাইটেল, মেসেজ, ব্যাকগ্রাউন্ড ও লোকেশন এডিট করুন' : 'Edit hero banner texts, protect badges, support info and background animations'}</p>
                  </div>
                </div>

                <div className="admin-form-grid-2col">
                  <div className="admin-card-section">
                    <h4>🔥 Hero Title & Subtitles</h4>
                    <div className="admin-input-field">
                      <label>Hero Title (Bangla)</label>
                      <input 
                        type="text" 
                        value={siteSettings.heroTitleBn || ''}
                        onChange={e => handleSiteSettingChange('heroTitleBn', e.target.value)}
                      />
                    </div>

                    <div className="admin-input-field">
                      <label>Hero Subtitle (Bangla)</label>
                      <textarea 
                        rows="2"
                        value={siteSettings.heroSubtitleBn || ''}
                        onChange={e => handleSiteSettingChange('heroSubtitleBn', e.target.value)}
                      ></textarea>
                    </div>

                    <div className="admin-input-field">
                      <label>Hero Subtitle (English)</label>
                      <textarea 
                        rows="2"
                        value={siteSettings.heroSubtitleEn || ''}
                        onChange={e => handleSiteSettingChange('heroSubtitleEn', e.target.value)}
                      ></textarea>
                    </div>
                  </div>

                  <div className="admin-card-section">
                    <h4>🛡️ Badges & Location Info</h4>
                    <div className="admin-input-field">
                      <label>Security Badge Text</label>
                      <input 
                        type="text" 
                        value={siteSettings.protectBadgeText || ''}
                        onChange={e => handleSiteSettingChange('protectBadgeText', e.target.value)}
                      />
                    </div>

                    <div className="admin-input-field">
                      <label>Age Rating Text</label>
                      <input 
                        type="text" 
                        value={siteSettings.ageRatingText || ''}
                        onChange={e => handleSiteSettingChange('ageRatingText', e.target.value)}
                      />
                    </div>

                    <div className="admin-input-field">
                      <label>Support Email Address</label>
                      <input 
                        type="text" 
                        value={siteSettings.supportEmail || ''}
                        onChange={e => handleSiteSettingChange('supportEmail', e.target.value)}
                      />
                    </div>

                    <div className="admin-input-field">
                      <label>Office Address / Location</label>
                      <input 
                        type="text" 
                        value={siteSettings.officeLocation || ''}
                        onChange={e => handleSiteSettingChange('officeLocation', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: INBOX MESSAGES & BETA TESTERS DATABASE */}
            {activeTab === 'testers' && (
              <div className="admin-tab-content">
                <div className="tab-actions-header">
                  <div>
                    <h3>{lang === 'bn' ? 'ইমেইল ইনবক্স বার্তা ও বিটা টেস্টার সমুহ' : 'Inbox Messages & Beta Testers'}</h3>
                    <p className="subtext">{lang === 'bn' ? 'ইউজারদের পাঠানো বার্তা দেখুন এবং এক ক্লিকে সরাসরি ইমেইল রিপ্লাই দিন' : 'View contact messages and beta tester emails with direct reply'}</p>
                  </div>

                  {/* Sub-tab pills */}
                  <div className="inbox-subtab-pills">
                    <button 
                      className={`subtab-pill ${inboxSubTab === 'messages' ? 'active' : ''}`}
                      onClick={() => setInboxSubTab('messages')}
                    >
                      <Mail size={15} />
                      <span>{lang === 'bn' ? 'কন্টাক্ট বার্তা (' + contactMessages.length + ')' : 'Messages (' + contactMessages.length + ')'}</span>
                      {unreadMessagesCount > 0 && <span className="pill-unread-dot"></span>}
                    </button>

                    <button 
                      className={`subtab-pill ${inboxSubTab === 'testers' ? 'active' : ''}`}
                      onClick={() => setInboxSubTab('testers')}
                    >
                      <User size={15} />
                      <span>{lang === 'bn' ? 'বিটা টেস্টার সমুহ (' + testers.length + ')' : 'Beta Testers (' + testers.length + ')'}</span>
                    </button>
                  </div>
                </div>

                {/* SUB TAB 1: CONTACT MESSAGES */}
                {inboxSubTab === 'messages' && (
                  <div className="messages-inbox-wrapper">
                    {contactMessages.length === 0 ? (
                      <div className="empty-state py-4 text-center">
                        <Mail size={40} className="muted-icon mx-auto mb-2" />
                        <p>{lang === 'bn' ? 'কোনো বার্তা পাওয়া যায়নি।' : 'No contact messages found.'}</p>
                      </div>
                    ) : (
                      <div className="contact-messages-cards-list">
                        {contactMessages.map((msg) => (
                          <div className={`contact-msg-card ${msg.status || 'unread'}`} key={msg.id}>
                            <div className="msg-card-top">
                              <div className="msg-user-info">
                                <div className="msg-avatar-circle">
                                  {msg.name?.charAt(0)?.toUpperCase() || 'U'}
                                </div>
                                <div>
                                  <h4 className="msg-user-name">{msg.name}</h4>
                                  <a href={`mailto:${msg.email}`} className="msg-user-email">{msg.email}</a>
                                </div>
                              </div>

                              <div className="msg-card-meta-right">
                                <span className="msg-date-tag">{msg.date}</span>
                                {msg.status === 'replied' ? (
                                  <span className="msg-status-badge replied"><Check size={12} /> Replied</span>
                                ) : (
                                  <span className="msg-status-badge unread">Unread</span>
                                )}
                              </div>
                            </div>

                            <div className="msg-card-body mt-2">
                              <p className="msg-text-content">"{msg.message}"</p>
                            </div>

                            <div className="msg-card-footer mt-3">
                              <button 
                                className="admin-btn-reply-email"
                                onClick={() => handleReplyToContactMessage(msg)}
                              >
                                <Reply size={15} />
                                <span>{lang === 'bn' ? '✉️ সরাসরি ইমেইলে রিপ্লাই দিন' : '✉️ Reply via Email'}</span>
                              </button>

                              <button 
                                className="admin-btn-delete-sm"
                                onClick={() => handleDeleteContactMessage(msg.id)}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* SUB TAB 2: BETA TESTERS DATABASE */}
                {inboxSubTab === 'testers' && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4>📱 Registered Beta Testers List</h4>
                      <button className="admin-btn-primary" onClick={handleExportCSV} disabled={testers.length === 0}>
                        <Download size={15} />
                        <span>{lang === 'bn' ? 'সিএসভি ডাউনলোড (Export CSV)' : 'Export CSV'}</span>
                      </button>
                    </div>

                    {/* Add Manual Tester Box */}
                    <div className="admin-card-section mb-4">
                      <h4>➕ Add Manual Beta Tester (ম্যানুয়ালি টেস্টার যোগ করুন)</h4>
                      <form onSubmit={handleAddManualTester} className="manual-tester-inline-form">
                        <input type="text" name="testerName" placeholder="Full Name" required />
                        <input type="email" name="testerEmail" placeholder="Google Play Email" required />
                        <select name="testerOs" defaultValue="Android">
                          <option value="Android">Android</option>
                          <option value="Windows">Windows</option>
                          <option value="iOS">iOS</option>
                        </select>
                        <input type="text" name="testerApp" placeholder="Target App" defaultValue="Money Manage Pro" />
                        <button type="submit" className="admin-btn-success">
                          <Plus size={16} /> Add Tester
                        </button>
                      </form>
                    </div>

                    {/* Table */}
                    <div className="admin-table-wrapper">
                      {testers.length === 0 ? (
                        <div className="empty-state py-4 text-center">
                          <Mail size={40} className="muted-icon mx-auto mb-2" />
                          <p>{lang === 'bn' ? 'কোনো বিটা টেস্টারের আবেদন পাওয়া যায়নি।' : 'No beta tester submissions found.'}</p>
                        </div>
                      ) : (
                        <table className="admin-table">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Target App</th>
                              <th>Date</th>
                              <th>Action / Reply</th>
                            </tr>
                          </thead>
                          <tbody>
                            {testers.map((t, idx) => (
                              <tr key={t.id || idx}>
                                <td>{idx + 1}</td>
                                <td><strong>{t.name}</strong></td>
                                <td className="highlight-email">{t.email}</td>
                                <td>{t.appName}</td>
                                <td>{t.date}</td>
                                <td>
                                  <div className="flex items-center gap-2">
                                    <button 
                                      className="admin-btn-reply-email-sm"
                                      onClick={() => handleReplyToTester(t)}
                                      title="Send Play Store Invite Email"
                                    >
                                      <Send size={13} />
                                      <span>{lang === 'bn' ? 'ইনভাইট মেইল' : 'Send Invite'}</span>
                                    </button>
                                    <button 
                                      className="admin-btn-sm-danger"
                                      onClick={() => handleDeleteTester(t.id)}
                                      title="Delete tester"
                                    >
                                      <Trash2 size={14} />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* TAB 5: BACKUP & SYSTEM SETTINGS */}
            {activeTab === 'backup' && (
              <div className="admin-tab-content">
                <div className="tab-actions-header">
                  <div>
                    <h3>{lang === 'bn' ? 'সিস্টেম ব্যাকআপ ও সিকিউরিটি' : 'Backup, System Restore & Admin Security'}</h3>
                    <p className="subtext">{lang === 'bn' ? 'অ্যাডমিন পাসওয়ার্ড পরির্তন, সম্পূর্ণ ব্যাকআপ ফাইল এক্সপোর্ট/ইম্পোর্ট করুন' : 'Manage Admin password, save JSON snapshot of site, or restore default data'}</p>
                  </div>
                </div>

                <div className="admin-form-grid-2col">
                  {/* Password Change Form Section */}
                  <div className="admin-card-section">
                    <h4 style={{ color: '#00e676', display: 'flex', items: 'center', gap: '8px' }}>
                      <Key size={18} />
                      <span>{lang === 'bn' ? '🔑 অ্যাডমিন পাসওয়ার্ড পরিবর্তন' : '🔑 Change Admin Password'}</span>
                    </h4>

                    <form onSubmit={handleUpdateAdminPassword} className="change-password-form">
                      <div className="admin-input-field">
                        <label>{lang === 'bn' ? 'বর্তমান পাসওয়ার্ড (Current Password)' : 'Current Password'}</label>
                        <input 
                          type={showPwdFormToggle ? 'text' : 'password'}
                          required
                          placeholder={lang === 'bn' ? 'বর্তমান পাসওয়ার্ডটি লিখুন...' : 'Enter current password...'}
                          value={pwdChangeForm.current}
                          onChange={e => setPwdChangeForm({ ...pwdChangeForm, current: e.target.value })}
                        />
                      </div>

                      <div className="admin-input-field">
                        <label>{lang === 'bn' ? 'নতুন পাসওয়ার্ড (New Password)' : 'New Password'}</label>
                        <input 
                          type={showPwdFormToggle ? 'text' : 'password'}
                          required
                          placeholder={lang === 'bn' ? 'নতুন পাসওয়ার্ডটি লিখুন...' : 'Enter new password...'}
                          value={pwdChangeForm.newPwd}
                          onChange={e => setPwdChangeForm({ ...pwdChangeForm, newPwd: e.target.value })}
                        />
                      </div>

                      <div className="admin-input-field">
                        <label>{lang === 'bn' ? 'পুনরায় নতুন পাসওয়ার্ড (Confirm New Password)' : 'Confirm New Password'}</label>
                        <input 
                          type={showPwdFormToggle ? 'text' : 'password'}
                          required
                          placeholder={lang === 'bn' ? 'পুনরায় নতুন পাসওয়ার্ড লিখুন...' : 'Re-enter new password...'}
                          value={pwdChangeForm.confirmPwd}
                          onChange={e => setPwdChangeForm({ ...pwdChangeForm, confirmPwd: e.target.value })}
                        />
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <button 
                          type="button" 
                          className="pwd-toggle-text-btn"
                          onClick={() => setShowPwdFormToggle(!showPwdFormToggle)}
                          style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '0.8rem', cursor: 'pointer' }}
                        >
                          {showPwdFormToggle ? '🙈 Hide Passwords' : '👁️ Show Passwords'}
                        </button>

                        <button type="submit" className="admin-btn-success">
                          <Save size={15} />
                          <span>{lang === 'bn' ? 'পাসওয়ার্ড সেভ করুন' : 'Update Password'}</span>
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Export / Import Backup JSON */}
                  <div className="admin-card-section">
                    <h4>💾 JSON Backup & Restore</h4>
                    <p className="subtext mb-3">
                      {lang === 'bn' 
                        ? 'আপনার অ্যাপস, প্রোফাইল ও সেটিংস সহ পুরো সাইটের ডাটা একটি ফাইলে ডাউনলোড করে রাখুন।' 
                        : 'Download a full snapshot file of apps, profile and settings.'}
                    </p>

                    <div className="flex gap-2 wrap-actions">
                      <button className="admin-btn-primary" onClick={handleExportFullJSON}>
                        <Download size={16} />
                        <span>Export Backup JSON</span>
                      </button>

                      <label className="admin-btn-secondary-file-input">
                        <Upload size={16} />
                        <span>Import Backup JSON</span>
                        <input type="file" accept=".json" onChange={handleImportFullJSON} style={{ display: 'none' }} />
                      </label>
                    </div>
                  </div>

                  {/* Factory Reset */}
                  <div className="admin-card-section full-width danger-section mt-2">
                    <div className="flex items-center gap-2 mb-1 text-danger">
                      <AlertTriangle size={20} />
                      <h4 style={{ margin: 0 }}>Factory Reset (অরিজিনাল ডাটায় ফিরে যান)</h4>
                    </div>
                    <p className="subtext mb-3">
                      {lang === 'bn' 
                        ? 'যদি কোনো ভুল হয় তবে এক ক্লিকে সাইটের অরিজিনাল বালুকা সফট ডাটায় রিস্টোর করুন।' 
                        : 'Reset all customized apps, bios and settings back to original initial data.'}
                    </p>

                    <button className="admin-btn-danger" onClick={handleResetToDefaults}>
                      <RotateCcw size={16} />
                      <span>{lang === 'bn' ? 'অরিজিনাল ডেফোল্ট ডাটায় রিস্টোর করুন' : 'Reset All to Factory Defaults'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      {/* SUB-MODAL: APP ADD / EDIT FORM */}
      {editingApp && (
        <div className="admin-submodal-overlay" onClick={() => setEditingApp(null)}>
          <div className="admin-submodal-card" onClick={e => e.stopPropagation()}>
            <div className="admin-submodal-header">
              <h3>{editingApp.isNew ? (lang === 'bn' ? 'নতুন অ্যাপ যোগ করুন' : 'Add New Android App') : (lang === 'bn' ? 'অ্যাপ সম্পাদনা (Edit App)' : 'Edit App Details')}</h3>
              <button className="admin-close-btn" onClick={() => setEditingApp(null)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveAppForm} className="admin-app-form-body">
              <div className="admin-form-grid-2col">
                <div className="admin-input-field">
                  <label>App Title (অ্যাপের নাম) *</label>
                  <input 
                    type="text" 
                    required 
                    value={appFormData.title}
                    onChange={e => setAppFormData({ ...appFormData, title: e.target.value })}
                  />
                </div>

                <div className="admin-input-field">
                  <label>Tagline (ছোট বিবরণ)</label>
                  <input 
                    type="text" 
                    value={appFormData.tagline}
                    onChange={e => setAppFormData({ ...appFormData, tagline: e.target.value })}
                  />
                </div>

                <div className="admin-input-field">
                  <label>Status (স্ট্যাটাস)</label>
                  <select 
                    value={appFormData.status}
                    onChange={e => setAppFormData({ ...appFormData, status: e.target.value })}
                  >
                    <option value="beta">Beta (বিটা টেস্টিং)</option>
                    <option value="published">Published (গুগল প্লে রিলিজ)</option>
                  </select>
                </div>

                <div className="admin-input-field">
                  <label>Category (ক্যাটাগরি)</label>
                  <input 
                    type="text" 
                    value={appFormData.category}
                    onChange={e => setAppFormData({ ...appFormData, category: e.target.value })}
                  />
                </div>

                {/* App Icon Upload System */}
                <div className="admin-input-field">
                  <label style={{ color: '#00e676', fontWeight: '700' }}>
                    <ImageIcon size={15} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
                    {lang === 'bn' ? 'অ্যাপের আইকন লোগো (Upload App Icon)' : 'App Icon Logo (Upload File)'}
                  </label>
                  <div className="admin-image-uploader-box highlight">
                    <img src={appFormData.icon} alt="App Icon Preview" className="image-preview-thumb app-icon" />
                    <div className="uploader-controls">
                      <label className="admin-upload-btn prominent">
                        <Upload size={16} />
                        <span>{lang === 'bn' ? '📁 আইকন ফাইল সিলেক্ট করুন' : '📁 Upload Icon File'}</span>
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={e => handleFileUpload(e, dataUrl => setAppFormData({ ...appFormData, icon: dataUrl }))}
                          style={{ display: 'none' }}
                        />
                      </label>
                      <input 
                        type="text" 
                        placeholder={lang === 'bn' ? 'অথবা ইমেজ URL / পাথ...' : 'or Image URL...'}
                        value={appFormData.icon}
                        onChange={e => setAppFormData({ ...appFormData, icon: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* App Banner Upload System */}
                <div className="admin-input-field">
                  <label style={{ color: '#38bdf8', fontWeight: '700' }}>
                    <ImageIcon size={15} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
                    {lang === 'bn' ? 'অ্যাপের ব্যানার/কভার (Upload App Banner)' : 'App Banner / Cover (Upload File)'}
                  </label>
                  <div className="admin-image-uploader-box highlight">
                    <img src={appFormData.banner || appFormData.icon} alt="App Banner Preview" className="image-preview-thumb banner" />
                    <div className="uploader-controls">
                      <label className="admin-upload-btn prominent blue">
                        <Upload size={16} />
                        <span>{lang === 'bn' ? '📁 ব্যানার ফাইল সিলেক্ট করুন' : '📁 Upload Banner File'}</span>
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={e => handleFileUpload(e, dataUrl => setAppFormData({ ...appFormData, banner: dataUrl }))}
                          style={{ display: 'none' }}
                        />
                      </label>
                      <input 
                        type="text" 
                        placeholder={lang === 'bn' ? 'অথবা ব্যানার URL / পাথ...' : 'or Banner URL...'}
                        value={appFormData.banner || ''}
                        onChange={e => setAppFormData({ ...appFormData, banner: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="admin-input-field">
                  <label>Rating (রেটিং)</label>
                  <input 
                    type="text" 
                    value={appFormData.rating}
                    onChange={e => setAppFormData({ ...appFormData, rating: e.target.value })}
                  />
                </div>

                <div className="admin-input-field">
                  <label>Downloads / Installs</label>
                  <input 
                    type="text" 
                    value={appFormData.downloads}
                    onChange={e => setAppFormData({ ...appFormData, downloads: e.target.value })}
                  />
                </div>

                <div className="admin-input-field">
                  <label>Version (ভার্সন)</label>
                  <input 
                    type="text" 
                    value={appFormData.version}
                    onChange={e => setAppFormData({ ...appFormData, version: e.target.value })}
                  />
                </div>

                <div className="admin-input-field">
                  <label>App Size (সাইজ)</label>
                  <input 
                    type="text" 
                    value={appFormData.size}
                    onChange={e => setAppFormData({ ...appFormData, size: e.target.value })}
                  />
                </div>

                <div className="admin-input-field">
                  <label>Play Store Link</label>
                  <input 
                    type="text" 
                    value={appFormData.playStoreUrl}
                    onChange={e => setAppFormData({ ...appFormData, playStoreUrl: e.target.value })}
                  />
                </div>
              </div>

              <div className="admin-input-field mt-2">
                <label>App Full Description (সম্পূর্ণ বর্ণনা) *</label>
                <textarea 
                  rows="3" 
                  required
                  value={appFormData.description}
                  onChange={e => setAppFormData({ ...appFormData, description: e.target.value })}
                ></textarea>
              </div>

              <div className="admin-checkbox-field mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={appFormData.isFeaturedBeta || false}
                    onChange={e => setAppFormData({ ...appFormData, isFeaturedBeta: e.target.checked })}
                  />
                  <span>Set as Featured Beta App (হিরো সেকশনে হাইলাইট করুন)</span>
                </label>
              </div>

              <div className="admin-submodal-footer mt-3">
                <button type="button" className="admin-btn-cancel" onClick={() => setEditingApp(null)}>
                  Cancel
                </button>
                <button type="submit" className="admin-btn-primary">
                  <Save size={16} /> Save App
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
