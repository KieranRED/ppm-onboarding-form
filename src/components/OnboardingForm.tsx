"use client";

import { useState, useRef, useEffect } from "react";

interface FormData {
  // Step 1 — Business Information
  businessName: string;
  address: string;
  phone: string;
  businessHours: string;
  website: string;
  facebookUrl: string;
  instagramUrl: string;
  country: "UK" | "US" | "";
  // Step 2 — Facebook Business Manager
  fbBmDone: boolean;
  // Step 3 — Offer & Marketing
  offerName: string;
  offerPrice: string;
  offerDescription: string;
  targetAudience: string;
  marketingHistory: string;
  monthlyRevenueTarget: string;
  // Step 4 — A2P Information
  legalBusinessName: string;
  einOrReg: string;
  smsUseCase: string;
  sampleMsg1: string;
  sampleMsg2: string;
}

const FB_STEPS = [
  <>Go to <strong>business.facebook.com</strong> and log in to your account.</>,
  <>Click your Business name in the top-left corner to open Business Settings.</>,
  <>Navigate to <strong>Users → Partners</strong> in the left sidebar.</>,
  <>Click <strong>Add</strong>, then select <em>"Give a partner access to your assets"</em>.</>,
  <>Enter PPM's Business Manager ID (shown below) and click <strong>Next</strong>.</>,
  <>Under <strong>Ad Accounts</strong>, select your ad account and enable <strong>Manage campaigns</strong>.</>,
  <>Click <strong>Save Changes</strong>. You're done — come back and tick the box below.</>,
];

const TOTAL_STEPS = 4;
const STEP_LABELS = ["Business Info", "FB Access", "Offer", "A2P"];

