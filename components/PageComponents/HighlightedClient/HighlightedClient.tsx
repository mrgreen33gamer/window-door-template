// PageComponents/HighlightedClient/HighlightedClient.tsx
"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import styles from "./styles.module.scss";

interface HighlightedClientProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  clientLink?: string;
  ctaLink?: string;
}

const HighlightedClient: React.FC<HighlightedClientProps> = ({
  title,
  description,
  imageSrc,
  imageAlt,
  clientLink = "https://www.praseks.com/",
  ctaLink = "/contact",
}) => {
  return (
    <section className={styles.section} aria-label="Featured Client">
      <div className={styles.container}>
        {/* TEXT CARD */}
        <div className={styles.textSide}>
          <div className={styles.cardInner}>
            <div className={styles.tagRow}>
              <span className={styles.tag}>Featured Client</span>
            </div>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.description}>{description}</p>
            <div className={styles.ctaGroup}>
              <Link
                href={clientLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnPrimary}
              >
                Visit Website
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className={styles.extIcon} />
              </Link>
              <Link href={ctaLink} className={styles.btnSecondary}>
                Work With Us
              </Link>
            </div>
          </div>
        </div>

        {/* IMAGE PANEL */}
        <div className={styles.imageSide}>
          <div className={styles.imageFrame}>
            <Image
              fill
              src={imageSrc}
              alt={imageAlt}
              style={{ objectFit: "cover" }}
              quality={100}
              loading="lazy"
              sizes="auto auto"
            />
            <div className={styles.imageOverlay} aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HighlightedClient;