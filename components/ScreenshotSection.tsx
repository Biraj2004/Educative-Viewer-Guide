'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';

interface ScreenshotSectionProps {
  images: { src: string; alt: string }[];
}

export const ScreenshotSection = ({ images }: ScreenshotSectionProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [failedImageSources, setFailedImageSources] = useState<Set<string>>(new Set());
  const previewRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const totalImages = images.length;
  const activeImage = images[activeIndex] ?? images[0];
  const isActiveImageFailed = activeImage ? failedImageSources.has(activeImage.src) : false;

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === previewRef.current);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const goToPrevious = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
  }, [totalImages]);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
  }, [totalImages]);

  const markImageAsFailed = useCallback((src: string) => {
    setFailedImageSources((prev) => {
      const next = new Set(prev);
      next.add(src);
      return next;
    });
  }, []);

  const clearImageFailure = useCallback((src: string) => {
    setFailedImageSources((prev) => {
      if (!prev.has(src)) {
        return prev;
      }

      const next = new Set(prev);
      next.delete(src);
      return next;
    });
  }, []);

  const toggleFullscreen = async () => {
    const previewElement = previewRef.current;
    if (!previewElement) return;

    if (document.fullscreenElement === previewElement) {
      await document.exitFullscreen();
      return;
    }

    await previewElement.requestFullscreen();
  };

  if (!activeImage) {
    return null;
  }

  return (
    <div className="space-y-3 md:space-y-5">
      <motion.div
        ref={previewRef}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: prefersReducedMotion ? 0.01 : 0.8, ease: 'easeOut' }}
        className="w-full relative rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(34,211,238,0.05)] border border-slate-800 bg-[#060C20]"
      >
        <div className="flex items-center space-x-2 bg-background border-b border-slate-800 px-4 py-3">
          <div className="flex gap-1.5 opacity-70 hover:opacity-100 transition-opacity">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <div className="flex-1 text-center font-sans font-medium text-xs text-slate-500 selection:bg-transparent cursor-default">
            EducativeViewer - Preview
          </div>
          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Open fullscreen'}
            className="hidden lg:flex h-8 w-8 rounded-md border border-slate-700/70 bg-slate-900/60 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/50 transition-colors items-center justify-center"
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Maximize2 className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>

        <div className="w-full aspect-video bg-slate-900 overflow-hidden relative flex items-center justify-center">
          {isActiveImageFailed ? (
            <div
              role="status"
              aria-live="polite"
              className="mx-6 rounded-xl border border-rose-500/40 bg-rose-950/30 px-5 py-4 text-center text-rose-200"
            >
              <p className="text-sm sm:text-base font-semibold">Screenshot could not be loaded.</p>
              <p className="mt-1 text-xs sm:text-sm text-rose-200/90">
                Please confirm the image path is valid and the local image server is running.
              </p>
            </div>
          ) : (
            <Image
              key={activeImage.src}
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              sizes={isFullscreen ? '100vw' : '(max-width: 640px) 90vw, (max-width: 1024px) 80vw, 1100px'}
              quality={94}
              className="object-cover"
              onError={() => markImageAsFailed(activeImage.src)}
              onLoad={() => clearImageFailure(activeImage.src)}
            />
          )}

          <button
            type="button"
            onClick={goToPrevious}
            onMouseDown={(event) => event.preventDefault()}
            aria-label="Previous image"
            className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full border border-slate-600/60 bg-slate-950/60 backdrop-blur-md text-slate-200 hover:text-cyan-300 hover:border-cyan-400/50 active:text-slate-200 active:border-slate-600/60 focus:outline-none focus-visible:outline-none focus-visible:ring-0 transition-all flex items-center justify-center cursor-pointer touch-manipulation select-none appearance-none"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={goToNext}
            onMouseDown={(event) => event.preventDefault()}
            aria-label="Next image"
            className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full border border-slate-600/60 bg-slate-950/60 backdrop-blur-md text-slate-200 hover:text-cyan-300 hover:border-cyan-400/50 active:text-slate-200 active:border-slate-600/60 focus:outline-none focus-visible:outline-none focus-visible:ring-0 transition-all flex items-center justify-center cursor-pointer touch-manipulation select-none appearance-none"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 md:gap-3">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Show screenshot ${index + 1}`}
            aria-pressed={activeIndex === index}
            className={`relative overflow-hidden rounded-lg border transition-all ${
              activeIndex === index
                ? 'border-cyan-400/60 ring-2 ring-cyan-400/20'
                : 'border-slate-800 hover:border-slate-600'
            }`}
          >
            <div className="relative h-14 sm:h-16 md:h-20 w-full">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="240px"
                quality={80}
                className="object-cover"
                onError={() => markImageAsFailed(image.src)}
                onLoad={() => clearImageFailure(image.src)}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
