// src/app/admin/(dashboard)/layout.tsx
'use client';
import AdminNav from '../AdminNav';
import styles from './layout.module.scss';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.shell}>
      <AdminNav />
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}
