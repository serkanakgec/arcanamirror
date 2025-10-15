import { useState } from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { ReadingType, readingTypes } from '../types/reading';
import { Language, getTranslation } from '../i18n/translations';

interface QuestionPageProps {
  readingType: ReadingType;
  onContinue: (question: string) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export function QuestionPage({ readingType, onContinue, language }: QuestionPageProps) {
  const [question, setQuestion] = useState('');
  const [error, setError] = useState('');

  const config = readingTypes.find(t => t.id === readingType)!;

  const t = (key: Parameters<typeof getTranslation>[1]) => getTranslation(language, key);

  const handleContinue = () => {
    if (!question.trim()) {
      setError(t('pleaseEnterQuestion'));
      return;
    }
    onContinue(question.trim());
  };

  return (
    <div className="min-h-screen starfield">
      <div className="container mx-auto px-4 py-8 md:py-12">

        <div className="max-w-2xl mx-auto animate-fade-in">
          <header className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-5xl">{config.icon}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-decorative text-amber-400 glow-text mb-2">
              {config.name}
            </h1>
            <p className="text-slate-300 text-lg">{config.description}</p>
          </header>

          <div className="bg-gradient-to-br from-slate-900/80 via-purple-900/20 to-slate-900/80 backdrop-blur-sm border-2 border-amber-500/30 rounded-lg p-8 glow-border">
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="question"
                  className="block text-amber-400 font-serif text-xl mb-3"
                >
                  {t('whatGuidance')}
                </label>
                <p className="text-slate-400 text-sm mb-4">
                  {t('askQuestion')}
                </p>
                <textarea
                  id="question"
                  value={question}
                  onChange={(e) => {
                    setQuestion(e.target.value);
                    setError('');
                  }}
                  placeholder={t('enterQuestion')}
                  className="w-full px-4 py-3 bg-slate-900/50 border-2 border-amber-500/30 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/60 transition-colors resize-none"
                  rows={5}
                />
              </div>

              {error && (
                <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4 text-red-200">
                  {error}
                </div>
              )}

              <button
                onClick={handleContinue}
                className="w-full bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900 hover:from-purple-800 hover:via-blue-800 hover:to-purple-800 text-amber-400 font-serif text-xl py-4 rounded-lg border-2 border-amber-500/50 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Sparkles size={24} />
                {t('continueToCards')}
              </button>

              <div className="text-center text-slate-400 text-sm">
                {t('youWillSelect')} {config.cardCount} {config.cardCount === 1 ? t('card') : t('cards')} {t('forThisReading')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
