export type ReadingType =
  | 'daily'
  | '3-card'
  | 'celtic-cross'
  | 'relationship'
  | 'career'
  | 'soulmate'
  | 'year';

export interface ReadingTypeConfig {
  id: ReadingType;
  name: string;
  nameTr: string;
  description: string;
  descriptionTr: string;
  cardCount: number;
  icon: string;
}

export interface SelectedCard {
  cardId: string;
  position: number;
  orientation: 'upright' | 'reversed';
}

export interface ReadingData {
  readingType: ReadingType;
  selectedCards: SelectedCard[];
  userName?: string;
}

export const readingTypes: ReadingTypeConfig[] = [
  {
    id: 'daily',
    name: 'Daily Tarot',
    nameTr: 'Günlük Tarot',
    description: 'A single card to guide your day',
    descriptionTr: 'Gününüze rehberlik edecek tek kart',
    cardCount: 1,
    icon: '☀️'
  },
  {
    id: '3-card',
    name: '3 Card Spread',
    nameTr: '3 Kart Açılımı',
    description: 'Past, Present, Future spread',
    descriptionTr: 'Geçmiş, Şimdi, Gelecek açılımı',
    cardCount: 3,
    icon: '🔮'
  },
  {
    id: 'celtic-cross',
    name: 'Celtic Cross',
    nameTr: 'Kelt Haçı',
    description: 'The most comprehensive 10-card spread',
    descriptionTr: 'En kapsamlı 10 kartlık açılım',
    cardCount: 10,
    icon: '✨'
  },
  {
    id: 'relationship',
    name: 'Relationship Reading',
    nameTr: 'İlişki / Aşk',
    description: 'Insights into your relationships',
    descriptionTr: 'İlişkileriniz hakkında içgörü',
    cardCount: 7,
    icon: '❤️'
  },
  {
    id: 'career',
    name: 'Career & Money',
    nameTr: 'Kariyer / Para',
    description: 'Guidance for your professional life',
    descriptionTr: 'Profesyonel hayatınız için rehberlik',
    cardCount: 6,
    icon: '💼'
  },
  {
    id: 'soulmate',
    name: 'Soulmate Reading',
    nameTr: 'Ruh Eşi',
    description: 'Discover your soulmate connection',
    descriptionTr: 'Ruh eşi bağlantınızı keşfedin',
    cardCount: 7,
    icon: '💫'
  },
  {
    id: 'year',
    name: 'Year Ahead',
    nameTr: 'Yıl / Ay',
    description: '12 cards for the months ahead',
    descriptionTr: 'Önümüzdeki aylar için 12 kart',
    cardCount: 12,
    icon: '📅'
  }
];
