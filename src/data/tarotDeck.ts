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
    id: 'major_0',
    name: 'The Fool',
    nameTr: 'Deli',
    suit: 'Major Arcana',
    arcana: 'major',
    keywords: ['beginnings', 'innocence', 'spontaneity', 'free spirit'],
    keywordsTr: ['başlangıçlar', 'masumiyet', 'spontanlık', 'özgür ruh'],
    upright: 'New beginnings, optimism, trust in life, innocence, free spirit, originality',
    uprightTr: 'Yeni başlangıçlar, iyimserlik, hayata güven, masumiyet, özgür ruh',
    reversed: 'Recklessness, taken advantage of, inconsideration, naivety, foolishness',
    reversedTr: 'Pervasızlık, kullanılmak, düşüncesizlik, saflık',
    symbolism: 'A young person stands at the edge of a cliff, about to step into the unknown with optimism',
    symbolismTr: 'Genç bir kişi uçurumun kenarında, iyimserlikle bilinmeyene adım atmak üzere',
    imageUrl: 'https://gfx.tarot.com/images/site/decks/universal-waite/full_size/0.jpg'
  },
  {
    id: 'major_1',
    name: 'The Magician',
    nameTr: 'Büyücü',
    suit: 'Major Arcana',
    arcana: 'major',
    keywords: ['manifestation', 'willpower', 'desire', 'creation'],
    keywordsTr: ['tezahür', 'irade', 'arzu', 'yaratım'],
    upright: 'Manifestation, resourcefulness, power, inspired action, skill, concentration',
    uprightTr: 'Tezahür, beceriklilik, güç, ilham verici eylem',
    reversed: 'Manipulation, poor planning, untapped talents, trickery',
    reversedTr: 'Manipülasyon, kötü planlama, kullanılmayan yetenekler',
    symbolism: 'The Magician channels divine energy with the tools of manifestation before him',
    symbolismTr: 'Büyücü önündeki tezahür araçlarıyla ilahi enerjiyi kanalize eder',
    imageUrl: 'https://gfx.tarot.com/images/site/decks/universal-waite/full_size/1.jpg'
  },
  {
    id: 'major_2',
    name: 'The High Priestess',
    nameTr: 'Yüksek Rahibe',
    suit: 'Major Arcana',
    arcana: 'major',
    keywords: ['intuition', 'sacred knowledge', 'divine feminine', 'subconscious'],
    keywordsTr: ['sezgi', 'kutsal bilgi', 'ilahi dişilik', 'bilinçaltı'],
    upright: 'Intuition, sacred knowledge, divine feminine, the subconscious mind',
    uprightTr: 'Sezgi, kutsal bilgi, ilahi dişilik, bilinçaltı',
    reversed: 'Secrets, disconnected from intuition, withdrawal and silence',
    reversedTr: 'Sırlar, sezgiden kopukluk, içe kapanma',
    symbolism: 'She sits between two pillars guarding the threshold to the subconscious',
    symbolismTr: 'Bilinçaltına açılan eşiği koruyan iki sütun arasında oturur',
    imageUrl: 'https://gfx.tarot.com/images/site/decks/universal-waite/full_size/2.jpg'
  },
  {
    id: 'major_3',
    name: 'The Empress',
    nameTr: 'İmparatoriçe',
    suit: 'Major Arcana',
    arcana: 'major',
    keywords: ['femininity', 'beauty', 'nature', 'nurturing', 'abundance'],
    keywordsTr: ['kadınlık', 'güzellik', 'doğa', 'besleyicilik', 'bolluk'],
    upright: 'Femininity, beauty, nature, nurturing, abundance, creativity',
    uprightTr: 'Kadınlık, güzellik, doğa, besleyicilik, bolluk, yaratıcılık',
    reversed: 'Creative block, dependence on others, smothering',
    reversedTr: 'Yaratıcı blokaj, başkalarına bağımlılık, boğuculuk',
    symbolism: 'The Empress sits in a lush garden representing abundance and fertility',
    symbolismTr: 'İmparatoriçe bolluk ve bereketi temsil eden yeşil bir bahçede oturur',
    imageUrl: 'https://gfx.tarot.com/images/site/decks/universal-waite/full_size/3.jpg'
  },
  {
    id: 'major_4',
    name: 'The Emperor',
    nameTr: 'İmparator',
    suit: 'Major Arcana',
    arcana: 'major',
    keywords: ['authority', 'structure', 'control', 'fatherhood'],
    keywordsTr: ['otorite', 'yapı', 'kontrol', 'babalık'],
    upright: 'Authority, establishment, structure, father figure, solid foundation',
    uprightTr: 'Otorite, kuruluş, yapı, baba figürü, sağlam temel',
    reversed: 'Domination, excessive control, lack of discipline, inflexibility',
    reversedTr: 'Tahakküm, aşırı kontrol, disiplin eksikliği, katılık',
    symbolism: 'The Emperor sits on a throne representing structure and authority',
    symbolismTr: 'İmparator yapı ve otoriteyi temsil eden bir taht üzerinde oturur',
    imageUrl: 'https://gfx.tarot.com/images/site/decks/universal-waite/full_size/4.jpg'
  },
  {
    id: 'major_5',
    name: 'The Hierophant',
    nameTr: 'Aziz',
    suit: 'Major Arcana',
    arcana: 'major',
    keywords: ['spiritual wisdom', 'tradition', 'conformity', 'morality'],
    keywordsTr: ['ruhsal bilgelik', 'gelenek', 'uygunluk', 'ahlak'],
    upright: 'Spiritual wisdom, religious beliefs, conformity, tradition, institutions',
    uprightTr: 'Ruhsal bilgelik, dini inançlar, uygunluk, gelenek, kurumlar',
    reversed: 'Personal beliefs, freedom, challenging the status quo',
    reversedTr: 'Kişisel inançlar, özgürlük, statükoya meydan okuma',
    symbolism: 'A religious figure passes down spiritual knowledge and tradition',
    symbolismTr: 'Dini bir figür ruhsal bilgi ve geleneği aktarır',
    imageUrl: 'https://gfx.tarot.com/images/site/decks/universal-waite/full_size/5.jpg'
  },
  {
    id: 'major_6',
    name: 'The Lovers',
    nameTr: 'Aşıklar',
    suit: 'Major Arcana',
    arcana: 'major',
    keywords: ['love', 'harmony', 'relationships', 'choices', 'values'],
    keywordsTr: ['aşk', 'uyum', 'ilişkiler', 'seçimler', 'değerler'],
    upright: 'Love, harmony, relationships, values alignment, choices',
    uprightTr: 'Aşk, uyum, ilişkiler, değer uyumu, seçimler',
    reversed: 'Self-love, disharmony, imbalance, misalignment of values',
    reversedTr: 'Öz sevgi, uyumsuzluk, dengesizlik, değer uyumsuzluğu',
    symbolism: 'Two lovers stand beneath an angel representing divine union',
    symbolismTr: 'İki aşık ilahi birliği temsil eden bir meleğin altında durur',
    imageUrl: 'https://gfx.tarot.com/images/site/decks/universal-waite/full_size/6.jpg'
  },
  {
    id: 'major_7',
    name: 'The Chariot',
    nameTr: 'Savaş Arabası',
    suit: 'Major Arcana',
    arcana: 'major',
    keywords: ['control', 'willpower', 'success', 'determination'],
    keywordsTr: ['kontrol', 'irade', 'başarı', 'azim'],
    upright: 'Control, willpower, success, action, determination, direction',
    uprightTr: 'Kontrol, irade, başarı, eylem, azim, yön',
    reversed: 'Self-discipline, opposition, lack of direction',
    reversedTr: 'Öz disiplin, muhalefet, yön eksikliği',
    symbolism: 'A warrior rides a chariot pulled by opposing forces under control',
    symbolismTr: 'Bir savaşçı kontrol altındaki karşıt güçler tarafından çekilen bir arabaya biner',
    imageUrl: 'https://gfx.tarot.com/images/site/decks/universal-waite/full_size/7.jpg'
  },
  {
    id: 'major_8',
    name: 'Strength',
    nameTr: 'Güç',
    suit: 'Major Arcana',
    arcana: 'major',
    keywords: ['strength', 'courage', 'patience', 'compassion'],
    keywordsTr: ['güç', 'cesaret', 'sabır', 'şefkat'],
    upright: 'Strength, courage, persuasion, influence, compassion, inner power',
    uprightTr: 'Güç, cesaret, ikna, etki, şefkat, iç güç',
    reversed: 'Inner strength, self-doubt, low energy, raw emotion',
    reversedTr: 'İç güç, kendinden şüphe, düşük enerji, ham duygu',
    symbolism: 'A woman gently tames a lion representing inner strength over brute force',
    symbolismTr: 'Bir kadın kaba güce karşı iç gücü temsil eden bir aslanı nazikçe evcilleştirir',
    imageUrl: 'https://gfx.tarot.com/images/site/decks/universal-waite/full_size/8.jpg'
  },
  {
    id: 'major_9',
    name: 'The Hermit',
    nameTr: 'Ermiş',
    suit: 'Major Arcana',
    arcana: 'major',
    keywords: ['soul searching', 'introspection', 'inner guidance', 'solitude'],
    keywordsTr: ['ruh arayışı', 'iç gözlem', 'iç rehberlik', 'yalnızlık'],
    upright: 'Soul searching, introspection, being alone, inner guidance, wisdom',
    uprightTr: 'Ruh arayışı, iç gözlem, yalnız olmak, iç rehberlik, bilgelik',
    reversed: 'Isolation, loneliness, withdrawal, paranoia',
    reversedTr: 'İzolasyon, yalnızlık, geri çekilme, paranoya',
    symbolism: 'An old wise man holds a lamp aloft seeking inner truth',
    symbolismTr: 'Yaşlı bir bilge adam iç gerçeği arayan bir lamba tutar',
    imageUrl: 'https://gfx.tarot.com/images/site/decks/universal-waite/full_size/9.jpg'
  },
  {
    id: 'major_10',
    name: 'Wheel of Fortune',
    nameTr: 'Kader Çarkı',
    suit: 'Major Arcana',
    arcana: 'major',
    keywords: ['destiny', 'turning point', 'luck', 'life cycles'],
    keywordsTr: ['kader', 'dönüm noktası', 'şans', 'yaşam döngüleri'],
    upright: 'Good luck, karma, life cycles, destiny, a turning point',
    uprightTr: 'İyi şans, karma, yaşam döngüleri, kader, dönüm noktası',
    reversed: 'Bad luck, resistance to change, breaking cycles',
    reversedTr: 'Kötü şans, değişime direnç, döngüleri kırma',
    symbolism: 'The wheel turns showing the cycles of fortune and fate',
    symbolismTr: 'Çark dönerek talih ve kaderin döngülerini gösterir',
    imageUrl: 'https://gfx.tarot.com/images/site/decks/universal-waite/full_size/10.jpg'
  },
  {
    id: 'major_11',
    name: 'Justice',
    nameTr: 'Adalet',
    suit: 'Major Arcana',
    arcana: 'major',
    keywords: ['justice', 'fairness', 'truth', 'law', 'karma'],
    keywordsTr: ['adalet', 'tarafsızlık', 'gerçek', 'yasa', 'karma'],
    upright: 'Justice, fairness, truth, cause and effect, law, karma',
    uprightTr: 'Adalet, tarafsızlık, gerçek, sebep ve sonuç, yasa, karma',
    reversed: 'Unfairness, lack of accountability, dishonesty',
    reversedTr: 'Haksızlık, sorumluluk eksikliği, sahtekarlık',
    symbolism: 'A figure holds scales representing balance and a sword for truth',
    symbolismTr: 'Bir figür dengeyi temsil eden bir terazi ve gerçek için bir kılıç tutar',
    imageUrl: 'https://gfx.tarot.com/images/site/decks/universal-waite/full_size/11.jpg'
  },
  {
    id: 'major_12',
    name: 'The Hanged Man',
    nameTr: 'Asılan Adam',
    suit: 'Major Arcana',
    arcana: 'major',
    keywords: ['pause', 'surrender', 'letting go', 'new perspective'],
    keywordsTr: ['duraklama', 'teslim olma', 'bırakma', 'yeni bakış açısı'],
    upright: 'Pause, surrender, letting go, new perspectives, sacrifice',
    uprightTr: 'Duraklama, teslim olma, bırakma, yeni bakış açıları, fedakarlık',
    reversed: 'Delays, resistance, stalling, indecision',
    reversedTr: 'Gecikmeler, direnç, oyalama, kararsızlık',
    symbolism: 'A man hangs upside down representing a voluntary pause and shift in perspective',
    symbolismTr: 'Bir adam gönüllü bir duraklamayı ve bakış açısı değişimini temsil eden baş aşağı asılır',
    imageUrl: 'https://gfx.tarot.com/images/site/decks/universal-waite/full_size/12.jpg'
  },
  {
    id: 'major_13',
    name: 'Death',
    nameTr: 'Ölüm',
    suit: 'Major Arcana',
    arcana: 'major',
    keywords: ['endings', 'transformation', 'transition', 'letting go'],
    keywordsTr: ['sonlar', 'dönüşüm', 'geçiş', 'bırakma'],
    upright: 'Endings, change, transformation, transition, letting go',
    uprightTr: 'Sonlar, değişim, dönüşüm, geçiş, bırakma',
    reversed: 'Resistance to change, personal transformation, inner purging',
    reversedTr: 'Değişime direnç, kişisel dönüşüm, içsel arınma',
    symbolism: 'Death rides representing inevitable transformation and renewal',
    symbolismTr: 'Ölüm kaçınılmaz dönüşüm ve yenilenmeyi temsil ederek süvari olur',
    imageUrl: 'https://gfx.tarot.com/images/site/decks/universal-waite/full_size/13.jpg'
  },
  {
    id: 'major_14',
    name: 'Temperance',
    nameTr: 'Denge',
    suit: 'Major Arcana',
    arcana: 'major',
    keywords: ['balance', 'moderation', 'patience', 'purpose', 'harmony'],
    keywordsTr: ['denge', 'ılımlılık', 'sabır', 'amaç', 'uyum'],
    upright: 'Balance, moderation, patience, purpose, meaning, harmony',
    uprightTr: 'Denge, ılımlılık, sabır, amaç, anlam, uyum',
    reversed: 'Imbalance, excess, self-healing, re-alignment',
    reversedTr: 'Dengesizlik, aşırılık, öz-iyileştirme, yeniden hizalama',
    symbolism: 'An angel pours water between cups representing balance and flow',
    symbolismTr: 'Bir melek dengeyi ve akışı temsil eden bardaklar arasında su döker',
    imageUrl: 'https://gfx.tarot.com/images/site/decks/universal-waite/full_size/14.jpg'
  },
  {
    id: 'major_15',
    name: 'The Devil',
    nameTr: 'Şeytan',
    suit: 'Major Arcana',
    arcana: 'major',
    keywords: ['shadow self', 'attachment', 'addiction', 'restriction'],
    keywordsTr: ['gölge benlik', 'bağımlılık', 'kısıtlama', 'tutsak'],
    upright: 'Shadow self, attachment, addiction, restriction, sexuality',
    uprightTr: 'Gölge benlik, bağlılık, bağımlılık, kısıtlama, cinsellik',
    reversed: 'Releasing limiting beliefs, exploring dark thoughts, detachment',
    reversedTr: 'Sınırlayıcı inançları bırakma, karanlık düşünceleri keşfetme, ayrılma',
    symbolism: 'Chained figures represent self-imposed bondage and material attachments',
    symbolismTr: 'Zincirli figürler kendi kendine dayatılan esareti ve maddi bağlılıkları temsil eder',
    imageUrl: 'https://gfx.tarot.com/images/site/decks/universal-waite/full_size/15.jpg'
  },
  {
    id: 'major_16',
    name: 'The Tower',
    nameTr: 'Kule',
    suit: 'Major Arcana',
    arcana: 'major',
    keywords: ['sudden change', 'upheaval', 'chaos', 'revelation', 'awakening'],
    keywordsTr: ['ani değişim', 'karışıklık', 'kaos', 'vahiy', 'uyanış'],
    upright: 'Sudden change, upheaval, chaos, revelation, awakening',
    uprightTr: 'Ani değişim, karışıklık, kaos, vahiy, uyanış',
    reversed: 'Personal transformation, fear of change, averting disaster',
    reversedTr: 'Kişisel dönüşüm, değişim korkusu, felaketi önleme',
    symbolism: 'Lightning strikes a tower representing sudden revelation and collapse of illusions',
    symbolismTr: 'Yıldırım ani vahyi ve yanılsamaların çöküşünü temsil eden bir kuleye çarpar',
    imageUrl: 'https://gfx.tarot.com/images/site/decks/universal-waite/full_size/16.jpg'
  },
  {
    id: 'major_17',
    name: 'The Star',
    nameTr: 'Yıldız',
    suit: 'Major Arcana',
    arcana: 'major',
    keywords: ['hope', 'faith', 'purpose', 'renewal', 'spirituality'],
    keywordsTr: ['umut', 'inanç', 'amaç', 'yenilenme', 'maneviyat'],
    upright: 'Hope, faith, purpose, renewal, spirituality, inspiration',
    uprightTr: 'Umut, inanç, amaç, yenilenme, maneviyat, ilham',
    reversed: 'Lack of faith, despair, self-trust, disconnection',
    reversedTr: 'İnanç eksikliği, umutsuzluk, kendine güvensizlik, kopukluk',
    symbolism: 'A woman pours water under stars representing hope and divine guidance',
    symbolismTr: 'Bir kadın umut ve ilahi rehberliği temsil eden yıldızlar altında su döker',
    imageUrl: 'https://gfx.tarot.com/images/site/decks/universal-waite/full_size/17.jpg'
  },
  {
    id: 'major_18',
    name: 'The Moon',
    nameTr: 'Ay',
    suit: 'Major Arcana',
    arcana: 'major',
    keywords: ['illusion', 'fear', 'anxiety', 'subconscious', 'intuition'],
    keywordsTr: ['yanılsama', 'korku', 'kaygı', 'bilinçaltı', 'sezgi'],
    upright: 'Illusion, fear, anxiety, subconscious, intuition, dreams',
    uprightTr: 'Yanılsama, korku, kaygı, bilinçaltı, sezgi, rüyalar',
    reversed: 'Release of fear, repressed emotion, inner confusion',
    reversedTr: 'Korkudan kurtulma, bastırılmış duygu, iç karışıklık',
    symbolism: 'The moon illuminates a mysterious path representing the subconscious realm',
    symbolismTr: 'Ay bilinçaltı alemini temsil eden gizemli bir yolu aydınlatır',
    imageUrl: 'https://gfx.tarot.com/images/site/decks/universal-waite/full_size/18.jpg'
  },
  {
    id: 'major_19',
    name: 'The Sun',
    nameTr: 'Güneş',
    suit: 'Major Arcana',
    arcana: 'major',
    keywords: ['positivity', 'fun', 'warmth', 'success', 'vitality'],
    keywordsTr: ['pozitiflik', 'eğlence', 'sıcaklık', 'başarı', 'canlılık'],
    upright: 'Positivity, fun, warmth, success, vitality, joy',
    uprightTr: 'Pozitiflik, eğlence, sıcaklık, başarı, canlılık, neşe',
    reversed: 'Inner child, feeling down, overly optimistic',
    reversedTr: 'İç çocuk, moralinin bozuk olması, aşırı iyimser',
    symbolism: 'The sun shines brightly representing joy, success, and vitality',
    symbolismTr: 'Güneş neşe, başarı ve canlılığı temsil ederek parlak bir şekilde parlar',
    imageUrl: 'https://gfx.tarot.com/images/site/decks/universal-waite/full_size/19.jpg'
  },
  {
    id: 'major_20',
    name: 'Judgement',
    nameTr: 'Mahkeme',
    suit: 'Major Arcana',
    arcana: 'major',
    keywords: ['judgement', 'rebirth', 'inner calling', 'absolution'],
    keywordsTr: ['hüküm', 'yeniden doğuş', 'içsel çağrı', 'bağışlanma'],
    upright: 'Judgement, rebirth, inner calling, absolution, awakening',
    uprightTr: 'Hüküm, yeniden doğuş, içsel çağrı, bağışlanma, uyanış',
    reversed: 'Self-doubt, inner critic, ignoring the call',
    reversedTr: 'Kendinden şüphe, iç eleştirmen, çağrıyı görmezden gelme',
    symbolism: 'An angel calls souls to judgement representing spiritual awakening',
    symbolismTr: 'Bir melek ruhsal uyanışı temsil eden hükme ruhları çağırır',
    imageUrl: 'https://gfx.tarot.com/images/site/decks/universal-waite/full_size/20.jpg'
  },
  {
    id: 'major_21',
    name: 'The World',
    nameTr: 'Dünya',
    suit: 'Major Arcana',
    arcana: 'major',
    keywords: ['completion', 'accomplishment', 'travel', 'fulfillment'],
    keywordsTr: ['tamamlanma', 'başarı', 'seyahat', 'tatmin'],
    upright: 'Completion, accomplishment, travel, fulfillment, sense of belonging',
    uprightTr: 'Tamamlanma, başarı, seyahat, tatmin, aidiyet duygusu',
    reversed: 'Seeking personal closure, short-cuts, delays',
    reversedTr: 'Kişisel kapanış arayışı, kestirme yollar, gecikmeler',
    symbolism: 'A dancing figure within a wreath represents completion of a cycle',
    symbolismTr: 'Bir çelenk içinde dans eden figür bir döngünün tamamlanmasını temsil eder',
    imageUrl: 'https://gfx.tarot.com/images/site/decks/universal-waite/full_size/21.jpg'
  }
];

