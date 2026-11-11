/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  ArrowDown,
  ArrowUpRight,
  Flame,
  Dumbbell,
  Target,
  Scale,
  BookOpen,
  Download,
  Instagram,
  ChevronDown,
  Sliders,
  Quote,
} from 'lucide-react';
import {
  DEFAULT_SITE_CONFIG,
  SiteConfig,
  WorkoutItem,
  ResourceItem,
  PhilosophyItem,
} from './data/siteConfig';
import { ResilientImage } from './components/ResilientImage';
import { WorkoutModal } from './components/WorkoutModal';
import { ResourceModal } from './components/ResourceModal';
import { VideoSection } from './components/VideoSection';
import { ContactSection } from './components/ContactSection';
import { AdminDrawer } from './components/AdminDrawer';
import { LegalModal } from './components/LegalModal';

const STORAGE_KEY = 'sehrish_wellness_site_config_v4';

export default function App() {
  const [config, setConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_SITE_CONFIG, ...JSON.parse(saved) };
      }
    } catch {
      // Fallback to default config
    }
    return DEFAULT_SITE_CONFIG;
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeWorkoutFilter, setActiveWorkoutFilter] = useState<string>('ALL');
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutItem | null>(null);
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);
  const [openFaqId, setOpenFaqId] = useState<string>(DEFAULT_SITE_CONFIG.faq[0].id);
  const [adminOpen, setAdminOpen] = useState(false);
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);
  const [consultationGoal, setConsultationGoal] = useState<string>(
    DEFAULT_SITE_CONFIG.contact.goalOptions[0]
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch {
      // Ignore storage errors
    }
  }, [config]);

  const handleResetConfig = () => {
    localStorage.removeItem(STORAGE_KEY);
    setConfig(DEFAULT_SITE_CONFIG);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartConsultationWithGoal = (goal: string) => {
    setConsultationGoal(goal);
    scrollToSection('contact');
  };

  const renderPhilosophyIcon = (iconName: PhilosophyItem['iconName']) => {
    switch (iconName) {
      case 'Flame':
        return <Flame className="w-5 h-5 text-[#546B5A]" aria-hidden="true" />;
      case 'Dumbbell':
        return <Dumbbell className="w-5 h-5 text-[#546B5A]" aria-hidden="true" />;
      case 'Target':
        return <Target className="w-5 h-5 text-[#546B5A]" aria-hidden="true" />;
      case 'Scale':
        return <Scale className="w-5 h-5 text-[#546B5A]" aria-hidden="true" />;
    }
  };

  const filteredWorkouts =
    activeWorkoutFilter === 'ALL'
      ? config.workouts
      : config.workouts.filter(
          (w) =>
            w.difficulty.toUpperCase() === activeWorkoutFilter ||
            w.category.toUpperCase() === activeWorkoutFilter
        );

  const navLinks = [
    { label: 'HOME', href: '#home', id: 'home' },
    { label: 'ABOUT', href: '#about', id: 'about' },
    { label: 'WORKOUTS', href: '#workouts', id: 'workouts' },
    { label: 'RESOURCES', href: '#resources', id: 'resources' },
    { label: 'RESULTS', href: '#results', id: 'results' },
    { label: 'FAQ', href: '#faq', id: 'faq' },
    { label: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  return (
    <div className="min-h-screen bg-[#F5F3EC] text-[#232323] flex flex-col selection:bg-[#546B5A]/30">
      {/* Sticky Top Navigation Bar — Strict 3-Zone Contract */}
      <header className="sticky top-0 z-40 h-16 sm:h-20 bg-[#F5F3EC]/90 backdrop-blur-md border-b border-[#546B5A]/25 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('home');
          }}
          className="text-lg sm:text-xl font-bold tracking-wider font-display text-[#232323] whitespace-nowrap shrink-0"
        >
          {config.brandName}
        </a>

        {/* Zone 2: Clean typography navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-7 text-xs font-medium tracking-wider text-[#546B5A]"
        >
          {navLinks.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.id);
              }}
              className="hover:text-[#232323] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#546B5A] hover:after:w-full after:transition-all whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Prominent Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('contact');
            }}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-[#F5F3EC] bg-[#546B5A] hover:bg-[#435246] rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            BEGIN YOUR JOURNEY
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="lg:hidden w-11 h-11 rounded-lg bg-[#435246]/10 hover:bg-[#546B5A]/15 border border-[#546B5A]/25 flex items-center justify-center text-[#232323] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Clean Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 sm:top-20 z-30 bg-[#F5F3EC]/98 backdrop-blur-xl border-b border-[#546B5A]/30 px-6 py-6 space-y-5 shadow-2xl">
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-3">
            {navLinks.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                className="text-sm font-semibold tracking-wider text-[#232323] hover:text-[#546B5A] py-2 border-b border-[#546B5A]/15 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="pt-2 flex flex-col gap-3">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}
              className="w-full py-3.5 text-center text-xs font-semibold tracking-wider uppercase text-[#F5F3EC] bg-[#546B5A] hover:bg-[#435246] rounded-lg transition-colors"
            >
              BEGIN YOUR JOURNEY
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setAdminOpen(true);
              }}
              className="w-full py-2.5 text-center text-xs font-medium text-[#546B5A] hover:text-[#232323] border border-[#546B5A]/25 rounded-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5 text-[#546B5A]" aria-hidden="true" />
              <span>Customize Site Content</span>
            </button>
          </div>
        </div>
      )}

      <main className="flex-1">
        {/* 1. HERO SECTION */}
        <section
          id="home"
          aria-labelledby="hero-headline"
          className="relative min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)] flex items-center overflow-hidden bg-[#F5F3EC]"
        >
          {/* Full-screen background photography with measured contrast scrim */}
          <div className="absolute inset-0 z-0">
            <ResilientImage
              src={config.hero.heroImage}
              alt="Gentle movement and postpartum wellbeing"
              containerClassName="w-full h-full"
              className="object-center scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#F5F3EC] via-[#F5F3EC]/85 to-[#F5F3EC]/45" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#F5F3EC] via-transparent to-[#F5F3EC]/40" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Hero Typography & CTAs */}
              <div className="lg:col-span-7 space-y-8">
                <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-[#546B5A] font-semibold">
                  <span>{config.brandName}</span>
                  <span aria-hidden="true">·</span>
                  <a
                    href={config.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {config.instagramUsername}
                  </a>
                </div>

                <h1
                  id="hero-headline"
                  className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display tracking-tight text-[#232323] leading-[1.05]"
                >
                  <span className="block">{config.hero.headlineLine1}</span>
                  <span className="block text-[#546B5A] mt-1">{config.hero.headlineLine2}</span>
                </h1>

                <p className="text-base sm:text-lg lg:text-xl text-[#232323] max-w-2xl leading-relaxed font-normal">
                  {config.hero.supportingText}
                </p>

                {/* Primary & Secondary CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('contact');
                    }}
                    className="px-8 py-4 text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#F5F3EC] bg-[#546B5A] hover:bg-[#435246] rounded-lg transition-all text-center whitespace-nowrap shadow-lg"
                  >
                    {config.hero.primaryCtaText}
                  </a>
                  <a
                    href="#workouts"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('workouts');
                    }}
                    className="px-8 py-4 text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#232323] bg-[#435246]/10 hover:bg-[#546B5A]/15 border border-[#546B5A]/35 rounded-lg transition-all text-center whitespace-nowrap backdrop-blur-sm"
                  >
                    {config.hero.secondaryCtaText}
                  </a>
                </div>

                {/* Verified Credibility Line (Clean unboxed text with typographic separators) */}
                <div className="pt-6 border-t border-[#546B5A]/25 flex flex-wrap items-center justify-between gap-4">
                  <p className="text-xs sm:text-sm tracking-[0.2em] uppercase text-[#546B5A] font-medium">
                    {config.hero.credibilityText}
                  </p>

                  <a
                    href="#about"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('about');
                    }}
                    aria-label="Scroll down to Meet Sehrish section"
                    className="inline-flex items-center gap-2 text-xs text-[#546B5A] hover:text-[#435246] transition-colors group"
                  >
                    <span className="tracking-wider uppercase font-medium">Scroll to Explore</span>
                    <ArrowDown
                      className="w-4 h-4 transition-transform group-hover:translate-y-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </div>

              {/* Right Column: Editorial Portrait Frame (Clearly marked replaceable placeholder) */}
              <div className="lg:col-span-5 hidden lg:block">
                <div className="relative mx-auto max-w-md rounded-2xl overflow-hidden border border-[#546B5A]/30 bg-[#F5F3EC] shadow-2xl aspect-[3/4]">
                  <ResilientImage
                    src={config.hero.profileImage}
                    alt="An editorial image representing gentle movement and wellbeing"
                    placeholderBadge={
                      config.hero.useProfilePlaceholderBadge
                        ? 'Editorial Portrait Placeholder · Replaceable in Site Editor'
                        : undefined
                    }
                    containerClassName="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#435246]/80 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="Postpartum training safety note" className="px-4 sm:px-6 lg:px-8 py-6 bg-[#435246] text-[#F5F3EC]">
          <div className="max-w-5xl mx-auto text-sm sm:text-base leading-relaxed">
            <strong className="font-semibold">A gentle reminder:</strong> Every postpartum recovery is different. Please get guidance from your doctor or midwife before returning to exercise. This website is educational and does not replace medical care or pelvic-health physiotherapy.
          </div>
        </section>

        {/* 2. ABOUT SECTION — MEET SEHRISH */}
        <section
          id="about"
          aria-labelledby="about-heading"
          className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-[#546B5A]/25 bg-[#F5F3EC]"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left: Large Portrait Image */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden border border-[#546B5A]/30 bg-[#F5F3EC] aspect-[3/4] shadow-2xl">
                  <ResilientImage
                    src={config.about.aboutImage}
                    alt="A calm, supportive movement and wellbeing space"
                    placeholderBadge={
                      config.about.usePlaceholderBadge
                        ? 'Profile Photo Placeholder · Easily Editable'
                        : undefined
                    }
                    containerClassName="w-full h-full"
                  />
                </div>
              </div>

              {/* Right: Structured Personal Introduction */}
              <div className="lg:col-span-7 space-y-8">
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-widest text-[#546B5A] font-medium">
                    Personal Brand &amp; Training Approach
                  </p>
                  <h2
                    id="about-heading"
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-[#232323]"
                  >
                    {config.about.heading}
                  </h2>
                  <p className="text-base sm:text-lg text-[#232323] leading-relaxed">
                    {config.about.subheadline}
                  </p>
                </div>

                {/* 5 Structured Biographical Pillars using only verified public identity */}
                <div className="space-y-5 pt-2 border-t border-[#546B5A]/25">
                  <div>
                    <h3 className="text-xs uppercase tracking-wider text-[#546B5A] font-semibold mb-1">
                      Who She Is
                    </h3>
                    <p className="text-sm sm:text-base text-[#546B5A] leading-relaxed">
                      {config.about.whoSheIs}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xs uppercase tracking-wider text-[#546B5A] font-semibold mb-1">
                      Approach to Fitness
                    </h3>
                    <p className="text-sm sm:text-base text-[#546B5A] leading-relaxed">
                      {config.about.approachToFitness}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                    <div>
                      <h3 className="text-xs uppercase tracking-wider text-[#546B5A] font-semibold mb-1">
                        What Motivates Her
                      </h3>
                      <p className="text-sm text-[#546B5A] leading-relaxed">
                        {config.about.whatMotivatesHer}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xs uppercase tracking-wider text-[#546B5A] font-semibold mb-1">
                        What You Can Learn
                      </h3>
                      <p className="text-sm text-[#546B5A] leading-relaxed">
                        {config.about.whatPeopleCanLearn}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F5F3EC] border border-[#546B5A]/25">
                    <h3 className="text-xs uppercase tracking-wider text-[#232323] font-semibold mb-1">
                      Consistency &amp; Sustainable Training
                    </h3>
                    <p className="text-xs sm:text-sm text-[#546B5A] leading-relaxed">
                      {config.about.consistencyPhilosophy}
                    </p>
                  </div>
                </div>

                {/* CTA: LEARN MORE */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <a
                    href="#philosophy"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('philosophy');
                    }}
                    className="px-7 py-3.5 text-xs font-semibold tracking-wider uppercase text-[#F5F3EC] bg-[#546B5A] hover:bg-[#435246] rounded-lg transition-colors whitespace-nowrap"
                  >
                    {config.about.ctaText}
                  </a>
                  <a
                    href={config.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 text-xs font-semibold tracking-wider uppercase text-[#232323] bg-[#435246]/10 hover:bg-[#546B5A]/15 border border-[#546B5A]/30 rounded-lg transition-colors inline-flex items-center gap-2 whitespace-nowrap"
                  >
                    <span>View {config.instagramUsername}</span>
                    <ArrowUpRight className="w-4 h-4 text-[#546B5A]" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. FITNESS PHILOSOPHY — 4 PREMIUM CARDS */}
        <section
          id="philosophy"
          aria-labelledby="philosophy-heading"
          className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-[#546B5A]/25 bg-[#F5F3EC]"
        >
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl mb-14">
              <p className="text-xs uppercase tracking-widest text-[#546B5A] font-medium mb-3">
                Core Pillars
              </p>
              <h2
                id="philosophy-heading"
                className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-[#232323]"
              >
                THE TRAINING PHILOSOPHY
              </h2>
              <p className="text-sm sm:text-base text-[#546B5A] mt-3 leading-relaxed">
                Four non-negotiable principles that guide every gym session, mobility flow, and educational resource.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {config.philosophy.map((item) => (
                <div
                  key={item.id}
                  className="p-6 sm:p-7 rounded-2xl bg-[#F5F3EC] border border-[#546B5A]/25 hover:border-[#546B5A]/50 transition-all duration-200 flex flex-col justify-between gap-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono-tabular font-semibold tracking-wider text-[#546B5A]">
                      {item.number} — {item.title}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#F5F3EC]/[0.03] border border-[#546B5A]/25 flex items-center justify-center">
                      {renderPhilosophyIcon(item.iconName)}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold font-display text-[#232323] mb-2.5">
                      {item.number} — {item.title}
                    </h3>
                    <p className="text-sm text-[#546B5A] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. WORKOUT SECTION — A GENTLER WAY TO REBUILD */}
        <section
          id="workouts"
          aria-labelledby="workouts-heading"
          className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-[#546B5A]/25 bg-[#F5F3EC]"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#546B5A] font-medium mb-3">
                  Postpartum Movement Library
                </p>
                <h2
                  id="workouts-heading"
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-[#232323]"
                >
                  A GENTLER WAY TO REBUILD
                </h2>
                <p className="text-sm sm:text-base text-[#546B5A] mt-3 max-w-2xl">
                  We are preparing movement resources for this stage of life. Individual programmes will be added only after review by an appropriately qualified postpartum exercise professional.
                </p>
              </div>

              {/* Filters appear only when reviewed programmes are available */}
              {config.workouts.length > 0 && <div
                role="group"
                aria-label="Filter workouts by difficulty"
                className="flex items-center gap-1 p-1.5 rounded-xl bg-[#F5F3EC] border border-[#546B5A]/25 self-start lg:self-auto overflow-x-auto max-w-full"
              >
                {['ALL', 'BEGINNER', 'INTERMEDIATE', 'ALL LEVELS'].map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveWorkoutFilter(filter)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      activeWorkoutFilter === filter
                        ? 'bg-[#546B5A] text-[#F5F3EC] font-semibold'
                        : 'text-[#546B5A] hover:text-[#232323]'
                    }`}
                  >
                    {filter === 'ALL' ? `All Categories (${config.workouts.length})` : filter}
                  </button>
                ))}
              </div>}
            </div>

            {config.workouts.length === 0 && (
              <div className="rounded-2xl border border-[#546B5A]/30 bg-[#435246]/10 p-8 sm:p-10 text-center max-w-3xl mx-auto">
                <p className="text-lg sm:text-xl font-display text-[#232323]">Thoughtful recovery takes time.</p>
                <p className="mt-3 text-sm sm:text-base text-[#546B5A] leading-relaxed">No exercise plan is being prescribed here yet. Please speak with your maternity care provider before returning to exercise; a pelvic-health physiotherapist can help tailor a safe progression to your needs.</p>
              </div>
            )}

            {/* Reviewed programme cards, when available */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredWorkouts.map((workout) => (
                <article
                  key={workout.id}
                  className="rounded-2xl overflow-hidden bg-[#F5F3EC] border border-[#546B5A]/25 hover:border-[#546B5A]/50 transition-all duration-200 flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-48 w-full overflow-hidden">
                      <ResilientImage
                        src={workout.image}
                        alt={`${workout.category} workout guide`}
                        containerClassName="w-full h-full"
                        className="transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#F5F3EC] via-transparent to-[#435246]/25" />
                    </div>

                    <div className="p-6 pb-4">
                      {/* Clean unboxed metadata with typographic separators (Zero-Pill Rule) */}
                      <div className="flex items-center gap-2 text-xs text-[#546B5A] font-medium mb-2">
                        <span>{workout.difficulty}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono-tabular">{workout.duration}</span>
                      </div>

                      <h3 className="text-lg font-bold font-display text-[#232323] mb-2">
                        {workout.category}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#546B5A] leading-relaxed line-clamp-3">
                        {workout.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2">
                    <button
                      type="button"
                      onClick={() => setSelectedWorkout(workout)}
                      className="w-full py-3 px-4 text-xs font-semibold tracking-wider uppercase text-[#232323] bg-[#435246]/10 hover:bg-[#546B5A] hover:text-[#F5F3EC] border border-[#546B5A]/30 hover:border-[#546B5A] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                    >
                      VIEW WORKOUT
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 5. FREE RESOURCES — INSPIRED BY RESOURCE-CENTER CONCEPT */}
        <section
          id="resources"
          aria-labelledby="resources-heading"
          className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-[#546B5A]/25 bg-[#F5F3EC]"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#546B5A] font-medium mb-3">
                  Knowledge &amp; Training Hub
                </p>
                <h2
                  id="resources-heading"
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-[#232323]"
                >
                  RECOVERY RESOURCES
                </h2>
                <p className="text-base sm:text-lg text-[#546B5A] mt-3 max-w-2xl">
                  Supportive, carefully reviewed postpartum wellbeing resources will be added here.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setAdminOpen(true)}
                className="self-start md:self-auto px-4 py-2 text-xs font-medium text-[#546B5A] hover:text-[#232323] border border-[#546B5A]/30 rounded-lg transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <Sliders className="w-3.5 h-3.5 text-[#546B5A]" aria-hidden="true" />
                <span>Manage Resources</span>
              </button>
            </div>

            {config.resources.length === 0 && (
              <div className="rounded-2xl border border-[#546B5A]/30 bg-[#435246]/10 p-8 sm:p-10 text-center max-w-3xl mx-auto">
                <p className="text-lg sm:text-xl font-display text-[#232323]">Helpful guidance, thoughtfully prepared.</p>
                <p className="mt-3 text-sm sm:text-base text-[#546B5A] leading-relaxed">Postpartum resources will appear here after they have been reviewed for accuracy and suitability. For personal concerns, speak with your maternity care provider or a pelvic-health physiotherapist.</p>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {config.resources.map((res) => (
                <article
                  key={res.id}
                  className="rounded-2xl overflow-hidden bg-[#F5F3EC] border border-[#546B5A]/25 hover:border-[#546B5A]/50 transition-all duration-200 flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-44 w-full overflow-hidden">
                      <ResilientImage
                        src={res.image}
                        alt={res.title}
                        containerClassName="w-full h-full"
                        className="transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#F5F3EC] via-[#F5F3EC]/30 to-transparent" />
                    </div>

                    <div className="p-6 pb-4">
                      {/* Unboxed clean metadata */}
                      <div className="flex items-center gap-2 text-xs text-[#546B5A] font-medium mb-2">
                        <span>{res.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono-tabular">{res.readTime}</span>
                      </div>

                      <h3 className="text-xl font-bold font-display text-[#232323] mb-2.5">
                        {res.title}
                      </h3>

                      <p className="text-sm text-[#546B5A] leading-relaxed">
                        {res.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-3 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedResource(res)}
                      className="flex-1 py-3 px-4 text-xs font-semibold tracking-wider uppercase text-[#F5F3EC] bg-[#546B5A] hover:bg-[#435246] rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                    >
                      <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>View / Download</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 6. FEATURED VIDEO SECTION — TRAIN WITH SEHRISH */}
        <VideoSection
          config={config}
          onOpenAdminMedia={() => setAdminOpen(true)}
        />

        {/* 7. SOCIAL MEDIA SECTION — FOLLOW THE JOURNEY */}
        <section
          id="social"
          aria-labelledby="social-heading"
          className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-[#546B5A]/25 bg-[#F5F3EC]"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#546B5A] font-semibold uppercase tracking-widest mb-3">
                  <Instagram className="w-4 h-4" aria-hidden="true" />
                  <span>{config.instagramUsername}</span>
                </div>
                <h2
                  id="social-heading"
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-[#232323]"
                >
                  {config.socialGallery.heading}
                </h2>
                <p className="text-sm sm:text-base text-[#546B5A] mt-2 max-w-xl">
                  {config.socialGallery.subheading}
                </p>
              </div>

              <a
                href={config.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="self-start sm:self-auto px-6 py-3.5 text-xs font-semibold tracking-wider uppercase text-[#F5F3EC] bg-[#546B5A] hover:bg-[#435246] rounded-lg transition-colors inline-flex items-center gap-2 whitespace-nowrap"
              >
                <Instagram className="w-4 h-4" aria-hidden="true" />
                <span>{config.socialGallery.ctaText}</span>
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {config.socialGallery.posts.map((post) => (
                <a
                  key={post.id}
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-2xl overflow-hidden bg-[#F5F3EC] border border-[#546B5A]/25 hover:border-[#546B5A]/50 transition-all flex flex-col justify-between"
                >
                  <div className="relative aspect-square w-full overflow-hidden">
                    <ResilientImage
                      src={post.image}
                      alt={post.caption}
                      containerClassName="w-full h-full"
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#435246]/80 via-[#435246]/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-[#232323]">
                      <span className="font-medium text-[#546B5A]">{post.category}</span>
                      <ArrowUpRight className="w-4 h-4 text-[#232323]/80 group-hover:text-[#546B5A] transition-colors" aria-hidden="true" />
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="text-xs text-[#546B5A] line-clamp-2 leading-relaxed">
                      {post.caption}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 8. RESULTS / TESTIMONIALS — REAL PEOPLE. REAL PROGRESS. */}
        <section
          id="results"
          aria-labelledby="results-heading"
          className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-[#546B5A]/25 bg-[#F5F3EC]"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#546B5A] font-medium mb-3">
                  Community Feedback &amp; Stories
                </p>
                <h2
                  id="results-heading"
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-[#232323]"
                >
                  {config.testimonials.heading}
                </h2>
                <p className="text-sm sm:text-base text-[#546B5A] mt-2 max-w-2xl">
                  {config.testimonials.subheading}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setAdminOpen(true)}
                className="self-start md:self-auto px-4 py-2 text-xs font-medium text-[#546B5A] hover:text-[#232323] border border-[#546B5A]/30 rounded-lg transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <Sliders className="w-3.5 h-3.5 text-[#546B5A]" aria-hidden="true" />
                <span>Edit Testimonials</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {config.testimonials.items.map((item) => (
                <article
                  key={item.id}
                  className="rounded-2xl overflow-hidden bg-[#F5F3EC] border border-[#546B5A]/25 hover:border-[#546B5A]/40 transition-all duration-200 flex flex-col justify-between group"
                >
                  <div>
                    {/* Member Portrait Showcase */}
                    {item.avatarPlaceholder && (
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F5F3EC]">
                        <ResilientImage
                          src={item.avatarPlaceholder}
                          alt={`${item.name} — ${item.role}`}
                          containerClassName="w-full h-full"
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#F5F3EC] via-[#F5F3EC]/20 to-transparent" />
                        <div className="absolute bottom-3 left-5 right-5 flex items-center justify-between">
                          <span className="text-xs font-medium text-[#546B5A]">
                            {item.verifiedContext}
                          </span>
                          <Quote className="w-5 h-5 text-[#546B5A]/80" aria-hidden="true" />
                        </div>
                      </div>
                    )}

                    <div className="p-6 sm:p-7 space-y-4">
                      {!item.avatarPlaceholder && (
                        <div className="flex items-center justify-between">
                          <Quote className="w-6 h-6 text-[#546B5A]/60" aria-hidden="true" />
                          <span className="text-xs text-[#546B5A] font-medium">
                            {item.verifiedContext}
                          </span>
                        </div>
                      )}

                      <p className="text-sm sm:text-base text-[#232323] leading-relaxed">
                        {item.quote}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 sm:px-7 pb-6 pt-4 border-t border-[#546B5A]/25 flex items-center gap-3.5">
                    {item.avatarPlaceholder ? (
                      <div className="w-11 h-11 rounded-full overflow-hidden border border-[#546B5A]/50 shrink-0">
                        <ResilientImage
                          src={item.avatarPlaceholder}
                          alt={item.name}
                          containerClassName="w-full h-full"
                        />
                      </div>
                    ) : (
                      <div
                        className="w-11 h-11 rounded-full bg-[#F5F3EC] border border-[#546B5A]/30 flex items-center justify-center text-xs font-bold text-[#546B5A] shrink-0"
                        aria-hidden="true"
                      >
                        {item.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <h3 className="text-sm font-bold text-[#232323]">{item.name}</h3>
                      <p className="text-xs text-[#546B5A]">{item.role}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <p className="mt-6 text-xs text-[#546B5A]">
              {config.testimonials.disclaimerNote}
            </p>
          </div>
        </section>

        {/* 9. FAQ SECTION — ELEGANT ACCORDION */}
        <section
          id="faq"
          aria-labelledby="faq-heading"
          className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-[#546B5A]/25 bg-[#F5F3EC]"
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-xs uppercase tracking-widest text-[#546B5A] font-medium mb-3">
                Common Questions
              </p>
              <h2
                id="faq-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-[#232323]"
              >
                FREQUENTLY ASKED QUESTIONS
              </h2>
              <p className="text-sm sm:text-base text-[#546B5A] mt-3">
                Everything you need to know about starting your workouts, training at home, and getting in touch.
              </p>
            </div>

            <div className="space-y-3">
              {config.faq.map((item, idx) => {
                const isOpen = openFaqId === item.id;
                return (
                  <div
                    key={item.id}
                    className="rounded-xl bg-[#F5F3EC] border border-[#546B5A]/25 overflow-hidden transition-colors"
                  >
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpenFaqId(isOpen ? '' : item.id)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${item.id}`}
                        id={`faq-trigger-${item.id}`}
                        className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-[#F5F3EC]/[0.02] transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-3.5">
                          <span className="text-xs font-mono-tabular text-[#546B5A]">
                            0{idx + 1}
                          </span>
                          <span className="text-base font-semibold text-[#232323]">
                            {item.question}
                          </span>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 text-[#546B5A] shrink-0 transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    </h3>

                    {isOpen && (
                      <div
                        id={`faq-panel-${item.id}`}
                        role="region"
                        aria-labelledby={`faq-trigger-${item.id}`}
                        className="px-6 pb-5 pt-1 text-sm text-[#546B5A] leading-relaxed border-t border-[#546B5A]/15"
                      >
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 10. CONSULTATION / CONTACT SECTION */}
        <ContactSection
          config={config}
          selectedGoal={consultationGoal}
          onGoalChange={setConsultationGoal}
        />
      </main>

      {/* 11. PREMIUM FOOTER */}
      <footer className="bg-[#F5F3EC] border-t border-[#546B5A]/25 py-14 px-4 sm:px-6 lg:px-8 text-xs text-[#546B5A]">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 justify-between">
            {/* Brand Column */}
            <div className="md:col-span-5 space-y-3">
              <p className="text-xl font-bold font-display tracking-wider text-[#232323]">
                {config.brandName}
              </p>
              <p className="text-xs uppercase tracking-widest text-[#546B5A] font-medium">
                {config.tagline}
              </p>
              <p className="text-xs text-[#546B5A] max-w-sm leading-relaxed pt-1">
                Build strength, confidence, and sustainable fitness habits with structured workouts and educational wellness guides.
              </p>
            </div>

            {/* Navigation Column */}
            <div className="md:col-span-4 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#232323]">
                Navigation
              </p>
              <ul className="grid grid-cols-2 gap-2">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.id);
                      }}
                      className="hover:text-[#232323] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect & Legal Column */}
            <div className="md:col-span-3 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#232323]">
                Connect &amp; Admin
              </p>
              <ul className="space-y-2">
                <li>
                  <a
                    href={config.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#546B5A] transition-colors inline-flex items-center gap-1.5"
                  >
                    <Instagram className="w-3.5 h-3.5 text-[#546B5A]" aria-hidden="true" />
                    <span>Instagram ({config.instagramUsername})</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('contact');
                    }}
                    className="hover:text-[#232323] transition-colors"
                  >
                    Contact &amp; Consultation
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setAdminOpen(true)}
                    className="hover:text-[#546B5A] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sliders className="w-3.5 h-3.5 text-[#546B5A]" aria-hidden="true" />
                    <span>Customize Site Content</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-[#546B5A]/25 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>
              © {new Date().getFullYear()} {config.brandName}. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={() => setLegalModal('privacy')}
                className="hover:text-[#232323] transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <button
                type="button"
                onClick={() => setLegalModal('terms')}
                className="hover:text-[#232323] transition-colors cursor-pointer"
              >
                Terms
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Interactive Modals & Drawers */}
      <WorkoutModal
        workout={selectedWorkout}
        onClose={() => setSelectedWorkout(null)}
        onStartConsultation={handleStartConsultationWithGoal}
      />

      <ResourceModal
        resource={selectedResource}
        onClose={() => setSelectedResource(null)}
      />

      <AdminDrawer
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        config={config}
        onUpdateConfig={setConfig}
        onResetConfig={handleResetConfig}
      />

      <LegalModal
        type={legalModal}
        onClose={() => setLegalModal(null)}
        brandName={config.brandName}
        instagramUsername={config.instagramUsername}
        instagramUrl={config.instagramUrl}
      />
    </div>
  );
}
