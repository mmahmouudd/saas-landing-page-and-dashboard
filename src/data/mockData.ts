export interface ThreatEvent {
  id: string;
  timestamp: string;
  type: string;
  severity: 'critical' | 'high' | 'medium';
  source: string;
  target: string;
  cloud: 'AWS' | 'GCP' | 'Azure' | 'Kube';
  status: 'intercepted' | 'analyzing' | 'auto-remediated';
  vector: string;
  timeAgo: string;
}

export const MOCK_THREAT_FEED: ThreatEvent[] = [
  {
    id: "THR-9041",
    timestamp: "14:28:02",
    type: "IAM Privilege Escalation",
    severity: "critical",
    source: "203.0.113.84",
    target: "arn:aws:iam::prod:role/AdminSync",
    cloud: "AWS",
    status: "auto-remediated",
    vector: "AssumedRole via poisoned STS session token",
    timeAgo: "2s ago"
  },
  {
    id: "THR-9040",
    timestamp: "14:27:44",
    type: "Public Bucket Exposure",
    severity: "high",
    source: "Terraform drift worker",
    target: "gs://cust-fin-records/archive",
    cloud: "GCP",
    status: "auto-remediated",
    vector: "AllUsers ACL assigned during IaC deploy",
    timeAgo: "24s ago"
  },
  {
    id: "THR-9039",
    timestamp: "14:26:12",
    type: "Kube CVE-2024-21626",
    severity: "critical",
    source: "198.51.100.22",
    target: "k8s-pod: auth-gateway-v2",
    cloud: "Kube",
    status: "intercepted",
    vector: "Container escape attempt via fd leak",
    timeAgo: "1m ago"
  },
  {
    id: "THR-9038",
    timestamp: "14:24:55",
    type: "Anomalous Exfiltration",
    severity: "high",
    source: "Internal egress proxy",
    target: "azure-blob: enterprise-crm",
    cloud: "Azure",
    status: "auto-remediated",
    vector: "82GB transfer throttled & quarantined",
    timeAgo: "3m ago"
  },
  {
    id: "THR-9037",
    timestamp: "14:21:09",
    type: "API Key Leak",
    severity: "medium",
    source: "GitHub commit staging-dev",
    target: "Secret: STRIPE_RESTRICTED_KEY",
    cloud: "AWS",
    status: "auto-remediated",
    vector: "Token auto-rotated in Secrets Manager",
    timeAgo: "6m ago"
  },
  {
    id: "THR-9036",
    timestamp: "14:18:33",
    type: "Lateral Movement Path",
    severity: "critical",
    source: "Compromised Lambda",
    target: "RDS: customer-analytics-prod",
    cloud: "AWS",
    status: "auto-remediated",
    vector: "Cross-account IAM pivot via VPC endpoint",
    timeAgo: "9m ago"
  }
];

export const FEATURES_DATA = [
  {
    id: "dspm",
    tag: "Data Posture",
    title: "Zero-Egress DSPM",
    description: "Scan petabytes of S3, BigQuery, Snowflake, and Postgres without moving a single byte outside your VPC.",
    stat: "$0 egress fees",
    points: [
      "Auto-classifies 120+ PII & PCI data types",
      "Shadow data store discovery across orphaned VPCs",
      "Real-time alerting on toxic data-access combos"
    ]
  },
  {
    id: "cspm",
    tag: "Attack Graph",
    title: "Graph-Based Attack Path Engine",
    description: "Map identity drift, network reachability, and CVEs into a lethal visual attack graph. See the chain before adversaries exploit it.",
    stat: "99.1% false-positive cut",
    points: [
      "Correlates IAM policies with public ingress",
      "Lateral movement detection across 3 clouds",
      "One-click 1-second auto-remediation bots"
    ]
  },
  {
    id: "kspm",
    tag: "Runtime Defense",
    title: "eBPF Kernel Shield",
    description: "Kernel-level observability with zero agent friction. Intercept anomalous syscalls, reverse shells, and cryptominers natively.",
    stat: "<0.5% CPU overhead",
    points: [
      "Full pod, container, and host telemetry",
      "Zero-day detection without signature lag",
      "Instant network policy quarantine injection"
    ]
  },
  {
    id: "cicd",
    tag: "Shift-Left",
    title: "IaC Guardrails",
    description: "Block misconfigurations in GitHub and GitLab PRs before Terraform apply touches production.",
    stat: "Sub-3s PR check",
    points: [
      "Automated PR comments with exact fix PRs",
      "Policy-as-code with Open Policy Agent",
      "Zero friction with IDE extensions"
    ]
  },
  {
    id: "ai",
    tag: "AI SecOps",
    title: "Sentinel AI Copilot",
    description: "Ask natural language questions about your infra. 'Which EC2 instances have internet access and S3 write permissions?'",
    stat: "94% faster triage",
    points: [
      "Generates executable Terraform fix scripts",
      "Interactive incident timeline reconstruction",
      "Private LLMs — zero training on your data"
    ]
  },
  {
    id: "ciem",
    tag: "Identity",
    title: "JIT Privilege Ephemeralizer",
    description: "Eliminate standing privileges. Grant temporal, scoped IAM credentials with auto-expiration and anomaly tripwires.",
    stat: "87% blast-radius cut",
    points: [
      "Auto-revoking dormant roles across accounts",
      "Slack & Teams interactive approval flows",
      "Continuous session hijacking detection"
    ]
  }
];

