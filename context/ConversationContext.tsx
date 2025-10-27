'use client';

import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useIsMobile } from '@/hooks/use-mobile';
import { auth } from '@/lib/firebase';
import { IConversation } from '@/types';

export type BackgroundType = 'image';

export interface BackgroundConfig {
  type: BackgroundType;
  value: string; // Image URL
}

export type ActivationSource = 'direct' | 'iframe' | null;

interface ConversationContextType {
  conversation: IConversation | null;
  setConversation: React.Dispatch<React.SetStateAction<IConversation | null>>;
  isInvited: boolean;
  setIsInvited: React.Dispatch<React.SetStateAction<boolean>>;
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  background: BackgroundConfig;
  setBackground: React.Dispatch<React.SetStateAction<BackgroundConfig>>;
  greenscreenEnabled: boolean;
  setGreenscreenEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  isRecording: boolean;
  setIsRecording: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  extendedTruthMatrix: boolean;
  setExtendedTruthMatrix: React.Dispatch<React.SetStateAction<boolean>>;
  selectedAgents: string[];
  setSelectedAgents: React.Dispatch<React.SetStateAction<string[]>>;
  activationSource: ActivationSource;
  setActivationSource: React.Dispatch<React.SetStateAction<ActivationSource>>;
}

const ConversationContext = createContext<ConversationContextType | undefined>(undefined);

// This is the actual implementation of the provider
export const ConversationProvider = ({ children }: { children: ReactNode }) => {
  const [conversation, setConversation] = useState<IConversation | null>(null);
  const [isGuest, setIsGuest] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>('english'); // default to English
  
  // Set initial state from localStorage on client side
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);
  const [greenscreenEnabled, setGreenscreenEnabled] = useState<boolean>(true);
  const isMobile = useIsMobile();

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);

  const [background, setBackground] = useState<BackgroundConfig>({
    type: 'image',
    value: '/assets/backgrounds/nature-view.jpeg',
  });
  
  // Set initial background from localStorage on client side
  useEffect(() => {
    const savedBackground = localStorage.getItem('background');
    if (savedBackground) {
      try {
        setBackground(JSON.parse(savedBackground));
      } catch (e) {
        console.error('Failed to parse background from localStorage', e);
      }
    }
  }, []);

  const [extendedTruthMatrix, setExtendedTruthMatrix] = useState<boolean>(false);
  
  // Set initial extendedTruthMatrix from localStorage on client side
  useEffect(() => {
    const savedSetting = localStorage.getItem('extendedTruthMatrix');
    if (savedSetting !== null) {
      setExtendedTruthMatrix(savedSetting === 'true');
    }
  }, []);

  const [selectedAgents, setSelectedAgents] = useState<string[]>(['medical', 'sales', 'coaching', 'adri', 'cursing']);
  
  // Set initial selectedAgents from localStorage on client side
  useEffect(() => {
    const savedAgents = localStorage.getItem('selectedAgents');
    if (savedAgents) {
      try {
        setSelectedAgents(JSON.parse(savedAgents));
      } catch (e) {
        console.error('Failed to parse selectedAgents from localStorage', e);
      }
    }
  }, []);

  const [activationSource, setActivationSource] = useState<ActivationSource>(null);

  useEffect(() => {
    // if(isMobile){
    //   setGreenscreenEnabled(false)
    // }
    // for now, disable greenscreen
    setGreenscreenEnabled(false);
  }, [isMobile]);

  useEffect(() => {
    localStorage.setItem('background', JSON.stringify(background));
  }, [background]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('extendedTruthMatrix', extendedTruthMatrix.toString());
  }, [extendedTruthMatrix]);

  useEffect(() => {
    localStorage.setItem('selectedAgents', JSON.stringify(selectedAgents));
  }, [selectedAgents]);

  useEffect(() => {
    // Only listen to Firebase auth state changes when not in iframe mode
    if (activationSource !== 'iframe') {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
      });
      return () => unsubscribe();
    }
  }, [setUser, activationSource]);

  // Load user settings from Firestore when user is authenticated
  useEffect(() => {
    const loadUserSettings = async () => {
      if (user) {
        try {
          const { doc, getDoc } = await import('firebase/firestore');
          const db = (await import('@/lib/firebase')).db;
          const userSettingsRef = doc(db, 'userSettings', user.uid);
          const userSettingsSnap = await getDoc(userSettingsRef);

          if (userSettingsSnap.exists()) {
            const settings = userSettingsSnap.data();
            setExtendedTruthMatrix(settings.extendedTruthMatrix || false);
            setSelectedAgents(settings.selectedAgents || ['medical', 'sales', 'coaching', 'adri']);
          }
        } catch (error) {
          console.error('Error loading user settings:', error);
        }
      }
    };

    loadUserSettings();
  }, [user]);

  // Save user settings to Firestore when they change
  useEffect(() => {
    const saveUserSettings = async () => {
      if (user) {
        try {
          const { doc, setDoc } = await import('firebase/firestore');
          const db = (await import('@/lib/firebase')).db;
          const userSettingsRef = doc(db, 'userSettings', user.uid);
          await setDoc(
            userSettingsRef,
            {
              extendedTruthMatrix,
              selectedAgents,
              updatedAt: new Date(),
            },
            { merge: true }
          );
        } catch (error) {
          console.error('Error saving user settings:', error);
        }
      }
    };

    saveUserSettings();
  }, [extendedTruthMatrix, selectedAgents, user]);

  return (
    <ConversationContext.Provider
      value={{
        conversation,
        setConversation,
        isInvited: isGuest,
        setIsInvited: setIsGuest,
        language,
        setLanguage,
        background,
        setBackground,
        greenscreenEnabled,
        setGreenscreenEnabled,
        isRecording,
        setIsRecording,
        user,
        setUser,
        extendedTruthMatrix,
        setExtendedTruthMatrix,
        selectedAgents,
        setSelectedAgents,
        activationSource,
        setActivationSource,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export const useConversation = () => {
  const context = useContext(ConversationContext);
  if (context === undefined) {
    throw new Error('useConversation must be used within a ConversationProvider');
  }
  return context;
};

// Export the context itself for advanced use cases
export { ConversationContext };
