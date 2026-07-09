"use client";
import Breadcrumb from "#/PageComponents/Breadcrumb/Breadcrumb";
import styles from "../page.module.scss";

import SectionIntro from "#/PageComponents/SectionIntro/SectionIntro";
import TrustBar from "#/PageComponents/TrustBar/TrustBar";
import WhatToExpect from "#/PageComponents/WhatToExpect/WhatToExpect";
import WhyChooseUs from "#/PageComponents/WhyChooseUs/WhyChooseUs";
import ProcessTimeline from "#/PageComponents/ProcessTimeline/ProcessTimeline";
import ImpactMetrics from "#/PageComponents/ImpactMetrics/ImpactMetrics";
import GuaranteeSection from "#/PageComponents/GuaranteeSection/GuaranteeSection";
import Testimonials from "#/PageComponents/Testimonials/Testimonials";
import LocalServiceAreas from "#/PageComponents/LocalServiceAreas/LocalServiceAreas";
import ValueComparison from "#/PageComponents/ValueComparison/ValueComparison";
import FAQ from "#/PageComponents/FAQ/FAQ";
import CTABanner from "#/PageComponents/CTABanner/CTABanner";
import ServiceCardComponent from "#/PageComponents/ServiceCardComponent/ServiceCardComponent";
import Variant1 from "#/PageComponents/ContactForms/Variant1/Form";
import reviews from '&/local-db/reviews';

import {
  faCodeBranch, faDatabase, faRobot, faShieldHalved,
  faTrophy, faChartLine, faCogs, faRocket, faLayerGroup, faClipboardList,
  faFileContract, faRotateLeft, faHeadset, faLock,
  faGlobe, faPalette, faBullhorn,
} from "@fortawesome/free-solid-svg-icons";

