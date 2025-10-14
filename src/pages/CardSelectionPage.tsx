import { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, Sparkles, Loader2 } from 'lucide-react';
import { tarotDeck } from '../data/tarotDeck';
import { ReadingType, readingTypes, SelectedCard } from '../types/reading';

interface CardSelectionPageProps {
  readingType: ReadingType;
  onBack: () => void;
  onComplete: (selectedCards: SelectedCard[]) => void;
}

interface CardPosition {
  id: string;
  x: number;
  y: number;
}

export function CardSelectionPage({ readingType, onBack, onComplete }: CardSelectionPageProps) {
  const [selectedCards, setSelectedCards] = useState<SelectedCard[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const config = readingTypes.find(t => t.id === readingType)!;
  const requiredCount = config.cardCount;
  const isComplete = selectedCards.length === requiredCount;

  const shuffledDeck = useMemo(() => {
    return [...tarotDeck].sort(() => Math.random() - 0.5);
  }, [readingType]);

  const handleCardClick = (cardId: string) => {
    const existingIndex = selectedCards.findIndex(sc => sc.cardId === cardId);

    if (existingIndex !== -1) {
      return;
    }

    if (selectedCards.length < requiredCount) {
      const orientation: 'upright' | 'reversed' = Math.random() > 0.7 ? 'reversed' : 'upright';
      setSelectedCards([
        ...selectedCards,
        {
          cardId,
          position: selectedCards.length + 1,
          orientation
        }
      ]);
    }
  };

  const handleGenerate = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onComplete(selectedCards);
    }, 500);
  };

  const getCardData = (cardId: string) => {
    return tarotDeck.find(c => c.id === cardId);
  };

  return (
    <div className="min-h-screen starfield">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>

          <div className="flex-1 max-w-md mx-auto">
            <div className="bg-slate-900/50 border-2 border-amber-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-amber-400 font-serif">{config.name}</span>
                <span className="text-slate-300">
                  {selectedCards.length} / {requiredCount}
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-amber-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(selectedCards.length / requiredCount) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="w-20"></div>
        </div>

        <div className="text-center mb-8">
          <p className="text-slate-300 text-lg">
            Trust your intuition and select {requiredCount} {requiredCount === 1 ? 'card' : 'cards'}
          </p>
          <p className="text-slate-400 text-sm mt-2">
            Click a card to reveal it - once selected, it cannot be deselected
          </p>
        </div>

        <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-13 gap-3 mb-8">
          {shuffledDeck.map((card) => {
            const selectedCard = selectedCards.find(sc => sc.cardId === card.id);
            const isSelected = !!selectedCard;

            return (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                disabled={isSelected || selectedCards.length >= requiredCount}
                className={`relative transition-all duration-300 ${
                  isSelected
                    ? 'z-20'
                    : 'z-10'
                } ${
                  !isSelected && selectedCards.length >= requiredCount
                    ? 'opacity-30 cursor-not-allowed'
                    : 'cursor-pointer hover:scale-105'
                }`}
              >
                {!isSelected ? (
                  <div className="aspect-[2/3] w-full">
                    <img
                      src="https://www.sacred-texts.com/tarot/pkt/img/back.jpg"
                      alt="Card back"
                      className="w-full h-full object-cover rounded-lg border-2 border-amber-500/50 shadow-lg"
                    />
                  </div>
                ) : (
                  <div className="relative">
                    <div
                      className={`aspect-[2/3] ${
                        selectedCard.orientation === 'reversed' ? 'rotate-180' : ''
                      }`}
                    >
                      <img
                        src={card.imageUrl}
                        alt={card.name}
                        className="w-full h-full object-cover rounded-lg border-4 border-amber-400 shadow-2xl shadow-amber-500/50 scale-125"
                      />
                    </div>
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center text-slate-900 font-bold text-sm shadow-lg z-30">
                      {selectedCard.position}
                    </div>
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                      <p className="text-amber-400 text-xs font-serif text-center">
                        {card.name}
                      </p>
                      {selectedCard.orientation === 'reversed' && (
                        <p className="text-amber-400/70 text-xs text-center">(Reversed)</p>
                      )}
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {isComplete && (
          <div className="flex justify-center animate-fade-in mt-16">
            <button
              onClick={handleGenerate}
              disabled={isProcessing}
              className="bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900 hover:from-purple-800 hover:via-blue-800 hover:to-purple-800 text-amber-400 font-serif text-xl px-12 py-4 rounded-lg border-2 border-amber-500/50 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-3"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="animate-spin" size={24} />
                  Processing...
                </>
              ) : (
                <>
                  <Sparkles size={24} />
                  Generate Detailed Reading
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
