import { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles, Loader2 } from 'lucide-react';
import { tarotDeck } from '../data/tarotDeck';
import { ReadingType, readingTypes, SelectedCard } from '../types/reading';

interface CardSelectionPageProps {
  readingType: ReadingType;
  onBack: () => void;
  onComplete: (selectedCards: SelectedCard[]) => void;
}

export function CardSelectionPage({ readingType, onBack, onComplete }: CardSelectionPageProps) {
  const [selectedCards, setSelectedCards] = useState<SelectedCard[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const config = readingTypes.find(t => t.id === readingType)!;
  const requiredCount = config.cardCount;
  const isComplete = selectedCards.length === requiredCount;

  const handleCardClick = (cardId: string) => {
    const existingIndex = selectedCards.findIndex(sc => sc.cardId === cardId);

    if (existingIndex !== -1) {
      setSelectedCards(selectedCards.filter(sc => sc.cardId !== cardId));
    } else {
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
    }
  };

  const handleGenerate = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onComplete(selectedCards);
    }, 500);
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
            <span>Geri</span>
          </button>

          <div className="flex-1 max-w-md mx-auto">
            <div className="bg-slate-900/50 border-2 border-amber-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-amber-400 font-serif">{config.nameTr}</span>
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
            Sezginizle {requiredCount} kart seçin
          </p>
          <p className="text-slate-400 text-sm mt-2">
            Bir karta tıklayarak seçin, tekrar tıklayarak seçimi geri alın
          </p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4 mb-8">
          {tarotDeck.map((card) => {
            const selectedCard = selectedCards.find(sc => sc.cardId === card.id);
            const isSelected = !!selectedCard;

            return (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                disabled={!isSelected && selectedCards.length >= requiredCount}
                className={`relative aspect-[2/3] rounded-lg transition-all duration-300 ${
                  isSelected
                    ? 'ring-4 ring-amber-400 shadow-lg shadow-amber-500/50 scale-105'
                    : 'hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30'
                } ${
                  !isSelected && selectedCards.length >= requiredCount
                    ? 'opacity-30 cursor-not-allowed'
                    : 'cursor-pointer'
                }`}
              >
                <div
                  className={`card-container w-full h-full ${
                    isSelected ? 'flipped' : ''
                  }`}
                >
                  <div className="card w-full h-full">
                    <div className="card-front">
                      <div className="w-full h-full bg-gradient-to-br from-purple-900 via-blue-900 to-purple-900 rounded-lg border-2 border-amber-500 flex items-center justify-center">
                        <Sparkles className="text-amber-400 w-8 h-8 animate-pulse" />
                      </div>
                    </div>

                    <div className="card-back">
                      <img
                        src={card.imageUrl}
                        alt={card.name}
                        className="w-full h-full object-cover rounded-lg border-2 border-amber-500"
                      />
                    </div>
                  </div>
                </div>

                {isSelected && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center text-slate-900 font-bold text-sm shadow-lg animate-fade-in">
                    {selectedCard.position}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {isComplete && (
          <div className="flex justify-center animate-fade-in">
            <button
              onClick={handleGenerate}
              disabled={isProcessing}
              className="bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900 hover:from-purple-800 hover:via-blue-800 hover:to-purple-800 text-amber-400 font-serif text-xl px-12 py-4 rounded-lg border-2 border-amber-500/50 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-3"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="animate-spin" size={24} />
                  İşleniyor...
                </>
              ) : (
                <>
                  <Sparkles size={24} />
                  Detaylı Yorumu Oluştur
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
