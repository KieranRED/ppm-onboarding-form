import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO = "kierandeclanredpath@gmail.com";

export async function POST(req: NextRequest) {
  const data = await req.json();

  const {
    ghlApiKey,
    ghlSnapshotId,
    onboardingDocUrl,
    masterTrackerUrl,
    setterNames,
    csmSetup,
    showRateThreshold,
  } = data;

  const csmLabel = csmSetup === "sam_only" ? "Just you (all clients default to Sam)" : "Varies per client";
  const threshold = showRateThreshold ? `${showRateThreshold}%` : "Not set (defaults to 50%)";
  const setters = setterNames?.length ? setterNames.join(", ") : "—";

  const html = `
<div style="font-family:ui-sans-serif,system-ui,sans-serif;max-width:600px;margin:0 auto;padding:32px 24px;background:#ffffff;color:#1a1a1a;">
  <div style="display:flex;align-items:center;gap:10px;margin-bottom:28px;">
    <div style="width:20px;height:20px;background:#1a1a1a;border-radius:3px;display:flex;align-items:center;justify-content:center;">
      <div style="width:7px;height:7px;background:#a3e635;border-radius:1px;"></div>
    </div>
    <span style="font-size:13px;font-weight:600;color:#1a1a1a;">Power Performance Marketing</span>
  </div>

  <h1 style="font-size:26px;font-weight:700;letter-spacing:-0.02em;margin:0 0 4px;">New client setup submission</h1>
  <p style="font-size:14px;color:#666;margin:0 0 32px;">Submitted via the onboarding form</p>

  <hr style="border:none;border-top:1px solid #e5e5e5;margin:0 0 28px;" />

  <h2 style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#999;margin:0 0 12px;">01 · GHL Access</h2>
  <table style="width:100%;border-collapse:collapse;margin-bottom:28px;">
    <tr>
      <td style="padding:8px 0;font-size:12px;color:#999;width:160px;">Agency API Key</td>
      <td style="padding:8px 0;font-size:13px;font-family:ui-monospace,monospace;word-break:break-all;">${ghlApiKey}</td>
    </tr>
    <tr style="border-top:1px solid #f0f0f0;">
      <td style="padding:8px 0;font-size:12px;color:#999;">Snapshot ID</td>
      <td style="padding:8px 0;font-size:13px;font-family:ui-monospace,monospace;">${ghlSnapshotId}</td>
    </tr>
  </table>

  <h2 style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#999;margin:0 0 12px;">02 · Drive</h2>
  <table style="width:100%;border-collapse:collapse;margin-bottom:28px;">
    <tr>
      <td style="padding:8px 0;font-size:12px;color:#999;width:160px;">Onboarding Doc</td>
      <td style="padding:8px 0;font-size:13px;word-break:break-all;"><a href="${onboardingDocUrl}" style="color:#65a30d;">${onboardingDocUrl}</a></td>
    </tr>
    <tr style="border-top:1px solid #f0f0f0;">
      <td style="padding:8px 0;font-size:12px;color:#999;">Master Tracker</td>
      <td style="padding:8px 0;font-size:13px;word-break:break-all;"><a href="${masterTrackerUrl}" style="color:#65a30d;">${masterTrackerUrl}</a></td>
    </tr>
  </table>

  <h2 style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#999;margin:0 0 12px;">03 · Team &amp; Setup</h2>
  <table style="width:100%;border-collapse:collapse;margin-bottom:28px;">
    <tr>
      <td style="padding:8px 0;font-size:12px;color:#999;width:160px;">Setters</td>
      <td style="padding:8px 0;font-size:13px;">${setters}</td>
    </tr>
    <tr style="border-top:1px solid #f0f0f0;">
      <td style="padding:8px 0;font-size:12px;color:#999;">CSM Assignment</td>
      <td style="padding:8px 0;font-size:13px;">${csmLabel}</td>
    </tr>
    <tr style="border-top:1px solid #f0f0f0;">
      <td style="padding:8px 0;font-size:12px;color:#999;">Show-rate threshold</td>
      <td style="padding:8px 0;font-size:13px;">${threshold}</td>
    </tr>
  </table>

  <hr style="border:none;border-top:1px solid #e5e5e5;margin:0 0 20px;" />
  <p style="font-size:12px;color:#999;margin:0;">Submitted at ${new Date().toLocaleString("en-AU", { timeZone: "Australia/Sydney", dateStyle: "medium", timeStyle: "short" })} AEST</p>
</div>
  `.trim();

  const { error } = await resend.emails.send({
    from: "PPM Onboarding <onboarding@resend.dev>",
    to: TO,
    subject: "New client setup submission",
    html,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
