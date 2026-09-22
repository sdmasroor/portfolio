'use client';

import React from 'react';
import { User, FileText, Briefcase, Layers, Mail } from 'lucide-react';
import styles from './NavigationTabs.module.scss';

export type TabId = 'about' | 'resume' | 'works' | 'architecture' | 'contact';

interface NavigationTabsProps {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const tabs = [
    { id: 'about' as TabId, label: 'About', icon: User },
    { id: 'resume' as TabId, label: 'Resume', icon: FileText },
    { id: 'works' as TabId, label: 'Works', icon: Briefcase },
    { id: 'architecture' as TabId, label: 'Arch Lab', icon: Layers },
    { id: 'contact' as TabId, label: 'Contact', icon: Mail },
  ];

  return (
    <nav className={styles.navContainer} aria-label="Main Navigation">
      <div className={styles.navInner}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${styles.tabBtn} ${isActive ? styles.tabActive : ''}`}
              aria-selected={isActive}
              role="tab"
            >
              <div className={styles.iconBox}>
                <Icon size={19} />
              </div>
              <span className={styles.tabLabel}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
