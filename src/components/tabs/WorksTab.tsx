'use client';

import React, { useState } from 'react';
import {
  Briefcase,
  ExternalLink,
  Github,
  Layers,
  Sparkles,
  Server,
  Database,
  Cpu,
  ArrowUpRight,
} from 'lucide-react';
import { PORTFOLIO_DATA, ProjectItem } from '../../data/portfolioData';
import styles from './WorksTab.module.scss';

interface WorksTabProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const WorksTab: React.FC<WorksTabProps> = ({ onSelectProject }) => {
  const { projects } = PORTFOLIO_DATA;
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const filterOptions = [
    'All',
    'AI & Serverless',
    'Full-Stack Enterprise',
    'Distributed Systems',
  ];

  const filteredProjects = projects.filter((p) => {
    if (selectedFilter === 'All') return true;
    return p.category === selectedFilter;
  });

  const getProjectVisualBg = (category: string, index: number) => {
    switch (category) {
      case 'AI & Serverless':
        return styles.bannerAi;
      case 'Full-Stack Enterprise':
        return styles.bannerEnterprise;
      case 'Distributed Systems':
        return styles.bannerDistributed;
      default:
        return styles.bannerDefault;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'AI & Serverless':
        return <Cpu size={16} />;
      case 'Full-Stack Enterprise':
        return <Database size={16} />;
      case 'Distributed Systems':
        return <Server size={16} />;
      default:
        return <Layers size={16} />;
    }
  };

  return (
    <div className={styles.tabContent}>
      {/* Page Title */}
      <div className="page-title-group">
        <div className="title-row">
          <h2 className="page-title">Works &amp; Portfolio</h2>
        </div>
        <div className="title-bar" />
      </div>

      {/* Category Filter Pills (matching arghyac35.dev) */}
      <div className={styles.filterBar}>
        {filterOptions.map((opt) => (
          <button
            key={opt}
            onClick={() => setSelectedFilter(opt)}
            className={`${styles.filterPill} ${selectedFilter === opt ? styles.filterPillActive : ''}`}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* 2-Column Works Grid */}
      <div className={styles.worksGrid}>
        {filteredProjects.map((project, idx) => {
          const bannerClass = getProjectVisualBg(project.category, idx);

          return (
            <div
              key={project.id}
              className={styles.workCard}
              onClick={() => onSelectProject(project)}
            >
              {/* Visual Banner Preview */}
              <div className={`${styles.cardBanner} ${bannerClass}`}>
                <div className={styles.bannerOverlay}>
                  <span className={styles.bannerTag}>
                    {getCategoryIcon(project.category)}
                    <span>{project.category}</span>
                  </span>
                  <div className={styles.exploreBadge}>
                    <span>View Architecture</span>
                    <ArrowUpRight size={15} />
                  </div>
                </div>

                {/* Circuit / Code pattern graphic */}
                <div className={styles.bannerGraphic}>
                  <div className={styles.mockNode1} />
                  <div className={styles.mockLine} />
                  <div className={styles.mockNode2} />
                </div>
              </div>

              {/* Card Meta Content */}
              <div className={styles.cardContent}>
                <span className={styles.projectCategory}>{project.category}</span>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectSubtitle}>{project.subtitle}</p>

                {/* Tech Chips */}
                <div className={styles.techTags}>
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span key={tech} className={styles.techChip}>
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className={styles.techChipMore}>
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
