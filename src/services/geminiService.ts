import { TarotCard } from '../data/tarotDeck';
import { SelectedCard, ReadingType, readingTypes } from '../types/reading';

export interface ReadingResponse {
  reading: string;
  error?: string;
}

const getReadingTypeContext = (readingType: ReadingType): string => {
  const contexts: Record<ReadingType, string> = {
    'daily': 'This is a Daily Tarot reading to provide guidance for the day ahead. Focus on immediate influences and what the querent should be aware of today.',
    '3-card': 'This is a Past-Present-Future spread. Analyze how past events influence the present situation and what the future may hold.',
    'celtic-cross': 'This is a comprehensive Celtic Cross spread. Provide deep insight into the situation, covering all aspects from challenges to outcomes.',
    'relationship': 'This is a Relationship & Love reading. Focus on romantic connections, partnerships, emotional bonds, and relationship dynamics.',
    'career': 'This is a Career & Money reading. Focus on professional life, financial matters, work opportunities, and material success.',
    'soulmate': 'This is a Soulmate reading. Focus on divine partnerships, soul connections, destined relationships, and spiritual love.',
    'year': 'This is a Year Ahead reading with 12 cards for each month. Provide guidance for the entire year, highlighting key periods and themes.',
    'divination': 'This is a Divination Tarot reading focused on predicting future outcomes. Emphasize possible future events, timing, and probabilities.',
    'psychological': 'This is a Psychological Tarot reading. Focus on the subconscious mind, emotional patterns, inner conflicts, and psychological growth.',
    'spiritual': 'This is a Spiritual Guidance reading. Focus on the soul\'s journey, higher purpose, spiritual lessons, and connection to the divine.',
    'meditation': 'This is a Meditation Tarot reading. Focus on inner awareness, energy balance, chakras, and present-moment consciousness.',
    'decision': 'This is a Decision Making reading. Help the querent weigh two options clearly, showing pros and cons of each path.'
  };
  return contexts[readingType] || '';
};

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

    const readingConfig = readingTypes.find(t => t.id === readingType);
    const readingContext = getReadingTypeContext(readingType);

    const prompt = `${readingContext}

The user has asked the following question: "${question}"

Reading Type: ${readingConfig?.name || readingType}

For this reading, they selected these cards (in order):

${cardsInfo}

Please provide a detailed, compassionate tarot reading in English specifically tailored to this ${readingConfig?.name || readingType} reading type, with the following format:

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
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent`,
      {
        method: 'POST',
        headers: {
          'x-goog-api-key': apiKey,
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
