// lib/geoIpProvider.ts
import { NextRequest } from 'next/server';

// Get real client IP (optimized for Vercel + all platforms)
export function getClientIP(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');
  const vercelIp = req.headers.get('x-vercel-forwarded-for');

  const ip =
    forwarded?.split(',')[0]?.trim() ||
    realIp?.trim() ||
    vercelIp?.split(',')[0]?.trim() ||
    'Unknown';

  return ip !== 'Unknown' && !ip.includes('127.0.0.1') && !ip.includes('::1')
    ? ip
    : 'Unknown';
}

// Get city – local MaxMind first, then free HTTP providers
export async function getCityFromIP(ip: string): Promise<string> {
  if (ip === 'Unknown') return 'Unknown';

  // PRIORITY 1: Local geoip-lite (MaxMind) – fastest & free
  try {
    const geoip = await import('geoip-lite');
    const geo = geoip.lookup(ip);
    if (geo?.city) return geo.city;
  } catch (e: any) {
    console.warn('geoip-lite lookup failed:', e.message);
  }

  // FALLBACK: Free HTTP providers only if local fails
  console.log(`[geoIpProvider] Local lookup failed for ${ip} – trying free providers...`);

  const providers = [
    async () => {
      const res = await fetch(`https://ipapi.co/${ip}/json/`);
      if (res.ok) {
        const data = await res.json();
        return data.city || null;
      }
      return null;
    },
    async () => {
      const res = await fetch(`http://ip-api.com/json/${ip}`);
      if (res.ok) {
        const data = await res.json();
        return data.status === 'success' ? data.city : null;
      }
      return null;
    },
    async () => {
      const res = await fetch(`https://freegeoip.app/json/${ip}`);
      if (res.ok) {
        const data = await res.json();
        return data.city || null;
      }
      return null;
    },
    async () => {
      const res = await fetch(`http://free.ipwhois.io/json/${ip}`);
      if (res.ok) {
        const data = await res.json();
        return data.city || null;
      }
      return null;
    },
    async () => {
      const res = await fetch(`https://freeipapi.com/api/json/${ip}`);
      if (res.ok) {
        const data = await res.json();
        return data.cityName || null;
      }
      return null;
    },
    async () => {
      const res = await fetch(`https://api.db-ip.com/v2/free/${ip}`);
      if (res.ok) {
        const data = await res.json();
        return data.city || null;
      }
      return null;
    },
  ];

  for (const provider of providers) {
    try {
      const city = await provider();
      if (city) return city;
    } catch {}
  }

  return 'Unknown';
}