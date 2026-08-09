/**
 * SEO.tsx
 *
 * A lightweight runtime SEO component for a Vite + React SPA.
 *
 * ⚠️  IMPORTANT ARCHITECTURAL NOTE:
 * This is a single-page application with no server-side rendering.
 * Social media crawlers (Facebook, LinkedIn, WhatsApp, Telegram…)
 * read the STATIC index.html — they do NOT execute JavaScript.
 *
 * Therefore:
 * - Static global metadata (og:title, og:image, canonical, etc.) lives
 *   in index.html and is always crawler-visible.
 * - This component handles runtime changes that affect the BROWSER tab
 *   title and document.title only (useful for future routing upgrades).
 * - If you ever add react-router or migrate to a framework with SSR
 *   (e.g. Next.js, Remix), replace this component with native metadata.
 *
 * Usage:
 *   <SEO title="Custom Page Title" description="..." />
 */

import { useEffect } from 'react'
import { siteConfig } from '../config/siteConfig'

interface SEOProps {
  /** Overrides the default tab title. Appended with " — Kenenisa Beyan" */
  title?: string
  /** Overrides the default meta description */
  description?: string
}

export function SEO({ title, description }: SEOProps) {
  const resolvedTitle = title
    ? `${title} — ${siteConfig.name}`
    : siteConfig.title

  const resolvedDescription = description ?? siteConfig.description

  useEffect(() => {
    // Update browser tab title
    document.title = resolvedTitle

    // Update meta description (runtime only — crawler reads index.html)
    const descTag = document.querySelector('meta[name="description"]')
    if (descTag) descTag.setAttribute('content', resolvedDescription)
  }, [resolvedTitle, resolvedDescription])

  return null
}

export default SEO
