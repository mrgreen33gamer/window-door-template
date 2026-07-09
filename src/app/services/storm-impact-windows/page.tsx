// ClearView Windows & Doors — Storm & Impact Windows Service Page
"use client";

import styles from "../page.module.scss";
import reviews from '&/local-db/reviews';

import Breadcrumb          from "#/PageComponents/Breadcrumb/Breadcrumb";
import SectionIntro        from "#/PageComponents/SectionIntro/SectionIntro";
import TrustBar            from "#/PageComponents/TrustBar/TrustBar";
import WhatToExpect        from "#/PageComponents/WhatToExpect/WhatToExpect";
import WhyChooseUs         from "#/PageComponents/WhyChooseUs/WhyChooseUs";
import ProcessTimeline     from "#/PageComponents/ProcessTimeline/ProcessTimeline";
import ImpactMetrics       from "#/PageComponents/ImpactMetrics/ImpactMetrics";
import Testimonials        from "#/PageComponents/Testimonials/Testimonials";
import GuaranteeSection    from "#/PageComponents/GuaranteeSection/GuaranteeSection";
import LocalServiceAreas   from "#/PageComponents/LocalServiceAreas/LocalServiceAreas";
import ValueComparison     from "#/PageComponents/ValueComparison/ValueComparison";
import FAQ                 from "#/PageComponents/FAQ/FAQ";
import CTABanner           from "#/PageComponents/CTABanner/CTABanner";
import ServiceCardComponent from "#/PageComponents/ServiceCardComponent/ServiceCardComponent";
import Variant4            from "#/PageComponents/ContactForms/Variant4/Form";

import {
  faSearch, faCheckCircle, faClock, faShieldHalved,
  faHeadset, faFileContract, faWrench, faTrophy, faChartLine,
  faWindowMaximize, faDoorOpen, faBorderAll, faLeaf,
} from "@fortawesome/free-solid-svg-icons";

