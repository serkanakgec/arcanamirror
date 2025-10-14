import { useState } from 'react';
import { ArrowLeft, Download, Loader2, RefreshCw } from 'lucide-react';
import { SelectedCard, ReadingType, readingTypes } from '../types/reading';
import { tarotDeck } from '../data/tarotDeck';
import { CardModal } from '../components/CardModal';
import { TypewriterText } from '../components/TypewriterText';

interface ReadingResultPageProps {
  readingType: ReadingType;
  selectedCards: SelectedCard[];
  reading: string;
  downloadUrl?: string;
  onReset: () => void;
}

export function ReadingResultPage({
  readingType,
  selectedCards,
  reading,
  downloadUrl,
  onReset
}: ReadingResultPageProps) {
  const [selectedCardForModal, setSelectedCardForModal] = useState<string | null>(null);

  const config = readingTypes.find(t => t.id === readingType)!;

  const getCardData = (cardId: string) => {
    return tarotDeck.find(c => c.id === cardId);
  };

  const selectedCardData = selectedCardForModal
    ? getCardData(selectedCardForModal)
    : null;

  return (
    <div className="min-h-screen starfield">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-end">
          <button
            onClick={onReset}
            className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors"
          >
            <RefreshCw size={20} />
            <span>New Reading</span>
          </button>
        </div>

        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-decorative text-amber-400 glow-text mb-2">
            {config.name}
          </h1>
          <p className="text-slate-300">Your reading is ready</p>
        </header>

        <div className="max-w-6xl mx-auto space-y-12">
          <div>
            <h2 className="text-2xl font-decorative text-amber-400 text-center mb-6">
              Selected Cards
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center">
              {selectedCards.map((sc) => {
                const card = getCardData(sc.cardId);
                if (!card) return null;

                return (
                  <button
                    key={sc.cardId}
                    onClick={() => setSelectedCardForModal(sc.cardId)}
                    className="group relative"
                  >
                    <div className="relative">
                      <img
                        src={card.imageUrl}
                        alt={card.name}
                        className={`w-32 h-48 object-cover rounded-lg border-2 border-amber-500/50 shadow-lg group-hover:border-amber-500 transition-all group-hover:scale-105 ${
                          sc.orientation === 'reversed' ? 'rotate-180' : ''
                        }`}
                      />
                      <div className="absolute -top-2 -left-2 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center text-slate-900 font-bold text-sm shadow-lg">
                        {sc.position}
                      </div>
                    </div>
                    <p className="text-slate-300 text-sm mt-2 text-center">
                      {card.name}
                    </p>
                    {sc.orientation === 'reversed' && (
                      <p className="text-slate-400 text-xs text-center">(Reversed)</p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {reading ? (
            <div className="bg-gradient-to-br from-slate-900/80 via-purple-900/20 to-slate-900/80 backdrop-blur-sm border-2 border-amber-500/30 rounded-lg p-8 glow-border animate-fade-in">
              <h2 className="text-3xl font-decorative text-amber-400 mb-6 text-center">
                Your Detailed Reading
              </h2>
              <div className="prose prose-invert prose-amber max-w-none">
                <div className="text-slate-300 leading-relaxed text-lg">
                  <TypewriterText text={reading} speed={15} />
                </div>
              </div>

              {downloadUrl && (
                <div className="mt-8 flex justify-center">
                  <a
                    href={downloadUrl}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900 hover:from-purple-800 hover:via-blue-800 hover:to-purple-800 text-amber-400 font-serif text-lg px-8 py-3 rounded-lg border-2 border-amber-500/50 transition-all transform hover:scale-105"
                  >
                    <Download size={20} />
                    Download PDF (Single Use)
                  </a>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center gap-3 text-slate-300">
                <Loader2 className="animate-spin text-amber-400" size={32} />
                <p className="text-lg">Generating your reading...</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedCardData && (
        <CardModal
          card={selectedCardData}
          onClose={() => setSelectedCardForModal(null)}
        />
      )}
    </div>
  );
}
