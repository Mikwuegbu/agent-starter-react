import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { i18nConfig } from '@/i18n/config';

export async function useTranslationServer(ns: string | string[] = 'common', options: { keyPrefix?: string } = {}) {
  const i18nInstance = createInstance();
  
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`@/public/locales/${language}/${namespace}.json`)
      )
    )
    .init({
      ...i18nConfig,
      lng: 'en', // default language
      ns: Array.isArray(ns) ? ns : [ns],
      defaultNS: Array.isArray(ns) ? ns[0] : ns,
      fallbackNS: 'common',
      nsSeparator: '::',
      keySeparator: '.',
      react: {
        useSuspense: false,
      },
    });

  return {
    t: i18nInstance.getFixedT(i18nInstance.language, Array.isArray(ns) ? ns[0] : ns, options.keyPrefix),
    i18n: i18nInstance,
  };
}
