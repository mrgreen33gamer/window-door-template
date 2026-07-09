"use client";
import styles from "../page.module.scss";

import Breadcrumb from "#/PageComponents/Breadcrumb/Breadcrumb";
import SectionIntro from "#/PageComponents/SectionIntro/SectionIntro";
import TrustBar from "#/PageComponents/TrustBar/TrustBar";
import IndustryPainPoints from "#/PageComponents/IndustryPainPoints/IndustryPainPoints";
import WhyChooseUs from "#/PageComponents/WhyChooseUs/WhyChooseUs";
import ProcessTimeline from "#/PageComponents/ProcessTimeline/ProcessTimeline";
import ImpactMetrics from "#/PageComponents/ImpactMetrics/ImpactMetrics";
import ServiceCardComponent from "#/PageComponents/ServiceCardComponent/ServiceCardComponent";
import ValueComparison from "#/PageComponents/ValueComparison/ValueComparison";
import FAQ from "#/PageComponents/FAQ/FAQ";
import CTABanner from "#/PageComponents/CTABanner/CTABanner";
import LocalServiceAreas from "#/PageComponents/LocalServiceAreas/LocalServiceAreas";
import Variant2 from "#/PageComponents/ContactForms/Variant2/Form";

import {
  faMobileAlt, faSearch, faFileContract, faIndustry,
  faRocket, faGlobe, faTrophy, faChartLine, faClock,
  faPalette, faBullhorn, faCode, faClipboardList,
  faDatabase, faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

export default function OilGasIndustryPage() {

  const painPoints = [
    {
      icon: faIndustry,
      problem: "Your website doesn't reflect the scale and capability of your operation",
      consequence: "Upstream clients and procurement teams evaluate vendors digitally before making contact. A dated or generic site signals you're behind the curve — before any conversation starts.",
    },
    {
      icon: faSearch,
      problem: "You're invisible in B2B search for your oilfield services",
      consequence: "Other operators, service companies, and procurement departments search online first. If you're not ranking for your service category and geographic area, those opportunities go to competitors who are.",
    },
    {
      icon: faClipboardList,
      problem: "Field operations are tracked manually or across disconnected systems",
      consequence: "Disconnected spreadsheets, text chains, and manual reporting create errors, delays, and visibility gaps that cost you time and money on every job.",
    },
    {
      icon: faFileContract,
      problem: "No digital system for vendor documents, compliance, and certifications",
      consequence: "Managing compliance documents and certifications manually creates risk. A single missed renewal or inaccessible document can halt operations or cost you a contract.",
    },
    {
      icon: faMobileAlt,
      problem: "Field crews can't access job data or reports from the field",
      consequence: "Real-time field data access is table stakes in modern oilfield operations. If your team is calling the office for information they should have on their phone, you're leaving efficiency on the table.",
    },
    {
      icon: faGoogle,
      problem: "No B2B content strategy building authority in your service category",
      consequence: "Technical content — spec sheets, case studies, service area pages — drives B2B search visibility and positions you as the credible choice. Without it, competitors who publish this content own the search results.",
    },
  ];

  const whyFeatures = [
    {
      icon: faShieldHalved,
      title: "Enterprise-Grade B2B Digital Presence",
      description: "We build oil & gas company websites that speak the language of your buyers — service capability pages, HSE policy integration, equipment specs, and project case studies that position you as the credible, professional choice for any upstream or midstream contract.",
    },
    {
      icon: faDatabase,
      title: "Field Operations & Compliance Software",
      description: "Custom field data collection tools, compliance document management systems, and real-time job status dashboards built for oilfield operations — accessible from any device, in any signal environment your crews work in.",
    },
    {
      icon: faGlobe,
      title: "B2B SEO & Content for Oilfield Services",
      description: "We build the service area pages, technical content, and structured data that gets oilfield service companies found by the procurement teams and operators searching for vendors in your category — statewide and nationally.",
    },
  ];

  const processSteps = [
    { number: 1, title: "Digital Audit & B2B Strategy",    description: "We assess your current web presence, competitor visibility, and where your operation is losing B2B opportunities before recommending anything.", icon: faSearch },
    { number: 2, title: "Enterprise Web Presence",         description: "A professional, fast, B2B-optimized website with service capability pages, HSE integration, and the technical credibility your buyers expect.", icon: faGlobe },
    { number: 3, title: "B2B SEO & Content Build-Out",     description: "Service area pages, technical content, and structured data that rank your oilfield services for the procurement searches that matter in your region.", icon: faRocket },
    { number: 4, title: "Field Operations Software",       description: "Custom tools — field data collection, compliance management, real-time job dashboards — built for how your operation actually runs in the field.", icon: faClipboardList },
  ];

  const metrics = [
    { icon: faTrophy,    value: 18,  label: "Oil, gas & industrial projects delivered",          suffix: "",  duration: 2 },
    { icon: faChartLine, value: 240, label: "Average B2B inquiry increase after site relaunch",   suffix: "%", duration: 3 },
    { icon: faClock,     value: 13,  label: "Years serving Texas industrial businesses",          suffix: "+", duration: 2 },
  ];

  const comparisonRows = [
    { feature: "B2B oilfield industry knowledge",       us: "✅ Texas energy market expertise",   others: "❌ Generic agency approach" },
    { feature: "Enterprise-grade web presence",         us: "✅ Built for procurement vetting",   others: "❌ SMB templates applied to enterprise" },
    { feature: "Field operations software",             us: "✅ Custom-built for oilfield ops",   others: "❌ Off-the-shelf SaaS workarounds" },
    { feature: "Compliance document management",        us: "✅ Built into the system",           others: "❌ Manual or separate vendor" },
    { feature: "B2B SEO & technical content strategy",  us: "✅ Procurement-focused content",     others: "❌ Consumer-style SEO applied to B2B" },
    { feature: "Mobile field access",                   us: "✅ Works on any device or connection", others: "❌ Desktop-only dashboards" },
  ];

  const faq = [
    { question: "Do you build websites for oilfield service companies?",                     answer: "Yes — we build enterprise-grade B2B websites for oilfield services companies, including service capability pages, HSE policy sections, equipment spec pages, and project case studies designed to pass procurement vetting." },
    { question: "Can you build custom field operations software for oilfield crews?",        answer: "Yes — field data collection tools, job status dashboards, compliance document management, and real-time reporting systems are all within scope. We build for any connection environment your crews operate in — including low-signal field conditions." },
    { question: "How do you help oil & gas companies get found in B2B search?",             answer: "Through service area pages, technical content, and structured data that ranks for the procurement searches your buyers make. We focus on category-specific and geography-specific terms that attract operators and purchasing teams — not consumer traffic." },
    { question: "Do you work with midstream and upstream companies?",                        answer: "Yes — we've worked across upstream exploration, oilfield services, equipment rental, pipeline services, and industrial supply. We learn your operation's specific buyer language before building anything." },
    { question: "Can you help with compliance document management?",                         answer: "Yes — we build custom compliance portals and document management systems that keep certifications, safety records, and vendor documents organized, accessible, and auditable. We're not a compliance software vendor, but we build the custom tools that fit your specific workflow." },
    { question: "How much does a website cost for an oil & gas company?",                   answer: "Enterprise B2B sites for oilfield services typically start at $4,000–$10,000 depending on depth, service capability pages, and custom features. Custom field operations software is scoped and quoted separately. We provide a fixed quote before any work begins." },
  ];

  const localAreas = [
    { town: "Waco",         benefit: "Central Texas hub — serving industrial and energy businesses across the region.", highlight: "HQ" },
    { town: "Midland",      benefit: "Permian Basin operations and oilfield services we actively serve.",              highlight: "" },
    { town: "Odessa",       benefit: "West Texas energy market — procurement-focused digital presence.",              highlight: "" },
    { town: "Killeen",      benefit: "Military-adjacent industrial and energy services market.",                       highlight: "" },
    { town: "Temple",       benefit: "Central Texas industrial corridor we serve.",                                    highlight: "" },
    { town: "Houston",      benefit: "Energy capital of Texas — B2B digital presence for upstream and midstream.",    highlight: "" },
  ];

  const services = [
    { icon: faGlobe,    title: "Oil & Gas Website Design",      body: "Enterprise B2B sites with service capability pages, HSE sections, and procurement-ready credibility.",  link: "/services/website-design" },
    { icon: faBullhorn, title: "B2B Digital Marketing",         body: "Technical content, B2B SEO, and search campaigns targeting procurement teams and operators.",           link: "/services/marketing-solutions" },
    { icon: faCode,     title: "Field Operations Software",     body: "Custom field data tools, compliance portals, and job dashboards built for oilfield operations.",       link: "/services/software-engineering" },
    { icon: faPalette,  title: "Energy Brand & Identity",       body: "Professional logos and brand systems built to communicate scale and industrial credibility.",          link: "/services/graphic-design" },
  ];

  return (
    <main className={styles.pageWrapper}>

      <Breadcrumb crumbs={[
        { label: "Home", href: "/" },
        { label: "Industries", href: "/industries" },
        { label: "Oil & Gas" },
      ]} />

      <SectionIntro
        title="Web Design & Software for Oil & Gas Companies"
        subtitle="Enterprise B2B websites, field operations software, and procurement-focused digital presence for oilfield service companies across Texas."
      />

      <TrustBar headline="Trusted by Texas industrial and energy businesses for 10+ years" />

      <IndustryPainPoints
        industry="oil-gas"
        painPoints={painPoints}
        ctaText="Fix My Digital Presence"
        ctaLink="/contact"
      />

      <div className={styles.section}>
        <WhyChooseUs
          cityName="oil & gas companies"
          features={whyFeatures}
          title="What We Build Differently for Energy Businesses"
        />
      </div>

      <div className={styles.section}>
        <ProcessTimeline steps={processSteps} cityName="your oil & gas business" />
      </div>

      <div className={styles.section}>
        <ImpactMetrics metrics={metrics} cityName="oil-gas" />
      </div>

      <div className={styles.section}>
        <ServiceCardComponent
          heading="Every Service Your Energy Company Needs"
          cards={services}
        />
      </div>

      <div className={styles.section}>
        <LocalServiceAreas
          cityName="Waco"
          areas={localAreas}
          servicePath="industries/oil-gas"
          title="Serving Oil & Gas Companies Across Texas"
        />
      </div>

      <div className={styles.section}>
        <ValueComparison rows={comparisonRows} />
      </div>

      <div className={styles.section}>
        <FAQ cityName="oil & gas" faq={faq} title="Oil & Gas Digital Services FAQs" />
      </div>

      <CTABanner
        headline="Ready to Build a Digital Presence That Wins B2B Contracts?"
        subline="Enterprise websites and field operations software for Texas oil & gas companies. Free audit, no contracts."
        primaryText="Get Your Free Digital Audit"
        primaryLink="/contact"
        secondaryText="Call Us Now"
        secondaryLink="tel:+12549002520"
      />

      <div className={styles.section}>
        <Variant2
          title="Tell Us About Your Oil & Gas Operation"
          cityName="Waco"
          slug="industries/oil-gas"
          spot="oil-gas-industry-page"
          formVariant={2}
        />
      </div>

    </main>
  );
}