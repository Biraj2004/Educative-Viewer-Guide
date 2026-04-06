import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { BRAND_LOGO_IMAGE_PATH } from '@/lib/branding';

export const Footer = () => {
  return (
    <footer className="max-w-7xl mx-auto mt-10 md:mt-20 border-y border-slate-800/70 bg-[#030816]">
      <div className="px-4 sm:px-8 py-5 sm:py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 text-sm">
          <div className="inline-flex items-center justify-center md:justify-start gap-2.5 font-semibold text-slate-100">
            <Image src={BRAND_LOGO_IMAGE_PATH} alt="Educative Viewer logo" width={26} height={26} className="rounded-sm" />
            <span className="text-slate-200">Educative Viewer</span>
          </div>

          <p className="text-slate-400 text-center">© 2026 rafted with precision</p>

          <a
            href="https://github.com/Biraj2004/EducativeViewer"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center md:justify-end gap-1.5 text-slate-300 hover:text-cyan-300 transition-colors font-medium"
          >
            About Project
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
};
