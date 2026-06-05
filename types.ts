export type NavItem = 'guide' | 'chat' | 'laws' | 'videos';

export interface Diagnosis {
  name: string;
  criteria: string[];
}

export interface Disease {
  id: string;
  name: string;
  definition: string;
  documents: string[];
  diagnoses: Diagnosis[];
}

export interface Law {
  id: string;
  number: string;
  title: string;
  description: string;
  keyArticles: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isThinking?: boolean;
}