"use client";
// components/PageComponents/ProjectCardGrid/ProjectCardGrid.tsx

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUpRightFromSquare,
  faChevronLeft,
  faChevronRight,
  faXmark,
  faTag,
  faChevronDown,
  faArrowRight,
  faGlobe,
  faImagePortrait,
  faCodeBranch,
  faBullhorn,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.scss';
import ALL_PROJECTS, {
  CATEGORIES,
  PROJECTS_BY_CATEGORY,
  type Project,
  type ProjectCategory,
} from '&/local-db/projects';

// ─── Constants ────────────────────────────────────────────────────────────────
const PAGE_SIZE = 6;

// ─── Types ────────────────────────────────────────────────────────────────────
type TabKey = 'All' | ProjectCategory | 'Graphic Design' | 'Marketing';

// ─── Service CTA definitions (one per service, cycled in the All tab) ─────────
const SERVICE_CTAS = [
  {
    key: 'web',
    icon: faGlobe,
    eyebrow: 'Web Design',
    headline: 'Need a website that ranks and converts?',
    body: 'Fast, mobile-first sites built for Central Texas businesses. Fixed price, you own everything.',
    cta: 'Get a Free Quote',
    href: '/contact',
    accent: 'green' as const,
  },
  {
    key: 'graphic',
    icon: faImagePortrait,
    eyebrow: 'Graphic Design',
    headline: 'Starting a business and need a brand?',
    body: 'Custom logos, brand kits, and print materials — unlimited revisions, source files always included.',
    cta: 'Start a Project',
    href: '/contact',
    accent: 'obsidian' as const,
  },
  {
    key: 'software',
    icon: faCodeBranch,
    eyebrow: 'Custom Software',
    headline: 'Outgrowing spreadsheets and SaaS tools?',
    body: 'CRMs, client portals, and automation tools built exactly for your workflow. Fixed quote, full ownership.',
    cta: 'Explore Software',
    href: '/services/software-engineering',
    accent: 'green' as const,
  },
  {
    key: 'marketing',
    icon: faBullhorn,
    eyebrow: 'Digital Marketing',
    headline: 'Ready to dominate local search?',
    body: 'Local SEO, Google Ads, and Google Business management that drives real calls and form submissions.',
    cta: 'See Marketing Plans',
    href: '/services/marketing-solutions',
    accent: 'obsidian' as const,
  },
];

// ─── Gallery image type (for Graphic Design tab) ─────────────────────────────
interface GalleryImage {
  src: string;
  filename: string;
  alt: string;
}

// ─── Framer variants ──────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
/**
 * Convert a filename like "hot-rocks-logo-design.jpg"
 * → "Hot Rocks Logo Design — Scott Applications Graphic Design Portfolio"
 */
function fileToAlt(filename: string): string {
  const stem = filename.replace(/\.[^.]+$/, '');           // strip extension
  const words = stem.replace(/[-_]/g, ' ')                 // dashes → spaces
    .replace(/\b\w/g, (c) => c.toUpperCase());             // title case
  return `${words} — Scott Applications Graphic Design Portfolio`;
}

