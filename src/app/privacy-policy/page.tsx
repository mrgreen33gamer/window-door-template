// src/app/policy/page.tsx
import styles from './page.module.scss';

export default function PolicyPage() {
  return (
    <main className={styles.pageWrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.effective}>Effective Date: September 15, 2025</p>

        <div className={styles.content}>
          
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>1. Introduction</h2>
            <p className={styles.text}>
              Scott Applications ("we," "us," or "our") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>2. Information We Collect</h2>
            
            <h3 className={styles.subTitle}>Personal Information</h3>
            <ul className={styles.list}>
              <li>Name and Business Name</li>
              <li>Email Address</li>
              <li>Phone Number</li>
              <li>Project Details</li>
            </ul>

            <h3 className={styles.subTitle}>Non-Personal Information</h3>
            <ul className={styles.list}>
              <li>IP Address &amp; City-Level Location</li>
              <li>Device Type, Operating System, and Browser</li>
              <li>Page Views and Session Data</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>3. How We Use Your Information</h2>
            <p className={styles.text}>
              We use the information we collect to provide and improve our services, communicate with you, analyze website usage, and comply with legal obligations.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>4. Third-Party Services</h2>
            <p className={styles.text}>
              We may use trusted third-party services such as Google reCAPTCHA, SMTP2GO for email, MongoDB for data storage, and geolocation APIs. 
              These services have their own privacy policies.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>5. Your Rights</h2>
            <p className={styles.text}>
              You have the right to access, correct, or delete your personal information. 
              To exercise these rights, please contact us at{' '}
              <a href="mailto:contact@scottapps.com" className={styles.link}>
                contact@scottapps.com
              </a>.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>6. Contact Us</h2>
            <p className={styles.text}>
              If you have any questions about this Privacy Policy, please feel free to reach out.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}