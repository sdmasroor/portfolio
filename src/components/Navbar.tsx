'use client';

import React, { useState, useEffect } from 'react';
import { Terminal, FileText, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import styles from './Navbar.module.scss';

interface NavbarProps {
  onOpenCommandPalette: () => void;
  onOpenResumeModal: () => void;
  onOpenContactModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCommandPalette,
  onOpenResumeModal,
  onOpenContactModal,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['hero', 'architecture', 'projects', 'experience', 'skills'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'System Design', href: '#architecture', id: 'architecture' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Skills Matrix', href: '#skills', id: 'skills' },
  ];

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.navContainer}>
        {/* Brand Logo */}
        <a href="#hero" className={styles.logo}>
          <div className={styles.logoBadge}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/profile.jpg" alt="Syed Masroor" className={styles.navAvatar} />
            <span className={styles.pulseDot} />
          </div>
          <div className={styles.logoInfo}>
            <span className={styles.name}>Syed Masroor</span>
            <span className={styles.role}>Staff Engineer</span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className={styles.desktopNav}>
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`${styles.navLink} ${activeSection === link.id ? styles.active : ''}`}
            >
              {link.label}
              {activeSection === link.id && <span className={styles.activeIndicator} />}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className={styles.actions}>
          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            className={styles.cmdButton}
            title="Open Command Palette (Ctrl + K)"
            aria-label="Open Command Palette"
          >
            <Terminal size={15} />
            <span className={styles.cmdText}>Cmd + K</span>
          </button>

          {/* Resume Trigger */}
          <button
            onClick={onOpenResumeModal}
            className={styles.resumeButton}
            title="View Interactive CV"
          >
            <FileText size={15} />
            <span>CV</span>
          </button>

          {/* Contact CTA */}
          <button onClick={onOpenContactModal} className={styles.contactButton}>
            <span>Let&apos;s Talk</span>
            <ArrowUpRight size={15} />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={styles.mobileMenuToggle}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileLinks}>
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={styles.mobileLink}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className={styles.mobileActions}>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResumeModal();
                }}
                className={styles.mobileActionBtn}
              >
                <FileText size={16} />
                <span>View Full Resume</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContactModal();
                }}
                className={`${styles.mobileActionBtn} ${styles.primary}`}
              >
                <Sparkles size={16} />
                <span>Get In Touch</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
