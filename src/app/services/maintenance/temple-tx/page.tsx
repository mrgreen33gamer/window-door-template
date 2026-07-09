"use client";
import Breadcrumb from "#/PageComponents/Breadcrumb/Breadcrumb";
import styles from "../page.module.scss";

import SectionIntro      from "#/PageComponents/SectionIntro/SectionIntro";
import TrustBar          from "#/PageComponents/TrustBar/TrustBar";
import WhyChooseUs       from "#/PageComponents/WhyChooseUs/WhyChooseUs";
import WhatToExpect      from "#/PageComponents/WhatToExpect/WhatToExpect";
import ProcessTimeline   from "#/PageComponents/ProcessTimeline/ProcessTimeline";
import ImpactMetrics     from "#/PageComponents/ImpactMetrics/ImpactMetrics";
import GuaranteeSection  from "#/PageComponents/GuaranteeSection/GuaranteeSection";
import LocalServiceAreas from "#/PageComponents/LocalServiceAreas/LocalServiceAreas";
import ValueComparison   from "#/PageComponents/ValueComparison/ValueComparison";
import FAQ               from "#/PageComponents/FAQ/FAQ";
import CTABanner         from "#/PageComponents/CTABanner/CTABanner";
import ServiceCardComponent from "#/PageComponents/ServiceCardComponent/ServiceCardComponent";
import Variant1          from "#/PageComponents/ContactForms/Variant1/Form";

import {
  faCodeBranch, faDatabase, faRobot, faShieldHalved,
  faTrophy, faChartLine, faCogs,
  faFileContract, faRotateLeft, faHeadset, faLock,
  faRocket, faLayerGroup, faClipboardList,
  faGlobe, faPalette, faBullhorn,
} from "@fortawesome/free-solid-svg-icons";

