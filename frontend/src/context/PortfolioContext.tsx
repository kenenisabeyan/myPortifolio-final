import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchPublicPortfolioData, PortfolioDataResponse } from '../services/portfolioData';
import * as staticData from '../data/data.js';

interface PortfolioContextType {
  data: PortfolioDataResponse;
  loading: boolean;
  refreshData: () => Promise<void>;
}

const defaultContextValue: PortfolioDataResponse = {
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
    'events-gallery': true,
    'achievements-and-events': true,
    contact: true,
  },
  sectionContent: {},
  projects: staticData.projects,
  experiences: staticData.experiences,
  education: [
    {
      id: 'edu-1',
      institution: 'Adama Science and Technology University (ASTU)',
      program: 'B.Sc. in Computer Science & Engineering',
      period: '2021 - Present',
      description: 'Solid academic foundation in algorithms, software engineering, databases, computer networking, and system architecture.',
      achievement: 'Active tech lead & project developer.',
      visibility: true,
    },
    {
      id: 'edu-2',
      institution: 'Adama Science and Technology University (ASTU)',
      program: 'B.A. in Management (Weekend Program)',
      period: '2022 - Present',
      description: 'Developing key business insights, strategic planning, project management, and organizational leadership skills.',
      achievement: 'Dual discipline qualification.',
      visibility: true,
    }
  ],
  skills: staticData.skills,
  achievements: [
    {
      id: 'ach-1',
      title: 'Entrepreneurship & Startup Innovation Fellow',
      organization: 'Ministry of Innovation & Technology (MinT)',
      period: 'February 2025',
      description: 'Successfully completed the Early-Stage Startup Training Program in partnership with MinT, KOICA, and OSTA. Developed the EDOT Platform with a focus on transforming local creative ideas into scalable, product-ready services.',
      visibility: true,
    }
  ],
  testimonials: staticData.testimonials,
  blogs: [],
  news: [],
  eventsGallery: [],
  galleryPhotos: [],
  siteSettings: {
    siteTitle: 'Kenenisa Beyan — Full-Stack Software Engineer',
    metaDescription: 'Kenenisa Beyan is a Full-Stack Software Engineer building scalable, production-grade digital products and modern web platforms.',
    contactEmail: 'kenenisab05@gmail.com',
    githubUrl: 'https://github.com/kenenisabeyan',
    linkedinUrl: 'https://www.linkedin.com/in/kenenisa/',
    twitterUrl: 'https://twitter.com/kenenisa94931',
    heroPhotoUrl: '',
    aboutPhotoUrl: '',
  },
};

const PortfolioContext = createContext<PortfolioContextType>({
  data: defaultContextValue,
  loading: false,
  refreshData: async () => {},
});

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioDataResponse>(defaultContextValue);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const fetched = await fetchPublicPortfolioData();
      setData(fetched);
    } catch (err) {
      console.warn('Using static fallback for portfolio context', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <PortfolioContext.Provider value={{ data, loading, refreshData: loadData }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolioData = () => useContext(PortfolioContext);
