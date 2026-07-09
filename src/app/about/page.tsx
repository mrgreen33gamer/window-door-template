// Arctic Air HVAC — About Page
"use client";

import styles from "./page.module.scss";
import reviews from '&/local-db/reviews';

import SectionIntro    from "#/PageComponents/SectionIntro/SectionIntro";
import TrustBar        from "#/PageComponents/TrustBar/TrustBar";
import WhyChooseUs     from "#/PageComponents/WhyChooseUs/WhyChooseUs";
import ImpactMetrics   from "#/PageComponents/ImpactMetrics/ImpactMetrics";
import Testimonials    from "#/PageComponents/Testimonials/Testimonials";
import GuaranteeSection from "#/PageComponents/GuaranteeSection/GuaranteeSection";
import CTABanner       from "#/PageComponents/CTABanner/CTABanner";
import ProcessTimeline from "#/PageComponents/ProcessTimeline/ProcessTimeline";

import {
  faTrophy, faChartLine, faClock,
  faHouseUser, faUsers, faLeaf,
  faSearch,
  faRocket,
  faStar,
  faTools,
} from "@fortawesome/free-solid-svg-icons";

export default function AboutPage() {

  const whyFeatures = [
    {
      icon: faHouseUser,
      title: "Locally Owned Since 2010",
      description: "Arctic Air was founded in Waco by Mike Hawkins, a Waco native and Master HVAC technician with 20+ years in the trade. We're not a franchise — every decision is made locally, every call is answered by someone who lives here.",
    },
    {
      icon: faUsers,
      title: "A Crew You Can Trust in Your Home",
      description: "Every technician on our team is background-checked, NATE-certified, and TDLR-licensed in Texas. We treat every home we enter with the same respect we'd want for our own families — shoe covers, clean workspace, no mess left behind.",
    },
    {
      icon: faLeaf,
      title: "Honest From the First Call",
      description: "We won't upsell equipment you don't need. We won't recommend a replacement when a repair will do the job for years. Our reputation is built on straight talk — and 15 years of repeat customers prove it works.",
    },
  ];

  const metrics = [
    { icon: faTrophy,    value: 2400, label: "Homes and businesses we've served in Central Texas", suffix: "+", duration: 3 },
    { icon: faChartLine, value: 98,   label: "Customer satisfaction rate",                         suffix: "%", duration: 2 },
    { icon: faClock,     value: 15,   label: "Years serving Central Texas families",                suffix: "+", duration: 2 },
  ];

  const processSteps = [
    { number: 1, title: "Audit Your Automotive Digital Presence", description: "We review your GBP, website speed, inventory visibility, and local search rankings — identifying every search where a competitor is capturing your customer.", icon: faSearch },
    { number: 2, title: "Build Inventory & Booking Systems",       description: "Vehicle listing pages, online booking, and a GBP optimized for your service menu — deployed as one cohesive digital presence.", icon: faRocket },
    { number: 3, title: "Automate Review Collection",              description: "Post-service review requests that systematically build your Google reputation — turning every completed job into a public trust signal.", icon: faStar },
    { number: 4, title: "Add Customer & Service Tools",            description: "Custom service history, CRM, and customer communication tools when you're ready to streamline your shop operations.", icon: faTools },
  ];

  return (
    <main className={styles.pageWrapper}>

      <SectionIntro
        title="About Arctic Air HVAC"
        subtitle="Waco-owned, Waco-operated, and Waco-proud since 2010. We do honest HVAC work at fair prices for the families and businesses we've called neighbors for 15 years."
      />

      <TrustBar headline="2,400+ Central Texas homes and businesses trust Arctic Air — and we've earned every one" />

      <div className={styles.section}>
        <WhyChooseUs
          cityName="Waco"
          features={whyFeatures}
          title="Who We Are"
        />
      </div>

      <div className={styles.section}>
        <ImpactMetrics title="15 Years, By the Numbers" metrics={metrics} cityName="Waco" />
      </div>

      <div className={styles.section}>
        <ProcessTimeline steps={processSteps} />
      </div>

      <div className={styles.section}>
        <Testimonials testimonials={reviews} />
      </div>

      <div className={styles.section}>
        <GuaranteeSection />
      </div>

      <CTABanner
        headline="Waco's HVAC Company — Ready When You Need Us"
        subline="Same-day and emergency service. Flat-rate pricing. 1-year warranty. No contracts — ever."
        primaryText="Call Us Now"
        primaryLink="tel:+12549001234"
        secondaryText="Request Service Online"
        secondaryLink="/contact"
      />

    </main>
  );
}
