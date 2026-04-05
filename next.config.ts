import type { NextConfig } from 'next';

const isDevelopment = process.env.NODE_ENV !== 'production';

/**
 * CSP: compatibility-focused config for Vercel deployment
 * - Allows required third-party assets (GitHub API, Spline, fonts, noise texture)
 * - Keeps strong defaults while avoiding overly strict script policies
 */
const scriptSrc = isDevelopment
  ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:"
  : "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:";

/**
 * Security Headers (Production-grade)
 */
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      base-uri 'self';
      frame-ancestors 'self';
      form-action 'self';
      ${scriptSrc};
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: blob: https://avatars.githubusercontent.com https://prod.spline.design https://grainy-gradients.vercel.app https:;
      connect-src 'self' https://api.github.com https://prod.spline.design https: wss:;
      font-src 'self' https://fonts.gstatic.com;
      worker-src 'self' blob:;
      frame-src 'self' https:;
      media-src 'self' https:;
      prefetch-src 'self' https:;
      object-src 'none';
      upgrade-insecure-requests;
    `.replace(/\n/g, ''),
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin',
  },
  {
    key: 'Cross-Origin-Resource-Policy',
    value: 'same-origin',
  },
];

/**
 * Next.js Config
 */
const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'prod.spline.design',
      },
      {
        protocol: 'https',
        hostname: 'grainy-gradients.vercel.app',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 86400,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;