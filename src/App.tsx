import { useState } from 'react';
import { ReadingType, SelectedCard } from './types/reading';
import { ReadingTypePage } from './pages/ReadingTypePage';
import { CardSelectionPage } from './pages/CardSelectionPage';
import { ReadingResultPage } from './pages/ReadingResultPage';
import { generateDetailedReading } from './services/geminiService';
import { tarotDeck } from './data/tarotDeck';

type AppState = 'type-selection' | 'card-selection' | 'result';

function App() {
  const [appState, setAppState] = useState<AppState>('type-selection');
  const [readingType, setReadingType] = useState<ReadingType | null>(null);
  const [selectedCards, setSelectedCards] = useState<SelectedCard[]>([]);
  const [reading, setReading] = useState('');
  const [downloadUrl, setDownloadUrl] = useState<string>();
  const [error, setError] = useState('');

  const handleSelectType = (type: ReadingType) => {
    setReadingType(type);
    setAppState('card-selection');
  };

  const handleCardsSelected = async (cards: SelectedCard[]) => {
    setSelectedCards(cards);
    setAppState('result');
    setReading('');
    setError('');

    if (!readingType) return;

    const result = await generateDetailedReading(readingType, cards, tarotDeck);

    if (result.error) {
      setError(result.error);
    } else {
      setReading(result.reading);
    }
  };

  const handleReset = () => {
    setAppState('type-selection');
    setReadingType(null);
    setSelectedCards([]);
    setReading('');
    setDownloadUrl(undefined);
    setError('');
  };

  const handleBackToSelection = () => {
    setAppState('card-selection');
    setSelectedCards([]);
    setReading('');
    setError('');
  };

  const handleBackToTypes = () => {
    setAppState('type-selection');
    setReadingType(null);
    setSelectedCards([]);
  };

  return (
    <>
      {appState === 'type-selection' && (
        <ReadingTypePage onSelectType={handleSelectType} />
      )}

      {appState === 'card-selection' && readingType && (
        <CardSelectionPage
          readingType={readingType}
          onBack={handleBackToTypes}
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
          onBack={handleBackToSelection}
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
