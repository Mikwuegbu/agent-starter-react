'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { RoomAudioRenderer, StartAudio } from '@livekit/components-react';
import type { AppConfig } from '@/app-config';
import { PersonaCard } from '@/components/PersonaCard';
import { SessionProvider } from '@/components/app/session-provider';
import { ViewController } from '@/components/app/view-controller';
import { Toaster } from '@/components/livekit/toaster';
import { useBaffle } from '@/hooks/useBaffle';
import images from '@/lib/images';
import { ArchiveSection } from '../ArchiveSection';
import { Button } from '../ui/button';

interface AppProps {
  appConfig: AppConfig;
}

export function App({ appConfig }: AppProps) {
  const [clicked, setClicked] = useState(true);
  const router = useRouter();
  const { t } = useTranslation();
  const { elementRef: titleRef } = useBaffle<HTMLHeadingElement>({
    characters: '█▓▒░/<>█▓▒░',
    speed: 100,
    duration: 2000,
    delay: 500,
  });

  const allPersonas = [
    {
      portalType: 'sales',
      title: t('personas.sales.title'),
      subtitle: t('personas.sales.subtitle'),
      description: t('personas.sales.description'),
      features: [
        t('personas.sales.features.value'),
        t('personas.sales.features.psychology'),
        t('personas.sales.features.objections'),
      ],
      imageUrl: images.SALES_PORTAL,
      imageAlt: 'Sales Competence Portal',
      videoUrl: '/replica_videos/03243546.webm', // Video for sales persona
    },
    {
      portalType: 'adri',
      title: t('personas.growth.title'),
      subtitle: t('personas.growth.subtitle'),
      description: t('personas.growth.description'),
      features: [
        t('personas.growth.features.scaling'),
        t('personas.growth.features.strategy'),
        t('personas.growth.features.insights'),
      ],
      imageUrl: images.ADRI_PORTAL,
      imageAlt: 'Adri Growth Expert Portal',
      videoUrl: '/replica_videos/5dfbbdf9.webm', // Video for adri persona
    },
    {
      portalType: 'medical',
      title: t('personas.medical.title'),
      subtitle: t('personas.medical.subtitle'),
      description: t('personas.medical.description'),
      features: [
        t('personas.medical.features.support'),
        t('personas.medical.features.advice'),
        t('personas.medical.features.insights'),
      ],
      imageUrl: images.MEDICAL_PORTAL,
      imageAlt: 'Medical Intelligence Portal',
      videoUrl: '/replica_videos/7202eb45.webm', // Video for medical persona
    },
    {
      portalType: 'coaching',
      title: t('personas.coaching.title'),
      subtitle: t('personas.coaching.subtitle'),
      description: t('personas.coaching.description'),
      features: [
        t('personas.coaching.features.growth'),
        t('personas.coaching.features.resilience'),
        t('personas.coaching.features.reflection'),
      ],
      imageUrl: images.COACHING_PORTAL,
      imageAlt: 'Transformation Coaching Portal',
      videoUrl: '/replica_videos/12dfe205.webm', // Video for coaching persona
    },
    {
      portalType: 'cursing',
      title: 'CURSING!! ' + t('personas.sales.title'),
      subtitle: t('personas.sales.subtitle'),
      description: t('personas.sales.description'),
      features: [
        t('personas.sales.features.value'),
        t('personas.sales.features.psychology'),
        t('personas.sales.features.objections'),
      ],
      imageUrl: images.SALES_PORTAL,
      imageAlt: 'Sales Competence Portal',
      videoUrl: '/replica_videos/03243546.webm', // Video for sales persona
    },
  ];

  // Define type for persona objects
  type Persona = {
    portalType: string;
    title: string;
    subtitle: string;
    description: string;
    features: string[];
    imageUrl: string;
    imageAlt: string;
    videoUrl?: string;
  };

  // Filter personas based on user settings
  // const personas: Persona[] = allPersonssas.filter((persona) =>
  //   selectedAgents.includes(persona.portalType)
  // );
  const personas: Persona[] = allPersonas;

  const activatePortal = () => {
    router.push('/call');
    // Add logic to activate the selected portal
  };

  return (
    <div className="">
      {' '}
      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src={images.HERO_PORTAL}
            alt="Exideus Academy Portal"
            className="h-full w-full object-cover"
            width={1920}
            height={1080}
            priority
          />
          <div className="bg-background/60 absolute inset-0" />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h1
            ref={titleRef}
            className="font-heading hero-text mb-6 text-4xl font-bold sm:text-5xl md:text-7xl"
          >
            {t('hero.title')}
          </h1>
          <p className="text-accent mb-8 text-lg font-medium sm:text-xl md:text-2xl">
            {t('hero.subtitle')}
          </p>
          <div className="gold-accent mb-12 text-4xl">◆</div>
          <p className="text-muted-foreground mx-auto mb-12 max-w-3xl text-base leading-relaxed sm:text-lg">
            {t('hero.description')}
          </p>
        </div>
      </section>
      {/* Personas Section */}
      <section className="from-background to-muted/20 bg-gradient-to-b py-12 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mb-12 text-center sm:mb-16">
            <h2 className="font-heading text-primary mb-4 text-3xl font-semibold sm:text-4xl md:text-5xl">
              {t('personas.title')}
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg sm:text-xl">
              {t('personas.subtitle')}
            </p>
          </div>
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-3">
            {personas.map((persona, index) => (
              <PersonaCard
                key={index}
                portalType={persona.portalType}
                title={persona.title}
                subtitle={persona.subtitle}
                description={persona.description}
                features={persona.features}
                imageUrl={persona.imageUrl}
                imageAlt={persona.imageAlt}
                videoUrl={persona.videoUrl}
                onClick={activatePortal}
              />
            ))}
          </div>
        </div>
      </section>
      {/* Archive Section */}
      <ArchiveSection />
      {/* Call to Action */}
      <section className="py-12 text-center sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="font-heading hero-text mb-8 text-3xl font-semibold sm:text-4xl">
            {t('nav.login')}
          </h2>
          <Link href="/login">
            <Button
              // size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-4 text-base font-medium sm:px-12 sm:text-lg"
            >
              {t('nav.akademie')}
            </Button>
          </Link>
        </div>
      </section>
      {/* Loading Dialog */}
      {/* <Dialog open={isCreatingConversation}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-center">Preparing Your Portal</DialogTitle>
              <DialogDescription className="text-center">
                Setting up your conversation experience...
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center py-4">
              <Loader2 className="text-primary h-8 w-8 animate-spin" />
            </div>
          </DialogContent>
        </Dialog> */}
    </div>
  );
}
