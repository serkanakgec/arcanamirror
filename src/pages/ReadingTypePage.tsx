import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { readingTypes, ReadingType } from '../types/reading';
import { Language, getTranslation } from '../i18n/translations';
import { LanguageSelector } from '../components/LanguageSelector';
import { ReferenceModal } from '../components/ReferenceModal';

interface ReadingTypePageProps {
  onSelectType: (type: ReadingType, linkId: string, userType?: 'normal' | 'consultation', referenceCode?: string) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export function ReadingTypePage({ onSelectType, language, onLanguageChange }: ReadingTypePageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<ReadingType | null>(null);

  const t = (key: Parameters<typeof getTranslation>[1]) => getTranslation(language, key);

  const classicTypes = readingTypes.filter(t => t.category === 'classic');
  const thematicTypes = readingTypes.filter(t => t.category === 'thematic');

  const handleCardClick = (typeId: ReadingType) => {
    setSelectedType(typeId);
    setIsModalOpen(true);
  };

  const handleModalSuccess = (linkId: string, userType?: 'normal' | 'consultation', referenceCode?: string) => {
    setIsModalOpen(false);
    if (selectedType) {
      onSelectType(selectedType, linkId, userType, referenceCode);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedType(null);
  };

  const renderCard = (type: any) => (
    <button
      key={type.id}
      onClick={() => handleCardClick(type.id)}
      className="w-full bg-gradient-to-br from-slate-900/80 via-purple-900/20 to-slate-900/80 backdrop-blur-sm border-2 border-amber-500/30 rounded-lg p-6 glow-border hover:border-amber-500/60 transition-all transform hover:scale-105 text-left group"
    >
      <div className="flex items-start gap-4 mb-3">
        <span className="text-4xl">{type.icon}</span>
        <div className="flex-1">
          <h3 className="text-xl font-serif text-amber-400 mb-1 group-hover:glow-text transition-all">
            {type.name}
          </h3>
        </div>
      </div>
      <p className="text-slate-300 text-sm mb-3">{type.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-amber-400/70 text-xs">
          {type.cardCount} {type.cardCount === 1 ? t('card') : t('cards')}
        </span>
        <span className="text-amber-400 text-sm group-hover:translate-x-1 transition-transform">
          →
        </span>
      </div>
    </button>
  );

  return (
    <div className="min-h-screen starfield">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="absolute top-4 right-4 z-50">
          <LanguageSelector currentLanguage={language} onLanguageChange={onLanguageChange} />
        </div>

        <header className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="text-amber-400 w-8 h-8" />
            <h1 className="text-5xl md:text-6xl font-decorative text-amber-400 glow-text">
              {t('appName')}
            </h1>
            <Sparkles className="text-amber-400 w-8 h-8" />
          </div>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto">
            {t('appTagline')}
          </p>
        </header>

        <div className="max-w-6xl mx-auto space-y-12">
          <div>
            <h2 className="text-3xl font-decorative text-amber-400 text-center mb-8">
              {t('classicSpreads')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {classicTypes.map(renderCard)}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-decorative text-amber-400 text-center mb-8">
              {t('thematicReadings')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {thematicTypes.map(renderCard)}
            </div>
          </div>
        </div>

        <footer className="text-center mt-16 text-slate-400 text-sm">
          <p>{t('trustDestiny')}</p>
        </footer>
      </div>

      {selectedType && (
        <ReferenceModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSuccess={handleModalSuccess}
          selectedReadingType={selectedType}
          language={language}
        />
      )}
    </div>
  );
}
