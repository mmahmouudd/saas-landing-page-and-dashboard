import { useState, useEffect } from 'react';
import { MOCK_THREAT_FEED, ThreatEvent } from '../data/mockData';

export function DashboardMockup({ className = "" }: { className?: string }) {
  const [threats, setThreats] = useState<ThreatEvent[]>(MOCK_THREAT_FEED);
  const [selected, setSelected] = useState<ThreatEvent>(MOCK_THREAT_FEED[0]);
  const [activeTab, setActiveTab] = useState<'control' | 'threats' | 'compliance'>('control');
  const [count, setCount] = useState(1429);
  const [filterCloud, setFilterCloud] = useState<string>('ALL');
  const [showSim, setShowSim] = useState(false);
  const [simLog, setSimLog] = useState<string[]>([]);
  const [simRunning, setSimRunning] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setCount(c => c + 1), 5000);
    return () => clearInterval(t);
  }, []);

  const runSim = () => {
    setSimRunning(true);
    setSimLog(["[00:00.01] injecting synthetic probe from 185.220.101.5..."]);
    setTimeout(() => setSimLog(p => [...p, "[00:00.32] STS credential theft attempt on arn:aws:iam::prod"]), 400);
    setTimeout(() => setSimLog(p => [...p, "[00:00.78] behavioral deviation detected — score: 0.98 lethal"]), 800);
    setTimeout(() => {
      setSimLog(p => [...p, "[00:01.12] autonomous: STS token revoked + inline deny-all", "[00:01.35] attack path collapsed. blast radius: 0 resources."]);
      setSimRunning(false);
      const ev: ThreatEvent = {
        id: `THR-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: new Date().toLocaleTimeString(),
        type: "Simulated IAM Escalation",
        severity: "critical",
        source: "Red-Team Injector",
        target: "AWS prod-vault",
        cloud: "AWS",
        status: "auto-remediated",
        vector: "Simulated credential drift",
        timeAgo: "now"
      };
      setThreats(p => [ev, ...p]);
      setSelected(ev);
      setCount(c => c + 1);
    }, 1300);
  };

  const filtered = filterCloud === 'ALL' ? threats : threats.filter(t => t.cloud === filterCloud);
  const sevColor = (s: string) => s === 'critical' ? 'text-red-400 bg-red-500/10' : s === 'high' ? 'text-amber-400 bg-amber-500/10' : 'text-sky-400 bg-sky-500/10';
  const cloudColor = (c: string) => c === 'AWS' ? 'text-amber-300 bg-amber-500/10' : c === 'GCP' ? 'text-blue-300 bg-blue-500/10' : c === 'Azure' ? 'text-sky-300 bg-sky-500/10' : 'text-purple-300 bg-purple-500/10';

  return (
    <div className={`rounded-none border-2 border-[var(--clr-border)] bg-[var(--clr-surface)] relative overflow-hidden font-[var(--font-mono)] ${className}`}>
      
      {/* Terminal Title Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[var(--clr-border)] bg-[var(--clr-bg)] px-3 py-2 text-[10px] sm:text-[11px]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-lime-500/80" />
          <span className="ml-2 text-[var(--clr-text-muted)] font-mono">
            vortex-agent@us-east-1 <span className="text-[var(--clr-accent)]">~</span> live
          </span>
        </div>
        <div className="flex gap-1">
          {(['control', 'threats', 'compliance'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2 py-0.5 font-mono uppercase tracking-wider cursor-pointer transition-colors text-[10px] ${
                activeTab === tab 
                  ? 'bg-[var(--clr-accent)] text-[var(--clr-bg)] font-bold' 
                  : 'text-[var(--clr-text-muted)] hover:text-[var(--clr-text)]'
              }`}
            >
              {tab === 'control' ? 'control' : tab === 'threats' ? `feed(${filtered.length})` : 'compliance'}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowSim(true)}
            className="px-2 py-0.5 bg-red-500/20 text-red-400 border border-red-500/40 font-mono cursor-pointer hover:bg-red-500/30 text-[10px]"
          >
            ▶ simulate breach
          </button>
        </div>
      </div>

      {/* KPI Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-b border-[var(--clr-border)]">
        {[
          { label: "CLOUD POSTURE INDEX", val: "99.4%", delta: "+1.2%", color: "text-lime-400" },
          { label: "THREATS AUTO-KILLED", val: count.toLocaleString(), delta: "100% auto", color: "text-[var(--clr-accent)]" },
          { label: "MTTD", val: "124ms", delta: "-91% vs legacy", color: "text-purple-400" },
          { label: "PII EXPOSED", val: "0 objects", delta: "DSPM sealed", color: "text-lime-400" }
        ].map((kpi, i) => (
          <div key={i} className={`p-3 sm:p-4 ${i < 3 ? 'border-r border-[var(--clr-border)]' : ''} ${i < 2 ? 'border-b md:border-b-0 border-[var(--clr-border)]' : ''}`}>
            <div className="text-[9px] uppercase tracking-widest text-[var(--clr-text-muted)] mb-1">{kpi.label}</div>
            <div className="text-lg sm:text-xl font-bold font-mono">{kpi.val}</div>
            <div className={`text-[10px] font-mono ${kpi.color}`}>{kpi.delta}</div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="p-3 sm:p-4 min-h-[300px]">

        {/* Tab: Control */}
        {activeTab === 'control' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            
            {/* Attack Graph Visual */}
            <div className="lg:col-span-2 border border-[var(--clr-border)] bg-[var(--clr-bg)] p-4 relative scanlines">
              <div className="flex items-center justify-between mb-3 text-[10px] uppercase tracking-widest text-[var(--clr-text-muted)]">
                <span>Kill-Chain Interceptor</span>
                <span className="text-lime-400">● defensive ring active</span>
              </div>
              
              <div className="relative h-52 sm:h-64 flex items-center justify-between px-4">
                {/* Connecting lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                  <line x1="18%" y1="45%" x2="48%" y2="50%" stroke="var(--clr-accent)" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.5" />
                  <line x1="48%" y1="50%" x2="78%" y2="35%" stroke="var(--clr-accent-2)" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5" />
                  <line x1="48%" y1="50%" x2="78%" y2="70%" stroke="var(--clr-accent)" strokeWidth="1.5" opacity="0.3" />
                </svg>

                {/* Node: Public Ingress */}
                <div className="relative z-10 w-20 sm:w-24 p-2 border-2 border-red-500/60 bg-red-950/40 text-center">
                  <div className="text-[9px] uppercase tracking-wider text-red-400 font-bold mb-0.5">Public Ingress</div>
                  <div className="text-[8px] text-red-300/70 font-mono">0.0.0.0/0</div>
                  <div className="text-[8px] text-red-400 mt-1 font-bold">UNVERIFIED</div>
                </div>

                {/* Node: Intercept */}
                <div className="relative z-10 w-24 sm:w-28 p-2 border-2 border-[var(--clr-accent)] bg-[var(--clr-surface)] text-center">
                  <div className="text-[9px] uppercase tracking-wider text-[var(--clr-accent)] font-bold mb-0.5">k8s auth-gw</div>
                  <div className="text-[8px] text-[var(--clr-text-muted)] font-mono">eBPF v3.4</div>
                  <div className="text-[8px] text-lime-400 mt-1 font-bold bg-lime-500/10 py-0.5">QUARANTINED</div>
                </div>

                {/* Node: Data */}
                <div className="relative z-10 space-y-2">
                  <div className="w-20 sm:w-24 p-2 border-2 border-lime-500/60 bg-lime-950/20 text-center">
                    <div className="text-[9px] uppercase tracking-wider text-lime-400 font-bold mb-0.5">S3 Vault</div>
                    <div className="text-[8px] text-[var(--clr-text-muted)] font-mono">12.4 TB PII</div>
                  </div>
                  <div className="w-20 sm:w-24 p-1.5 border border-[var(--clr-border)] bg-[var(--clr-surface)] text-center">
                    <div className="text-[8px] uppercase tracking-wider text-[var(--clr-text-muted)] font-bold">IAM Roles</div>
                    <div className="text-[7px] text-[var(--clr-text-muted)] font-mono">Zero Standing</div>
                  </div>
                </div>
              </div>

              {/* Filter bar */}
              <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-[var(--clr-border)] text-[10px]">
                <span className="text-[var(--clr-text-muted)]">Filter:</span>
                {['ALL', 'AWS', 'GCP', 'Azure', 'Kube'].map(c => (
                  <button
                    key={c}
                    onClick={() => setFilterCloud(c)}
                    className={`px-2 py-0.5 font-mono cursor-pointer transition-colors ${
                      filterCloud === c 
                        ? 'bg-[var(--clr-accent)] text-[var(--clr-bg)] font-bold' 
                        : 'text-[var(--clr-text-muted)] hover:text-[var(--clr-text)] border border-[var(--clr-border)]'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Terminal Log */}
            <div className="border border-[var(--clr-border)] bg-[var(--clr-bg)] p-3 flex flex-col">
              <div className="flex items-center justify-between mb-2 text-[10px] uppercase tracking-widest text-[var(--clr-text-muted)]">
                <span>Sentinel AI Log</span>
                <span className="text-lime-400">SYS_OK</span>
              </div>
              
              <div className="flex-1 font-mono text-[10px] space-y-1 max-h-44 overflow-y-auto">
                {[
                  { t: "[14:28:02]", msg: "GuardDuty: Ingress alert ingested", c: "text-lime-400" },
                  { t: "[14:28:02]", msg: "Graph: 1 lethal path to s3://prod-data", c: "text-[var(--clr-accent)]" },
                  { t: "[14:28:02]", msg: "eBPF: Intercepted payload in auth-gw-v2", c: "text-amber-400" },
                  { t: "[14:28:03]", msg: "Executing: REVOKE_STS_SESSION", c: "text-red-400" },
                  { t: "[14:28:03]", msg: "Neutralised in 140ms. Jira auto-closed.", c: "text-lime-400" }
                ].map((l, i) => (
                  <div key={i} className={l.c}>
                    <span className="text-[var(--clr-text-muted)]">{l.t}</span> {l.msg}
                  </div>
                ))}
                {simLog.map((l, i) => (
                  <div key={`sim-${i}`} className="text-purple-400 font-bold">{l}</div>
                ))}
              </div>

              {/* Selected threat detail */}
              <div className="mt-3 pt-2 border-t border-[var(--clr-border)]">
                <div className="flex items-center justify-between text-[10px] mb-1">
                  <span className="text-[var(--clr-text)] font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
                    {selected.id}: {selected.type}
                  </span>
                  <span className={`px-1.5 py-0.5 text-[9px] font-bold uppercase ${sevColor(selected.severity)}`}>
                    {selected.severity}
                  </span>
                </div>
                <div className="text-[9px] text-[var(--clr-text-muted)] font-mono truncate">{selected.vector}</div>
                <div className="flex items-center justify-between text-[9px] mt-1">
                  <span className="text-[var(--clr-text-muted)] font-mono truncate mr-2">{selected.target}</span>
                  <span className="text-lime-400 font-bold">{selected.status}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Threat Feed */}
        {activeTab === 'threats' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[10px] sm:text-[11px]">
              <thead className="border-b-2 border-[var(--clr-border)]">
                <tr className="text-[var(--clr-text-muted)] uppercase tracking-widest">
                  <th className="py-2 px-2">ID</th>
                  <th className="py-2 px-2">Cloud</th>
                  <th className="py-2 px-2">Attack</th>
                  <th className="py-2 px-2 hidden sm:table-cell">Target</th>
                  <th className="py-2 px-2">Severity</th>
                  <th className="py-2 px-2">Status</th>
                  <th className="py-2 px-2 text-right">Time</th>
                </tr>
              </thead>
              <tbody className="font-mono divide-y divide-[var(--clr-border)]">
                {filtered.map(t => (
                  <tr 
                    key={t.id} 
                    onClick={() => setSelected(t)}
                    className={`cursor-pointer hover:bg-[var(--clr-accent)]/5 transition-colors ${selected.id === t.id ? 'bg-[var(--clr-accent)]/10' : ''}`}
                  >
                    <td className="py-2 px-2 font-bold text-[var(--clr-text)]">{t.id}</td>
                    <td className="py-2 px-2"><span className={`px-1.5 py-0.5 text-[9px] font-bold ${cloudColor(t.cloud)}`}>{t.cloud}</span></td>
                    <td className="py-2 px-2">{t.type}</td>
                    <td className="py-2 px-2 text-[var(--clr-text-muted)] max-w-[160px] truncate hidden sm:table-cell">{t.target}</td>
                    <td className="py-2 px-2"><span className={`px-1.5 py-0.5 text-[9px] font-bold uppercase ${sevColor(t.severity)}`}>{t.severity}</span></td>
                    <td className="py-2 px-2 text-lime-400 font-bold">{t.status}</td>
                    <td className="py-2 px-2 text-right text-[var(--clr-text-muted)]">{t.timeAgo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab: Compliance */}
        {activeTab === 'compliance' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { n: 'SOC 2 Type II', s: '100%', c: '148/148' },
              { n: 'ISO 27001', s: '100%', c: '114/114' },
              { n: 'HIPAA', s: '98.6%', c: '64/65' },
              { n: 'PCI-DSS v4.0', s: '99.2%', c: '312/314' },
              { n: 'FedRAMP High', s: '96.4%', c: '418/425' },
              { n: 'GDPR / CCPA', s: '100%', c: '42/42' }
            ].map((f, i) => (
              <div key={i} className="p-3 border border-[var(--clr-border)] hover:border-[var(--clr-accent)]/40 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold text-[var(--clr-text)]">{f.n}</span>
                  <span className="text-[11px] font-mono font-bold text-lime-400">{f.s}</span>
                </div>
                <div className="text-[9px] text-[var(--clr-text-muted)] font-mono mb-2">{f.c} controls</div>
                <div className="w-full bg-[var(--clr-bg)] h-1">
                  <div className="bg-lime-400 h-1" style={{ width: f.s }} />
                </div>
                <div className="text-[9px] text-lime-400 font-bold mt-1.5 uppercase">● Audit Ready</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Simulate Modal */}
      {showSim && (
        <div className="absolute inset-0 bg-black/90 z-30 flex items-center justify-center p-4">
          <div className="border-2 border-red-500/60 bg-[var(--clr-surface)] max-w-md w-full p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-red-400">Red-Team Breach Simulator</h3>
              <button onClick={() => setShowSim(false)} className="text-[var(--clr-text-muted)] hover:text-white cursor-pointer text-sm">✕</button>
            </div>
            <p className="text-[11px] text-[var(--clr-text-muted)] mb-4 leading-relaxed">
              Inject synthetic adversarial payloads into test sandbox. Observe real-time detection, graph path mapping, and auto-quarantine.
            </p>
            <div className="space-y-2 mb-4">
              {[
                { label: "IAM Privilege Escalation", sub: "STS session theft → S3 admin bypass" },
                { label: "DSPM Exfiltration", sub: "Mass bucket encryption + multi-GB egress" },
                { label: "K8s Container Escape", sub: "CVE-2024-21626 eBPF interception" }
              ].map((sim, i) => (
                <button
                  key={i}
                  disabled={simRunning}
                  onClick={runSim}
                  className="w-full text-left p-3 border border-[var(--clr-border)] hover:border-red-500/40 transition-colors flex items-center justify-between group cursor-pointer disabled:opacity-50"
                >
                  <div>
                    <div className="text-[11px] font-bold text-[var(--clr-text)] group-hover:text-red-400">Test {i+1}: {sim.label}</div>
                    <div className="text-[9px] text-[var(--clr-text-muted)]">{sim.sub}</div>
                  </div>
                  <span className="text-[var(--clr-text-muted)] group-hover:text-red-400">→</span>
                </button>
              ))}
            </div>
            {simLog.length > 0 && (
              <div className="p-2 bg-[var(--clr-bg)] border border-[var(--clr-border)] font-mono text-[10px] space-y-0.5 mb-3 max-h-24 overflow-y-auto">
                {simLog.map((l, i) => <div key={i} className="text-[var(--clr-accent)]">{l}</div>)}
              </div>
            )}
            <button onClick={() => setShowSim(false)} className="px-4 py-2 bg-[var(--clr-accent)] text-[var(--clr-bg)] font-bold text-[11px] uppercase cursor-pointer">
              Close Simulator
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
