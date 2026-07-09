"use client";
import Breadcrumb from "#/PageComponents/Breadcrumb/Breadcrumb";
import styles from "../page.module.scss";

import SectionIntro from "#/PageComponents/SectionIntro/SectionIntro";
import TrustBar from "#/PageComponents/TrustBar/TrustBar";
import IndustryPainPoints from "#/PageComponents/IndustryPainPoints/IndustryPainPoints";
import WhyChooseUs from "#/PageComponents/WhyChooseUs/WhyChooseUs";
import ProcessTimeline from "#/PageComponents/ProcessTimeline/ProcessTimeline";
import ImpactMetrics from "#/PageComponents/ImpactMetrics/ImpactMetrics";
import TechStack from "#/PageComponents/TechStack/TechStack";
import ServiceCardComponent from "#/PageComponents/ServiceCardComponent/ServiceCardComponent";
import ValueComparison from "#/PageComponents/ValueComparison/ValueComparison";
import FAQ from "#/PageComponents/FAQ/FAQ";
import CTABanner from "#/PageComponents/CTABanner/CTABanner";
import Variant1 from "#/PageComponents/ContactForms/Variant1/Form";

import {
  faMobileAlt, faSearch, faDatabase, faLayerGroup,
  faIndustry, faFileContract, faBoxes, faChartBar,
  faRocket, faGlobe, faTrophy, faChartLine, faClock,
  faPalette, faBullhorn, faCode, faTools,
} from "@fortawesome/free-solid-svg-icons";

