'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useTranscriptions } from '@livekit/components-react';
import { ChatTranscript } from '@/components/chat-transcript';
import {
  AgentControlBar,
  type ControlBarControls,
} from '@/components/livekit/agent-control-bar/agent-control-bar';
import { ScrollArea } from '@/components/livekit/scroll-area/scroll-area';
import { PreConnectMessage } from '@/components/preconnect-message';
import { TileLayout } from '@/components/tile-layout';
import type { AppConfig } from '@/config/app-config';
import { useChatMessages } from '@/hooks/useChatMessages';
import { useConnectionTimeout } from '@/hooks/useConnectionTimout';
import { useDebugMode } from '@/hooks/useDebug';
import { cn } from '@/lib/utils';

const MotionBottom = motion.create('div');

const mockTrans = [
  {
    text: "Hi there, I'm Adri. How can I help you today?",
    participantInfo: {
      identity: 'agent-AJ_8YgMnCABRpXH',
    },
    streamInfo: {
      id: 'b423a6a3-731d-401b-88f5-374f8e1c6283',
      mimeType: 'text/plain',
      topic: 'lk.transcription',
      timestamp: 1761561604813,
      attributes: {
        'lk.segment_id': 'SG_127c03591715',
        'lk.transcription_final': 'true',
        'lk.transcribed_track_id': 'TR_AMbRmufQWEsQMH',
      },
      encryptionType: 0,
    },
  },
  {
    text: 'Great, you showed up—that’s step one. Now what are you ready to take action on, not just talk about?',
    participantInfo: {
      identity: 'agent-AJ_8YgMnCABRpXH',
    },
    streamInfo: {
      id: 'c54e1644-d69e-4495-a897-ed5135b6267c',
      mimeType: 'text/plain',
      topic: 'lk.transcription',
      timestamp: 1761561613621,
      attributes: {
        'lk.segment_id': 'SG_b77dfc3d22c7',
        'lk.transcribed_track_id': 'TR_AMbRmufQWEsQMH',
        'lk.transcription_final': 'true',
      },
      encryptionType: 0,
    },
  },
  {
    text: 'I should get',
    participantInfo: {
      identity: 'voice_assistant_user_8966',
    },
    streamInfo: {
      id: '4e158e89-d635-4feb-89ef-f35359600c46',
      mimeType: 'text/plain',
      topic: 'lk.transcription',
      timestamp: 1761561660495,
      attributes: {
        'lk.transcribed_track_id': 'TR_AMWvWrA3RYoXvt',
        'lk.transcription_final': 'false',
        'lk.segment_id': 'SG_1f1fb6ed451c',
      },
      encryptionType: 0,
    },
  },
  {
    text: '“Should” is for spectators.',
    participantInfo: {
      identity: 'agent-AJ_8YgMnCABRpXH',
    },
    streamInfo: {
      id: 'a5663530-f2ab-4d16-9747-5cad65498a82',
      mimeType: 'text/plain',
      topic: 'lk.transcription',
      timestamp: 1761561665062,
      attributes: {
        'lk.transcription_final': 'true',
        'lk.segment_id': 'SG_3d2da71e5522',
        'lk.transcribed_track_id': 'TR_AMbRmufQWEsQMH',
      },
      encryptionType: 0,
    },
  },
  {
    text: 'like, a response',
    participantInfo: {
      identity: 'voice_assistant_user_8966',
    },
    streamInfo: {
      id: 'dc2975c1-b296-43d7-9395-18a008e13410',
      mimeType: 'text/plain',
      topic: 'lk.transcription',
      timestamp: 1761561666057,
      attributes: {
        'lk.segment_id': 'SG_28ade2e2c1b3',
        'lk.transcription_final': 'false',
        'lk.transcribed_track_id': 'TR_AMWvWrA3RYoXvt',
      },
      encryptionType: 0,
    },
  },
  {
    text: 'No.',
    participantInfo: {
      identity: 'voice_assistant_user_8966',
    },
    streamInfo: {
      id: 'fecc9236-6622-47e9-9169-c813f0488398',
      mimeType: 'text/plain',
      topic: 'lk.transcription',
      timestamp: 1761561671944,
      attributes: {
        'lk.segment_id': 'SG_eb144c5b21a8',
        'lk.transcription_final': 'false',
        'lk.transcribed_track_id': 'TR_AMWvWrA3RYoXvt',
      },
      encryptionType: 0,
    },
  },
  {
    text: "No. I'm I I wasn't hearing you",
    participantInfo: {
      identity: 'voice_assistant_user_8966',
    },
    streamInfo: {
      id: '1b9830c2-861c-4b28-95be-dbb7bbc9bb37',
      mimeType: 'text/plain',
      topic: 'lk.transcription',
      timestamp: 1761561671998,
      attributes: {
        'lk.transcribed_track_id': 'TR_AMWvWrA3RYoXvt',
        'lk.segment_id': 'SG_1fdd2aa0807c',
        'lk.transcription_final': 'false',
      },
      encryptionType: 0,
    },
  },
  {
    text: 'You don’t need to hear me;',
    participantInfo: {
      identity: 'agent-AJ_8YgMnCABRpXH',
    },
    streamInfo: {
      id: 'a58b0db0-3312-40f9-9761-48a15be04923',
      mimeType: 'text/plain',
      topic: 'lk.transcription',
      timestamp: 1761561677751,
      attributes: {
        'lk.transcription_final': 'true',
        'lk.segment_id': 'SG_5e9af2937cdb',
        'lk.transcribed_track_id': 'TR_AMbRmufQWEsQMH',
      },
      encryptionType: 0,
    },
  },
  {
    text: 'Yes.',
    participantInfo: {
      identity: 'voice_assistant_user_8966',
    },
    streamInfo: {
      id: 'efb0f19c-2413-44eb-a41b-8aff3f1567d2',
      mimeType: 'text/plain',
      topic: 'lk.transcription',
      timestamp: 1761561680141,
      attributes: {
        'lk.transcription_final': 'false',
        'lk.segment_id': 'SG_dd4317ccd28b',
        'lk.transcribed_track_id': 'TR_AMWvWrA3RYoXvt',
      },
      encryptionType: 0,
    },
  },
  {
    text: 'Nod your head if you’re actually ready to make a move, not just talk. What uncomfortable action will you take right now to prove it?',
    participantInfo: {
      identity: 'agent-AJ_8YgMnCABRpXH',
    },
    streamInfo: {
      id: 'd49294cf-851a-4dc4-a74c-b0403d240ede',
      mimeType: 'text/plain',
      topic: 'lk.transcription',
      timestamp: 1761561684980,
      attributes: {
        'lk.transcribed_track_id': 'TR_AMbRmufQWEsQMH',
        'lk.segment_id': 'SG_d8bc60d34f2e',
        'lk.transcription_final': 'true',
      },
      encryptionType: 0,
    },
  },
  {
    text: 'Coming',
    participantInfo: {
      identity: 'voice_assistant_user_8966',
    },
    streamInfo: {
      id: '8a54c8d5-6253-47c7-9750-44045328591f',
      mimeType: 'text/plain',
      topic: 'lk.transcription',
      timestamp: 1761561694915,
      attributes: {
        'lk.transcribed_track_id': 'TR_AMWvWrA3RYoXvt',
        'lk.segment_id': 'SG_6c354dbb1a4f',
        'lk.transcription_final': 'false',
      },
      encryptionType: 0,
    },
  },
  {
    text: 'the transcriptions',
    participantInfo: {
      identity: 'voice_assistant_user_8966',
    },
    streamInfo: {
      id: 'f73c176b-ad06-453a-a57b-2298741d07e2',
      mimeType: 'text/plain',
      topic: 'lk.transcription',
      timestamp: 1761561696627,
      attributes: {
        'lk.transcription_final': 'false',
        'lk.transcribed_track_id': 'TR_AMWvWrA3RYoXvt',
        'lk.segment_id': 'SG_a52d6bd22850',
      },
      encryptionType: 0,
    },
  },
  {
    text: 'like, now the transcriptions',
    participantInfo: {
      identity: 'voice_assistant_user_8966',
    },
    streamInfo: {
      id: 'da361784-bb25-4a28-b3c6-d6950fee227e',
      mimeType: 'text/plain',
      topic: 'lk.transcription',
      timestamp: 1761561700173,
      attributes: {
        'lk.transcribed_track_id': 'TR_AMWvWrA3RYoXvt',
        'lk.transcription_final': 'false',
        'lk.segment_id': 'SG_263fea9e1bc7',
      },
      encryptionType: 0,
    },
  },
  {
    text: 'Transcriptions won’t build your business—action does. What’s the next concrete step you’ll take beyond collecting notes?',
    participantInfo: {
      identity: 'agent-AJ_8YgMnCABRpXH',
    },
    streamInfo: {
      id: '0e89dddf-a8a1-42aa-86a8-d279647c4eb9',
      mimeType: 'text/plain',
      topic: 'lk.transcription',
      timestamp: 1761561706936,
      attributes: {
        'lk.transcribed_track_id': 'TR_AMbRmufQWEsQMH',
        'lk.segment_id': 'SG_f88ad0ad1744',
        'lk.transcription_final': 'true',
      },
      encryptionType: 0,
    },
  },
  {
    text: 'Can you see me now?',
    participantInfo: {
      identity: 'voice_assistant_user_8966',
    },
    streamInfo: {
      id: '4a4754d3-b532-4aba-9dc8-086ad6c09fe4',
      mimeType: 'text/plain',
      topic: 'lk.transcription',
      timestamp: 1761561720202,
      attributes: {
        'lk.transcription_final': 'false',
        'lk.segment_id': 'SG_a78e06d15fa9',
        'lk.transcribed_track_id': 'TR_AMWvWrA3RYoXvt',
      },
      encryptionType: 0,
    },
  },
  {
    text: 'I’m still processing your camera feed—hold tight. Are you using this pause to reflect on your next bold action, or just waiting for approval?',
    participantInfo: {
      identity: 'agent-AJ_8YgMnCABRpXH',
    },
    streamInfo: {
      id: '154db312-4323-4116-a21a-26c9948838bf',
      mimeType: 'text/plain',
      topic: 'lk.transcription',
      timestamp: 1761561724586,
      attributes: {
        'lk.segment_id': 'SG_14761c84b375',
        'lk.transcribed_track_id': 'TR_AMbRmufQWEsQMH',
        'lk.transcription_final': 'true',
      },
      encryptionType: 0,
    },
  },
  {
    text: 'Camera’s not coming through on my end. Doesn’t matter—your expression won’t move the needle,',
    participantInfo: {
      identity: 'agent-AJ_8YgMnCABRpXH',
    },
    streamInfo: {
      id: '7984e7c8-22be-4ee3-945a-9f34bc6253b4',
      mimeType: 'text/plain',
      topic: 'lk.transcription',
      timestamp: 1761561733821,
      attributes: {
        'lk.segment_id': 'SG_9086c37f7aec',
        'lk.transcribed_track_id': 'TR_AMxoCfCfKDrpT7',
        'lk.transcription_final': 'true',
      },
      encryptionType: 0,
    },
  },
  {
    text: "Yeah. Like, I'm logging them",
    participantInfo: {
      identity: 'voice_assistant_user_8966',
    },
    streamInfo: {
      id: 'e895ac8d-6beb-4ea5-9022-0eed9af59bb0',
      mimeType: 'text/plain',
      topic: 'lk.transcription',
      timestamp: 1761561759207,
      attributes: {
        'lk.transcribed_track_id': 'TR_AMWvWrA3RYoXvt',
        'lk.transcription_final': 'false',
        'lk.segment_id': 'SG_96ae835ae591',
      },
      encryptionType: 0,
    },
  },
  {
    text: "I'm able to see them here now.",
    participantInfo: {
      identity: 'voice_assistant_user_8966',
    },
    streamInfo: {
      id: '4fa3724c-eaf4-47a4-acd0-f6ccc5bf0473',
      mimeType: 'text/plain',
      topic: 'lk.transcription',
      timestamp: 1761561759863,
      attributes: {
        'lk.transcribed_track_id': 'TR_AMWvWrA3RYoXvt',
        'lk.segment_id': 'SG_fec06124e73f',
        'lk.transcription_final': 'false',
      },
      encryptionType: 0,
    },
  },
  {
    text: 'On the lungs',
    participantInfo: {
      identity: 'voice_assistant_user_8966',
    },
    streamInfo: {
      id: '4ade94a6-6378-4d6c-a933-0bbd6e530630',
      mimeType: 'text/plain',
      topic: 'lk.transcription',
      timestamp: 1761561761090,
      attributes: {
        'lk.transcription_final': 'false',
        'lk.transcribed_track_id': 'TR_AMWvWrA3RYoXvt',
        'lk.segment_id': 'SG_fde4a31e4b68',
      },
      encryptionType: 0,
    },
  },
  {
    text: 'Clarity without action is just procrastination. What will you do with these “logged” transcriptions to drive results—publish, turn into content, or just let them sit?',
    participantInfo: {
      identity: 'agent-AJ_8YgMnCABRpXH',
    },
    streamInfo: {
      id: 'bd32d19a-0fb3-4ac1-af71-6d979f2c16e6',
      mimeType: 'text/plain',
      topic: 'lk.transcription',
      timestamp: 1761561771898,
      attributes: {
        'lk.transcription_final': 'true',
        'lk.segment_id': 'SG_a40f230a2331',
        'lk.transcribed_track_id': 'TR_AMxoCfCfKDrpT7',
      },
      encryptionType: 0,
    },
  },
  {
    text: 'Yeah. But then I I',
    participantInfo: {
      identity: 'voice_assistant_user_8966',
    },
    streamInfo: {
      id: '586c823b-86ad-4da4-8479-b599d5237506',
      mimeType: 'text/plain',
      topic: 'lk.transcription',
      timestamp: 1761561774026,
      attributes: {
        'lk.transcription_final': 'false',
        'lk.transcribed_track_id': 'TR_AMWvWrA3RYoXvt',
        'lk.segment_id': 'SG_bb3bbef3e9f8',
      },
      encryptionType: 0,
    },
  },
  {
    text: "I can't",
    participantInfo: {
      identity: 'voice_assistant_user_8966',
    },
    streamInfo: {
      id: 'd034b65b-1c12-4523-87d5-3d3628d91016',
      mimeType: 'text/plain',
      topic: 'lk.transcription',
      timestamp: 1761561774054,
      attributes: {
        'lk.transcribed_track_id': 'TR_AMWvWrA3RYoXvt',
        'lk.segment_id': 'SG_51482a8285c3',
        'lk.transcription_final': 'false',
      },
      encryptionType: 0,
    },
  },
  {
    text: "Then so far, I'm still not able to see the text.",
    participantInfo: {
      identity: 'voice_assistant_user_8966',
    },
    streamInfo: {
      id: 'fe15a0f2-ecc8-4e0b-9f65-99e5d4001440',
      mimeType: 'text/plain',
      topic: 'lk.transcription',
      timestamp: 1761561776295,
      attributes: {
        'lk.segment_id': 'SG_00773e575044',
        'lk.transcription_final': 'false',
        'lk.transcribed_track_id': 'TR_AMWvWrA3RYoXvt',
      },
      encryptionType: 0,
    },
  },
  {
    text: 'Like, where',
    participantInfo: {
      identity: 'voice_assistant_user_8966',
    },
    streamInfo: {
      id: '70419a7d-4f98-4a76-b8bf-d2bcc221825f',
      mimeType: 'text/plain',
      topic: 'lk.transcription',
      timestamp: 1761561777528,
      attributes: {
        'lk.transcription_final': 'false',
        'lk.segment_id': 'SG_fa08b2852e8b',
        'lk.transcribed_track_id': 'TR_AMWvWrA3RYoXvt',
      },
      encryptionType: 0,
    },
  },
  {
    text: 'have added the index if we want',
    participantInfo: {
      identity: 'voice_assistant_user_8966',
    },
    streamInfo: {
      id: 'b36cb5c3-2656-436a-a874-624e42f17447',
      mimeType: 'text/plain',
      topic: 'lk.transcription',
      timestamp: 1761561780089,
      attributes: {
        'lk.transcribed_track_id': 'TR_AMWvWrA3RYoXvt',
        'lk.segment_id': 'SG_c47630176f2a',
        'lk.transcription_final': 'false',
      },
      encryptionType: 0,
    },
  },
];

