import React from 'react';
import { Mail, Smartphone, Code2, Globe, ShieldCheck } from 'lucide-react';

export default function FounderProfile({ founder, lang, t }) {
  if (!founder) return null;

  return (
    <section id="founder" className="play-section">
      <div className="play-dev-profile-card">
        <div className="dev-header">
          <img src={founder.avatar} alt={founder.founderName} className="dev-avatar" />
          <div className="dev-header-text">
            <div className="dev-badge-row">
              <span className="dev-verified-tag">
                <ShieldCheck size={14} className="green-text" /> Verified Developer
              </span>
              <span className="dev-company-tag">{founder.companyName}</span>
            </div>
            <h2 className="dev-name">{founder.founderName}</h2>
            <p className="dev-role">{founder.founderRole}</p>
          </div>
        </div>

        <p className="dev-bio">
          {lang === 'bn' ? founder.bioBn : founder.bioEn}
        </p>

        <div className="dev-contact-row">
          {founder.socials?.email && (
            <a href={`mailto:${founder.socials.email}`} className="dev-chip-link">
              <Mail size={16} />
              <span>{founder.socials.email}</span>
            </a>
          )}
          {founder.socials?.playStore && (
            <a href={founder.socials.playStore} target="_blank" rel="noreferrer" className="dev-chip-link">
              <Smartphone size={16} />
              <span>Google Play Profile</span>
            </a>
          )}
          {founder.socials?.telegram && (
            <a href={founder.socials.telegram} target="_blank" rel="noreferrer" className="dev-chip-link">
              <Globe size={16} />
              <span>Telegram Group</span>
            </a>
          )}
        </div>

        {founder.skills && founder.skills.length > 0 && (
          <div className="dev-skills-wrapper mt-4">
            <h4 className="skills-head">
              <Code2 size={18} className="green-text" />
              <span>{t.skillsHeader}</span>
            </h4>

            <div className="dev-skills-chips">
              {founder.skills.map((skill, idx) => (
                <div className="skill-chip" key={idx}>
                  <span className="chip-name">{skill.name}</span>
                  <span className="chip-lvl">{skill.level}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
