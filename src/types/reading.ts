export type ReadingType =
  | 'daily'
  | '3-card'
  | 'celtic-cross'
  | 'relationship'
  | 'career'
  | 'soulmate'
  | 'year'
  | 'divination'
  | 'psychological'
  | 'spiritual'
  | 'meditation'
  | 'decision';

export interface ReadingTypeConfig {
  id: ReadingType;
  name: string;
  description: string;
  cardCount: number;
  icon: string;
  category: 'classic' | 'thematic';
}

export interface SelectedCard {
  cardId: string;
  position: number;
  orientation: 'upright' | 'reversed';
}

export interface ReadingData {
  readingType: ReadingType;
  selectedCards: SelectedCard[];
  question: string;
  userName?: string;
}

export const readingTypes: ReadingTypeConfig[] = [
  {
    id: 'daily',
    name: 'Daily Tarot',
    description: 'A single card to guide your day',
    cardCount: 1,
    icon: '☀️',
    category: 'classic'
  },
  {
    id: '3-card',
    name: '3 Card Spread',
    description: 'Past, Present, Future spread',
    cardCount: 3,
    icon: '🔮',
    category: 'classic'
  },
  {
    id: 'celtic-cross',
    name: 'Celtic Cross',
    description: 'The most comprehensive 10-card spread',
    cardCount: 10,
    icon: '✨',
    category: 'classic'
  },
  {
    id: 'relationship',
    name: 'Relationship & Love',
    description: 'Insights into your relationships and romantic life',
    cardCount: 7,
    icon: '❤️',
    category: 'classic'
  },
  {
    id: 'career',
    name: 'Career & Money',
    description: 'Guidance for your professional and financial life',
    cardCount: 6,
    icon: '💼',
    category: 'classic'
  },
  {
    id: 'soulmate',
    name: 'Soulmate Reading',
    description: 'Discover your soulmate connection and divine partnership',
    cardCount: 7,
    icon: '💫',
    category: 'classic'
  },
  {
    id: 'year',
    name: 'Year Ahead',
    description: '12 cards revealing the months ahead',
    cardCount: 12,
    icon: '📅',
    category: 'classic'
  },
  {
    id: 'divination',
    name: 'Divination Tarot',
    description: 'Focus on future predictions and possible outcomes',
    cardCount: 5,
    icon: '🔭',
    category: 'thematic'
  },
  {
    id: 'psychological',
    name: 'Psychological Tarot',
    description: 'Understand your subconscious, emotional blocks, and inner world',
    cardCount: 6,
    icon: '🧠',
    category: 'thematic'
  },
  {
    id: 'spiritual',
    name: 'Spiritual Guidance',
    description: 'Explore your spiritual journey and higher purpose',
    cardCount: 5,
    icon: '🕉️',
    category: 'thematic'
  },
  {
    id: 'meditation',
    name: 'Meditation Tarot',
    description: 'Inner awareness and energy balancing through cards',
    cardCount: 4,
    icon: '🧘',
    category: 'thematic'
  },
  {
    id: 'decision',
    name: 'Decision Making',
    description: 'Guidance between two specific choices (Option A vs Option B)',
    cardCount: 5,
    icon: '⚖️',
    category: 'thematic'
  }
];
