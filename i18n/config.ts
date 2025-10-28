import { initReactI18next } from 'react-i18next/initReactI18next';
import { createInstance } from 'i18next';
import HttpBackend from 'i18next-http-backend';
import { isClient } from '@/lib/utils';

const createI18nInstance = () => {
  return createInstance();
};

// Create a new i18n instance
export const i18n = createI18nInstance();

// Configuration options
const i18nConfig = {
  // List all supported languages
  supportedLngs: ['en', 'de', 'es', 'fr'],
  fallbackLng: 'en',
  lng: 'en',
  defaultNS: 'common',
  ns: ['common'],
  backend: {
    loadPath: '/locales/{{lng}}/{{ns}}.json',
  },
  react: {
    useSuspense: false,
  },
  interpolation: {
    escapeValue: false,
  },
};

// Initialize i18n for client-side
const initializeClientI18n = async () => {
  if (!isClient()) return i18n;

  const LanguageDetector = (await import('i18next-browser-languagedetector')).default;

  await i18n
    .use(LanguageDetector)
    .use(HttpBackend)
    .use(initReactI18next)
    .init({
      ...i18nConfig,
      detection: {
        order: ['localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
        caches: ['localStorage'],
        lookupLocalStorage: 'i18nextLng',
        lookupFromPathIndex: 0,
        checkWhitelist: true,
      },
    });

  return i18n;
};

// Initialize i18n for server-side
const initializeServerI18n = async () => {
  await i18n.use(HttpBackend).use(initReactI18next).init(i18nConfig);

  return i18n;
};

// Export initialization function based on environment
export const initializeI18n = isClient() ? initializeClientI18n : initializeServerI18n;

// Initialize and export the promise
export const i18nInit = initializeI18n();

export default i18n;
