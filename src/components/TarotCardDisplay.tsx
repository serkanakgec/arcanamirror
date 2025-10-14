import { useState } from 'react';
import { TarotCard } from '../data/tarotDeck';
import { CardModal } from './CardModal';

interface TarotCardDisplayProps {
  card: TarotCard;
  position: 'Past' | 'Present' | 'Future';
  delay: number;
}

export function TarotCardDisplay({ card, position, delay }: TarotCardDisplayProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useState(() => {
    const timer = setTimeout(() => setIsFlipped(true), delay);
    return () => clearTimeout(timer);
  });

  return (
    <>
      <div className="flex flex-col items-center space-y-4">
        <h3 className="text-xl font-serif text-amber-400">{position}</h3>

        <div
          className={`card-container cursor-pointer transform transition-all duration-700 hover:scale-105 ${
            isFlipped ? 'flipped' : ''
          }`}
          onClick={() => isFlipped && setShowModal(true)}
        >
          <div className="card">
            <div className="card-front">
              <div className="w-48 h-72 bg-gradient-to-br from-purple-900 via-blue-900 to-purple-900 rounded-lg border-2 border-amber-500 shadow-2xl shadow-purple-500/50 flex items-center justify-center">
                <div className="text-amber-400 text-6xl animate-pulse">✨</div>
              </div>
            </div>

            <div className="card-back">
              <div className="w-48 h-72 rounded-lg overflow-hidden border-2 border-amber-500 shadow-2xl shadow-amber-500/50 group">
                <img
                  src={card.imageUrl}
                  alt={card.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                  <div className="text-center w-full">
                    <p className="text-amber-400 font-serif text-lg">{card.name}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isFlipped && (
          <div className="text-center space-y-2 max-w-xs animate-fade-in">
            <div className="flex flex-wrap justify-center gap-1">
              {card.keywords.slice(0, 3).map((keyword, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2 py-1 bg-purple-900/30 border border-amber-500/20 rounded-full text-slate-300"
                >
                  {keyword}
                </span>
              ))}
            </div>
            <p className="text-slate-400 text-sm italic">Click for details</p>
          </div>
        )}
      </div>

      {showModal && <CardModal card={card} onClose={() => setShowModal(false)} />}
    </>
  );
}
