"use client";

import { useState } from "react";

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
  fbBmConfirmed: boolean;
  // Step 3 — Offer & Marketing
  offerName: string;
  offerPrice: string;
  offerDescription: string;
  targetAudience: string;
  marketingHistory: string;
  monthlyRevenueTarget: string;
  // Step 4 — A2P Information
  legalBusinessName: string;
  einOrRegNumber: string;
  smsUseCase: string;
  sampleMessage1: string;
  sampleMessage2: string;
}

const TOTAL_STEPS = 4;

const FB_BM_STEPS = [
  "Go to business.facebook.com and log in",
  "Click on your Business in the top left",
  "Go to Business Settings → Users → Partners",
  "Click 'Add' then choose 'Give a partner access to your assets'",
  "Enter PPM's Business Manager ID: 123456789",
  "Under 'Ad Accounts', select your ad account and toggle on 'Manage campaigns'",
  "Click 'Save Changes' — you're done",
];

export default function OnboardingForm() {
  const [step, setStep] = useState(0);
  const [slideDir, setSlideDir] = useState<"right" | "left">("right");
  const [animKey, setAnimKey] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    businessName: "", address: "", phone: "", businessHours: "",
    website: "", facebookUrl: "", instagramUrl: "", country: "",
    fbBmConfirmed: false,
    offerName: "", offerPrice: "", offerDescription: "",
    targetAudience: "", marketingHistory: "", monthlyRevenueTarget: "",
    legalBusinessName: "", einOrRegNumber: "", smsUseCase: "",
    sampleMessage1: "", sampleMessage2: "",
  });

  const go = (dir: "right" | "left", target: number) => {
    setSlideDir(dir);
    setAnimKey(k => k + 1);
    setStep(target);
  };
  const goNext = () => go("right", step + 1);
  const goBack = () => go("left", step - 1);

  const set = <K extends keyof FormData>(field: K, val: FormData[K]) =>
    setFormData(prev => ({ ...prev, [field]: val }));

  const canProceed = (): boolean => {
    if (step === 1)
      return !!formData.businessName.trim() && !!formData.phone.trim() && !!formData.country;
    if (step === 2) return formData.fbBmConfirmed;
    if (step === 3)
      return !!formData.offerName.trim() && !!formData.offerDescription.trim() && !!formData.targetAudience.trim();
    if (step === 4)
      return !!formData.legalBusinessName.trim() && !!formData.einOrRegNumber.trim() && !!formData.smsUseCase.trim() && !!formData.sampleMessage1.trim() && !!formData.sampleMessage2.trim();
    return true;
  };

  const progressPct = step >= 1 && step <= TOTAL_STEPS ? (step / TOTAL_STEPS) * 100 : 0;

  return (
    <div className="min-h-screen" style={{ background: "#0C0C0C" }}>
      <div className="max-w-2xl mx-auto px-5 py-10 sm:py-16">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <PPMLogo />
            <div>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16, color: "#fff", lineHeight: 1 }}>PPM</div>
              <div className="mono-label" style={{ marginTop: 2 }}>Client Onboarding</div>
            </div>
          </div>
          {step > 0 && step <= TOTAL_STEPS && (
            <div className="mono-label" style={{ color: "rgba(255,255,255,0.3)" }}>
              {step} / {TOTAL_STEPS}
            </div>
          )}
        </div>

        {/* Progress bar */}
        {step > 0 && step <= TOTAL_STEPS && (
          <div className="mb-10">
            <div style={{ height: 2, background: "rgba(255,255,255,0.07)", borderRadius: 2, overflow: "hidden" }}>
              <div style={{
                height: "100%", background: "#A3E635", borderRadius: 2,
                width: `${progressPct}%`, transition: "width 0.4s ease",
              }} />
            </div>
          </div>
        )}

        {/* Animated step container */}
        <div key={animKey} className={`animate-slide-${slideDir}`}>

          {/* ── STEP 0: Welcome ── */}
          {step === 0 && (
            <div className="animate-fade-up">
              <div className="mono-label-green mb-4">Component 02 · Client Onboarding Funnel</div>
              <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(36px, 6vw, 56px)", lineHeight: 1.05, color: "#fff", marginBottom: 20 }}>
                Everything we need.<br />
                <span style={{ color: "#A3E635" }}>Before the call.</span>
              </h1>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 16, lineHeight: 1.7, maxWidth: 480, marginBottom: 40 }}>
                Complete this form before your onboarding call. It takes around 5 minutes and lets us skip the setup questions — so we can hit the ground running from minute one.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "rgba(255,255,255,0.07)", borderRadius: 8, overflow: "hidden", marginBottom: 40 }}>
                {[
                  { step: "01", label: "Business Info", time: "30 sec" },
                  { step: "02", label: "Facebook Access", time: "Critical" },
                  { step: "03", label: "Offer & Marketing", time: "2 min" },
                  { step: "04", label: "A2P Information", time: "90 sec" },
                ].map((s) => (
                  <div key={s.step} style={{ background: "#111111", padding: "16px 20px" }}>
                    <div className="mono-label-green" style={{ marginBottom: 4 }}>
                      {s.step} · {s.time}
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>{s.label}</div>
                  </div>
                ))}
              </div>

              <button className="ppm-btn" style={{ width: "100%" }} onClick={goNext}>
                Start
                <ArrowRight />
              </button>
            </div>
          )}

          {/* ── STEP 1: Business Information ── */}
          {step === 1 && (
            <div>
              <div className="mono-label-green mb-1">Step 01 · 30 seconds</div>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(28px, 5vw, 42px)", lineHeight: 1.1, color: "#fff", marginBottom: 6 }}>
                Business Information
              </h2>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, marginBottom: 32 }}>
                Name, address, phone, hours, website, socials, country.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <Field label="Business Name" required>
                  <input className="ppm-input" placeholder="e.g. Acme Fitness" value={formData.businessName}
                    onChange={e => set("businessName", e.target.value)} autoFocus />
                </Field>

                <Field label="Address">
                  <input className="ppm-input" placeholder="Street, City, Postcode / Zip"
                    value={formData.address} onChange={e => set("address", e.target.value)} />
                </Field>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <Field label="Phone Number" required>
                    <input className="ppm-input" placeholder="+44 7700 000000" type="tel"
                      value={formData.phone} onChange={e => set("phone", e.target.value)} />
                  </Field>
                  <Field label="Business Hours">
                    <input className="ppm-input" placeholder="e.g. Mon–Fri, 9–5"
                      value={formData.businessHours} onChange={e => set("businessHours", e.target.value)} />
                  </Field>
                </div>

                <Field label="Website">
                  <input className="ppm-input" placeholder="https://yourwebsite.com" type="url"
                    value={formData.website} onChange={e => set("website", e.target.value)} />
                </Field>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <Field label="Facebook URL">
                    <input className="ppm-input" placeholder="facebook.com/yourpage"
                      value={formData.facebookUrl} onChange={e => set("facebookUrl", e.target.value)} />
                  </Field>
                  <Field label="Instagram URL">
                    <input className="ppm-input" placeholder="instagram.com/yourhandle"
                      value={formData.instagramUrl} onChange={e => set("instagramUrl", e.target.value)} />
                  </Field>
                </div>

                <Field label="Country" required>
                  <div style={{ display: "flex", gap: 8 }}>
                    {(["UK", "US"] as const).map(c => (
                      <button key={c} className={`ppm-pill${formData.country === c ? " active" : ""}`}
                        style={{ flex: 1 }} onClick={() => set("country", c)}>
                        {c}
                      </button>
                    ))}
                  </div>
                </Field>
              </div>

              <StepNav onBack={goBack} onNext={goNext} canNext={canProceed()} />
            </div>
          )}

          {/* ── STEP 2: Facebook Business Manager ── */}
          {step === 2 && (
            <div>
              <div className="mono-label-green mb-1">Step 02 · Critical</div>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(28px, 5vw, 42px)", lineHeight: 1.1, color: "#fff", marginBottom: 6 }}>
                Facebook Business<br />Manager Access
              </h2>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, marginBottom: 28 }}>
                This is the step that eats half of every onboarding call. Complete it now and we skip it entirely.
              </p>

              <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "20px 24px", marginBottom: 24 }}>
                <div className="mono-label" style={{ marginBottom: 16 }}>Step-by-step instructions</div>
                <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                  {FB_BM_STEPS.map((instruction, i) => (
                    <li key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#A3E635", minWidth: 20, paddingTop: 2 }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div style={{ background: "rgba(163,230,53,0.07)", border: "1px solid rgba(163,230,53,0.2)", borderRadius: 8, padding: "16px 20px", marginBottom: 28 }}>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 2 }} className="mono-label">PPM Business Manager ID</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 16, color: "#A3E635", letterSpacing: "0.05em" }}>
                  123456789
                </div>
              </div>

              <label style={{ display: "flex", gap: 14, alignItems: "flex-start", cursor: "pointer" }}>
                <div
                  onClick={() => set("fbBmConfirmed", !formData.fbBmConfirmed)}
                  style={{
                    width: 20, height: 20, minWidth: 20, borderRadius: 4, marginTop: 1,
                    border: `1px solid ${formData.fbBmConfirmed ? "#A3E635" : "rgba(255,255,255,0.2)"}`,
                    background: formData.fbBmConfirmed ? "#A3E635" : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.15s ease", cursor: "pointer",
                  }}>
                  {formData.fbBmConfirmed && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <polyline points="2,6 5,9 10,3" stroke="#0C0C0C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>
                  I&apos;ve granted PPM access to my Facebook Business Manager
                </span>
              </label>

              <StepNav onBack={goBack} onNext={goNext} canNext={canProceed()} />
            </div>
          )}

          {/* ── STEP 3: Offer & Marketing ── */}
          {step === 3 && (
            <div>
              <div className="mono-label-green mb-1">Step 03 · 2 minutes</div>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(28px, 5vw, 42px)", lineHeight: 1.1, color: "#fff", marginBottom: 6 }}>
                Offer & Marketing
              </h2>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, marginBottom: 32 }}>
                Offer name, price, description, target audience, marketing history, revenue target.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <Field label="Offer Name" required>
                    <input className="ppm-input" placeholder="e.g. 12-Week Transformation"
                      value={formData.offerName} onChange={e => set("offerName", e.target.value)} autoFocus />
                  </Field>
                  <Field label="Offer Price">
                    <input className="ppm-input" placeholder="e.g. £2,000 / £197/mo"
                      value={formData.offerPrice} onChange={e => set("offerPrice", e.target.value)} />
                  </Field>
                </div>

                <Field label="Offer Description" required>
                  <textarea className="ppm-input" placeholder="What does your offer include? What problem does it solve?"
                    rows={3} value={formData.offerDescription}
                    onChange={e => set("offerDescription", e.target.value)}
                    style={{ resize: "vertical" }} />
                </Field>

                <Field label="Target Audience" required>
                  <textarea className="ppm-input" placeholder="Who is your ideal client? Age, location, situation, pain points."
                    rows={3} value={formData.targetAudience}
                    onChange={e => set("targetAudience", e.target.value)}
                    style={{ resize: "vertical" }} />
                </Field>

                <Field label="Marketing History">
                  <textarea className="ppm-input" placeholder="Have you run ads before? What worked, what didn't?"
                    rows={2} value={formData.marketingHistory}
                    onChange={e => set("marketingHistory", e.target.value)}
                    style={{ resize: "vertical" }} />
                </Field>

                <Field label="Monthly Revenue Target">
                  <input className="ppm-input" placeholder="e.g. £30,000 / month"
                    value={formData.monthlyRevenueTarget}
                    onChange={e => set("monthlyRevenueTarget", e.target.value)} />
                </Field>
              </div>

              <StepNav onBack={goBack} onNext={goNext} canNext={canProceed()} />
            </div>
          )}

          {/* ── STEP 4: A2P Information ── */}
          {step === 4 && (
            <div>
              <div className="mono-label-green mb-1">Step 04 · 90 seconds</div>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(28px, 5vw, 42px)", lineHeight: 1.1, color: "#fff", marginBottom: 6 }}>
                A2P Information
              </h2>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, marginBottom: 16 }}>
                Required for SMS compliance. Used to register your brand with carriers.
              </p>
              <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 6, padding: "12px 16px", marginBottom: 28 }}>
                <span className="mono-label">
                  {formData.country === "UK" ? "UK · Regulatory bundle required" : "US · A2P 10DLC registration"}
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <Field label="Legal Business Name" required>
                  <input className="ppm-input" placeholder="Registered legal name (not trading name)"
                    value={formData.legalBusinessName}
                    onChange={e => set("legalBusinessName", e.target.value)} autoFocus />
                </Field>

                <Field label={formData.country === "UK" ? "Company Registration Number" : "EIN (Tax ID)"} required>
                  <input className="ppm-input"
                    placeholder={formData.country === "UK" ? "e.g. 12345678" : "e.g. 12-3456789"}
                    value={formData.einOrRegNumber}
                    onChange={e => set("einOrRegNumber", e.target.value)} />
                </Field>

                <Field label="SMS Use Case Description" required>
                  <textarea className="ppm-input"
                    placeholder="Describe how you'll use SMS. e.g. 'Appointment reminders and follow-ups for fitness coaching clients who have opted in.'"
                    rows={3} value={formData.smsUseCase}
                    onChange={e => set("smsUseCase", e.target.value)}
                    style={{ resize: "vertical" }} />
                </Field>

                <Field label="Sample Message 1" required>
                  <textarea className="ppm-input"
                    placeholder="e.g. 'Hi [Name], your call with us is tomorrow at 2pm. Reply STOP to opt out.'"
                    rows={2} value={formData.sampleMessage1}
                    onChange={e => set("sampleMessage1", e.target.value)}
                    style={{ resize: "vertical" }} />
                </Field>

                <Field label="Sample Message 2" required>
                  <textarea className="ppm-input"
                    placeholder="e.g. 'Hey [Name], just checking in — are you still interested in [Offer]? Reply STOP to opt out.'"
                    rows={2} value={formData.sampleMessage2}
                    onChange={e => set("sampleMessage2", e.target.value)}
                    style={{ resize: "vertical" }} />
                </Field>
              </div>

              <div style={{ display: "flex", gap: 10, marginTop: 32 }}>
                <button className="ppm-btn-ghost" onClick={goBack}>Back</button>
                <button className="ppm-btn" style={{ flex: 1 }} onClick={goNext} disabled={!canProceed()}>
                  Submit
                  <ArrowRight />
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 5: Done ── */}
          {step === 5 && (
            <div className="animate-fade-up" style={{ textAlign: "center", paddingTop: 16, paddingBottom: 16 }}>
              <div className="animate-check-pop" style={{
                width: 72, height: 72, borderRadius: "50%",
                background: "#A3E635", display: "flex",
                alignItems: "center", justifyContent: "center",
                margin: "0 auto 28px",
              }}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                  <polyline points="7,17 13,23 25,10" stroke="#0C0C0C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <div className="mono-label-green" style={{ marginBottom: 12 }}>Step 05 · Confirmation</div>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(30px, 5vw, 44px)", lineHeight: 1.1, color: "#fff", marginBottom: 16 }}>
                Done — see you<br />on the call.
              </h2>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 15, lineHeight: 1.7, maxWidth: 420, margin: "0 auto 36px" }}>
                All your details have been submitted. Make sure this is completed before your onboarding call so we can skip the setup and get straight into it.
              </p>

              <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "20px 24px", textAlign: "left", marginBottom: 28 }}>
                <div className="mono-label" style={{ marginBottom: 16 }}>Submitted</div>
                {([
                  { label: "Business", value: formData.businessName },
                  { label: "Country", value: formData.country },
                  { label: "Offer", value: formData.offerName },
                  { label: "Legal name", value: formData.legalBusinessName },
                  { label: "FB Access", value: formData.fbBmConfirmed ? "Granted" : "—" },
                ] as { label: string; value: string }[]).filter(r => r.value).map(row => (
                  <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <span style={{ fontSize: 12, fontFamily: "var(--font-mono)", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{row.label}</span>
                    <span style={{ fontSize: 14, fontWeight: 500, color: "#fff" }}>{row.value}</span>
                  </div>
                ))}
              </div>

              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-mono)" }}>
                Questions? hello@ppm.com.au
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

/* ── Sub-components ── */

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="field-label">
        {label}{required && <span>*</span>}
      </label>
      {children}
    </div>
  );
}

function StepNav({ onBack, onNext, canNext }: { onBack: () => void; onNext: () => void; canNext: boolean }) {
  return (
    <div style={{ display: "flex", gap: 10, marginTop: 32 }}>
      <button className="ppm-btn-ghost" onClick={onBack}>Back</button>
      <button className="ppm-btn" style={{ flex: 1 }} onClick={onNext} disabled={!canNext}>
        Continue
        <ArrowRight />
      </button>
    </div>
  );
}

function PPMLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-label="PPM">
      <rect x="6" y="6" width="16" height="16" transform="rotate(45 14 14)" fill="#A3E635" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
