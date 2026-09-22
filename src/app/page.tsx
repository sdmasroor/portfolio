'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { ArchitectureLab } from '../components/ArchitectureLab';
import { Projects } from '../components/Projects';
import { SkillsMatrix } from '../components/SkillsMatrix';
import { Experience } from '../components/Experience';
import { Footer } from '../components/Footer';
import { CommandPalette } from '../components/CommandPalette';
import { ResumeModal } from '../components/ResumeModal';
import { ContactModal } from '../components/ContactModal';

export default function Home() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  // Global keyboard shortcuts (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <main>
      {/* Ambient background particles and glow orbs */}
      <div className="ambient-background">
        <div className="glow-orb-1" />
        <div className="glow-orb-2" />
        <div className="glow-orb-3" />
      </div>

      {/* Fixed Floating Navigation Bar */}
      <Navbar
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenResumeModal={() => setResumeModalOpen(true)}
        onOpenContactModal={() => setContactModalOpen(true)}
      />

      {/* Hero Section: Photo with Glow Ring, Orbiting Badges, Telemetry HUD */}
      <Hero
        onOpenResumeModal={() => setResumeModalOpen(true)}
        onOpenContactModal={() => setContactModalOpen(true)}
      />

      {/* Interactive System Design & Architecture Lab */}
      <ArchitectureLab />

      {/* Works & Production Platforms (Content structured format) */}
      <Projects />

      {/* Core Technologies & Tech Stacks (Content structured format) */}
      <SkillsMatrix />

      {/* Works & Professional Experience (Content structured format) */}
      <Experience />

      {/* Footer with Live Srinagar IST Telemetry */}
      <Footer />

      {/* Global Interactive Modals */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onOpenResume={() => setResumeModalOpen(true)}
        onOpenContact={() => setContactModalOpen(true)}
      />

      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />

      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
    </main>
  );
}