// ─── Image Carousel ───────────────────────────────────────────────────────────
function ImageCarousel({ images, title }: { images: Project['images']; title: string }) {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);

  return (
    <div className={styles.carousel}>
      <div className={styles.carouselTrack}>
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            className={styles.carouselSlide}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={images[idx].src}
              alt={images[idx].alt}
              fill
              style={{ objectFit: 'cover' }}
              quality={90}
              sizes="(max-width: 768px) 100vw, 700px"
            />
          </motion.div>
        </AnimatePresence>
        {images[idx].caption && (
          <span className={styles.carouselCaption}>{images[idx].caption}</span>
        )}
      </div>
      {images.length > 1 && (
        <>
          <button className={`${styles.carouselBtn} ${styles.carouselBtnPrev}`} onClick={prev} aria-label="Previous image">
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button className={`${styles.carouselBtn} ${styles.carouselBtnNext}`} onClick={next} aria-label="Next image">
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
          <div className={styles.carouselDots}>
            {images.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === idx ? styles.dotActive : ''}`}
                onClick={() => setIdx(i)}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Project Modal ────────────────────────────────────────────────────────────
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className={styles.modalOverlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className={styles.modalPanel}
          initial={{ opacity: 0, y: 48, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 32, scale: 0.97 }}
          transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className={styles.modalClose} onClick={onClose} aria-label="Close modal">
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <ImageCarousel images={project.images} title={project.title} />
          <div className={styles.modalContent}>
            <div className={styles.modalMeta}>
              <span className={styles.modalCategory}>
                <FontAwesomeIcon icon={faTag} />
                {project.category}
              </span>
              <span className={styles.modalResult}>{project.result}</span>
              <span className={styles.modalYear}>{project.year}</span>
            </div>
            <h2 className={styles.modalTitle}>{project.title}</h2>
            <p className={styles.modalClient}>{project.client} &mdash; {project.location}</p>
            <p className={styles.modalDesc}>{project.fullDesc}</p>
            <div className={styles.modalTags}>
              {project.tags.map((tag) => (
                <span key={tag} className={styles.modalTag}>{tag}</span>
              ))}
            </div>
            {project.offline ? (
              <span className={styles.modalOffline}>Offline</span>
            ) : project.liveUrl ? (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.modalCta}>
                Visit Live Site
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </a>
            ) : null}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, wide, onClick }: { project: Project; wide: boolean; onClick: () => void }) {
  return (
    <motion.article
      className={`${styles.card} ${wide ? styles.cardWide : ''}`}
      variants={cardVariants}
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${project.title}`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
    >
      <div className={styles.cardImage}>
        <Image
          src={project.images[0].src}
          alt={project.images[0].alt}
          fill
          style={{ objectFit: 'cover' }}
          quality={80}
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw"
        />
        <div className={styles.resultBadge}>{project.result}</div>
        <div className={styles.categoryLabel}>
          <FontAwesomeIcon icon={faTag} />
          {project.category}
        </div>
        <div className={styles.cardHoverOverlay}>
          <span className={styles.viewDetailsBtn}>
            View Details <FontAwesomeIcon icon={faArrowRight} />
          </span>
        </div>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.cardMeta}>
          <span className={styles.clientName}>{project.client}</span>
          <span className={styles.location}>{project.location}</span>
          {project.year && <span className={styles.year}>{project.year}</span>}
        </div>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.cardDesc}>{project.shortDesc}</p>
        <div className={styles.tagRow}>
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
          {project.tags.length > 3 && (
            <span className={styles.tag}>+{project.tags.length - 3}</span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

// ─── Service CTA Card (injected in All tab every 7 items) ─────────────────────
function ServiceCtaCard({ cta, index }: { cta: typeof SERVICE_CTAS[number]; index: number }) {
  const isDark = cta.accent === 'obsidian';
  return (
    <motion.div
      className={`${styles.ctaCard} ${isDark ? styles.ctaCardDark : styles.ctaCardLight}`}
      variants={cardVariants}
      aria-label={`${cta.eyebrow} — ${cta.headline}`}
    >
      <div className={styles.ctaCardInner}>
        <div className={styles.ctaCardIcon}>
          <FontAwesomeIcon icon={cta.icon} />
        </div>
        <span className={styles.ctaCardEyebrow}>{cta.eyebrow}</span>
        <h3 className={styles.ctaCardHeadline}>{cta.headline}</h3>
        <p className={styles.ctaCardBody}>{cta.body}</p>
        <Link href={cta.href} className={styles.ctaCardBtn}>
          {cta.cta}
          <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>
    </motion.div>
  );
}

// ─── All-tab Panel with CTA injection ────────────────────────────────────────
// Rule: for every full group of 7 project cards, insert 1 service CTA on the 8th slot.
// CTAs cycle through all 4 services in order. Only inject if there are 7 MORE
// cards after the previous injection point (i.e. another full group of 7 follows).
type GridItem =
  | { kind: 'project'; project: Project; originalIndex: number }
  | { kind: 'cta'; ctaIndex: number };

function buildAllItems(projects: Project[]): GridItem[] {
  const items: GridItem[] = [];
  let ctaCount = 0;
  let projectsSinceLastCta = 0;

  for (let i = 0; i < projects.length; i++) {
    items.push({ kind: 'project', project: projects[i], originalIndex: i });
    projectsSinceLastCta++;

    // After every 7th project, check: are there at least 7 more projects remaining?
    if (projectsSinceLastCta === 7) {
      const remaining = projects.length - (i + 1);
      if (remaining >= 7) {
        items.push({ kind: 'cta', ctaIndex: ctaCount % SERVICE_CTAS.length });
        ctaCount++;
      }
      projectsSinceLastCta = 0;
    }
  }

  return items;
}

function AllPanel({ projects }: { projects: Project[] }) {
  const [visible, setVisible] = useState(PAGE_SIZE + 2); // +2 so a CTA can show early
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => { setVisible(PAGE_SIZE + 2); }, [projects]);

  const allItems = buildAllItems(projects);
  const shownItems = allItems.slice(0, visible);
  const hasMore = visible < allItems.length;

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key="all-grid"
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {shownItems.map((item, i) => {
            if (item.kind === 'cta') {
              const cta = SERVICE_CTAS[item.ctaIndex];
              return <ServiceCtaCard key={`cta-${item.ctaIndex}`} cta={cta} index={i} />;
            }
            const p = item.project;
            // Wide every 3rd project slot (use project originalIndex for consistency)
            const wide = item.originalIndex % 3 === 0;
            return (
              <ProjectCard
                key={p.id}
                project={p}
                wide={wide}
                onClick={() => setActiveProject(p)}
              />
            );
          })}
        </motion.div>
      </AnimatePresence>

      {hasMore && (
        <motion.div
          className={styles.loadMoreRow}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <button
            className={styles.loadMoreBtn}
            onClick={() => setVisible((v) => v + PAGE_SIZE + 1)}
          >
            Load More Projects
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
          <span className={styles.loadMoreCount}>
            Showing {shownItems.filter(i => i.kind === 'project').length} of {projects.length}
          </span>
        </motion.div>
      )}

      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </>
  );
}

// ─── Standard Category Panel ──────────────────────────────────────────────────
function CategoryPanel({ projects }: { projects: Project[] }) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => { setVisible(PAGE_SIZE); }, [projects]);

  const shown = projects.slice(0, visible);
  const hasMore = visible < projects.length;

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={projects[0]?.id ?? 'empty'}
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {shown.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              wide={i % 3 === 0}
              onClick={() => setActiveProject(project)}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {hasMore && (
        <motion.div
          className={styles.loadMoreRow}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <button
            className={styles.loadMoreBtn}
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
          >
            Load More Projects
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
          <span className={styles.loadMoreCount}>
            Showing {shown.length} of {projects.length}
          </span>
        </motion.div>
      )}

      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </>
  );
}

