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
    { icon: faClock, problem: "Business-hour disruption", consequence: "Installs that force closures cost revenue and frustrate customers." },
    { icon: faTriangleExclamation, problem: "Code and inspection delays", consequence: "Wrong product or incomplete docs stall open dates." },
    { icon: faShieldHalved, problem: "Security and energy waste", consequence: "Aging storefront glass and doors invite break-ins and high utility bills." },
    { icon: faUsers, problem: "Scattered vendors", consequence: "Glass, doors, and sealing handled by different companies creates gaps." },
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
    { question: "Can you work nights or weekends?", answer: "Often yes for retail TI and remodels — we confirm at scope." },
    { question: "Do you handle commercial storefront systems?", answer: "Yes — storefront glass and commercial entries within our commercial program." },
    { question: "Can you coordinate with GCs?", answer: "Yes — we work as a trade partner with clear scopes and change orders." },
    { question: "Is commercial work warrantied?", answer: "Yes — installation warranty terms provided with the proposal." },
  ];

  return (
    <main className={styles.pageWrapper}>
      <Breadcrumb crumbs={[
        { label: "Home", href: "/" },
        { label: "Industries", href: "/industries" },
        { label: "Commercial Storefronts" },
      ]} />
      <SectionIntro title="Commercial Storefronts" subtitle="Storefront glass, commercial entries, and display openings for retail and office spaces — scheduled to protect business hours." />
      <TrustBar headline="Factory-certified window and door partner for Central Texas organizations" />
      <div className={styles.section}>
        <IndustryPainPoints industry="Commercial Storefronts" painPoints={pains} />
      </div>
      <div className={styles.section}>
        <WhyChooseUs cityName="Waco" features={whyFeatures} title="Why Commercial Storefronts Choose ClearView" />
      </div>
      <div className={styles.section}>
        <ProcessTimeline steps={processSteps} />
      </div>
      <div className={styles.section}>
        <FAQ cityName="Waco" faq={faq} title="Commercial Storefronts FAQs" />
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
        <Variant4 title="Request a Commercial Storefronts Quote" cityName="Waco" slug="industries/commercial-storefronts" spot="industry-commercial-storefronts-form" formVariant={2} />
      </div>
    </main>
  );
}
