import { TarotCard } from '../data/tarotDeck';
import { SelectedCard, ReadingType } from '../types/reading';

export interface ReadingResponse {
  reading: string;
  error?: string;
}

export async function generateDetailedReading(
  readingType: ReadingType,
  selectedCards: SelectedCard[],
  deck: TarotCard[],
  question: string
): Promise<ReadingResponse> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    return {
      reading: '',
      error: 'Gemini API key is not configured. Please add your API key to the .env file as VITE_GEMINI_API_KEY'
    };
  }

  try {
    const cardsInfo = selectedCards.map(sc => {
      const card = deck.find(c => c.id === sc.cardId);
      if (!card) return null;

      return `${sc.position}. ${card.name} - ${sc.orientation === 'upright' ? 'Upright' : 'Reversed'}
   Keywords: ${sc.orientation === 'upright' ? card.keywords.join(', ') : 'reversed meaning'}
   Symbolism: ${card.symbolism}
   Meaning: ${sc.orientation === 'upright' ? card.upright : card.reversed}`;
    }).filter(Boolean).join('\n\n');

    const prompt = `The user has asked the following question: "${question}"

For this "${readingType}" reading, they selected these cards (in order):

${cardsInfo}

Please provide a detailed, compassionate tarot reading in English with the following format:

1. BRIEF SUMMARY (2-4 sentences)
   Directly address their question and summarize the general message of the selected cards.

2. CARD-BY-CARD ANALYSIS
   For each card:
   - Card name and orientation
   - Key themes (3-5 keywords)
   - Symbolism and meaning (2-4 sentences)
   - Specific relevance to their question

3. THE CARDS' STORY
   Explain how the cards connect to tell a cohesive story (4-6 sentences). Show how they relate to each other and the journey they reveal regarding the user's question.

4. PSYCHOLOGICAL INSIGHT
   What this reading reveals about their inner world (4-6 sentences). Discuss possible internal blocks, opportunities, and growth areas directly relevant to their question.

5. PRACTICAL RECOMMENDATIONS
   3 actionable steps they can take:
   - Action 1: [Brief description]
   - Action 2: [Brief description]
   - Action 3: [Brief description]

6. REFLECTION QUESTIONS
   3 open-ended questions for contemplation:
   - Question 1?
   - Question 2?
   - Question 3?

7. CLOSING
   A supportive summary and empowering message (2-3 sentences) that brings hope and strength.

Language: English, warm, accessible, mystical yet grounded
Length: 400-600 words total
Tone: Empathetic, wise, guiding, supportive, and directly addressing their specific question`;

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
