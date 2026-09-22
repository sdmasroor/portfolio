'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Terminal,
  Search,
  FileText,
  Mail,
  Phone,
  Layers,
  Code2,
  Briefcase,
  Cpu,
  Sparkles,
  Check,
  ExternalLink,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import styles from './CommandPalette.module.scss';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
  onOpenContact: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  category: string;
  icon: React.ReactNode;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenResume,
  onOpenContact,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedNote, setCopiedNote] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const commands: CommandItem[] = [
    {
      id: 'goto-arch',
      title: 'Navigate to System Design Blueprints',
      category: 'Navigation',
      icon: <Layers size={16} />,
      action: () => {
        onClose();
        document.getElementById('architecture')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'goto-projects',
      title: 'Explore Featured Enterprise Projects',
      category: 'Navigation',
      icon: <Code2 size={16} />,
      action: () => {
        onClose();
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'goto-experience',
      title: 'Review Career Milestones & Leadership',
      category: 'Navigation',
      icon: <Briefcase size={16} />,
      action: () => {
        onClose();
        document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'goto-skills',
      title: 'View Engineering Proficiency Matrix',
      category: 'Navigation',
      icon: <Cpu size={16} />,
      action: () => {
        onClose();
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'open-resume',
      title: 'View & Download Verified CV (PDF)',
      category: 'Resume',
      icon: <FileText size={16} />,
      action: () => {
        onClose();
        onOpenResume();
      },
    },
    {
      id: 'copy-email',
      title: `Copy Email (${PORTFOLIO_DATA.profile.email})`,
      category: 'Contact',
      icon: <Mail size={16} />,
      action: () => {
        navigator.clipboard.writeText(PORTFOLIO_DATA.profile.email);
        setCopiedNote('Email copied to clipboard!');
        setTimeout(() => {
          setCopiedNote(null);
          onClose();
        }, 1200);
      },
    },
    {
      id: 'copy-phone',
      title: `Copy Phone (${PORTFOLIO_DATA.profile.phone})`,
      category: 'Contact',
      icon: <Phone size={16} />,
      action: () => {
        navigator.clipboard.writeText(PORTFOLIO_DATA.profile.phone);
        setCopiedNote('Phone number copied to clipboard!');
        setTimeout(() => {
          setCopiedNote(null);
          onClose();
        }, 1200);
      },
    },
    {
      id: 'confetti',
      title: 'Launch Architecture Celebration (Confetti)',
      category: 'Interactive',
      icon: <Sparkles size={16} />,
      action: () => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00f2fe', '#38bdf8', '#818cf8', '#10b981'],
        });
        onClose();
      },
    },
  ];

  const filtered = commands.filter(
    (cmd) =>
      cmd.title.toLowerCase().includes(query.toLowerCase()) ||
      cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.paletteBackdrop} onClick={onClose}>
      <div className={styles.paletteModal} onClick={(e) => e.stopPropagation()} onKeyDown={handleKeyDown}>
        {/* Search Input Bar */}
        <div className={styles.searchBar}>
          <Search size={18} className={styles.searchIcon} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or jump to section..."
            className={styles.searchInput}
          />
          <span className={styles.escBadge}>ESC</span>
        </div>

        {/* Copied notification if triggered */}
        {copiedNote && (
          <div className={styles.copyAlert}>
            <Check size={14} />
            <span>{copiedNote}</span>
          </div>
        )}

        {/* Command List */}
        <div className={styles.commandList}>
          {filtered.length > 0 ? (
            filtered.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={cmd.id}
                  onClick={cmd.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`${styles.commandItem} ${isSelected ? styles.selectedItem : ''}`}
                >
                  <div className={styles.cmdIconWrapper}>{cmd.icon}</div>
                  <div className={styles.cmdInfo}>
                    <span className={styles.cmdTitle}>{cmd.title}</span>
                    <span className={styles.cmdCategory}>{cmd.category}</span>
                  </div>
                  {isSelected && <span className={styles.enterHint}>&crarr;</span>}
                </div>
              );
            })
          ) : (
            <div className={styles.emptyState}>No matching commands found.</div>
          )}
        </div>

        {/* Footer */}
        <div className={styles.paletteFooter}>
          <div className={styles.shortcuts}>
            <span>
              <kbd>&uarr;</kbd> <kbd>&darr;</kbd> to navigate
            </span>
            <span>
              <kbd>&crarr;</kbd> to select
            </span>
            <span>
              <kbd>esc</kbd> to dismiss
            </span>
          </div>
          <div className={styles.versionTag}>Antigravity CLI v2.4</div>
        </div>
      </div>
    </div>
  );
};
