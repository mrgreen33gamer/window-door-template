// PageComponents/CaseStudyGrid/CaseStudyGrid.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./styles.module.scss";

interface CaseStudy {
  title: string;
  client: string;
  location: string;
  result: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  link?: string;
}

interface CaseStudyGridProps {
  title?: string;
  studies: CaseStudy[];
}

const CaseStudyGrid: React.FC<CaseStudyGridProps> = ({
  title = "Real Local Success Stories",
  studies,
}) => {
  return (
    <section className={styles.caseSection}>
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <div className={styles.labelRow}>
            <span className={styles.label}>Case Studies</span>
            <div className={styles.labelLine} aria-hidden="true" />
          </div>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>
            Proof from the businesses we've helped grow across Central Texas.
          </p>
        </div>

        <div className={styles.grid}>
          {studies.map((study, index) => (
            <motion.div
              key={index}
              className={styles.card}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: index * 0.08, duration: 0.45, ease: "easeOut" }}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={study.imageSrc}
                  alt={study.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
                <div className={styles.imageOverlay} aria-hidden="true" />
                <span className={styles.result}>{study.result}</span>
              </div>
              <div className={styles.content}>
                <p className={styles.meta}>{study.client} · {study.location}</p>
                <h3 className={styles.cardTitle}>{study.title}</h3>
                <p className={styles.description}>{study.description}</p>
                {study.link && (
                  <Link href={study.link} className={styles.link}>
                    View Case Study →
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudyGrid;