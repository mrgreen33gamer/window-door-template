'use client';
import styles from './page.module.scss';
import BlogCard from '#/BlogComponents/BlogCard/BlogCard';
import { getAllPosts, getAllCategories } from '../../../libs/blog-posts';
import { motion } from 'framer-motion';
import Link from 'next/link';

// ✅ v9 SEO FIX: Added soft CTA strip at bottom of blog index
//                Blog index had 0 CTAs — readers landed, browsed, and left with no prompt.
//                A soft strip (not a hard quote CTA) is appropriate for discovery-mode readers.

export default function BlogPage() {
  const allPosts = getAllPosts();
  const categories = ['All', ...getAllCategories()];
  const featured = allPosts[0];
  const rest = allPosts.slice(1);

  return (
    <main className={styles.page}>

      {/* Page Header */}
      <section className={styles.pageHeader}>
        <motion.div
          className={styles.pageHeaderInner}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <span className={styles.eyebrow}>Insights &amp; Resources</span>
          <h1 className={styles.pageTitle}>Arctic Air HVAC - Blog Center</h1>
          <p className={styles.pageSubtitle}>
            Real talk and useful tips for Central Texas business owners — web design, software, marketing, and more.
          </p>
        </motion.div>
      </section>

      {/* Category filter strip */}
      <section className={styles.filterBar}>
        <div className={styles.filterInner}>
          {categories.map((cat, i) => (
            <button key={i} className={`${styles.filterBtn} ${i === 0 ? styles.active : ''}`}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Post */}
      {featured && (
        <section className={styles.featuredSection}>
          <div className={styles.container}>
            <span className={styles.sectionLabel}>Featured</span>
            <BlogCard post={featured} index={0} featured />
          </div>
        </section>
      )}

      {/* Divider */}
      {rest.length > 0 && <div className={styles.divider} />}

      {/* Post Grid */}
      {rest.length > 0 && (
        <section className={styles.gridSection}>
          <div className={styles.container}>
            <span className={styles.sectionLabel}>Latest Posts</span>
            <div className={styles.grid}>
              {rest.map((post, i) => (
                <BlogCard key={post.slug} post={post} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Soft CTA strip ─────────────────────────────────────────────────────
           Intentionally low-pressure — blog readers are in discovery mode.
           One clear invite is enough; no form, no countdown, no hard sell.
      ──────────────────────────────────────────────────────────────────────── */}
      <section className={styles.blogCTAStrip}>
        <div className={styles.container}>
          <motion.div
            className={styles.blogCTAInner}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <p className={styles.blogCTAHeading}>
              Need reliable HVAC service in Central Texas?
            </p>
            <p className={styles.blogCTABody}>
              We've been keeping Waco-area homes and businesses comfortable with expert heating, cooling, and maintenance since 2015. Free estimate, no obligations.
            </p>
            <Link href="/contact" className={styles.blogCTABtn}>
              Get Your Free Estimate Today
            </Link>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
