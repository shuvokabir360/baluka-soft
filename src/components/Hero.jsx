import React from 'react';
import { Download, Sparkles, ShieldCheck } from 'lucide-react';

export default function Hero({ appsList, siteSettings, lang, t }) {
  const featuredApp = appsList?.find(a => a.isFeaturedBeta) || appsList?.[0] || {
    title: 'Money Manage Pro',
    icon: '/assets/money_manage_pro_logo.png'
  };

  const title = lang === 'bn' ? (siteSettings?.heroTitleBn || 'Baluka Soft App Studio') : (siteSettings?.heroTitleEn || 'Baluka Soft App Studio');
  const subtitle = lang === 'bn' ? (siteSettings?.heroSubtitleBn || 'আমাদের সকল প্রিমিয়াম অ্যাপস ডাউনলোড করুন এবং নতুন উন্মোচিত হওয়া অ্যাপস ইন্টারনাল টেস্টিংয়ে ব্যবহার করুন।') : (siteSettings?.heroSubtitleEn || 'Explore official Android apps by Baluka Soft or join early access beta testing.');
  const protectBadge = siteSettings?.protectBadgeText || 'Baluka Play Protect';
  const ageRating = siteSettings?.ageRatingText || '3+';

  return (
    <section id="home" className="play-hero-section">
      <div className="play-hero-card">
        <div className="play-hero-badge-row">
          <div className="play-protect-badge">
            <ShieldCheck size={14} className="green-text" />
            <span>{protectBadge}</span>
          </div>
          <div className="age-rating-badge">
            <span>{ageRating}</span>
          </div>
        </div>

        <div className="play-hero-content">
          <h1 className="play-hero-title">
            {title.includes('App Studio') ? (
              <>
                {title.replace('App Studio', '')} <span className="play-green-text">App Studio</span>
              </>
            ) : (
              title
            )}
          </h1>
          <p className="play-hero-subtitle">
            {subtitle}
          </p>

          {/* Featured App Banner */}
          {featuredApp && (
            <div className="play-featured-pill">
              <img src={featuredApp.icon} alt={featuredApp.title} className="featured-pill-icon" />
              <div>
                <span className="featured-label">{lang === 'bn' ? '🔥 নতুন বিটা রিলিজ' : '🔥 Active Beta Release'}</span>
                <h4 className="featured-name">{featuredApp.title}</h4>
              </div>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="play-hero-ctas">
            <a href="#beta" className="play-btn play-btn-primary full-width">
              <Sparkles size={16} />
              <span>{lang === 'bn' ? 'ইন্টারনাল বিটা টেস্টিং' : 'Join Beta Test'}</span>
            </a>
            <a href="#apps" className="play-btn play-btn-secondary full-width">
              <Download size={16} />
              <span>{lang === 'bn' ? 'সকল অ্যাপস দেখুন' : 'Browse Apps'}</span>
            </a>
          </div>

          {/* Quick Stats Row */}
          <div className="play-hero-stats-row">
            <div className="stat-pill-item">
              <span className="stat-num">5.0 ★</span>
              <span className="stat-desc">Rating</span>
            </div>
            <div className="stat-pill-item">
              <span className="stat-num">10K+</span>
              <span className="stat-desc">Installs</span>
            </div>
            <div className="stat-pill-item">
              <span className="stat-num">100% Free</span>
              <span className="stat-desc">Android</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
