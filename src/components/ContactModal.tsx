'use client';

import React, { useState } from 'react';
import {
  Mail,
  Phone,
  Linkedin,
  MapPin,
  Send,
  CheckCircle,
  Copy,
  Check,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import styles from './ContactModal.module.scss';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const { profile } = PORTFOLIO_DATA;
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Staff Engineer Opportunity');
  const [message, setMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setFormSubmitted(true);
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00f2fe', '#38bdf8', '#818cf8', '#10b981'],
    });

    // Also trigger mailto so user can send easily
    const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
    setTimeout(() => {
      window.open(mailtoUrl, '_blank');
    }, 800);
  };

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <div>
            <div className={styles.badge}>
              <Sparkles size={13} />
              <span>TECHNICAL LEADERSHIP INQUIRY</span>
            </div>
            <h3 className={styles.title}>Let&apos;s Build Together</h3>
            <p className={styles.subtitle}>
              Available for Staff Engineer, Solutions Architect, and Technical Lead engagements.
            </p>
          </div>
          <button onClick={onClose} className={styles.closeBtn}>
            &times;
          </button>
        </div>

        <div className={styles.modalBody}>
          {/* Quick Contact Chips */}
          <div className={styles.contactChips}>
            <div className={styles.contactChip} onClick={handleCopyEmail}>
              <Mail size={15} className={styles.chipIcon} />
              <div className={styles.chipInfo}>
                <span className={styles.chipLabel}>Email</span>
                <span className={styles.chipVal}>{profile.email}</span>
              </div>
              <span className={styles.chipAction}>
                {copiedEmail ? <Check size={14} className={styles.check} /> : <Copy size={14} />}
              </span>
            </div>

            <div className={styles.contactChip}>
              <Phone size={15} className={styles.chipIcon} />
              <div className={styles.chipInfo}>
                <span className={styles.chipLabel}>Phone</span>
                <span className={styles.chipVal}>{profile.phone}</span>
              </div>
            </div>

            <div className={styles.contactChip}>
              <MapPin size={15} className={styles.chipIcon} />
              <div className={styles.chipInfo}>
                <span className={styles.chipLabel}>Location</span>
                <span className={styles.chipVal}>{profile.location}</span>
              </div>
            </div>
          </div>

          {/* Form */}
          {formSubmitted ? (
            <div className={styles.successMessage}>
              <CheckCircle size={48} className={styles.successIcon} />
              <h4>Message Prepared &amp; Dispatched!</h4>
              <p>
                Opening your default email client with your message for <strong>{profile.email}</strong>.
                Thank you for reaching out!
              </p>
              <button
                onClick={() => {
                  setFormSubmitted(false);
                  onClose();
                }}
                className="btn-primary"
              >
                Close Dialog
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formRow}>
                <div className={styles.formField}>
                  <label>Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Henderson"
                  />
                </div>
                <div className={styles.formField}>
                  <label>Your Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. alex@company.com"
                  />
                </div>
              </div>

              <div className={styles.formField}>
                <label>Inquiry Scope / Subject</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Technical Leadership / Architecture Consulting"
                />
              </div>

              <div className={styles.formField}>
                <label>Message / Project Overview</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your platform challenges, engineering role, or collaboration goals..."
                />
              </div>

              <button type="submit" className="btn-primary">
                <Send size={16} />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
