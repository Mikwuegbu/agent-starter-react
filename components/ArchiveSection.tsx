import { useTranslation } from 'react-i18next';
import { Archive } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const ArchiveSection = () => {
  const { t } = useTranslation();

  const archiveItems = [
    {
      icon: '🔮',
      title: t('archive.items.future.title'),
      description: t('archive.items.future.description'),
    },
    {
      icon: '📜',
      title: t('archive.items.algorithms.title'),
      description: t('archive.items.algorithms.description'),
    },
    {
      icon: '⚡',
      title: t('archive.items.transformation.title'),
      description: t('archive.items.transformation.description'),
    },
  ];

  return (
    <section className="relative overflow-hidden py-12 sm:py-24">
      <div className="relative z-10 container mx-auto px-4 text-center sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="bg-accent/10 mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full">
            <Archive className="text-accent h-8 w-8" />
          </div>

          <h2 className="font-heading text-primary mb-6 text-3xl font-semibold sm:text-4xl md:text-5xl">
            {t('archive.title')}
          </h2>

          <p className="text-muted-foreground mb-4 text-lg sm:text-xl">{t('archive.subtitle')}</p>

          <p className="text-foreground/80 mx-auto mb-8 max-w-3xl text-base leading-relaxed sm:text-lg">
            {t('archive.description')}
          </p>

          <Button
            size="lg"
            variant="outline"
            className="border-accent/30 text-accent hover:bg-accent/10 hover:border-accent mb-12 px-6 py-3 text-base sm:px-8 sm:text-lg"
          >
            {t('archive.explore')}
          </Button>

          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
            {archiveItems.map((item, index) => (
              <Card
                key={index}
                className="glass-card group hover:shadow-glow cursor-pointer p-6 text-center transition-all duration-500 hover:scale-105 sm:p-8"
              >
                <div className="mb-4 text-3xl transition-transform duration-300 group-hover:scale-110 sm:mb-6 sm:text-4xl">
                  {item.icon}
                </div>
                <h3 className="font-heading text-primary mb-3 text-lg font-semibold sm:mb-4 sm:text-xl">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="border-accent/20 absolute top-20 left-20 hidden h-32 w-32 rounded-full border sm:block"></div>
        <div className="border-accent/20 absolute right-20 bottom-20 hidden h-24 w-24 rounded-full border sm:block"></div>
        <div className="border-accent/10 absolute top-1/2 left-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 transform rounded-full border"></div>
      </div>
    </section>
  );
};
