'use client';

import React from 'react';
import {
  Cloud,
  Database,
  Cpu,
  Layers,
  Activity,
  Zap,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';
import styles from './AboutTab.module.scss';

export const AboutTab: React.FC = () => {
  const whatIDoCards = [
    {
      id: 'serverless',
      title: 'Cloud & Serverless Architectures',
      icon: Cloud,
      tintClass: styles.cardRed,
      iconClass: styles.iconRed,
      description:
        'Architecting event-driven AWS serverless platforms with Step Functions, EventBridge, Lambda, and DynamoDB for zero-idle cost and sub-second scaling.',
    },
    {
      id: 'multitenant',
      title: 'Multi-Tenant Enterprise SaaS & RLS',
      icon: Database,
      tintClass: styles.cardPurple,
      iconClass: styles.iconPurple,
      description:
        'Designing PostgreSQL 16 kernel-level Row-Level Security (RLS) with Fastify AsyncLocalStorage and TypeORM interceptors, powering enterprise ERPs.',
    },
    {
      id: 'genai',
      title: 'Autonomous Agentic & GenAI Pipelines',
      icon: Cpu,
      tintClass: styles.cardBlue,
      iconClass: styles.iconBlue,
      description:
        'Building autonomous Agentic content pipelines utilizing AWS Bedrock Claude 3.5 Sonnet, stateful Step Function graphs, and vector-level image synthesis.',
    },
    {
      id: 'microservices',
      title: 'Resilient Distributed Systems & SRE',
      icon: Layers,
      tintClass: styles.cardAmber,
      iconClass: styles.iconAmber,
      description:
        'Engineering distributed Saga transaction patterns, circuit breaker fallbacks, RabbitMQ event streaming, and end-to-end telemetry via Splunk & New Relic.',
    },
  ];

  const metrics = [
    { label: 'Engineering Experience', value: '9.6+ YOE', icon: Activity },
    { label: 'System Uptime SLA', value: '99.9%', icon: CheckCircle2 },
    { label: 'Peak P95 API Latency', value: '<200ms', icon: Zap },
    { label: 'Concurrent Form Workflows', value: '10,000+', icon: TrendingUp },
  ];

  return (
    <div className={styles.tabContent}>
      {/* Page Title with arghyac35 underline bar */}
      <div className="page-title-group">
        <div className="title-row">
          <h2 className="page-title">About Me</h2>
        </div>
        <div className="title-bar" />
      </div>

      {/* Bio Paragraph */}
      <div className={styles.bioText}>
        <p>
          I am a <strong>Staff Engineer &amp; System Architect</strong> with over{' '}
          <span className={styles.highlightText}>9.6+ years</span> of engineering leadership
          architecting resilient, high-scale distributed systems, multi-tenant cloud platforms, and
          autonomous AI agents.
        </p>
        <p>
          Currently leading platform engineering at <strong>Nagarro</strong>, I spearhead large-scale
          automotive dealership cloud platforms and mentor engineering squads in distributed
          patterns, serverless architectures, and telemetry. Previously at{' '}
          <strong>Lelafe IT Solutions</strong>, I architected high-throughput dynamic schema
          engines and enterprise SaaS student information platforms serving thousands of concurrent users.
        </p>
      </div>

      {/* "What I Do" Section */}
      <div className={styles.subSection}>
        <h3 className={styles.subTitle}>What I Do!</h3>
        <div className={styles.cardsGrid}>
          {whatIDoCards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.id} className={`${styles.serviceCard} ${card.tintClass}`}>
                <div className={`${styles.iconBox} ${card.iconClass}`}>
                  <Icon size={26} />
                </div>
                <div className={styles.cardBody}>
                  <h4 className={styles.cardTitle}>{card.title}</h4>
                  <p className={styles.cardDesc}>{card.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Production Impact Metrics */}
      <div className={styles.metricsSection}>
        <h3 className={styles.subTitle}>Production Benchmarks</h3>
        <div className={styles.metricsGrid}>
          {metrics.map((m) => {
            const Icon = m.icon;
            return (
              <div key={m.label} className={styles.metricCard}>
                <div className={styles.metricIconWrap}>
                  <Icon size={20} />
                </div>
                <div className={styles.metricValue}>{m.value}</div>
                <div className={styles.metricLabel}>{m.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
