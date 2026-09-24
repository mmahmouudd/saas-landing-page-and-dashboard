import { useState } from 'react';
import { FEATURES_DATA } from '../data/mockData';

export function FeaturesSection() {
  const [active, setActive] = useState(FEATURES_DATA[0].id);

  return (
    <section id="features" className="py-16 sm:py-24 border-t-2 border-[var(--clr-border)] bg-[var(--clr-bg)] relative grid-brutal">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header — Brutalist Editorial */}
        <div className="mb-12 sm:mb-16 max-w-3xl">
          <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--clr-accent)] font-mono font-bold mb-3">
            // architecture
          </div>
          <h2 className="text-3xl sm:text-5xl font-[var(--font-heading)] font-extrabold tracking-tight leading-[1.05] mb-4">
            Replace 6 Fragmented <br />
            Security Tools With{' '}
            <span className="marker-highlight">One Engine</span>
          </h2>
          <p className="text-sm sm:text-base text-[var(--clr-text-muted)] leading-relaxed">
            Legacy scanners bury engineering in 10,000 false-positive alerts. VortexSec calculates lethal multi-cloud attack chains and neutralises threats before exploitation.
          </p>
        </div>

        {/* Cards Grid — Brutalist style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {FEATURES_DATA.map((feat) => {
            const isActive = active === feat.id;
            return (
              <div
                key={feat.id}
                onMouseEnter={() => setActive(feat.id)}
                className={`p-5 sm:p-6 transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'border-2 border-[var(--clr-accent)] bg-[var(--clr-surface)] shadow-[6px_6px_0_0_rgba(217,119,6,0.25)] -translate-x-[2px] -translate-y-[2px]'
                    : 'border border-[var(--clr-border)] bg-[var(--clr-surface)] hover:border-[var(--clr-accent)]/40'
                }`}
              >
                {/* Tag */}
                <div className="text-[9px] uppercase tracking-[0.2em] text-[var(--clr-accent)] font-mono font-bold mb-3">
                  [{feat.tag}]
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-[var(--font-heading)] font-bold mb-2 leading-tight">
                  {feat.title}
                </h3>

                {/* Stat Badge */}
                <div className="inline-block text-[10px] font-mono font-bold text-lime-400 bg-lime-500/10 border border-lime-500/30 px-2 py-0.5 mb-3">
                  {feat.stat}
                </div>

                {/* Description */}
                <p className="text-[12px] text-[var(--clr-text-muted)] leading-relaxed mb-4">
                  {feat.description}
                </p>

                {/* Points */}
                <ul className="space-y-1.5 text-[11px] text-[var(--clr-text-muted)]">
                  {feat.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[var(--clr-accent)] mt-0.5 flex-shrink-0">▸</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                {/* Bottom bar */}
                <div className="mt-4 pt-3 border-t border-[var(--clr-border)] flex items-center justify-between text-[10px]">
                  <span className="font-mono text-[var(--clr-text-muted)]">0{FEATURES_DATA.indexOf(feat) + 1}/06</span>
                  <span className={`font-bold uppercase tracking-wider ${isActive ? 'text-[var(--clr-accent)]' : 'text-[var(--clr-text-muted)]'}`}>
                    explore →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
