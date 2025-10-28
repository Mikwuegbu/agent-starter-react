'use client';

import { useTranslation as useI18nTranslation } from 'react-i18next';

export function useTranslation(ns: string | string[] = 'common', options: { keyPrefix?: string } = {}) {
  return useI18nTranslation(ns, options);
}
