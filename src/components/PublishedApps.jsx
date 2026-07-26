import React, { useState } from 'react';
import { CheckCircle2, Play, Sparkles, Info, X } from 'lucide-react';

export default function PublishedApps({ appsList = [], lang, t }) {
  const [filter, setFilter] = useState('all');
  const [selectedApp, setSelectedApp] = useState(null);

  const filteredApps = appsList.filter(app => {
    if (filter === 'published') return app.status === 'published';
    if (filter === 'beta') return app.status === 'beta';
    return true;
  });

  const publishedCount = appsList.filter(a => a.status === 'published').length;
  const betaCount = appsList.filter(a => a.status === 'beta').length;

  return (
    <section id="apps" className="play-section">
      <div className="play-section-header">
        <div className="section-title-wrapper">
          <h2 className="play-section-title">
            {lang === 'bn' ? 'সুপারিশকৃত অ্যান্ড্রোয়েড অ্যাপস (Recommended Apps)' : 'Recommended Android Apps'}
          </h2>
          <p className="play-section-sub">
            {lang === 'bn' ? 'গুগল প্লে স্টোর ভেরিফাইড অ্যাপস ও বিটা ভার্সন ডাউনলোড করুন' : 'Official releases & early access beta apps'}
          </p>
        </div>

        <div className="play-filter-chips">
          <button 
            className={`play-chip ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            {t.filterAll} ({appsList.length})
          </button>
          <button 
            className={`play-chip ${filter === 'published' ? 'active' : ''}`}
            onClick={() => setFilter('published')}
          >
            {t.filterPublished} ({publishedCount})
          </button>
          <button 
            className={`play-chip ${filter === 'beta' ? 'active' : ''}`}
            onClick={() => setFilter('beta')}
          >
            {t.filterBeta} ({betaCount})
          </button>
        </div>
      </div>

      <div className="play-apps-grid">
        {filteredApps.map(app => (
          <div className="play-app-card" key={app.id}>
            <div className="play-card-top">
              <img src={app.icon} alt={app.title} className="play-app-icon" />

              <div className="play-app-head-info">
                <h3 className="play-app-name">{app.title}</h3>
                <span className="play-dev-name">Baluka Soft</span>
                <span className="play-cat-tag">{app.category}</span>
              </div>
            </div>

            <div className="play-card-stats">
              <div className="play-stat-col">
                <span className="stat-value">{app.rating} ★</span>
                <span className="stat-sub">{app.reviewsCount}</span>
              </div>
              <div className="stat-divider"></div>
              <div className="play-stat-col">
                <span className="stat-value">{app.size}</span>
                <span className="stat-sub">Size</span>
              </div>
              <div className="stat-divider"></div>
              <div className="play-stat-col">
                <span className="stat-value">{app.downloads}</span>
                <span className="stat-sub">{app.status === 'published' ? 'Downloads' : 'Status'}</span>
              </div>
            </div>

            <p className="play-app-desc">{app.description}</p>

            <div className="play-card-actions">
              <button 
                className="play-btn-text"
                onClick={() => setSelectedApp(app)}
              >
                <Info size={16} />
                <span>{lang === 'bn' ? 'বিস্তারিত' : 'Details'}</span>
              </button>

              {app.status === 'published' ? (
                <a href={app.playStoreUrl} target="_blank" rel="noreferrer" className="play-install-btn">
                  <Play size={16} fill="currentColor" />
                  <span>{lang === 'bn' ? 'ইন্সটল করুন' : 'Install'}</span>
                </a>
              ) : (
                <a href="#beta" className="play-beta-btn">
                  <Sparkles size={16} />
                  <span>{lang === 'bn' ? 'বিটা টেস্ট' : 'Join Beta'}</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Google Play Style App Details Modal */}
      {selectedApp && (
        <div className="modal-backdrop" onClick={() => setSelectedApp(null)}>
          <div className="play-modal-card" onClick={e => e.stopPropagation()}>
            <button className="play-modal-close" onClick={() => setSelectedApp(null)}>
              <X size={20} />
            </button>

            <div className="play-modal-header">
              <img src={selectedApp.icon} alt={selectedApp.title} className="play-modal-icon" />
              <div>
                <h3 className="modal-app-title">{selectedApp.title}</h3>
                <p className="modal-dev">Baluka Soft • {selectedApp.category}</p>
                <span className="modal-ver-badge">{selectedApp.version}</span>
              </div>
            </div>

            <div className="play-modal-stats-bar">
              <div className="modal-stat-item">
                <span className="val">{selectedApp.rating} ★</span>
                <span className="lbl">{selectedApp.reviewsCount} reviews</span>
              </div>
              <div className="modal-stat-item">
                <span className="val">{selectedApp.downloads}</span>
                <span className="lbl">Downloads</span>
              </div>
              <div className="modal-stat-item">
                <span className="val">3+</span>
                <span className="lbl">Rated for 3+</span>
              </div>
            </div>

            <div className="play-modal-body">
              <h4>{lang === 'bn' ? 'অ্যাপটি সম্পর্কে (About this app):' : 'About this app:'}</h4>
              <p>{selectedApp.description}</p>

              {selectedApp.features && selectedApp.features.length > 0 && (
                <>
                  <h4 className="mt-3">{lang === 'bn' ? 'প্রধান ফিচারের তালিকা:' : 'Key Highlights:'}</h4>
                  <ul className="play-highlights-list">
                    {selectedApp.features.map((feat, idx) => (
                      <li key={idx}>
                        <CheckCircle2 size={16} className="green-text" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <div className="play-modal-footer">
              {selectedApp.status === 'published' ? (
                <a href={selectedApp.playStoreUrl} target="_blank" rel="noreferrer" className="play-install-btn full-width">
                  <Play size={18} fill="currentColor" />
                  <span>{lang === 'bn' ? 'গুগল প্লে স্টোরে ইন্সটল করুন' : 'Install on Google Play'}</span>
                </a>
              ) : (
                <a href="#beta" onClick={() => setSelectedApp(null)} className="play-beta-btn full-width">
                  <Sparkles size={18} />
                  <span>{lang === 'bn' ? 'ইন্টারনাল বিটা টেস্টিংয়ে যুক্ত হোন' : 'Join Internal Beta Testing'}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
