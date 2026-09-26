import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  BarChart3,
  Check,
  CheckCircle2,
  ChevronDown,
  Circle,
  FileDown,
  FileText,
  Flag,
  LayoutDashboard,
  MapPin,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Caseworker Command Center — BridgeAble" },
      {
        name: "description",
        content: "BridgeAble rural disability access case coordination and barrier intelligence workspace.",
      },
      { property: "og:title", content: "Caseworker Command Center — BridgeAble" },
      {
        property: "og:description",
        content: "Coordinate rural access cases and turn systemic barriers into grant-ready intelligence.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BridgeAbleApp,
});

type View = "workspace" | "intelligence" | "ledger";

const demoIntake =
  "Sarah, 32. Power wheelchair user in Bandera County, TX. Prescribed weekly outpatient physical therapy 38 miles away in Kerrville. No personal accessible vehicle. Local dial-a-ride operates Mon/Wed only; clinic therapy slots are Fridays only. Cellular connectivity inadequate for telehealth.";

const barriers = [
  {
    title: "Transit Availability Deficit",
    meta: "Transportation · Critical",
    tag: "Systemic infrastructure gap",
    detail: "No wheelchair-accessible vehicle service operating in county on Friday appointment windows.",
    tone: "systemic",
  },
  {
    title: "Provider Schedule Conflict",
    meta: "Scheduling · High",
    tag: "Solvable operational barrier",
    detail: "Provider appointment falls on Friday; county dial-a-ride runs exclusively Monday and Wednesday.",
    tone: "solvable",
  },
  {
    title: "Broadband Deficit",
    meta: "Connectivity · Moderate",
    tag: "Systemic infrastructure gap",
    detail: "Low bandwidth precludes video telehealth as an alternative.",
    tone: "neutral",
  },
] as const;

const actions = [
  "Call Hill Country Therapy Clinic to reschedule appointment slot from Friday to Wednesday morning.",
  "Check client eligibility for Bandera County Title III-B transit fuel subsidy.",
  "Schedule 7-day caseworker check-in to verify transit pickup confirmation.",
];

const recurringBarriers = [
  { label: "Transportation", value: 82, systemic: "68% systemic" },
  { label: "Travel distance (>30 mi)", value: 51, systemic: "84% systemic" },
  { label: "Housing accessibility", value: 37, systemic: "" },
  { label: "Documentation / bureaucracy", value: 29, systemic: "" },
  { label: "Broadband / connectivity", value: 18, systemic: "" },
];

