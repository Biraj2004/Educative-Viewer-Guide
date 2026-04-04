'use client';

import type { MouseEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BRAND_LOGO_IMAGE_PATH } from '@/lib/branding';

export const Navbar = () => {
  const scrollToTop = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 inset-x-0 z-30 border-b border-slate-800/60 bg-background/70 backdrop-blur-xl" role="banner">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between" aria-label="Primary navigation">
        <Link
          href="/"
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 text-slate-100 text-sm sm:text-base font-semibold hover:text-cyan-300 transition-colors"
        >
          <Image src={BRAND_LOGO_IMAGE_PATH} alt="Educative Viewer logo" width={28} height={28} className="rounded-sm" />
          <span className="hidden sm:inline">Educative Viewer Guide</span>
          <span className="sm:hidden">Guide</span>
        </Link>

        <Link
          href="https://github.com/Biraj2004/EducativeViewer"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-md border border-transparent px-2.5 py-1.5 text-slate-300 text-sm sm:text-base font-medium transition-all hover:border-cyan-500/30 hover:bg-slate-900/60 hover:text-cyan-300"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            aria-hidden="true"
            fill="currentColor"
          >
            <path d="M12 0.5C5.37 0.5 0 5.87 0 12.5c0 5.31 3.44 9.82 8.21 11.41.6.11.79-.26.79-.58 0-.29-.01-1.05-.02-2.06-3.34.73-4.05-1.61-4.05-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.74.08-.74 1.2.08 1.84 1.24 1.84 1.24 1.08 1.84 2.82 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.66-.31-5.47-1.33-5.47-5.92 0-1.31.47-2.39 1.24-3.24-.13-.31-.54-1.56.12-3.24 0 0 1.01-.32 3.3 1.24a11.42 11.42 0 0 1 6 0c2.29-1.56 3.3-1.24 3.3-1.24.66 1.68.25 2.93.12 3.24.77.85 1.24 1.93 1.24 3.24 0 4.6-2.82 5.61-5.5 5.91.43.37.82 1.11.82 2.24 0 1.62-.01 2.92-.01 3.32 0 .32.19.7.8.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z" />
          </svg>
          View Project
        </Link>
      </nav>
    </header>
  );
};
