export interface IAgent {
  persona_id: string;
  replica_id?: string;
  memory_stores: string[];
  custom_greeting?: string;
  conversational_context?: string;
  properties?: {
    [key: string]: string;
  };
}


export interface IConversation {
  id: string;
  conversation_id: string;
  conversation_url: string;
  selected_agent: IAgent
}