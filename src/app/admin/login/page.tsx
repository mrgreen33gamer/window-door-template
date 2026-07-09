// src/app/admin/login/page.tsx
// FIXED:
//  1. Shows setup form only if no admin exists (checked via /api/admin/setup GET)
//  2. Redirects to /admin if already authenticated
//  3. Session-expiry redirect: middleware handles this, but login page double-checks
'use client';
import { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from './styles.module.scss';

export default function AdminLoginPage() {
  const { data: session, status } = useSession();
  const router  = useRouter();

  const [setupComplete, setSetupComplete] = useState<boolean | null>(null);
  const [name,     setName]     = useState('');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');

  // If already authenticated, redirect to dashboard immediately
  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/admin');
    }
  }, [status, router]);

  // Check if admin account exists
  useEffect(() => {
    fetch('/api/admin/setup')
      .then(r => r.json())
      .then(data => setSetupComplete(data.setupComplete))
      .catch(() => setSetupComplete(true)); // fallback: assume setup done, show login
  }, []);

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('All fields are required.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? 'Setup failed.'); setLoading(false); return; }

      // Auto-login after setup
      const loginResult = await signIn('credentials', {
        redirect: false,
        email: email.trim(),
        password,
      });
      if (loginResult?.ok) {
        router.push('/admin');
      } else {
        setError('Account created — please sign in.');
        setSetupComplete(true);
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Email and password are required.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email:    email.trim(),
        password,
      });
      if (result?.ok) {
        router.push('/admin');
      } else {
        setError('Invalid email or password.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Loading state while session status resolves or setup check is in flight
  if (status === 'loading' || setupComplete === null) {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <div className={styles.loading}>
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.dot} />
          </div>
        </div>
      </div>
    );
  }

  // Already authenticated — show brief redirect message
  if (status === 'authenticated') {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <p className={styles.redirectMsg}>Redirecting to dashboard…</p>
        </div>
      </div>
    );
  }

  const isSetup = !setupComplete;

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.brand}>
          <span className={styles.eyebrow}>Scott Applications</span>
          <h1 className={styles.title}>Admin</h1>
        </div>

        {isSetup && (
          <p className={styles.setupBadge}>⚡ First-time setup — create your admin account</p>
        )}

        {error && <p className={styles.error}>{error}</p>}

        <form onSubmit={isSetup ? handleSetup : handleLogin} className={styles.form} noValidate>
          {isSetup && (
            <div className={styles.field}>
              <label className={styles.label} htmlFor="admin-name">Full Name</label>
              <input
                id="admin-name"
                className={styles.input}
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Joshua Feliciano"
                autoComplete="name"
                disabled={loading}
              />
            </div>
          )}

          <div className={styles.field}>
            <label className={styles.label} htmlFor="admin-email">Email</label>
            <input
              id="admin-email"
              className={styles.input}
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@scottapps.com"
              autoComplete="email"
              disabled={loading}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              className={styles.input}
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder={isSetup ? 'Min. 8 characters' : '••••••••'}
              autoComplete={isSetup ? 'new-password' : 'current-password'}
              disabled={loading}
            />
          </div>

          <button type="submit" className={styles.btn} disabled={loading}>
            {loading ? 'Please wait…' : isSetup ? 'Create Account & Sign In' : 'Sign In'}
          </button>
        </form>

        <p className={styles.footer}>
          {isSetup
            ? 'This form only appears once. After setup it will show the login form.'
            : 'Authorized personnel only.'}
        </p>
      </div>
    </div>
  );
}