function BridgeAbleApp() {
  const [view, setView] = useState<View>("workspace");
  const [intake, setIntake] = useState(demoIntake);
  const [checked, setChecked] = useState<number[]>([]);
  const [status, setStatus] = useState<"open" | "solved" | "systemic">("open");
  const [showReason, setShowReason] = useState(false);
  const [reason, setReason] = useState("");
  const [analyzing, setAnalyzing] = useState(false);

  const runAnalysis = () => {
    setAnalyzing(true);
    window.setTimeout(() => setAnalyzing(false), 700);
  };

  const loadDemo = () => {
    setView("workspace");
    setIntake(demoIntake);
    setChecked([]);
    setStatus("open");
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 px-6 pt-5">
        <div className="mx-auto flex max-w-[1392px] items-center gap-5 rounded-[22px] border border-border bg-surface-glass px-5 py-3 shadow-nav backdrop-blur-xl">
          <div className="flex min-w-[242px] items-center gap-3">
            <div className="brand-mark" aria-hidden="true"><span /></div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[17px] font-semibold">BridgeAble</span>
                <span className="h-2 w-2 rounded-full bg-success shadow-pulse" aria-label="System online" />
              </div>
              <span className="text-[10px] font-semibold uppercase text-muted-foreground">Hackathon prototype</span>
            </div>
          </div>

          <nav className="mx-auto flex items-center rounded-xl bg-segment p-1" aria-label="Workspace views">
            <NavTab active={view === "workspace"} onClick={() => setView("workspace")} icon={<LayoutDashboard size={15} />} label="Active Case Workspace" />
            <NavTab active={view === "intelligence"} onClick={() => setView("intelligence")} icon={<BarChart3 size={15} />} label="Barrier & Grant Intelligence" />
            <NavTab active={view === "ledger"} onClick={() => setView("ledger")} icon={<FileText size={15} />} label="Case Ledger" />
          </nav>

          <div className="flex min-w-max items-center gap-2">
            <button className="control-button bg-primary text-primary-foreground hover:bg-primary-hover" onClick={loadDemo}>
              <Zap size={14} fill="currentColor" /> Load Sarah demo
            </button>
            <button className="control-button border border-border bg-card hover:bg-muted" aria-label="Choose county">
              <MapPin size={14} /> Bandera County, TX <ChevronDown size={13} />
            </button>
            <button className="profile-pill" aria-label="Open caseworker profile">
              <span className="avatar">ER</span>
              <span><strong>Elena R.</strong><small>Hill Country Access Org</small></span>
            </button>
          </div>
        </div>
      </header>

      {view === "workspace" && (
        <div className="mx-auto grid max-w-[1392px] grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] gap-7 px-6 pb-16 pt-10">
          <section aria-labelledby="intake-heading" className="min-w-0">
            <div className="mb-7">
              <p className="eyebrow">Intake & barrier decomposition</p>
              <h1 id="intake-heading" className="mt-3 max-w-[520px] text-[44px] font-semibold leading-[1.04]">
                Analyze the journey.<br />Uncover the wall.
              </h1>
              <p className="mt-4 max-w-md text-[15px] leading-6 text-muted-foreground">
                Turn narrative case notes into clear barriers and an actionable coordination plan.
              </p>
            </div>

            <div className="surface-card p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">Raw Intake Studio</p>
                  <p className="mt-1 text-xs text-muted-foreground">Case BA-2026-084 · Sarah M.</p>
                </div>
                <span className="status-chip bg-warning-soft text-warning">Pending review</span>
              </div>
              <label className="sr-only" htmlFor="case-notes">Case notes</label>
              <textarea
                id="case-notes"
                className="min-h-[252px] w-full resize-none rounded-xl border border-border bg-field p-4 text-[15px] leading-7 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary-soft"
                value={intake}
                onChange={(event) => setIntake(event.target.value)}
              />
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span>{intake.length} characters</span><span>Last edited just now</span>
              </div>
              <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-5 py-3.5 text-sm font-semibold text-background transition hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" onClick={runAnalysis}>
                <Sparkles size={16} /> {analyzing ? "Detecting barriers…" : "Decompose Case Notes & Detect Barriers"}
              </button>
            </div>
          </section>

          <section aria-labelledby="barriers-heading" className="min-w-0">
            <div className="mb-5 flex items-end justify-between">
              <div><p className="eyebrow">Barrier studio & prescriptive action plan</p><h2 id="barriers-heading" className="mt-2 text-2xl font-semibold">Identified Access Barriers</h2></div>
              <span className="count-badge">3 detected</span>
            </div>
            <div className={analyzing ? "space-y-3 animate-pulse" : "space-y-3"}>
              {barriers.map((barrier, index) => <BarrierCard key={barrier.title} number={index + 1} {...barrier} />)}
            </div>

            <div className={`surface-card mt-5 overflow-hidden transition-colors ${status === "solved" ? "ring-1 ring-success bg-success-soft" : status === "systemic" ? "ring-1 ring-danger bg-danger-soft" : ""}`}>
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <div><p className="text-sm font-semibold">Recommended Caseworker Action Plan</p><p className="mt-1 text-xs text-muted-foreground">Advisory only · Review before acting</p></div>
                <Sparkles className="text-primary" size={18} />
              </div>
              <ol className="divide-y divide-border px-5">
                {actions.map((action, index) => {
                  const isChecked = checked.includes(index);
                  return (
                    <li key={action} className="flex items-start gap-3 py-4">
                      <button
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition ${isChecked ? "border-success bg-success text-success-foreground" : "border-input bg-card hover:border-primary"}`}
                        onClick={() => setChecked(isChecked ? checked.filter((item) => item !== index) : [...checked, index])}
                        aria-label={`${isChecked ? "Unmark" : "Mark"} action ${index + 1}`}
                      >{isChecked && <Check size={13} strokeWidth={3} />}</button>
                      <span className={`text-[13px] leading-5 ${isChecked ? "text-muted-foreground line-through" : "text-foreground"}`}><strong className="mr-1">{index + 1}.</strong>{action}</span>
                    </li>
                  );
                })}
              </ol>
              <div className="flex items-center justify-between gap-3 border-t border-border bg-card/60 px-5 py-4">
                <span className="text-xs text-muted-foreground">{checked.length} of 3 steps completed</span>
                <div className="flex gap-2">
                  <button className="control-button border border-success-border bg-success-soft text-success hover:bg-success-soft-strong" onClick={() => setStatus("solved")}><CheckCircle2 size={15} /> Mark Barrier Solved</button>
                  <button className="control-button border border-danger-border bg-danger-soft text-danger hover:bg-danger-soft-strong" onClick={() => setShowReason(true)}><Flag size={14} /> Flag Systemic Dead-End</button>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {view === "intelligence" && <IntelligenceView />}
      {view === "ledger" && <LedgerView onOpenCase={() => setView("workspace")} />}

      {showReason && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay p-6" role="presentation" onMouseDown={() => setShowReason(false)}>
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-modal" role="dialog" aria-modal="true" aria-labelledby="reason-title" onMouseDown={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between"><div><p className="eyebrow text-danger">Systemic dead-end</p><h2 id="reason-title" className="mt-2 text-xl font-semibold">What prevents resolution?</h2></div><button className="icon-button" onClick={() => setShowReason(false)} aria-label="Close"><X size={18} /></button></div>
            <label className="mt-6 block text-sm font-medium" htmlFor="reason">Reason</label>
            <textarea id="reason" autoFocus className="mt-2 min-h-28 w-full resize-none rounded-xl border border-border bg-field p-3 text-sm outline-none focus:border-danger focus:ring-4 focus:ring-danger-soft" placeholder="e.g., No lift van exists within 40-mile radius" value={reason} onChange={(event) => setReason(event.target.value)} />
            <div className="mt-5 flex justify-end gap-2"><button className="control-button border border-border bg-card hover:bg-muted" onClick={() => setShowReason(false)}>Cancel</button><button className="control-button bg-danger text-danger-foreground disabled:opacity-40" disabled={!reason.trim()} onClick={() => { setStatus("systemic"); setShowReason(false); }}>Confirm systemic barrier</button></div>
          </div>
        </div>
      )}
    </main>
  );
}

function NavTab({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return <button className={`nav-tab ${active ? "nav-tab-active" : ""}`} onClick={onClick} aria-current={active ? "page" : undefined}>{icon}<span>{label}</span></button>;
}

function BarrierCard({ number, title, meta, tag, detail, tone }: { number: number; title: string; meta: string; tag: string; detail: string; tone: "systemic" | "solvable" | "neutral" }) {
  return (
    <article className={`surface-card barrier-card barrier-${tone}`}>
      <div className="flex min-w-0 gap-4">
        <span className="barrier-number">0{number}</span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div><h3 className="text-[15px] font-semibold">{title}</h3><p className="mt-1 text-xs text-muted-foreground">{meta}</p></div>
            <span className={`status-chip ${tone === "solvable" ? "bg-success-soft text-success" : "bg-danger-soft text-danger"}`}><Circle size={7} fill="currentColor" />{tag}</span>
          </div>
          <p className="mt-3 text-[13px] leading-5 text-secondary-foreground">{detail}</p>
        </div>
      </div>
    </article>
  );
}

function IntelligenceView() {
  return (
    <div className="mx-auto max-w-[1392px] px-6 pb-16 pt-11">
      <div className="mb-8 flex items-end justify-between"><div><p className="eyebrow">County-level intelligence</p><h1 className="mt-2 text-[38px] font-semibold">Systemic Barrier Heatmap</h1><p className="mt-2 text-sm text-muted-foreground">Bandera County, Texas · Rolling 12-month analysis</p></div><button className="control-button border border-border bg-card hover:bg-muted"><MapPin size={14} /> Compare counties <ChevronDown size={13} /></button></div>
      <div className="grid grid-cols-4 gap-4">
        <Metric value="247" label="Total cases analyzed" trend="+18 this quarter" />
        <Metric value="618" label="Total barriers identified" trend="2.5 avg. per case" />
        <Metric value="58%" label="Solvable barriers addressed" trend="↑ 7% from last quarter" accent="success" />
        <Metric value="37%" label="Dropped due to transit >25 mi" trend="Primary systemic driver" accent="danger" />
      </div>
      <div className="mt-5 grid grid-cols-[1.5fr_1fr] gap-5">
        <section className="surface-card p-6"><div className="mb-7 flex items-center justify-between"><div><p className="eyebrow">Frequency analysis</p><h2 className="mt-2 text-lg font-semibold">Top Recurring Access Barriers</h2></div><span className="text-xs text-muted-foreground">Cases · last 12 months</span></div><div className="space-y-5">{recurringBarriers.map((item) => <div key={item.label}><div className="mb-2 flex items-end justify-between"><span className="text-sm font-medium">{item.label}</span><span className="text-xs text-muted-foreground"><strong className="mr-2 text-sm text-foreground">{item.value}</strong>{item.systemic}</span></div><div className="h-2 overflow-hidden rounded-full bg-segment"><div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: `${(item.value / 82) * 100}%` }} /></div></div>)}</div></section>
        <section className="surface-card flex flex-col p-6"><div><p className="eyebrow">Resolution profile</p><h2 className="mt-2 text-lg font-semibold">Solvable vs. Systemic</h2></div><div className="flex flex-1 items-center justify-center gap-9 py-8"><div className="donut" role="img" aria-label="58 percent solvable and 42 percent systemic"><div><strong>618</strong><span>barriers</span></div></div><div className="space-y-5"><ChartLegend tone="success" value="58%" label="Solvable" detail="Rescheduled, paperwork, subsidized" /><ChartLegend tone="danger" value="42%" label="Systemic" detail="No provider, zero transit routes" /></div></div><div className="flex items-center gap-2 border-t border-border pt-4 text-xs text-muted-foreground"><ArrowDown size={14} className="text-success" /> Systemic barriers decreased 3.2% this quarter</div></section>
      </div>
      <section className="grant-card mt-5">
        <div className="grant-icon"><FileText size={21} /><Sparkles size={10} /></div>
        <div className="flex-1"><p className="eyebrow text-primary">Grant justification snippet</p><h2 className="mt-2 text-xl font-semibold">Automated Grant Proposal Insight</h2><p className="mt-3 max-w-4xl text-[15px] leading-6 text-secondary-foreground">41% of unresolved physical therapy referrals in Bandera County fail due to the absence of Friday wheelchair transit. Allocating a <strong>$30,000 community mobility grant</strong> directly targets and eliminates this specific systemic drop-off point.</p></div>
        <button className="control-button bg-primary text-primary-foreground hover:bg-primary-hover" onClick={() => window.print()}><FileDown size={15} /> Export Grant Brief (PDF)</button>
      </section>
    </div>
  );
}

function Metric({ value, label, trend, accent }: { value: string; label: string; trend: string; accent?: "success" | "danger" }) {
  return <article className="surface-card p-5"><div className={`text-[34px] font-semibold ${accent === "danger" ? "text-danger" : accent === "success" ? "text-success" : "text-foreground"}`}>{value}</div><p className="mt-1 text-sm font-medium">{label}</p><p className="mt-4 text-xs text-muted-foreground">{trend}</p></article>;
}

function ChartLegend({ tone, value, label, detail }: { tone: "success" | "danger"; value: string; label: string; detail: string }) {
  return <div className="flex items-start gap-3"><span className={`mt-1 h-2.5 w-2.5 rounded-full ${tone === "success" ? "bg-success" : "bg-danger"}`} /><div><p className="text-sm font-semibold">{value} {label}</p><p className="mt-1 max-w-[170px] text-xs leading-5 text-muted-foreground">{detail}</p></div></div>;
}

function LedgerView({ onOpenCase }: { onOpenCase: () => void }) {
  const rows = [
    ["BA-2026-084", "Sarah M.", "Bandera", "Physical therapy", "3 barriers", "In review"],
    ["BA-2026-079", "Thomas J.", "Kerr", "Home modification", "2 barriers", "Actioned"],
    ["BA-2026-071", "Maria S.", "Gillespie", "Specialist access", "4 barriers", "Systemic"],
    ["BA-2026-063", "David K.", "Real", "Transit subsidy", "1 barrier", "Resolved"],
  ];
  return <div className="mx-auto max-w-[1392px] px-6 pb-16 pt-11"><div className="mb-8"><p className="eyebrow">Coordinated case history</p><h1 className="mt-2 text-[38px] font-semibold">Case Ledger</h1><p className="mt-2 text-sm text-muted-foreground">Review active and historical access coordination cases.</p></div><div className="surface-card overflow-hidden"><table className="w-full border-collapse text-left"><thead><tr className="border-b border-border bg-field text-xs text-muted-foreground"><th className="px-5 py-4 font-medium">Case ID</th><th className="px-5 py-4 font-medium">Client</th><th className="px-5 py-4 font-medium">County</th><th className="px-5 py-4 font-medium">Access need</th><th className="px-5 py-4 font-medium">Detected</th><th className="px-5 py-4 font-medium">Status</th><th className="px-5 py-4"><span className="sr-only">Actions</span></th></tr></thead><tbody>{rows.map((row, index) => <tr key={row[0]} className="border-b border-border last:border-0 hover:bg-field"><td className="px-5 py-4 text-sm font-semibold">{row[0]}</td>{row.slice(1).map((cell, cellIndex) => <td key={cell} className="px-5 py-4 text-sm text-secondary-foreground">{cellIndex === 4 ? <span className={`status-chip ${cell === "Resolved" ? "bg-success-soft text-success" : cell === "Systemic" ? "bg-danger-soft text-danger" : "bg-warning-soft text-warning"}`}>{cell}</span> : cell}</td>)}<td className="px-5 py-4 text-right"><button onClick={onOpenCase} className="text-xs font-semibold text-primary hover:underline">{index === 0 ? "Open case" : "View details"}</button></td></tr>)}</tbody></table></div></div>;
}