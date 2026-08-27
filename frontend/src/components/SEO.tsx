/**
 * SEO.tsx
 *
 * Advanced runtime SEO component for Vite + React SPA.
 * Manages document title, meta tags (OpenGraph, Twitter, Keywords), canonical link,
 * and dynamically injects Schema.org JSON-LD structured data graph into DOM.
 */

import { useEffect } from 'react'
import { siteConfig } from '../config/siteConfig'
import { usePortfolioData } from '../context/PortfolioContext'

interface SEOProps {
  /** Overrides the default tab title */
  title?: string
  /** Overrides the default meta description */
  description?: string
  /** Overrides default social image preview */
  image?: string
  /** Canonical URL path */
  canonicalUrl?: string
}

export function SEO({ title, description, image, canonicalUrl }: SEOProps) {
  const { data } = usePortfolioData()
  const settings = data?.siteSettings || {}
  const projects = data?.projects || []

  const resolvedTitle = title
    ? `${title} — ${settings.siteTitle || siteConfig.name}`
    : (settings.siteTitle || siteConfig.title)

  const resolvedDescription = description ?? (settings.metaDescription || siteConfig.description)
  const resolvedImage = image || settings.heroPhotoUrl || siteConfig.ogImage
  const resolvedCanonical = canonicalUrl || siteConfig.url
  const faviconUrl = settings.faviconUrl

  const updateMetaTag = (selector: string, attr: string, value: string) => {
    let el = document.querySelector(selector)
    if (!el) {
      el = document.createElement('meta')
      if (selector.includes('property=')) {
        const prop = selector.match(/property="([^"]+)"/)?.[1]
        if (prop) el.setAttribute('property', prop)
      } else if (selector.includes('name=')) {
        const name = selector.match(/name="([^"]+)"/)?.[1]
        if (name) el.setAttribute('name', name)
      }
      document.head.appendChild(el)
    }
    el.setAttribute(attr, value)
  }

  useEffect(() => {
    // 1. Browser Tab Title
    document.title = resolvedTitle

    // 2. Primary Meta Tags
    updateMetaTag('meta[name="title"]', 'content', resolvedTitle)
    updateMetaTag('meta[name="description"]', 'content', resolvedDescription)
    updateMetaTag(
      'meta[name="keywords"]',
      'content',
      'by kenenisa, by kenenisa beyan, portfolio by kenenisa, projects by kenenisa, software by kenenisa, developed by kenenisa, engineered by kenenisa, k, ke, ken, kene, kenen, keneni, kenenis, kenenisa, kenenisabeyan, kenenisa software, kenenisa software developers, kenenisa software engineer, kenenisa developers, Kenenisa Beyan, Kenenisa developer, Kenenisa full stack, Kenenisa Ethiopia, EDOT Platform, React, Node.js, TypeScript'
    )

    // 3. OpenGraph Meta Tags
    updateMetaTag('meta[property="og:title"]', 'content', resolvedTitle)
    updateMetaTag('meta[property="og:description"]', 'content', resolvedDescription)
    updateMetaTag('meta[property="og:image"]', 'content', resolvedImage)
    updateMetaTag('meta[property="og:url"]', 'content', resolvedCanonical)
    updateMetaTag('meta[property="og:site_name"]', 'content', settings.siteTitle || 'Kenenisa Beyan')

    // 4. Twitter Card Meta Tags
    updateMetaTag('meta[name="twitter:title"]', 'content', resolvedTitle)
    updateMetaTag('meta[name="twitter:description"]', 'content', resolvedDescription)
    updateMetaTag('meta[name="twitter:image"]', 'content', resolvedImage)

    // 5. Canonical Link
    let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.rel = 'canonical'
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.href = resolvedCanonical

    // 6. Dynamic Favicon
    if (faviconUrl) {
      let iconTag = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
      if (!iconTag) {
        iconTag = document.createElement('link')
        iconTag.rel = 'icon'
        document.head.appendChild(iconTag)
      }
      iconTag.href = faviconUrl
    }

    // 7. Dynamic Schema.org JSON-LD Structured Data Graph
    let jsonLdScript = document.getElementById('dynamic-jsonld') as HTMLScriptElement | null
    if (!jsonLdScript) {
      jsonLdScript = document.createElement('script')
      jsonLdScript.id = 'dynamic-jsonld'
      jsonLdScript.type = 'application/ld+json'
      document.head.appendChild(jsonLdScript)
    }

    const schemaGraph = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Person',
          '@id': `${siteConfig.url}/#person`,
          name: 'Kenenisa Beyan',
          givenName: 'Kenenisa',
          familyName: 'Beyan',
          alternateName: [
            'by kenenisa',
            'by kenenisa beyan',
            'portfolio by kenenisa',
            'projects by kenenisa',
            'software by kenenisa',
            'developed by kenenisa',
            'engineered by kenenisa',
            'k',
            'ke',
            'ken',
            'kene',
            'kenen',
            'keneni',
            'kenenis',
            'kenenisa',
            'kenenisabeyan',
            'kenenisa software',
            'kenenisa software developers',
            'kenenisa software engineer',
            'kenenisa developers',
            'Kenenisa Beyan',
            'Kenenisa Developer',
            'Kenenisa Software Engineer',
            'Keno Beyan'
          ],
          url: siteConfig.url,
          jobTitle: 'Full-Stack Software Engineer',
          description: resolvedDescription,
          sameAs: [
            settings.githubUrl || siteConfig.social.github,
            settings.linkedinUrl || siteConfig.social.linkedin,
            settings.twitterUrl || siteConfig.social.twitter
          ].filter(Boolean),
          worksFor: {
            '@type': 'Organization',
            name: 'EDOT Platform'
          },
          alumniOf: {
            '@type': 'EducationalOrganization',
            name: 'Adama Science and Technology University (ASTU)'
          },
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'Ethiopia'
          },
          knowsAbout: [
            'React', 'Next.js', 'Node.js', 'TypeScript', 'Python', 'Django',
            'PostgreSQL', 'MongoDB', 'Full-Stack Web Development', 'Software Architecture', 'EdTech'
          ]
        },
        {
          '@type': 'WebSite',
          '@id': `${siteConfig.url}/#website`,
          url: siteConfig.url,
          name: settings.siteTitle || 'Kenenisa Beyan',
          alternateName: 'Kenenisa Beyan Portfolio',
          description: resolvedDescription,
          about: { '@id': `${siteConfig.url}/#person` },
          inLanguage: 'en-US'
        },
        ...projects.slice(0, 5).map(p => ({
          '@type': 'SoftwareApplication',
          '@id': `${siteConfig.url}/#project-${p.id}`,
          name: p.title,
          description: p.description,
          applicationCategory: 'SoftwareApplication',
          operatingSystem: 'Web',
          author: { '@id': `${siteConfig.url}/#person` },
          url: p.githubUrl || p.liveUrl || `${siteConfig.url}/#work`
        })),
        {
          '@type': 'FAQPage',
          '@id': `${siteConfig.url}/#faqpage`,
          mainEntity: [
            {
              '@type': 'Question',
              name: 'Who is Kenenisa Beyan?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Kenenisa Beyan (Kenenisa) is a Full-Stack Software Engineer, Founder of EDOT Platform, and ASTU graduate specializing in building production-grade web applications, RESTful APIs, and scalable software systems.'
              }
            },
            {
              '@type': 'Question',
              name: 'What software engineering services does Kenenisa Beyan provide?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Kenenisa Beyan provides full-stack web application development, custom software engineering, REST API architecture, database design, cloud deployment, and system performance optimization.'
              }
            },
            {
              '@type': 'Question',
              name: 'What tech stack does Kenenisa Beyan specialize in?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Kenenisa Beyan specializes in React, Next.js, Node.js, TypeScript, Python, Django, PostgreSQL, MongoDB, Docker, Tailwind CSS, and RESTful microservice architectures.'
              }
            }
          ]
        }
      ]
    }

    jsonLdScript.textContent = JSON.stringify(schemaGraph)

  }, [resolvedTitle, resolvedDescription, resolvedImage, resolvedCanonical, faviconUrl, settings, projects])

  return null
}

export default SEO
