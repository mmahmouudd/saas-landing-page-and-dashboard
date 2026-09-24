import { useState } from 'react';
import confetti from 'canvas-confetti';

export function DemoModal({ isOpen, onClose, defaultPlan }: { isOpen: boolean; onClose: () => void; defaultPlan?: string }) {
  const [step, setStep] = useState<'form' | 'done'>('form');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setStep('done');
      try { confetti({ particleCount: 60, spread: 55, origin: { y: 0.6 } }); } catch {}
    }, 900);
  };

  const close = () => {
    setStep('form');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85">
      <div className="relative w-full max-w-lg border-2 border-[var(--clr-accent)] bg-[var(--clr-surface)] p-5 sm:p-7">
        
        <button onClick={close} className="absolute top-4 right-4 text-[var(--clr-text-muted)] hover:text-white cursor-pointer text-sm">
          ✕
        </button>

        {step === 'form' ? (
          <>
            <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--clr-accent)] font-mono font-bold mb-2">
              // deploy poc
            </div>
            <h3 className="text-xl font-[var(--font-heading)] font-bold mb-1">
              Connect Your Sandbox
            </h3>
            <p className="text-[11px] text-[var(--clr-text-muted)] mb-5">
              {defaultPlan ? `Configuring: ${defaultPlan}. ` : ''}
              ReadOnly IAM setup in 3 min. No credit card.
            </p>

            <form onSubmit={submit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[var(--clr-text-muted)] mb-1 font-bold">Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="alex@company.io"
                    className="w-full px-3 py-2 bg-[var(--clr-bg)] border border-[var(--clr-border)] text-xs text-white placeholder:text-[var(--clr-text-muted)]/50 focus:outline-none focus:border-[var(--clr-accent)] font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[var(--clr-text-muted)] mb-1 font-bold">Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Alex Rivera"
                    className="w-full px-3 py-2 bg-[var(--clr-bg)] border border-[var(--clr-border)] text-xs text-white placeholder:text-[var(--clr-text-muted)]/50 focus:outline-none focus:border-[var(--clr-accent)] font-mono"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[var(--clr-text-muted)] mb-1 font-bold">Company *</label>
                <input
                  type="text"
                  required
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  placeholder="Acme Cloud Corp"
                  className="w-full px-3 py-2 bg-[var(--clr-bg)] border border-[var(--clr-border)] text-xs text-white placeholder:text-[var(--clr-text-muted)]/50 focus:outline-none focus:border-[var(--clr-accent)] font-mono"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-[var(--clr-accent)] text-[var(--clr-bg)] font-bold text-[11px] uppercase tracking-wider cursor-pointer hover:brightness-110 transition-all disabled:opacity-50"
              >
                {submitting ? '▶ Provisioning Sandbox...' : '▶ Generate Instant POC'}
              </button>

              <div className="text-center text-[10px] text-[var(--clr-text-muted)] font-mono">
                3-min activation · SOC 2 certified · 100% read-only
              </div>
            </form>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="text-3xl mb-3">✓</div>
            <h3 className="text-lg font-[var(--font-heading)] font-bold mb-2">POC Sandbox Initialized</h3>
            <p className="text-[11px] text-[var(--clr-text-muted)] mb-4">
              CloudFormation link sent to <span className="text-[var(--clr-accent)] font-mono font-bold">{email}</span>
            </p>
            <div className="bg-[var(--clr-bg)] border border-[var(--clr-border)] p-3 text-left font-mono text-[10px] text-[var(--clr-text-muted)] space-y-1 mb-4">
              <div className="text-[var(--clr-accent)]">$ aws cloudformation create-stack \</div>
              <div>&nbsp;&nbsp;--stack-name VortexSec-POC \</div>
              <div>&nbsp;&nbsp;--template-url https://vortexsec.cloud/cfn/v3.json</div>
              <div className="text-lime-400 mt-1">{'>'} ReadOnly granted. Scanning...</div>
            </div>
            <button onClick={close} className="px-6 py-2 bg-[var(--clr-accent)] text-[var(--clr-bg)] font-bold text-[11px] uppercase cursor-pointer">
              Access Mission Control
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
