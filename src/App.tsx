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
  const [linkId, setLinkId] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang) {
      setLanguage(savedLang);
    }
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const linkToken = urlParams.get('link') || urlParams.get('r');

    if (linkToken) {
      validateLink(linkToken).then(async result => {
        if (result.valid && result.readingType && result.linkId) {
          setReadingType(result.readingType);
          setIsLinkSession(true);
          setLinkId(result.linkId);
          setAppState('question');
          window.history.replaceState({}, '', window.location.pathname);
        } else {
          const errorMsg = language === 'tr'
            ? 'Bu referans numarası geçersiz veya zaten kullanılmış.'
            : 'This reference number is invalid or has already been used.';
          alert(errorMsg);
          window.location.href = '/';
        }
      });
    }
  }, [language]);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const handleSelectType = (type: ReadingType, validatedLinkId: string) => {
    setReadingType(type);
    setLinkId(validatedLinkId);
    setIsLinkSession(true);
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

  return (
    <>
      {appState === 'type-selection' && (
        <ReadingTypePage
          onSelectType={handleSelectType}
          language={language}
          onLanguageChange={handleLanguageChange}
        />
      )}

      {appState === 'question' && readingType && (
        <QuestionPage
          readingType={readingType}
          onContinue={handleQuestionSubmit}
          language={language}
          onLanguageChange={handleLanguageChange}
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
          downloadUrl={downloadUrl}
          language={language}
          onLanguageChange={handleLanguageChange}
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
