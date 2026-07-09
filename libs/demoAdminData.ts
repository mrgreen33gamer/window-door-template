// libs/demoAdminData.ts
// Deterministic sample payloads for demo admin login (template marketplace preview).
import { fillSeries, getRangeDate, isHourlyRange } from './adminRange';

function hash(n: number): number {
  // Stable 0–1 from integer seed
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function seriesCounts(range: string, base: number, amp: number): { date: string; count: number }[] {
  const since = getRangeDate(range) ?? new Date(Date.now() - 30 * 864e5);
  const empty = fillSeries(range, since, []);
  return empty.map((p, i) => ({
    date:  p.date,
    count: Math.max(0, Math.round(base + amp * Math.sin(i / 2.2) + hash(i + base) * amp * 0.6)),
  }));
}

const DEMO_CITIES = [
  { city: 'Waco',           lng: -97.1467, lat: 31.5493 },
  { city: 'Temple',         lng: -97.3427, lat: 31.0982 },
  { city: 'Killeen',        lng: -97.7278, lat: 31.1171 },
  { city: 'Hewitt',         lng: -97.1958, lat: 31.4604 },
  { city: 'Woodway',        lng: -97.2197, lat: 31.5110 },
  { city: 'Austin',         lng: -97.7431, lat: 30.2672 },
  { city: 'Round Rock',     lng: -97.6789, lat: 30.5083 },
  { city: 'Dallas',         lng: -96.7970, lat: 32.7767 },
];

const DEMO_SERVICES = [
  'AC Repair', 'Heating', 'Installation', 'Maintenance', 'Duct Cleaning', 'Indoor Air Quality',
];

export function getDemoAnalytics(range: string) {
  const pageViewsByDay = seriesCounts(range, isHourlyRange(range) ? 14 : 42, isHourlyRange(range) ? 8 : 18);
  const leadsByDay     = seriesCounts(range, isHourlyRange(range) ? 1 : 3, isHourlyRange(range) ? 1.2 : 2.5);
  const uniqueSessions = pageViewsByDay.reduce((a, p) => a + p.count, 0);
  const leadsThisPeriod = leadsByDay.reduce((a, p) => a + p.count, 0);
  const ctaClicks = Math.round(uniqueSessions * 0.18);
  const pageViews = Math.round(uniqueSessions * 2.4);

  return {
    range,
    since: (getRangeDate(range) ?? new Date()).toISOString(),
    demo: true,
    totalLeads: 128,
    leadsThisPeriod,
    devLeadsThisPeriod: Math.max(2, Math.round(leadsThisPeriod * 0.08)),
    uniqueSessions,
    conversionRate: uniqueSessions > 0
      ? `${((leadsThisPeriod / uniqueSessions) * 100).toFixed(1)}%`
      : '0.0%',
    avgJourneyLength: '3.4',
    topConvertingPage: '/services/ac-repair',
    leadsByDay,
    leadsByService: DEMO_SERVICES.slice(0, 6).map((s, i) => ({
      service: s,
      label: s,
      count: Math.max(1, Math.round(leadsThisPeriod * (0.28 - i * 0.035))),
    })),
    leadsByCity: DEMO_CITIES.slice(0, 6).map((c, i) => ({
      ...c,
      count: Math.max(1, 18 - i * 2),
    })),
    pageViewsByCity: DEMO_CITIES.map((c, i) => ({
      ...c,
      count: Math.max(2, 55 - i * 6),
    })),
    topJourneyPaths: [
      { path: ['/', '/services/ac-repair', '/contact'], count: 14 },
      { path: ['/', '/services', '/services/heating', '/contact'], count: 9 },
      { path: ['/services/ac-repair', '/contact'], count: 7 },
      { path: ['/', '/about', '/contact'], count: 5 },
    ],
    deviceBreakdown: [
      { device: 'mobile', count: Math.round(uniqueSessions * 0.58) },
      { device: 'desktop', count: Math.round(uniqueSessions * 0.34) },
      { device: 'tablet', count: Math.max(1, Math.round(uniqueSessions * 0.08)) },
    ],
    statusBreakdown: [
      { status: 'new', count: 22 },
      { status: 'contacted', count: 18 },
      { status: 'qualified', count: 11 },
      { status: 'converted', count: 9 },
      { status: 'lost', count: 6 },
    ],
    funnel: {
      sessions:    uniqueSessions,
      pageViews,
      ctaClicks,
      submissions: leadsThisPeriod,
    },
  };
}

export function getDemoSessions(range: string) {
  const pageViewsByDay = seriesCounts(range, isHourlyRange(range) ? 16 : 48, isHourlyRange(range) ? 9 : 20);
  const totalPageViews = pageViewsByDay.reduce((a, p) => a + p.count, 0);
  const uniqueSessions = Math.max(1, Math.round(totalPageViews / 2.3));

  return {
    range,
    since: (getRangeDate(range) ?? new Date()).toISOString(),
    demo: true,
    totalPageViews,
    uniqueSessions,
    deviceBreakdown: [
      { device: 'mobile', count: Math.round(totalPageViews * 0.56) },
      { device: 'desktop', count: Math.round(totalPageViews * 0.36) },
      { device: 'tablet', count: Math.max(1, Math.round(totalPageViews * 0.08)) },
    ],
    browserBreakdown: [
      { browser: 'Chrome', count: Math.round(totalPageViews * 0.48) },
      { browser: 'Safari', count: Math.round(totalPageViews * 0.28) },
      { browser: 'Edge', count: Math.round(totalPageViews * 0.12) },
      { browser: 'Firefox', count: Math.round(totalPageViews * 0.08) },
      { browser: 'Other', count: Math.max(1, Math.round(totalPageViews * 0.04)) },
    ],
    topPages: [
      { path: '/', count: Math.round(totalPageViews * 0.22) },
      { path: '/services/ac-repair', count: Math.round(totalPageViews * 0.14) },
      { path: '/contact', count: Math.round(totalPageViews * 0.11) },
      { path: '/services', count: Math.round(totalPageViews * 0.09) },
      { path: '/services/heating', count: Math.round(totalPageViews * 0.08) },
      { path: '/about', count: Math.round(totalPageViews * 0.07) },
      { path: '/service-areas', count: Math.round(totalPageViews * 0.06) },
      { path: '/services/maintenance', count: Math.round(totalPageViews * 0.05) },
    ],
    pageViewsByDay,
  };
}

export function getDemoEvents(range: string) {
  const scale = isHourlyRange(range) ? 0.35 : range === '7d' ? 0.7 : 1;
  const mul = (n: number) => Math.max(1, Math.round(n * scale));

  return {
    range,
    since: (getRangeDate(range) ?? new Date()).toISOString(),
    demo: true,
    topElements: [
      { label: 'Get Free Estimate', page: '/', section: 'WelcomePage', count: mul(86) },
      { label: 'Call Now', page: '/', section: 'Header', count: mul(64) },
      { label: 'Book Service', page: '/services/ac-repair', section: 'CTABanner', count: mul(51) },
      { label: 'Contact Form Submit', page: '/contact', section: 'ContactForm', count: mul(38) },
      { label: 'View Services', page: '/', section: 'ServiceCards', count: mul(33) },
      { label: 'Email Us', page: '/contact', section: 'ContactHero', count: mul(21) },
    ],
    eventsByType: [
      { type: 'click', count: mul(210) },
      { type: 'phone_click', count: mul(72) },
      { type: 'form_submit', count: mul(38) },
      { type: 'email_click', count: mul(24) },
      { type: 'view', count: mul(18) },
    ],
    eventsByPage: [
      { page: '/', count: mul(120) },
      { page: '/services/ac-repair', count: mul(88) },
      { page: '/contact', count: mul(76) },
      { page: '/services/heating', count: mul(44) },
      { page: '/about', count: mul(31) },
    ],
    clicksByHour: Array.from({ length: 24 }, (_, hour) => {
      // Business-hours shaped demo curve
      const peak = hour >= 8 && hour <= 18 ? 1 : 0.25;
      const mid  = hour >= 10 && hour <= 15 ? 1.35 : 1;
      return { hour, count: mul(8 * peak * mid + hash(hour + 3) * 6) };
    }),
  };
}

const DEMO_LEADS = [
  { name: 'Jordan Hale', email: 'jordan.hale@example.com', phone: '(254) 555-0142', services: ['AC Repair'], ipCity: 'Waco', status: 'new', isDevTest: true },
  { name: 'Maya Ortiz', email: 'maya.ortiz@example.com', phone: '(254) 555-0198', services: ['Maintenance'], ipCity: 'Temple', status: 'contacted', isDevTest: true },
  { name: 'Chris Nguyen', email: 'chris.n@example.com', phone: '(512) 555-0133', services: ['Installation'], ipCity: 'Austin', status: 'qualified', isDevTest: true },
  { name: 'Sam Rivera', email: 'sam.rivera@example.com', phone: '(254) 555-0177', services: ['Heating'], ipCity: 'Killeen', status: 'converted', isDevTest: true, confirmedValue: 4200 },
  { name: 'Avery Brooks', email: 'avery.b@example.com', phone: '(254) 555-0110', services: ['Duct Cleaning'], ipCity: 'Hewitt', status: 'new', isDevTest: true },
  { name: 'Riley Chen', email: 'riley.chen@example.com', phone: '(972) 555-0166', services: ['Indoor Air Quality'], ipCity: 'Dallas', status: 'lost', isDevTest: true },
  { name: 'Taylor Kim', email: 'taylor.kim@example.com', phone: '(254) 555-0124', services: ['AC Repair', 'Maintenance'], ipCity: 'Woodway', status: 'contacted', isDevTest: true },
  { name: 'Morgan Lee', email: 'morgan.lee@example.com', phone: '(512) 555-0188', services: ['Installation'], ipCity: 'Round Rock', status: 'qualified', isDevTest: true },
];

export function getDemoLeadsList(range: string, page = 1, limit = 20, status = '', search = '') {
  const sessions = getDemoSessions(range);
  const leadsPerDay = seriesCounts(range, isHourlyRange(range) ? 1 : 2.5, isHourlyRange(range) ? 1 : 2);

  let leads = DEMO_LEADS.map((l, i) => ({
    _id: `demo-lead-${i + 1}`,
    ...l,
    serviceType: l.services[0],
    cityName: l.ipCity,
    budget: '$1,000–$5,000',
    submittedAt: new Date(Date.now() - i * 3.6e6 * 5).toISOString(),
    message: 'Demo lead — sample data for template preview only.',
  }));

  if (status) leads = leads.filter(l => l.status === status);
  if (search) {
    const q = search.toLowerCase();
    leads = leads.filter(l =>
      l.name.toLowerCase().includes(q) ||
      l.email.toLowerCase().includes(q) ||
      l.ipCity.toLowerCase().includes(q)
    );
  }

  const total = leads.length;
  const start = (page - 1) * limit;
  const slice = leads.slice(start, start + limit);

  const leadsByService = DEMO_SERVICES.slice(0, 5).map((label, i) => ({
    label,
    count: Math.max(1, 12 - i * 2),
  }));

  const leadsByCity = DEMO_CITIES.slice(0, 6).map((c, i) => ({
    city: c.city,
    count: Math.max(1, 10 - i),
    lat: c.lat,
    lng: c.lng,
  }));

  return {
    range,
    since: (getRangeDate(range) ?? new Date()).toISOString(),
    demo: true,
    leads: slice,
    total,
    totalDev: total,
    page,
    pages: Math.max(1, Math.ceil(total / limit)),
    leadsPerDay,
    leadsByService,
    leadsByCity,
    // unused but harmless
    _sessionsHint: sessions.uniqueSessions,
  };
}

export function getDemoLeadDetail(id: string) {
  const idx = Number(String(id).replace('demo-lead-', '')) - 1;
  const base = DEMO_LEADS[Math.max(0, Math.min(DEMO_LEADS.length - 1, idx))] ?? DEMO_LEADS[0];
  return {
    demo: true,
    lead: {
      _id: id.startsWith('demo-') ? id : 'demo-lead-1',
      ...base,
      serviceType: base.services[0],
      cityName: base.ipCity,
      budget: '$1,000–$5,000',
      message: 'Looking for same-day AC service. Demo entry for template preview.',
      submittedAt: new Date(Date.now() - 864e5).toISOString(),
      pageSlug: '/contact',
      formLabel: 'Contact Form',
      deviceType: 'mobile',
      os: 'iOS',
      browser: 'Safari',
      journeyPath: ['/', '/services/ac-repair', '/contact'],
      journeyLength: 3,
      timeOnSiteSeconds: 186,
      firstTouchSource: '/',
      lastTouchSource: '/contact',
      adminNotes: 'Demo notes — not saved to a real database.',
      confirmedValue: base.confirmedValue ?? null,
      recaptchaScore: 0.9,
      isDevTest: true,
    },
    journeySession: {
      pages: ['/', '/services/ac-repair', '/contact'],
      firstTouchAt: new Date(Date.now() - 2e6).toISOString(),
      lastTouchAt: new Date(Date.now() - 1e5).toISOString(),
    },
  };
}
