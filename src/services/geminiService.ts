import { TarotCard } from '../data/tarotDeck';
import { SelectedCard, ReadingType } from '../types/reading';

export interface ReadingResponse {
  reading: string;
  error?: string;
}

export async function generateDetailedReading(
  readingType: ReadingType,
  selectedCards: SelectedCard[],
  deck: TarotCard[]
): Promise<ReadingResponse> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    return {
      reading: '',
      error: 'Gemini API anahtarı yapılandırılmamış. Lütfen .env dosyasına API anahtarınızı ekleyin.'
    };
  }

  try {
    const cardsInfo = selectedCards.map(sc => {
      const card = deck.find(c => c.id === sc.cardId);
      if (!card) return null;

      return `${sc.position}. ${card.nameTr} (${card.name}) - ${sc.orientation === 'upright' ? 'Düz' : 'Ters'}
   Anahtar Kelimeler: ${sc.orientation === 'upright' ? card.keywordsTr.join(', ') : 'ters anlam'}
   Sembolizm: ${card.symbolismTr}
   Anlam: ${sc.orientation === 'upright' ? card.uprightTr : card.reversedTr}`;
    }).filter(Boolean).join('\n\n');

    const prompt = `Kullanıcı "${readingType}" fal türü için şu kartları seçti (sıralı):

${cardsInfo}

Lütfen aşağıdaki formatta, Türkçe, nazik ve yol gösterici bir dille detaylı bir tarot okuması üret:

1. KISA ÖZET (2-4 cümle)
   Seçilen kartların genel mesajını özetle.

2. KART BAZLI AÇIKLAMALAR
   Her kart için:
   - Kart adı ve yönelimi
   - Anahtar kelimeler (3-5 kelime)
   - Sembolizm ve kısa anlam (2-4 cümle)
   - Pozisyondaki özel anlamı

3. KARTLAR ARASINDAKİ HİKÂYE
   Seçilen kartların birbirleriyle ilişkisini anlatan 4-6 cümle. Kartların nasıl bir araya geldiğini ve ne tür bir yolculuk anlattığını açıkla.

4. PSİKOLOJİK BAKIŞ
   Bu okumanın kullanıcıya içsel olarak ne söyleyebileceği (4-6 cümle). Olası içsel engeller, fırsatlar ve büyüme alanları.

5. SOMUT ÖNERİLER
   3 pratik, uygulanabilir adım:
   - Öneri 1: [Kısa açıklama]
   - Öneri 2: [Kısa açıklama]
   - Öneri 3: [Kısa açıklama]

6. YANSITMA SORULARI
   Kullanıcının düşünmesini sağlayacak 3 açık uçlu soru:
   - Soru 1?
   - Soru 2?
   - Soru 3?

7. KAPANIŞ
   Nazik bir özet ve destekleyici cümle (2-3 cümle). Kullanıcıya umut ve güç veren bir mesaj.

Dil: Türkçe, samimi, anlaşılır, mistik ama erişilebilir
Uzunluk: Toplam 400-600 kelime
Ton: Empatik, bilge, yol gösterici, destekleyici`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.8,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Yorum oluşturulamadı');
    }

    const data = await response.json();
    const reading = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reading) {
      throw new Error('Yorum oluşturulamadı');
    }

    return { reading };
  } catch (error) {
    console.error('Gemini API hatası:', error);
    return {
      reading: '',
      error: error instanceof Error ? error.message : 'Yorum oluşturulamadı. Lütfen tekrar deneyin.',
    };
  }
}
