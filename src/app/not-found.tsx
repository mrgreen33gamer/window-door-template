"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation, faHouse, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";
import Header from "#/GeneralComponents/Header/Header";
import styles from './not-found.module.scss';

const NotFoundPage: React.FC = () => {
  return (
    <div>
      <main className={styles.notFoundWrapper}>
        <motion.section
          className={styles.content}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Animated warning icon */}
          <motion.div
            className={styles.iconWrapper}
            animate={{
              y: [-12, 12, -12],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <FontAwesomeIcon icon={faTriangleExclamation} className={styles.icon} />
          </motion.div>

          {/* Hero 404 number */}
          <motion.h1
            className={styles.errorCode}
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            404
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Page Not Found
          </motion.p>

          {/* Friendly message */}
          <motion.p
            className={styles.message}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Sorry, the page you&apos;re looking for doesn&apos;t exist.<br />
            Don&apos;t worry — let&apos;s get you back on track!
          </motion.p>

          {/* Modern pill buttons with icons */}
          <motion.div
            className={styles.links}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Link href="/" className={styles.ctaButton}>
              <FontAwesomeIcon icon={faHouse} className={styles.buttonIcon} />
              Back to Homepage
            </Link>
            <Link href="/contact" className={styles.ctaButton}>
              <FontAwesomeIcon icon={faEnvelope} className={styles.buttonIcon} />
              Contact Us
            </Link>
            <Link 
              href="https://www.facebook.com/scottapplications" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.ctaButton}
            >
              <FontAwesomeIcon icon={faFacebookF} className={styles.buttonIcon} />
              Facebook
            </Link>
          </motion.div>
        </motion.section>
      </main>
    </div>
  );
};

export default NotFoundPage;