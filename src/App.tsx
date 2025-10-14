import { useState, useEffect } from 'react';
import { ReadingType, SelectedCard } from './types/reading';
import { ReadingTypePage } from './pages/ReadingTypePage';
import { QuestionPage } from './pages/QuestionPage';
import { CardSelectionPage } from './pages/CardSelectionPage';
import { ReadingResultPage } from './pages/ReadingResultPage';
import { generateDetailedReading } from './services/geminiService';
import { validateAndUseLink } from './services/linkService';
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
  const [linkUsed, setLinkUsed] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const linkToken = urlParams.get('link');

    if (linkToken && !linkUsed) {
      validateAndUseLink(linkToken).then(result => {
        if (result.valid && result.readingType) {
          setReadingType(result.readingType);
          setAppState('question');
          setLinkUsed(true);
          window.history.replaceState({}, '', window.location.pathname);
        } else {
          alert('This link is invalid or has already been used.');
        }
      });
    }
  }, [linkUsed]);

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

  const handleReset = () => {
    setAppState('type-selection');
    setReadingType(null);
    setQuestion('');
    setSelectedCards([]);
    setReading('');
    setDownloadUrl(undefined);
    setError('');
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
          downloadUrl={downloadUrl}
          onReset={handleReset}
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
