import type { GroundingSource } from './googleSearchGrounding';

export type ChatTurn = {
  role: 'user' | 'model';
  parts: { text: string }[];
};

export type MessagePart = {
  type: 'text' | 'link';
  content: string;
  href?: string;
  className?: string;
};

export type ChatMessage = {
  content: string;
  isUser: boolean;
  groundingSources?: GroundingSource[];
  searchEntryPoint?: string;
};
