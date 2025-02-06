export type ChatRole = 'user' | 'assistant';

export interface ChatMessages {
  role: ChatRole;
  content: string;
}
