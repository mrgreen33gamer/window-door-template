'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import BlogTag from '../BlogTag/BlogTag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCalendarAlt, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.scss';

interface BlogHeroProps {
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  category?: string;
  date?: string;
  readTime?: number;
  authorName?: string;
}

export default function BlogHero({
  title,
  description,
  imageSrc,
  imageAlt = '',
  category,
  date,
  readTime,
  authorName = 'Scott Applications',
}: BlogHeroProps) {
  return (
    <motion.header
      className={styles.hero}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {imageSrc && (
        <motion.div
          className={styles.imageWrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.55, ease: 'easeOut' }}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            style={{ objectFit: 'cover' }}
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
          />
          <div className={styles.imageOverlay} aria-hidden="true" />
        </motion.div>
      )}

      <div className={styles.inner}>
        <Link href="/blogs" className={styles.backLink}>
          <FontAwesomeIcon icon={faChevronLeft} /> Back to Blog
        </Link>

        <div className={styles.topRow}>
          {category && <BlogTag label={category} variant="green" />}
          <div className={styles.meta}>
            {date && (
              <span>
                <FontAwesomeIcon icon={faCalendarAlt} />
                {date}
              </span>
            )}
            {readTime && (
              <span>
                <FontAwesomeIcon icon={faClock} />
                {readTime} min read
              </span>
            )}
          </div>
        </div>

        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>

        <div className={styles.author}>
          <span className={styles.authorName}>{authorName}</span>
        </div>
      </div>
    </motion.header>
  );
}