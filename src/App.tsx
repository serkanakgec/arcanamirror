import { useState } from 'react';
import { Sparkles, RefreshCw, Loader2 } from 'lucide-react';
import { tarotDeck, TarotCard } from './data/tarotDeck';
import { TarotCardDisplay } from './components/TarotCardDisplay';
import { generateReading } from './services/geminiService';

function App() {
  const [question, setQuestion] = useState('');
  const [drawnCards, setDrawnCards] = useState<TarotCard[]>([]);
  const [reading, setReading] = useState('');
  const [isDrawing, setIsDrawing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const shuffleAndDraw = () => {
    const shuffled = [...tarotDeck].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  };

  const handleDrawCards = async () => {
    if (!question.trim()) {
      setError('Please enter a question to guide your reading.');
      return;
    }

    setError('');
    setIsDrawing(true);
    setReading('');

    await new Promise(resolve => setTimeout(resolve, 500));

    const cards = shuffleAndDraw();
    setDrawnCards(cards);

    await new Promise(resolve => setTimeout(resolve, 2500));

    setIsDrawing(false);
    setIsGenerating(true);

    const result = await generateReading(question, cards);

    if (result.error) {
      setError(result.error);
    } else {
      setReading(result.reading);
    }

    setIsGenerating(false);
  };

  const handleReset = () => {
    setQuestion('');
    setDrawnCards([]);
    setReading('');
    setError('');
  };

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
            Peer into the cosmic mirror and discover the wisdom of the Tarot
          </p>
        </header>

        {drawnCards.length === 0 ? (
          <div className="max-w-2xl mx-auto animate-fade-in">
            <div className="bg-gradient-to-br from-slate-900/80 via-purple-900/20 to-slate-900/80 backdrop-blur-sm border-2 border-amber-500/30 rounded-lg p-8 glow-border">
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="question"
                    className="block text-amber-400 font-serif text-xl mb-3"
                  >
                    What guidance do you seek?
                  </label>
                  <textarea
                    id="question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask your question with an open heart..."
                    className="w-full px-4 py-3 bg-slate-900/50 border-2 border-amber-500/30 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/60 transition-colors resize-none"
                    rows={4}
                  />
                </div>

                {error && (
                  <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4 text-red-200">
                    {error}
                  </div>
                )}

                <button
                  onClick={handleDrawCards}
                  disabled={isDrawing}
                  className="w-full bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900 hover:from-purple-800 hover:via-blue-800 hover:to-purple-800 text-amber-400 font-serif text-xl py-4 rounded-lg border-2 border-amber-500/50 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  {isDrawing ? (
                    <>
                      <Loader2 className="animate-spin" size={24} />
                      Drawing Cards...
                    </>
                  ) : (
                    <>
                      <Sparkles size={24} />
                      Draw Your Cards
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 justify-items-center">
              <TarotCardDisplay card={drawnCards[0]} position="Past" delay={300} />
              <TarotCardDisplay card={drawnCards[1]} position="Present" delay={900} />
              <TarotCardDisplay card={drawnCards[2]} position="Future" delay={1500} />
            </div>

            {(reading || isGenerating) && (
              <div className="max-w-3xl mx-auto animate-fade-in">
                <div className="bg-gradient-to-br from-slate-900/80 via-purple-900/20 to-slate-900/80 backdrop-blur-sm border-2 border-amber-500/30 rounded-lg p-8 glow-border">
                  <h2 className="text-3xl font-decorative text-amber-400 mb-6 text-center">
                    Your Reading
                  </h2>

                  {isGenerating ? (
                    <div className="flex items-center justify-center gap-3 text-slate-300 py-8">
                      <Loader2 className="animate-spin text-amber-400" size={32} />
                      <p className="text-lg">The cards are speaking...</p>
                    </div>
                  ) : (
                    <div className="prose prose-invert prose-amber max-w-none">
                      <p className="text-slate-300 leading-relaxed text-lg whitespace-pre-wrap">
                        {reading}
                      </p>
                    </div>
                  )}
                </div>

                {error && (
                  <div className="mt-6 bg-red-900/30 border border-red-500/50 rounded-lg p-4 text-red-200">
                    {error}
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-center">
              <button
                onClick={handleReset}
                className="bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900 hover:from-purple-800 hover:via-blue-800 hover:to-purple-800 text-amber-400 font-serif text-lg px-8 py-3 rounded-lg border-2 border-amber-500/50 transition-all transform hover:scale-105 flex items-center gap-2"
              >
                <RefreshCw size={20} />
                Shuffle & Draw Again
              </button>
            </div>
          </div>
        )}

        <footer className="text-center mt-16 text-slate-400 text-sm">
          <p>Trust in the wisdom of the cards, but remember: you shape your own destiny</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
