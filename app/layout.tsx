import { Public_Sans } from 'next/font/google';
import localFont from 'next/font/local';
import { headers } from 'next/headers';
import { dir } from 'i18next';
import { Footer } from '@/components/Footer';
import { Navigation } from '@/components/Navigation';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ApplyThemeScript } from '@/components/app/theme-toggle';
import { I18nProvider } from '@/components/providers/I18nProvider';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ConversationProvider } from '@/context/ConversationContext';
// Import i18n config but don't initialize it here
import '@/i18n/config';
import { cn, getAppConfig, getStyles } from '@/lib/utils';
import '@/styles/globals.css';
import { i18n } from '@/i18n/config';

const publicSans = Public_Sans({
  variable: '--font-public-sans',
  subsets: ['latin'],
});

const commitMono = localFont({
  display: 'swap',
  variable: '--font-commit-mono',
  src: [
    {
      path: '../fonts/CommitMono-400-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/CommitMono-700-Regular.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/CommitMono-400-Italic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../fonts/CommitMono-700-Italic.otf',
      weight: '700',
      style: 'italic',
    },
  ],
});

interface RootLayoutProps {
  children: React.ReactNode;
  params: { lang: string };
}

export default async function RootLayout({
  children,
  params: { lang },
}: RootLayoutProps) {
  const hdrs = await headers();
  const appConfig = await getAppConfig(hdrs);
  const { pageTitle, pageDescription } = appConfig;
  const styles = getStyles(appConfig);

  return (
    <html lang={lang} dir={dir(lang)} suppressHydrationWarning>
      <head>
        <ApplyThemeScript />
        <style dangerouslySetInnerHTML={{ __html: styles }} />
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          publicSans.variable,
          commitMono.variable
        )}
      >
        <I18nProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ConversationProvider>
              <div className="relative flex min-h-screen flex-col">
                <div className="absolute right-4 top-4 z-50">
                  <LanguageSwitcher />
                </div>
                <Navigation />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </ConversationProvider>
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
