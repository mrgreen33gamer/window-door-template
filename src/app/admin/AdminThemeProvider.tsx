// src/app/admin/AdminThemeProvider.tsx
// Dark / light theme for the admin shell. Persists to localStorage;
// defaults to system preference on first visit.
'use client';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

export type AdminTheme = 'dark' | 'light';

interface AdminThemeContextValue {
  theme: AdminTheme;
  setTheme: (t: AdminTheme) => void;
  toggleTheme: () => void;
  ready: boolean;
}

const STORAGE_KEY = 'hvac-admin-theme';

const AdminThemeContext = createContext<AdminThemeContextValue>({
  theme: 'dark',
  setTheme: () => {},
  toggleTheme: () => {},
  ready: false,
});

export function useAdminTheme() {
  return useContext(AdminThemeContext);
}

function getSystemTheme(): AdminTheme {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function readStoredTheme(): AdminTheme | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === 'dark' || v === 'light') return v;
  } catch { /* private mode */ }
  return null;
}

export default function AdminThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<AdminTheme>('dark');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = readStoredTheme();
    setThemeState(stored ?? getSystemTheme());
    setReady(true);
  }, []);

  const setTheme = useCallback((t: AdminTheme) => {
    setThemeState(t);
    try { localStorage.setItem(STORAGE_KEY, t); } catch { /* ignore */ }
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem(STORAGE_KEY, next); } catch { /* ignore */ }
      return next;
    });
  }, []);

  return (
    <AdminThemeContext.Provider value={{ theme, setTheme, toggleTheme, ready }}>
      <div className="adminThemeRoot" data-theme={theme} data-ready={ready ? '1' : '0'}>
        {children}
      </div>
    </AdminThemeContext.Provider>
  );
}
