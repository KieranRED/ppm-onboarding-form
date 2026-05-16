"use client";

import { useState } from "react";

interface FormData {
  businessName: string;
  industry: string;
  goals: string[];
  runningAds: boolean | null;
  currentSpend: string;
  budget: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  website: string;
}

const INDUSTRIES = [
  "E-commerce", "Real Estate", "Health & Fitness", "Food & Beverage",
  "Professional Services", "Beauty & Wellness", "Tech & Software",
  "Education", "Construction", "Other",
];

const GOALS = [
  "More Leads", "Brand Awareness", "Social Media Growth", "Google Ads",
  "Meta Ads", "SEO", "Email Marketing", "Content Creation", "Website Design",
];

const BUDGETS = [
  "Under $1k/mo", "$1k – $3k/mo", "$3k – $5k/mo",
  "$5k – $10k/mo", "$10k+/mo", "Not sure yet",
];

const SPENDS = [
  "Nothing yet", "Under $500/mo", "$500 – $2k/mo", "$2k – $5k/mo", "$5k+/mo",
];

const TOTAL_STEPS = 5;

export default function OnboardingForm() {
  const [step, setStep] = useState(0);
  const [slideDir, setSlideDir] = useState<"right" | "left">("right");
  const [animKey, setAnimKey] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    businessName: "",
    industry: "",
    goals: [],
    runningAds: null,
    currentSpend: "",
    budget: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    website: "",
  });

  const advance = (dir: "right" | "left", target: number) => {
    setSlideDir(dir);
    setAnimKey(k => k + 1);
    setStep(target);
  };

  const goNext = () => advance("right", step + 1);
  const goBack = () => advance("left", step - 1);

  const toggle = (field: "goals", val: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).includes(val)
        ? (prev[field] as string[]).filter(v => v !== val)
        : [...(prev[field] as string[]), val],
    }));
  };

  const set = (field: keyof FormData, val: string | boolean | null) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const canProceed = (): boolean => {
    if (step === 1) return formData.businessName.trim().length > 0 && formData.industry.length > 0;
    if (step === 2) return formData.goals.length > 0;
    if (step === 3) return formData.runningAds !== null && formData.budget.length > 0;
    if (step === 4) return formData.firstName.trim().length > 0 && formData.email.includes("@");
    return true;
  };

  const progressPct = step === 0 || step > TOTAL_STEPS ? 0 : (step / TOTAL_STEPS) * 100;

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center p-4 py-10"
      style={{ background: "linear-gradient(135deg, #0D0A1E 0%, #13091F 50%, #080D1E 100%)" }}>

      {/* Background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="animate-blob absolute w-[600px] h-[600px] opacity-20 -top-32 -left-32"
          style={{ background: "radial-gradient(circle, #EC4899, transparent 70%)" }} />
        <div className="animate-blob-d2 absolute w-[500px] h-[500px] opacity-15 -top-16 -right-20"
          style={{ background: "radial-gradient(circle, #8B5CF6, transparent 70%)" }} />
        <div className="animate-blob-d4 absolute w-[500px] h-[500px] opacity-15 -bottom-32 left-1/2 -translate-x-1/2"
          style={{ background: "radial-gradient(circle, #06B6D4, transparent 70%)" }} />
      </div>

      <div className="relative w-full max-w-xl">

        {/* Progress bar — only show during form steps */}
        {step > 0 && step <= TOTAL_STEPS && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: "rgba(255,255,255,0.4)" }}>
                Step {step} of {TOTAL_STEPS}
              </span>
              <span className="text-xs font-semibold" style={{ color: "#EC4899" }}>
                {Math.round(progressPct)}%
              </span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${progressPct}%`,
                  background: "linear-gradient(90deg, #EC4899, #8B5CF6, #06B6D4)",
                }}
              />
            </div>
          </div>
        )}

        {/* Card */}
        <div
          className="rounded-3xl p-8 sm:p-10"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1.5px solid rgba(255,255,255,0.09)",
            backdropFilter: "blur(24px)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)",
          }}
        >
          <div key={animKey} className={`animate-slide-${slideDir}`}>

            {/* STEP 0: Welcome */}
            {step === 0 && (
              <div className="text-center">
                <div className="animate-float inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6"
                  style={{ background: "linear-gradient(135deg, #EC4899, #8B5CF6, #06B6D4)" }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                  </svg>
                </div>
                <div className="mb-2 text-sm font-semibold tracking-[0.2em] uppercase"
                  style={{ color: "#EC4899" }}>
                  Power Performance Marketing
                </div>
                <h1 className="text-4xl sm:text-5xl font-black leading-tight mb-4"
                  style={{ fontFamily: 'var(--font-heading), sans-serif' }}>
                  <span className="gradient-text">Let&apos;s build your</span>
                  <br />marketing machine.
                </h1>
                <p className="text-lg mb-8 leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                  Takes 2 minutes. We&apos;ll do the rest.
                </p>
                <button onClick={goNext} className="btn-primary w-full py-4 rounded-2xl text-white font-bold text-lg cursor-pointer flex items-center justify-center gap-2">
                  Let&apos;s go
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            )}

            {/* STEP 1: Business Info */}
            {step === 1 && (
              <div>
                <StepLabel>01 — Your Business</StepLabel>
                <h2 className="text-3xl font-black mb-1" style={{ fontFamily: 'var(--font-heading), sans-serif' }}>
                  Tell us about <span className="gradient-text">your biz</span>
                </h2>
                <p className="text-sm mb-7" style={{ color: "rgba(255,255,255,0.45)" }}>What are we working with?</p>

                <label className="block text-sm font-semibold mb-2" style={{ color: "rgba(255,255,255,0.7)" }}>
                  Business Name
                </label>
                <input
                  className="form-input w-full rounded-xl px-4 py-3.5 text-base mb-6"
                  placeholder="e.g. Acme Fitness Co."
                  value={formData.businessName}
                  onChange={e => set("businessName", e.target.value)}
                  autoFocus
                />

                <label className="block text-sm font-semibold mb-3" style={{ color: "rgba(255,255,255,0.7)" }}>
                  Industry
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {INDUSTRIES.map(ind => (
                    <button
                      key={ind}
                      onClick={() => set("industry", ind)}
                      className={`pill-option rounded-xl px-3 py-2.5 text-sm font-medium text-left cursor-pointer${formData.industry === ind ? " selected" : ""}`}
                    >
                      {ind}
                    </button>
                  ))}
                </div>

                <StepNav onBack={goBack} onNext={goNext} canNext={canProceed()} />
              </div>
            )}

            {/* STEP 2: Goals */}
            {step === 2 && (
              <div>
                <StepLabel>02 — Goals</StepLabel>
                <h2 className="text-3xl font-black mb-1" style={{ fontFamily: 'var(--font-heading), sans-serif' }}>
                  What do you want <span className="gradient-text">to crush?</span>
                </h2>
                <p className="text-sm mb-7" style={{ color: "rgba(255,255,255,0.45)" }}>Pick everything that applies.</p>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {GOALS.map(goal => (
                    <button
                      key={goal}
                      onClick={() => toggle("goals", goal)}
                      className={`pill-option rounded-xl px-3 py-3 text-sm font-medium text-center cursor-pointer${formData.goals.includes(goal) ? " selected" : ""}`}
                    >
                      {goal}
                    </button>
                  ))}
                </div>

                <StepNav onBack={goBack} onNext={goNext} canNext={canProceed()} />
              </div>
            )}

            {/* STEP 3: Budget & Situation */}
            {step === 3 && (
              <div>
                <StepLabel>03 — Budget</StepLabel>
                <h2 className="text-3xl font-black mb-1" style={{ fontFamily: 'var(--font-heading), sans-serif' }}>
                  Let&apos;s talk <span className="gradient-text">numbers</span>
                </h2>
                <p className="text-sm mb-7" style={{ color: "rgba(255,255,255,0.45)" }}>No judgment — every budget is a starting point.</p>

                <label className="block text-sm font-semibold mb-3" style={{ color: "rgba(255,255,255,0.7)" }}>
                  Are you currently running ads?
                </label>
                <div className="flex gap-3 mb-6">
                  {[{ label: "Yes, I am", val: true }, { label: "Not yet", val: false }].map(opt => (
                    <button
                      key={String(opt.val)}
                      onClick={() => set("runningAds", opt.val)}
                      className={`pill-option flex-1 rounded-xl px-4 py-3 text-sm font-semibold cursor-pointer${formData.runningAds === opt.val ? " selected" : ""}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                {formData.runningAds && (
                  <div className="mb-6">
                    <label className="block text-sm font-semibold mb-3" style={{ color: "rgba(255,255,255,0.7)" }}>
                      Current monthly ad spend
                    </label>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {SPENDS.map(s => (
                        <button
                          key={s}
                          onClick={() => set("currentSpend", s)}
                          className={`pill-option rounded-xl px-3 py-2.5 text-sm font-medium cursor-pointer${formData.currentSpend === s ? " selected" : ""}`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <label className="block text-sm font-semibold mb-3" style={{ color: "rgba(255,255,255,0.7)" }}>
                  Monthly marketing budget
                </label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {BUDGETS.map(b => (
                    <button
                      key={b}
                      onClick={() => set("budget", b)}
                      className={`pill-option rounded-xl px-3 py-2.5 text-sm font-medium cursor-pointer${formData.budget === b ? " selected" : ""}`}
                    >
                      {b}
                    </button>
                  ))}
                </div>

                <StepNav onBack={goBack} onNext={goNext} canNext={canProceed()} />
              </div>
            )}

            {/* STEP 4: Contact */}
            {step === 4 && (
              <div>
                <StepLabel>04 — Contact</StepLabel>
                <h2 className="text-3xl font-black mb-1" style={{ fontFamily: 'var(--font-heading), sans-serif' }}>
                  Last step — <span className="gradient-text">who are you?</span>
                </h2>
                <p className="text-sm mb-7" style={{ color: "rgba(255,255,255,0.45)" }}>We&apos;ll reach out within 24 hours.</p>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: "rgba(255,255,255,0.7)" }}>First Name *</label>
                    <input className="form-input w-full rounded-xl px-4 py-3.5 text-base"
                      placeholder="Jane"
                      value={formData.firstName}
                      onChange={e => set("firstName", e.target.value)}
                      autoFocus />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: "rgba(255,255,255,0.7)" }}>Last Name</label>
                    <input className="form-input w-full rounded-xl px-4 py-3.5 text-base"
                      placeholder="Smith"
                      value={formData.lastName}
                      onChange={e => set("lastName", e.target.value)} />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2" style={{ color: "rgba(255,255,255,0.7)" }}>Email *</label>
                  <input className="form-input w-full rounded-xl px-4 py-3.5 text-base"
                    type="email"
                    placeholder="jane@acmefitness.com"
                    value={formData.email}
                    onChange={e => set("email", e.target.value)} />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2" style={{ color: "rgba(255,255,255,0.7)" }}>Phone</label>
                  <input className="form-input w-full rounded-xl px-4 py-3.5 text-base"
                    type="tel"
                    placeholder="+61 400 000 000"
                    value={formData.phone}
                    onChange={e => set("phone", e.target.value)} />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-2" style={{ color: "rgba(255,255,255,0.7)" }}>Website <span style={{ color: "rgba(255,255,255,0.3)" }}>(optional)</span></label>
                  <input className="form-input w-full rounded-xl px-4 py-3.5 text-base"
                    type="url"
                    placeholder="https://acmefitness.com"
                    value={formData.website}
                    onChange={e => set("website", e.target.value)} />
                </div>

                <button
                  onClick={goNext}
                  disabled={!canProceed()}
                  className="btn-primary w-full py-4 rounded-2xl text-white font-bold text-lg cursor-pointer flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
                >
                  Submit
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
                <button onClick={goBack} className="w-full mt-3 py-3 rounded-2xl text-sm font-semibold cursor-pointer transition-colors"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "white")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}>
                  Go back
                </button>
              </div>
            )}

            {/* STEP 5: Success */}
            {step === 5 && (
              <div className="text-center py-4">
                <div className="relative inline-block mb-8">
                  <div className="animate-pulse-ring absolute inset-0 rounded-full"
                    style={{ background: "rgba(236,72,153,0.2)" }} />
                  <div className="animate-bounce-in relative flex items-center justify-center w-24 h-24 rounded-full mx-auto"
                    style={{ background: "linear-gradient(135deg, #EC4899, #8B5CF6, #06B6D4)" }}>
                    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                </div>

                <h2 className="text-4xl font-black mb-3" style={{ fontFamily: 'var(--font-heading), sans-serif' }}>
                  <span className="gradient-text">You&apos;re in!</span>
                </h2>
                <p className="text-lg mb-8 leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                  Thanks, <strong style={{ color: "white" }}>{formData.firstName || "friend"}</strong>. We&apos;ll
                  review your details and reach out within <strong style={{ color: "#06B6D4" }}>24 hours</strong>.
                </p>

                {/* Summary */}
                <div className="rounded-2xl p-5 text-left space-y-3 mb-6"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  {[
                    { label: "Business", value: formData.businessName },
                    { label: "Industry", value: formData.industry },
                    { label: "Goals", value: formData.goals.join(", ") },
                    { label: "Budget", value: formData.budget },
                  ].filter(r => r.value).map(row => (
                    <div key={row.label} className="flex justify-between items-start gap-4">
                      <span className="text-sm" style={{ color: "rgba(255,255,255,0.4)", minWidth: 72 }}>{row.label}</span>
                      <span className="text-sm font-semibold text-right">{row.value}</span>
                    </div>
                  ))}
                </div>

                <p className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
                  Questions? Reach us at{" "}
                  <span style={{ color: "#EC4899" }}>hello@ppm.com.au</span>
                </p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

function StepLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs font-bold tracking-[0.2em] uppercase mb-3"
      style={{ color: "#EC4899" }}>
      {children}
    </div>
  );
}

function StepNav({ onBack, onNext, canNext }: { onBack: () => void; onNext: () => void; canNext: boolean }) {
  return (
    <div className="flex gap-3 mt-8">
      <button
        onClick={onBack}
        className="py-3.5 px-5 rounded-2xl text-sm font-semibold cursor-pointer transition-all"
        style={{ background: "rgba(255,255,255,0.07)", border: "1.5px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }}
        onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "white"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
      >
        Back
      </button>
      <button
        onClick={onNext}
        disabled={!canNext}
        className="btn-primary flex-1 py-3.5 rounded-2xl text-white font-bold cursor-pointer flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
      >
        Continue
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  );
}
