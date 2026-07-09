// ClearView Windows & Doors — About Page
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
import AboutHero       from "#/PageComponents/AboutHero/AboutHero";
import AboutStory      from "#/PageComponents/AboutStory/AboutStory";

import {
  faTrophy, faChartLine, faClock,
  faHouseUser, faUsers, faLeaf,
  faClipboardCheck,
  faShieldHalved,
  faWindowMaximize,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

export default function AboutPage() {

  const whyFeatures = [
    {
      icon: faHouseUser,
      title: "Locally Owned Since 2012",
      description: "ClearView was founded in Waco by Daniel Crowe. We're not a franchise — every decision is made locally, every call is answered by someone who lives here.",
    },
    {
      icon: faUsers,
      title: "A Crew You Can Trust in Your Home",
      description: "Every installer on our team is background-checked, factory-certified, and bonded & insured. Shoe covers, clean workspace, no mess left behind.",
    },
    {
      icon: faLeaf,
      title: "Honest From the First Call",
      description: "We won't upsell a full-home replacement when a targeted repair or partial upgrade will do. Our reputation is built on straight talk — and 14 years of repeat customers prove it works.",
    },
  ];

  const metrics = [
    { icon: faTrophy,    value: 3500, label: "Window and door installs across Central Texas", suffix: "+", duration: 3 },
    { icon: faChartLine, value: 98,   label: "Customer satisfaction rate",                     suffix: "%", duration: 2 },
    { icon: faClock,     value: 14,   label: "Years serving Central Texas families",           suffix: "+", duration: 2 },
  ];

  const processSteps = [
    { number: 1, title: "Call or Book Online", description: "Phone, text, or form — we'll confirm a free measurement that fits your schedule.", icon: faClipboardCheck },
    { number: 2, title: "Measure Honestly", description: "A ClearView specialist measures openings and explains options in plain English — not just the most expensive package.", icon: faShieldHalved },
    { number: 3, title: "Flat-Rate Quote", description: "Written price before any order is placed. You decide — zero pressure to proceed.", icon: faWindowMaximize },
    { number: 4, title: "Install & Warranty", description: "Factory-certified install, clean job site, Lifetime Product Warranty Support + 10-Year Installation Warranty.", icon: faCircleCheck },
  ];

  return (
    <main className={styles.pageWrapper}>

      <AboutHero cityName="Waco" />
      <AboutStory cityName="Waco" />

      <SectionIntro
        title="About ClearView Windows & Doors"
        subtitle="Waco-owned, Waco-operated, and Waco-proud since 2012. We install energy-efficient windows and entry doors at fair prices for the families and businesses we've called neighbors for 14 years."
      />

      <TrustBar headline="3,500+ Central Texas installs — and we've earned every one" />

      <div className={styles.section}>
        <WhyChooseUs
          cityName="Waco"
          features={whyFeatures}
          title="Who We Are"
        />
      </div>

      <div className={styles.section}>
        <ImpactMetrics title="14 Years, By the Numbers" metrics={metrics} cityName="Waco" />
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
        headline="Waco's Window & Door Company — Ready When You Need Us"
        subline="Free in-home measurements. Flat-rate pricing. Lifetime Product Warranty Support + 10-Year Installation Warranty. No contracts — ever."
        primaryText="Call Us Now"
        primaryLink="tel:+12547403300"
        secondaryText="Request Estimate Online"
        secondaryLink="/contact"
      />

    </main>
  );
}