export default function SoftwareWacoPage() {

  const expectations = [
    { icon: faClipboardList, title: "Onboarding & Process Mapping", description: "We map out your exact business processes — what your Waco team does manually, what's costing you time, and where off-the-shelf software is failing you before we design anything." },
    { icon: faLayerGroup,    title: "Architecture & Fixed Scope",   description: "You get a clear written spec of what we're building, what it costs, and how long it takes — agreed in writing before any code starts." },
    { icon: faRocket,        title: "Agile Build in Phases",        description: "We build the highest-value feature first so your Waco team starts seeing results within weeks — not after a 6-month wait for a 'finished' product." },
    { icon: faShieldHalved,  title: "Launch, Training & Handoff",   description: "Your team is fully trained, documentation is complete, and every source file is delivered. Ownership options range from retainer-based to 100% proprietary." },
  ];

  const whyFeatures = [
    {
      icon: faCodeBranch,
      title: "Built Exactly for Your Waco Workflow",
      description: "We don't adapt your Waco business to fit a template. We build software that works the way your team already works — same terminology, same processes, zero forced retraining.",
    },
    {
      icon: faDatabase,
      title: "CRMs, Payment Walls & Client Portals",
      description: "From full customer relationship tools and payment integrations to branded client portals — we've built all of these for Central Texas companies across construction, healthcare, retail, and professional services.",
    },
    {
      icon: faRobot,
      title: "AI & Automation Built In",
      description: "Smart automations that eliminate manual work — invoice generation, follow-up emails, scheduling, reporting, and more. We build Waco businesses tools that work while you sleep.",
    },
  ];

  const processSteps = [
    { number: 1, title: "Requirements Gathering", description: "Deep discovery of your Waco workflows — what you need, what it's costing you now, and what a successful tool looks like for your team.", icon: faCodeBranch },
    { number: 2, title: "Architecture & Quote",   description: "Written technical spec, stack architecture, and fixed-price quote. You know exactly what you're getting before any code starts.", icon: faDatabase },
    { number: 3, title: "Build & Test",           description: "Modern Next.js / Node / PostgreSQL stack with thorough QA. Every feature tested and approved before it ships.", icon: faRobot },
    { number: 4, title: "Launch & Handoff",       description: "Full deployment, team training, and complete source file delivery. The software belongs to your Waco business permanently.", icon: faShieldHalved },
  ];

  const metrics = [
    { icon: faTrophy,    value: 28,  label: "Custom tools built for Central Texas businesses", suffix: "",    duration: 2 },
    { icon: faChartLine, value: 65,  label: "Average hours saved per week per client",         suffix: "hrs", duration: 3 },
    { icon: faCogs,      value: 100, label: "Client code ownership — always",                  suffix: "%",   duration: 2 },
  ];

  const guarantees = [
    { icon: faFileContract, title: "Fixed or Retainer Quotes",  description: "We quote a fixed or retainer price based on a written spec. No hourly billing surprises, no scope creep that costs you extra." },
    { icon: faRotateLeft,   title: "We Build Until It's Right", description: "If the delivered software doesn't match the agreed spec, we fix it at no extra charge. Your satisfaction is non-negotiable." },
    { icon: faHeadset,      title: "Direct Developer Access",   description: "Joshua builds your software personally. His direct line is yours throughout the project — no project managers relaying messages." },
    { icon: faLock,         title: "Ownership & Licensing",     description: "Every file, every schema, every deployment script handed over on completion. We also offer lifetime licensing and retainer options." },
  ];

  const localAreas = [
    { town: "Waco",         benefit: "Our home base — custom tools for companies across construction, healthcare, retail, and professional services.", highlight: "Most Requested" },
    { town: "Hewitt",       benefit: "Automation tools for Hewitt's growing professional community.",       highlight: "" },
    { town: "Woodway",      benefit: "Polished portals and internal tools for Woodway's professional firms.", highlight: "" },
    { town: "Robinson",     benefit: "Practical business software for Robinson's contractors.",              highlight: "" },
    { town: "China Spring", benefit: "Rural-accessible tools for China Spring farms and trade businesses.", highlight: "" },
    { town: "Valley Mills", benefit: "Low-bandwidth tools for Bosque County small businesses.",             highlight: "" },
  ];

  const comparisonRows = [
    { feature: "Built for your exact workflow",  us: "✅ Custom from scratch",        others: "❌ Generic SaaS templates" },
    { feature: "Fixed & retainer quotes",        us: "✅ No hourly surprises",         others: "❌ Open-ended hourly billing" },
    { feature: "Ownership & licensing",          us: "✅ Up to full proprietary",      others: "❌ Agency-retained or SaaS" },
    { feature: "Direct developer access",        us: "✅ Talk to Joshua",              others: "❌ Support tickets & wait times" },
    { feature: "Modern tech stack",              us: "✅ Next.js, MongoDB, ReactJS",   others: "❌ Often outdated frameworks" },
    { feature: "Central Texas knowledge",        us: "✅ 13+ years local",             others: "❌ Offshore or out-of-state" },
  ];

  const faq = [
    { question: "What industries in Waco do you build software for?", answer: "Construction, healthcare, retail, real estate, professional services, nonprofits, agriculture, and more. If your Waco business has a repeatable process, we can build software around it — regardless of industry." },
    { question: "How much does custom software cost for a Waco business?", answer: "Focused tools start around $3,000–$6,000. Larger platforms run $8,000–$25,000+. Fixed-price quote after a free discovery call — always." },
    { question: "Can you replace multiple SaaS tools with one custom solution?", answer: "Often yes — many Waco businesses pay for 3–5 overlapping subscriptions. One well-built custom tool typically replaces all of them within 12–18 months on cost alone, and works better for your specific workflow." },
    { question: "Do you offer ongoing support after launch?", answer: "Yes — optional ongoing support packages and ad-hoc feature additions are available. Since you own the code, you can also bring it to any developer in the future with zero lock-in." },
    { question: "How long does a Waco software project take?", answer: "Simple tools and dashboards: 3–6 weeks. Full platforms: 8–16 weeks. We build in phases so your Waco team benefits before the whole project is done." },
  ];

  const crossLinks = [
    { icon: faGlobe,    title: "Web Design",       body: "Fast, SEO-optimized websites for Waco businesses since 2012.",    link: "/services/website-design/waco-tx" },
    { icon: faPalette,  title: "Graphic Design",   body: "Custom logos and full brand systems for Waco's diverse market.", link: "/services/graphic-design/waco-tx" },
    { icon: faBullhorn, title: "Digital Marketing", body: "Dominate Waco search results with local SEO and Google Ads.",   link: "/services/marketing-solutions/waco-tx" },
  ];

  return (
    <main className={styles.pageWrapper}>

      <Breadcrumb crumbs={[
        { label: "Home", href: "/" },
        { label: "Services", href: "/services" },
        { label: "Custom Software", href: "/services/software-engineering" },
        { label: "Waco, TX" },
      ]} />

      <SectionIntro
        title="Custom Software Development in Waco, TX"
        subtitle="Business tools, web apps, CRMs, and automation systems built specifically for how your Central Texas company operates — fixed price, full ownership, local team."
      />

      <TrustBar headline="Trusted by Waco and Central Texas businesses for 13+ years" />

      <div className={styles.section}>
        <WhatToExpect sectionTitle="How a Custom Software Project Works" expectations={expectations} />
      </div>

      <div className={styles.section}>
        <ImpactMetrics metrics={metrics} cityName="Waco" />
      </div>

      <div className={styles.section}>
        <WhyChooseUs cityName="Waco" features={whyFeatures} title="Software Built for the Way Your Waco Business Actually Works" />
      </div>

      <div className={styles.section}>
        <ProcessTimeline steps={processSteps} cityName="Waco" />
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
        <Testimonials testimonials={reviews} />
      </div>

      <div className={styles.section}>
        <LocalServiceAreas cityName="Waco" areas={localAreas} servicePath="services/software-engineering" title="Custom Software for All of Central Texas" />
      </div>

      <div className={styles.section}>
        <ValueComparison rows={comparisonRows} title="Arctic Air vs. The Other Guys" />
      </div>

      <div className={styles.section}>
        <FAQ cityName="Waco" faq={faq} title="Custom Software FAQs for Waco Businesses" />
      </div>

      <CTABanner
        headline="Ready to Stop Duct-Taping Software Together?"
        subline="Custom tools built exactly for your Waco business workflow. Fixed price, full ownership, local team you can actually call."
        primaryText="Start with a Free Discovery Call"
        primaryLink="/contact"
        secondaryText="Call Us Now"
        secondaryLink="tel:+12549002520"
      />

      <div className={styles.section}>
        <ServiceCardComponent heading="More Services for Waco Businesses" cards={crossLinks} />
      </div>

      <div className={styles.section}>
        <Variant1 title="Tell Us What You're Trying to Build" cityName="Waco" slug="services/software-engineering/waco-tx" spot="software-waco-page" formVariant={1} />
      </div>

    </main>
  );
}