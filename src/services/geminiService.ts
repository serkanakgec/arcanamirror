import { TarotCard } from '../data/tarotDeck';

export interface ReadingResponse {
  reading: string;
  error?: string;
}

export async function generateReading(
  question: string,
  cards: TarotCard[]
): Promise<ReadingResponse> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    return {
      reading: '',
      error: 'Gemini API key not configured. Please add your API key to the .env file.'
    };
  }

  try {
    const prompt = `You are a wise and empathetic tarot reader. A seeker has drawn three cards for a Past-Present-Future spread and asked: "${question}"

The cards drawn are:

1. PAST - ${cards[0].name} (${cards[0].suit})
   Upright meaning: ${cards[0].upright}
   Symbolism: ${cards[0].symbolism}

2. PRESENT - ${cards[1].name} (${cards[1].suit})
   Upright meaning: ${cards[1].upright}
   Symbolism: ${cards[1].symbolism}

3. FUTURE - ${cards[2].name} (${cards[2].suit})
   Upright meaning: ${cards[2].upright}
   Symbolism: ${cards[2].symbolism}

Please provide a detailed, compassionate, and insightful reading that:
- Connects the three cards to tell a cohesive story
- Addresses their specific question
- Offers guidance and empowerment
- Uses mystical but accessible language
- Is approximately 200-300 words
- Feels personal and meaningful

Begin with a brief acknowledgment of their question, then weave the cards together into a narrative that flows from past through present to future.`;

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
            temperature: 0.9,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to generate reading');
    }

    const data = await response.json();
    const reading = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reading) {
      throw new Error('No reading generated');
    }

    return { reading };
  } catch (error) {
    console.error('Gemini API error:', error);
    return {
      reading: '',
      error: error instanceof Error ? error.message : 'Failed to generate reading. Please try again.',
    };
  }
}
