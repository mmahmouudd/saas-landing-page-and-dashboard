import { useState } from 'react';
import { DashboardMockup } from './components/DashboardMockup';
import { FeaturesSection } from './components/FeaturesSection';
import { PricingSection } from './components/PricingSection';
import { DemoModal } from './components/DemoModal';
import { TESTIMONIALS, TRUSTED_COMPANIES, COMPLIANCE_DATA } from './data/mockData';

export function App() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [demoPlan, setDemoPlan] = useState<string | undefined>();
  const [mobileNav, setMobileNav] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const openDemo = (plan?: string) => {
    setDemoPlan(plan);
    setDemoOpen(true);
  };

  const faqs = [
    { q: "How does VortexSec access our environments safely?", a: "100% read-only zero-trust. You attach our CloudFormation/Terraform module with strictly scoped Describe, Get, and List IAM permissions. We never modify data or networking unless you trigger an explicit remediation playbook." },
    { q: "What makes DSPM scanning 'zero-egress'?", a: "Legacy tools mirror petabytes of S3 buckets to external collectors. VortexSec runs ephemeral scanners inside your VPC, classifying data locally and returning only cryptographic metadata hashes." },
    { q: "Can we run air-gapped or FedRAMP High?", a: "Yes. Self-hosted air-gapped Helm charts for Kubernetes, plus GovCloud (US-East & US-West) isolated instances with BYOK KMS encryption for defense and healthcare mandates." },
    { q: "How long does multi-account deployment take?", a: "Under 12 minutes across 100+ accounts via AWS Organizations SCP integration. Attack graph fully populated within your first hour." }
  ];

  return (
    <div className="min-h-screen bg-[var(--clr-bg)] text-[var(--clr-text)] grain selection:bg-[var(--clr-accent)] selection:text-[var(--clr-bg)]">

      {/* Top Ticker */}
      <div className="bg-[var(--clr-surface)] border-b border-[var(--clr-border)] py-1.5 px-4 overflow-hidden">
        <div className="flex items-center justify-center gap-6 text-[10px] font-mono text-[var(--clr-text-muted)]">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
            <span className="text-[var(--clr-accent)] font-bold">CVE-2025 Engine Live:</span>
            eBPF Zero-Day Interceptor across AWS EKS & GKE
          </span>
          <button onClick={() => openDemo()} className="underline text-[var(--clr-accent)] cursor-pointer hover:text-white hidden sm:inline">
            view defense →
          </button>
        </div>
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-40 bg-[var(--clr-bg)]/95 backdrop-blur-sm border-b border-[var(--clr-border)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5">
            <div className="w-8 h-8 border-2 border-[var(--clr-accent)] flex items-center justify-center bg-[var(--clr-surface)]">
              <span className="text-[var(--clr-accent)] font-mono font-extrabold text-sm">V</span>
            </div>
            <div>
              <div className="font-[var(--font-heading)] font-extrabold text-sm tracking-tight">
                VORTEX<span className="text-[var(--clr-accent)]">SEC</span>
              </div>
              <div className="text-[8px] font-mono text-[var(--clr-text-muted)] tracking-widest uppercase -mt-0.5">
                autonomous cloud defense
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-[11px] font-bold uppercase tracking-wider text-[var(--clr-text-muted)]">
            <a href="#dashboard-section" className="hover:text-[var(--clr-accent)] transition-colors">Console</a>
            <a href="#features" className="hover:text-[var(--clr-accent)] transition-colors">Architecture</a>
            <a href="#compliance" className="hover:text-[var(--clr-accent)] transition-colors">Compliance</a>
            <a href="#pricing" className="hover:text-[var(--clr-accent)] transition-colors">Pricing</a>
            <a href="#testimonials" className="hover:text-[var(--clr-accent)] transition-colors">Customers</a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => openDemo()}
              className="px-4 py-2 bg-[var(--clr-accent)] text-[var(--clr-bg)] text-[11px] font-bold uppercase tracking-wider cursor-pointer hover:brightness-110 transition-all"
            >
              Deploy POC
            </button>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMobileNav(!mobileNav)} className="md:hidden text-[var(--clr-text-muted)] p-2 cursor-pointer">
            {mobileNav ? '✕' : '☰'}
          </button>
        </div>

        {mobileNav && (
          <div className="md:hidden bg-[var(--clr-surface)] border-b border-[var(--clr-border)] px-4 py-4 space-y-3 text-sm">
            {['dashboard-section', 'features', 'compliance', 'pricing', 'testimonials'].map(s => (
              <a key={s} href={`#${s}`} onClick={() => setMobileNav(false)} className="block text-[var(--clr-text-muted)] hover:text-[var(--clr-accent)] capitalize">
                {s.replace('-section', '').replace('-', ' ')}
              </a>
            ))}
            <button onClick={() => { setMobileNav(false); openDemo(); }} className="w-full py-2.5 bg-[var(--clr-accent)] text-[var(--clr-bg)] font-bold text-[11px] uppercase cursor-pointer">
              Deploy Free POC
            </button>
          </div>
        )}
      </header>

      {/* =================== HERO =================== */}
      <section className="relative pt-10 pb-16 sm:pt-16 sm:pb-24 grid-brutal overflow-hidden">
        
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[var(--clr-accent)]/8 blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          
          {/* Hero Text */}
          <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-[var(--clr-accent)]/40 bg-[var(--clr-surface)] text-[10px] font-mono text-[var(--clr-accent)] mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--clr-accent)] animate-pulse" />
              NEXT-GEN AUTONOMOUS CLOUD DEFENSE
              <span className="text-[var(--clr-text-muted)]">·</span>
              <span className="text-[var(--clr-text-muted)]">AWS / GCP / Azure / K8s</span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-[var(--font-heading)] font-extrabold tracking-tight leading-[1.08] mb-5">
              Autonomous Cloud Security{' '}
              <br className="hidden sm:block" />
              <span className="marker-highlight glitch-hover">
                With Sub-Second Auto-Defense
              </span>
            </h1>

            <p className="text-sm sm:text-lg text-[var(--clr-text-muted)] max-w-2xl mx-auto leading-relaxed mb-7">
              Eliminate lethal multi-cloud attack paths, secure petabytes of PII with zero egress fees, and intercept zero-day container exploits at the kernel.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
              <button
                onClick={() => openDemo('Hero CTA')}
                className="w-full sm:w-auto px-7 py-3.5 bg-[var(--clr-accent)] text-[var(--clr-bg)] font-[var(--font-heading)] font-extrabold text-sm uppercase tracking-wider cursor-pointer hover:brightness-110 transition-all shadow-[4px_4px_0_0_rgba(217,119,6,0.4)] hover:shadow-[6px_6px_0_0_rgba(217,119,6,0.5)] hover:-translate-x-[1px] hover:-translate-y-[1px]"
              >
                Deploy 14-Day Free POC →
              </button>
              <a
                href="#dashboard-section"
                className="w-full sm:w-auto px-6 py-3.5 border-2 border-[var(--clr-border)] text-[var(--clr-text)] font-bold text-sm flex items-center justify-center gap-2 hover:border-[var(--clr-accent)] transition-colors"
              >
                <span className="text-[var(--clr-accent)]">▶</span>
                Interact with Live Console
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-5 text-[10px] text-[var(--clr-text-muted)] font-mono">
              <span className="flex items-center gap-1">✓ No Credit Card</span>
              <span className="flex items-center gap-1">✓ 3-Min ReadOnly Deploy</span>
              <span className="flex items-center gap-1">✓ SOC 2 & FedRAMP Ready</span>
            </div>
          </div>

          {/* Dashboard Mockup */}
          <div id="dashboard-section" className="relative">
            <div className="absolute -inset-0.5 border-2 border-[var(--clr-accent)]/20 pointer-events-none" />
            <DashboardMockup className="relative" />
            <div className="hidden lg:flex items-center justify-between mt-2 px-3 py-1.5 bg-[var(--clr-surface)] border border-[var(--clr-border)] text-[10px] font-mono text-[var(--clr-text-muted)]">
              <span>
                <span className="text-[var(--clr-accent)] font-bold">TIP:</span> Click <span className="text-[var(--clr-text)]">"simulate breach"</span> to see autonomous threat quarantine in &lt;140ms
              </span>
              <span>zero host CPU overhead</span>
            </div>
          </div>
        </div>
      </section>

      {/* =================== TRUSTED LOGOS =================== */}
      <section className="py-8 border-y border-[var(--clr-border)] bg-[var(--clr-surface)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center text-[10px] font-mono uppercase tracking-widest text-[var(--clr-text-muted)] mb-4">
            Trusted by teams managing 250,000+ cloud workloads
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
            {TRUSTED_COMPANIES.map((name, i) => (
              <div key={i} className="px-3 py-1.5 border border-[var(--clr-border)] text-[12px] font-mono font-extrabold tracking-widest text-[var(--clr-text-muted)] hover:text-[var(--clr-text)] hover:border-[var(--clr-accent)]/40 transition-colors">
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================== FEATURES =================== */}
      <FeaturesSection />

      {/* =================== DSPM DEEP DIVE =================== */}
      <section className="py-16 sm:py-24 border-t-2 border-[var(--clr-border)] bg-[var(--clr-surface)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            
            {/* Left */}
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-lime-400 font-mono font-bold mb-3">
                // zero-egress engine
              </div>
              <h2 className="text-2xl sm:text-4xl font-[var(--font-heading)] font-extrabold tracking-tight leading-[1.1] mb-4">
                Inspect Petabytes of PII <br />
                <span className="marker-highlight">Without Moving a Byte</span>
              </h2>
              <p className="text-sm text-[var(--clr-text-muted)] leading-relaxed mb-6">
                Legacy DSPM forces massive egress bills to transmit raw data to third-party servers. VortexSec scans locally inside your VPC.
              </p>

              <div className="space-y-4 mb-6">
                {[
                  { title: "In-VPC Scanning Workers", desc: "Ephemeral containers spin up, scan, and self-terminate.", icon: "◈" },
                  { title: "Zero Bandwidth Surcharges", desc: "Save $40K–$180K/yr on S3 & GCP cross-region transfer fees.", icon: "◈" },
                  { title: "AI Classification Engine", desc: "Auto-identifies HIPAA ePHI, GDPR data, API keys, JWT secrets.", icon: "◈" }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-[var(--clr-accent)] mt-0.5 text-sm">{item.icon}</span>
                    <div>
                      <div className="text-sm font-bold text-[var(--clr-text)]">{item.title}</div>
                      <div className="text-[11px] text-[var(--clr-text-muted)]">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => openDemo('DSPM Blueprint')}
                className="px-5 py-2.5 bg-lime-500 text-[var(--clr-bg)] font-bold text-[11px] uppercase tracking-wider cursor-pointer hover:brightness-110"
              >
                Request Architecture Blueprint
              </button>
            </div>

            {/* Right — Comparison */}
            <div className="border-2 border-[var(--clr-border)] bg-[var(--clr-bg)] p-5 space-y-4">
              <div className="text-[10px] uppercase tracking-widest text-[var(--clr-text-muted)] font-mono font-bold mb-1">
                Cost Comparison Matrix
              </div>
              
              {/* Legacy */}
              <div className="p-4 border-2 border-red-500/40 bg-red-950/20">
                <div className="flex items-center justify-between text-[11px] font-bold text-red-400 mb-1">
                  <span>Legacy DSPM Vendor</span>
                  <span className="font-mono">~$72,400/yr</span>
                </div>
                <div className="text-[10px] text-[var(--clr-text-muted)] mb-2">Transfers raw data via public gateways.</div>
                <div className="w-full bg-[var(--clr-bg)] h-1.5">
                  <div className="bg-red-500 h-1.5 w-[85%]" />
                </div>
                <div className="flex justify-between text-[9px] text-red-400 font-mono mt-1">
                  <span>Risk: HIGH</span>
                  <span>$0.09/GB egress</span>
                </div>
              </div>

              {/* VortexSec */}
              <div className="p-4 border-2 border-[var(--clr-accent)] bg-[var(--clr-surface)]">
                <div className="flex items-center justify-between text-[11px] font-bold text-[var(--clr-accent)] mb-1">
                  <span>VortexSec Zero-Egress</span>
                  <span className="font-mono text-lime-400">$0.00 egress</span>
                </div>
                <div className="text-[10px] text-[var(--clr-text-muted)] mb-2">100% in-enclave computation. 2KB hashes only.</div>
                <div className="w-full bg-[var(--clr-bg)] h-1.5">
                  <div className="bg-lime-400 h-1.5 w-[10%]" />
                </div>
                <div className="flex justify-between text-[9px] text-lime-400 font-mono mt-1">
                  <span>Risk: ZERO</span>
                  <span>$0.00 bandwidth</span>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 border border-[var(--clr-border)]">
                  <div className="text-[9px] text-[var(--clr-text-muted)] font-mono">Classified Objects</div>
                  <div className="text-lg font-[var(--font-heading)] font-bold mt-1">1.82B</div>
                </div>
                <div className="p-3 border border-[var(--clr-border)]">
                  <div className="text-[9px] text-[var(--clr-text-muted)] font-mono">Scan Throughput</div>
                  <div className="text-lg font-[var(--font-heading)] font-bold text-[var(--clr-accent)] mt-1">4.2 GB/s</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================== COMPLIANCE =================== */}
      <section id="compliance" className="py-16 sm:py-24 border-t-2 border-[var(--clr-border)] bg-[var(--clr-bg)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-12 max-w-3xl">
            <div className="text-[10px] uppercase tracking-[0.3em] text-purple-400 font-mono font-bold mb-3">
              // compliance
            </div>
            <h2 className="text-3xl sm:text-5xl font-[var(--font-heading)] font-extrabold tracking-tight leading-[1.05] mb-4">
              Pass Audits on the First Attempt. <br />
              <span className="marker-highlight">Zero Scavenger Hunts.</span>
            </h2>
            <p className="text-sm text-[var(--clr-text-muted)]">
              Cryptographic compliance proof collected 24/7/365, auto-syncing with Vanta, Drata, and Secureframe.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {COMPLIANCE_DATA.map((comp, i) => (
              <div key={i} className="p-5 border border-[var(--clr-border)] hover:border-[var(--clr-accent)]/40 transition-colors bg-[var(--clr-surface)]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold">{comp.name}</span>
                  <span className="text-[11px] font-mono font-bold text-lime-400">{comp.score}%</span>
                </div>
                <div className="text-[10px] font-mono text-[var(--clr-text-muted)] mb-2">{comp.checks} controls</div>
                <div className="w-full bg-[var(--clr-bg)] h-1 mb-2">
                  <div className="bg-lime-400 h-1" style={{ width: `${comp.score}%` }} />
                </div>
                <div className="flex items-center justify-between text-[9px] pt-2 border-t border-[var(--clr-border)]">
                  <span className="text-lime-400 font-bold uppercase">● Audit Ready</span>
                  <span className="text-[var(--clr-accent)] font-mono cursor-pointer hover:underline">export proof →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================== PRICING =================== */}
      <PricingSection onSelectPlan={name => openDemo(name)} />

      {/* =================== TESTIMONIALS =================== */}
      <section id="testimonials" className="py-16 sm:py-24 border-t-2 border-[var(--clr-border)] bg-[var(--clr-surface)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--clr-accent)] font-mono font-bold mb-3">
              // customers
            </div>
            <h2 className="text-2xl sm:text-4xl font-[var(--font-heading)] font-extrabold tracking-tight">
              Real Security Leaders. <span className="marker-highlight">Real Results.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="p-5 sm:p-6 border border-[var(--clr-border)] hover:border-[var(--clr-accent)]/40 transition-colors bg-[var(--clr-bg)] flex flex-col justify-between">
                <div>
                  {/* Stars */}
                  <div className="flex gap-0.5 text-[var(--clr-accent)] text-sm mb-3">
                    {'★★★★★'}
                  </div>
                  <p className="text-[12px] text-[var(--clr-text-muted)] leading-relaxed mb-5 italic">
                    "{t.quote}"
                  </p>
                </div>
                <div>
                  <div className="inline-block px-2 py-0.5 bg-[var(--clr-accent)]/10 border border-[var(--clr-accent)]/30 text-[10px] font-mono font-bold text-[var(--clr-accent)] mb-3">
                    {t.metric}
                  </div>
                  <div className="pt-3 border-t border-[var(--clr-border)]">
                    <div className="text-[11px] font-bold">{t.author}</div>
                    <div className="text-[10px] text-[var(--clr-text-muted)]">{t.role}</div>
                    <div className="text-[10px] font-mono text-[var(--clr-accent)]">{t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================== FAQ =================== */}
      <section className="py-16 sm:py-24 border-t-2 border-[var(--clr-border)] bg-[var(--clr-bg)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--clr-accent)] font-mono font-bold mb-3">
              // faq
            </div>
            <h2 className="text-2xl sm:text-4xl font-[var(--font-heading)] font-extrabold tracking-tight">
              Architecture Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-[var(--clr-border)] bg-[var(--clr-surface)]">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-4 text-left flex items-center justify-between text-sm font-bold cursor-pointer hover:text-[var(--clr-accent)] transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className="text-[var(--clr-accent)] ml-3 text-lg">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 text-[12px] text-[var(--clr-text-muted)] leading-relaxed border-t border-[var(--clr-border)] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================== FINAL CTA =================== */}
      <section className="py-16 sm:py-24 border-t-2 border-[var(--clr-border)] bg-[var(--clr-surface)] relative grid-brutal">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--clr-accent)] font-mono font-bold mb-4">
            // immediate discovery
          </div>
          <h2 className="text-3xl sm:text-5xl font-[var(--font-heading)] font-extrabold tracking-tight leading-[1.1] mb-4">
            See Your Lethal Attack Paths <br />
            in the Next <span className="marker-highlight">30 Minutes</span>
          </h2>
          <p className="text-sm text-[var(--clr-text-muted)] max-w-xl mx-auto mb-8">
            Deploy via CloudFormation or Terraform in 3 minutes. Zero agents, zero impact, immediate risk prioritisation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <button
              onClick={() => openDemo('Final CTA')}
              className="w-full sm:w-auto px-7 py-3.5 bg-[var(--clr-accent)] text-[var(--clr-bg)] font-[var(--font-heading)] font-extrabold text-sm uppercase tracking-wider cursor-pointer hover:brightness-110 shadow-[4px_4px_0_0_rgba(217,119,6,0.4)]"
            >
              Deploy Free POC →
            </button>
            <a
              href="#dashboard-section"
              className="w-full sm:w-auto px-6 py-3.5 border-2 border-[var(--clr-border)] text-[var(--clr-text)] font-bold text-sm text-center hover:border-[var(--clr-accent)] transition-colors"
            >
              Explore Telemetry
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-5 text-[10px] font-mono text-[var(--clr-text-muted)]">
            <span>✓ No Credit Card</span>
            <span>✓ 100% Read-Only IAM</span>
            <span>✓ 1-Click Rollback</span>
          </div>
        </div>
      </section>

      {/* =================== FOOTER =================== */}
      <footer className="py-10 border-t-2 border-[var(--clr-border)] bg-[var(--clr-bg)] text-[11px] text-[var(--clr-text-muted)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
            
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 border-2 border-[var(--clr-accent)] flex items-center justify-center">
                  <span className="text-[var(--clr-accent)] font-mono font-extrabold text-xs">V</span>
                </div>
                <span className="font-[var(--font-heading)] font-extrabold text-sm">VORTEX<span className="text-[var(--clr-accent)]">SEC</span></span>
              </div>
              <p className="text-[10px] text-[var(--clr-text-muted)] max-w-xs mb-3">
                Autonomous cloud security, zero-egress DSPM, and eBPF runtime defense for multi-cloud enterprise.
              </p>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-lime-400">
                <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
                All Nodes Operational (99.99%)
              </div>
            </div>

            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--clr-text)] mb-3">Product</div>
              <ul className="space-y-1.5">
                <li><a href="#features" className="hover:text-[var(--clr-accent)]">Zero-Egress DSPM</a></li>
                <li><a href="#features" className="hover:text-[var(--clr-accent)]">Attack Graph</a></li>
                <li><a href="#features" className="hover:text-[var(--clr-accent)]">eBPF Runtime</a></li>
                <li><a href="#features" className="hover:text-[var(--clr-accent)]">IaC Guardrails</a></li>
              </ul>
            </div>

            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--clr-text)] mb-3">Compliance</div>
              <ul className="space-y-1.5">
                <li><a href="#compliance" className="hover:text-[var(--clr-accent)]">SOC 2</a></li>
                <li><a href="#compliance" className="hover:text-[var(--clr-accent)]">ISO 27001</a></li>
                <li><a href="#compliance" className="hover:text-[var(--clr-accent)]">HIPAA</a></li>
                <li><a href="#compliance" className="hover:text-[var(--clr-accent)]">FedRAMP</a></li>
              </ul>
            </div>

            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--clr-text)] mb-3">Company</div>
              <ul className="space-y-1.5">
                <li><a href="#pricing" className="hover:text-[var(--clr-accent)]">Pricing</a></li>
                <li><a href="#testimonials" className="hover:text-[var(--clr-accent)]">Case Studies</a></li>
                <li><a href="#pricing" className="hover:text-[var(--clr-accent)]">Whitepaper</a></li>
                <li><a href="#pricing" className="hover:text-[var(--clr-accent)]">Trust Center</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-[var(--clr-border)] flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[10px]">
            <span>© 2025 VortexSec Inc. All rights reserved.</span>
            <div className="flex gap-5">
              <span className="hover:text-[var(--clr-text)] cursor-pointer">Privacy</span>
              <span className="hover:text-[var(--clr-text)] cursor-pointer">Terms</span>
              <span className="hover:text-[var(--clr-text)] cursor-pointer">Security</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal */}
      <DemoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} defaultPlan={demoPlan} />
    </div>
  );
}

export default App;
