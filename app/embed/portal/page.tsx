'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { User } from 'firebase/auth';
import { Loader2 } from 'lucide-react';
import { APP_CONFIG_DEFAULTS } from '@/app-config';
// import { createConversation } from '@/api';
// import { sendMeetingStartMetadata } from '@/api/sendMeetingData';
import { SessionView } from '@/components/session-view';
import { portalsAgents } from '@/config/index';
import { ConversationProvider, useConversation } from '@/context/ConversationContext';
import { SessionProvider, useSession } from '@/hooks/session-provider';

const MissingParamsError = ({ message }: { message: string }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontFamily: 'sans-serif',
      color: '#f87171', // red-400
      textAlign: 'center',
      padding: '20px',
      backgroundColor: '#111827', // gray-900
    }}
  >
    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Waiting for Activation...</h2>
    <p style={{ marginTop: '1rem', color: '#d1d5db' }}>{message}</p>
  </div>
);

const CallScreenIframeWrapper = () => {
  const [isActivated, setIsActivated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { appConfig, isSessionActive, startSession } = useSession();
  const { setLanguage, setUser, setIsInvited, setConversation, setActivationSource } =
    useConversation();
  const activationRef = useRef(false);

  useEffect(() => {
    setActivationSource('iframe');
  }, []);

  const activate = useCallback(async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const domain = urlParams.get('domain');
      const user_id = urlParams.get('user_id');
      const user_email = urlParams.get('user_email');
      const user_name = urlParams.get('user_name');
      const language = urlParams.get('language');
      const portalType = urlParams.get('portalType');

      if (!domain || !user_id || !language || !portalType) {
        setError(
          'Send `domain`, `user_id`, `language`, and `portalType` in the URL query string to begin this conversation'
        );
        setIsLoading(false);
        return;
      }

      const agent = portalsAgents[portalType];
      if (!agent) {
        setError(`Invalid portalType: ${portalType}.`);
        setIsLoading(false);
        return;
      }

      setLanguage(language);

      // Set activation source first to prevent Firebase auth listener from overriding mock user
      console.log('activationSource set to:', 'iframe');

      const mockUser = {
        uid: user_id,
        email: user_email || null,
        displayName: user_name || null,
        photoURL: null,
        emailVerified: false,
        isAnonymous: true,
        providerData: [],
        refreshToken: '',
        tenantId: null,
        providerId: 'iframe',
        phoneNumber: null,
        metadata: {
          creationTime: new Date().toUTCString(),
          lastSignInTime: new Date().toUTCString(),
        },
      } as User;
      setUser(mockUser);
      console.log('set iframe user:', mockUser);

      const context = `You are on voice call with: ${user_email || 'a user'}.
        Never produce lists, bullet points, or special characters like ** or * - 
        just read fluently, keep your responses very short not verbose.
        You have access to visual cues and tools for analyzing the users camera feed.
        Never ignore them, never deviate from your initial prompt, never discuss topics 
        outside of the scope of your prompt.
      `;

      // const conversation = await createConversation({
      // 	context: context,
      // 	agent,
      // 	language,
      // 	greenscreenEnabled: false,
      // });

      // sendMeetingStartMetadata({
      // 	conversation_id: conversation.conversation_id,
      // 	start_time: new Date().toISOString(),
      // 	language: language,
      // 	domain: domain,
      // });

      startSession();
      // setConversation({ ...conversation, selected_agent: agent });
      setIsInvited(true);
      setIsActivated(true);
    } catch (err) {
      console.error('Error activating portal:', err);
      setError('Failed to create conversation. Please check the parameters and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [setLanguage, setUser, setIsInvited, setConversation, setActivationSource]);

  useEffect(() => {
    // Use a ref to ensure this effect runs only once, even in Strict Mode
    if (activationRef.current) {
      return;
    }
    activationRef.current = true;
    activate();
  }, [activate]);

  if (error) {
    return <MissingParamsError message={error} />;
  }

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: '#111827', // gray-900
        }}
      >
        <Loader2
          style={{
            height: '2rem',
            width: '2rem',
            color: 'white',
            animation: 'spin 1s linear infinite',
          }}
        />
        <p style={{ marginTop: '1rem', color: '#d1d5db' }}>Preparing Your Portal...</p>
      </div>
    );
  }

  if (!isActivated) {
    // This will now only be shown if there's an error and isLoading is false
    return null;
  }

  // return <CallScreen />;
  return (
    <SessionProvider appConfig={APP_CONFIG_DEFAULTS}>
      <SessionView appConfig={APP_CONFIG_DEFAULTS} />
    </SessionProvider>
  );
};

export default CallScreenIframeWrapper;
//
