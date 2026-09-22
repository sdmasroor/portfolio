'use client';

import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Copy,
  Check,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import styles from './ContactTab.module.scss';

export const ContactTab: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('syedmasroorjan@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Trigger celebration confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });

    setSubmitted(true);

    // Open mail client handoff
    const subject = encodeURIComponent(`Architecture Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Hi Syed Masroor,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`
    );
    window.location.href = `mailto:syedmasroorjan@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <div className={styles.tabContent}>
      {/* Page Title */}
      <div className="page-title-group">
        <div className="title-row">
          <h2 className="page-title">Contact</h2>
        </div>
        <div className="title-bar" />
      </div>

      <div className={styles.contactGrid}>
        {/* Contact Info Tiles */}
        <div className={styles.infoCol}>
          <div className={`${styles.infoCard} ${styles.cardRed}`}>
            <div className={`${styles.iconWrap} ${styles.iconRed}`}>
              <Phone size={20} />
            </div>
            <div className={styles.cardDetails}>
              <span className={styles.cardLabel}>Phone / WhatsApp</span>
              <a href="tel:+919596388876" className={styles.cardValue}>
                +91 95963 88876
              </a>
            </div>
          </div>

          <div
            className={`${styles.infoCard} ${styles.cardBlue}`}
            onClick={handleCopyEmail}
            style={{ cursor: 'pointer' }}
          >
            <div className={`${styles.iconWrap} ${styles.iconBlue}`}>
              <Mail size={20} />
            </div>
            <div className={styles.cardDetails}>
              <span className={styles.cardLabel}>Email Address</span>
              <span className={styles.cardValue}>syedmasroorjan@gmail.com</span>
            </div>
            <button className={styles.copyBtn} title="Copy email">
              {copiedEmail ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>

          <div className={`${styles.infoCard} ${styles.cardPurple}`}>
            <div className={`${styles.iconWrap} ${styles.iconPurple}`}>
              <MapPin size={20} />
            </div>
            <div className={styles.cardDetails}>
              <span className={styles.cardLabel}>Location</span>
              <span className={styles.cardValue}>Srinagar, J&amp;K, India</span>
            </div>
          </div>

          <div className={`${styles.infoCard} ${styles.cardAmber}`}>
            <div className={`${styles.iconWrap} ${styles.iconAmber}`}>
              <Clock size={20} />
            </div>
            <div className={styles.cardDetails}>
              <span className={styles.cardLabel}>Availability</span>
              <span className={styles.cardValue}>Open for Staff &amp; Architect Roles</span>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className={styles.formCol}>
          <form onSubmit={handleSubmit} className={styles.formCard}>
            <h3 className={styles.formTitle}>
              Let&apos;s build something <span className={styles.highlight}>resilient together.</span>
            </h3>
            <p className={styles.formSubtitle}>
              Whether you need distributed systems guidance, cloud architecture consulting, or engineering leadership.
            </p>

            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>Name *</label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Alex Morgan"
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>Email *</label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="alex@company.com"
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="message" className={styles.label}>Message *</label>
              <textarea
                id="message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Discuss architecture, project scopes, or leadership opportunities..."
                className={styles.textarea}
              />
            </div>

            <button type="submit" className={styles.submitBtn}>
              {submitted ? (
                <>
                  <CheckCircle size={18} />
                  <span>Message Sent! Opening Email...</span>
                </>
              ) : (
                <>
                  <Send size={18} />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
