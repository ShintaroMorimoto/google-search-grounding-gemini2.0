export type GroundingSource = {
  title: string;
  domain: string;
  uri: string;
  faviconUrl: string;
};

export type GroundingCitation = {
  referenceNumber: number[];
  correspondingText: string;
};

export type ChatTurn = {
  role: 'user' | 'model';
  parts: { text: string }[];
};

export type MessagePart = {
  type: 'text' | 'link';
  content: string;
  href?: string;
};
