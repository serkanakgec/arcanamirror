import { useState, useEffect } from 'react';
import { ReadingType, SelectedCard } from './types/reading';
import { ReadingTypePage } from './pages/ReadingTypePage';
import { QuestionPage } from './pages/QuestionPage';
import { CardSelectionPage } from './pages/CardSelectionPage';
import { ReadingResultPage } from './pages/ReadingResultPage';
import { generateDetailedReading } from './services/geminiService';
import { validateLink, markLinkAsUsed } from './services/linkService';
import { tarotDeck } from './data/tarotDeck';
import { Language } from './i18n/translations';
import { ShieldAlert } from 'lucide-react';

type AppState = 'type-selection' | 'question' | 'card-selection' | 'result' | 'invalid-link';

function App() {
  const [appState, setAppState] = useState<AppState>('type-selection');
  const [readingType, setReadingType] = useState<ReadingType | null>(null);
  const [selectedCards, setSelectedCards] = useState<SelectedCard[]>([]);
  const [question, setQuestion] = useState('');
  const [reading, setReading] = useState('');
  const [error, setError] = useState('');
  const [language, setLanguage] = useState<Language>('en');
  const [linkId, setLinkId] = useState<string | null>(null); // Bu state'in varlığını kontrol edin

  useEffect(() => {
    // ... useEffect içindeki kod doğru ve değişmesine gerek yok ...
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const handleSelectType = (type: ReadingType, validatedLinkId: string) => {
    setReadingType(type);
    setLinkId(validatedLinkId); // linkId'yi state'e kaydediyoruz
    setAppState('question');
  };

  const handleQuestionSubmit = (q: string) => {
    setQuestion(q);
    setAppState('card-selection');
  };

  const handleCardsSelected = async (cards: SelectedCard[]) => {
    setSelectedCards(cards);
    setAppState('result');
    setReading('');
    setError('');

    if (!readingType) return;

    const result = await generateDetailedReading(readingType, cards, tarotDeck, question, language);

    if (result.error) {
      setError(result.error);
    } else {
      setReading(result.reading);
    }
  };

  if (appState === 'invalid-link') {
    return (
      <div className="min-h-screen starfield flex items-center justify-center text-center">
        <div className="bg-slate-900/80 backdrop-blur-sm border-2 border-red-500/30 rounded-lg p-8 max-w-md mx-4">
          <ShieldAlert className="text-red-400 w-16 h-16 mx-auto mb-4" />
          <h1 className="text-3xl font-decorative text-red-400 mb-2">Geçersiz Bağlantı</h1>
          <p className="text-slate-300">
            Bu bağlantı geçersiz, süresi dolmuş veya daha önce kullanılmış.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {appState === 'type-selection' && (
        <ReadingTypePage
          onSelectType={handleSelectType}
          language={language}
          onLanguageChange={handleLanguageChange}
        />
      )}

      {/* --- BURADAN İTİBAREN DÜZELTİLDİ --- */}

      {appState === 'question' && readingType && (
        <QuestionPage
          readingType={readingType}
          onContinue={handleQuestionSubmit}
          language={language} 
        />
      )}

      {appState === 'card-selection' && readingType && (
        <CardSelectionPage
          readingType={readingType}
          onComplete={handleCardsSelected}
          linkId={linkId} 
          language={language} 
          onLanguageChange={handleLanguageChange}
        />
      )}

      {appState === 'result' && readingType && (
        <ReadingResultPage
          readingType={readingType}
          selectedCards={selectedCards}
          reading={reading}
          question={question}
          language={language} 
          onLanguageChange={handleLanguageChange}
        />
      )}
      
      {/* --- DÜZELTME SONU --- */}

      {error && appState === 'result' && (
        <div className="fixed bottom-4 right-4 bg-red-900/90 border border-red-500/50 rounded-lg p-4 text-red-200 max-w-md shadow-lg">
          {error}
        </div>
      )}
    </>
  );
}

export default App;