'use client';

import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-card/50 border-border/20 border-t py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-4 flex items-center space-x-2 md:mb-0">
            <div className="gold-accent h-6 w-6 text-xl">◆</div>
            <span className="font-heading text-primary text-lg font-semibold">Exideus Academy</span>
          </div>

          <div className="text-muted-foreground flex flex-col items-center space-y-2 text-sm md:flex-row md:space-y-0 md:space-x-6">
            <span>© 2024 Exideus Academy. {t('footer.rights')}</span>
            <div className="flex flex-wrap justify-center space-x-4">
              <a href="#" className="hover:text-accent transition-colors">
                {t('footer.privacy')}
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                {t('footer.terms')}
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                {t('footer.contact')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
