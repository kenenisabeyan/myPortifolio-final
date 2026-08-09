/**
 * siteConfig.ts
 *
 * Single source of truth for site-wide metadata.
 * VITE_SITE_URL is injected at build time from the .env file.
 * Vite replaces import.meta.env.VITE_SITE_URL with the actual value.
 * Falls back to the production domain so production builds are
 * always correct even if the env var is accidentally missing.
 */

export const SITE_URL =
  (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') ??
  'https://kenenisabeyan.com'

export const siteConfig = {
  /** Public-facing name */
  name: 'Kenenisa Beyan',

  /** Browser tab / og:title */
  title: 'Kenenisa Beyan — Full-Stack Software Engineer',

  /** Global meta description */
  description:
    'Kenenisa Beyan is a Full-Stack Software Engineer building scalable, production-grade digital products and modern web platforms.',

  /** Production URL (no trailing slash) */
  url: SITE_URL,

  /** Main OG image path (relative to public/) */
  ogImagePath: '/og/kenenisa-beyan-og.png',

  /** Fully-qualified OG image URL for crawlers */
  get ogImage() {
    return `${this.url}${this.ogImagePath}`
  },

  /** Canonical homepage URL */
  get canonical() {
    return `${this.url}/`
  },

  /** Brand color (matches --background in dark mode) */
  themeColor: '#07101f',

  /** Verified social links (confirmed from footer) */
  social: {
    github:        'https://github.com/kenenisabeyan',
    linkedin:      'https://www.linkedin.com/in/kenenisa/',
    twitter:       'https://twitter.com/kenenisa94931',
    twitterHandle: '@kenenisa94931',
  },

  /** Search engine verification variables */
  verification: {
    google: import.meta.env.VITE_GOOGLE_SITE_VERIFICATION ?? '',
    bing: import.meta.env.VITE_BING_SITE_VERIFICATION ?? '',
  },

  /**
   * Project metadata.
   * These match the project slugs used in data.js.
   * OG images live in public/og/projects/<slug>.png
   */
  projects: [
    {
      slug: 'edot',
      title: 'EDOT Platform — Kenenisa Beyan',
      description:
        'A modular, full-stack education ecosystem engineered to deliver scalable, structured digital learning experiences.',
      get ogImage() {
        return `${SITE_URL}/og/projects/edot.png`
      },
    },
    {
      slug: 'followflow',
      title: 'FollowFlow — Kenenisa Beyan',
      description:
        'A premium CRM and Task Tracking Dashboard for managing client networks and workflow orchestration.',
      get ogImage() {
        return `${SITE_URL}/og/projects/followflow.png`
      },
    },
    {
      slug: 'performance-evaluator',
      title: 'Performance Evaluator — Kenenisa Beyan',
      description:
        'A full-stack employee evaluation dashboard with role-based access control and real-time analytics.',
      get ogImage() {
        return `${SITE_URL}/og/projects/performance-evaluator.png`
      },
    },
    {
      slug: 'clientflow',
      title: 'ClientFlow — Kenenisa Beyan',
      description:
        'A comprehensive CRM platform for managing client interactions, pipelines, and analytics.',
      get ogImage() {
        return `${SITE_URL}/og/projects/clientflow.png`
      },
    },
  ],
} as const
