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
    { icon: faClock, problem: "Turnover bottlenecks", consequence: "Failed windows and doors delay make-ready and cost vacancy days." },
    { icon: faTriangleExclamation, problem: "Tenant complaint stacks", consequence: "Drafts, fogged glass, and sticky sliders generate recurring work orders." },
    { icon: faDollarSign, problem: "Budget surprises", consequence: "Hourly vendors make CapEx planning difficult across portfolios." },
    { icon: faUsers, problem: "Inconsistent vendors", consequence: "Different crews every time means uneven quality and missing warranty docs." },
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
    { question: "Do you provide COI and W-9 quickly?", answer: "Yes — insurance and tax docs available on request for approved vendor lists." },
    { question: "Can you work around occupied units?", answer: "Yes — we coordinate notice windows and clean daily close-out." },
    { question: "Do you repair as well as replace?", answer: "Yes — we recommend repair when it is the better value for the asset." },
    { question: "Can you handle after-hours commercial work?", answer: "Often yes for storefront-adjacent and office properties — ask when scoping." },
  ];

  return (
    <main className={styles.pageWrapper}>
      <Breadcrumb crumbs={[
        { label: "Home", href: "/" },
        { label: "Industries", href: "/industries" },
        { label: "Property Management" },
      ]} />
      <SectionIntro title="Property Management" subtitle="Turnover-friendly window and door repair and replacement for multi-unit portfolios — clear pricing, tenant-aware scheduling, and documentation PMs need." />
      <TrustBar headline="Factory-certified window and door partner for Central Texas organizations" />
      <div className={styles.section}>
        <IndustryPainPoints industry="Property Management" painPoints={pains} />
      </div>
      <div className={styles.section}>
        <WhyChooseUs cityName="Waco" features={whyFeatures} title="Why Property Management Choose ClearView" />
      </div>
      <div className={styles.section}>
        <ProcessTimeline steps={processSteps} />
      </div>
      <div className={styles.section}>
        <FAQ cityName="Waco" faq={faq} title="Property Management FAQs" />
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
        <Variant4 title="Request a Property Management Quote" cityName="Waco" slug="industries/property-management" spot="industry-property-management-form" formVariant={2} />
      </div>
    </main>
  );
}
