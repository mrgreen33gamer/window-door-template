// src/app/api/submitContact/route.ts
// ✅ v10: Added journey tracking fields — sessionId, journeyPath, firstTouchSource,
//          lastTouchSource, journeyLength, timeOnSiteSeconds, status, adminNotes, confirmedValue.
//          Also marks JourneySessions as converted on successful lead submission.
import { NextRequest, NextResponse } from 'next/server';
import { MongoDB } from '&/mongodb';
import { getClientIP, getCityFromIP } from '&/geoIpProvider';
import { UAParser } from 'ua-parser-js';
import { ObjectId } from 'mongodb';

const OWNER_EMAIL   = process.env.OWNER_EMAIL   ?? process.env.FROM_EMAIL ?? '';
const FROM_EMAIL    = process.env.FROM_EMAIL     ?? '';
const SMTP2GO_KEY   = process.env.SMTP2GO_API_KEY ?? '';
const SITE_URL      = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.scottapplications.com';

const TEMPLATE_OWNER_NOTIFICATION    = process.env.SMTP2GO_OWNER_TEMPLATE_ID   ?? '';
const TEMPLATE_CUSTOMER_CONFIRMATION = process.env.SMTP2GO_CONFIRM_TEMPLATE_ID ?? '';

function formatTimestamp(): string {
  return new Date().toLocaleString('en-US', {
    weekday:  'short',
    month:    'long',
    day:      'numeric',
    year:     'numeric',
    hour:     'numeric',
    minute:   '2-digit',
    hour12:   true,
    timeZone: 'America/Chicago',
  }) + ' CST';
}

function resolveFormLabel(formVariant: number | string | undefined): string {
  const v = Number(formVariant);
  const labels: Record<number, string> = {
    1: 'Software / General Inquiry Form',
    2: 'Web Design Inquiry Form',
    3: 'Graphic Design Inquiry Form',
    4: 'Marketing / SEO Inquiry Form',
    0: 'Multi-Step Proposal Form',
  };
  return labels[v] ?? 'Website Contact Form';
}

function resolveSubjectLine(
  formVariant: number | string | undefined,
  name: string,
  cityName?: string,
  services?: string[],
): string {
  const v    = Number(formVariant);
  const city = cityName ? ` — ${cityName}` : '';
  if (v === 0 && services?.length) {
    return `🚀 New Proposal Request from ${name}${city} [${services.join(', ')}]`;
  }
  const serviceMap: Record<number, string> = {
    1: '💻 New Software Lead',
    2: '🌐 New Web Design Lead',
    3: '🎨 New Graphic Design Lead',
    4: '📣 New Marketing Lead',
  };
  return `${serviceMap[v] ?? '📋 New Lead'} from ${name}${city}`;
}

