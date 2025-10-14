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
    imageUrl: 'https://images.pexels.com/photos/6896372/pexels-photo-6896372.jpeg?auto=compress&cs=tinysrgb&w=400'
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
    imageUrl: 'https://images.pexels.com/photos/8066665/pexels-photo-8066665.jpeg?auto=compress&cs=tinysrgb&w=400'
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
    imageUrl: 'https://images.pexels.com/photos/8066820/pexels-photo-8066820.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

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
    imageUrl: `https://images.pexels.com/photos/${6896372 + i}/pexels-photo-${6896372 + i}.jpeg?auto=compress&cs=tinysrgb&w=400`
  });
}

export const tarotDeck: TarotCard[] = [...majorArcana, ...minorCards];
