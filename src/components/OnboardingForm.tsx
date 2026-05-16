"use client";

import React, { useState, useRef } from "react";

/* ─── Types ─────────────────────────────────────────────────────── */
interface FormData {
  ghlApiKey: string;
  ghlSnapshotId: string;
  onboardingDocUrl: string;
  masterTrackerUrl: string;
  setterNames: string[];
  csmSetup: "sam_only" | "multiple" | "";
  showRateThreshold: string;
}

const TOTAL_STEPS = 3;
const STEP_LABELS = ["GHL Access", "Drive", "Team & Setup"];
const PPM_EMAIL = "kierandeclanredpath@gmail.com";

/* ─── Main component ─────────────────────────────────────────────── */
export default function OnboardingForm() {
  const [step, setStep]       = useState(0);
  const [stepKey, setStepKey] = useState(0);
  const [dir, setDir]         = useState<"right" | "left">("right");
  const [submitting, setSubmitting] = useState(false);

  const formAreaRef = useRef<HTMLDivElement>(null);

  const [data, setData] = useState<FormData>({
    ghlApiKey: "", ghlSnapshotId: "",
    onboardingDocUrl: "", masterTrackerUrl: "",
    setterNames: [], csmSetup: "",
    showRateThreshold: "",
  });

  function set<K extends keyof FormData>(k: K, v: FormData[K]) {
    setData(prev => ({ ...prev, [k]: v }));
  }

  function go(toStep: number, direction: "right" | "left") {
    setDir(direction);
    setStepKey(k => k + 1);
    setStep(toStep);
    // Scroll to top of form area, not top of page
    setTimeout(() => {
      formAreaRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 10);
  }

  function canAdvance(): boolean {
    if (step === 1) return !!data.ghlApiKey.trim() && !!data.ghlSnapshotId.trim();
    if (step === 2) return !!data.onboardingDocUrl.trim() && !!data.masterTrackerUrl.trim();
    if (step === 3) return data.setterNames.length > 0 && !!data.csmSetup;
    return true;
  }

  async function handleSubmit() {
    if (!canAdvance()) return;
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 900));
    setSubmitting(false);
    go(4, "right");
  }

  const showSidebarSteps = step >= 1 && step <= TOTAL_STEPS;

  return (
    <main className="layout">

      {/* ── Sidebar (desktop only) ── */}
      <aside className="sidebar">
        <div className="wordmark">
          <div className="wordmark-mark" aria-hidden="true" />
          <span className="wordmark-text">Power Performance Marketing</span>
        </div>

        <p className="sidebar-eyebrow">Pre-build setup</p>
        <h1 className="sidebar-title">System<br />setup.</h1>
        <p className="sidebar-sub">
          We&apos;ve pulled what we can from your SOP. This covers the handful of things
          only you can give us. Under 10 minutes.
        </p>

        {showSidebarSteps && (
          <div className="sidebar-steps">
            {STEP_LABELS.map((label, i) => {
              const sn      = i + 1;
              const isDone   = sn < step;
              const isActive = sn === step;
              return (
                <div
                  key={sn}
                  className={`sidebar-step${isActive ? " is-active" : ""}${isDone ? " is-done" : ""}`}
                >
                  <span className="sidebar-step-num">{String(sn).padStart(2, "0")}</span>
                  <span className="sidebar-step-label">{label}</span>
                  <span className="sidebar-step-tick" aria-hidden="true">
                    {isDone && <CheckIcon />}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </aside>

      {/* ── Form area ── */}
      <div className="form-area" ref={formAreaRef}>

        {/* Mobile wordmark */}
        <div className="mobile-wordmark">
          <div className="wordmark">
            <div className="wordmark-mark" aria-hidden="true" />
            <span className="wordmark-text">Power Performance Marketing</span>
          </div>
        </div>

        {/* Mobile stepper (steps 1–3 only) */}
        {step >= 1 && step <= TOTAL_STEPS && (
          <nav className="mobile-stepper" aria-label="Form steps">
            {STEP_LABELS.map((label, i) => {
              const sn      = i + 1;
              const isDone   = sn < step;
              const isActive = sn === step;
              return (
                <React.Fragment key={sn}>
                  <div className={`step-item${isActive ? " is-active" : ""}${isDone ? " is-done" : ""}`}>
                    <div className="step-circle">
                      {isDone ? <CheckIcon /> : String(sn).padStart(2, "0")}
                    </div>
                    <span className="step-label">{label}</span>
                  </div>
                  {sn < TOTAL_STEPS && (
                    <div className="step-gap">
                      <div className="step-gap-fill" style={{ width: isDone ? "100%" : "0%" }} />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </nav>
        )}

        {/* ── Single animated container for ALL step content ── */}
        <div key={stepKey} className={`is-entering-${dir}`}>

          {/* Step 0 – Welcome */}
          {step === 0 && (
            <div>
              <p className="page-eyebrow">Pre-build setup</p>
              <h2 className="page-title">System<br />setup.</h2>
              <p className="page-sub">
                We&apos;ve pulled what we can from your SOP. This covers the handful of things
                only you can give us. Under 10 minutes.
              </p>

              <div className="overview-grid">
                {[
                  { n: "01", label: "GHL Access",   time: "~2 min" },
                  { n: "02", label: "Drive",         time: "~2 min" },
                  { n: "03", label: "Team & Setup",  time: "~5 min" },
                ].map(s => (
                  <div
                    className="overview-cell"
                    key={s.n}
                    style={{ gridColumn: s.n === "03" ? "span 2" : undefined }}
                  >
                    <span className="overview-step">{s.n} · {s.time}</span>
                    <span className="overview-label">{s.label}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 32 }}>
                <button className="btn btn-primary" onClick={() => go(1, "right")}>
                  Start <ArrowRight />
                </button>
              </div>
            </div>
          )}

          {/* Step 1 – GHL Access */}
          {step === 1 && (
            <div>
              <p className="step-eyebrow">Step 01</p>
              <h2 className="step-title">GHL Access</h2>
              <p className="step-sub">Agency-level keys only — not a sub-account key.</p>

              <div className="fields">
                <div className="callout">
                  <p>
                    <strong>Agency API key:</strong> GHL → Agency View → Settings → API Keys → Create new key.<br />
                    <strong>Snapshot ID:</strong> Agency View → Account Snapshots → ⋯ → Copy Snapshot ID.
                  </p>
                </div>

                <Field label="Agency API Key" required>
                  <input
                    className="ppm-input mono"
                    type="password"
                    placeholder="sk-••••••••••••••••••••"
                    autoComplete="off"
                    autoFocus
                    value={data.ghlApiKey}
                    onChange={e => set("ghlApiKey", e.target.value)}
                  />
                  <span className="help">Agency-level only — not a sub-account key.</span>
                </Field>

                <Field label="Snapshot ID" required>
                  <input
                    className="ppm-input mono"
                    type="text"
                    placeholder="xxxxxxxxxxxxxxxxxxxxxxxx"
                    value={data.ghlSnapshotId}
                    onChange={e => set("ghlSnapshotId", e.target.value)}
                  />
                  <span className="help">Applied to every new client sub-account.</span>
                </Field>
              </div>

              <div className="nav">
                <span />
                <button
                  className="btn btn-primary"
                  onClick={() => go(2, "right")}
                  disabled={!canAdvance()}
                >
                  Continue <ArrowRight />
                </button>
              </div>
            </div>
          )}

          {/* Step 2 – Drive */}
          {step === 2 && (
            <div>
              <p className="step-eyebrow">Step 02</p>
              <h2 className="step-title">Drive</h2>
              <p className="step-sub">Template files that get duplicated for every new client.</p>

              <div className="fields">
                <div className="callout">
                  <p>
                    Open each file → Share → Copy link. Full URL starting with{" "}
                    <code>docs.google.com/...</code>
                  </p>
                </div>

                <Field label="Onboarding Document Template" required>
                  <input
                    className="ppm-input"
                    type="url"
                    placeholder="https://docs.google.com/document/d/..."
                    value={data.onboardingDocUrl}
                    onChange={e => set("onboardingDocUrl", e.target.value)}
                    autoFocus
                  />
                  <span className="help">Copied and renamed to the client&apos;s business name on sign.</span>
                </Field>

                <Field label="Master Client Tracking Sheet" required>
                  <input
                    className="ppm-input"
                    type="url"
                    placeholder="https://docs.google.com/spreadsheets/d/..."
                    value={data.masterTrackerUrl}
                    onChange={e => set("masterTrackerUrl", e.target.value)}
                  />
                  <span className="help">A new row appends automatically when a client signs.</span>
                </Field>
              </div>

              <div className="nav">
                <button className="btn btn-ghost" onClick={() => go(1, "left")}>
                  <ArrowLeft /> Back
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => go(3, "right")}
                  disabled={!canAdvance()}
                >
                  Continue <ArrowRight />
                </button>
              </div>
            </div>
          )}

          {/* Step 3 – Team & Setup */}
          {step === 3 && (
            <div>
              <p className="step-eyebrow">Step 03</p>
              <h2 className="step-title">Team &<br />Setup</h2>
              <p className="step-sub">Setters, CSM assignment, and Canva template prep.</p>

              <div className="fields">

                <Field label="Setter Names" required>
                  <ChipInput
                    value={data.setterNames}
                    onChange={v => set("setterNames", v)}
                  />
                  <span className="help">
                    Add one at a time. These populate the setter dropdown on the Calendly booking form.
                  </span>
                </Field>

                <div>
                  <div className="sep" style={{ margin: "4px 0 12px" }}>Client Success Manager</div>
                  <Field label="Who is assigned as CSM on each new client?" required>
                    <div className="opts-row">
                      <OptCard
                        selected={data.csmSetup === "sam_only"}
                        onClick={() => set("csmSetup", "sam_only")}
                        title="Just you"
                        sub="All clients default to Sam"
                      />
                      <OptCard
                        selected={data.csmSetup === "multiple"}
                        onClick={() => set("csmSetup", "multiple")}
                        title="Varies per client"
                        sub="Closer picks when submitting the new client form"
                      />
                    </div>
                  </Field>
                </div>

                <div>
                  <div className="sep" style={{ margin: "4px 0 12px" }}>Canva</div>
                  <CanvaEmailCallout email={PPM_EMAIL} />
                </div>

                <div>
                  <div className="sep" style={{ margin: "4px 0 12px" }}>Dashboard</div>
                  <div className="dashboard-threshold">
                    <div className="dashboard-threshold-label">
                      <span>Show-rate alert threshold</span>
                      <span className="badge">Optional</span>
                    </div>
                    <p className="dashboard-threshold-sub">
                      Setters below this percentage will be flagged in the dashboard. Defaults to 50% and can be adjusted after launch.
                    </p>
                    <div className="threshold-options">
                      {[
                        { value: "25", label: "25%", sub: "Lenient" },
                        { value: "50", label: "50%", sub: "Standard" },
                        { value: "75", label: "75%", sub: "Strict" },
                      ].map(opt => (
                        <button
                          key={opt.value}
                          type="button"
                          className={`threshold-btn${data.showRateThreshold === opt.value ? " selected" : ""}`}
                          onClick={() => set("showRateThreshold", data.showRateThreshold === opt.value ? "" : opt.value)}
                        >
                          <span className="threshold-pct">{opt.label}</span>
                          <span className="threshold-sub">{opt.sub}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              <div className="nav">
                <button className="btn btn-ghost" onClick={() => go(2, "left")}>
                  <ArrowLeft /> Back
                </button>
                <div className="nav-end">
                  <button
                    className="btn btn-primary"
                    onClick={handleSubmit}
                    disabled={!canAdvance() || submitting}
                  >
                    {submitting
                      ? <><span className="spin" aria-hidden="true" /> Sending…</>
                      : <>Send to build team <ArrowRight /></>}
                  </button>
                  <span className="nav-hint">Reviewed within 24 hours</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 4 – Success */}
          {step === 4 && (
            <div>
              <p className="page-eyebrow">Complete</p>
              <h2 className="success-title">We&apos;ll take it<br />from here.</h2>
              <p className="success-sub">
                We&apos;ll review what you&apos;ve sent and be in touch within 24 hours to
                confirm everything before starting the build.
              </p>
              <div className="success-rows">
                <div className="success-row">
                  <span className="success-row-num">01</span>
                  <p>
                    <strong>First up:</strong> GHL sub-account structure, setter routing on
                    Calendly, and Google Drive client folder automation.
                  </p>
                </div>
                <div className="success-row">
                  <span className="success-row-num">02</span>
                  <p>
                    <strong>Then:</strong> Dashboard build begins. We&apos;ll share a preview
                    link before going live.
                  </p>
                </div>
                <div className="success-row">
                  <span className="success-row-num">03</span>
                  <p>
                    If anything needs updating, reply to the confirmation email and we&apos;ll
                    adjust before starting.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>
        {/* end animated container */}

      </div>
      {/* end form-area */}

    </main>
  );
}

/* ─── Canva email callout ─────────────────────────────────────────── */
function CanvaEmailCallout({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  return (
    <div className="callout-email" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
      <p style={{ margin: 0 }}>
        Add <code>{email}</code> as an editor to your Canva template.
      </p>
      <button
        type="button"
        onClick={copy}
        className="btn btn-ghost"
        style={{ height: 30, padding: "0 10px", fontSize: 12, flexShrink: 0 }}
        aria-label="Copy email address"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

/* ─── ChipInput ──────────────────────────────────────────────────── */
function ChipInput({
  value,
  onChange,
}: {
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function add(raw: string) {
    const v = raw.trim();
    if (!v || value.includes(v)) return;
    onChange([...value, v]);
  }

  function remove(i: number) {
    onChange(value.filter((_, idx) => idx !== i));
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      add(input);
      setInput("");
    }
    if (e.key === "Backspace" && !input && value.length) {
      remove(value.length - 1);
    }
  }

  function onBlur() {
    if (input.trim()) { add(input); setInput(""); }
  }

  return (
    <div className="chip-field" onClick={() => inputRef.current?.focus()}>
      {value.map((tag, i) => (
        <div className="chip" key={i} role="listitem">
          <span>{tag}</span>
          <button
            type="button"
            className="chip-x"
            aria-label={`Remove ${tag}`}
            onClick={e => { e.stopPropagation(); remove(i); }}
          >
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M1 1l6 6M7 1L1 7" />
            </svg>
          </button>
        </div>
      ))}
      <input
        ref={inputRef}
        type="text"
        placeholder={value.length === 0 ? "Type a name, press Enter" : "Add another…"}
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        autoComplete="off"
      />
    </div>
  );
}

/* ─── OptCard ────────────────────────────────────────────────────── */
function OptCard({
  selected, onClick, title, sub,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  sub: string;
}) {
  return (
    <div
      className={`opt-card${selected ? " selected" : ""}`}
      onClick={onClick}
      role="radio"
      aria-checked={selected}
      tabIndex={0}
      onKeyDown={e => (e.key === "Enter" || e.key === " ") && onClick()}
    >
      <div className="opt-radio">
        <div className="opt-radio-dot" />
      </div>
      <div className="opt-text">
        <span className="opt-name">{title}</span>
        <span className="opt-sub">{sub}</span>
      </div>
    </div>
  );
}

/* ─── Field wrapper ──────────────────────────────────────────────── */
function Field({
  label, required, badge, children,
}: {
  label: string;
  required?: boolean;
  badge?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="field">
      <label>
        {label}
        {required && <span style={{ color: "var(--volt-ink)" }}>*</span>}
        {badge && <span className="badge">{badge}</span>}
      </label>
      {children}
    </div>
  );
}

/* ─── Icons ──────────────────────────────────────────────────────── */
function CheckIcon() {
  return (
    <svg width="12" height="10" viewBox="0 0 12 10" fill="none" stroke="currentColor"
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M1 5l3.5 3.5L11 1" />
    </svg>
  );
}
function ArrowRight() {
  return (
    <svg viewBox="0 0 13 13" width="13" height="13" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 6.5h9M7 2l4.5 4.5L7 11" />
    </svg>
  );
}
function ArrowLeft() {
  return (
    <svg viewBox="0 0 13 13" width="13" height="13" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 6.5H2M6 2L1.5 6.5 6 11" />
    </svg>
  );
}
