'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
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
  ChevronRight,
  TrendingUp,
  Building2,
  MonitorSmartphone,
  Lock,
  Layers,
  Menu,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { WaitlistForm } from '@/components/waitlist-form';
import { useState, useEffect } from 'react';

/* ------------------------------------------------------------------ */
/*  Animated section wrapper                                          */
/* ------------------------------------------------------------------ */
function FadeIn({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}) {
  const dirMap = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 60, y: 0 },
    right: { x: -60, y: 0 },
  };
  const d = dirMap[direction];
  return (
    <motion.div
      initial={{ opacity: 0, ...d }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Module data                                                        */
/* ------------------------------------------------------------------ */
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
  {
    icon: TrendingUp,
    title: 'Reduce Software Costs',
    desc: 'Replace multiple standalone applications with a single integrated platform to lower subscription and licensing expenses.',
  },
  {
    icon: Layers,
    title: 'Eliminate Duplicate Data',
    desc: 'A single source of truth means no more re-entering data across disconnected systems.',
  },
  {
    icon: Users,
    title: 'Improve Collaboration',
    desc: 'Departments share real-time data, breaking down silos and boosting teamwork.',
  },
  {
    icon: BarChart3,
    title: 'Enhance Reporting',
    desc: 'Consolidated, accurate reports replace fragmented spreadsheets and guesswork.',
  },
  {
    icon: Zap,
    title: 'Increase Productivity',
    desc: 'One login, one platform — employees spend less time switching tools and more time delivering results.',
  },
  {
    icon: ShieldCheck,
    title: 'Simplify IT Administration',
    desc: 'Manage one system instead of dozens, reducing IT overhead and complexity.',
  },
];

/* ------------------------------------------------------------------ */
/*  Main Page                                                          */
/* ------------------------------------------------------------------ */
export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* ===================== NAVIGATION ===================== */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/60 backdrop-blur-xl shadow-sm border-b border-white/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 lg:h-20">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-blue-900 flex items-center justify-center">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <span
                className={`text-xl font-bold tracking-tight transition-colors ${
                  scrolled ? 'text-foreground' : 'text-white'
                }`}
              >
                Workphelo
              </span>
            </button>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {['modules', 'dashboard', 'benefits', 'about'].map((id) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer capitalize ${
                    scrolled
                      ? 'text-muted-foreground hover:text-foreground hover:bg-accent'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {id === 'about' ? 'Built for Africa' : id}
                </button>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Button
                variant={scrolled ? 'default' : 'outline'}
                onClick={() => scrollTo('waitlist-section')}
                className={`font-semibold cursor-pointer ${
                  !scrolled
                    ? 'border-white/30 text-white hover:bg-white/10 hover:text-white bg-transparent'
                    : 'bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white shadow-lg shadow-orange-700/25'
                }`}
              >
                Join Waitlist
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-md cursor-pointer ${
                scrolled ? 'text-foreground' : 'text-white'
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-border shadow-lg"
          >
            <div className="px-4 py-4 space-y-2">
              {['modules', 'dashboard', 'benefits', 'about'].map((id) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="block w-full text-left px-4 py-2.5 rounded-md text-sm font-medium text-foreground hover:bg-accent capitalize cursor-pointer"
                >
                  {id === 'about' ? 'Built for Africa' : id}
                </button>
              ))}
              <Separator className="my-2" />
              <Button
                onClick={() => scrollTo('waitlist-section')}
                className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-semibold cursor-pointer shadow-lg shadow-orange-700/25"
              >
                Join the Waitlist
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </header>

      <main className="flex-1">
        {/* ===================== HERO ===================== */}
        <section className="relative flex items-center justify-center overflow-hidden py-20 lg:min-h-screen lg:py-0">
          {/* Background */}
          <div className="absolute inset-0 bg-blue-950" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(59,130,246,0.15)_0%,_transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(234,88,12,0.08)_0%,_transparent_60%)]" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-32 lg:pb-24">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Left: Content */}
              <div className="text-center lg:text-left">
                <FadeIn delay={0.1}>
                  <Badge
                    variant="secondary"
                    className="mb-6 bg-orange-500/20 text-orange-300 border-orange-500/30 px-4 py-1.5 text-sm"
                  >
                    <Zap className="mr-1.5 h-3.5 w-3.5" />
                    Powered by Datrix Tech Solutions
                  </Badge>
                </FadeIn>

                <FadeIn delay={0.2}>
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
                    One Platform.{' '}
                    <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
                      One Login.
                    </span>
                    <br />
                    Complete Business
                    <br />
                    Visibility.
                  </h1>
                </FadeIn>

                <FadeIn delay={0.35}>
                  <p className="mt-4 sm:mt-6 text-base sm:text-xl text-white/70 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                    Workphelo unifies HR, Marketing, Sales, Accounting, Operations,
                    Fleet Management, and Executive Reporting into one intelligent
                    platform — giving organizations a single source of truth.
                  </p>
                </FadeIn>

                <FadeIn delay={0.5}>
                  <div className="mt-6 sm:mt-8">
                    <WaitlistForm variant="hero" />
                  </div>
                </FadeIn>

                <FadeIn delay={0.6}>
                  <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-sm text-white/50">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-orange-400" />
                      <span>No credit card required</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-orange-400" />
                      <span>Free early access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-orange-400" />
                      <span>Built for Africa</span>
                    </div>
                  </div>
                </FadeIn>
              </div>

              {/* Right: Hero image */}
              <FadeIn delay={0.4} direction="right" className="hidden lg:block">
                <div className="relative">
                  <div className="absolute -inset-4 bg-blue-900/20 rounded-3xl blur-2xl" />
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-950/50 border border-white/10">
                    <Image
                      src="/images/hero-erp.png"
                      alt="Workphelo ERP Dashboard"
                      width={1344}
                      height={768}
                      className="w-full h-auto"
                      priority
                    />
                  </div>
                  {/* Floating badge */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl p-3 flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-300 flex items-center justify-center">
                      <BarChart3 className="h-5 w-5 text-blue-900" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Real-time Insights</p>
                      <p className="text-xs text-muted-foreground">Live KPIs & Reports</p>
                    </div>
                  </motion.div>
                  {/* Floating badge 2 */}
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl p-3 flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-300 flex items-center justify-center">
                      <ShieldCheck className="h-5 w-5 text-blue-900" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Enterprise Security</p>
                      <p className="text-xs text-muted-foreground">Role-based Access</p>
                    </div>
                  </motion.div>
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Bottom wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <path d="M0 60L60 55C120 50 240 40 360 35C480 30 600 30 720 35C840 40 960 50 1080 55C1200 60 1320 60 1380 60L1440 60V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0V60Z" fill="white" />
            </svg>
          </div>
        </section>

        {/* ===================== PROBLEM / WHY WORKPHELO ===================== */}
        <section className="py-12 sm:py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn className="max-w-3xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4">
                The Problem
              </Badge>
              <h2 className="text-2xl sm:text-4xl font-bold text-foreground leading-tight">
                Why Workphelo Is Better Than Traditional ERP Systems
              </h2>
              <p className="mt-3 sm:mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
                Most organizations in Ghana and Africa operate with multiple disconnected
                software solutions for HR, accounting, sales, operations, fleet management,
                and reporting. This creates inefficiencies, duplicate data entry, poor
                visibility, and higher operational costs.
              </p>
            </FadeIn>

            <FadeIn delay={0.2} className="mt-8 sm:mt-14">
              <div className="relative rounded-2xl bg-blue-200 border border-blue-300 p-5 sm:p-12">
                <div className="absolute top-6 right-6 opacity-10">
                  <MonitorSmartphone className="h-32 w-32 text-blue-900" />
                </div>
                <div className="relative">
                  <div className="flex items-start gap-4">
                    <div className="hidden sm:flex shrink-0 w-12 h-12 rounded-xl bg-blue-900 hover:bg-blue-950 items-center justify-center">
                      <Globe className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-2xl font-bold text-foreground">
                        Workphelo solves this challenge by bringing all critical business
                        functions into a single integrated platform.
                      </h3>
                      <p className="mt-4 text-muted-foreground leading-relaxed max-w-2xl">
                        Unlike traditional setups where employees switch between multiple
                        applications for different tasks, Workphelo enables teams to work
                        from a single platform with one login, improving productivity and
                        collaboration across departments.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ===================== MODULES ===================== */}
        <section id="modules" className="py-12 sm:py-20 lg:py-28 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn className="max-w-3xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4">
                Core Modules
              </Badge>
              <h2 className="text-2xl sm:text-4xl font-bold text-foreground">
                Everything Your Business Needs, In One Place
              </h2>
              <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground">
                Four powerful modules designed to cover every aspect of your business operations.
              </p>
            </FadeIn>

            <div className="mt-10 sm:mt-16 grid md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {modules.map((mod, i) => {
                const Icon = mod.icon;
                return (
                  <FadeIn key={mod.title} delay={i * 0.1} direction={i % 2 === 0 ? 'left' : 'right'}>
                    <div className="group relative h-full bg-white rounded-2xl border border-border p-5 sm:p-6 lg:p-8 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 hover:-translate-y-1">
                      {/* Gradient bar */}
                      <div
                        className={`absolute top-0 left-6 right-6 h-1 rounded-b-full bg-gradient-to-r ${mod.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                      />
                      <div className="flex items-start gap-4 mb-5">
                        <div
                          className={`shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${mod.color} flex items-center justify-center shadow-lg`}
                        >
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground pt-1.5">
                          {mod.title}
                        </h3>
                      </div>
                      <ul className="space-y-2.5">
                        {mod.features.map((f) => (
                          <li key={f} className="flex items-start gap-2.5">
                            <CheckCircle2
                              className={`shrink-0 h-4 w-4 mt-0.5 ${mod.textColor}`}
                            />
                            <span className="text-sm text-muted-foreground">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===================== EXECUTIVE DASHBOARD ===================== */}
        <section id="dashboard" className="py-12 sm:py-20 lg:py-28 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Image */}
              <FadeIn direction="left" className="order-2 lg:order-1">
                <div className="relative">
                  <div className="absolute -inset-4 bg-blue-400 rounded-3xl blur-2xl opacity-60" />
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border">
                    <Image
                      src="/images/dashboard-preview.png"
                      alt="Executive Dashboard Preview"
                      width={1344}
                      height={768}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </FadeIn>

              {/* Content */}
              <div className="order-1 lg:order-2">
                <FadeIn>
                  <Badge variant="secondary" className="mb-4">
                    Executive Dashboard
                  </Badge>
                </FadeIn>
                <FadeIn delay={0.1}>
                  <h2 className="text-2xl sm:text-4xl font-bold text-foreground leading-tight">
                    Better Decision-Making with Real-Time Visibility
                  </h2>
                  <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
                    One of Workphelo&apos;s biggest advantages is the visibility it provides
                    to management. CEOs, Managing Directors, and Department Heads can access
                    real-time dashboards that provide:
                  </p>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <ul className="mt-8 space-y-3">
                    {dashboardFeatures.map((f, i) => (
                      <motion.li
                        key={f}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.06 }}
                        className="flex items-center gap-3"
                      >
                        <ChevronRight className="shrink-0 h-4 w-4 text-blue-900" />
                        <span className="text-foreground font-medium">{f}</span>
                      </motion.li>
                    ))}
                  </ul>
                </FadeIn>
                <FadeIn delay={0.5}>
                  <p className="mt-6 text-muted-foreground leading-relaxed">
                    This enables faster, data-driven decision-making and greater
                    organizational control.
                  </p>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== BENEFITS ===================== */}
        <section id="benefits" className="py-12 sm:py-20 lg:py-28 bg-blue-950 relative overflow-hidden">
          {/* Decorative */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_center,_rgba(234,88,12,0.06)_0%,_transparent_70%)]" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn className="max-w-3xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4 bg-orange-500/20 text-orange-300 border-orange-500/30">
                Key Benefits
              </Badge>
              <h2 className="text-2xl sm:text-4xl font-bold text-white">
                Reduced Costs. Improved Efficiency.
              </h2>
              <p className="mt-3 sm:mt-4 text-base sm:text-lg text-white/60">
                By replacing multiple standalone applications with a single integrated platform,
                organizations can transform how they work.
              </p>
            </FadeIn>

            <div className="mt-10 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {benefits.map((b, i) => {
                const Icon = b.icon;
                return (
                  <FadeIn key={b.title} delay={i * 0.08}>
                    <div className="group h-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                      <div className="w-11 h-11 rounded-xl bg-orange-500/20 flex items-center justify-center mb-4 group-hover:bg-orange-500/30 transition-colors">
                        <Icon className="h-5 w-5 text-orange-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">{b.title}</h3>
                      <p className="text-sm text-white/60 leading-relaxed">{b.desc}</p>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===================== BUILT FOR AFRICA ===================== */}
        <section id="about" className="py-12 sm:py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <FadeIn>
                <Badge variant="secondary" className="mb-4">
                  <Globe className="mr-1.5 h-3.5 w-3.5" />
                  Built for African Businesses
                </Badge>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="text-2xl sm:text-4xl font-bold text-foreground leading-tight">
                  Enterprise-Grade Capabilities,{' '}
                  <span className="text-orange-600">African-First Design</span>
                </h2>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                  Workphelo is designed with the realities of African businesses in mind,
                  providing enterprise-grade capabilities while remaining affordable,
                  flexible, and easy to deploy.
                </p>
              </FadeIn>

              <FadeIn delay={0.3} className="mt-12">
                <div className="grid sm:grid-cols-3 gap-6">
                  {[
                    { icon: Building2, label: 'Affordable', desc: 'Pricing that works for businesses of every size across Africa' },
                    { icon: Settings, label: 'Flexible', desc: 'Highly customizable to match your specific workflow requirements' },
                    { icon: Zap, label: 'Easy to Deploy', desc: 'Cloud-based with minimal setup time and no complex infrastructure' },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.label}
                        className="rounded-2xl bg-muted/50 border border-border p-6 text-center"
                      >
                        <div className="mx-auto w-14 h-14 rounded-2xl bg-blue-300 flex items-center justify-center mb-4">
                          <Icon className="h-7 w-7 text-blue-900" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">{item.label}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ===================== VALUE PROPOSITION ===================== */}
        <section className="py-10 sm:py-16 lg:py-20 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeIn>
              <div className="relative rounded-2xl sm:rounded-3xl bg-white border border-border p-5 sm:p-12 shadow-lg">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                  <div className="w-10 h-10 rounded-full bg-orange-600 hover:bg-orange-700 flex items-center justify-center shadow-lg shadow-orange-600/30">
                    <Lock className="h-5 w-5 text-white" />
                  </div>
                </div>
                <h2 className="text-xl sm:text-3xl font-bold text-foreground mt-2">
                  Workphelo&apos;s Core Value Proposition
                </h2>
                <div className="mt-4 sm:mt-6 mx-auto max-w-2xl">
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed italic">
                    &ldquo;Workphelo unifies HR, Marketing, Sales, Accounting, Operations,
                    Fleet Management, and Executive Reporting into one intelligent platform,
                    giving organizations a single source of truth, a single login, and a
                    complete view of their business.&rdquo;
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ===================== WAITLIST CTA ===================== */}
        <section id="waitlist-section" className="py-12 sm:py-20 lg:py-28 bg-blue-950 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(234,88,12,0.08)_0%,_transparent_50%)]" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeIn>
              <Badge variant="secondary" className="mb-4 bg-orange-500/20 text-orange-300 border-orange-500/30">
                Early Access
              </Badge>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Be Among the First to Experience Workphelo
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-3 sm:mt-5 text-base sm:text-lg text-white/60 max-w-2xl mx-auto">
                Join our waitlist and get priority access when we launch. Help shape the
                future of business management in Africa.
              </p>
            </FadeIn>
            <FadeIn delay={0.3} className="mt-8 sm:mt-10">
              <WaitlistForm variant="section" />
            </FadeIn>
          </div>
        </section>
      </main>

      {/* ===================== FOOTER ===================== */}
      <footer className="bg-blue-950 text-white/70 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-lg bg-blue-900 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">W</span>
                </div>
                <span className="text-xl font-bold text-white tracking-tight">Workphelo</span>
              </div>
              <p className="text-sm leading-relaxed max-w-xs">
                The all-in-one ERP platform built for African businesses. Unified,
                intelligent, and affordable.
              </p>
            </div>

            {/* Modules */}
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Modules
              </h4>
              <ul className="space-y-1 text-sm">
                <li><button onClick={() => scrollTo('modules')} className="block py-3 hover:text-white transition-colors cursor-pointer">HR Management</button></li>
                <li><button onClick={() => scrollTo('modules')} className="block py-3 hover:text-white transition-colors cursor-pointer">Marketing & BD</button></li>
                <li><button onClick={() => scrollTo('modules')} className="block py-3 hover:text-white transition-colors cursor-pointer">Accounting</button></li>
                <li><button onClick={() => scrollTo('modules')} className="block py-3 hover:text-white transition-colors cursor-pointer">Operations</button></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Company
              </h4>
              <ul className="space-y-1 text-sm">
                <li><button onClick={() => scrollTo('about')} className="block py-3 hover:text-white transition-colors cursor-pointer">About</button></li>
                <li><button onClick={() => scrollTo('benefits')} className="block py-3 hover:text-white transition-colors cursor-pointer">Benefits</button></li>
                <li><button onClick={() => scrollTo('dashboard')} className="block py-3 hover:text-white transition-colors cursor-pointer">Dashboard</button></li>
                <li><button onClick={() => scrollTo('waitlist-section')} className="block py-3 hover:text-white transition-colors cursor-pointer">Waitlist</button></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Powered By
              </h4>
              <p className="text-sm leading-relaxed">
                <span className="text-white font-semibold">Datrix Tech Solutions</span>
                <br />
                Enterprise software for the African market.
              </p>
              <div className="mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => scrollTo('waitlist-section')}
                  className="border-orange-500/40 text-orange-300 hover:bg-orange-500/15 hover:text-orange-200 hover:border-orange-500/60 min-h-[44px] cursor-pointer"
                >
                  Join Waitlist
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>

          <Separator className="my-8 bg-white/10" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
            <p>&copy; {new Date().getFullYear()} Datrix Tech Solutions. All rights reserved.</p>
            <p>Workphelo ERP — Built for Africa, Ready for the World.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}