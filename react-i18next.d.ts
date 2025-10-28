import 'react-i18next';
import common from '../public/locales/en/common.json';

// Extend the types for react-i18next
declare module 'react-i18next' {
  interface CustomTypeOptions {
    // Default namespace
    defaultNS: 'common';
    // Typed structure of your translation files
    resources: {
      common: typeof common;
    };
  }
}
