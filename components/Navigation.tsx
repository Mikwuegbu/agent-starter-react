'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { ChevronDown, Globe, Menu } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useConversation } from '@/context/ConversationContext';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

// Language mapping: full language names for context, short codes for i18n
const LANGUAGE_MAPPING = {
  english: 'en',
  german: 'de',
  spanish: 'es',
  french: 'fr',
} as const;

const LANGUAGE_DISPLAY_NAMES = {
  en: 'English',
  de: 'Deutsch',
  es: 'Español',
  fr: 'Français',
} as const;

const LANGUAGE_FLAGS = {
  en: '🇺🇸',
  de: '🇩🇪',
  es: '🇪🇸',
  fr: '🇫🇷',
} as const;

export const Navigation = () => {
  const { t, i18n } = useTranslation();

  const { push } = useRouter();
  const { setLanguage, language, user } = useConversation();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (fullLanguage: string) => {
    const shortCode = LANGUAGE_MAPPING[fullLanguage as keyof typeof LANGUAGE_MAPPING] || 'en';
    i18n.changeLanguage(shortCode);
    setLanguage(fullLanguage);
  };

  useEffect(() => {
    if (language) {
      const shortCode = LANGUAGE_MAPPING[language as keyof typeof LANGUAGE_MAPPING] || 'en';
      // i18n.changeLanguage(shortCode);
    }
  }, [language]);

  return (
    <nav className="glass-card border-border/20 fixed top-0 z-50 w-full border-b">
      <div className="container mx-auto px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <a href="/" className="flex items-center space-x-2">
              <div className="gold-accent h-8 w-8 text-2xl">◆</div>
              <span className="text-xl font-bold">Exideus</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-4 md:flex">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-border/30 hover:border-accent/50">
                  <Globe className="mr-2 h-4 w-4" />
                  {language &&
                    LANGUAGE_FLAGS[
                      LANGUAGE_MAPPING[
                        language as keyof typeof LANGUAGE_MAPPING
                      ] as keyof typeof LANGUAGE_FLAGS
                    ]}
                  {language &&
                    ' ' +
                      (LANGUAGE_DISPLAY_NAMES[
                        LANGUAGE_MAPPING[
                          language as keyof typeof LANGUAGE_MAPPING
                        ] as keyof typeof LANGUAGE_DISPLAY_NAMES
                      ] || 'English')}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="glass-card border-border/30 bg-popover">
                <DropdownMenuItem onClick={() => changeLanguage('english')}>
                  🇺🇸 English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('german')}>
                  🇩🇪 Deutsch
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('spanish')}>
                  🇪🇸 Español
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('french')}>
                  🇫🇷 Français
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Akademie Button */}
            <Button
              variant="outline"
              className="border-accent/30 text-accent hover:bg-accent/10 hover:border-accent"
            >
              {t('nav.akademie')}
            </Button>

            {/* Profile or Login Button */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-accent/30 text-accent hover:bg-accent/10 hover:border-accent"
                  >
                    Profile
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="glass-card border-border/30 bg-popover">
                  <DropdownMenuItem onClick={() => push('/profile')}>My Profile</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => push('/settings')}>Settings</DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={async () => {
                      const { error } = await logout();
                      if (error) {
                        toast({
                          title: t('nav.logoutError'),
                          description: error,
                          variant: 'destructive',
                        });
                        return;
                      }

                      toast({
                        title: t('nav.logoutSuccess'),
                        description: t('nav.logoutSuccessDesc'),
                      });
                      push('/login');
                    }}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                className="bg-accent text-accent-foreground hover:bg-accent/90 px-6"
                onClick={() => push('/login')}
              >
                {t('nav.login')}
              </Button>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="border-border/30">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="glass-card">
                <div className="mt-8 flex flex-col space-y-4">
                  {/* Language Selector Mobile */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="border-border/30 hover:border-accent/50 w-full justify-start"
                      >
                        <Globe className="mr-2 h-4 w-4" />
                        {language &&
                          LANGUAGE_FLAGS[
                            LANGUAGE_MAPPING[
                              language as keyof typeof LANGUAGE_MAPPING
                            ] as keyof typeof LANGUAGE_FLAGS
                          ]}
                        {language &&
                          ' ' +
                            (LANGUAGE_DISPLAY_NAMES[
                              LANGUAGE_MAPPING[
                                language as keyof typeof LANGUAGE_MAPPING
                              ] as keyof typeof LANGUAGE_DISPLAY_NAMES
                            ] || 'English')}
                        <ChevronDown className="ml-auto h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="glass-card border-border/30 bg-popover w-full">
                      <DropdownMenuItem onClick={() => changeLanguage('english')}>
                        🇺🇸 English
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => changeLanguage('german')}>
                        🇩🇪 Deutsch
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => changeLanguage('spanish')}>
                        🇪🇸 Español
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => changeLanguage('french')}>
                        🇫🇷 Français
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Theme Toggle Mobile */}
                  <div className="flex justify-center">
                    <ThemeToggle />
                  </div>

                  {/* Akademie Button Mobile */}
                  <Button
                    variant="outline"
                    className="border-accent/30 text-accent hover:bg-accent/10 hover:border-accent w-full"
                  >
                    {t('nav.akademie')}
                  </Button>

                  {/* Profile or Login Button Mobile */}
                  {user ? (
                    <div className="flex flex-col space-y-2">
                      <Button
                        variant="outline"
                        className="border-border/30 hover:border-accent/50 w-full"
                        onClick={() => {
                          push('/profile');
                          setIsOpen(false);
                        }}
                      >
                        My Profile
                      </Button>
                      <Button
                        variant="outline"
                        className="border-border/30 hover:border-accent/50 w-full"
                        onClick={() => {
                          push('/settings');
                          setIsOpen(false);
                        }}
                      >
                        Settings
                      </Button>
                      <Button
                        variant="outline"
                        className="border-border/30 hover:border-accent/50 w-full"
                        onClick={async () => {
                          const { error } = await logout();
                          if (error) {
                            toast({
                              title: 'Logout Failed',
                              description: error,
                              variant: 'destructive',
                            });
                            return;
                          }

                          toast({
                            title: 'Logged Out',
                            description: 'You have been successfully logged out.',
                          });
                          push('/login');
                          setIsOpen(false);
                        }}
                      >
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <Button
                      className="bg-accent text-accent-foreground hover:bg-accent/90 w-full"
                      onClick={() => {
                        push('/login');
                        setIsOpen(false);
                      }}
                    >
                      {t('nav.login')}
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};
