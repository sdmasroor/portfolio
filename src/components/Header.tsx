'use client';

import React from 'react';
import { Sun, Moon, Command, FileText } from 'lucide-react';
import styles from './Header.module.scss';

interface HeaderProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  openResumeModal: () => void;
  openCommandPalette: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  toggleTheme,
  openResumeModal,
  openCommandPalette,
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Brand Logo */}
        <div className={styles.brand}>
          <span className={styles.logoSignature}>Masroor</span>
          <span className={styles.logoDot}>.</span>
          <span className={styles.badgeStaff}>Staff Eng</span>
        </div>

        {/* Action Controls */}
        <div className={styles.controls}>
          {/* Quick Cmd+K Button */}
          <button
            onClick={openCommandPalette}
            className={styles.cmdButton}
            title="Open command palette (Ctrl+K)"
            aria-label="Command palette"
          >
            <Command size={16} />
            <span className={styles.cmdText}>Ctrl+K</span>
          </button>

          {/* Quick Resume CTA */}
          <button
            onClick={openResumeModal}
            className={styles.resumeHeaderBtn}
            title="View full resume"
          >
            <FileText size={15} />
            <span>CV</span>
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={toggleTheme}
            className={styles.themeToggle}
            aria-label="Toggle dark/light theme"
            title={theme === 'dark' ? 'Switch to Light mode' : 'Switch to Dark mode'}
          >
            {theme === 'dark' ? (
              <Sun size={20} className={styles.sunIcon} />
            ) : (
              <Moon size={20} className={styles.moonIcon} />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
