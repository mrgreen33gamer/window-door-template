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
  faHandshake, faShieldHalved, faLightbulb,
} from "@fortawesome/free-solid-svg-icons";

export default function IndustriesPage() {

  const whyFeatures = [
    {
      icon: faHandshake,
      title: "We Learn Your Industry Before We Build",
      description: "Every industry has its own language, sales cycle, and customer expectations. Before we design or code anything, we audit how your industry converts online — and build to that standard.",
    },
    {
      icon: faShieldHalved,
      title: "Locally Operated, Industry-Savvy",
      description: "We're based in Waco, TX and have served businesses across automotive, HVAC, construction, finance, roofing, and more across Central Texas for 10+ years. Local knowledge + industry expertise.",
    },
    {
      icon: faLightbulb,
      title: "Websites, Software & Marketing — All Under One Roof",
      description: "Whether your industry needs online booking, inventory tools, review management, or local ad campaigns — we handle all of it. No juggling three vendors for one goal.",
    },
  ];

  const metrics = [
    { icon: faTrophy,    value: 10,  label: "Industries actively served across Texas",        suffix: "+", duration: 2 },
    { icon: faChartLine, value: 320, label: "Average lead increase across industry clients",   suffix: "%", duration: 3 },
    { icon: faClock,     value: 13,  label: "Years serving Texas businesses",                  suffix: "+", duration: 2 },
  ];

  const localAreas = [
    { town: "Waco",         benefit: "Our home base — serving all industries across McLennan County.",               highlight: "Headquarters" },
    { town: "Hewitt",       benefit: "Family and trade businesses across Hewitt's growing community.",               highlight: "" },
    { town: "Woodway",      benefit: "Professional-services and high-end client businesses.",                        highlight: "" },
    { town: "Temple",       benefit: "A booming Bell County market with strong demand across industries.",           highlight: "" },
    { town: "Killeen",      benefit: "Military-adjacent businesses and trades near Fort Cavazos.",                   highlight: "" },
    { town: "China Spring", benefit: "Agricultural, rural, and contractor businesses in Bosque and McLennan County.", highlight: "" },
  ];

  const comparisonRows = [
    { feature: "Industry-specific content & strategy",    us: "✅ Built per vertical",          others: "❌ Generic templates" },
    { feature: "Local Central Texas market knowledge",    us: "✅ 10+ years in Waco",           others: "❌ Out-of-state agencies" },
    { feature: "Web + software + marketing combined",     us: "✅ All services in-house",        others: "❌ Siloed vendors" },
    { feature: "Transparent fixed pricing",               us: "✅ Quote before any work starts", others: "❌ Billable hours + surprises" },
    { feature: "You own all deliverables",                us: "✅ Code, content, accounts",      others: "❌ Locked-in proprietary systems" },
  ];

  const faq = [
    {
      question: "What industries does Scott Applications work with?",
      answer: "We currently have dedicated pages and proven experience for automotive, aviation, construction, electrical, finance, HVAC, manufacturing, oil & gas, plumbing, and roofing — plus general business services for professional services, retail, and nonprofits.",
    },
    {
      question: "Do you build industry-specific websites or use the same template for everyone?",
      answer: "Every project is custom-built for the industry and the business. An HVAC company and a financial firm have completely different customer journeys, trust signals, and conversion paths — we build to those differences specifically.",
    },
    {
      question: "Do you serve industries outside of Central Texas?",
      answer: "Yes — while we're based in Waco and primarily serve McLennan, Bell, Bosque, and Hill Counties, we've built industry-focused digital systems for Texas businesses from Dallas to Houston. Remote project management is standard for us.",
    },
    {
      question: "Can you handle both the website and the marketing for my industry?",
      answer: "Yes — we handle web design, custom software, graphic design, and digital marketing under one roof. This means your website, your SEO, and your ads all speak the same language and are optimized together, not in isolation.",
    },
    {
      question: "How do I know which service is right for my industry?",
      answer: "Start by clicking your industry below or contacting us directly. We'll do a free audit of your current digital presence, identify the biggest gaps, and recommend the services that will move the needle most — no pressure, no overselling.",
    },
  ];

  return (
    <main className={styles.pageWrapper}>

      <Breadcrumb crumbs={[
        { label: "Home", href: "/" },
        { label: "Industries" },
      ]} />

      <SectionIntro
        title="Industries We Serve Across Texas"
        subtitle="Specialized web design, software, and marketing solutions built for how your industry actually works — not a generic template with your logo swapped in."
      />

      <TrustBar headline="Trusted by businesses across 10+ industries in Central Texas for 10+ years" />

      {/* ── THE INDUSTRY GRID ── */}
      <div className={styles.section}>
        <SectionIndustriesServed
          title="Browse by Industry"
          subtitle="Click your industry to see exactly what we build for businesses like yours."
        />
      </div>

      <div className={styles.section}>
        <WhyChooseUs
          cityName="Central Texas"
          features={whyFeatures}
          title="Why Industry-Specific Matters"
        />
      </div>

      <div className={styles.section}>
        <ImpactMetrics metrics={metrics} cityName="Central Texas" />
      </div>

      <div className={styles.section}>
        <LocalServiceAreas
          cityName="Waco"
          areas={localAreas}
          title="Industries Served Across Central Texas"
        />
      </div>

      <div className={styles.section}>
        <ValueComparison
          title="Why Businesses Choose Scott Applications"
          rows={comparisonRows}
        />
      </div>

      <div className={styles.section}>
        <FAQ
          cityName="Waco"
          faq={faq}
          title="Industry Services — Frequently Asked Questions"
        />
      </div>

      <CTABanner
        headline="Don't See Your Industry? Let's Talk."
        subline="We work with businesses outside our listed verticals all the time. If you have a repeatable process, a local customer base, or a digital gap — we can build around it. Free consultation, no pressure."
        primaryText="Tell Us About Your Business"
        primaryLink="/contact"
        secondaryText="Call Us Now"
        secondaryLink="tel:+12549002520"
      />

      <div className={styles.section}>
        <Variant4
          title="Get a Free Industry-Specific Audit"
          cityName="Waco"
          slug="industries"
          spot="industries-hub-page"
          formVariant={4}
        />
      </div>

    </main>
  );
}