const IN_DEVELOPMENT = process.env.NODE_ENV !== 'production';
const BOTTOM_VIEW_MOTION_PROPS = {
  variants: {
    visible: {
      opacity: 1,
      translateY: '0%',
    },
    hidden: {
      opacity: 0,
      translateY: '100%',
    },
  },
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden',
  transition: {
    duration: 0.3,
    delay: 0.5,
    ease: 'easeOut',
  },
};

interface FadeProps {
  top?: boolean;
  bottom?: boolean;
  className?: string;
}

export function Fade({ top = false, bottom = false, className }: FadeProps) {
  return (
    <div
      className={cn(
        'from-background pointer-events-none h-4 bg-linear-to-b to-transparent',
        top && 'bg-linear-to-b',
        bottom && 'bg-linear-to-t',
        className
      )}
    />
  );
}
interface SessionViewProps {
  appConfig: AppConfig;
}

export const SessionView = ({
  appConfig,
  ...props
}: React.ComponentProps<'section'> & SessionViewProps) => {
  useConnectionTimeout(200_000);
  useDebugMode({ enabled: IN_DEVELOPMENT });

  const transcriptions = useTranscriptions();

  console.log(transcriptions);

  const messages = useChatMessages();
  const [chatOpen, setChatOpen] = useState(false);

  console.log(messages);

  const controls: ControlBarControls = {
    leave: true,
    microphone: true,
    chat: appConfig.supportsChatInput,
    camera: appConfig.supportsVideoInput,
    screenShare: appConfig.supportsVideoInput,
  };

  return (
    <section className="bg-background relative z-10 h-full w-full overflow-hidden" {...props}>
      {/* Chat Transcript */}
      <div
        className={cn(
          'fixed inset-0 grid grid-cols-1 grid-rows-1',
          !chatOpen && 'pointer-events-none'
        )}
      >
        <Fade top className="absolute inset-x-4 top-0 h-40" />
        <ScrollArea className="px-4 pt-40 pb-[150px] md:px-6 md:pb-[180px]">
          <ChatTranscript
            hidden={!chatOpen}
            messages={messages}
            className="mx-auto max-w-2xl space-y-3 transition-opacity duration-300 ease-out"
          />
        </ScrollArea>
      </div>

      {/* Tile Layout */}
      <TileLayout chatOpen={chatOpen} />

      {/* Bottom */}
      <MotionBottom
        // {...BOTTOM_VIEW_MOTION_PROPS}
        className="fixed inset-x-3 bottom-0 z-50 md:inset-x-12"
      >
        {appConfig.isPreConnectBufferEnabled && (
          <PreConnectMessage messages={messages} className="pb-4" />
        )}
        <div className="bg-background relative mx-auto max-w-2xl pb-3 md:pb-12">
          <Fade bottom className="absolute inset-x-0 top-0 h-4 -translate-y-full" />
          <AgentControlBar controls={controls} onChatOpenChange={setChatOpen} />
        </div>
      </MotionBottom>
    </section>
  );
};
