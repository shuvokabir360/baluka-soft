import React from 'react';
import { Sparkles, CheckCircle2, ShieldCheck, UserCheck, ArrowRight } from 'lucide-react';

export default function BetaTesting({ appsList = [], lang, t, onOpenJoinTester }) {
  const featuredBetaApp = appsList.find(a => a.isFeaturedBeta) || appsList.find(a => a.status === 'beta') || appsList[0] || {
    id: 'money-manage-pro',
    title: 'Money Manage Pro',
    tagline: 'স্মার্ট বাজেট ব্যবস্থাপনা, ক্লাউড সিঙ্ক ও এআই এনালাইটিক্স',
    icon: '/assets/money_manage_pro_logo.png',
    version: 'v1.0.0-beta'
  };

  return (
    <section id="beta" className="play-section">
      <div className="play-beta-card">
        {/* Top Badges Row */}
        <div className="beta-header-row">
          <div className="play-early-access-tag">
            <Sparkles size={14} />
            <span>Google Play Early Access</span>
          </div>

          <div className="play-verified-pill">
            <ShieldCheck size={14} className="green-text" />
            <span>Play Protect Verified</span>
          </div>
        </div>

        {/* Section Heading */}
        <div className="play-beta-heading-box mt-3 mb-3">
          <h2 className="play-beta-title">
            {lang === 'bn' ? 'গুগল প্লে বিটা টেস্টিং' : 'Google Play Beta Testing'}
          </h2>
          <p className="play-beta-subtitle">
            {lang === 'bn' 
              ? 'নতুন অ্যাপস রিলিজের আগেই ইন্টারনাল বিটা টেস্টে সরাসরি ব্যবহার করুন এবং ডেভেলপারকে ফিডব্যাক দিন।'
              : 'Try unreleased Android apps before official Google Play launch.'}
          </p>
        </div>

        {/* Featured Beta App Card */}
        {featuredBetaApp && (
          <div className="play-featured-app-box p-3 mb-3">
            <img src={featuredBetaApp.icon} alt={featuredBetaApp.title} className="featured-box-icon" />
            <div className="featured-box-content">
              <div className="flex items-center gap-2 mb-1">
                <span className="featured-box-tag">{lang === 'bn' ? 'সক্রিয় বিটা অ্যাপ' : 'Active Beta App'}</span>
                <span className="status-badge beta">{featuredBetaApp.version}</span>
              </div>
              <h3 className="featured-box-name">{featuredBetaApp.title}</h3>
              <p className="featured-box-desc">{featuredBetaApp.tagline}</p>
            </div>
          </div>
        )}

        {/* Beta Perks Checklist */}
        <div className="play-beta-perks-list mb-4">
          <div className="perk-row">
            <CheckCircle2 size={16} className="green-text" />
            <span>{lang === 'bn' ? 'প্লে স্টোর ইন্টারনাল টেস্ট অ্যাক্সেস' : 'Direct Play Store Internal Test Invitation'}</span>
          </div>
          <div className="perk-row">
            <CheckCircle2 size={16} className="green-text" />
            <span>{lang === 'bn' ? 'নতুন এআই ও ট্র্যাকিং ফিচারের আগাম অভিজ্ঞতা' : 'Try early AI & tracking features first'}</span>
          </div>
        </div>

        {/* Primary Call to Action Button */}
        <button 
          onClick={onOpenJoinTester} 
          className="play-install-btn full-width"
          style={{ width: '100%', justifyContent: 'center' }}
        >
          <UserCheck size={18} />
          <span>{lang === 'bn' ? 'বিটা টেস্টে যুক্ত হন (Join Beta Tester)' : 'Join Beta Tester Program'}</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}
