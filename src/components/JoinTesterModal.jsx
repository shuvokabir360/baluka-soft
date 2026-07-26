import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, ExternalLink, ShieldCheck, User, Mail, Smartphone, Send, MessageCircle, AlertCircle, Check, AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { appsData } from '../data/appsData';

export default function JoinTesterModal({ isOpen, onClose, onTesterAdded, lang }) {
  const betaApps = appsData.filter(a => a.status === 'beta' || a.isBeta);
  const defaultAppTitle = betaApps.length > 0 ? betaApps[0].title : 'Money Manage Pro';

  const [formData, setFormData] = useState({ name: '', email: '', appName: defaultAppTitle });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  // Real-Time Live Email & Gmail Validator
  const checkEmailValidity = (email) => {
    if (!email || email.trim() === '') return { isValid: false, status: 'empty', message: '' };
    
    if (email.includes(',') || email.includes(' ')) {
      return { isValid: false, status: 'invalid', message: 'ইমেইলে কমা (,) বা স্পেস দেওয়া যাবে না!' };
    }
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return { isValid: false, status: 'invalid', message: 'সঠিক ইমেইল ফরম্যাট লিখুন (যেমন: example@gmail.com)' };
    }
    
    const parts = email.split('@');
    if (parts.length === 2) {
      const domain = parts[1].toLowerCase();
      if (domain.includes('gmaiul') || domain.includes('gmai.') || domain.includes('gamil')) {
        return { isValid: false, status: 'invalid', message: 'জিমেইল স্পেলিং চেক করুন (@gmail.com)' };
      }
    }
    
    return { isValid: true, status: 'valid', message: 'ভেরিফাইড জিমেইল এড্রেস (Valid Gmail Address)' };
  };

  const emailValidation = checkEmailValidity(formData.email);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailValidation.isValid) return;

    const newTester = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      appName: formData.appName,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    const existing = JSON.parse(localStorage.getItem('baluka_soft_beta_testers') || '[]');
    const updated = [newTester, ...existing];
    localStorage.setItem('baluka_soft_beta_testers', JSON.stringify(updated));

    if (onTesterAdded) {
      onTesterAdded(updated);
    }

    try {
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.55 } });
    } catch (err) {
      // fallback
    }

    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({ name: '', email: '', appName: defaultAppTitle });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleReset}>
      <div className="premium-play-modal" onClick={e => e.stopPropagation()}>
        {/* Top Header Card */}
        <div className="modal-top-bar">
          <div className="modal-badge">
            <ShieldCheck size={14} className="green-text" />
            <span>Baluka Play Protect Verified</span>
          </div>
          <button className="modal-close-btn" onClick={handleReset} aria-label="Close Modal">
            <X size={18} />
          </button>
        </div>

        <div className="modal-app-header">
          <img src="/assets/money_manage_pro_logo.png" alt="Money Manage Pro" className="modal-app-icon" />
          <div className="modal-title-box">
            <h3 className="modal-heading">Join Beta Testing</h3>
            <span className="modal-subheading">Early Access Program • Free Access</span>
          </div>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="premium-modal-form">
            <p className="modal-desc-text">
              {lang === 'bn' 
                ? 'ইন্টারনাল টেস্টে যুক্ত হতে আপনার নাম, সঠিক জিমেইল ও অ্যাপটি সিলেক্ট করে সাবমিট করুন।'
                : 'Enter your name and valid Google Play email to get Play Store internal test access.'}
            </p>

            {/* Input: Full Name */}
            <div className="premium-input-box">
              <label className="input-field-label">
                <User size={14} className="green-text" />
                <span>Your Full Name</span>
              </label>
              <input 
                type="text" 
                className="premium-form-input" 
                placeholder="e.g., Kabir Hossen Shuvo"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            {/* Input: Google Play Email with Real-Time Validation Bar */}
            <div className="premium-input-box">
              <label className="input-field-label">
                <Mail size={14} className="green-text" />
                <span>Google Play Email Address</span>
              </label>
              
              <div className="input-with-live-status">
                <input 
                  type="email" 
                  className={`premium-form-input ${
                    emailValidation.status === 'valid' 
                      ? 'input-valid-glow' 
                      : emailValidation.status === 'invalid' 
                      ? 'input-error-border' 
                      : ''
                  }`}
                  placeholder="e.g., example@gmail.com"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
                
                {/* Real-time Status Icon Indicator inside input */}
                {emailValidation.status === 'valid' && (
                  <CheckCircle2 size={18} className="live-status-icon valid-icon-glow" />
                )}
                {emailValidation.status === 'invalid' && (
                  <AlertTriangle size={18} className="live-status-icon invalid-icon-glow" />
                )}
              </div>

              {/* Real-Time Animated Validation Status Bar */}
              {emailValidation.status !== 'empty' && (
                <div className={`live-validation-bar ${emailValidation.status}`}>
                  <div className="validation-progress-fill"></div>
                  <div className="validation-status-text">
                    {emailValidation.status === 'valid' ? (
                      <>
                        <Check size={13} /> <span>{emailValidation.message}</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle size={13} /> <span>{emailValidation.message}</span>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Input: Select Beta App */}
            <div className="premium-input-box">
              <label className="input-field-label">
                <Smartphone size={14} className="green-text" />
                <span>Target Beta App</span>
              </label>
              <select 
                className="premium-form-input premium-select-input" 
                value={formData.appName}
                onChange={e => setFormData({ ...formData, appName: e.target.value })}
              >
                {betaApps.map(app => (
                  <option key={app.id} value={app.title}>
                    {app.title} (Early Access Beta)
                  </option>
                ))}
              </select>
            </div>

            {/* Submit CTA Button */}
            <button 
              type="submit" 
              className={`premium-submit-btn full-width mt-3 ${
                formData.email && !emailValidation.isValid ? 'btn-disabled' : ''
              }`}
              disabled={formData.email && !emailValidation.isValid}
            >
              <Sparkles size={18} />
              <span>Submit Application</span>
            </button>
          </form>
        ) : (
          <div className="modal-success-card text-center">
            <CheckCircle2 size={52} className="green-text mx-auto mb-2" />
            <h3 className="success-headline">আবেদনটি সফলভাবে গৃহীত হয়েছে!</h3>
            
            <div className="modal-notice-box my-3">
              <p className="notice-text">
                {lang === 'bn' 
                  ? `ধন্যবাদ ${formData.name}! আপনার ইমেইল (${formData.email}) এ শীঘ্রই বিটা টেস্টিং ইনভাইটেশন লিংক পাঠানো হবে। ইনস্ট্যান্ট বিটা আপডেট পেতে টেলিগ্রাম বা হোয়াটসঅ্যাপ গ্রুপে জয়েন করুন:`
                  : `Application Received for ${formData.name}! A Google Play testing invitation link will be sent to your email (${formData.email}) shortly.`}
              </p>
            </div>

            <div className="community-btn-group mb-3">
              <a 
                href="https://t.me/balukasoft" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="cat-pill color-telegram mb-2 text-center"
              >
                <Send size={16} />
                <span>Join Telegram Group</span>
              </a>

              <a 
                href="https://chat.whatsapp.com/Jg8hcOaPgnwKHptxLPEtGu" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="cat-pill color-whatsapp mb-2 text-center"
              >
                <MessageCircle size={16} />
                <span>Join WhatsApp Group</span>
              </a>

              <a 
                href="https://play.google.com/apps/internaltest/4701488665356819853" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="premium-submit-btn full-width mt-1 mb-2"
              >
                <ExternalLink size={16} />
                <span>Open Play Store Test Link</span>
              </a>
            </div>

            <button onClick={handleReset} className="modal-close-outline-btn full-width">
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
