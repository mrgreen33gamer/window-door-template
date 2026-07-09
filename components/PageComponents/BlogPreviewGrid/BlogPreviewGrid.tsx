'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BlogPost, getRecentPosts } from '&/blog-posts';
import styles from './styles.module.scss';

interface BlogPreviewGridProps {
  title?:       string;
  subtitle?:    string;
  posts?:       BlogPost[];
  count?:       number;
  viewAllLink?: string;
  viewAllText?: string;
}

const BlogPreviewGrid: React.FC<BlogPreviewGridProps> = ({
  title       = 'HVAC Tips & Insights',
  subtitle    = 'Practical advice for Central Texas homeowners — when to repair, when to replace, and how to save money on your energy bill.',
  posts,
  count       = 4,
  viewAllLink = '/blogs',
  viewAllText = 'All Articles',
}) => {
  const displayPosts = posts ?? getRecentPosts(count);
  if (!displayPosts.length) return null;

  const [featured, ...rest] = displayPosts;
  const listPosts = rest.slice(0, 3);

  return (
    <section className={styles.section} aria-label="Blog preview">
      <div className={styles.container}>

        {/* ── SECTION HEADER ── */}
        <div className={styles.sectionHeader}>
          <div className={styles.headerLeft}>
            <span className={styles.eyebrow}>
              <span className={styles.eyebrowLine} />
              From the Blog
            </span>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.subtitle}>{subtitle}</p>
          </div>
          <Link href={viewAllLink} className={styles.viewAll}>
            {viewAllText}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </Link>
        </div>

        {/* ── MAIN LAYOUT: featured left + numbered list right ── */}
        <div className={styles.layout}>

          {/* Featured card — full-height image with overlay content */}
          <motion.div className={styles.featuredWrap}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55 }}>
            <Link href={`/blogs/${featured.slug}`} className={styles.featuredCard}>
              <div className={styles.featuredImg}>
                <Image src={featured.imageSrc} alt={featured.imageAlt}
                  fill style={{ objectFit: 'cover' }}
                  sizes="(max-width: 900px) 100vw, 52vw" priority />
                <div className={styles.featuredOverlay} aria-hidden="true" />
              </div>

              <div className={styles.featuredBody}>
                <span className={styles.catPill}>{featured.category}</span>
                <h3 className={styles.featuredTitle}>{featured.title}</h3>
                <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
                <div className={styles.featuredMeta}>
                  <span className={styles.metaDate}>{featured.date}</span>
                  <span className={styles.metaDot} aria-hidden="true" />
                  <span className={styles.metaRead}>{featured.readTime} min read</span>
                </div>
                <span className={styles.readNow}>
                  Read Article
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Numbered article list */}
          <div className={styles.listWrap}>
            <span className={styles.listLabel}>More Articles</span>

            {listPosts.map((post, i) => (
              <motion.div key={post.slug}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ delay: i * 0.1, duration: 0.48 }}>
                <Link href={`/blogs/${post.slug}`} className={styles.listItem}>

                  <span className={styles.listNum}>
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className={styles.listThumb}>
                    <Image src={post.imageSrc} alt={post.imageAlt}
                      fill style={{ objectFit: 'cover' }}
                      sizes="80px" />
                  </div>

                  <div className={styles.listText}>
                    <span className={styles.listCat}>{post.category}</span>
                    <h4 className={styles.listTitle}>{post.title}</h4>
                    <span className={styles.listRead}>{post.readTime} min read</span>
                  </div>

                  <svg className={styles.listArrow} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </Link>
              </motion.div>
            ))}

            {/* Bottom CTA */}
            <Link href={viewAllLink} className={styles.allBtn}>
              Browse All HVAC Articles
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BlogPreviewGrid;
