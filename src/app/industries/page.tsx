"use client";
import Breadcrumb from "#/PageComponents/Breadcrumb/Breadcrumb";
import styles from "./page.module.scss";
import SectionIntro       from "#/PageComponents/SectionIntro/SectionIntro";
import TrustBar           from "#/PageComponents/TrustBar/TrustBar";
import SectionIndustriesServed from "#/PageComponents/SectionIndustriesServed/SectionIndustriesServed";
import WhyChooseUs        from "#/PageComponents/WhyChooseUs/WhyChooseUs";
import ImpactMetrics      from "#/PageComponents/ImpactMetrics/ImpactMetrics";
import LocalServiceAreas  from "#/PageComponents/LocalServiceAreas/LocalServiceAreas";
import ValueComparison    from "#/PageComponents/ValueComparison/ValueComparison";
import FAQ                from "#/PageComponents/FAQ/FAQ";
import CTABanner          from "#/PageComponents/CTABanner/CTABanner";
import Variant4           from "#/PageComponents/ContactForms/Variant4/Form";

import {
  faTrophy, faChartLine, faClock,
  faHandshake, faShieldHalved, faFileInvoiceDollar,
} from "@fortawesome/free-solid-svg-icons";

export default function IndustriesPage() {

  const whyFeatures = [
    {
      icon: faHandshake,
      title: "We Learn Your Operation Before We Quote",
      description: "A homebuilder, a property manager, and a commercial storefront owner all work differently. Before we quote, we learn your schedule, access rules, and budget cycle.",
    },
    {
      icon: faShieldHalved,
      title: "Factory-Certified, Bonded & Insured",
      description: "We're based in Waco, TX with factory-certified installers and full insurance — the documentation multi-unit and commercial projects require.",
    },
    {
      icon: faFileInvoiceDollar,
      title: "Windows, Doors & Scheduling — One Vendor",
      description: "Whether your project needs multi-unit make-ready, new construction packages, or storefront glass — we handle it under one roof.",
    },
  ];

  const metrics = [
    { icon: faTrophy,    value: 3,    label: "B2B industries actively served across Central Texas", suffix: "",  duration: 2 },
    { icon: faChartLine, value: 250,  label: "Commercial and multi-unit projects completed",         suffix: "+", duration: 3 },
    { icon: faClock,     value: 14,   label: "Years serving Central Texas organizations",           suffix: "+", duration: 2 },
  ];

  const localAreas = [
    { town: "Waco", benefit: "Our home base — serving builders, PM, and commercial clients.", badge: "Headquarters" },
    { town: "Temple", benefit: "Commercial and multi-unit properties across Bell County.", badge: "" },
    { town: "Killeen", benefit: "Retail storefronts, apartments, and new construction.", badge: "" },
    { town: "Hewitt", benefit: "Residential portfolios and suburban commercial.", badge: "" },
    { town: "Woodway", benefit: "Professional offices and premium rentals.", badge: "" },
    { town: "McGregor", benefit: "Builder communities and light commercial.", badge: "" },
  ];

  const comparisonRows = [
    { feature: "Organization-specific scheduling", us: "✅ Built per project type", others: "❌ One-size-fits-all" },
    { feature: "Central Texas market knowledge", us: "✅ 14+ years in Waco", others: "❌ Out-of-area contractors" },
    { feature: "Factory-certified commercial crews", us: "✅ Always", others: "❌ Not always" },
    { feature: "Transparent, upfront pricing", us: "✅ Quote before work starts", others: "❌ Billable hours + surprises" },
    { feature: "10-Year Installation Warranty", us: "✅ On every install", others: "❌ Limited or none" },
  ];

  const faq = [
    {
      question: "What types of organizations does ClearView Windows & Doors work with?",
      answer: "We have dedicated experience with homebuilders, property management companies, and commercial storefronts — in addition to residential window and door services.",
    },
    {
      question: "Do you build a custom proposal for each organization?",
      answer: "Yes. Every proposal is built around access rules, construction schedules, CapEx cycles, and open dates — not a generic residential quote.",
    },
    {
      question: "Do you serve organizations outside of Waco?",
      answer: "Yes — Temple, Killeen, Hewitt, Woodway, McGregor, China Spring, Bellmead, and most of Central Texas within about 60 miles of Waco.",
    },
    {
      question: "Can you handle multi-property or multi-building portfolios?",
      answer: "Yes — we build phased, portfolio-wide pricing and scheduling with a single dedicated point of contact.",
    },
    {
      question: "How do I know which program is right for my organization?",
      answer: "Start by clicking your industry below or contacting us directly. We'll recommend the approach that fits — no pressure.",
    },
  ];

  return (
    <main className={styles.pageWrapper}>
      <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "Industries" }]} />
      <SectionIntro
        title="Industries We Serve Across Central Texas"
        subtitle="Window and door programs built for how your organization actually works — construction schedules, turnovers, and open dates, not a generic residential quote."
      />
      <TrustBar headline="Trusted by builders, property managers, and commercial clients across Central Texas since 2012" />
      <div className={styles.section}>
        <SectionIndustriesServed
          title="Browse by Industry"
          subtitle="Click your industry to see exactly what we build for organizations like yours."
        />
      </div>
      <div className={styles.section}>
        <WhyChooseUs cityName="Waco" features={whyFeatures} title="Why Organizations Choose ClearView" />
      </div>
      <div className={styles.section}>
        <ImpactMetrics metrics={metrics} cityName="Waco" />
      </div>
      <div className={styles.section}>
        <LocalServiceAreas cityName="Waco" areas={localAreas} />
      </div>
      <div className={styles.section}>
        <ValueComparison rows={comparisonRows} />
      </div>
      <div className={styles.section}>
        <FAQ cityName="Waco" faq={faq} title="Industry Partnership FAQs" />
      </div>
      <CTABanner
        headline="Need a Window & Door Partner for Your Organization?"
        subline="Factory-certified crews. Portfolio-friendly scheduling. Call (254) 740-3300."
        primaryText="Call (254) 740-3300"
        primaryLink="tel:+12547403300"
        secondaryText="Contact Us"
        secondaryLink="/contact"
      />
      <div className={styles.section}>
        <Variant4 title="Request a Commercial / Multi-Unit Quote" cityName="Waco" slug="industries" spot="industries-index-form" formVariant={2} />
      </div>
    </main>
  );
}
