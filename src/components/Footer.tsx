'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp, Clock, ShieldCheck, Heart } from 'lucide-react';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  const [istTime, setIstTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatted = now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        });
        setIstTime(`${formatted} IST`);
      } catch (e) {
        setIstTime('IST');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerRow}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} All Rights Reserved by{' '}
            <span className={styles.author}>Syed Masroor Jan</span>
          </p>

          <div className={styles.telemetryRow}>
            {istTime && (
              <div className={styles.timeTag}>
                <Clock size={13} />
                <span>{istTime} (Srinagar, J&amp;K)</span>
              </div>
            )}
            <button
              onClick={scrollToTop}
              className={styles.scrollTopBtn}
              aria-label="Scroll to top"
              title="Back to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