export default function ServicePage() {

  const expectations = [
    { icon: faSearch, title: "Exposure Review", description: "We assess elevation exposure, wind history, and security goals before specifying glass." },
    { icon: faFileContract, title: "Clear Package Pricing", description: "Impact glass, frames, and labor quoted together." },
    { icon: faCheckCircle, title: "Code-Aware Install", description: "Install practices aligned with product ratings and local expectations." },
    { icon: faShieldHalved, title: "Warrantied Workmanship", description: "10-Year Installation Warranty on every install." },
  ];

  const whyFeatures = [
    { icon: faClock, title: "Protect Before Storm Season", description: "Schedule installs ahead of peak wind season for best lead times." },
    { icon: faShieldHalved, title: "Security + Efficiency", description: "Impact glass can deter break-ins while improving thermal performance." },
    { icon: faWindowMaximize, title: "Full or Partial Home", description: "Upgrade the most exposed elevations first if budget requires phasing." },
  ];

  const processSteps = [
    { number: 1, title: "Consult", description: "Discuss goals: storm, security, insurance, or efficiency.", icon: faHeadset },
    { number: 2, title: "Specify & Quote", description: "Recommend rated products; provide written package pricing.", icon: faSearch },
    { number: 3, title: "Install", description: "Certified install with proper anchoring and sealing.", icon: faFileContract },
    { number: 4, title: "Document", description: "Product documentation and warranty support provided.", icon: faCheckCircle },
  ];

  const metrics = [
    { icon: faTrophy, value: 400, label: "Storm and impact installs completed", suffix: "+", duration: 3 },
    { icon: faChartLine, value: 100, label: "Warrantied workmanship coverage", suffix: "%", duration: 2 },
    { icon: faClock, value: 14, label: "Years protecting Central Texas homes", suffix: "+", duration: 2 },
  ];

  const localAreas = [
    { town: "Waco",         benefit: "Home base — fastest scheduling for storm & impact windows.", badge: "Home Base" },
    { town: "Hewitt",       benefit: "Full coverage throughout Hewitt.",                     badge: "" },
    { town: "Woodway",      benefit: "Regular availability for Woodway homes.",              badge: "" },
    { town: "Temple",       benefit: "Bell County coverage — permit-ready installs.",        badge: "" },
    { town: "China Spring", benefit: "Rural coverage for larger homes.",                     badge: "" },
    { town: "Killeen",      benefit: "Full coverage for Killeen and Fort Cavazos area.",     badge: "" },
  ];

  const comparisonRows = [
    { feature: "Free in-home measurement before quote", us: "✅ Always", others: "❌ Often skipped" },
    { feature: "Factory-certified install crews",       us: "✅ All jobs", others: "❌ Varies" },
    { feature: "Flat-rate quote (product + labor)",     us: "✅ Written", others: "❌ Hourly + extras" },
    { feature: "10-Year Installation Warranty",         us: "✅ Every install", others: "❌ Rare" },
    { feature: "Lifetime Product Warranty Support",     us: "✅ Manufacturer-backed", others: "❌ Limited" },
  ];

  const faq = [
    { question: "Do I need full impact windows in Waco?", answer: "Not every home needs full impact packages. We recommend based on exposure, insurance, and budget — often starting with vulnerable elevations." },
    { question: "Are storm windows the same as impact glass?", answer: "No. Storm windows are secondary panels. Impact glass is laminated and framed for higher force resistance." },
    { question: "Will impact windows help with noise?", answer: "Often yes — laminated glass can reduce outside noise compared with single-pane." },
    { question: "How much do impact windows cost?", answer: "Impact packages cost more than standard Low-E — typically a premium per opening. We quote after measurement." },
    { question: "Do you handle insurance-related upgrades?", answer: "We can provide documentation and product specs for your agent. Coverage varies by policy." },
    { question: "Can impact glass be combined with vinyl frames?", answer: "Yes — several systems pair impact glass with durable frames suitable for Texas climate." },
  ];

  const crossServices = [
    { icon: faWindowMaximize, title: "Window Replacement", body: "Standard Low-E replacements for milder elevations.", link: "/services/window-replacement" },
    { icon: faDoorOpen, title: "Entry Door Installation", body: "Secure entry packages that complement impact glass.", link: "/services/entry-door-installation" },
    { icon: faWrench, title: "Window Repair", body: "Repair undamaged units while upgrading exposed sides.", link: "/services/window-repair" },
    { icon: faLeaf, title: "Energy Efficiency Upgrades", body: "Pair storm protection with efficiency goals.", link: "/services/energy-efficiency-upgrades" },
  ];

  return (
    <main className={styles.pageWrapper}>
      <Breadcrumb crumbs={[
        { label: "Home", href: "/" },
        { label: "Services", href: "/services" },
        { label: "Storm & Impact Windows" },
      ]} />
      <SectionIntro
        title="Storm & Impact Windows in Waco, TX"
        subtitle="Impact-rated and storm window solutions for Central Texas wind events, security, and year-round efficiency — factory-certified install."
      />
      <TrustBar headline="3,500+ Central Texas installs — factory-certified, bonded & insured" />
      <div className={styles.section}><WhatToExpect sectionTitle="What to Expect" expectations={expectations} /></div>
      <div className={styles.section}><WhyChooseUs cityName="Waco" features={whyFeatures} title="Why Homeowners Choose ClearView" /></div>
      <div className={styles.section}><ProcessTimeline steps={processSteps} /></div>
      <div className={styles.section}><ImpactMetrics metrics={metrics} cityName="Waco" /></div>
      <div className={styles.section}><Testimonials testimonials={reviews} /></div>
      <div className={styles.section}><GuaranteeSection /></div>
      <div className={styles.section}><LocalServiceAreas cityName="Waco" areas={localAreas} servicePath="services/storm-impact-windows" title="Storm & Impact Windows Across Central Texas" /></div>
      <div className={styles.section}><ValueComparison rows={comparisonRows} /></div>
      <div className={styles.section}><FAQ cityName="Waco" faq={faq} title="Storm & Impact Windows FAQs" /></div>
      <CTABanner
        headline="Ready to Get Started?"
        subline="Free measurement. Flat-rate quotes. Factory-certified installers. Call (254) 740-3300."
        primaryText="Call Us Now"
        primaryLink="tel:+12547403300"
        secondaryText="Book Online"
        secondaryLink="/contact"
      />
      <div className={styles.section}><ServiceCardComponent heading="Other Services You Might Need" cards={crossServices} /></div>
      <div className={styles.section}>
        <Variant4 title="Schedule a Storm Window Consultation" cityName="Waco" slug="services/storm-impact-windows" spot="storm-impact-page-form" formVariant={2} />
      </div>
    </main>
  );
}
