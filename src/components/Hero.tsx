'use client';

import React, { useState } from 'react';
import {
  Cpu,
  Layers,
  Cloud,
  Activity,
  ArrowRight,
  Sparkles,
  Copy,
  Check,
  Download,
  Terminal,
  Server,
  ShieldCheck,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import styles from './Hero.module.scss';

interface HeroProps {
  onOpenResumeModal: () => void;
  onOpenContactModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResumeModal, onOpenContactModal }) => {
  const { profile, heroStats } = PORTFOLIO_DATA;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="hero" className={styles.heroSection}>
      <div className="container">
        {/* Availability Badge */}
        <div className={styles.topBadgeWrapper}>
          <div className={styles.statusBadge}>
            <span className={styles.statusDot} />
            <span className={styles.statusText}>{profile.availability}</span>
          </div>
          <div className={styles.experienceBadge}>
            <Sparkles size={13} />
            <span>9.6+ Years Enterprise Engineering</span>
          </div>
        </div>

        {/* Main Hero Header */}
        <div className={styles.mainGrid}>
          <div className={styles.introContent}>
            <div className={styles.roleTag}>
              <Cpu size={15} />
              <span>STAFF ENGINEER & DISTRIBUTED SYSTEMS ARCHITECT</span>
            </div>

            <h1 className={styles.headline}>
              Engineering <span className={styles.gradientText}>Cloud-Native Platforms</span> &{' '}
              <span className={styles.purpleGradient}>Agentic AI</span> at Enterprise Scale
            </h1>

            <p className={styles.bio}>
              Hi, I&apos;m <strong>{profile.name}</strong>. I architect and lead multi-tenant SaaS platforms,
              asynchronous microservices, and serverless AI pipelines across automobile, public sector,
              education, and banking domains.
            </p>

            {/* Quick Action Bar */}
            <div className={styles.ctaGroup}>
              <a href="#architecture" className="btn-primary">
                <span>System Design Lab</span>
                <ArrowRight size={17} />
              </a>

              <a href="#projects" className="btn-secondary">
                <Layers size={17} />
                <span>Featured Projects</span>
              </a>

              <button onClick={onOpenResumeModal} className={styles.resumeTriggerBtn}>
                <Download size={16} />
                <span>Resume</span>
              </button>
            </div>

            {/* Contact / Quick Copy Bar */}
            <div className={styles.contactBar}>
              <div className={styles.emailChip} onClick={handleCopyEmail} role="button" tabIndex={0}>
                <span className={styles.emailLabel}>Direct:</span>
                <span className={styles.emailValue}>{profile.email}</span>
                <span className={styles.copyIconWrapper} title="Copy email to clipboard">
                  {copied ? <Check size={14} className={styles.checkIcon} /> : <Copy size={14} />}
                </span>
                {copied && <span className={styles.copiedTooltip}>Copied!</span>}
              </div>

              <div className={styles.locationChip}>
                <span className={styles.locDot} />
                <span>{profile.location}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Portrait with Orbiting Tech Badges & Live Architecture HUD */}
          <div className={styles.heroVisualCol}>
            {/* Cyber Portrait Frame with Animated Ring & Floating Badges */}
            <div className={styles.portraitWrapper}>
              <div className={styles.portraitGlowRing} />
              <div className={styles.portraitCard}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/profile.jpg"
                  alt={profile.name}
                  className={styles.portraitImg}
                />
                <div className={styles.portraitOverlay} />

                {/* Verified Staff Badge */}
                <div className={styles.verifiedBadge}>
                  <span className={styles.verifiedDot} />
                  <span className={styles.verifiedText}>Staff Engineer · Nagarro</span>
                </div>
              </div>

              {/* Floating Orbiting Tech Badges */}
              <div className={`${styles.orbitBadge} ${styles.orbitBadge1}`}>
                <Cloud size={14} className={styles.badgeIconCyan} />
                <span>AWS Serverless</span>
              </div>

              <div className={`${styles.orbitBadge} ${styles.orbitBadge2}`}>
                <Cpu size={14} className={styles.badgeIconPurple} />
                <span>Bedrock Claude 3.5</span>
              </div>

              <div className={`${styles.orbitBadge} ${styles.orbitBadge3}`}>
                <ShieldCheck size={14} className={styles.badgeIconGreen} />
                <span>PostgreSQL 16 RLS</span>
              </div>

              <div className={`${styles.orbitBadge} ${styles.orbitBadge4}`}>
                <Activity size={14} className={styles.badgeIconCyan} />
                <span>&lt;200ms Latency SLA</span>
              </div>
            </div>

            {/* Interactive Live Architecture HUD Card */}
            <div className={styles.hudCardWrapper}>
            <div className={styles.hudCard}>
              <div className={styles.hudHeader}>
                <div className={styles.hudControls}>
                  <span className={styles.dotRed} />
                  <span className={styles.dotYellow} />
                  <span className={styles.dotGreen} />
                </div>
                <div className={styles.hudTitle}>
                  <Terminal size={13} />
                  <span>core-system.architecture.live</span>
                </div>
                <div className={styles.hudSla}>
                  <ShieldCheck size={13} />
                  <span>99.9% SLA</span>
                </div>
              </div>

              {/* HUD Content Streams */}
              <div className={styles.hudBody}>
                {/* HUD Item 1 */}
                <div className={styles.telemetryRow}>
                  <div className={styles.telemetryIcon}>
                    <Cloud size={16} />
                  </div>
                  <div className={styles.telemetryMeta}>
                    <span className={styles.telemetryLabel}>AWS Serverless Engine</span>
                    <span className={styles.telemetryDesc}>Lambda + Step Functions + SQS</span>
                  </div>
                  <div className={styles.telemetryStatus}>
                    <span className={styles.pillGreen}>OPTIMIZED</span>
                  </div>
                </div>

                {/* HUD Item 2 */}
                <div className={styles.telemetryRow}>
                  <div className={styles.telemetryIcon}>
                    <ShieldCheck size={16} />
                  </div>
                  <div className={styles.telemetryMeta}>
                    <span className={styles.telemetryLabel}>Postgres 16 Multi-Tenant RLS</span>
                    <span className={styles.telemetryDesc}>Fastify AsyncLocalStorage isolation</span>
                  </div>
                  <div className={styles.telemetryStatus}>
                    <span className={styles.pillCyan}>ENFORCED</span>
                  </div>
                </div>

                {/* HUD Item 3 */}
                <div className={styles.telemetryRow}>
                  <div className={styles.telemetryIcon}>
                    <Cpu size={16} />
                  </div>
                  <div className={styles.telemetryMeta}>
                    <span className={styles.telemetryLabel}>Bedrock GenAI Orchestrator</span>
                    <span className={styles.telemetryDesc}>Claude 3.5 + DeepSeek-R1 Local AI</span>
                  </div>
                  <div className={styles.telemetryStatus}>
                    <span className={styles.pillPurple}>ACTIVE</span>
                  </div>
                </div>

                {/* HUD Item 4 */}
                <div className={styles.telemetryRow}>
                  <div className={styles.telemetryIcon}>
                    <Server size={16} />
                  </div>
                  <div className={styles.telemetryMeta}>
                    <span className={styles.telemetryLabel}>Distributed Saga & Circuit Breaker</span>
                    <span className={styles.telemetryDesc}>EventBridge + Redis cluster caching</span>
                  </div>
                  <div className={styles.telemetryStatus}>
                    <span className={styles.pillGreen}>&lt;200ms LATENCY</span>
                  </div>
                </div>
              </div>

              {/* HUD Live Activity Bar */}
              <div className={styles.hudFooter}>
                <div className={styles.liveActivity}>
                  <Activity size={13} className={styles.activityPulse} />
                  <span>Telemetry: Splunk &amp; New Relic APM Connected</span>
                </div>
                <div className={styles.regionBadge}>Region: multi-region (AWS)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* Impact Metrics Strip */}
        <div className={styles.statsStrip}>
          {heroStats.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
              <div className={styles.statSubtitle}>{stat.subtitle}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
