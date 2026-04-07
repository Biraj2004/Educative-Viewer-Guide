'use client';

import { motion } from 'framer-motion';

type ScrollIndicatorProps = {
  side: 'left' | 'right';
  prefersReducedMotion: boolean;
};

export const ScrollIndicator = ({ side, prefersReducedMotion }: ScrollIndicatorProps) => {
  const isLeft = side === 'left';

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: prefersReducedMotion ? 0 : 0.4, duration: prefersReducedMotion ? 0.01 : 0.45 }}
      className={`absolute ${isLeft ? 'left-2 sm:left-4 md:left-6' : 'right-2 sm:right-4 md:right-6'} top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center select-none`}
      aria-hidden="true"
    >
      <motion.div
        className={`text-[11px] font-medium tracking-[0.5em] text-cyan-100/75 ${isLeft ? '[writing-mode:vertical-lr]' : '[writing-mode:vertical-rl]'}`}
        animate={prefersReducedMotion ? undefined : { opacity: [0.55, 1, 0.55], y: [0, -2, 0] }}
        transition={prefersReducedMotion ? undefined : { duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        SCROLL
      </motion.div>

      <motion.div
        className="mt-2 h-16 w-px bg-slate-700/60 relative overflow-hidden"
        animate={prefersReducedMotion ? undefined : { opacity: [0.55, 0.9, 0.55] }}
        transition={prefersReducedMotion ? undefined : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.div
          className="absolute left-0 right-0 h-5 bg-linear-to-b from-cyan-400/0 via-cyan-300/85 to-cyan-400/0 blur-[0.5px]"
          animate={prefersReducedMotion ? { opacity: 0 } : { y: ['-120%', '220%'], opacity: [0, 1, 0] }}
          transition={prefersReducedMotion ? { duration: 0 } : { repeat: Infinity, duration: 2.1, ease: 'linear' }}
        />
      </motion.div>

      <motion.div
        className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300/70"
        animate={prefersReducedMotion ? undefined : { scale: [0.85, 1.2, 0.85], opacity: [0.45, 1, 0.45] }}
        transition={prefersReducedMotion ? undefined : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  );
};