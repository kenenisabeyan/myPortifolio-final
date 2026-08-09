/**
 * portfolioData.ts
 *
 * Fetches dynamic portfolio content from the CMS backend (/api/public/portfolio).
 * Falls back to local static definitions (data.js) if backend is unreachable,
 * guaranteeing 100% reliability and zero public site downtime.
 */

import * as staticData from '../data/data.js';

const API_BASE = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') || 'http://localhost:5001';

export interface PortfolioDataResponse {
  visibility: Record<string, boolean>;
  projects: any[];
  experiences: any[];
  education: any[];
  skills: any[];
  achievements: any[];
  testimonials: any[];
  blogs: any[];
  news: any[];
  siteSettings: any;
}

export async function fetchPublicPortfolioData(): Promise<PortfolioDataResponse> {
  try {
    const res = await fetch(`${API_BASE}/api/public/portfolio`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) throw new Error('API network response error');

    const json = await res.json();
    if (json.success && json.data) {
      return {
        visibility: json.data.visibility || {},
        projects: json.data.projects?.length ? json.data.projects : staticData.projects,
        experiences: json.data.experiences?.length ? json.data.experiences : staticData.experiences,
        education: json.data.education?.length ? json.data.education : [],
        skills: json.data.skills?.length ? json.data.skills : staticData.skills,
        achievements: json.data.achievements?.length ? json.data.achievements : [],
        testimonials: json.data.testimonials?.length ? json.data.testimonials : staticData.testimonials,
        blogs: json.data.blogs || [],
        news: json.data.news || [],
        siteSettings: json.data.siteSettings || {},
      };
    }
  } catch (err) {
    console.warn('Backend API unavailable. Using static fallback data.', err);
  }

  // Static Fallback Guarantee
  return {
    visibility: {
      hero: true,
      overview: true,
      snapshot: true,
      approach: true,
      'what-i-bring': true,
      services: true,
      capabilities: true,
      'problems-i-solve': true,
      work: true,
      'engineering-challenges': true,
      experience: true,
      education: true,
      'how-i-work': true,
      'currently-building': true,
      achievements: true,
      'github-activity': true,
      testimonials: true,
      'career-direction': true,
      contact: true,
    },
    projects: staticData.projects,
    experiences: staticData.experiences,
    education: [],
    skills: staticData.skills,
    achievements: [],
    testimonials: staticData.testimonials,
    blogs: [],
    news: [],
    siteSettings: {},
  };
}

export async function trackAnalyticsEvent(event: {
  type: string;
  section?: string;
  projectId?: string;
  device?: string;
}) {
  try {
    await fetch(`${API_BASE}/api/public/analytics/event`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...event,
        referrer: document.referrer || 'direct',
        sessionId: getOrCreateSessionId(),
      }),
    });
  } catch (e) {}
}

function getOrCreateSessionId(): string {
  let id = sessionStorage.getItem('portfolio_sess_id');
  if (!id) {
    id = `sess-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
    sessionStorage.setItem('portfolio_sess_id', id);
  }
  return id;
}