export default function OnboardingForm() {
  const [step, setStep] = useState(0);
  const [animClass, setAnimClass] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const [data, setData] = useState<FormData>({
    businessName: "", address: "", phone: "", businessHours: "",
    website: "", facebookUrl: "", instagramUrl: "", country: "",
    fbBmDone: false,
    offerName: "", offerPrice: "", offerDescription: "",
    targetAudience: "", marketingHistory: "", monthlyRevenueTarget: "",
    legalBusinessName: "", einOrReg: "", smsUseCase: "",
    sampleMsg1: "", sampleMsg2: "",
  });

  const set = <K extends keyof FormData>(k: K, v: FormData[K]) =>
    setData(prev => ({ ...prev, [k]: v }));

  const go = (dir: "fwd" | "back", target: number) => {
    const cls = dir === "fwd" ? "is-entering-right" : "is-entering-left";
    setAnimClass("");
    requestAnimationFrame(() => {
      setStep(target);
      setAnimClass(cls);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goNext = () => go("fwd", step + 1);
  const goBack = () => go("back", step - 1);

  const canContinue = () => {
    if (step === 1) return !!data.businessName.trim() && !!data.phone.trim() && !!data.country;
    if (step === 2) return data.fbBmDone;
    if (step === 3) return !!data.offerName.trim() && !!data.offerDescription.trim() && !!data.targetAudience.trim();
    if (step === 4) return !!data.legalBusinessName.trim() && !!data.einOrReg.trim() && !!data.smsUseCase.trim() && !!data.sampleMsg1.trim() && !!data.sampleMsg2.trim();
    return true;
  };

  // Remove animation class after it plays
  useEffect(() => {
    if (!animClass) return;
    const el = panelRef.current;
    if (!el) return;
    const remove = () => setAnimClass("");
    el.addEventListener("animationend", remove, { once: true });
    return () => el.removeEventListener("animationend", remove);
  }, [animClass]);

  const handleSubmit = () => {
    if (!canContinue()) return;
    setSubmitted(true);
    go("fwd", 5);
  };

  return (
    <main className="page">

      {/* Wordmark */}
      <div className="wordmark">
        <div className="wordmark-mark" aria-hidden="true" />
        <span className="wordmark-text">Power Performance Marketing</span>
      </div>

      {/* Welcome */}
      {step === 0 && (
        <div className={animClass} ref={panelRef}>
          <p className="page-eyebrow">Pre-kickoff setup</p>
          <h1 className="page-title">Client<br />setup.</h1>
          <p className="page-sub">
            Complete these four sections before your onboarding call. Takes about 5 minutes —
            and means we skip all the setup questions on the day.
          </p>

          <div className="overview-grid">
            {[
              { n: "01", label: "Business Information", time: "~30 sec" },
              { n: "02", label: "Facebook Access",      time: "Critical" },
              { n: "03", label: "Offer & Marketing",    time: "~2 min" },
              { n: "04", label: "A2P Information",      time: "~90 sec" },
            ].map(s => (
              <div className="overview-cell" key={s.n}>
                <span className="overview-step">{s.n} · {s.time}</span>
                <span className="overview-label">{s.label}</span>
              </div>
            ))}
          </div>

          <button className="btn btn-primary" onClick={goNext}>
            Start
            <ArrowRight />
          </button>
        </div>
      )}

      {/* Stepper — shown during steps 1–4 */}
      {step >= 1 && step <= TOTAL_STEPS && (
        <nav className="stepper" aria-label="Form steps">
          {STEP_LABELS.map((label, i) => {
            const sn = i + 1;
            const isDone   = sn < step;
            const isActive = sn === step;
            return (
              <React.Fragment key={sn}>
                <div className={`step-item${isActive ? " is-active" : ""}${isDone ? " is-done" : ""}`}>
                  <div className="step-circle">
                    {isDone
                      ? <CheckMark />
                      : String(sn).padStart(2, "0")}
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

      {/* Step panels */}
      <div ref={panelRef} className={animClass}>

        {/* ── Step 1: Business Information ── */}
        {step === 1 && (
          <div>
            <p className="step-eyebrow">Step 01 · ~30 seconds</p>
            <h2 className="step-title">Business<br />Information</h2>
            <p className="step-sub">Name, address, phone, hours, website, socials, country.</p>

            <div className="fields">
              <Field label="Business Name" required>
                <input className="ppm-input" placeholder="e.g. Acme Fitness" autoFocus
                  value={data.businessName} onChange={e => set("businessName", e.target.value)} />
              </Field>

              <Field label="Address">
                <input className="ppm-input" placeholder="Street, City, Postcode / Zip"
                  value={data.address} onChange={e => set("address", e.target.value)} />
              </Field>

              <div className="field-row">
                <Field label="Phone Number" required>
                  <input className="ppm-input" type="tel" placeholder="+44 7700 000000"
                    value={data.phone} onChange={e => set("phone", e.target.value)} />
                </Field>
                <Field label="Business Hours">
                  <input className="ppm-input" placeholder="e.g. Mon–Fri, 9am–5pm"
                    value={data.businessHours} onChange={e => set("businessHours", e.target.value)} />
                </Field>
              </div>

              <Field label="Website">
                <input className="ppm-input" type="url" placeholder="https://yourwebsite.com"
                  value={data.website} onChange={e => set("website", e.target.value)} />
              </Field>

              <div className="field-row">
                <Field label="Facebook Page URL">
                  <input className="ppm-input" placeholder="facebook.com/yourpage"
                    value={data.facebookUrl} onChange={e => set("facebookUrl", e.target.value)} />
                </Field>
                <Field label="Instagram URL">
                  <input className="ppm-input" placeholder="instagram.com/yourhandle"
                    value={data.instagramUrl} onChange={e => set("instagramUrl", e.target.value)} />
                </Field>
              </div>

              <div>
                <div className="sep" style={{ marginBottom: 12 }}>Country</div>
                <div className="opts-row">
                  {(["UK", "US"] as const).map(c => (
                    <div
                      key={c}
                      className={`opt-card${data.country === c ? " selected" : ""}`}
                      onClick={() => set("country", c)}
                      role="radio"
                      aria-checked={data.country === c}
                      tabIndex={0}
                      onKeyDown={e => (e.key === "Enter" || e.key === " ") && set("country", c)}
                    >
                      <div className="opt-radio">
                        <div className="opt-radio-dot" />
                      </div>
                      <div className="opt-text">
                        <span className="opt-name">{c === "UK" ? "United Kingdom" : "United States"}</span>
                        <span className="opt-sub">{c === "UK" ? "Regulatory bundle" : "A2P 10DLC"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <StepNav onBack={goBack} onNext={goNext} canNext={canContinue()} />
          </div>
        )}

        {/* ── Step 2: Facebook Business Manager ── */}
        {step === 2 && (
          <div>
            <p className="step-eyebrow">Step 02 · Critical</p>
            <h2 className="step-title">Facebook Business<br />Manager Access</h2>
            <p className="step-sub">
              This is the step that eats half of every onboarding call.
              Do it now and we skip it entirely on the day.
            </p>

            <div className="fields">
              <div className="callout-volt">
                <p>
                  <strong>Why this matters:</strong> Without Business Manager access, we can't
                  run ads on your behalf. This takes about 2 minutes and only needs to happen once.
                </p>
              </div>

              <div className="callout">
                <ol className="inst-list">
                  {FB_STEPS.map((instruction, i) => (
                    <li className="inst-item" key={i}>
                      <span className="inst-num">{String(i + 1).padStart(2, "0")}</span>
                      <span className="inst-text">{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="bm-id-box">
                <div>
                  <div className="bm-id-label">PPM Business Manager ID</div>
                  <div className="bm-id-value">123&thinsp;456&thinsp;789&thinsp;012</div>
                </div>
                <button
                  type="button"
                  className="btn btn-ghost"
                  style={{ fontSize: 12, height: 32, padding: "0 12px" }}
                  onClick={() => navigator.clipboard?.writeText("123456789012")}
                >
                  Copy
                </button>
              </div>

              <div>
                <div className="sep" style={{ marginBottom: 12 }}>Confirmation</div>
                <div
                  className={`opt-card${data.fbBmDone ? " selected" : ""}`}
                  onClick={() => set("fbBmDone", !data.fbBmDone)}
                  role="checkbox"
                  aria-checked={data.fbBmDone}
                  tabIndex={0}
                  onKeyDown={e => (e.key === "Enter" || e.key === " ") && set("fbBmDone", !data.fbBmDone)}
                >
                  <div className="opt-radio" style={{ borderRadius: 4 }}>
                    {data.fbBmDone && (
                      <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true">
                        <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="currentColor" strokeWidth="1.8"
                          strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--volt-ink)" }} />
                      </svg>
                    )}
                  </div>
                  <div className="opt-text">
                    <span className="opt-name">I&apos;ve granted PPM access to my Facebook Business Manager</span>
                    <span className="opt-sub">Required to continue</span>
                  </div>
                </div>
              </div>
            </div>

            <StepNav onBack={goBack} onNext={goNext} canNext={canContinue()} />
          </div>
        )}

        {/* ── Step 3: Offer & Marketing ── */}
        {step === 3 && (
          <div>
            <p className="step-eyebrow">Step 03 · ~2 minutes</p>
            <h2 className="step-title">Offer &<br />Marketing</h2>
            <p className="step-sub">
              Tell us what you sell, who it&apos;s for, and where you&apos;ve been with marketing.
              This populates your GHL sub-account automatically on submit.
            </p>

            <div className="fields">
              <div className="field-row">
                <Field label="Offer Name" required>
                  <input className="ppm-input" placeholder="e.g. 12-Week Transformation"
                    autoFocus value={data.offerName}
                    onChange={e => set("offerName", e.target.value)} />
                </Field>
                <Field label="Price Point">
                  <input className="ppm-input" placeholder="e.g. £2,000 one-off"
                    value={data.offerPrice} onChange={e => set("offerPrice", e.target.value)} />
                </Field>
              </div>

              <Field label="Offer Description" required>
                <textarea className="ppm-input" rows={3}
                  placeholder="What does your offer include? What problem does it solve for the client?"
                  value={data.offerDescription}
                  onChange={e => set("offerDescription", e.target.value)} />
              </Field>

              <Field label="Target Audience" required>
                <textarea className="ppm-input" rows={3}
                  placeholder="Who is your ideal client? Include age, location, situation, and pain points."
                  value={data.targetAudience}
                  onChange={e => set("targetAudience", e.target.value)} />
              </Field>

              <Field label="Marketing History" badge="Optional">
                <textarea className="ppm-input" rows={2}
                  placeholder="Have you run paid ads before? What worked, what didn't?"
                  value={data.marketingHistory}
                  onChange={e => set("marketingHistory", e.target.value)} />
              </Field>

              <Field label="Monthly Revenue Target" badge="Optional">
                <input className="ppm-input" placeholder="e.g. £30,000 / month"
                  value={data.monthlyRevenueTarget}
                  onChange={e => set("monthlyRevenueTarget", e.target.value)} />
              </Field>
            </div>

            <StepNav onBack={goBack} onNext={goNext} canNext={canContinue()} />
          </div>
        )}

        {/* ── Step 4: A2P Information ── */}
        {step === 4 && (
          <div>
            <p className="step-eyebrow">Step 04 · ~90 seconds</p>
            <h2 className="step-title">A2P<br />Information</h2>
            <p className="step-sub">
              Required for SMS compliance. This data is submitted to carriers automatically on form completion —
              no manual entry from us.
            </p>

            <div className="fields">
              <div className="callout">
                <p>
                  {data.country === "UK"
                    ? <><strong>UK:</strong> We&apos;ll submit a regulatory bundle via the Twilio API. Your company registration number is required.</>
                    : <><strong>US:</strong> We&apos;ll register your brand via A2P 10DLC. Your EIN (Employer Identification Number) is required.</>
                  }
                </p>
              </div>

              <Field label="Legal Business Name" required>
                <input className="ppm-input" autoFocus
                  placeholder="Registered legal name — not your trading name"
                  value={data.legalBusinessName}
                  onChange={e => set("legalBusinessName", e.target.value)} />
              </Field>

              <Field
                label={data.country === "UK" ? "Company Registration Number" : "EIN (Tax ID)"}
                required
              >
                <input className="ppm-input mono"
                  placeholder={data.country === "UK" ? "e.g. 12345678" : "e.g. 12-3456789"}
                  value={data.einOrReg}
                  onChange={e => set("einOrReg", e.target.value)} />
              </Field>

              <Field label="SMS Use Case Description" required>
                <textarea className="ppm-input" rows={3}
                  placeholder="Describe how you'll use SMS. e.g. 'Appointment reminders and follow-ups sent to fitness coaching clients who have opted in via our website lead form.'"
                  value={data.smsUseCase}
                  onChange={e => set("smsUseCase", e.target.value)} />
                <span className="help">Keep it specific. Vague descriptions are the most common reason for A2P rejection.</span>
              </Field>

              <div className="sep">Sample Messages</div>

              <Field label="Sample Message 1" required>
                <textarea className="ppm-input" rows={2}
                  placeholder="e.g. 'Hi [Name], your consultation with us is tomorrow at 2pm. See you then! Reply STOP to opt out.'"
                  value={data.sampleMsg1}
                  onChange={e => set("sampleMsg1", e.target.value)} />
              </Field>

              <Field label="Sample Message 2" required>
                <textarea className="ppm-input" rows={2}
                  placeholder="e.g. 'Hey [Name], just following up — are you still interested in [Offer]? Happy to answer any questions. Reply STOP to opt out.'"
                  value={data.sampleMsg2}
                  onChange={e => set("sampleMsg2", e.target.value)} />
              </Field>
            </div>

            <div className="nav">
              <button className="btn btn-ghost" onClick={goBack}>
                <ArrowLeft />
                Back
              </button>
              <div className="nav-end">
                <button
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  disabled={!canContinue()}
                >
                  {submitted ? <span className="spin" aria-hidden="true" /> : null}
                  Send to build team
                  <ArrowRight />
                </button>
                <span className="nav-hint">Reviewed within 24 hours</span>
              </div>
            </div>
          </div>
        )}

        {/* ── Success ── */}
        {step === 5 && (
          <div className={animClass}>
            <p className="page-eyebrow">Complete</p>
            <h2 className="success-title">We&apos;ll take it<br />from here.</h2>
            <p className="success-sub">
              We&apos;ll review what you&apos;ve sent and be in touch within 24 hours to confirm
              everything before starting the build.
            </p>
            <div className="success-rows">
              <div className="success-row">
                <span className="success-row-num">01</span>
                <p><strong>First:</strong> GHL sub-account created from your snapshot. Google Drive
                  folder, Slack channel, and welcome email fire automatically.</p>
              </div>
              <div className="success-row">
                <span className="success-row-num">02</span>
                <p><strong>Then:</strong> A2P submitted instantly using the details you just provided.
                  UK or US flow handled automatically — no manual entry.</p>
              </div>
              <div className="success-row">
                <span className="success-row-num">03</span>
                <p>If anything needs updating, reply to the confirmation email and we&apos;ll adjust
                  before the build starts.</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}

/* ── Sub-components ── */

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
        {required && <span style={{ color: "var(--volt-ink)", marginLeft: 2 }}>*</span>}
        {badge && <span className="badge">{badge}</span>}
      </label>
      {children}
    </div>
  );
}

function StepNav({ onBack, onNext, canNext }: { onBack: () => void; onNext: () => void; canNext: boolean }) {
  return (
    <div className="nav">
      <button className="btn btn-ghost" onClick={onBack}>
        <ArrowLeft />
        Back
      </button>
      <button className="btn btn-primary" onClick={onNext} disabled={!canNext}>
        Continue
        <ArrowRight />
      </button>
    </div>
  );
}

function CheckMark() {
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

// React import needed for Fragment in JSX
import React from "react";
