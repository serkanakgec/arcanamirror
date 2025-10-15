import { useState, useEffect } from 'react';
import { ReadingType, SelectedCard } from './types/reading';
import { ReadingTypePage } from './pages/ReadingTypePage';
import { QuestionPage } from './pages/QuestionPage';
import { CardSelectionPage } from './pages/CardSelectionPage';
import { ReadingResultPage } from './pages/ReadingResultPage';
import { UserInfoPage, UserInfo } from './pages/UserInfoPage';
import { generateDetailedReading } from './services/geminiService';
import { markLinkAsUsed, createConsultationUser, saveConsultation } from './services/linkService';
import { tarotDeck } from './data/tarotDeck';
import { Language } from './i18n/translations';
import { ShieldAlert, CheckCircle } from 'lucide-react';

type AppState = 'type-selection' | 'user-info' | 'question' | 'card-selection' | 'result' | 'consultation-success' | 'invalid-link';

function App() {
  const [appState, setAppState] = useState<AppState>('type-selection');
  const [readingType, setReadingType] = useState<ReadingType | null>(null);
  const [selectedCards, setSelectedCards] = useState<SelectedCard[]>([]);
  const [question, setQuestion] = useState('');
  const [reading, setReading] = useState('');
  const [error, setError] = useState('');
  const [language, setLanguage] = useState<Language>('en');
  const [linkId, setLinkId] = useState<string | null>(null);
  const [userType, setUserType] = useState<'normal' | 'consultation'>('normal');
  const [referenceCode, setReferenceCode] = useState<string | null>(null);
  const [consultationUserId, setConsultationUserId] = useState<string | null>(null);

  useEffect(() => {
    // ... useEffect içindeki kod doğru ve değişmesine gerek yok ...
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const handleSelectType = (type: ReadingType, validatedLinkId: string, linkUserType?: 'normal' | 'consultation', linkReferenceCode?: string) => {
    setReadingType(type);
    setLinkId(validatedLinkId);
    setUserType(linkUserType || 'normal');
    setReferenceCode(linkReferenceCode || null);

    if (linkUserType === 'consultation') {
      setAppState('user-info');
    } else {
      setAppState('question');
    }
  };

  const handleUserInfoSubmit = async (userInfo: UserInfo) => {
    if (!referenceCode) return;

    const result = await createConsultationUser({
      ...userInfo,
      referenceCode
    });

    if (result.success && result.userId) {
      setConsultationUserId(result.userId);
      setAppState('question');
    } else {
      setError(result.error || 'Failed to create user');
    }
  };

  const handleQuestionSubmit = (q: string) => {
    setQuestion(q);
    setAppState('card-selection');
  };

  const handleCardsSelected = async (cards: SelectedCard[]) => {
    setSelectedCards(cards);
    setReading('');
    setError('');

    if (!readingType) return;

    if (linkId) {
      try {
        await markLinkAsUsed(linkId, false);
      } catch (error) {
        console.error('Failed to mark link as used:', error);
      }
    }

    const result = await generateDetailedReading(readingType, cards, tarotDeck, question, language);

    if (result.error) {
      setError(result.error);
      setAppState('result');
      return;
    }

    setReading(result.reading);

    if (userType === 'consultation' && consultationUserId && referenceCode) {
      const saved = await saveConsultation({
        userId: consultationUserId,
        referenceCode,
        readingType,
        question,
        selectedCards: cards,
        readingResult: result.reading
      });

      if (saved) {
        setAppState('consultation-success');
      } else {
        setError('Failed to save consultation');
        setAppState('result');
      }
    } else {
      setAppState('result');
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

  if (appState === 'consultation-success') {
    return (
      <div className="min-h-screen starfield flex items-center justify-center text-center">
        <div className="bg-slate-900/80 backdrop-blur-sm border-2 border-green-500/30 rounded-lg p-8 max-w-md mx-4">
          <CheckCircle className="text-green-400 w-16 h-16 mx-auto mb-4" />
          <h1 className="text-3xl font-decorative text-green-400 mb-2">Consultation Submitted</h1>
          <p className="text-slate-300 mb-4">
            Your reading has been submitted successfully. Our team will review it and contact you via email.
          </p>
          <p className="text-slate-400 text-sm">
            Thank you for using Sylvica.
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

      {appState === 'user-info' && (
        <UserInfoPage
          onSubmit={handleUserInfoSubmit}
          language={language}
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