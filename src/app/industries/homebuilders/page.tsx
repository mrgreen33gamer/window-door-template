"use client";
import styles from "../page.module.scss";
import Breadcrumb from "#/PageComponents/Breadcrumb/Breadcrumb";
import SectionIntro from "#/PageComponents/SectionIntro/SectionIntro";
import TrustBar from "#/PageComponents/TrustBar/TrustBar";
import IndustryPainPoints from "#/PageComponents/IndustryPainPoints/IndustryPainPoints";
import WhyChooseUs from "#/PageComponents/WhyChooseUs/WhyChooseUs";
import ProcessTimeline from "#/PageComponents/ProcessTimeline/ProcessTimeline";
import FAQ from "#/PageComponents/FAQ/FAQ";
import CTABanner from "#/PageComponents/CTABanner/CTABanner";
import Variant4 from "#/PageComponents/ContactForms/Variant4/Form";
import {
  faClipboardCheck, faShieldHalved, faUsers, faHeadset, faSearch, faFileContract, faCheckCircle,
  faClock, faTriangleExclamation, faDollarSign,
} from "@fortawesome/free-solid-svg-icons";

export default function IndustryPage() {
  const pains = [
    { icon: faClock, problem: "Spec drift across trades", consequence: "Late product changes create backorders and punch delays that stall closings." },
    { icon: faTriangleExclamation, problem: "Inconsistent install quality", consequence: "Sub quality varies by crew — callbacks and warranty hits land on the builder." },
    { icon: faUsers, problem: "Coordination headaches", consequence: "Openings, flashing, and dry-in timing need one accountable partner." },
    { icon: faDollarSign, problem: "Buyer option overwhelm", consequence: "Upgrade paths need to be clear without derailing the production schedule." },
  ];

  const whyFeatures = [
    { icon: faClipboardCheck, title: "Schedule-Aware Crews", description: "We plan installs around construction calendars, tenant notice windows, and business hours." },
    { icon: faShieldHalved, title: "Factory-Certified · Bonded & Insured", description: "Documentation ready for GCs, owners, and property managers." },
    { icon: faUsers, title: "Single Point of Contact", description: "One ClearView lead coordinates multi-unit or multi-building work end to end." },
  ];

  const processSteps = [
    { number: 1, title: "Scope Call", description: "Share unit counts, product preferences, and timeline constraints.", icon: faHeadset },
    { number: 2, title: "Site Walk", description: "We measure openings and note access, dumpster, and parking needs.", icon: faSearch },
    { number: 3, title: "Package Quote", description: "Written pricing by unit type or elevation — easy to compare and approve.", icon: faFileContract },
    { number: 4, title: "Phased Install", description: "Crews execute in phases with clean daily close-out and warranty docs.", icon: faCheckCircle },
  ];

  const faq = [
    { question: "Can you work to our builder specs?", answer: "Yes — we map packages to your plan set and option program." },
    { question: "Do you handle multi-community scheduling?", answer: "Yes — one point of contact across phases and communities." },
    { question: "Are installs warrantied?", answer: "Yes — 10-Year Installation Warranty plus manufacturer product support." },
    { question: "Can you meet dry-in timelines?", answer: "We plan product lead times and crew availability around your schedule." },
  ];

  return (
    <main className={styles.pageWrapper}>
      <Breadcrumb crumbs={[
        { label: "Home", href: "/" },
        { label: "Industries", href: "/industries" },
        { label: "Homebuilders" },
      ]} />
      <SectionIntro title="Homebuilders" subtitle="Spec-friendly window and door packages for new construction — reliable lead times, factory-certified install, and clean punch-list close-out." />
      <TrustBar headline="Factory-certified window and door partner for Central Texas organizations" />
      <div className={styles.section}>
        <IndustryPainPoints industry="Homebuilders" painPoints={pains} />
      </div>
      <div className={styles.section}>
        <WhyChooseUs cityName="Waco" features={whyFeatures} title="Why Homebuilders Choose ClearView" />
      </div>
      <div className={styles.section}>
        <ProcessTimeline steps={processSteps} />
      </div>
      <div className={styles.section}>
        <FAQ cityName="Waco" faq={faq} title="Homebuilders FAQs" />
      </div>
      <CTABanner
        headline="Let's Scope Your Project"
        subline="Call (254) 740-3300 or request a package quote online."
        primaryText="Call (254) 740-3300"
        primaryLink="tel:+12547403300"
        secondaryText="Request Quote"
        secondaryLink="/contact"
      />
      <div className={styles.section}>
        <Variant4 title="Request a Homebuilders Quote" cityName="Waco" slug="industries/homebuilders" spot="industry-homebuilders-form" formVariant={2} />
      </div>
    </main>
  );
}