// ─── Graphic Design Gallery Panel ─────────────────────────────────────────────
// Reads images from /api/gallery-images (served from /public/projects/gallery/)
// Lightbox on click. Auto-generates SEO alt text from filename.
function GalleryLightbox({ images, startIdx, onClose }: {
  images: GalleryImage[];
  startIdx: number;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(startIdx);
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [idx]);

  return (
    <AnimatePresence>
      <motion.div
        className={styles.modalOverlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className={`${styles.modalPanel} ${styles.galleryModal}`}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className={styles.modalClose} onClick={onClose} aria-label="Close">
            <FontAwesomeIcon icon={faXmark} />
          </button>

          <div className={styles.galleryLightboxImage}>
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                style={{ position: 'absolute', inset: 0 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <Image
                  src={images[idx].src}
                  alt={images[idx].alt}
                  fill
                  style={{ objectFit: 'contain' }}
                  quality={95}
                  sizes="(max-width: 768px) 100vw, 900px"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {images.length > 1 && (
            <>
              <button className={`${styles.carouselBtn} ${styles.carouselBtnPrev}`} onClick={prev} aria-label="Previous">
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <button className={`${styles.carouselBtn} ${styles.carouselBtnNext}`} onClick={next} aria-label="Next">
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </>
          )}

          <div className={styles.galleryLightboxCaption}>
            <p className={styles.galleryLightboxAlt}>{images[idx].alt}</p>
            <span className={styles.galleryLightboxCount}>{idx + 1} / {images.length}</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function GraphicDesignPanel() {
  const [images, setImages]       = useState<GalleryImage[]>([]);
  const [loading, setLoading]     = useState(true);
  const [lightboxIdx, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/gallery-images')
      .then((r) => r.json())
      .then((data: { files: string[] }) => {
        const imgs: GalleryImage[] = (data.files ?? []).map((filename) => ({
          src: `/projects/gallery/${filename}`,
          filename,
          alt: fileToAlt(filename),
        }));
        setImages(imgs);
      })
      .catch(() => setImages([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className={styles.galleryLoading}>
        <div className={styles.gallerySpinner} />
        <span>Loading gallery…</span>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <motion.div
        className={styles.emptyState}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <div className={styles.emptyIcon}>
          <FontAwesomeIcon icon={faImagePortrait} />
        </div>
        <h3 className={styles.emptyTitle}>Gallery Coming Soon</h3>
        <p className={styles.emptyBody}>
          Drop images into <code>/public/projects/gallery/</code> and they&apos;ll appear here automatically.
          Filenames become SEO-optimised alt text.
        </p>
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        className={styles.galleryGrid}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {images.map((img, i) => (
          <motion.button
            key={img.filename}
            className={styles.galleryThumb}
            variants={cardVariants}
            onClick={() => setLightbox(i)}
            aria-label={`View: ${img.alt}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              style={{ objectFit: 'cover' }}
              quality={75}
              loading="lazy"
              sizes="(max-width: 640px) 50vw, (max-width: 1100px) 33vw, 25vw"
            />
            <div className={styles.galleryThumbOverlay}>
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </div>
          </motion.button>
        ))}
      </motion.div>

      {lightboxIdx !== null && (
        <GalleryLightbox
          images={images}
          startIdx={lightboxIdx}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}

// ─── Empty Tab CTA ────────────────────────────────────────────────────────────
function EmptyTabCta({ tabName }: { tabName: string }) {
  return (
    <motion.div
      className={styles.emptyTabCta}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <div className={styles.emptyTabIcon}>
        <FontAwesomeIcon icon={faStar} />
      </div>
      <span className={styles.emptyTabEyebrow}>{tabName}</span>
      <h3 className={styles.emptyTabTitle}>Be the first.</h3>
      <p className={styles.emptyTabBody}>
        We&apos;re building out our {tabName.toLowerCase()} portfolio. 
        If you&apos;re looking for a partner to create something remarkable, 
        now&apos;s a great time to start a conversation.
      </p>
      <div className={styles.emptyTabActions}>
        <Link href="/contact" className={styles.emptyTabBtnPrimary}>
          Start a Project
          <FontAwesomeIcon icon={faArrowRight} />
        </Link>
        <Link href="/services" className={styles.emptyTabBtnGhost}>
          Explore Services
        </Link>
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
interface ProjectCardGridProps {
  title?: string;
  subtitle?: string;
}

// Extended tabs including the two new ones
const ALL_TABS: TabKey[] = ['All', ...CATEGORIES, 'Graphic Design', 'Marketing'];

const ProjectCardGrid: React.FC<ProjectCardGridProps> = ({
  title    = 'Our Work',
  subtitle = 'A selection of projects built for Central Texas businesses',
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>('All');

  const currentProjects: Project[] =
    activeTab === 'All'
      ? ALL_PROJECTS
      : (activeTab === 'Graphic Design' || activeTab === 'Marketing')
        ? []
        : PROJECTS_BY_CATEGORY[activeTab as ProjectCategory] ?? [];

  // Counts shown in tab badges
  const countForTab = (tab: TabKey): number => {
    if (tab === 'All') return ALL_PROJECTS.length;
    if (tab === 'Graphic Design' || tab === 'Marketing') return 0;
    return PROJECTS_BY_CATEGORY[tab as ProjectCategory]?.length ?? 0;
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className={styles.sectionTitle}>{title}</h2>
          <p className={styles.sectionSubtitle}>{subtitle}</p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          className={styles.filterRow}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          {ALL_TABS.map((tab) => (
            <button
              key={tab}
              className={`${styles.filterBtn} ${activeTab === tab ? styles.filterActive : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
              <span className={styles.filterCount}>
                {countForTab(tab) > 0 ? countForTab(tab) : '—'}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28 }}
          >
            {activeTab === 'All' && (
              <AllPanel projects={ALL_PROJECTS} />
            )}

            {activeTab === 'Graphic Design' && (
              <GraphicDesignPanel />
            )}

            {activeTab === 'Marketing' && (
              <EmptyTabCta tabName="Digital Marketing" />
            )}

            {(activeTab !== 'All' && activeTab !== 'Graphic Design' && activeTab !== 'Marketing') && (
              <CategoryPanel key={activeTab} projects={currentProjects} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectCardGrid;