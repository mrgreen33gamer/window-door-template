// components/BlogComponents/BlogCard/BlogCard.tsx
// FIX9: Card link now fires 'click' tracking with the post title and slug.
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import BlogTag from '../BlogTag/BlogTag';
import styles from './styles.module.scss';
import { useTrackEvent } from '&/useTrackEvent';

export interface BlogCardData {
  title:    string;
  excerpt:  string;
  slug:     string;
  category: string;
  readTime: number;
  imageSrc: string;
  imageAlt: string;
  date:     string;
}

interface BlogCardProps {
  post:      BlogCardData;
  index?:    number;
  featured?: boolean;
}

export default function BlogCard({ post, index = 0, featured = false }: BlogCardProps) {
  const trackEvent = useTrackEvent();

  return (
    <motion.article
      className={`${styles.card} ${featured ? styles.featured : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: 'easeOut' }}
    >
      <Link
        href={`/blogs/${post.slug}`}
        className={styles.cardLink}
        onClick={() => trackEvent({
          eventType:    'click',
          elementLabel: post.title,
          section:      'BlogCard',
        })}
      >
        <div className={styles.imageWrapper}>
          <Image
            src={post.imageSrc}
            alt={post.imageAlt}
            fill
            style={{ objectFit: 'cover' }}
            sizes={featured ? '(max-width: 768px) 100vw, 55vw' : '(max-width: 768px) 100vw, 30vw'}
          />
          <div className={styles.overlay} aria-hidden="true" />
          <BlogTag label={post.category} variant="green" />
        </div>

        <div className={styles.content}>
          <div className={styles.meta}>
            <time className={styles.date}>{post.date}</time>
            <span className={styles.readTime}>
              <FontAwesomeIcon icon={faClock} />
              {post.readTime} min
            </span>
          </div>

          <h3 className={styles.title}>{post.title}</h3>
          <p className={styles.excerpt}>{post.excerpt}</p>

          <span className={styles.readMore}>
            Read Article <FontAwesomeIcon icon={faArrowRight} className={styles.arrow} />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
