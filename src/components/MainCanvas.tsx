'use client';

import React from 'react';
import { NavigationTabs, TabId } from './NavigationTabs';
import { AboutTab } from './tabs/AboutTab';
import { ResumeTab } from './tabs/ResumeTab';
import { WorksTab } from './tabs/WorksTab';
import { ArchitectureTab } from './tabs/ArchitectureTab';
import { ContactTab } from './tabs/ContactTab';
import { ProjectItem } from '../data/portfolioData';
import styles from './MainCanvas.module.scss';

interface MainCanvasProps {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  onSelectProject: (project: ProjectItem) => void;
}

export const MainCanvas: React.FC<MainCanvasProps> = ({
  activeTab,
  setActiveTab,
  onSelectProject,
}) => {
  return (
    <main className={styles.mainWrapper}>
      {/* Top Floating Navigation Tabs (matching arghyac35.dev) */}
      <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main White/Dark Card Canvas */}
      <section className={styles.canvasCard}>
        {activeTab === 'about' && <AboutTab />}
        {activeTab === 'resume' && <ResumeTab />}
        {activeTab === 'works' && <WorksTab onSelectProject={onSelectProject} />}
        {activeTab === 'architecture' && <ArchitectureTab />}
        {activeTab === 'contact' && <ContactTab />}
      </section>
    </main>
  );
};
