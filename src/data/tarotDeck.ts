export interface TarotCard {
  id: string;
  name: string;
  nameTr: string;
  suit: string;
  arcana: 'major' | 'minor';
  keywords: string[];
  keywordsTr: string[];
  upright: string;
  uprightTr: string;
  reversed: string;
  reversedTr: string;
  symbolism: string;
  symbolismTr: string;
  imageUrl: string;
}

const majorArcana: TarotCard[] = [
  {
    id: 'rw_00',
    name: 'The Fool',
    nameTr: 'Deli',
    suit: 'Major Arcana',
    arcana: 'major',
    keywords: ['beginnings', 'innocence', 'spontaneity'],
    keywordsTr: ['başlangıçlar', 'masumiyet', 'spontanlık'],
    upright: 'New beginnings, optimism, trust in life',
    uprightTr: 'Yeni başlangıçlar, iyimserlik, hayata güven',
    reversed: 'Recklessness, naivety, taken advantage of',
    reversedTr: 'Pervasızlık, saflık, kullanılmak',
    symbolism: 'A young person stands at the edge of a cliff',
    symbolismTr: 'Genç bir kişi uçurumun kenarında duruyor',
    imageUrl: 'https://www.sacred-texts.com/tarot/pkt/img/ar00.jpg'
  },
  {
    id: 'rw_01',
    name: 'The Magician',
    nameTr: 'Büyücü',
    suit: 'Major Arcana',
    arcana: 'major',
    keywords: ['manifestation', 'power', 'resourcefulness'],
    keywordsTr: ['tezahür', 'güç', 'beceriklilik'],
    upright: 'Manifestation, resourcefulness, inspired action',
    uprightTr: 'Tezahür, beceriklilik, ilham verici eylem',
    reversed: 'Manipulation, poor planning, untapped talents',
    reversedTr: 'Manipülasyon, zayıf planlama, kullanılmayan yetenekler',
    symbolism: 'The Magician channels divine energy',
    symbolismTr: 'Büyücü ilahi enerjiyi kanalize eder',
    imageUrl: 'https://www.sacred-texts.com/tarot/pkt/img/ar01.jpg'
  },
  {
    id: 'rw_02',
    name: 'The High Priestess',
    nameTr: 'Rahibe',
    suit: 'Major Arcana',
    arcana: 'major',
    keywords: ['intuition', 'sacred knowledge', 'subconscious'],
    keywordsTr: ['sezgi', 'kutsal bilgi', 'bilinçaltı'],
    upright: 'Intuition, sacred knowledge, divine feminine',
    uprightTr: 'Sezgi, kutsal bilgi, ilahi dişilik',
    reversed: 'Secrets, disconnected from intuition',
    reversedTr: 'Sırlar, sezgiden kopukluk',
    symbolism: 'She guards the threshold between realms',
    symbolismTr: 'Alemler arasındaki eşiği korur',
    imageUrl: 'https://www.sacred-texts.com/tarot/pkt/img/ar02.jpg'
  }
];

const getCardImageUrl = (cardNumber: number): string => {
  if (cardNumber < 22) {
    return `https://www.sacred-texts.com/tarot/pkt/img/ar${cardNumber.toString().padStart(2, '0')}.jpg`;
  }

  const minorIndex = cardNumber - 22;
  const suits = ['wa', 'cu', 'sw', 'pe'];
  const suitIndex = Math.floor(minorIndex / 14);
  const rank = (minorIndex % 14) + 1;
  const suit = suits[suitIndex];

  return `https://www.sacred-texts.com/tarot/pkt/img/${suit}${rank.toString().padStart(2, '0')}.jpg`;
};

const minorCards: TarotCard[] = [];
for (let i = 3; i < 78; i++) {
  const num = i.toString().padStart(2, '0');
  minorCards.push({
    id: `rw_${num}`,
    name: `Card ${i}`,
    nameTr: `Kart ${i}`,
    suit: i < 22 ? 'Major Arcana' : 'Minor Arcana',
    arcana: i < 22 ? 'major' : 'minor',
    keywords: ['mystery', 'journey', 'wisdom'],
    keywordsTr: ['gizem', 'yolculuk', 'bilgelik'],
    upright: 'Positive change and growth',
    uprightTr: 'Pozitif değişim ve büyüme',
    reversed: 'Challenges and lessons',
    reversedTr: 'Zorluklar ve dersler',
    symbolism: 'Ancient wisdom and guidance',
    symbolismTr: 'Kadim bilgelik ve rehberlik',
    imageUrl: getCardImageUrl(i)
  });
}

export const tarotDeck: TarotCard[] = [...majorArcana, ...minorCards];
