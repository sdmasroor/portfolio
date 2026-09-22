'use client';

import React, { useState } from 'react';
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Award,
  GraduationCap,
  Sparkles,
  Zap,
  Building2,
  Layers,
  Code2,
  TrendingUp,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import styles from './Experience.module.scss';

export const Experience: React.FC = () => {
  const { experiences, certifications, education } = PORTFOLIO_DATA;
  const [expandedIndex, setExpandedIndex] = useState<number>(0);

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? -1 : idx);
  };

  const getCompanyMonogram = (company: string) => {
    if (company.includes('Nagarro')) return 'NG';
    if (company.includes('Lelafe')) return 'LF';
    return 'CO';
  };

  return (
    <section id="experience" className="section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-tag">
            <Briefcase size={14} />
            <span>Works &amp; Professional Experience</span>
          </div>
          <h2 className="section-title">
            Engineering Leadership <span className="highlight">&amp; Track Record</span>
          </h2>
          <p className="section-description">
            9.6+ years guiding enterprise engineering teams, architecting distributed cloud-native platforms,
            and delivering high-availability multi-tenant systems.
          </p>
        </div>

        {/* Works Timeline / Cards Container */}
        <div className={styles.worksContainer}>
          {experiences.map((exp, index) => {
            const isExpanded = expandedIndex === index;
            const monogram = getCompanyMonogram(exp.company);
            return (
              <div key={exp.company} className={styles.workCardWrapper}>
                {/* Timeline connector on left */}
                <div className={styles.timelineAxis}>
                  <div className={styles.axisDot}>
                    <Building2 size={13} />
                  </div>
                  {index < experiences.length - 1 && <div className={styles.axisLine} />}
                </div>

                {/* Work Card */}
                <div className={`${styles.workCard} ${isExpanded ? styles.cardOpen : ''}`}>
                  <div
                    className={styles.cardTop}
                    onClick={() => toggleExpand(index)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className={styles.companyAvatarCol}>
                      <div className={`${styles.companyBadge} ${monogram === 'NG' ? styles.nagarroTheme : styles.lelafeTheme}`}>
                        <span>{monogram}</span>
                      </div>
                    </div>

                    <div className={styles.titleAndMeta}>
                      <div className={styles.roleLine}>
                        <h3 className={styles.roleName}>{exp.role}</h3>
                        <span className={styles.companyName}>@ {exp.company}</span>
                      </div>

                      <div className={styles.metaRow}>
                        <span className={styles.periodPill}>
                          <Calendar size={13} />
                          {exp.period}
                        </span>
                        <span className={styles.locPill}>
                          <MapPin size={13} />
                          {exp.location}
                        </span>
                        {exp.clientType && (
                          <span className={styles.clientPill}>
                            {exp.clientType}
                          </span>
                        )}
                      </div>
                    </div>

                    <button className={styles.toggleBtn} aria-label="Toggle details">
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </div>

                  {/* Expanded Card Body */}
                  <div className={styles.cardContent}>
                    {/* Project Scope Banner */}
                    <div className={styles.projectScopeBanner}>
                      <div className={styles.scopeLabel}>
                        <Sparkles size={13} />
                        <span>ENGAGEMENT FOCUS:</span>
                      </div>
                      <p className={styles.scopeText}>{exp.projectFocus}</p>
                    </div>

                    {/* Key Engineering Deliverables */}
                    <div className={styles.achievementsBlock}>
                      <div className={styles.blockHeading}>KEY CONTRIBUTIONS &amp; ARCHITECTURE ACHIEVEMENTS</div>
                      <ul className={styles.achievementsList}>
                        {exp.achievements.map((ach, i) => (
                          <li key={i} className={styles.achievementItem}>
                            <CheckCircle2 size={15} className={styles.checkIcon} />
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack Employed Section (arghyac35.dev/about style) */}
                    <div className={styles.stackSection}>
                      <div className={styles.stackHeading}>
                        <Code2 size={13} />
                        <span>TECH STACK EMPLOYED:</span>
                      </div>
                      <div className={styles.techPillsGrid}>
                        {exp.techStack.map((tech) => (
                          <span key={tech} className={styles.techBadge}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Architectural Patterns Section */}
                    <div className={styles.patternsSection}>
                      <div className={styles.patternHeading}>
                        <Zap size={13} />
                        <span>PATTERNS APPLIED:</span>
                      </div>
                      <div className={styles.patternsRow}>
                        {exp.designPatterns.map((pat) => (
                          <span key={pat} className={styles.patternBadge}>
                            {pat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Credentials & Certifications */}
        <div className={styles.credentialsGrid}>
          {/* Education */}
          <div className={styles.credentialCard}>
            <div className={styles.credIcon}>
              <GraduationCap size={22} />
            </div>
            <div className={styles.credDetails}>
              <div className={styles.credCategory}>FORMAL EDUCATION</div>
              <h4 className={styles.credTitle}>{education.degree}</h4>
              <p className={styles.credSub}>{education.institution}</p>
              <span className={styles.credLoc}>{education.location}</span>
            </div>
          </div>

          {/* Certifications */}
          <div className={styles.credentialCard}>
            <div className={styles.credIcon}>
              <Award size={22} />
            </div>
            <div className={styles.credDetails}>
              <div className={styles.credCategory}>CERTIFICATIONS &amp; CREDENTIALS</div>
              <div className={styles.certList}>
                {certifications.map((cert) => (
                  <div key={cert.name} className={styles.certItem}>
                    <div className={styles.certName}>{cert.name}</div>
                    <div className={styles.certIssuer}>
                      {cert.issuer} · {cert.year}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
