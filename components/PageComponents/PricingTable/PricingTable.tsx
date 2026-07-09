// PageComponents/PricingTable/PricingTable.tsx
"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./styles.module.scss";

interface PricingFeature {
  label: string;
  included: boolean;
}

interface PricingTier {
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  features: PricingFeature[];
  ctaText: string;
  ctaLink: string;
  popular?: boolean;
}

interface PricingTableProps {
  title?: string;
  subtitle?: string;
  tiers: PricingTier[];
  cityName?: string;
}

const PricingTable: React.FC<PricingTableProps> = ({
  title = "Transparent Pricing. No Surprises.",
  subtitle = "Flexible plans built for Central Texas businesses of every size.",
  tiers,
  cityName,
}) => {
  const [annual, setAnnual] = useState(false);

  return (
    <section className={styles.section} aria-label="Pricing Plans">
      <div className={styles.container}>

        {/* Header */}
        <div className={styles.header}>
          <span className={styles.eyebrow}>
            {cityName ? `Pricing for ${cityName}, TX` : "Pricing"}
          </span>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>

          {/* Billing toggle */}
          <div className={styles.toggleWrap} aria-label="Billing period">
            <span className={`${styles.toggleLabel} ${!annual ? styles.toggleActive : ""}`}>
              Monthly
            </span>
            <button
              className={`${styles.toggle} ${annual ? styles.toggleOn : ""}`}
              onClick={() => setAnnual(!annual)}
              aria-pressed={annual}
              aria-label="Toggle annual billing"
            >
              <span className={styles.toggleThumb} />
            </button>
            <span className={`${styles.toggleLabel} ${annual ? styles.toggleActive : ""}`}>
              Annual
              <span className={styles.saveBadge}>Save 20%</span>
            </span>
          </div>
        </div>

        {/* Tiers */}
        <div className={styles.grid}>
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              className={`${styles.card} ${tier.popular ? styles.cardPopular : ""}`}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: index * 0.1, duration: 0.52, ease: "easeOut" }}
            >
              {tier.popular && (
                <div className={styles.popularBadge} aria-label="Most popular plan">
                  Most Popular
                </div>
              )}

              <div className={styles.cardHeader}>
                <h3 className={styles.tierName}>{tier.name}</h3>
                <p className={styles.tierDesc}>{tier.description}</p>
              </div>

              <div className={styles.priceWrap}>
                <span className={styles.currency}>$</span>
                <motion.span
                  key={annual ? "annual" : "monthly"}
                  className={styles.price}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22 }}
                >
                  {annual
                    ? Math.round(tier.annualPrice / 12)
                    : tier.monthlyPrice}
                </motion.span>
                <span className={styles.per}>/mo</span>
              </div>

              {annual && (
                <p className={styles.billedAnnually}>
                  Billed ${tier.annualPrice}/yr
                </p>
              )}

              <div className={styles.divider} aria-hidden="true" />

              <ul className={styles.featureList}>
                {tier.features.map((f, fi) => (
                  <li
                    key={fi}
                    className={`${styles.featureItem} ${!f.included ? styles.featureExcluded : ""}`}
                  >
                    <span className={styles.featureIcon} aria-hidden="true">
                      <FontAwesomeIcon icon={f.included ? faCheck : faXmark} />
                    </span>
                    {f.label}
                  </li>
                ))}
              </ul>

              <Link href={tier.ctaLink} className={styles.cta}>
                {tier.ctaText}
                <FontAwesomeIcon icon={faArrowRight} className={styles.ctaArrow} />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom reassurance */}
        <p className={styles.footnote}>
          No contracts · Cancel anytime · All plans include direct developer access
        </p>
      </div>
    </section>
  );
};

export default PricingTable;
