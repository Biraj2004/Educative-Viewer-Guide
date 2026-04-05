'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useReducedMotion } from 'framer-motion';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
});

const DEFAULT_SCENE_URL = 'https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode';

class SplineErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return null;
    }

    return this.props.children;
  }
}

export const SplineBackdrop = () => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <SplineErrorBoundary>
      <div className="absolute inset-0 pointer-events-none opacity-45 mask-[radial-gradient(circle_at_center,black_20%,transparent_80%)]">
        <React.Suspense fallback={<div className="absolute inset-0 bg-linear-to-b from-cyan-900/10 to-indigo-900/10" />}>
          <Spline scene={DEFAULT_SCENE_URL} />
        </React.Suspense>
      </div>
    </SplineErrorBoundary>
  );
};
