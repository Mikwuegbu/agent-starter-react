import type { NextConfig } from 'next';
import { i18n as i18nConfig } from './next-i18next.config';

const nextConfig: NextConfig = {
  i18n: {
    locales: ['en', 'de', 'es', 'fr'],
    defaultLocale: 'en',
    localeDetection: true,
  },
  // Add any other Next.js config options here
};

export default nextConfig;
