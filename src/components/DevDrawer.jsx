import React, { useState } from 'react';
import { X, Download, Trash2, Mail, Smartphone, User, ShieldCheck } from 'lucide-react';

export default function DevDrawer({ isOpen, onClose, testers, setTesters, lang, t }) {
  if (!isOpen) return null;

  const handleExportCSV = () => {
    if (!testers || testers.length === 0) {
      alert('No tester data available to export.');
      return;
    }

    const headers = ['ID', 'Name', 'Email', 'OS', 'Target App', 'Date'];
    const csvRows = [
      headers.join(','),
      ...testers.map(t => [
        `"${t.id}"`,
        `"${t.name}"`,
        `"${t.email}"`,
        `"${t.os}"`,
        `"${t.appName}"`,
        `"${t.date}"`
      ].join(','))
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvRows.join('\n'));
    const link = document.createElement('a');
    link.setAttribute('href', csvContent);
    link.setAttribute('download', `baluka_soft_beta_testers_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClearAll = () => {
    if (window.confirm(lang === 'bn' ? 'আপনি কি নিশ্চিত যে সকল টেস্টার ইমেইল মুছে ফেলতে চান?' : 'Are you sure you want to clear all tester submissions?')) {
      localStorage.removeItem('baluka_soft_beta_testers');
      setTesters([]);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="dev-drawer glass-card" onClick={e => e.stopPropagation()}>
        <div className="drawer-header">
          <div className="drawer-title-box">
            <ShieldCheck size={22} className="emerald-text" />
            <div>
              <h3>{t.adminDrawerTitle}</h3>
              <p className="subtext">{lang === 'bn' ? 'আপনার বালুকা সফট অ্যাপের টেস্টার সমূহের ইমেইল ডাটাবেজ' : 'Live list of submitted beta testing emails'}</p>
            </div>
          </div>

          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="drawer-actions">
          <button className="btn btn-primary" onClick={handleExportCSV} disabled={testers.length === 0}>
            <Download size={16} />
            <span>{t.exportCsv}</span>
          </button>

          {testers.length > 0 && (
            <button className="btn btn-danger-outline" onClick={handleClearAll}>
              <Trash2 size={16} />
              <span>{lang === 'bn' ? 'মুছে ফেলুন' : 'Clear All'}</span>
            </button>
          )}
        </div>

        <div className="drawer-table-wrapper">
          {testers.length === 0 ? (
            <div className="empty-state">
              <Mail size={40} className="muted-icon" />
              <p>{t.noTesters}</p>
            </div>
          ) : (
            <table className="dev-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>{t.labelName}</th>
                  <th>{t.labelEmail}</th>
                  <th>OS</th>
                  <th>{t.labelApp}</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {testers.map((item, index) => (
                  <tr key={item.id || index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td className="highlight-email">{item.email}</td>
                    <td>
                      <span className={`os-badge ${item.os?.toLowerCase()}`}>
                        {item.os}
                      </span>
                    </td>
                    <td>{item.appName}</td>
                    <td className="muted-text">{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
