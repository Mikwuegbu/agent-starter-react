import Image from 'next/image';
import { Card } from '@/components/ui/card';

interface PersonaCardProps {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  imageUrl: string;
  imageAlt: string;
  portalType: string;
  onClick: (e: React.MouseEvent, portalType: string) => void;
  videoUrl?: string; // Optional video URL
}

export const PersonaCard = ({
  title,
  subtitle,
  description,
  features,
  imageUrl,
  imageAlt,
  portalType,
  onClick,
  videoUrl,
}: PersonaCardProps) => {
  return (
    <div className="group">
      <Card
        className="glass-card hover:shadow-glow cursor-pointer overflow-hidden p-0 transition-all duration-500 hover:scale-[1.02]"
        onClick={(e) => onClick(e, portalType)}
      >
        {/* Media (Video or Image) */}
        <div className="relative h-48 overflow-hidden sm:h-64">
          {videoUrl ? (
            <video
              src={videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="relative h-48 w-full sm:h-64">
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                priority={false}
                unoptimized={process.env.NODE_ENV !== 'production'}
              />
            </div>
          )}
          <div className="from-background/80 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          <h3 className="font-heading text-primary mb-2 text-lg font-semibold sm:text-xl lg:text-2xl">
            {title}
          </h3>
          <p className="text-accent mb-3 text-base font-medium sm:mb-4 sm:text-lg">{subtitle}</p>
          <p className="text-muted-foreground mb-4 text-sm leading-relaxed sm:mb-6 sm:text-base">
            {description}
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-3 text-xs sm:gap-4 sm:text-sm">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-secondary-foreground flex items-center space-x-1 sm:space-x-2"
              >
                <span className="text-accent">{feature.split(' ')[0]}</span>
                <span className="text-xs sm:text-sm">
                  {feature.substring(feature.indexOf(' ') + 1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};
