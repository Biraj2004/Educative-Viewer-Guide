import type { Metadata } from 'next';
import { Space_Grotesk, IBM_Plex_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { BRAND_LOGO_ICON_PATH } from '@/lib/branding';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: 'EducativeViewer | Explore. Code. Master Everything.',
  description: 'A premium viewer and scraper for educational content.',
  icons: {
    icon: BRAND_LOGO_ICON_PATH,
    shortcut: BRAND_LOGO_ICON_PATH,
    apple: BRAND_LOGO_ICON_PATH,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`dark ${spaceGrotesk.variable} ${ibmPlexMono.variable} bg-background text-slate-50 min-h-screen selection:bg-cyan-500/30`}
      >
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-slate-900 focus:px-3 focus:py-2 focus:text-white">
          Skip to main content
        </a>
        <main id="main-content" className="max-w-7xl mx-auto pt-5 md:pt-14 pb-2 md:pb-5">
          {children}
        </main>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
