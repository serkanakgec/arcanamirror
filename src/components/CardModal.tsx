import { X } from 'lucide-react';
import { TarotCard } from '../data/tarotDeck';

interface CardModalProps {
  card: TarotCard;
  onClose: () => void;
}

export function CardModal({ card, onClose }: CardModalProps) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 border-2 border-amber-500/30 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-purple-500/20">
        <div className="sticky top-0 bg-gradient-to-r from-slate-900/95 via-purple-900/30 to-slate-900/95 backdrop-blur-sm border-b border-amber-500/20 p-4 flex justify-between items-center z-10">
          <div>
            <h2 className="text-2xl font-serif text-amber-400">{card.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-amber-400 hover:text-amber-300 transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex justify-center">
            <img
              src={card.imageUrl}
              alt={card.name}
              className="w-48 h-auto rounded-lg border-2 border-amber-500/30 shadow-lg shadow-purple-500/20"
            />
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-amber-400 font-serif text-lg mb-2">Suit & Arcana</h3>
              <p className="text-slate-300">{card.suit} - {card.arcana === 'major' ? 'Major Arcana' : 'Minor Arcana'}</p>
            </div>

            <div>
              <h3 className="text-amber-400 font-serif text-lg mb-2">Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {card.keywords.map((keyword, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-purple-900/30 border border-amber-500/20 rounded-full text-slate-300 text-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-amber-400 font-serif text-lg mb-2">Symbolism</h3>
              <p className="text-slate-300 leading-relaxed">{card.symbolism}</p>
            </div>

            <div>
              <h3 className="text-amber-400 font-serif text-lg mb-2">Upright Meaning</h3>
              <p className="text-slate-300 leading-relaxed">{card.upright}</p>
            </div>

            <div>
              <h3 className="text-amber-400 font-serif text-lg mb-2">Reversed Meaning</h3>
              <p className="text-slate-300 leading-relaxed">{card.reversed}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