async function sendEmail(payload: object): Promise<boolean> {
  const res = await fetch('https://api.smtp2go.com/v3/email/send', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ api_key: SMTP2GO_KEY, ...payload }),
  });
  if (!res.ok) {
    console.error('SMTP2GO error:', await res.text());
    return false;
  }
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const {
      // Core contact fields
      name,
      email,
      phone,
      message,
      // Proposal / service fields
      businessName,
      services,
      serviceType,
      budget,
      additionalInfo,
      // Context
      cityName,
      slug,
      spot,
      formVariant,
      // reCAPTCHA
      recaptchaToken,
      // ✅ NEW: Journey tracking fields (sent by updated form variants)
      sessionId,
      journeyPath,
      firstTouchSource,
      timeOnSiteSeconds,
    } = data;

    // ── Validation ────────────────────────────────────────────────────────────
    if (!name || !email || !recaptchaToken) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // ── reCAPTCHA verification ────────────────────────────────────────────────
    const recaptchaRes  = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
      { method: 'POST' },
    );
    const recaptchaData = await recaptchaRes.json();

    if (!recaptchaData.success || recaptchaData.score < 0.5) {
      return NextResponse.json({ message: 'reCAPTCHA verification failed' }, { status: 400 });
    }

    // ── Enrichment ────────────────────────────────────────────────────────────
    const ip        = getClientIP(req);
    const ipCity    = await getCityFromIP(ip);
    const isDevTest = ip === 'Unknown' || ip.includes('127.0.0.1') || ip.includes('::1')
                      || req.headers.get('x-developer-test') === 'true';

    const ua          = req.headers.get('user-agent') ?? 'Unknown';
    const parser      = new UAParser(ua);
    const deviceType  = parser.getDevice().type
                        ? `${parser.getDevice().type!.charAt(0).toUpperCase()}${parser.getDevice().type!.slice(1)}`
                        : 'Desktop';
    const osName      = parser.getOS().name      ?? 'Unknown';
    const browserName = parser.getBrowser().name ?? 'Unknown';

    const db            = await MongoDB.getDb();
    const latestConsent = await db.collection('ConsentTracking')
                            .findOne({ ip }, { sort: { timestamp: -1 } });

    const timestamp   = formatTimestamp();
    const formLabel   = resolveFormLabel(formVariant);
    const subject     = resolveSubjectLine(formVariant, name, cityName, services);
    const niceSpot    = spot || 'Direct';
    const servicesStr = Array.isArray(services)
                        ? services.join(', ')
                        : (serviceType ?? 'Not specified');
    const budgetStr   = budget && budget !== 'Not specified' ? budget : 'Not provided';
    const messageBody = message || additionalInfo || 'No additional information provided';
    const referrer    = req.headers.get('referer') ?? 'Direct';

    // ── Journey data processing ───────────────────────────────────────────────
    const safeJourneyPath     = Array.isArray(journeyPath) ? journeyPath : [];
    const journeyLength       = safeJourneyPath.length;
    const safeFirstTouch      = firstTouchSource ?? safeJourneyPath[0] ?? null;
    const lastTouchSource     = slug ?? null;
    const safeTimeOnSite      = typeof timeOnSiteSeconds === 'number' ? timeOnSiteSeconds : null;

    // ── 1. Owner notification email ───────────────────────────────────────────
    await sendEmail({
      to:          OWNER_EMAIL,
      sender:      FROM_EMAIL,
      subject,
      template_id: TEMPLATE_OWNER_NOTIFICATION,
      template_data: {
        name,
        email,
        phone:          phone        ?? 'Not provided',
        businessName:   businessName ?? 'Not provided',
        services:       servicesStr,
        budget:         budgetStr,
        message:        messageBody,
        formLabel,
        cityName:       cityName     ?? 'Not specified',
        pageSlug:       slug         ?? 'Unknown',
        spot:           niceSpot,
        referrer,
        ipCity:         ipCity       ?? 'Unknown',
        ip,
        deviceType,
        os:             osName,
        browser:        browserName,
        userAgent:      ua,
        consent:        latestConsent?.consent ? 'Yes' : 'No',
        recaptchaScore: recaptchaData.score?.toFixed(2) ?? '0.00',
        isDevTest:      isDevTest ? 'YES — test entry' : '',
        // Journey context in email
        journeyPath:    safeJourneyPath.join(' → ') || 'Direct',
        journeyLength:  String(journeyLength),
        firstTouch:     safeFirstTouch ?? 'Direct',
        timeOnSite:     safeTimeOnSite ? `${safeTimeOnSite}s` : 'Unknown',
        timestamp,
        siteUrl:        SITE_URL,
      },
    });

    // ── 2. Customer confirmation email ────────────────────────────────────────
    await sendEmail({
      to:          email,
      sender:      FROM_EMAIL,
      subject:     `We received your inquiry, ${name}! — Scott Applications`,
      template_id: TEMPLATE_CUSTOMER_CONFIRMATION,
      template_data: {
        name,
        services:  servicesStr,
        budget:    budgetStr,
        siteUrl:   SITE_URL,
        timestamp,
      },
    });

    // ── 3. Save lead to MongoDB ───────────────────────────────────────────────
    const leadDocument = {
      formType:    formVariant === 0 || !formVariant ? 'ProposalForm' : 'ContactForm',
      formVariant: Number(formVariant) || 0,
      formLabel,
      // Identity
      name,
      email,
      phone:        phone        ?? null,
      businessName: businessName ?? null,
      // Intent
      services:    Array.isArray(services) ? services : (serviceType ? [serviceType] : []),
      serviceType: serviceType  ?? null,
      budget:      budgetStr,
      message:     messageBody,
      // Context
      cityName:    cityName ?? null,
      pageSlug:    slug     ?? null,
      spot:        niceSpot,
      referrer,
      // Device / location
      ip,
      ipCity,
      deviceType,
      os:          osName,
      browser:     browserName,
      userAgent:   ua,
      // Signals
      consent:        latestConsent?.consent ?? false,
      recaptchaScore: recaptchaData.score    ?? 0,
      // Meta
      source:     `${formLabel} — ${niceSpot}`,
      isDevTest,
      submittedAt: new Date(),
      // ✅ NEW: Journey tracking fields
      sessionId:         sessionId        ?? null,
      journeyPath:       safeJourneyPath,
      firstTouchSource:  safeFirstTouch,
      lastTouchSource,
      journeyLength,
      timeOnSiteSeconds: safeTimeOnSite,
      // ✅ NEW: CRM fields — set defaults, updated by admin dashboard
      status:          'new',
      statusUpdatedAt: new Date(),
      adminNotes:      '',
      confirmedValue:  null,
    };

    const insertResult = await db.collection('Leads').insertOne(leadDocument);

    // ── 4. Mark JourneySession as converted ───────────────────────────────────
    if (sessionId) {
      db.collection('JourneySessions').updateOne(
        { sessionId },
        { $set: { converted: true, leadId: insertResult.insertedId } },
      ).catch(() => {}); // Non-blocking, non-critical
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error('submitContact error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
