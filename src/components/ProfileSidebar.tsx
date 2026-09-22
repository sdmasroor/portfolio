'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Download,
  Check,
  ExternalLink,
  ShieldCheck,
  Copy,
} from 'lucide-react';
import styles from './ProfileSidebar.module.scss';

interface ProfileSidebarProps {
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  onOpenResume,
  onOpenContact,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText('syedmasroorjan@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <aside className={styles.sidebar}>
      {/* Profile Card Container */}
      <div className={styles.card}>
        {/* Avatar Image Frame */}
        <div className={styles.avatarWrapper}>
          <div className={styles.avatarInner}>
            <Image
              src="/profile.jpg"
              alt="Syed Masroor Jan"
              width={240}
              height={240}
              className={styles.avatarImg}
              priority
            />
          </div>
          {/* Status Badge */}
          <div className={styles.statusPill}>
            <span className={styles.statusDot} />
            <span>Staff Engineer</span>
          </div>
        </div>

        {/* Identity & Role */}
        <div className={styles.identity}>
          <h1 className={styles.name}>Syed Masroor Jan</h1>
          <p className={styles.designation}>Staff Engineer &amp; System Architect</p>
        </div>

        {/* Social Links Row */}
        <div className={styles.socialsRow}>
          <a
            href="https://github.com/masroorjan"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialBtn}
            aria-label="GitHub Profile"
            title="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/syedmasroorjan"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialBtn}
            aria-label="LinkedIn Profile"
            title="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <button
            onClick={handleCopyEmail}
            className={styles.socialBtn}
            aria-label="Copy Email"
            title={copiedEmail ? 'Copied!' : 'Copy Email'}
          >
            {copiedEmail ? <Check size={18} className={styles.checkIcon} /> : <Mail size={18} />}
          </button>
          <button
            onClick={onOpenContact}
            className={styles.socialBtn}
            aria-label="Contact Form"
            title="Send Message"
          >
            <ExternalLink size={18} />
          </button>
        </div>

        {/* Inset Information Box (matching arghyac35.dev) */}
        <div className={styles.infoBox}>
          {/* Phone */}
          <div className={styles.infoRow}>
            <div className={`${styles.iconTile} ${styles.iconTileRed}`}>
              <Phone size={17} />
            </div>
            <div className={styles.infoText}>
              <span className={styles.infoLabel}>Phone</span>
              <a href="tel:+919596388876" className={styles.infoValue}>
                +91 95963 88876
              </a>
            </div>
          </div>

          {/* Email */}
          <div className={styles.infoRow} onClick={handleCopyEmail}>
            <div className={`${styles.iconTile} ${styles.iconTileCyan}`}>
              <Mail size={17} />
            </div>
            <div className={styles.infoText}>
              <span className={styles.infoLabel}>Email</span>
              <span className={styles.infoValueTruncate}>
                syedmasroorjan@gmail.com
              </span>
            </div>
            <button className={styles.miniCopyBtn} title="Copy email">
              {copiedEmail ? <Check size={13} /> : <Copy size={13} />}
            </button>
          </div>

          {/* Location */}
          <div className={styles.infoRow}>
            <div className={`${styles.iconTile} ${styles.iconTilePurple}`}>
              <MapPin size={17} />
            </div>
            <div className={styles.infoText}>
              <span className={styles.infoLabel}>Location</span>
              <span className={styles.infoValue}>Srinagar, J&amp;K, India</span>
            </div>
          </div>

          {/* Experience Tenure */}
          <div className={styles.infoRow}>
            <div className={`${styles.iconTile} ${styles.iconTileAmber}`}>
              <Calendar size={17} />
            </div>
            <div className={styles.infoText}>
              <span className={styles.infoLabel}>Experience</span>
              <span className={styles.infoValue}>9.6+ Years (Staff Level)</span>
            </div>
          </div>
        </div>

        {/* Primary Download / View CV Action Button */}
        <button onClick={onOpenResume} className={styles.cvDownloadBtn}>
          <Download size={18} />
          <span>Download CV</span>
        </button>
      </div>
    </aside>
  );
};
