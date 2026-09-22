'use client';

import React, { useState } from 'react';
import {
  Cpu,
  Cloud,
  Layers,
  Server,
  Database,
  Code2,
  Activity,
  CheckCircle2,
  Search,
  SlidersHorizontal,
  Sparkles,
  Zap,
} from 'lucide-react';
import { PORTFOLIO_DATA, TechStackItem } from '../data/portfolioData';
import styles from './SkillsMatrix.module.scss';

export const SkillsMatrix: React.FC = () => {
  const { techStacks, skillCategories } = PORTFOLIO_DATA;
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'cards' | 'metrics'>('cards');

  const categories = [
    'All',
    'Cloud & Serverless',
    'Agentic & GenAI',
    'Backend & APIs',
    'Databases & Storage',
    'Architecture',
    'Frontend',
    'DevOps & SRE',
  ];

  const getTechIcon = (icon: string, cat: string) => {
    switch (icon) {
      case 'Cloud':
        return <Cloud size={20} className={styles.iconCyan} />;
      case 'Cpu':
        return <Cpu size={20} className={styles.iconPurple} />;
      case 'Server':
        return <Server size={20} className={styles.iconBlue} />;
      case 'Database':
        return <Database size={20} className={styles.iconEmerald} />;
      case 'Layers':
        return <Layers size={20} className={styles.iconAmber} />;
      case 'Code2':
        return <Code2 size={20} className={styles.iconCyan} />;
      case 'Activity':
        return <Activity size={20} className={styles.iconEmerald} />;
      case 'CheckCircle2':
        return <CheckCircle2 size={20} className={styles.iconGreen} />;
      default:
        return <Zap size={20} className={styles.iconCyan} />;
    }
  };

  const filteredTech = techStacks.filter((tech) => {
    const matchesCategory =
      selectedCategory === 'All' || tech.category === selectedCategory;
    const matchesSearch =
      tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <Cpu size={14} />
            <span>Core Technologies &amp; Capabilities</span>
          </div>
          <h2 className="section-title">
            Technologies &amp; <span className="highlight">Tech Stacks</span>
          </h2>
          <p className="section-description">
            Battle-tested technologies and tools leveraged across 9.6+ years to build high-availability cloud platforms,
            multi-tenant SaaS databases, and autonomous AI pipelines.
          </p>
        </div>

        {/* Controls Bar: Category Pills + Search Bar + View Toggle */}
        <div className={styles.controlsSection}>
          <div className={styles.categoryFilters}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`${styles.catFilterBtn} ${selectedCategory === cat ? styles.activeCat : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className={styles.searchAndToggle}>
            <div className={styles.searchBox}>
              <Search size={16} className={styles.searchIcon} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter tech stack (e.g. AWS, Claude, Postgres, Redis)..."
                className={styles.searchInput}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className={styles.clearSearch}>
                  &times;
                </button>
              )}
            </div>

            <div className={styles.viewToggleGroup}>
              <button
                onClick={() => setViewMode('cards')}
                className={`${styles.toggleBtn} ${viewMode === 'cards' ? styles.activeToggle : ''}`}
                title="Grid Card View"
              >
                <Layers size={15} />
                <span>Cards</span>
              </button>
              <button
                onClick={() => setViewMode('metrics')}
                className={`${styles.toggleBtn} ${viewMode === 'metrics' ? styles.activeToggle : ''}`}
                title="Proficiency Metrics View"
              >
                <SlidersHorizontal size={15} />
                <span>Proficiency</span>
              </button>
            </div>
          </div>
        </div>

        {/* View Mode: Cards Grid (arghyac35.dev/about style) */}
        {viewMode === 'cards' && (
          <div className={styles.techGrid}>
            {filteredTech.map((tech) => (
              <div key={tech.id} className={styles.techCard}>
                <div className={styles.techCardHeader}>
                  <div className={styles.iconBadge}>{getTechIcon(tech.icon, tech.category)}</div>
                  <div className={styles.metaBadges}>
                    <span className={styles.expBadge}>{tech.experience}</span>
                    <span className={styles.levelBadge}>{tech.level}</span>
                  </div>
                </div>

                <div className={styles.techCardBody}>
                  <h3 className={styles.techName}>{tech.name}</h3>
                  <div className={styles.techCategory}>{tech.category}</div>
                  <p className={styles.techDesc}>{tech.description}</p>
                </div>

                <div className={styles.techCardFooter}>
                  <div className={styles.tagPills}>
                    {tech.tags.map((tag) => (
                      <span key={tag} className={styles.tagPill}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {filteredTech.length === 0 && (
              <div className={styles.noResults}>
                No technologies found matching &ldquo;{searchQuery}&rdquo;. Try another search term.
              </div>
            )}
          </div>
        )}

        {/* View Mode: Proficiency Metrics View */}
        {viewMode === 'metrics' && (
          <div className={styles.metricsContainer}>
            {skillCategories.map((cat) => (
              <div key={cat.category} className={styles.metricsGroup}>
                <div className={styles.groupHeader}>
                  <div className={styles.groupTitle}>{cat.category}</div>
                  <div className={styles.groupDesc}>{cat.description}</div>
                </div>

                <div className={styles.metricsList}>
                  {cat.skills.map((skill) => (
                    <div key={skill.name} className={styles.metricRow}>
                      <div className={styles.metricMeta}>
                        <span className={styles.metricName}>{skill.name}</span>
                        <span className={styles.metricHighlight}>{skill.highlight}</span>
                        <span className={styles.metricPercent}>{skill.level}%</span>
                      </div>
                      <div className={styles.metricBarTrack}>
                        <div
                          className={styles.metricBarFill}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
