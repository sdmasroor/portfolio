'use client';

import React, { useState } from 'react';
import {
  FileText,
  Download,
  Printer,
  Copy,
  Check,
  Briefcase,
  GraduationCap,
  Award,
  Zap,
  Mail,
  Phone,
  Linkedin,
  MapPin,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import styles from './ResumeModal.module.scss';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const { profile, experiences, certifications, education, skillCategories } = PORTFOLIO_DATA;

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const text = `
SYED MASROOR JAN
Staff Engineer — Cloud, Agentic & Generative AI, Enterprise Platforms
Email: ${profile.email} | Phone: ${profile.phone} | Location: ${profile.location}

PROFESSIONAL SUMMARY
${profile.shortBio}

CORE COMPETENCIES
- Cloud & Serverless: AWS (Lambda, S3, API Gateway, SQS, SNS, EventBridge), Azure, GCP, Terraform
- Agentic & GenAI: Claude 3.5, Bedrock, DeepSeek-R1, OpenAI, Prompt Chaining, RAG Pipelines
- System Architecture: Multi-Tenant RLS, Microservices, Event-Driven, Saga Pattern, Circuit Breakers
- Databases: PostgreSQL, MongoDB, Redis Clusters, DocumentDB
- Observability: AWS CloudWatch, New Relic APM, Splunk, PagerDuty

PROFESSIONAL EXPERIENCE
1. Nagarro Pvt. Ltd. | Staff Engineer (Nov 2023 – Present)
Project: Cloud-Native Automobile Dealership Platform (US Client)
- Architected cloud-native dealership management platform across sales, inventory, and financing.
- Event-driven microservices using AWS SQS/SNS and EventBridge with Saga and Circuit Breakers.
- Reduced MTTR by 30% via CloudWatch, New Relic, Splunk and PagerDuty on-call rotations.
- 25% higher system throughput via database optimization and Redis caching.

2. Lelafe IT Solutions | Senior Software Engineer (Apr 2016 – Oct 2023)
Project: Student Information System & Dynamic Forms Builder
- Architected multi-tenant SaaS platform managing admissions, courses, exams, and fees.
- Decoupled notifications with AWS Lambda + SQS/SNS ensuring 99.9% uptime SLA.
- Dynamic form builder supporting 10,000+ concurrent submissions using RabbitMQ & Redis.
- Optimized MongoDB queries improving response times by 40%.

EDUCATION & CERTIFICATIONS
- B.E. Computer Science, University of Jammu
- Amazon Bedrock — Complete Guide to AWS Generative AI
- Claude Code — Agentic AI Workflows
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        {/* Modal Top Control Bar */}
        <div className={styles.topBar}>
          <div className={styles.topTitle}>
            <FileText size={18} className={styles.icon} />
            <span>Curriculum Vitae · Syed Masroor Jan</span>
          </div>

          <div className={styles.topActions}>
            <button onClick={handleCopyText} className={styles.actionBtn}>
              {copied ? <Check size={15} className={styles.check} /> : <Copy size={15} />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>
            <button onClick={handlePrint} className={styles.actionBtn}>
              <Printer size={15} />
              <span>Print / PDF</span>
            </button>
            <button onClick={onClose} className={styles.closeBtn}>
              &times;
            </button>
          </div>
        </div>

        {/* Paper Document Content */}
        <div className={styles.paperDocument}>
          {/* Header */}
          <header className={styles.docHeader}>
            <div className={styles.headerFlex}>
              {/* Profile Photo */}
              <div className={styles.photoContainer}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/profile.jpg"
                  alt={profile.name}
                  className={styles.candidatePhoto}
                />
              </div>

              <div className={styles.headerInfo}>
                <h1 className={styles.candidateName}>{profile.name}</h1>
                <div className={styles.candidateRole}>Staff Engineer — Cloud, Agentic AI &amp; Enterprise Platforms</div>

                <div className={styles.contactRow}>
                  <span className={styles.contactItem}>
                    <Mail size={13} />
                    {profile.email}
                  </span>
                  <span className={styles.contactItem}>
                    <Phone size={13} />
                    {profile.phone}
                  </span>
                  <span className={styles.contactItem}>
                    <Linkedin size={13} />
                    LinkedIn Profile
                  </span>
                  <span className={styles.contactItem}>
                    <MapPin size={13} />
                    {profile.location}
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* Executive Summary */}
          <section className={styles.docSection}>
            <h2 className={styles.sectionHeading}>Professional Summary</h2>
            <p className={styles.summaryText}>{profile.shortBio}</p>
          </section>

          {/* Core Competencies */}
          <section className={styles.docSection}>
            <h2 className={styles.sectionHeading}>Core Competencies</h2>
            <div className={styles.competenciesGrid}>
              {skillCategories.map((cat) => (
                <div key={cat.category} className={styles.compGroup}>
                  <div className={styles.compCategory}>{cat.category}:</div>
                  <div className={styles.compList}>
                    {cat.skills.map((s) => s.name).join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Experience */}
          <section className={styles.docSection}>
            <h2 className={styles.sectionHeading}>Professional Experience</h2>
            <div className={styles.expList}>
              {experiences.map((exp) => (
                <div key={exp.company} className={styles.expBlock}>
                  <div className={styles.expHeader}>
                    <div className={styles.expTitle}>
                      <strong>{exp.role}</strong> — {exp.company}
                    </div>
                    <div className={styles.expPeriod}>{exp.period} | {exp.location}</div>
                  </div>
                  <div className={styles.expFocus}>
                    <strong>Project:</strong> {exp.projectFocus} {exp.clientType ? `(${exp.clientType})` : ''}
                  </div>
                  <ul className={styles.bulletList}>
                    {exp.achievements.map((ach, idx) => (
                      <li key={idx}>{ach}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Design Patterns */}
          <section className={styles.docSection}>
            <h2 className={styles.sectionHeading}>Design Patterns &amp; Architectural Practices</h2>
            <p className={styles.patternsText}>
              • <strong>Creational:</strong> Singleton, Factory Method (runtime schema extensibility).<br />
              • <strong>Structural:</strong> Repository, Adapter (clean persistence isolation &amp; multi-cloud adapters).<br />
              • <strong>Behavioral:</strong> Strategy, Observer (pluggable pricing &amp; rule engines, event dispatch).<br />
              • <strong>Distributed Systems:</strong> Saga Pattern, Circuit Breaker, Event-Driven Pub/Sub, Multi-Tenant RLS.
            </p>
          </section>

          {/* Education & Certs */}
          <section className={styles.docSection}>
            <h2 className={styles.sectionHeading}>Education &amp; Certifications</h2>
            <div className={styles.eduBlock}>
              <div>
                <strong>{education.degree}</strong> — {education.institution}, {education.location}
              </div>
              <div className={styles.certRow}>
                {certifications.map((c) => (
                  <span key={c.name} className={styles.certPill}>
                    {c.name} ({c.issuer})
                  </span>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