const suits = ['wands', 'cups', 'swords', 'pentacles'];
const suitsTr = ['Değnekler', 'Kupalar', 'Kılıçlar', 'Tılsımlar'];
const ranks = ['ace', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'page', 'knight', 'queen', 'king'];
const ranksTr = ['As', 'İki', 'Üç', 'Dört', 'Beş', 'Altı', 'Yedi', 'Sekiz', 'Dokuz', 'On', 'Şövalye Çırağı', 'Şövalye', 'Kraliçe', 'Kral'];
const ranksCapitalized = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Page', 'Knight', 'Queen', 'King'];

const minorArcana: TarotCard[] = [];
let cardIndex = 22;

for (let suitIndex = 0; suitIndex < suits.length; suitIndex++) {
  const suit = suits[suitIndex];
  const suitTr = suitsTr[suitIndex];

  for (let rankIndex = 0; rankIndex < ranks.length; rankIndex++) {
    const rank = ranks[rankIndex];
    const rankCap = ranksCapitalized[rankIndex];
    const rankTrText = ranksTr[rankIndex];

    minorArcana.push({
      id: `minor_${suit}_${rank}`,
      name: `${rankCap} of ${suit.charAt(0).toUpperCase() + suit.slice(1)}`,
      nameTr: `${suitTr} ${rankTrText}`,
      suit: `${suit.charAt(0).toUpperCase() + suit.slice(1)}`,
      arcana: 'minor',
      keywords: ['energy', 'action', 'movement', 'growth'],
      keywordsTr: ['enerji', 'eylem', 'hareket', 'büyüme'],
      upright: 'Positive energy and forward movement in this suit',
      uprightTr: 'Bu takımda pozitif enerji ve ilerleme',
      reversed: 'Blockages or challenges in this area',
      reversedTr: 'Bu alanda blokajlar veya zorluklar',
      symbolism: 'Represents the energy and qualities of this suit and rank',
      symbolismTr: 'Bu takımın ve derecenin enerjisini ve niteliklerini temsil eder',
      imageUrl: `https://gfx.tarot.com/images/site/decks/universal-waite/full_size/${cardIndex}.jpg`
    });

    cardIndex++;
  }
}

export const tarotDeck: TarotCard[] = [...majorArcana, ...minorArcana];
