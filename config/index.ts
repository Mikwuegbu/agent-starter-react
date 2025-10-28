import { IAgent } from '@/types';

export const TAVUS_API_KEY = process.env.VITE_APP_TAVUS_API_KEY;

export const portalsAgents: Record<string, IAgent> = {
  medical: {
    persona_id: 'pf089cd22fc8',
    memory_stores: ['medical'],
  },
  coaching: {
    persona_id: 'pedcea8ba15c',
    memory_stores: ['coaching'],
  },
  sales: {
    persona_id: 'pdceeff358d4',
    replica_id: 'r441d437f4e0',
    memory_stores: ['juan-sales'],
  },
  adri: {
    persona_id: 'pf1a8d983400',
    custom_greeting: 'Hola, ¿en qué puedo ayudarte?',
    conversational_context: null,
    memory_stores: ['adri'],
    // https://docs.tavus.io/api-reference/conversations/create-conversation#body-properties-language
    properties: {},
  },
  cursing: {
    persona_id: 'p6ff0bffafa3',
    memory_stores: ['cursing'],
  },
};

export const CONVERSAION_WEBHOOK_URL =
  'https://n8n-nzgas-u27047.vm.elestio.app/webhook/f387b2d5-0249-4082-979f-9986963d0cf6';

// Note: This endpoint is also hardcoded in public/sw.js for service worker usage
// If you change this URL, make sure to update it in the service worker file as well
export const WORKFLOW_END_CONVERSATION_ENDPOINT =
  'https://n8n-nzgas-u27047.vm.elestio.app/webhook/end-conversation';
export const WORKFLOW_BEGIN_CONVERSATION_ENDPOINT =
  'https://n8n-nzgas-u27047.vm.elestio.app/webhook/begin-conversation';
