import { Sparkles } from 'lucide-react';
import { readingTypes, ReadingType } from '../types/reading';

interface ReadingTypePageProps {
  onSelectType: (type: ReadingType) => void;
}

export function ReadingTypePage({ onSelectType }: ReadingTypePageProps) {
  return (
    <div className="min-h-screen starfield">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="text-amber-400 w-8 h-8" />
            <h1 className="text-5xl md:text-6xl font-decorative text-amber-400 glow-text">
              Arcana Mirror
            </h1>
            <Sparkles className="text-amber-400 w-8 h-8" />
          </div>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto">
            Kozmik aynaya bakın ve Tarot'un bilgeliğini keşfedin
          </p>
        </header>

        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-decorative text-amber-400 text-center mb-8">
            Fal Türünü Seçin
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {readingTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => onSelectType(type.id)}
                className="bg-gradient-to-br from-slate-900/80 via-purple-900/20 to-slate-900/80 backdrop-blur-sm border-2 border-amber-500/30 rounded-lg p-6 glow-border hover:border-amber-500/60 transition-all transform hover:scale-105 text-left group"
              >
                <div className="flex items-start gap-4 mb-3">
                  <span className="text-4xl">{type.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-serif text-amber-400 mb-1 group-hover:glow-text transition-all">
                      {type.nameTr}
                    </h3>
                    <p className="text-slate-400 text-sm mb-2">{type.name}</p>
                  </div>
                </div>
                <p className="text-slate-300 text-sm mb-3">{type.descriptionTr}</p>
                <div className="flex items-center justify-between">
                  <span className="text-amber-400/70 text-xs">
                    {type.cardCount} kart
                  </span>
                  <span className="text-amber-400 text-sm group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <footer className="text-center mt-16 text-slate-400 text-sm">
          <p>Kartların bilgeliğine güvenin, ancak unutmayın: kaderinizi siz şekillendirirsiniz</p>
        </footer>
      </div>
    </div>
  );
}
