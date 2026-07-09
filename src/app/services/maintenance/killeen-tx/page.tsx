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

export default function KilleenSoftwarePage() {

  const whyFeatures = [
    {
      icon: faShieldHalved,
      title: "Built for the Military-Adjacent Market",
      description: "Killeen's high customer and personnel turnover means your internal systems need to onboard new staff fast and handle volume spikes consistently. We build software that's intuitive enough to train in an hour and reliable enough to run unattended.",
    },
    {
      icon: faCodeBranch,
      title: "You Own the Code — No Lock-In",
      description: "We hand over the full codebase at launch. No SaaS subscription to maintain, no monthly fee to keep your own software running. Your Killeen business controls its tools completely.",
    },
    {
      icon: faRobot,
      title: "Automation That Scales With Your Volume",
      description: "Scheduling, invoicing, client follow-ups, inventory tracking — custom software eliminates the busywork that eats your Killeen team's time, whether you're serving 10 customers or 300.",
    },
  ];

  const expectations = [
    { icon: faClipboardList, title: "Discovery & Workflow Mapping",   description: "We map your current Killeen business process end-to-end — identifying exactly where software saves the most time and where off-the-shelf tools have been falling short." },
    { icon: faLayerGroup,    title: "Phased Build & Early Delivery",  description: "We build in phases so your Killeen team gets working software early — not a 12-week black box with a big reveal at the end." },
    { icon: faCogs,          title: "Testing & Staff Training",       description: "Every feature is tested against your real Killeen business scenarios. We train your staff directly so adoption is fast and confident." },
    { icon: faRocket,        title: "Launch & Ongoing Support",       description: "Full codebase, documentation, and training on launch. Optional ongoing support available — but since you own the code, you're never locked in." },
  ];

  const processSteps = [
    { number: 1, title: "Killeen Discovery Call",  description: "Free call to understand your Killeen business process, pain points, and what software could realistically solve for your Fort Cavazos-area operation — no sales pitch, just honest scoping.",    icon: faClipboardList },
    { number: 2, title: "Scope & Fixed Quote",     description: "We define exactly what we'll build, how long it takes, and what it costs — all before any work begins. Your Killeen business always knows the number.",                                            icon: faFileContract },
    { number: 3, title: "Build in Phases",         description: "Development starts with your highest-priority features. Your Killeen team uses and tests working software while the full project continues.",                                                    icon: faCodeBranch },
    { number: 4, title: "Launch & Hand-Off",       description: "Full codebase, documentation, and staff training delivered at launch. Everything is yours, transferable to any developer, forever.",                                                            icon: faRocket },
  ];

  const metrics = [
    { icon: faTrophy,    value: 45,  label: "Custom tools launched for Central Texas businesses", suffix: "",  duration: 2 },
    { icon: faChartLine, value: 280, label: "Average time saved per week per client after launch", suffix: "%", duration: 3 },
    { icon: faDatabase,  value: 10,  label: "Years of software development experience",            suffix: "+", duration: 2 },
  ];

  const guarantees = [
    { icon: faFileContract, title: "Fixed Price. No Surprises.",        description: "We quote a clear number before we start. Killeen businesses always know exactly what they're paying — no scope creep billing, no hourly surprises." },
    { icon: faRotateLeft,   title: "Built Right or We Fix It",          description: "If something we built doesn't work as scoped, we fix it at no extra charge. Period." },
    { icon: faHeadset,      title: "You Talk to the Person Building It", description: "Joshua handles your Killeen project directly. You have his contact throughout — not a project manager relaying messages from an overseas team." },
    { icon: faLock,         title: "You Own Everything",                description: "Full codebase, database, and documentation handed over on launch. Your Killeen business is never dependent on us to keep your software running." },
  ];

  const localAreas = [
    { town: "Temple",    benefit: "Bell County neighbors — same team, same local expertise.",          highlight: "" },
    { town: "Belton",    benefit: "Adjacent Killeen-area market we actively serve.",                   highlight: "" },
    { town: "Waco",      benefit: "Our home base — 10+ years of Central Texas software development.", highlight: "HQ" },
    { town: "Robinson",  benefit: "Trades and contractor businesses down I-35 we proudly serve.",     highlight: "" },
  ];

  const comparisonRows = [
    { feature: "Fort Cavazos area market knowledge", us: "✅ Local military-adjacent expertise", others: "❌ Out-of-state agency" },
    { feature: "Fixed price upfront",               us: "✅ Always",                            others: "❌ Hourly billing surprises" },
    { feature: "You own the code",                  us: "✅ Full handover at launch",           others: "❌ SaaS lock-in" },
    { feature: "Phased delivery",                   us: "✅ Working software early",            others: "❌ Black-box delivery" },
    { feature: "No ongoing fee to operate",         us: "✅ Zero lock-in",                     others: "❌ Monthly subscription" },
    { feature: "Direct developer access",           us: "✅ Talk to Joshua",                   others: "❌ Account managers" },
  ];

  const faq = [
    {
      question: "Do you serve Killeen, TX businesses for custom software?",
      answer: "Yes — we're based in Waco, about an hour north of Killeen, and regularly build software for Bell County and Fort Cavazos-area businesses. Everything runs remotely with video calls, staged demos, and fast delivery.",
    },
    {
      question: "My Killeen business has high staff turnover. Will custom software handle that?",
      answer: "That's exactly why custom software makes sense for the Killeen market. We build interfaces that are intuitive enough to train in an hour, with role-based access and guided workflows — so new staff are productive fast regardless of turnover.",
    },
    {
      question: "How much does custom software cost for a Killeen business?",
      answer: "Focused tools start around $3,000–$6,000. Larger platforms run $8,000–$25,000+. Fixed-price quote after a free discovery call — always.",
    },
    {
      question: "How long does a Killeen software project take?",
      answer: "Simple tools and dashboards: 3–6 weeks. Full platforms: 8–16 weeks. We build in phases so your Killeen team benefits before the whole project is done.",
    },
    {
      question: "Can you replace multiple SaaS subscriptions with one custom tool?",
      answer: "Often yes — many Killeen businesses pay for 3–5 overlapping subscriptions. One well-built custom tool typically replaces all of them and pays for itself within 12–18 months in subscription savings alone.",
    },
    {
      question: "Do you offer ongoing support after launch?",
      answer: "Yes — optional ongoing support and feature additions are available. Since you own the code, you can also bring it to any developer in the future with zero lock-in.",
    },
  ];

  const crossLinks = [
    { icon: faGlobe,    title: "Web Design",        body: "Fast, mobile-first websites for Killeen businesses with Fort Cavazos area SEO built in.",   link: "/services/website-design/killeen-tx" },
    { icon: faPalette,  title: "Graphic Design",    body: "Custom logos and branding built for Killeen's military-adjacent market.",                    link: "/services/graphic-design/killeen-tx" },
    { icon: faBullhorn, title: "Digital Marketing", body: "Local SEO and Google Ads reaching across Bell County and the Fort Cavazos area.",            link: "/services/marketing-solutions/killeen-tx" },
  ];

  return (
    <main className={styles.pageWrapper}>

      <Breadcrumb crumbs={[
        { label: "Home", href: "/" },
        { label: "Services", href: "/services" },
        { label: "Custom Software", href: "/services/software-engineering" },
        { label: "Killeen, TX" },
      ]} />

      <SectionIntro
        title="Custom Software Development in Killeen, TX"
        subtitle="Business tools, web apps, CRMs, and automation systems built for Killeen's fast-moving Fort Cavazos-area market — fixed price, full ownership, local Central Texas team."
      />

      <TrustBar headline="Trusted by Killeen and Bell County businesses for 10+ years" />

      <div className={styles.section}>
        <WhyChooseUs
          cityName="Killeen"
          features={whyFeatures}
          title="Why Killeen Businesses Choose Custom Software Over SaaS"
        />
      </div>

      <div className={styles.section}>
        <WhatToExpect
          sectionTitle="What Your Killeen Software Project Includes"
          expectations={expectations}
        />
      </div>

      <div className={styles.section}>
        <ProcessTimeline steps={processSteps} cityName="Killeen" />
      </div>

      <div className={styles.section}>
        <ImpactMetrics metrics={metrics} cityName="Killeen" />
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
          cityName="Killeen"
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
          cityName="Killeen"
          faq={faq}
          title="Custom Software FAQs for Killeen Businesses"
        />
      </div>

      <CTABanner
        headline="Ready to Stop Duct-Taping Software Together?"
        subline="Custom tools built for how your Killeen business actually works. Fixed price, full ownership, local team."
        primaryText="Start with a Free Discovery Call"
        primaryLink="/contact"
        secondaryText="Call Us Now"
        secondaryLink="tel:+12549002520"
      />

      <div className={styles.section}>
        <ServiceCardComponent
          heading="More Services for Killeen Businesses"
          cards={crossLinks}
        />
      </div>

      <div className={styles.section}>
        <Variant1
          title="Tell Us What You're Trying to Build"
          cityName="Killeen"
          slug="services/software-engineering/killeen-tx"
          spot="software-killeen-page"
          formVariant={1}
        />
      </div>

    </main>
  );
}