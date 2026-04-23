'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { SplineBackdrop } from '@/components/SplineBackdrop';
import { ScrollIndicator } from '@/components/ScrollIndicator';

export const Hero = () => {
  const prefersReducedMotion = useReducedMotion() ?? false;

  const scrollToGuide = () => {
    const guideSection = document.getElementById('guide');
    if (!guideSection) return;

    const top = guideSection.getBoundingClientRect().top + window.scrollY - 84;
    window.scrollTo({ top, behavior: 'smooth' });
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.12,
        delayChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: prefersReducedMotion ? 0 : 24, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.7,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section className="relative min-h-[64vh] md:min-h-[80vh] pt-20 md:pt-24 flex flex-col items-center justify-center text-center overflow-hidden">
      <ScrollIndicator side="left" prefersReducedMotion={prefersReducedMotion} />
      <ScrollIndicator side="right" prefersReducedMotion={prefersReducedMotion} />

      {/* Background Gradient Mesh */}
      <div className="absolute inset-0 pointer-events-none mask-[linear-gradient(to_bottom,transparent_0%,black_14%,black_86%,transparent_100%)]">
        <SplineBackdrop />
        <div className="absolute top-[-20%] left-[10%] w-150 h-150 bg-indigo-900/10 rounded-full blur-[100px] mix-blend-screen" />
        <div className="absolute top-[20%] right-[5%] w-200 h-200 bg-cyan-900/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
        <div className="absolute inset-x-0 top-0 h-24 md:h-32 bg-linear-to-b from-background to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-28 md:h-36 bg-linear-to-t from-background to-transparent" />
      </div>

      <motion.div
        className="relative z-10 px-4 sm:px-6 max-w-5xl mx-auto flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >

        <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 md:mb-8 leading-[0.95]">
          <span className="text-transparent bg-clip-text bg-linear-to-b from-white to-slate-400">
            Explore. Code.
          </span>
          <br className="my-2" />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-blue-500 to-indigo-500 pb-2 inline-block">
            Master Everything.
          </span>
        </motion.h1>
        
        <motion.p variants={itemVariants} className="text-base md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 md:mb-16 font-light">
          A premium offline suite for extracting, parsing, and elegantly organizing educational content. This guide shows how to run the app on your computer.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col lg:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 md:mb-10 w-full">
          <button
            type="button"
            onClick={scrollToGuide}
            className="rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-100 w-3/4 lg:w-auto text-center"
          >
            Open Setup Guide
          </button>
          <a
            href="https://github.com/Biraj2004/educative-viewer/releases"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-slate-700 bg-slate-950/60 px-6 py-3.5 text-sm font-semibold text-slate-200 transition hover:border-cyan-500/40 hover:text-cyan-300 w-3/4 lg:w-auto text-center"
          >
            Download Latest Release
          </a>
        </motion.div>

      </motion.div>
    </section>
  );
};
