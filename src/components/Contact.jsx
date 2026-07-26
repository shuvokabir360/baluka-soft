import React, { useState } from 'react';
import { Mail, Send, MapPin, CheckCircle2 } from 'lucide-react';

export default function Contact({ siteSettings, lang, t }) {
  const [sent, setSent] = useState(false);
  const [contactData, setContactData] = useState({ name: '', email: '', message: '' });

  const emailVal = siteSettings?.supportEmail || 'contact@balukasoft.com';
  const locationVal = siteSettings?.officeLocation || 'Kuakata Sikder Resort, Bangladesh';

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactData.email || !contactData.name || !contactData.message) return;
    setSent(true);
  };

  return (
    <section id="contact" className="play-section">
      <div className="play-contact-card">
        <div className="play-contact-grid">
          {/* Top Block: Heading & Contact Info Tiles */}
          <div className="play-contact-info">
            <h2 className="play-contact-title">
              {lang === 'bn' ? 'সরাসরি বার্তা পাঠান (Get in Touch)' : 'Get in Touch'}
            </h2>
            <p className="play-contact-sub">
              {lang === 'bn' 
                ? 'আমাদের সাথে প্রজেক্ট আইডিয়া, কাস্টম অ্যাপ ডেভেলপমেন্ট বা ফিডব্যাক শেয়ার করতে নিচের ফর্মটি ব্যবহার করুন।'
                : 'Send your inquiries, custom app requests, or feedback directly to Baluka Soft.'}
            </p>

            <div className="play-info-list">
              <div className="play-info-tile">
                <div className="info-icon-box">
                  <Mail size={18} />
                </div>
                <div>
                  <h5 className="info-label">SUPPORT EMAIL</h5>
                  <p className="info-val">{emailVal}</p>
                </div>
              </div>

              <div className="play-info-tile">
                <div className="info-icon-box">
                  <MapPin size={18} />
                </div>
                <div>
                  <h5 className="info-label">OFFICE LOCATION</h5>
                  <p className="info-val">{locationVal}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Block: Form Card */}
          <div className="play-contact-form-box play-form-box">
            {!sent ? (
              <form onSubmit={handleContactSubmit} className="play-contact-form">
                <h3 className="play-form-head mb-3">
                  <Send size={18} />
                  <span>{lang === 'bn' ? 'মেসেজ দিন' : 'Send us a message'}</span>
                </h3>

                <div className="play-input-group">
                  <label className="play-label">{t.labelName}</label>
                  <input 
                    type="text" 
                    className="play-input" 
                    placeholder={t.placeholderName}
                    required
                    value={contactData.name}
                    onChange={e => setContactData({ ...contactData, name: e.target.value })}
                  />
                </div>

                <div className="play-input-group">
                  <label className="play-label">{t.labelEmail}</label>
                  <input 
                    type="email" 
                    className="play-input" 
                    placeholder={t.placeholderEmail}
                    required
                    value={contactData.email}
                    onChange={e => setContactData({ ...contactData, email: e.target.value })}
                  />
                </div>

                <div className="play-input-group">
                  <label className="play-label">{lang === 'bn' ? 'আপনার বার্তা' : 'Your Message'}</label>
                  <textarea 
                    className="play-textarea" 
                    rows="3" 
                    required
                    placeholder={lang === 'bn' ? 'আপনার বার্তাটি লিখুন...' : 'Type your message...'}
                    value={contactData.message}
                    onChange={e => setContactData({ ...contactData, message: e.target.value })}
                  ></textarea>
                </div>

                <button type="submit" className="play-install-btn full-width mt-2">
                  <Send size={16} />
                  <span>{lang === 'bn' ? 'বার্তা পাঠান (Send Message)' : 'Send Message'}</span>
                </button>
              </form>
            ) : (
              <div className="play-success-box text-center py-3">
                <CheckCircle2 size={48} className="green-text mb-2 mx-auto" />
                <h3>{lang === 'bn' ? 'বার্তা সফলভাবে পাঠানো হয়েছে!' : 'Message Sent Successfully!'}</h3>
                <p className="modal-desc-text mt-1">
                  {lang === 'bn' ? 'ধন্যবাদ! আমরা শীঘ্রই আপনার সাথে ইমেইলে যোগাযোগ করব।' : 'We will get back to you via email shortly.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
