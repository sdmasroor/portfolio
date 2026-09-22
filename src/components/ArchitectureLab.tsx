'use client';

import React, { useState } from 'react';
import {
  Layers,
  Cpu,
  ShieldCheck,
  Zap,
  ArrowRight,
  Info,
  CheckCircle,
  Activity,
  Server,
  Database,
  Cloud,
  ExternalLink,
} from 'lucide-react';
import { PORTFOLIO_DATA, SystemDesignScenario, SystemDesignNode } from '../data/portfolioData';
import styles from './ArchitectureLab.module.scss';

export const ArchitectureLab: React.FC = () => {
  const { systemDesigns } = PORTFOLIO_DATA;
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(systemDesigns[0].id);
  const [selectedNode, setSelectedNode] = useState<SystemDesignNode | null>(null);

  const activeScenario: SystemDesignScenario =
    systemDesigns.find((s) => s.id === selectedScenarioId) || systemDesigns[0];

  const handleScenarioChange = (id: string) => {
    setSelectedScenarioId(id);
    setSelectedNode(null);
  };

  const getNodeIcon = (id: string) => {
    if (id.includes('db') || id.includes('postgres') || id.includes('storage')) return <Database size={18} />;
    if (id.includes('ai') || id.includes('bedrock') || id.includes('als')) return <Cpu size={18} />;
    if (id.includes('cloud') || id.includes('apigw') || id.includes('cron')) return <Cloud size={18} />;
    if (id.includes('guard') || id.includes('circuit') || id.includes('interceptor')) return <ShieldCheck size={18} />;
    return <Server size={18} />;
  };

  return (
    <section id="architecture" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <Layers size={14} />
            <span>Interactive System Design &amp; Architecture Lab</span>
          </div>
          <h2 className="section-title">
            Architectural <span className="highlight">Blueprints &amp; Flow Engine</span>
          </h2>
          <p className="section-description">
            Interactive blueprints representing distributed systems, multi-tenant databases, and agentic AI
            pipelines I have architected and deployed into production. Click nodes to inspect runtime telemetry
            and design patterns.
          </p>
        </div>

        {/* Blueprint Selection Tabs */}
        <div className={styles.tabBar}>
          {systemDesigns.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => handleScenarioChange(scenario.id)}
              className={`${styles.tabItem} ${selectedScenarioId === scenario.id ? styles.activeTab : ''}`}
            >
              <div className={styles.tabBadge}>{scenario.badge}</div>
              <div className={styles.tabTitle}>{scenario.title}</div>
            </button>
          ))}
        </div>

        {/* Active Architecture Viewer Box */}
        <div className={styles.canvasContainer}>
          {/* Header Bar of the Simulation */}
          <div className={styles.canvasHeader}>
            <div className={styles.scenarioMeta}>
              <span className={styles.activePill}>SYSTEM ARCHITECTURE SIMULATOR</span>
              <h3 className={styles.scenarioTitle}>{activeScenario.title}</h3>
              <p className={styles.scenarioSummary}>{activeScenario.summary}</p>
            </div>

            <div className={styles.metricsBox}>
              <div className={styles.metricsTitle}>PRODUCTION GUARANTEES</div>
              <div className={styles.metricsList}>
                {activeScenario.keyMetrics.map((metric, i) => (
                  <div key={i} className={styles.metricItem}>
                    <CheckCircle size={14} className={styles.checkIcon} />
                    <span>{metric}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Topology Grid */}
          <div className={styles.topologyViewport}>
            <div className={styles.topologyGrid}>
              {activeScenario.nodes.map((node, index) => {
                const isSelected = selectedNode?.id === node.id;
                return (
                  <div
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className={`${styles.nodeCard} ${isSelected ? styles.selectedNode : ''}`}
                    role="button"
                    tabIndex={0}
                  >
                    <div className={styles.nodeHeader}>
                      <div className={styles.nodeIcon}>{getNodeIcon(node.id)}</div>
                      <div className={styles.nodeStatus}>
                        <span className={styles.statusDot} />
                        <span className={styles.statusText}>{node.status}</span>
                      </div>
                    </div>

                    <div className={styles.nodeBody}>
                      <div className={styles.nodeIndex}>NODE 0{index + 1}</div>
                      <h4 className={styles.nodeName}>{node.name}</h4>
                      <div className={styles.nodeTech}>{node.technology}</div>
                      <div className={styles.nodeRole}>{node.role}</div>
                    </div>

                    <div className={styles.nodeFooter}>
                      <span className={styles.latencyTag}>
                        <Activity size={12} />
                        {node.latency || 'Realtime'}
                      </span>
                      <span className={styles.inspectHint}>Inspect &rarr;</span>
                    </div>

                    {/* Animated Connection Arrow (except for last node) */}
                    {index < activeScenario.nodes.length - 1 && (
                      <div className={styles.connectionLine}>
                        <div className={styles.dataParticle} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed Inspector Drawer */}
          <div className={styles.inspectorDrawer}>
            {selectedNode ? (
              <div className={styles.inspectorContent}>
                <div className={styles.inspectorHeader}>
                  <div className={styles.inspectorTitleGroup}>
                    <span className={styles.inspectorBadge}>NODE INSPECTOR</span>
                    <h4 className={styles.inspectorNodeName}>{selectedNode.name}</h4>
                    <span className={styles.inspectorTech}>{selectedNode.technology}</span>
                  </div>
                  <button onClick={() => setSelectedNode(null)} className={styles.closeInspectorBtn}>
                    Close &times;
                  </button>
                </div>
                <div className={styles.inspectorBody}>
                  <div className={styles.inspectorSection}>
                    <h5>Architectural Responsibility</h5>
                    <p>{selectedNode.description}</p>
                  </div>
                  <div className={styles.inspectorGrid}>
                    <div className={styles.infoCol}>
                      <span className={styles.colLabel}>Latency Target</span>
                      <span className={styles.colValue}>{selectedNode.latency || 'Sub-second'}</span>
                    </div>
                    <div className={styles.infoCol}>
                      <span className={styles.colLabel}>System Role</span>
                      <span className={styles.colValue}>{selectedNode.role}</span>
                    </div>
                    <div className={styles.infoCol}>
                      <span className={styles.colLabel}>Reliability State</span>
                      <span className={styles.colValue}>99.9% Uptime Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.inspectorEmptyState}>
                <Info size={18} className={styles.infoIcon} />
                <span>
                  Click on any node above to inspect its architectural responsibility, latency telemetry, and
                  failover policies.
                </span>
              </div>
            )}
          </div>

          {/* Deep Architectural Narrative */}
          <div className={styles.narrativeSection}>
            <div className={styles.problemSolutionGrid}>
              <div className={styles.narrativeCard}>
                <div className={styles.cardTagProblem}>THE ENGINEERING CHALLENGE</div>
                <p>{activeScenario.problem}</p>
              </div>

              <div className={styles.narrativeCard}>
                <div className={styles.cardTagSolution}>ARCHITECTURAL SOLUTION</div>
                <p>{activeScenario.solution}</p>
              </div>
            </div>

            {/* Design Patterns Applied */}
            <div className={styles.patternsBar}>
              <span className={styles.patternsLabel}>DESIGN PATTERNS APPLIED:</span>
              <div className={styles.patternsTags}>
                {activeScenario.designPatterns.map((pat, i) => (
                  <span key={i} className={styles.patternPill}>
                    <Zap size={12} />
                    {pat}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
