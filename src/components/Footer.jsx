import React from 'react';
import { Heart, ShieldCheck, Smartphone, Mail } from 'lucide-react';

export default function Footer({ founder, siteSettings, lang, t, onOpenAdminPanel }) {
  const emailVal = siteSettings?.supportEmail || 'contact@balukasoft.com';
  const locationVal = siteSettings?.officeLocation || 'Kuakata Sikder Resort, Bangladesh';
  const founderName = founder?.founderName || 'Kabir Hossen Shuvo';

  return (
    <footer className="play-footer">
      <div className="play-footer-top">
        <div className="play-footer-brand-col">
          <div className="play-footer-logo-row">
            <img src="/assets/logo.png" alt="Baluka Soft Logo" className="play-footer-logo" />
            <div>
              <h3 className="play-footer-title">Baluka <span className="green-accent">Soft</span></h3>
              <p className="play-footer-sub">Official Android App Studio & Beta Portal</p>
            </div>
          </div>
          <p className="play-footer-about">
            {lang === 'bn' 
              ? 'আমরা অ্যান্ড্রোয়েড মোবাইল প্ল্যাটফর্মের জন্য মানসম্মত, সিকিউর ও ইউজার-ফ্রেন্ডলি অ্যাপ্লিকেশন তৈরি করি।'
              : 'Developing high-performance, secure, and user-friendly Android mobile applications.'}
          </p>

          <div className="play-footer-badge">
            <ShieldCheck size={16} className="green-text" />
            <span>Baluka Play Protect Verified</span>
          </div>
        </div>

        <div className="play-footer-col">
          <h4>{lang === 'bn' ? 'নেভিগেশন' : 'Navigation'}</h4>
          <ul>
            <li><a href="#home">{t.navHome}</a></li>
            <li><a href="#apps">{t.navPublishedApps}</a></li>
            <li><a href="#beta">{t.navBetaTesting}</a></li>
            <li><a href="#founder">{t.navFounder}</a></li>
            <li><a href="#contact">{t.navContact}</a></li>
          </ul>
        </div>

        <div className="play-footer-col">
          <h4>{lang === 'bn' ? 'অ্যাপ ক্যাটাগরি' : 'Categories'}</h4>
          <ul>
            <li><a href="#apps">Finance & Budget</a></li>
            <li><a href="#apps">Islamic & Utility</a></li>
            <li><a href="#apps">Travel & Resort Guide</a></li>
            <li><a href="#beta">Early Access Beta</a></li>
          </ul>
        </div>

        <div className="play-footer-col">
          <h4>{lang === 'bn' ? 'ডেভেলপার এন্ড সাপোর্ট' : 'Developer & Support'}</h4>
          <p className="footer-contact-item"><Mail size={14} /> {emailVal}</p>
          <p className="footer-contact-item"><Smartphone size={14} /> {locationVal}</p>
          <p 
            className="footer-dev-trigger" 
            onClick={onOpenAdminPanel}
            title="Open Admin Control Panel"
            style={{ cursor: 'pointer', marginTop: '10px' }}
          >
            🔒 {lang === 'bn' ? 'অ্যাডমিন প্যানেল এডিটর ⚙️' : 'Admin Control Panel ⚙️'}
          </p>
        </div>
      </div>

      <div className="play-footer-bottom">
        <p className="copyright-text">
          © 2026 Baluka Soft. {lang === 'bn' ? 'সর্বস্বত্ব সংরক্ষিত।' : 'All rights reserved.'}
        </p>
        <p className="made-with-text">
          Designed & Developed with <Heart size={14} className="heart-icon" /> by <strong className="dev-highlight">{founderName}</strong>
        </p>
      </div>
    </footer>
  );
}
