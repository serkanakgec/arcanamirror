import { useState, useEffect } from 'react';
import { ReadingType, SelectedCard } from './types/reading';
import { ReadingTypePage } from './pages/ReadingTypePage';
import { QuestionPage } from './pages/QuestionPage';
import { CardSelectionPage } from './pages/CardSelectionPage';
import { ReadingResultPage } from './pages/ReadingResultPage';
import { generateDetailedReading } from './services/geminiService';
import { validateLink, markLinkAsUsed } from './services/linkService';
import { tarotDeck } from './data/tarotDeck';

type AppState = 'type-selection' | 'question' | 'card-selection' | 'result';

function App() {
  const [appState, setAppState] = useState<AppState>('type-selection');
  const [readingType, setReadingType] = useState<ReadingType | null>(null);
  const [selectedCards, setSelectedCards] = useState<SelectedCard[]>([]);
  const [question, setQuestion] = useState('');
  const [reading, setReading] = useState('');
  const [downloadUrl, setDownloadUrl] = useState<string>();
  const [error, setError] = useState('');
  const [isLinkSession, setIsLinkSession] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const linkToken = urlParams.get('link');

    if (linkToken) {
      validateLink(linkToken).then(async result => {
        if (result.valid && result.readingType && result.linkId) {
          await markLinkAsUsed(result.linkId);

          setReadingType(result.readingType);
          setIsLinkSession(true);
          setAppState('question');
          window.history.replaceState({}, '', window.location.pathname);
        } else {
          alert('This link is invalid, expired, or has already been used.');
          window.location.href = '/';
        }
      });
    }
  }, []);

  const handleSelectType = (type: ReadingType) => {
    setReadingType(type);
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

    const result = await generateDetailedReading(readingType, cards, tarotDeck, question);

    if (result.error) {
      setError(result.error);
    } else {
      setReading(result.reading);
    }
  };

  return (
    <>
      {appState === 'type-selection' && (
        <ReadingTypePage onSelectType={handleSelectType} />
      )}

      {appState === 'question' && readingType && (
        <QuestionPage
          readingType={readingType}
          onContinue={handleQuestionSubmit}
        />
      )}

      {appState === 'card-selection' && readingType && (
        <CardSelectionPage
          readingType={readingType}
          onComplete={handleCardsSelected}
        />
      )}

      {appState === 'result' && readingType && (
        <ReadingResultPage
          readingType={readingType}
          selectedCards={selectedCards}
          reading={reading}
          question={question}
          downloadUrl={downloadUrl}
        />
      )}

      {error && appState === 'result' && (
        <div className="fixed bottom-4 right-4 bg-red-900/90 border border-red-500/50 rounded-lg p-4 text-red-200 max-w-md shadow-lg">
          {error}
        </div>
      )}
    </>
  );
}

export default App;
