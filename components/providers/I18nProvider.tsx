'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { i18nInit } from '@/i18n/config';
import { isClient } from '@/lib/utils';

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();

  // Initialize i18n on client side
  useEffect(() => {
    if (!isClient()) return;

    const initI18n = async () => {
      try {
        await i18nInit;
        
        // Handle language change from URL
        const pathSegments = pathname.split('/').filter(Boolean);
        const langFromPath = pathSegments[0];
        
        if (langFromPath && i18n.languages.includes(langFromPath) && langFromPath !== i18n.language) {
          await i18n.changeLanguage(langFromPath);
        }
      } catch (error) {
        console.error('Error initializing i18n:', error);
      }
    };

    initI18n();
  }, [i18n, pathname]);

  // Update URL when language changes
  useEffect(() => {
    if (!isClient()) return;

    const handleLanguageChanged = async (lng: string) => {
      try {
        const pathSegments = pathname.split('/').filter(Boolean);
        const currentLang = pathSegments[0];
        
        if (i18n.languages.includes(currentLang)) {
          pathSegments[0] = lng;
        } else {
          pathSegments.unshift(lng);
        }
        
        const newPath = `/${pathSegments.join('/')}`;
        if (newPath !== pathname) {
          router.push(newPath, { scroll: false });
        }
      } catch (error) {
        console.error('Error handling language change:', error);
      }
    };

    // Use the i18next event system
    i18n.on('languageChanged', handleLanguageChanged);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n, pathname, router]);

  return <>{children}</>;
}
