import type { Metadata } from 'next';
import { getPostBySlug } from '../../../../libs/blog-posts';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hvac-pro-template.vercel.app';
const slug     = 'how-often-should-you-replace-hvac-filter';
const post     = getPostBySlug(slug)!;
const url      = `${BASE_URL}/blogs/${slug}`;
const imgUrl   = `${BASE_URL}/pages/blogs/hvac-filter.jpg`;

export const metadata: Metadata = {
  title: `${post.title} | Scott Applications`,
  description: post.excerpt,
  keywords: ['hvac filter replacement', 'how often change air filter waco', 'hvac maintenance central texas', 'air filter waco'],
  authors: [{ name: 'Joshua Feliciano', url: BASE_URL }],
  alternates: { canonical: url },
  openGraph: {
    title: post.title,
    description: post.excerpt,
    url,
    siteName: 'Scott Applications',
    locale: 'en_US',
    type: 'article',
    publishedTime: '2026-04-14T08:00:00-05:00',
    modifiedTime: '2026-04-14T08:00:00-05:00',
    authors: ['Joshua Feliciano'],
    images: [{ url: imgUrl, width: 1200, height: 630, alt: post.imageAlt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: post.title,
    description: post.excerpt,
    images: [imgUrl],
  },
  robots: { index: true, follow: true },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  description: post.excerpt,
  datePublished: '2026-04-14T08:00:00-05:00',
  dateModified: '2026-04-14T08:00:00-05:00',
  author: {
    '@type': 'Person',
    name: 'Joshua Feliciano',
    url: BASE_URL,
    jobTitle: 'Founder, Scott Applications',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Scott Applications',
    url: BASE_URL,
    logo: { '@type': 'ImageObject', url: `${BASE_URL}/logos/scott-apps-lager.png` },
  },
  image: imgUrl,
  url,
  mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  keywords: 'hvac filter replacement, how often change air filter waco',
  articleSection: 'Maintenance',
  inLanguage: 'en-US',
};

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': url,
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', 'h2'],
  },
  url,
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blogs` },
    { '@type': 'ListItem', position: 3, name: post.title, item: url },
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}