// PageComponents/BeforeAfter/BeforeAfter.tsx
"use client";
import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsLeftRight } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles.module.scss";

interface BeforeAfterItem {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  clientName: string;
  result?: string;
}

interface BeforeAfterProps {
  title?: string;
  subtitle?: string;
  items: BeforeAfterItem[];
}

const SliderCard: React.FC<BeforeAfterItem & { index: number }> = ({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  clientName,
  result,
  index,
}) => {
  const [position, setPosition] = useState(42); // %
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const calcPosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(95, Math.max(5, pct)));
  }, []);

  const onMouseDown = () => setDragging(true);
  const onMouseMove = (e: React.MouseEvent) => { if (dragging) calcPosition(e.clientX); };
  const onMouseUp = () => setDragging(false);
  const onTouchMove = (e: React.TouchEvent) => calcPosition(e.touches[0].clientX);

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.12, duration: 0.55, ease: "easeOut" }}
    >
      {/* Meta row */}
      <div className={styles.cardMeta}>
        <span className={styles.clientName}>{clientName}</span>
        {result && <span className={styles.resultBadge}>{result}</span>}
      </div>

      {/* Slider */}
      <div
        ref={containerRef}
        className={`${styles.sliderWrap} ${dragging ? styles.dragging : ""}`}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {/* After image — full width base */}
        <div className={styles.afterLayer}>
          <Image src={afterSrc} alt={afterAlt} fill style={{ objectFit: "cover" }} />
          <span className={styles.labelAfter}>After</span>
        </div>

        {/* Before image — clipped on the left */}
        <div
          className={styles.beforeLayer}
          style={{ width: `${position}%` }}
        >
          <Image src={beforeSrc} alt={beforeAlt} fill style={{ objectFit: "cover" }} />
          <span className={styles.labelBefore}>Before</span>
        </div>

        {/* Divider handle */}
        <div
          className={styles.handle}
          style={{ left: `${position}%` }}
          onMouseDown={onMouseDown}
          onTouchStart={() => setDragging(true)}
          onTouchMove={onTouchMove}
          onTouchEnd={() => setDragging(false)}
          role="slider"
          aria-valuemin={5}
          aria-valuemax={95}
          aria-valuenow={Math.round(position)}
          aria-label="Drag to compare before and after"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") setPosition(p => Math.max(5, p - 3));
            if (e.key === "ArrowRight") setPosition(p => Math.min(95, p + 3));
          }}
        >
          <div className={styles.handleBar} />
          <div className={styles.handlePill}>
            <FontAwesomeIcon icon={faArrowsLeftRight} />
          </div>
          <div className={styles.handleBar} />
        </div>
      </div>
    </motion.div>
  );
};

const BeforeAfter: React.FC<BeforeAfterProps> = ({
  title = "Real Redesigns. Real Results.",
  subtitle = "Drag the slider to see the transformation — before and after, side by side.",
  items,
}) => {
  return (
    <section className={styles.section} aria-label="Before and After Comparisons">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>Portfolio</span>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>

        <div className={styles.grid}>
          {items.map((item, i) => (
            <SliderCard key={i} {...item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
