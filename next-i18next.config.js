module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de', 'es', 'fr'],
    localeDetection: true,
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  // You can add more i18next configuration here
  // For example, you can add namespaces, backend configuration, etc.
  // See: https://www.i18next.com/overview/configuration-options
  // and https://github.com/i18next/next-i18next#options
};