export default function TempleSoftwarePage() {

  const whyFeatures = [
    {
      icon: faShieldHalved,
      title: "Built for Bell County's Business Mix",
      description: "Temple's economy spans healthcare, retail, manufacturing, and professional services. We've built software for all of them — patient intake tools, inventory systems, contractor scheduling apps, and client portals. We know how to scope a project that actually fits your workflow.",
    },
    {
      icon: faCodeBranch,
      title: "You Own the Code — No Lock-In",
      description: "We hand over the full codebase at launch. No SaaS subscription, no monthly fee to keep your own software running. Your Temple business controls its tools completely.",
    },
    {
      icon: faRobot,
      title: "Automation That Eliminates Busywork",
      description: "Repetitive tasks — scheduling, invoicing, data entry, client follow-ups — are exactly what custom software is built to eliminate. Most Temple clients recoup their investment within the first year in time savings alone.",
    },
  ];

  const expectations = [
    { icon: faClipboardList, title: "Discovery & Workflow Mapping",   description: "We map every step of your current process before writing a line of code — identifying exactly where software can save your Temple team the most time." },
    { icon: faLayerGroup,    title: "Phased Build & Early Delivery",  description: "We build in phases so your Temple team benefits before the full project is complete. No 12-week black box — you see working software early." },
    { icon: faCogs,          title: "Testing & Staff Training",       description: "Every feature is tested against your real Temple business scenarios. We train your staff directly so adoption is fast and confident." },
    { icon: faRocket,        title: "Launch & Ongoing Support",       description: "Your software launches with full documentation. Optional ongoing support and feature additions available — but since you own the code, you're never locked in." },
  ];

  const processSteps = [
    { number: 1, title: "Temple Discovery Call",  description: "Free call to understand your Temple business process, pain points, and what software could realistically solve — no sales pitch, just honest scoping.",                              icon: faClipboardList },
    { number: 2, title: "Scope & Fixed Quote",    description: "We define exactly what we'll build for your Temple business, how long it takes, and what it costs — all upfront before any work begins.",                                        icon: faFileContract },
    { number: 3, title: "Build in Phases",        description: "Development starts with your highest-priority features. Your Temple team gets working software to use and test before the full project wraps.",                                   icon: faCodeBranch },
    { number: 4, title: "Launch & Hand-Off",      description: "Full codebase, documentation, and staff training delivered on launch. Your Temple business owns everything and can take it anywhere.",                                            icon: faRocket },
  ];

  const metrics = [
    { icon: faTrophy,    value: 45,  label: "Custom tools launched for Central Texas businesses", suffix: "",  duration: 2 },
    { icon: faChartLine, value: 280, label: "Average time saved per week per client after launch", suffix: "%", duration: 3 },
    { icon: faDatabase,  value: 10,  label: "Years of software development experience",            suffix: "+", duration: 2 },
  ];

  const guarantees = [
    { icon: faFileContract, title: "Fixed Price. No Surprises.",       description: "We quote a clear number before we start. Temple businesses always know exactly what they're paying — no scope creep billing, no hourly surprises." },
    { icon: faRotateLeft,   title: "Built Right or We Fix It",         description: "If something we built doesn't work as scoped, we fix it at no extra charge. Period." },
    { icon: faHeadset,      title: "You Talk to the Person Building It", description: "Joshua handles your Temple project directly. You have his contact throughout — not a project manager relaying messages." },
    { icon: faLock,         title: "You Own Everything",               description: "Full codebase, database, documentation — all handed over on launch. Your Temple business is never dependent on us to keep your software running." },
  ];

  const localAreas = [
    { town: "Killeen",   benefit: "Bell County neighbors — same team, same local expertise.",              highlight: "" },
    { town: "Belton",    benefit: "Adjacent Temple-area businesses we actively serve.",                    highlight: "" },
    { town: "Waco",      benefit: "Our home base — 10+ years of Central Texas software development.",     highlight: "HQ" },
    { town: "Hewitt",    benefit: "Growing businesses down I-35 we proudly serve.",                       highlight: "" },
  ];

  const comparisonRows = [
    { feature: "Bell County market knowledge",   us: "✅ Local Central Texas expertise",  others: "❌ Out-of-state agency" },
    { feature: "Fixed price upfront",            us: "✅ Always",                         others: "❌ Hourly billing surprises" },
    { feature: "You own the code",               us: "✅ Full handover at launch",        others: "❌ SaaS lock-in" },
    { feature: "Phased delivery",                us: "✅ Working software early",         others: "❌ Black-box delivery" },
    { feature: "No ongoing fee to operate",      us: "✅ Zero lock-in",                  others: "❌ Monthly subscription" },
    { feature: "Direct developer access",        us: "✅ Talk to Joshua",                others: "❌ Account managers" },
  ];

  const faq = [
    {
      question: "Do you serve Temple, TX businesses for custom software?",
      answer: "Yes — we're based in Waco, about 35 miles north of Temple, and regularly build software for Bell County businesses. Everything runs remotely with video calls, staged demos, and fast delivery.",
    },
    {
      question: "My Temple business is in healthcare. Can you build software for that?",
      answer: "Yes — we've built intake tools, scheduling systems, and client portals for healthcare-adjacent businesses. We're not a HIPAA-certified EHR vendor, but we can build the practice management, scheduling, and client communication tools that connect around your clinical systems.",
    },
    {
      question: "How much does custom software cost for a Temple business?",
      answer: "Focused tools start around $3,000–$6,000. Larger platforms run $8,000–$25,000+. Fixed-price quote after a free discovery call — always.",
    },
    {
      question: "How long does a Temple software project take?",
      answer: "Simple tools and dashboards: 3–6 weeks. Full platforms: 8–16 weeks. We build in phases so your Temple team benefits before the whole project is done.",
    },
    {
      question: "Can you replace multiple SaaS subscriptions with one custom tool?",
      answer: "Often yes — many Temple businesses pay for 3–5 overlapping subscriptions. One well-built custom tool typically replaces all of them and pays for itself within 12–18 months in subscription savings alone.",
    },
    {
      question: "Do you offer ongoing support after launch?",
      answer: "Yes — optional ongoing support and ad-hoc feature additions are available. Since you own the code, you can also bring it to any developer in the future with zero lock-in.",
    },
  ];

  const crossLinks = [
    { icon: faGlobe,    title: "Web Design",       body: "Fast, mobile-first websites for Temple businesses with Bell County SEO built in.",   link: "/services/website-design/temple-tx" },
    { icon: faPalette,  title: "Graphic Design",   body: "Custom logos and branding built for Temple's diverse professional market.",            link: "/services/graphic-design/temple-tx" },
    { icon: faBullhorn, title: "Digital Marketing", body: "Local SEO and Google Ads strategies reaching across Bell County.",                   link: "/services/marketing-solutions/temple-tx" },
  ];

  return (
    <main className={styles.pageWrapper}>

      <Breadcrumb crumbs={[
        { label: "Home", href: "/" },
        { label: "Services", href: "/services" },
        { label: "Custom Software", href: "/services/software-engineering" },
        { label: "Temple, TX" },
      ]} />

      <SectionIntro
        title="Custom Software Development in Temple, TX"
        subtitle="Business tools, web apps, CRMs, and automation systems built specifically for how your Bell County company operates — fixed price, full ownership, local Central Texas team."
      />

      <TrustBar headline="Trusted by Temple and Bell County businesses for 10+ years" />

      <div className={styles.section}>
        <WhyChooseUs
          cityName="Temple"
          features={whyFeatures}
          title="Why Temple Businesses Choose Custom Software Over SaaS"
        />
      </div>

      <div className={styles.section}>
        <WhatToExpect
          sectionTitle="What Your Temple Software Project Includes"
          expectations={expectations}
        />
      </div>

      <div className={styles.section}>
        <ProcessTimeline steps={processSteps} cityName="Temple" />
      </div>

      <div className={styles.section}>
        <ImpactMetrics metrics={metrics} cityName="Temple" />
      </div>

      <div className={styles.section}>
        <GuaranteeSection
          title="Our Software Guarantee"
          headline={"Fixed price.\nFull ownership.\nBuilt right."}
          guarantees={guarantees}
          ctaText="Start with a Free Discovery Call"
          ctaLink="/contact"
        />
      </div>

      <div className={styles.section}>
        <LocalServiceAreas
          cityName="Temple"
          areas={localAreas}
          servicePath="services/software-engineering"
          title="Also Serving These Nearby Communities"
        />
      </div>

      <div className={styles.section}>
        <ValueComparison rows={comparisonRows} title="Arctic Air vs. The Other Guys" />
      </div>

      <div className={styles.section}>
        <FAQ
          cityName="Temple"
          faq={faq}
          title="Custom Software FAQs for Temple Businesses"
        />
      </div>

      <CTABanner
        headline="Ready to Stop Duct-Taping Software Together?"
        subline="Custom tools built for how your Temple business actually works. Fixed price, full ownership, local team."
        primaryText="Start with a Free Discovery Call"
        primaryLink="/contact"
        secondaryText="Call Us Now"
        secondaryLink="tel:+12549002520"
      />

      <div className={styles.section}>
        <ServiceCardComponent
          heading="More Services for Temple Businesses"
          cards={crossLinks}
        />
      </div>

      <div className={styles.section}>
        <Variant1
          title="Tell Us What You're Trying to Build"
          cityName="Temple"
          slug="services/software-engineering/temple-tx"
          spot="software-temple-page"
          formVariant={1}
        />
      </div>

    </main>
  );
}