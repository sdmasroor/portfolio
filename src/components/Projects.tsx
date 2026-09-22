'use client';

import React, { useState } from 'react';
import {
  Code2,
  ExternalLink,
  Github,
  Layers,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Terminal,
  Cpu,
  Database,
  Cloud,
} from 'lucide-react';
import { PORTFOLIO_DATA, ProjectItem } from '../data/portfolioData';
import styles from './Projects.module.scss';

export const Projects: React.FC = () => {
  const { projects } = PORTFOLIO_DATA;
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  const categories = ['All', 'AI & Serverless', 'Full-Stack Enterprise', 'Distributed Systems', 'Microservices'];

  const filteredProjects =
    selectedFilter === 'All' ? projects : projects.filter((p) => p.category === selectedFilter);

  return (
    <section id="projects" className="section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-tag">
            <Code2 size={14} />
            <span>Production Platforms &amp; Repositories</span>
          </div>
          <h2 className="section-title">
            Featured <span className="highlight">Engineering Projects</span>
          </h2>
          <p className="section-description">
            Production platforms spanning autonomous agentic workflows, multi-tenant database security, and
            event-driven cloud architectures. Each represents scalable system engineering solving real enterprise problems.
          </p>
        </div>

        {/* Category Filter Controls */}
        <div className={styles.filterBar}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`${styles.filterBtn} ${selectedFilter === cat ? styles.activeFilter : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className={styles.projectsGrid}>
          {filteredProjects.map((project) => (
            <div key={project.id} className={styles.projectCard}>
              <div className={styles.cardGlowOverlay} />

              <div className={styles.cardHeader}>
                <div className={styles.categoryBadge}>{project.category}</div>
                {project.featured && (
                  <div className={styles.featuredBadge}>
                    <Sparkles size={12} />
                    <span>FLAGSHIP SYSTEM</span>
                  </div>
                )}
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <div className={styles.projectSubtitle}>{project.subtitle}</div>
                <p className={styles.projectSummary}>{project.summary}</p>

                {/* Architecture Highlights */}
                <div className={styles.highlightsContainer}>
                  <div className={styles.highlightTitle}>ARCHITECTURAL HIGHLIGHTS:</div>
                  <ul className={styles.highlightsList}>
                    {project.architectureHighlights.map((hl, i) => (
                      <li key={i} className={styles.highlightItem}>
                        <CheckCircle2 size={14} className={styles.highlightIcon} />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Metrics Badges */}
                <div className={styles.metricsRow}>
                  {project.metrics.map((m, idx) => (
                    <div key={idx} className={styles.metricBadge}>
                      <span className={styles.metricValue}>{m.value}</span>
                      <span className={styles.metricLabel}>{m.label}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Badges */}
                <div className={styles.techTags}>
                  {project.techStack.map((tech) => (
                    <span key={tech} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.cardFooter}>
                <button
                  onClick={() => setActiveModalProject(project)}
                  className={styles.detailBtn}
                >
                  <span>Technical Breakdown</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {activeModalProject && (
        <div className={styles.modalBackdrop} onClick={() => setActiveModalProject(null)}>
          <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <span className={styles.modalCategory}>{activeModalProject.category}</span>
                <h3 className={styles.modalTitle}>{activeModalProject.title}</h3>
                <p className={styles.modalSubtitle}>{activeModalProject.subtitle}</p>
              </div>
              <button onClick={() => setActiveModalProject(null)} className={styles.closeBtn}>
                &times;
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.modalSection}>
                <h4>Core Problem &amp; Architecture Solution</h4>
                <p>{activeModalProject.summary}</p>
              </div>

              <div className={styles.modalSection}>
                <h4>System Design Highlights</h4>
                <ul className={styles.modalList}>
                  {activeModalProject.architectureHighlights.map((hl, i) => (
                    <li key={i}>
                      <CheckCircle2 size={16} className={styles.modalCheck} />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.modalMetricsGrid}>
                {activeModalProject.metrics.map((m, i) => (
                  <div key={i} className={styles.modalMetricCard}>
                    <div className={styles.modalMetricVal}>{m.value}</div>
                    <div className={styles.modalMetricLab}>{m.label}</div>
                  </div>
                ))}
              </div>

              <div className={styles.modalSection}>
                <h4>Technology &amp; Tooling Ecosystem</h4>
                <div className={styles.modalTechStack}>
                  {activeModalProject.techStack.map((tech) => (
                    <span key={tech} className={styles.modalTechPill}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button onClick={() => setActiveModalProject(null)} className="btn-primary">
                Done Inspecting
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
