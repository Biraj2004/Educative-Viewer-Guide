'use client';

import { useState } from 'react';
import { Hero } from '@/components/Hero';
import { Navbar } from '@/components/Navbar';
import { AuthorCard } from '@/components/AuthorCard';
import { ScreenshotSection } from '@/components/ScreenshotSection';
import { SetupGuide } from '@/components/SetupGuide';
import { ReleaseVersion } from '@/components/ReleaseVersion';
import { Footer } from '@/components/Footer';

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<'viewer' | 'scraper'>('viewer');

  const viewerScreenshots = [
    { src: '/assets/1.jpg', alt: 'EducativeViewer screenshot 1' },
    { src: '/assets/2.jpg', alt: 'EducativeViewer screenshot 2' },
    { src: '/assets/3.jpg', alt: 'EducativeViewer screenshot 3' },
    { src: '/assets/4.jpg', alt: 'EducativeViewer screenshot 4' },
    { src: '/assets/5.jpg', alt: 'EducativeViewer screenshot 5' },
  ];

  return (
    <div className="min-h-screen pb-1 md:pb-2">
      <Navbar />
      <Hero />

      <div className="max-w-5xl mx-auto mt-0 md:mt-6 relative z-20 px-4 sm:px-6">
        <ScreenshotSection images={viewerScreenshots} />
      </div>
      
      {/* Author / Product Toggles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 max-w-5xl mx-auto mt-12 md:mt-20 mb-16 md:mb-28 z-20 relative px-4 sm:px-6">
        <AuthorCard 
          id="viewer"
          active={activeTab === 'viewer'}
          onSelect={setActiveTab}
          name="Biraj Sarkar"
          role="Developer"
          handle="@Biraj2004"
          description="Architect of the Edu-Viewer interface and React ecosystem. Responsible for component logic, routing, UI/UX consistency, and core application rendering engines."
          avatarInitial="B"
          gradient="from-blue-600 to-indigo-600"
          projects={[
            { name: 'EducativeViewer', type: 'Public Release', url: 'https://github.com/Biraj2004/EducativeViewer', badgeColor: 'text-cyan-400' }
          ]}
        />
        <AuthorCard 
          id="scraper"
          active={activeTab === 'scraper'}
          onSelect={setActiveTab}
          name="Anilabha Datta"
          role="Developer"
          handle="@anilabhadatta"
          description="Mastermind behind the data extraction pipeline. Developed the robust scraping engine ensuring seamless content portability into structured JSON formats."
          avatarInitial="A"
          gradient="from-purple-600 to-rose-600"
          projects={[
            { name: 'educative.io_scraper', type: 'Data Extraction Tool', url: 'https://github.com/anilabhadatta/educative.io_scraper', badgeColor: 'text-purple-400' }
          ]}
        />
      </div>

      {/* Setup Guide Section */}
      <div id="guide" className="max-w-5xl mx-auto border-t border-slate-800/80 pt-14 md:pt-24 relative overflow-hidden px-4 sm:px-6">
        {/* Subtle setup bg glow */}
        <div className="absolute top-0 inset-x-0 w-full h-px bg-linear-to-r from-transparent via-cyan-900/30 to-transparent" />
        
        <div className="mb-10 md:mb-16 text-center md:text-left flex items-center justify-between flex-wrap gap-5 md:gap-8 z-10 relative">
          <div className="mx-auto md:mx-0">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-3 md:mb-4 tracking-tight leading-tight">
              {activeTab === 'viewer' ? 'Educative Viewer Complete Setup Guide' : 'Scraper Complete Setup Guide'}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base md:text-xl leading-relaxed">
              {activeTab === 'viewer' ? 'Detailed setup and run guide for this Next.js repository on Windows, including install, local dev, production build, and release usage.' : 'Companion Extraction Setup and Course Downloader developed using Python and Selenium.'}
            </p>
          </div>
          <div className="w-full md:w-auto flex flex-col md:flex-row items-center gap-3 justify-center md:justify-end">
            <a
              href={activeTab === 'viewer' ? 'https://github.com/Biraj2004/EducativeViewer/releases' : 'https://github.com/anilabhadatta/educative.io_scraper/releases'}
              target="_blank"
              rel="noreferrer"
              className="w-3/4 md:w-auto text-center px-6 sm:px-8 py-4 bg-white text-slate-950 hover:bg-cyan-100 transition-colors font-bold rounded-xl shadow-lg ring-4 ring-white/10"
            >
              Download {activeTab === 'viewer' ? 'Viewer' : 'Scraper'}
            </a>
            {activeTab === 'viewer' ? (
              <ReleaseVersion owner="Biraj2004" repo="EducativeViewer" />
            ) : (
              <ReleaseVersion owner="anilabhadatta" repo="educative.io_scraper" />
            )}
          </div>
        </div>
        
        {/* Render beautifully styled setup instructions */}
        <SetupGuide type={activeTab} />
      </div>

      <Footer />
    </div>
  );
}