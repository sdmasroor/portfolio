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
  Terminal,
} from 'lucide-react';
import { PORTFOLIO_DATA, SystemDesignScenario, SystemDesignNode } from '../../data/portfolioData';
import styles from './ArchitectureTab.module.scss';

export const ArchitectureTab: React.FC = () => {
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
    <div className={styles.tabContent}>
      {/* Page Title with arghyac35 underline bar */}
      <div className="page-title-group">
        <div className="title-row">
          <h2 className="page-title">Architecture Lab</h2>
        </div>
        <div className="title-bar" />
      </div>

      <p className={styles.introText}>
        Interactive system design visualizer representing distributed production architectures I have
        designed and deployed. Select a blueprint and click any node to inspect runtime telemetry,
        isolation mechanisms, and design patterns.
      </p>

      {/* Blueprint Selector Tabs */}
      <div className={styles.blueprintTabs}>
        {systemDesigns.map((scenario) => (
          <button
            key={scenario.id}
            onClick={() => handleScenarioChange(scenario.id)}
            className={`${styles.blueprintTabBtn} ${
              selectedScenarioId === scenario.id ? styles.blueprintTabActive : ''
            }`}
          >
            <div className={styles.tabBadge}>{scenario.badge}</div>
            <div className={styles.tabTitle}>{scenario.title}</div>
          </button>
        ))}
      </div>

      {/* Blueprint Visualizer Card */}
      <div className={styles.blueprintCanvas}>
        {/* Scenario Header Info */}
        <div className={styles.canvasHeader}>
          <div>
            <span className={styles.summaryBadge}>{activeScenario.badge}</span>
            <h3 className={styles.scenarioTitle}>{activeScenario.title}</h3>
            <p className={styles.scenarioSummary}>{activeScenario.summary}</p>
          </div>

          <div className={styles.metricsPills}>
            {activeScenario.keyMetrics.map((metric, i) => (
              <span key={i} className={styles.metricPill}>
                <Zap size={12} />
                <span>{metric}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Node Flow Pipeline */}
        <div className={styles.pipelineArea}>
          <div className={styles.flowTrack}>
            {activeScenario.nodes.map((node, index) => {
              const isSelected = selectedNode?.id === node.id;
              return (
                <React.Fragment key={node.id}>
                  <div
                    onClick={() => setSelectedNode(node)}
                    className={`${styles.nodeCard} ${isSelected ? styles.nodeSelected : ''}`}
                  >
                    <div className={styles.nodeIconBox}>{getNodeIcon(node.id)}</div>
                    <div className={styles.nodeMeta}>
                      <span className={styles.nodeRole}>{node.role}</span>
                      <h4 className={styles.nodeName}>{node.name}</h4>
                      <span className={styles.nodeTech}>{node.technology}</span>
                    </div>

                    {node.latency && (
                      <div className={styles.nodeTelemetry}>
                        <Activity size={11} />
                        <span>{node.latency}</span>
                      </div>
                    )}
                  </div>

                  {index < activeScenario.nodes.length - 1 && (
                    <div className={styles.connector}>
                      <div className={styles.connectorLine} />
                      <ArrowRight size={14} className={styles.connectorArrow} />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Selected Node Deep-Dive Inspector */}
        {selectedNode && (
          <div className={styles.nodeInspector}>
            <div className={styles.inspectorHeader}>
              <div className={styles.inspectorTitleRow}>
                <Terminal size={16} className={styles.terminalIcon} />
                <span className={styles.inspectorTitle}>
                  Node Telemetry: {selectedNode.name}
                </span>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className={styles.closeInspectorBtn}
              >
                &times;
              </button>
            </div>

            <div className={styles.inspectorBody}>
              <p className={styles.inspectorDesc}>{selectedNode.description}</p>
              <div className={styles.inspectorTags}>
                <span className={styles.inspectorTag}>Role: {selectedNode.role}</span>
                <span className={styles.inspectorTag}>Stack: {selectedNode.technology}</span>
                {selectedNode.latency && (
                  <span className={styles.inspectorTag}>Telemetry: {selectedNode.latency}</span>
                )}
                <span className={styles.inspectorTag}>Status: {selectedNode.status.toUpperCase()}</span>
              </div>
            </div>
          </div>
        )}

        {/* Architecture Patterns Chips */}
        <div className={styles.patternsRow}>
          <span className={styles.patternsLabel}>Architectural Patterns Applied:</span>
          <div className={styles.patternsList}>
            {activeScenario.designPatterns.map((pattern) => (
              <span key={pattern} className={styles.patternChip}>
                <CheckCircle size={12} />
                <span>{pattern}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
