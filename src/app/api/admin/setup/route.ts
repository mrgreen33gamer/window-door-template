// src/app/api/admin/setup/route.ts
//
// FIXED:
//  - POST: Hard block if any admin already exists (only 1 account ever allowed)
//  - GET: Returns setupComplete status for login page
//  - NEW: Sends a polished welcome / "your dashboard is ready" email to the
//         newly-created admin via SMTP2GO (same provider as submitContact).
//         Email send is best-effort — a failure here will not block account
//         creation (the admin can still sign in).
import { NextRequest, NextResponse } from 'next/server';
import { MongoDB } from '&/mongodb';
import bcrypt from 'bcryptjs';

const FROM_EMAIL  = process.env.FROM_EMAIL      ?? '';
const SMTP2GO_KEY = process.env.SMTP2GO_API_KEY ?? '';
const SITE_URL    = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.arcticairhvac.com';
const BRAND_NAME  = process.env.NEXT_PUBLIC_BRAND_NAME ?? 'Arctic Air HVAC';

// ── Welcome email ─────────────────────────────────────────────────────────────
function buildWelcomeEmailHtml(name: string, email: string): string {
  const dashboardUrl = `${SITE_URL.replace(/\/$/, '')}/admin`;
  const safeName     = name.replace(/[<>&"']/g, '');
  const safeEmail    = email.replace(/[<>&"']/g, '');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Your admin dashboard is ready</title>
</head>
<body style="margin:0;padding:0;background:#0a130a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#e6f1e6;">
  <!-- Wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0a130a;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <!-- Card -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"
               style="max-width:600px;width:100%;background:#111d11;border:1px solid rgba(255,255,255,0.08);border-radius:16px;overflow:hidden;">

          <!-- Accent bar -->
          <tr>
            <td style="height:4px;background:linear-gradient(90deg,#16def9 0%,#f97316 100%);font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="padding:36px 40px 12px 40px;">
              <div style="display:inline-block;padding:6px 12px;border:1px solid rgba(22,222,249,0.35);border-radius:999px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#16def9;">
                Admin Dashboard · Live
              </div>
              <h1 style="margin:18px 0 8px 0;font-size:28px;line-height:1.25;font-weight:700;color:#ffffff;">
                You're all set, ${safeName}.
              </h1>
              <p style="margin:0;font-size:15px;line-height:1.55;color:rgba(230,241,230,0.72);">
                Your <strong style="color:#ffffff;">${BRAND_NAME}</strong> admin dashboard has been created and is ready to use. Sign in any time to review leads, sessions, page-view geography, and conversion analytics.
              </p>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:24px 40px 8px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="border-radius:10px;background:#f97316;">
                    <a href="${dashboardUrl}"
                       style="display:inline-block;padding:14px 28px;font-size:15px;font-weight:600;color:#0d1b2a;text-decoration:none;border-radius:10px;letter-spacing:0.01em;">
                      Open Your Dashboard →
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:12px 0 0 0;font-size:12px;color:rgba(230,241,230,0.45);">
                Or visit: <a href="${dashboardUrl}" style="color:#16def9;text-decoration:none;">${dashboardUrl}</a>
              </p>
            </td>
          </tr>

          <!-- Account summary -->
          <tr>
            <td style="padding:28px 40px 8px 40px;">
              <p style="margin:0 0 12px 0;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(230,241,230,0.45);">
                Account Summary
              </p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
                     style="background:#0d1b0d;border:1px solid rgba(255,255,255,0.06);border-radius:12px;">
                <tr>
                  <td style="padding:16px 18px;border-bottom:1px solid rgba(255,255,255,0.06);">
                    <span style="display:inline-block;width:80px;font-size:12px;color:rgba(230,241,230,0.55);">Name</span>
                    <span style="font-size:14px;color:#ffffff;font-weight:500;">${safeName}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 18px;border-bottom:1px solid rgba(255,255,255,0.06);">
                    <span style="display:inline-block;width:80px;font-size:12px;color:rgba(230,241,230,0.55);">Email</span>
                    <span style="font-size:14px;color:#ffffff;font-weight:500;">${safeEmail}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 18px;">
                    <span style="display:inline-block;width:80px;font-size:12px;color:rgba(230,241,230,0.55);">Role</span>
                    <span style="display:inline-block;padding:3px 10px;background:rgba(22,222,249,0.12);border:1px solid rgba(22,222,249,0.3);border-radius:999px;font-size:11px;color:#16def9;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;">Admin</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- What's inside -->
          <tr>
            <td style="padding:28px 40px 8px 40px;">
              <p style="margin:0 0 14px 0;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(230,241,230,0.45);">
                What's Inside
              </p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:0 0 14px 0;font-size:14px;color:rgba(230,241,230,0.85);line-height:1.5;">
                    <span style="color:#16def9;font-weight:700;margin-right:8px;">→</span>
                    <strong style="color:#ffffff;">Leads</strong> — every form submission with full journey, device, and geo context
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 0 14px 0;font-size:14px;color:rgba(230,241,230,0.85);line-height:1.5;">
                    <span style="color:#16def9;font-weight:700;margin-right:8px;">→</span>
                    <strong style="color:#ffffff;">Sessions</strong> — live visitor tracking with referrer and device breakdown
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 0 14px 0;font-size:14px;color:rgba(230,241,230,0.85);line-height:1.5;">
                    <span style="color:#16def9;font-weight:700;margin-right:8px;">→</span>
                    <strong style="color:#ffffff;">Events</strong> — clicks, phone taps, email taps, form submissions
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 0 14px 0;font-size:14px;color:rgba(230,241,230,0.85);line-height:1.5;">
                    <span style="color:#16def9;font-weight:700;margin-right:8px;">→</span>
                    <strong style="color:#ffffff;">Analytics</strong> — funnel, conversion rate, top pages, journey paths
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Security note -->
          <tr>
            <td style="padding:20px 40px 8px 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
                     style="background:rgba(249,115,22,0.06);border:1px solid rgba(249,115,22,0.18);border-radius:10px;">
                <tr>
                  <td style="padding:14px 16px;font-size:13px;color:rgba(230,241,230,0.72);line-height:1.5;">
                    <strong style="color:#f97316;">Security note —</strong>
                    this email confirms a one-time admin account creation on your site. Only one admin account is permitted, so if you didn't initiate this, please rotate your database credentials immediately.
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:28px 40px 36px 40px;border-top:1px solid rgba(255,255,255,0.06);margin-top:24px;">
              <p style="margin:24px 0 6px 0;font-size:12px;color:rgba(230,241,230,0.45);line-height:1.5;">
                ${BRAND_NAME} · Admin dashboard
              </p>
              <p style="margin:0;font-size:11px;color:rgba(230,241,230,0.32);line-height:1.5;">
                You're receiving this because the admin account was just created on
                <a href="${SITE_URL}" style="color:rgba(22,222,249,0.7);text-decoration:none;">${SITE_URL.replace(/^https?:\/\//, '')}</a>.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildWelcomeEmailText(name: string, email: string): string {
  const dashboardUrl = `${SITE_URL.replace(/\/$/, '')}/admin`;
  return [
    `You're all set, ${name}.`,
    ``,
    `Your ${BRAND_NAME} admin dashboard has been created and is ready to use.`,
    ``,
    `Sign in:  ${dashboardUrl}`,
    ``,
    `Account summary`,
    `---------------`,
    `Name:  ${name}`,
    `Email: ${email}`,
    `Role:  Admin`,
    ``,
    `What's inside`,
    `-------------`,
    `- Leads — every form submission with full journey, device, and geo context`,
    `- Sessions — live visitor tracking with referrer and device breakdown`,
    `- Events — clicks, phone taps, email taps, form submissions`,
    `- Analytics — funnel, conversion rate, top pages, journey paths`,
    ``,
    `Security note: this email confirms a one-time admin account creation on your`,
    `site. Only one admin account is permitted, so if you didn't initiate this,`,
    `please rotate your database credentials immediately.`,
    ``,
    `${BRAND_NAME}`,
    SITE_URL,
  ].join('\n');
}

async function sendWelcomeEmail(name: string, email: string): Promise<boolean> {
  if (!SMTP2GO_KEY || !FROM_EMAIL) {
    console.warn('[admin/setup] SMTP2GO not configured — skipping welcome email');
    return false;
  }

  try {
    const res = await fetch('https://api.smtp2go.com/v3/email/send', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({
        api_key:   SMTP2GO_KEY,
        to:        [email],
        sender:    FROM_EMAIL,
        subject:   `Your ${BRAND_NAME} admin dashboard is ready`,
        html_body: buildWelcomeEmailHtml(name, email),
        text_body: buildWelcomeEmailText(name, email),
      }),
    });

    if (!res.ok) {
      console.error('[admin/setup] SMTP2GO error:', await res.text().catch(() => '<unreadable>'));
      return false;
    }
    return true;
  } catch (err) {
    console.error('[admin/setup] welcome email send failed:', err);
    return false;
  }
}

// POST — create the first (and only) admin account
export async function POST(req: NextRequest) {
  try {
    const db = await MongoDB.getDb();

    // ✅ CRITICAL FIX: Block if ANY admin already exists
    const existingAdmin = await db.collection('AdminUsers').findOne(
      {},
      { projection: { _id: 1 } },
    );
    if (existingAdmin) {
      return NextResponse.json(
        { error: 'Admin account already exists. Setup is not available.' },
        { status: 403 },
      );
    }

    const { name, email, password } = await req.json();

    if (!name?.trim() || !email?.trim() || !password) {
      return NextResponse.json({ error: 'Name, email, and password are required.' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 });
    }

    const nameClean    = name.trim();
    const emailClean   = email.toLowerCase().trim();
    const passwordHash = await bcrypt.hash(password, 12);

    await db.collection('AdminUsers').insertOne({
      name:        nameClean,
      email:       emailClean,
      passwordHash,
      role:        'admin',
      createdAt:   new Date(),
      lastLoginAt: null,
    });

    // Ensure unique index on email
    await db.collection('AdminUsers').createIndex({ email: 1 }, { unique: true });

    // ── NEW: Send welcome / "your dashboard is ready" email ────────────────────
    // Best-effort — logged but non-blocking. If SMTP2GO is down or misconfigured
    // the admin account is still created and they can still sign in.
    sendWelcomeEmail(nameClean, emailClean).catch(err =>
      console.error('[admin/setup] sendWelcomeEmail unexpected:', err),
    );

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error('[admin/setup POST] error:', err);
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}

// GET — returns whether setup has been completed
export async function GET() {
  try {
    const db            = await MongoDB.getDb();
    const existingAdmin = await db.collection('AdminUsers').findOne(
      {},
      { projection: { _id: 1 } },
    );
    return NextResponse.json({ setupComplete: !!existingAdmin });
  } catch {
    return NextResponse.json({ setupComplete: false });
  }
}