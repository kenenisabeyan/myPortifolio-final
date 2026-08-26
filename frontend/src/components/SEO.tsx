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
import { usePortfolioData } from '../context/PortfolioContext'

interface SEOProps {
  /** Overrides the default tab title. Appended with " — Kenenisa Beyan" */
  title?: string
  /** Overrides the default meta description */
  description?: string
}

export function SEO({ title, description }: SEOProps) {
  const { data } = usePortfolioData()
  const settings = data?.siteSettings || {}

  const resolvedTitle = title
    ? `${title} — ${settings.siteTitle || siteConfig.name}`
    : (settings.siteTitle || siteConfig.title)

  const resolvedDescription = description ?? (settings.metaDescription || siteConfig.description)
  const faviconUrl = settings.faviconUrl

  useEffect(() => {
    // Update browser tab title
    document.title = resolvedTitle

    // Update meta description
    const descTag = document.querySelector('meta[name="description"]')
    if (descTag) descTag.setAttribute('content', resolvedDescription)

    // Update dynamic favicon icon
    if (faviconUrl) {
      let iconTag = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
      if (!iconTag) {
        iconTag = document.createElement('link')
        iconTag.rel = 'icon'
        document.head.appendChild(iconTag)
      }
      iconTag.href = faviconUrl
    }
  }, [resolvedTitle, resolvedDescription, faviconUrl])

  return null
}

export default SEO