export default function ManufacturingIndustryPage() {

  const painPoints = [
    {
      icon: faFileContract,
      problem: "No structured RFQ system — buyers email or call to request quotes",
      consequence: "Procurement managers evaluating multiple vendors expect a fast, professional quote request process. An unstructured email flow signals a less organized operation and loses bids before the first number is submitted.",
    },
    {
      icon: faBoxes,
      problem: "Distributors and partners have no online portal for orders or documentation",
      consequence: "Distributors managing multiple manufacturer relationships gravitate toward the ones with the easiest ordering and documentation experience. Without a portal, you're adding friction to every transaction.",
    },
    {
      icon: faSearch,
      problem: "No B2B content strategy — buyers can't find you in industry searches",
      consequence: "Procurement teams, engineers, and project managers search for manufacturers by product type, capability, and certification. Without targeted content, you're invisible to the searches that drive high-value B2B inquiries.",
    },
    {
      icon: faDatabase,
      problem: "Production tracking and inventory management in spreadsheets",
      consequence: "Manual production tracking creates data gaps, inventory errors, and slow response times when clients request status updates — all of which erode confidence in your operation.",
    },
    {
      icon: faIndustry,
      problem: "Website doesn't communicate certifications, capacity, or capabilities",
      consequence: "Manufacturers win B2B business by demonstrating capability before the conversation. If your certifications, production capacity, equipment specs, and quality standards aren't clearly structured online, you're not on the shortlist.",
    },
    {
      icon: faMobileAlt,
      problem: "Your digital presence looks like a brochure, not a business asset",
      consequence: "A static, text-heavy website that hasn't changed in years tells procurement teams that your operation isn't keeping pace with the industry. First impressions matter even in B2B manufacturing.",
    },
  ];

  const whyFeatures = [
    {
      icon: faFileContract,
      title: "RFQ & Procurement Intake Systems",
      description: "We build structured RFQ portals that give buyers a fast, professional way to submit quote requests — including product specs, quantities, delivery requirements, and file uploads — all routed directly to your sales team.",
    },
    {
      icon: faBoxes,
      title: "Distributor & Partner Portals",
      description: "Custom web portals where distributors can place orders, access product documentation, track shipment status, and download marketing materials — reducing your sales team's administrative overhead on every transaction.",
    },
    {
      icon: faChartBar,
      title: "B2B SEO & Technical Content Strategy",
      description: "We develop targeted content around the specific product types, certifications, and capabilities your buyers search for — building long-term organic visibility in the niche B2B searches that drive real manufacturing contracts.",
    },
  ];

  const processSteps = [
    { number: 1, title: "Audit Your B2B Digital Presence",    description: "We evaluate your current site, search visibility, and how your capabilities are communicated — against what procurement teams actually look for when evaluating manufacturers.", icon: faSearch },
    { number: 2, title: "Build Your Capability Showcase Site", description: "A certification-forward, capability-structured website with an RFQ system and content strategy that positions you for the B2B searches you should be winning.", icon: faRocket },
    { number: 3, title: "Build Distributor & Ops Tools",       description: "Partner portals, production tracking, and inventory management tools that reduce admin overhead and create a professional partner experience.", icon: faTools },
    { number: 4, title: "Content, SEO & Ongoing Optimization", description: "Technical content updates, product spec pages, and B2B SEO refinements that compound your visibility over time.", icon: faChartLine },
  ];

  const metrics = [
    { icon: faTrophy,    value: 28,  label: "Custom tools built for Texas industrial businesses", suffix: "",    duration: 2 },
    { icon: faChartLine, value: 65,  label: "Average admin hours saved weekly with custom tools",  suffix: "hrs", duration: 3 },
    { icon: faClock,     value: 13,  label: "Years serving Texas businesses",                       suffix: "+",   duration: 2 },
  ];

  const comparisonRows = [
    { feature: "Structured RFQ intake system",        us: "✅ Custom portal built",             others: "❌ Email or contact form only" },
    { feature: "Distributor / partner portal",        us: "✅ Full-featured custom portal",     others: "❌ Not offered" },
    { feature: "B2B capability-focused design",       us: "✅ Built for procurement buyers",    others: "❌ Generic business site" },
    { feature: "Technical B2B content strategy",      us: "✅ Product + cert + capability",     others: "❌ Generic SEO only" },
    { feature: "Texas industrial market knowledge",   us: "✅ 10+ years local",                 others: "❌ No industry context" },
  ];

  const faq = [
    {
      question: "What should a manufacturing company's website focus on to win more B2B business?",
      answer: "Procurement managers and engineers need to quickly verify: your certifications and quality standards, production capacity and equipment capabilities, relevant industry experience, and how to initiate a quote request. Most manufacturer websites bury or omit half of these — which is why they don't convert B2B traffic.",
    },
    {
      question: "What is an RFQ portal and does my manufacturing company need one?",
      answer: "An RFQ (request for quote) portal is a structured online form that lets buyers submit detailed quote requests — product specs, quantities, materials, delivery timeframes — directly to your sales team in a consistent format. If you're receiving quote requests by email or phone and manually gathering information back and forth, an RFQ portal typically saves your sales team 5–10 hours per week immediately.",
    },
    {
      question: "Can you build a distributor portal for my manufacturing network?",
      answer: "Yes — we build custom portals where your distributors can access current product catalogs, place orders, download spec sheets and marketing materials, track order status, and communicate directly with your team. Most manufacturers with distributor networks see significant relationship improvement and reduced sales overhead after launch.",
    },
    {
      question: "How do you do B2B SEO for a manufacturing company?",
      answer: "B2B manufacturing SEO focuses on product type searches ('custom aluminum extrusions Texas'), capability searches ('ISO 9001 certified manufacturer'), and industry searches ('defense contractor manufacturer Texas'). We build targeted content pages around each of these clusters — creating long-term organic visibility with the buyers who matter.",
    },
    {
      question: "Can you build production tracking or inventory management software?",
      answer: "Yes — we build custom production tracking dashboards, inventory management tools, and client-facing status portals that replace spreadsheets and disconnected systems. Everything is built around your specific production workflow, not a generic off-the-shelf template.",
    },
  ];

  const services = [
    { icon: faGlobe,    title: "Manufacturing Website Design",  body: "Capability-forward, B2B-optimized websites with RFQ portals and structured content.",       link: "/services/website-design" },
    { icon: faCode,     title: "Distributor & Ops Software",    body: "Partner portals, production tracking, and inventory tools built for manufacturing.",           link: "/services/software-engineering" },
    { icon: faBullhorn, title: "B2B Digital Marketing",         body: "Technical content and B2B SEO that puts your capabilities in front of the right buyers.",     link: "/services/marketing-solutions" },
    { icon: faPalette,  title: "Manufacturing Brand & Identity", body: "Professional brand systems that communicate quality, precision, and industrial credibility.", link: "/services/graphic-design" },
  ];

  return (
    <main className={styles.pageWrapper}>

      <Breadcrumb crumbs={[
        { label: "Home", href: "/" },
        { label: "Industries", href: "/industries" },
        { label: "Manufacturing" },
      ]} />

      <SectionIntro
        title="Web Design & Software for Manufacturing Companies"
        subtitle="RFQ portals, distributor web apps, and B2B digital presence built for manufacturers in Texas — turn your website into your best sales asset."
      />

      <TrustBar headline="Trusted by Texas industrial and manufacturing businesses for 10+ years" />

      <IndustryPainPoints
        industry="manufacturing"
        painPoints={painPoints}
        ctaText="Upgrade My Manufacturing Presence"
        ctaLink="/contact"
      />

      <div className={styles.section}>
        <WhyChooseUs
          cityName="manufacturing companies"
          features={whyFeatures}
          title="What We Build Differently for Manufacturers"
        />
      </div>

      <div className={styles.section}>
        <ProcessTimeline steps={processSteps} cityName="your manufacturing business" />
      </div>

      <div className={styles.section}>
        <ImpactMetrics metrics={metrics} cityName="manufacturing" />
      </div>

      <div className={styles.section}>
        <TechStack
          title="Enterprise Technology for Manufacturing Operations"
          subtitle="Scalable, secure, and built to handle production volume — from the front office to the shop floor."
        />
      </div>

      <div className={styles.section}>
        <ServiceCardComponent
          heading="Every Service Your Manufacturing Company Needs"
          cards={services}
        />
      </div>

      <div className={styles.section}>
        <ValueComparison rows={comparisonRows} />
      </div>

      <div className={styles.section}>
        <FAQ cityName="manufacturing" faq={faq} title="Manufacturing Digital Services FAQs" />
      </div>

      <CTABanner
        headline="Ready to Turn Your Website Into a B2B Sales Asset?"
        subline="RFQ portals, distributor apps, and technical content built for manufacturers in Texas. Free discovery call."
        primaryText="Start With a Free Discovery Call"
        primaryLink="/contact"
        secondaryText="Call Us Now"
        secondaryLink="tel:+12549002520"
      />

      <div className={styles.section}>
        <Variant1
          title="Tell Us About Your Manufacturing Business"
          cityName="Waco"
          slug="industries/manufacturing"
          spot="manufacturing-industry-page"
          formVariant={1}
        />
      </div>

    </main>
  );
}