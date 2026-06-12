'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from 'framer-motion';
import {
  Users,
  Calculator,
  Megaphone,
  Settings,
  BarChart3,
  ShieldCheck,
  Globe,
  Zap,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  TrendingUp,
  Building2,
  MonitorSmartphone,
  Lock,
  Layers,
  Menu,
  X,
  Sparkles,
  Bot,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { WaitlistForm } from '@/components/waitlist-form';
import { useState, useRef } from 'react';

/* ================================================================== */
/*  ANIMATION CONFIG                                                   */
/* ================================================================== */
const smoothSpring = { type: 'spring' as const, stiffness: 80, damping: 20, mass: 1 };
const snappySpring = { type: 'spring' as const, stiffness: 400, damping: 30, mass: 0.6 };
const gentleSpring = { type: 'spring' as const, stiffness: 120, damping: 24, mass: 0.8 };

/* -- Variant: fade up with subtle blur (Apple materialisation) -------- */
const fadeUp = {
  hidden: { opacity: 0, y: 50, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

/* -- Variant: fade in ------------------------------------------------ */
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

/* -- Variant: scale in ---------------------------------------------- */
const scaleIn = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

/* -- Variant: stagger container -------------------------------------- */
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

/* -- Variant: slow stagger for long lists ---------------------------- */
const slowStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};

/* ================================================================== */
/*  HELPER COMPONENTS                                                  */
/* ================================================================== */

/** Apple-style section reveal */
function Reveal({
  children,
  className = '',
  delay = 0,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-80px' }}
      variants={fadeUp}
      transition={{ ...smoothSpring, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Staggered children container */
function StaggerReveal({
  children,
  className = '',
  variant = stagger,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: typeof stagger;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={variant}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Single stagger child item */
function StaggerItem({
  children,
  className = '',
  variants = fadeUp,
}: {
  children: React.ReactNode;
  className?: string;
  variants?: typeof fadeUp;
}) {
  return (
    <motion.div variants={variants} transition={smoothSpring} className={className}>
      {children}
    </motion.div>
  );
}

/** Scroll progress bar at top of viewport */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-orange-500 origin-left z-[60]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

/* ================================================================== */
/*  DATA                                                               */
/* ================================================================== */
const modules = [
  {
    icon: Users,
    title: 'HR Management',
    color: 'from-blue-900 to-blue-900',
    lightBg: 'bg-blue-300',
    textColor: 'text-blue-900',
    features: [
      'Employee records management',
      'Leave & attendance management',
      'Performance management',
      'Recruitment & onboarding',
      'Employee self-service portal',
      'Approval workflows',
      'Payroll Management',
    ],
  },
  {
    icon: Megaphone,
    title: 'Marketing & Business Development',
    color: 'from-amber-500 to-orange-600',
    lightBg: 'bg-amber-50',
    textColor: 'text-amber-700',
    features: [
      'Lead management',
      'Opportunity tracking',
      'Customer relationship management',
      'Follow-up monitoring',
      'Sales pipeline visibility',
      'Fleet management',
    ],
  },
  {
    icon: Calculator,
    title: 'Accounting',
    color: 'from-rose-500 to-pink-600',
    lightBg: 'bg-rose-50',
    textColor: 'text-rose-700',
    features: [
      'General Ledger',
      'Accounts Payable & Receivable',
      'Cash Management',
      'Bank Reconciliation',
      'Financial Reporting',
      'Budget Management & Expense Tracking',
      'Multi-branch accounting',
      'Payroll Management',
    ],
  },
  {
    icon: Settings,
    title: 'Operations',
    color: 'from-violet-500 to-purple-600',
    lightBg: 'bg-violet-50',
    textColor: 'text-violet-700',
    features: [
      'Reinsurance Brokerage Software',
      'Insurance Brokerage Software',
      'Hospital Management Software',
      'School Management Software',
      'Manufacturing processes',
      'Industry-specific business processes',
    ],
  },
];

const dashboardFeatures = [
  'Company-wide performance metrics',
  'Sales pipeline status',
  'Revenue tracking',
  'Staff productivity insights',
  'Operational performance indicators',
  'Financial health monitoring',
  'Departmental performance reports',
];

const benefits = [
  { icon: TrendingUp, title: 'Reduce Software Costs', desc: 'Replace multiple standalone applications with a single integrated platform to lower subscription and licensing expenses.' },
  { icon: Layers, title: 'Eliminate Duplicate Data', desc: 'A single source of truth means no more re-entering data across disconnected systems.' },
  { icon: Users, title: 'Improve Collaboration', desc: 'Departments share real-time data, breaking down silos and boosting teamwork.' },
  { icon: BarChart3, title: 'Enhance Reporting', desc: 'Consolidated, accurate reports replace fragmented spreadsheets and guesswork.' },
  { icon: Zap, title: 'Increase Productivity', desc: 'One login, one platform — employees spend less time switching tools and more time delivering results.' },
  { icon: ShieldCheck, title: 'Simplify IT Administration', desc: 'Manage one system instead of dozens, reducing IT overhead and complexity.' },
];

/* ================================================================== */
/*  MAIN PAGE                                                          */
/* ================================================================== */
export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroContentY = useTransform(heroProgress, [0, 1], [0, 120]);
  const heroContentOpacity = useTransform(heroProgress, [0, 0.75], [1, 0]);
  const heroContentScale = useTransform(heroProgress, [0, 1], [1, 0.97]);

  useMotionValueEvent(useScroll().scrollY, 'change', (latest) => {
    setScrolled(latest > 60);
  });

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = ['modules', 'dashboard', 'benefits', 'about'];

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      <ScrollProgress />

      {/* ===================== HEADER ===================== */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...gentleSpring, delay: 0.2 }}
          className={`mx-auto transition-all duration-500 ${
            scrolled || mobileMenuOpen
              ? 'max-w-3xl mt-3 px-2 py-1.5 rounded-full bg-white/70 backdrop-blur-2xl shadow-lg shadow-black/[0.06] border border-white/40 flex items-center justify-between text-foreground'
              : 'max-w-7xl mt-0 px-6 sm:px-8 lg:px-12 py-3 flex items-center justify-between text-white'
          }`}
        >
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Image
              src="/images/workphelo-logo.png"
              alt="Workphelo"
              width={120}
              height={32}
              className={`h-5 w-auto transition-all duration-500 ${
                scrolled
                  ? 'h-5 w-auto opacity-100'
                  : 'h-[22px] w-auto brightness-0 invert'
              }`}
            />
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`px-3 py-1.5 rounded-full text-[13px] font-medium transition-all duration-300 cursor-pointer capitalize ${
                  scrolled
                    ? 'text-muted-foreground hover:text-foreground hover:bg-black/5'
                    : 'hover:bg-white/10'
                }`}
                style={!scrolled ? { color: 'white' } : undefined}
              >
                {id === 'about' ? 'Built for Africa' : id}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center shrink-0">
            <Button
              onClick={() => scrollTo('waitlist-cta')}
              className={`rounded-full font-semibold cursor-pointer transition-all duration-300 text-[13px] px-4 ${
                scrolled
                  ? 'bg-blue-900 hover:bg-blue-950 text-white shadow-md shadow-blue-900/20'
                  : 'bg-white/15 backdrop-blur-sm text-white border border-white/20 hover:bg-white/25'
              }`}
            >
              Join Waitlist
              <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-1.5 rounded-full cursor-pointer transition-colors ${
              scrolled ? 'text-foreground hover:bg-black/5' : 'hover:bg-white/10'
            }`}
            style={!scrolled ? { color: 'white' } : undefined}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </motion.nav>
      </header>

      {/* Mobile menu — full-screen overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-blue-950/95 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-2">
              {navLinks.map((id, i) => (
                <motion.button
                  key={id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ ...gentleSpring, delay: 0.05 + i * 0.06 }}
                  onClick={() => scrollTo(id)}
                  className="text-2xl font-semibold text-white/80 hover:text-white transition-colors capitalize cursor-pointer py-3"
                >
                  {id === 'about' ? 'Built for Africa' : id}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ ...gentleSpring, delay: 0.05 + navLinks.length * 0.06 }}
                className="mt-4"
              >
                <Button
                  onClick={() => scrollTo('waitlist-section')}
                  className="rounded-full bg-orange-600 hover:bg-orange-700 text-white font-semibold cursor-pointer shadow-lg shadow-orange-600/30 px-8"
                >
                  Join the Waitlist
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1">
        {/* ===================== HERO ===================== */}
        <section ref={heroRef} className="relative flex items-center justify-center overflow-hidden lg:min-h-screen cursor-dot">
          {/* Background image */}
          <Image
            src="/images/hero-bg.png"
            alt=""
            fill
            className="object-cover object-center scale-105"
            priority
          />
          {/* Dark overlay — deep shade */}
          <div className="absolute inset-0 bg-black/80" />
          {/* Vignette for depth */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(0,0,0,0.4)_100%)]" />

          {/* Content */}
          <motion.div
            style={{ y: heroContentY, opacity: heroContentOpacity, scale: heroContentScale }}
            className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 pb-24 lg:pt-0 lg:pb-0 text-center"
          >
            {/* Headline */}
            <motion.h1
              className="text-[1.9rem] sm:text-[2.6rem] md:text-[3.15rem] lg:text-[4.2rem] xl:text-[4.9rem] font-extrabold tracking-tight text-white leading-[0.95]"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08, delayChildren: 0.35 } },
              }}
            >
              {/* Line 1: Complete Business */}
              <motion.span
                className="block text-white/80"
                variants={{
                  hidden: { opacity: 0, y: 50, filter: 'blur(10px)' },
                  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: gentleSpring },
                }}
              >
                Complete Business
              </motion.span>

              {/* Line 3: Visibility. — with orange accent */}
              <motion.span
                className="block bg-gradient-to-r from-orange-300 via-orange-400 to-amber-300 bg-clip-text text-transparent"
                variants={{
                  hidden: { opacity: 0, y: 50, filter: 'blur(10px)' },
                  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: gentleSpring },
                }}
              >
                Visibility.
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...smoothSpring, delay: 1.1 }}
              className="mt-8 sm:mt-10 text-sm sm:text-base text-white/40 max-w-xl mx-auto leading-relaxed"
            >
              Workphelo unifies HR, Marketing, Sales, Accounting, Operations,
              Fleet Management, and Executive Reporting — giving organizations
              a single source of truth.
            </motion.p>

            {/* Trust badges */}
            <motion.div
              className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1, delayChildren: 1.3 } },
              }}
            >
              {['No credit card required', 'Free early access', 'Built for Africa'].map((t) => (
                <motion.div
                  key={t}
                  className="flex items-center gap-1.5 text-[13px] text-white/25"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { duration: 0.6 } },
                  }}
                >
                  <span className="w-1 h-1 rounded-full bg-orange-400/50" />
                  <span>{t}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Floating "One Platform." badge — left */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...snappySpring, delay: 0.8 }}
            className="absolute z-20 hidden lg:flex items-center gap-3 bg-white/[0.07] border border-white/[0.1] rounded-full px-5 py-2.5 backdrop-blur-md"
            style={{
              bottom: '18%',
              left: '8%',
            }}
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Layers className="w-4 h-4 text-blue-400" />
              </div>
            </motion.div>
            <span className="text-white text-base font-semibold tracking-tight">One Platform.</span>
          </motion.div>

          {/* Floating "One Login." badge — right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...snappySpring, delay: 1.0 }}
            className="absolute z-20 hidden lg:flex items-center gap-3 bg-white/[0.07] border border-white/[0.1] rounded-full px-5 py-2.5 backdrop-blur-md"
            style={{
              bottom: '18%',
              right: '8%',
            }}
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                </svg>
              </div>
            </motion.div>
            <span className="text-white text-base font-semibold tracking-tight">One Login.</span>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 hidden lg:flex flex-col items-center gap-2"
          >
            <span className="text-white/30 text-xs font-medium tracking-widest uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown className="h-5 w-5 text-white/25" />
            </motion.div>
          </motion.div>

          {/* Curved bottom edge */}
          <div className="absolute bottom-0 left-0 right-0 -mb-1">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block" preserveAspectRatio="none">
              <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
            </svg>
          </div>
        </section>

        {/* ===================== PROBLEM / WHY WORKPHELO ===================== */}
        <section className="py-24 sm:py-32 lg:py-44 bg-white relative overflow-hidden cursor-logo">
          <div className="max-w-5xl mx-auto px-6 sm:px-8">
            <Reveal>
              <p className="text-sm font-semibold text-orange-600 tracking-widest uppercase mb-4">The Problem</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight max-w-4xl">
                Why Workphelo Is Better
                <br className="hidden sm:block" />
                {' '}Than Traditional ERP Systems
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 sm:mt-8 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl">
                Most organizations in Ghana and Africa operate with multiple disconnected
                software solutions for HR, accounting, sales, operations, fleet management,
                and reporting. This creates inefficiencies, duplicate data entry, poor
                visibility, and higher operational costs.
              </p>
            </Reveal>

            <Reveal delay={0.35} className="mt-14 sm:mt-20">
              <motion.div
                whileHover={{ y: -4, transition: snappySpring }}
                className="relative rounded-3xl bg-blue-200/60 border border-blue-300/60 p-8 sm:p-14"
              >
                <div className="absolute top-8 right-8 opacity-[0.07]">
                  <MonitorSmartphone className="h-36 w-36 text-blue-900" />
                </div>
                <div className="relative flex items-start gap-5">
                  <div className="hidden sm:flex shrink-0 w-12 h-12 rounded-2xl bg-blue-900 items-center justify-center shadow-lg shadow-blue-900/20">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground leading-snug">
                      Workphelo solves this by bringing all critical business
                      functions into a single integrated platform.
                    </h3>
                    <p className="mt-4 text-muted-foreground leading-relaxed max-w-2xl text-base sm:text-lg">
                      Unlike traditional setups where employees switch between multiple
                      applications for different tasks, Workphelo enables teams to work
                      from a single platform with one login, improving productivity and
                      collaboration across departments.
                    </p>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          </div>
          <div className="absolute bottom-0 left-0 right-0 -mb-1">
            <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block" preserveAspectRatio="none">
              <path d="M0 0L60 10C120 20 240 40 360 52.5C480 65 600 70 720 65C840 60 960 45 1080 37.5C1200 30 1320 30 1380 30L1440 30V100H0Z" fill="#fafaf9"/>
            </svg>
          </div>
        </section>

        {/* ===================== MODULES ===================== */}
        <section id="modules" className="py-24 sm:py-32 lg:py-44 bg-stone-50/70 relative overflow-hidden cursor-dot">
          <div className="max-w-6xl mx-auto px-6 sm:px-8">
            <Reveal className="max-w-3xl mx-auto text-center">
              <p className="text-sm font-semibold text-orange-600 tracking-widest uppercase mb-4">Core Modules</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
                Everything Your Business Needs,
                <br className="hidden sm:block" /> In One Place
              </h2>
              <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
                Four powerful modules designed to cover every aspect of your business operations — plus an AI-powered future on the horizon.
              </p>
            </Reveal>

            <StaggerReveal className="mt-14 sm:mt-20 grid md:grid-cols-2 gap-5 lg:gap-7" variant={stagger}>
              {modules.map((mod) => {
                const Icon = mod.icon;
                return (
                  <StaggerItem key={mod.title}>
                    <motion.div
                      whileHover={{ y: -6, transition: snappySpring }}
                      className="group relative h-full bg-white rounded-3xl shadow-sm hover:shadow-xl hover:shadow-black/[0.06] p-7 sm:p-9 transition-shadow duration-500"
                    >
                      {/* Top accent line */}
                      <div className={`absolute top-0 left-8 right-8 h-[3px] rounded-b-full bg-gradient-to-r ${mod.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                      <div className="flex items-start gap-4 mb-6">
                        <div className={`shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br ${mod.color} flex items-center justify-center shadow-lg`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground pt-2">{mod.title}</h3>
                      </div>
                      <ul className="space-y-3">
                        {mod.features.map((f) => (
                          <li key={f} className="flex items-start gap-2.5">
                            <CheckCircle2 className={`shrink-0 h-[18px] w-[18px] mt-0.5 ${mod.textColor}`} />
                            <span className="text-[15px] text-muted-foreground leading-relaxed">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </StaggerItem>
                );
              })}
            </StaggerReveal>

            {/* ========== AGENTIC AI MODULE — UPCOMING ========== */}
            <Reveal delay={0.3} className="mt-8">
              <motion.div
                whileHover={{ y: -4, transition: snappySpring }}
                className="relative rounded-3xl overflow-hidden border border-orange-200/60 bg-gradient-to-br from-orange-50/80 via-white to-amber-50/60 p-7 sm:p-10 lg:p-12"
              >
                {/* Animated glow */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-orange-400/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-5 mb-8">
                    <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                      <Sparkles className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="text-2xl sm:text-3xl font-bold text-foreground">Agentic AI Module</h3>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold tracking-wide uppercase">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                          </span>
                          Coming Soon
                        </span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed max-w-2xl text-base sm:text-[17px]">
                        Intelligent AI Agents that work alongside your teams — automating tasks, surfacing insights, and making proactive recommendations across every department.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                    {[
                      { dept: 'HR Agent', desc: 'Automate onboarding, leave approvals & performance reviews', icon: Users },
                      { dept: 'Accounting Agent', desc: 'Smart reconciliation, invoice processing & financial insights', icon: Calculator },
                      { dept: 'Marketing Agent', desc: 'Lead scoring, campaign optimization & follow-up automation', icon: Megaphone },
                      { dept: 'Operations Agent', desc: 'Process automation, inventory alerts & workflow triggers', icon: Settings },
                      { dept: 'Executive Agent', desc: 'AI-powered briefings, KPI monitoring & decision support', icon: BarChart3 },
                    ].map((agent) => {
                      const AgentIcon = agent.icon;
                      return (
                        <motion.div
                          key={agent.dept}
                          whileHover={{ y: -3, transition: snappySpring }}
                          className="group relative bg-white/80 backdrop-blur-sm rounded-2xl border border-orange-100/80 p-4 sm:p-5 hover:shadow-lg hover:shadow-orange-500/[0.08] hover:border-orange-200 transition-all duration-300"
                        >
                          <div className="w-9 h-9 rounded-xl bg-orange-100 group-hover:bg-orange-500 flex items-center justify-center mb-3 transition-colors duration-300">
                            <AgentIcon className="h-4.5 w-4.5 text-orange-600 group-hover:text-white transition-colors duration-300" />
                          </div>
                          <h4 className="font-semibold text-foreground text-sm sm:text-[15px] mb-1.5">{agent.dept}</h4>
                          <p className="text-xs sm:text-[13px] text-muted-foreground leading-relaxed">{agent.desc}</p>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </Reveal>
          </div>
          <div className="absolute bottom-0 left-0 right-0 -mb-1">
            <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block" preserveAspectRatio="none">
              <path d="M0 100L60 90C120 80 240 60 360 50C480 40 600 40 720 45C840 50 960 60 1080 65C1200 70 1320 70 1380 70L1440 70V100H0Z" fill="#ffffff"/>
            </svg>
          </div>
        </section>
        <section id="dashboard" className="py-24 sm:py-32 lg:py-44 bg-white overflow-hidden relative cursor-logo">
          <div className="max-w-6xl mx-auto px-6 sm:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Image */}
              <Reveal className="order-2 lg:order-1">
                <div className="relative">
                  <div className="absolute -inset-6 bg-blue-400/20 rounded-[2rem] blur-3xl opacity-50" />
                  <motion.div
                    className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/10 border border-gray-100"
                    whileHover={{ scale: 1.01, transition: snappySpring }}
                  >
                    <Image
                      src="/images/dashboard-preview.png"
                      alt="Executive Dashboard Preview"
                      width={1344}
                      height={768}
                      className="w-full h-auto"
                    />
                  </motion.div>
                </div>
              </Reveal>

              {/* Content */}
              <div className="order-1 lg:order-2">
                <Reveal>
                  <p className="text-sm font-semibold text-orange-600 tracking-widest uppercase mb-4">Executive Dashboard</p>
                </Reveal>
                <Reveal delay={0.1}>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
                    Better Decisions with
                    <br className="hidden sm:block" /> Real-Time Visibility
                  </h2>
                </Reveal>
                <Reveal delay={0.2}>
                  <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                    CEOs, Managing Directors, and Department Heads can access
                    real-time dashboards that provide:
                  </p>
                </Reveal>
                <StaggerReveal variant={slowStagger} className="mt-8 space-y-3.5">
                  {dashboardFeatures.map((f) => (
                    <StaggerItem key={f} className="flex items-center gap-3.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                      <span className="text-foreground font-medium text-[15px]">{f}</span>
                    </StaggerItem>
                  ))}
                </StaggerReveal>
                <Reveal delay={0.5}>
                  <p className="mt-8 text-muted-foreground leading-relaxed text-base">
                    This enables faster, data-driven decision-making and greater
                    organizational control.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 -mb-1">
            <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block" preserveAspectRatio="none">
              <path d="M0 0L60 8C120 16 240 32 360 42.5C480 53 600 58 720 55C840 52 960 41 1080 35C1200 29 1320 28 1380 27.5L1440 27V100H0Z" fill="#172554"/>
            </svg>
          </div>
        </section>

        {/* ===================== BENEFITS ===================== */}
        <section id="benefits" className="py-24 sm:py-32 lg:py-44 bg-blue-950 relative overflow-hidden cursor-dot">
          {/* Dot texture */}
          <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_center,_rgba(234,88,12,0.06)_0%,_transparent_70%)]" />

          <div className="relative max-w-6xl mx-auto px-6 sm:px-8">
            <Reveal className="max-w-3xl mx-auto text-center">
              <p className="text-sm font-semibold text-orange-400 tracking-widest uppercase mb-4">Key Benefits</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                Reduced Costs.
                <br className="hidden sm:block" />
                {' '}Improved Efficiency.
              </h2>
              <p className="mt-6 text-lg text-white/45 max-w-2xl mx-auto">
                By replacing multiple standalone applications with a single integrated platform,
                organizations can transform how they work.
              </p>
            </Reveal>

            <StaggerReveal className="mt-14 sm:mt-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6" variant={stagger}>
              {benefits.map((b) => {
                const Icon = b.icon;
                return (
                  <StaggerItem key={b.title} variants={scaleIn}>
                    <motion.div
                      whileHover={{ y: -4, transition: snappySpring }}
                      className="group h-full bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-3xl p-7 sm:p-8 hover:bg-white/[0.07] transition-colors duration-500"
                    >
                      <div className="w-11 h-11 rounded-2xl bg-orange-500/15 flex items-center justify-center mb-5 group-hover:bg-orange-500/25 transition-colors duration-500">
                        <Icon className="h-5 w-5 text-orange-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2.5">{b.title}</h3>
                      <p className="text-sm text-white/45 leading-relaxed">{b.desc}</p>
                    </motion.div>
                  </StaggerItem>
                );
              })}
            </StaggerReveal>
          </div>
          <div className="absolute bottom-0 left-0 right-0 -mb-1">
            <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block" preserveAspectRatio="none">
              <path d="M0 100L60 85C120 70 240 40 360 27.5C480 15 600 20 720 27.5C840 35 960 45 1080 52.5C1200 60 1320 65 1380 67.5L1440 70V100H0Z" fill="#ffffff"/>
            </svg>
          </div>
        </section>

        {/* ===================== BUILT FOR AFRICA ===================== */}
        <section id="about" className="py-24 sm:py-32 lg:py-44 bg-white relative overflow-hidden cursor-logo">
          <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center">
            <Reveal>
              <Badge variant="secondary" className="mb-5 bg-orange-50 text-orange-600 border-orange-200">
                <Globe className="mr-1.5 h-3.5 w-3.5" />
                Built for African Businesses
              </Badge>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Enterprise-Grade Capabilities,{' '}
                <span className="text-orange-600">African-First Design</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Workphelo is designed with the realities of African businesses in mind,
                providing enterprise-grade capabilities while remaining affordable,
                flexible, and easy to deploy.
              </p>
            </Reveal>

            <StaggerReveal className="mt-14 sm:mt-20 grid sm:grid-cols-3 gap-6 lg:gap-8">
              {[
                { icon: Building2, label: 'Affordable', desc: 'Pricing that works for businesses of every size across Africa' },
                { icon: Settings, label: 'Flexible', desc: 'Highly customizable to match your specific workflow requirements' },
                { icon: Zap, label: 'Easy to Deploy', desc: 'Cloud-based with minimal setup time and no complex infrastructure' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <StaggerItem key={item.label} variants={scaleIn}>
                    <motion.div
                      whileHover={{ y: -4, transition: snappySpring }}
                      className="rounded-3xl bg-stone-50 border border-gray-100 p-8 text-center h-full shadow-sm hover:shadow-md transition-shadow duration-500"
                    >
                      <div className="mx-auto w-14 h-14 rounded-2xl bg-blue-300 flex items-center justify-center mb-5">
                        <Icon className="h-7 w-7 text-blue-900" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">{item.label}</h3>
                      <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </motion.div>
                  </StaggerItem>
                );
              })}
            </StaggerReveal>
          </div>
          <div className="absolute bottom-0 left-0 right-0 -mb-1">
            <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block" preserveAspectRatio="none">
              <path d="M0 0L60 10C120 20 240 40 360 52.5C480 65 600 70 720 65C840 60 960 45 1080 37.5C1200 30 1320 30 1380 30L1440 30V100H0Z" fill="#fafaf9"/>
            </svg>
          </div>
        </section>

        {/* ===================== VALUE PROPOSITION ===================== */}
        <section className="py-20 sm:py-28 lg:py-36 bg-stone-50/70 relative overflow-hidden cursor-dot">
          <div className="max-w-4xl mx-auto px-6 sm:px-8">
            <Reveal>
              <div className="relative rounded-3xl bg-white border border-gray-100 p-8 sm:p-14 lg:p-16 shadow-sm">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                  <div className="w-12 h-12 rounded-2xl bg-orange-600 flex items-center justify-center shadow-lg shadow-orange-600/30">
                    <Lock className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mt-3 text-center">
                  Workphelo&apos;s Core Value Proposition
                </h2>
                <div className="mt-6 sm:mt-8 mx-auto max-w-2xl text-center">
                  <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed italic">
                    &ldquo;Workphelo unifies HR, Marketing, Sales, Accounting, Operations,
                    Fleet Management, and Executive Reporting into one intelligent platform,
                    giving organizations a single source of truth, a single login, and a
                    complete view of their business.&rdquo;
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
          <div className="absolute bottom-0 left-0 right-0 -mb-1">
            <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block" preserveAspectRatio="none">
              <path d="M0 100L60 90C120 80 240 60 360 50C480 40 600 40 720 45C840 50 960 60 1080 65C1200 70 1320 70 1380 70L1440 70V100H0Z" fill="#172554"/>
            </svg>
          </div>
        </section>

        {/* ===================== WAITLIST CTA ===================== */}
        <section id="waitlist-cta" className="py-24 sm:py-32 lg:py-44 bg-blue-950 relative overflow-hidden cursor-dot">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(234,88,12,0.08)_0%,_transparent_50%)]" />

          <div className="relative max-w-3xl mx-auto px-6 sm:px-8 text-center">
            <Reveal>
              <Badge variant="secondary" className="mb-5 bg-orange-500/15 text-orange-300 border-orange-500/20">
                Early Access
              </Badge>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Be Among the First to
                <br className="hidden sm:block" />
                {' '}Experience Workphelo
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 text-lg text-white/45 max-w-xl mx-auto">
                Join our waitlist and get priority access when we launch. Help shape the
                future of business management in Africa.
              </p>
            </Reveal>
            <Reveal delay={0.35} className="mt-10 sm:mt-14">
              <WaitlistForm variant="section" />
            </Reveal>
          </div>
        </section>
      </main>

      {/* ===================== FOOTER ===================== */}
      <footer className="bg-blue-950 text-white/60 border-t border-white/[0.06] cursor-dot">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-14 sm:py-16 lg:py-20">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="mb-5">
                <Image
                  src="/images/workphelo-logo.png"
                  alt="Workphelo"
                  width={120}
                  height={32}
                  className="h-8 w-auto brightness-0 invert"
                />
              </div>
              <p className="text-sm leading-relaxed max-w-xs text-white/40">
                The all-in-one ERP platform built for African businesses. Unified,
                intelligent, and affordable.
              </p>
            </div>

            {/* Modules */}
            <div>
              <h4 className="text-xs font-semibold text-white/80 uppercase tracking-widest mb-5">Modules</h4>
              <ul className="space-y-1 text-sm">
                {['HR Management', 'Marketing & BD', 'Accounting', 'Operations'].map((m) => (
                  <li key={m}>
                    <button onClick={() => scrollTo('modules')} className="block py-2 text-white/40 hover:text-white transition-colors cursor-pointer">
                      {m}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-xs font-semibold text-white/80 uppercase tracking-widest mb-5">Company</h4>
              <ul className="space-y-1 text-sm">
                {[
                  { label: 'About', id: 'about' },
                  { label: 'Benefits', id: 'benefits' },
                  { label: 'Dashboard', id: 'dashboard' },
                  { label: 'Waitlist', id: 'waitlist-section' },
                ].map((item) => (
                  <li key={item.label}>
                    <button onClick={() => scrollTo(item.id)} className="block py-2 text-white/40 hover:text-white transition-colors cursor-pointer">
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-xs font-semibold text-white/80 uppercase tracking-widest mb-5">Powered By</h4>
              <p className="text-sm leading-relaxed text-white/40">
                <span className="text-white/80 font-semibold">Datrix Tech Solutions</span>
                <br />
                Enterprise software for the African market.
              </p>
              <div className="mt-5">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => scrollTo('waitlist-section')}
                  className="rounded-full border-orange-500/30 text-orange-300 hover:bg-orange-500/10 hover:text-orange-200 hover:border-orange-500/50 min-h-[44px] cursor-pointer"
                >
                  Join Waitlist
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>

          <Separator className="my-10 bg-white/[0.06]" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/25">
            <p>&copy; {new Date().getFullYear()} Datrix Tech Solutions. All rights reserved.</p>
            <p>Workphelo ERP — Built for Africa, Ready for the World.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}