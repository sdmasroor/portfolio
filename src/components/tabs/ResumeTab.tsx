'use client';

import React from 'react';
import {
  GraduationCap,
  Briefcase,
  Award,
  Code2,
  CheckCircle2,
  Calendar,
  Building2,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import styles from './ResumeTab.module.scss';

export const ResumeTab: React.FC = () => {
  const workingSkills = [
    { name: 'Cloud & Distributed Systems (AWS)', level: 98, color: 'linear-gradient(90deg, #00f2fe, #4facfe)' },
    { name: 'Backend & Microservices (Node, Nest, Fastify)', level: 96, color: 'linear-gradient(90deg, #fa5252, #dd2476)' },
    { name: 'PostgreSQL 16 & Multi-Tenant RLS', level: 95, color: 'linear-gradient(90deg, #10b981, #059669)' },
    { name: 'Agentic & GenAI Pipelines (Claude 3.5, Bedrock)', level: 92, color: 'linear-gradient(90deg, #818cf8, #a855f7)' },
    { name: 'DevOps, IaC (Terraform) & SRE Telemetry', level: 90, color: 'linear-gradient(90deg, #f59e0b, #d97706)' },
    { name: 'Frontend & Reactive Engines (React, Next.js)', level: 88, color: 'linear-gradient(90deg, #38bdf8, #818cf8)' },
  ];

  const featuredTags = [
    'AWS Serverless',
    'Bedrock Claude 3.5',
    'PostgreSQL 16 RLS',
    'Fastify AsyncLocalStorage',
    'Distributed Saga Pattern',
    'Step Functions',
    'RabbitMQ',
  ];

  const allKnowledges = [
    'AWS Lambda & EventBridge',
    'DynamoDB Single-Table',
    'Redis Caching & PubSub',
    'Circuit Breaker Resilience',
    'Docker & Containerization',
    'Terraform IaC',
    'Splunk & New Relic APM',
    'BullMQ Distributed Queues',
    'Dynamic JSON Schema Compiler',
    'Playwright & Jest Testing',
    'Clean Architecture & DDD',
    'REST & GraphQL APIs',
    'CI/CD Pipelines (GitHub Actions)',
  ];

  return (
    <div className={styles.tabContent}>
      {/* Title */}
      <div className="page-title-group">
        <div className="title-row">
          <h2 className="page-title">Resume</h2>
        </div>
        <div className="title-bar" />
      </div>

      {/* 2-Column Side-by-Side: Education & Experience */}
      <div className={styles.columnsGrid}>
        {/* Education Column */}
        <div className={styles.column}>
          <div className={styles.columnHeader}>
            <div className={`${styles.headerIconWrap} ${styles.iconRed}`}>
              <GraduationCap size={22} />
            </div>
            <h3 className={styles.columnTitle}>Education</h3>
          </div>

          <div className={styles.cardsStack}>
            {/* Degree Card */}
            <div className={`${styles.resumeCard} ${styles.cardRed}`}>
              <div className={styles.cardPeriod}>2011 – 2015</div>
              <h4 className={styles.cardRole}>B.Tech in Computer Science Engineering</h4>
              <p className={styles.cardOrg}>University of Kashmir, Srinagar, J&amp;K</p>
              <p className={styles.cardDesc}>
                Specialized in distributed systems, algorithms, operating systems, and computer architecture.
              </p>
            </div>

            {/* Certification Card */}
            <div className={`${styles.resumeCard} ${styles.cardPurple}`}>
              <div className={styles.cardPeriod}>Certified Credential</div>
              <h4 className={styles.cardRole}>AWS Certified Cloud Practitioner</h4>
              <p className={styles.cardOrg}>Amazon Web Services (AWS)</p>
              <p className={styles.cardDesc}>
                Certified proficiency in AWS cloud infrastructure, security compliance, serverless services, and distributed multi-AZ resilience.
              </p>
            </div>
          </div>
        </div>

        {/* Experience Column */}
        <div className={styles.column}>
          <div className={styles.columnHeader}>
            <div className={`${styles.headerIconWrap} ${styles.iconBlue}`}>
              <Briefcase size={22} />
            </div>
            <h3 className={styles.columnTitle}>Experience</h3>
          </div>

          <div className={styles.cardsStack}>
            {/* Nagarro Card */}
            <div className={`${styles.resumeCard} ${styles.cardBlue}`}>
              <div className={styles.cardPeriod}>Nov 2023 – Present</div>
              <h4 className={styles.cardRole}>Staff Engineer</h4>
              <p className={styles.cardOrg}>Nagarro Pvt. Ltd. · Full-time (Remote)</p>
              <ul className={styles.bulletList}>
                <li>Architected scalable US Automobile Dealership cloud platform using AWS SQS, SNS, and EventBridge.</li>
                <li>Implemented distributed Saga patterns &amp; circuit breakers ensuring 99.9% uptime SLA and &lt;200ms latency.</li>
                <li>Engineered GenAI recommendation agents using AWS Bedrock and Terraform IaC infrastructure.</li>
              </ul>
            </div>

            {/* Lelafe IT Solutions Card */}
            <div className={`${styles.resumeCard} ${styles.cardAmber}`}>
              <div className={styles.cardPeriod}>Apr 2016 – Oct 2023</div>
              <h4 className={styles.cardRole}>Senior Software Engineer</h4>
              <p className={styles.cardOrg}>Lelafe IT Solutions · Full-time (Srinagar)</p>
              <ul className={styles.bulletList}>
                <li>Led backend architecture for multi-tenant SaaS Student Information System serving thousands of concurrent users.</li>
                <li>Engineered high-throughput dynamic schema engine with RabbitMQ + Redis event bus reducing DB latency by 40%.</li>
                <li>Integrated banking gateway protocols, multi-lingual reporting, and zero-downtime database migrations.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Skills & Knowledges */}
      <div className={styles.skillsSection}>
        {/* Working Skills Column */}
        <div className={styles.skillsCol}>
          <h3 className={styles.sectionSubtitle}>Working Skills</h3>
          <div className={styles.progressList}>
            {workingSkills.map((s) => (
              <div key={s.name} className={styles.progressItem}>
                <div className={styles.progressLabelRow}>
                  <span className={styles.progressName}>{s.name}</span>
                  <span className={styles.progressPercent}>{s.level}%</span>
                </div>
                <div className={styles.progressBarTrack}>
                  <div
                    className={styles.progressBarFill}
                    style={{
                      width: `${s.level}%`,
                      background: s.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Knowledges Tag Cloud Column */}
        <div className={styles.knowledgesCol}>
          <h3 className={styles.sectionSubtitle}>Knowledges &amp; Technologies</h3>
          <div className={styles.tagCloud}>
            {/* Featured Tags in vibrant gradient */}
            {featuredTags.map((tag) => (
              <span key={tag} className={styles.tagFeatured}>
                {tag}
              </span>
            ))}
            {/* Secondary Tags in sleek neutral */}
            {allKnowledges.map((tag) => (
              <span key={tag} className={styles.tagNormal}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