export const PRICING_TIERS = [
  {
    id: "growth",
    name: "Growth Cloud",
    tagline: "Essential posture for fast-growing startups.",
    priceMonthly: 890,
    priceAnnual: 710,
    popular: false,
    limits: "Up to 500 workloads · 2 cloud providers",
    features: [
      "CSPM across AWS & GCP",
      "Asset inventory & drift detection",
      "SOC 2 & ISO 27001 readiness",
      "Slack & Discord alert integration",
      "Daily vulnerability scans",
      "Email support 8/5"
    ],
    cta: "Start 14-Day POC"
  },
  {
    id: "pro",
    name: "Enterprise Defense",
    tagline: "Total autonomous cloud security for modern teams.",
    priceMonthly: 2490,
    priceAnnual: 1990,
    popular: true,
    limits: "Up to 3,500 workloads · Unlimited clouds",
    features: [
      "Everything in Growth, plus:",
      "Lethal Attack Path Analysis",
      "Zero-egress DSPM (up to 100TB)",
      "eBPF K8s runtime defense",
      "PR-level IaC scanning",
      "1-click auto-remediation bots",
      "Dedicated Slack engineer · 99.9% SLA"
    ],
    cta: "Deploy Free in 5 Min"
  },
  {
    id: "hyperscale",
    name: "Hyper-Scale",
    tagline: "Mission-critical resilience for Fortune 500.",
    priceMonthly: null,
    priceAnnual: null,
    popular: false,
    limits: "Unlimited workloads · Custom hybrid",
    features: [
      "Everything in Enterprise, plus:",
      "On-prem Private LLM deployment",
      "FedRAMP High & PCI-DSS v4.0",
      "BYOK & air-gapped support",
      "Splunk / Datadog bidirectional sync",
      "24/7/365 CISO & Red-Team advisory",
      "$5M breach protection warranty"
    ],
    cta: "Schedule Briefing"
  }
];

export const TESTIMONIALS = [
  {
    quote: "VortexSec found an unauthenticated IAM pivot path sitting in our secondary region for 11 months. Neutralised it in 40 seconds.",
    author: "Elena Rostova",
    role: "CISO",
    company: "FinFlow Global",
    metric: "94% attack surface reduction"
  },
  {
    quote: "Unlike legacy CSPMs that vomit 40K false positives into Jira, VortexSec focuses on verified lethal chains. My engineers actually love it.",
    author: "Marcus Thorne",
    role: "VP Cloud Engineering",
    company: "Synthetix BioCloud",
    metric: "22 hours/week saved"
  },
  {
    quote: "Zero-egress DSPM was the killer feature. We catalogued 650TB across 4 clouds with zero egress bills and passed SOC 2 with zero findings.",
    author: "Devon Vance",
    role: "Head of Infra",
    company: "Nexus Health",
    metric: "100% SOC 2 readiness"
  }
];

export const COMPLIANCE_DATA = [
  { name: "SOC 2 Type II", score: 100, checks: "148/148" },
  { name: "ISO 27001:2022", score: 100, checks: "114/114" },
  { name: "HIPAA / HITECH", score: 98.6, checks: "64/65" },
  { name: "PCI-DSS v4.0", score: 99.2, checks: "312/314" },
  { name: "FedRAMP High", score: 96.4, checks: "418/425" },
  { name: "GDPR / CCPA", score: 100, checks: "42/42" }
];

export const TRUSTED_COMPANIES = [
  "DATABOUND", "APOLLO PAY", "CLOUDSTREAM", 
  "NEOMED", "QUANTUM AI", "ORBITAL OS"
];
