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

const createCard = (
  num: number,
  name: string,
  nameTr: string,
  suit: string,
  arcana: 'major' | 'minor',
  keywords: string[],
  keywordsTr: string[],
  upright: string,
  uprightTr: string,
  reversed: string,
  reversedTr: string,
  symbolism: string,
  symbolismTr: string,
  imageUrl: string
): TarotCard => ({
  id: `rw_${String(num).padStart(2, '0')}`,
  name,
  nameTr,
  suit,
  arcana,
  keywords,
  keywordsTr,
  upright,
  uprightTr,
  reversed,
  reversedTr,
  symbolism,
  symbolismTr,
  imageUrl
});

export const tarotDeck: TarotCard[] = [
  createCard(
    0, "The Fool", "Deli", "Major Arcana", "major",
    ["beginnings", "innocence", "spontaneity"],
    ["başlangıçlar", "masumiyet", "spontanlık"],
    "New beginnings, optimism, trust in life",
    "Yeni başlangıçlar, iyimserlik, hayata güven",
    "Recklessness, naivety, taken advantage of",
    "Pervasızlık, saflık, kullanılmak",
    "A young person stands at the edge of a cliff",
    "Genç bir kişi uçurumun kenarında duruyor",
    "https://images.pexels.com/photos/6896372/pexels-photo-6896372.jpeg?auto=compress&cs=tinysrgb&w=400"
  ),
  createCard(
    1, "The Magician", "Büyücü", "Major Arcana", "major",
    ["manifestation", "power", "resourcefulness"],
    ["tezahür", "güç", "beceriklilik"],
    "Manifestation, resourcefulness, inspired action",
    "Tezahür, beceriklilik, ilham verici eylem",
    "Manipulation, poor planning, untapped talents",
    "Manipülasyon, zayıf planlama, kullanılmayan yetenekler",
    "The Magician channels divine energy",
    "Büyücü ilahi enerjiyi kanalize eder",
    "https://images.pexels.com/photos/8066665/pexels-photo-8066665.jpeg?auto=compress&cs=tinysrgb&w=400"
  ),
  createCard(
    2, "The High Priestess", "Rahibe", "Major Arcana", "major",
    ["intuition", "sacred knowledge", "subconscious"],
    ["sezgi", "kutsal bilgi", "bilinçaltı"],
    "Intuition, sacred knowledge, divine feminine",
    "Sezgi, kutsal bilgi, ilahi dişilik",
    "Secrets, disconnected from intuition",
    "Sırlar, sezgiden kopukluk",
    "She guards the threshold between realms",
    "Alemler arasındaki eşiği korur",
    "https://images.pexels.com/photos/8066820/pexels-photo-8066820.jpeg?auto=compress&cs=tinysrgb&w=400"
  )
];

// Add more cards programmatically
for (let i = 3; i < 78; i++) {
  const id = `rw_${String(i).padStart(2, '0')}`;
  tarotDeck.push({
    id,
    name: `Card ${i}`,
    nameTr: `Kart ${i}`,
    suit: i < 22 ? "Major Arcana" : "Minor Arcana",
    arcana: i < 22 ? "major" : "minor",
    keywords: ["mystery", "journey", "wisdom"],
    keywordsTr: ["gizem", "yolculuk", "bilgelik"],
    upright: "Positive change and growth",
    uprightTr: "Pozitif değişim ve büyüme",
    reversed: "Challenges and lessons",
    reversedTr: "Zorluklar ve dersler",
    symbolism: "Ancient wisdom and guidance",
    symbolismTr: "Kadim bilgelik ve rehberlik",
    imageUrl: `https://images.pexels.com/photos/${6896372 + i}/pexels-photo-${6896372 + i}.jpeg?auto=compress&cs=tinysrgb&w=400`
  });
}
