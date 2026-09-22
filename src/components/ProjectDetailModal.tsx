'use client';

import React, { useEffect } from 'react';
import {
  X,
  ExternalLink,
  Github,
  CheckCircle2,
  Terminal,
  Activity,
  Layers,
  Zap,
} from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';
import styles from './ProjectDetailModal.module.scss';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className={styles.header}>
          <div className={styles.headerMeta}>
            <span className={styles.categoryBadge}>{project.category}</span>
            <h2 className={styles.title}>{project.title}</h2>
            <p className={styles.subtitle}>{project.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className={styles.closeBtn}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className={styles.body}>
          {/* Key Production Metrics */}
          {project.metrics && project.metrics.length > 0 && (
            <div className={styles.metricsStrip}>
              {project.metrics.map((m, i) => (
                <div key={i} className={styles.metricItem}>
                  <span className={styles.metricVal}>{m.value}</span>
                  <span className={styles.metricLbl}>{m.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Project Summary */}
          <div className={styles.section}>
            <h3 className={styles.sectionHeading}>System Architecture Overview</h3>
            <p className={styles.summaryText}>{project.summary}</p>
          </div>

          {/* Architectural Highlights */}
          <div className={styles.section}>
            <h3 className={styles.sectionHeading}>Key Architectural Innovations</h3>
            <ul className={styles.highlightsList}>
              {project.architectureHighlights.map((highlight, index) => (
                <li key={index} className={styles.highlightItem}>
                  <CheckCircle2 size={16} className={styles.checkIcon} />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Code or Blueprint Snippet if exists */}
          {project.codeSnippet && (
            <div className={styles.section}>
              <div className={styles.codeSnippetHeader}>
                <Terminal size={14} />
                <span>Architecture Blueprint Definition</span>
              </div>
              <pre className={styles.codeBlock}>
                <code>{project.codeSnippet}</code>
              </pre>
            </div>
          )}

          {/* Tech Stack Chips */}
          <div className={styles.section}>
            <h3 className={styles.sectionHeading}>Technologies &amp; Infrastructure</h3>
            <div className={styles.techChips}>
              {project.techStack.map((tech) => (
                <span key={tech} className={styles.techChip}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className={styles.footer}>
          <div className={styles.linksRow}>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.actionBtnSecondary}
              >
                <Github size={16} />
                <span>Source Code</span>
              </a>
            )}
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.actionBtnPrimary}
              >
                <ExternalLink size={16} />
                <span>Live Demo</span>
              </a>
            )}
          </div>
          <button onClick={onClose} className={styles.dismissBtn}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
