import { useState } from 'react';
import { PRICING_TIERS } from '../data/mockData';
import confetti from 'canvas-confetti';

export function PricingSection({ onSelectPlan }: { onSelectPlan?: (name: string) => void }) {
  const [cycle, setCycle] = useState<'monthly' | 'annual'>('annual');
  const [selected, setSelected] = useState<string | null>(null);

  const choose = (name: string) => {
    setSelected(name);
    try { confetti({ particleCount: 50, spread: 55, origin: { y: 0.8 } }); } catch {}
    onSelectPlan?.(name);
  };

  return (
    <section id="pricing" className="py-16 sm:py-24 border-t-2 border-[var(--clr-border)] bg-[var(--clr-bg)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="mb-12 max-w-3xl">
          <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--clr-accent)] font-mono font-bold mb-3">
            // pricing
          </div>
          <h2 className="text-3xl sm:text-5xl font-[var(--font-heading)] font-extrabold tracking-tight leading-[1.05] mb-4">
            Predictable Costs. <br />
            <span className="marker-highlight">Zero Egress Surcharges.</span>
          </h2>
          <p className="text-sm text-[var(--clr-text-muted)]">
            Deploy in 5 minutes via ReadOnly CloudFormation. 14-day full POC with proof-of-value report.
          </p>

          {/* Toggle */}
          <div className="mt-6 inline-flex border-2 border-[var(--clr-border)]">
            <button
              onClick={() => setCycle('monthly')}
              className={`px-4 py-2 text-[11px] font-bold uppercase tracking-wider cursor-pointer transition-colors ${
                cycle === 'monthly' ? 'bg-[var(--clr-accent)] text-[var(--clr-bg)]' : 'text-[var(--clr-text-muted)]'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setCycle('annual')}
              className={`px-4 py-2 text-[11px] font-bold uppercase tracking-wider cursor-pointer transition-colors flex items-center gap-1.5 ${
                cycle === 'annual' ? 'bg-[var(--clr-accent)] text-[var(--clr-bg)]' : 'text-[var(--clr-text-muted)]'
              }`}
            >
              Annual
              <span className="text-[9px] bg-lime-400 text-[var(--clr-bg)] px-1 py-0.5 font-extrabold">-20%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {PRICING_TIERS.map((tier) => {
            const price = cycle === 'annual' ? tier.priceAnnual : tier.priceMonthly;
            
            return (
              <div
                key={tier.id}
                className={`flex flex-col justify-between p-6 transition-all ${
                  tier.popular
                    ? 'border-2 border-[var(--clr-accent)] bg-[var(--clr-surface)] shadow-[6px_6px_0_0_rgba(217,119,6,0.2)] relative'
                    : 'border border-[var(--clr-border)] bg-[var(--clr-surface)]'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-6 px-3 py-0.5 bg-[var(--clr-accent)] text-[var(--clr-bg)] text-[10px] font-bold uppercase tracking-wider">
                    Most Popular
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-[var(--font-heading)] font-bold mb-1">{tier.name}</h3>
                  <p className="text-[11px] text-[var(--clr-text-muted)] mb-5">{tier.tagline}</p>

                  {/* Price */}
                  <div className="mb-5 pb-5 border-b border-[var(--clr-border)]">
                    {price !== null ? (
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-[var(--font-heading)] font-extrabold">${price}</span>
                        <span className="text-[11px] text-[var(--clr-text-muted)]">/mo</span>
                        {cycle === 'annual' && <span className="text-[10px] text-lime-400 font-mono ml-2">billed annually</span>}
                      </div>
                    ) : (
                      <div className="text-3xl font-[var(--font-heading)] font-extrabold">Custom</div>
                    )}
                    <div className="text-[10px] font-mono text-[var(--clr-accent)] mt-2">
                      {tier.limits}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    <div className="text-[9px] uppercase tracking-widest text-[var(--clr-text-muted)] font-bold mb-2">
                      Included:
                    </div>
                    {tier.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-[11px] text-[var(--clr-text-muted)]">
                        <span className="text-lime-400 mt-0.5 flex-shrink-0">▸</span>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={() => choose(tier.name)}
                  className={`w-full py-3 text-[11px] font-bold uppercase tracking-wider cursor-pointer transition-all ${
                    tier.popular
                      ? 'bg-[var(--clr-accent)] text-[var(--clr-bg)] hover:brightness-110'
                      : 'border-2 border-[var(--clr-border)] text-[var(--clr-text)] hover:border-[var(--clr-accent)]'
                  }`}
                >
                  {tier.cta}
                </button>
              </div>
            );
          })}
        </div>

        {/* Enterprise Banner */}
        <div className="mt-12 p-5 sm:p-6 border-2 border-[var(--clr-border)] bg-[var(--clr-surface)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="text-sm font-[var(--font-heading)] font-bold mb-1">
              Need FedRAMP High, Air-Gapped, or Custom SLA?
            </div>
            <p className="text-[11px] text-[var(--clr-text-muted)]">
              GovCloud enclaves, BYOK encryption, and Vendor Risk Assessment packages (SIG Core, SOC 2, CAIQ).
            </p>
          </div>
          <button 
            onClick={() => choose("Enterprise Briefing")}
            className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-[11px] uppercase tracking-wider cursor-pointer whitespace-nowrap"
          >
            Talk to Architect
          </button>
        </div>

        {selected && (
          <div className="mt-4 p-3 border border-lime-500/40 bg-lime-500/10 text-lime-300 text-[11px] font-mono text-center">
            ✓ Selected: <strong className="text-white">{selected}</strong> — sandbox provisioning starting...
          </div>
        )}

      </div>
    </section>
  );
}
