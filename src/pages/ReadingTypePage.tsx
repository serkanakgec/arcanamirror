import { useState } from 'react';
import { Sparkles, Link as LinkIcon, Copy, Check } from 'lucide-react';
import { readingTypes, ReadingType } from '../types/reading';
import { generateOneTimeLink } from '../services/linkService';

interface ReadingTypePageProps {
  onSelectType: (type: ReadingType) => void;
}

export function ReadingTypePage({ onSelectType }: ReadingTypePageProps) {
  const [generatingLinks, setGeneratingLinks] = useState<Record<string, boolean>>({});
  const [generatedLinks, setGeneratedLinks] = useState<Record<string, string>>({});
  const [copiedLinks, setCopiedLinks] = useState<Record<string, boolean>>({});

  const classicTypes = readingTypes.filter(t => t.category === 'classic');
  const thematicTypes = readingTypes.filter(t => t.category === 'thematic');

  const handleGenerateLink = async (typeId: ReadingType) => {
    setGeneratingLinks(prev => ({ ...prev, [typeId]: true }));

    const link = await generateOneTimeLink(typeId);

    if (link) {
      setGeneratedLinks(prev => ({ ...prev, [typeId]: link }));
    }

    setGeneratingLinks(prev => ({ ...prev, [typeId]: false }));
  };

  const handleCopyLink = async (typeId: ReadingType) => {
    const link = generatedLinks[typeId];
    if (link) {
      await navigator.clipboard.writeText(link);
      setCopiedLinks(prev => ({ ...prev, [typeId]: true }));
      setTimeout(() => {
        setCopiedLinks(prev => ({ ...prev, [typeId]: false }));
      }, 2000);
    }
  };

  const renderCard = (type: any) => (
    <div key={type.id} className="space-y-3">
      <button
        onClick={() => onSelectType(type.id)}
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
            {type.cardCount} {type.cardCount === 1 ? 'card' : 'cards'}
          </span>
          <span className="text-amber-400 text-sm group-hover:translate-x-1 transition-transform">
            →
          </span>
        </div>
      </button>

      <div className="flex gap-2">
        <button
          onClick={() => handleGenerateLink(type.id)}
          disabled={generatingLinks[type.id]}
          className="flex-1 bg-slate-800/50 border border-amber-500/30 rounded-lg px-4 py-2 text-sm text-amber-400 hover:bg-slate-800/80 hover:border-amber-500/50 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <LinkIcon size={16} />
          {generatingLinks[type.id] ? 'Generating...' : 'Generate Link'}
        </button>

        {generatedLinks[type.id] && (
          <button
            onClick={() => handleCopyLink(type.id)}
            className="bg-slate-800/50 border border-amber-500/30 rounded-lg px-4 py-2 text-sm text-amber-400 hover:bg-slate-800/80 hover:border-amber-500/50 transition-all flex items-center gap-2"
          >
            {copiedLinks[type.id] ? (
              <>
                <Check size={16} />
                Copied!
              </>
            ) : (
              <>
                <Copy size={16} />
                Copy
              </>
            )}
          </button>
        )}
      </div>

      {generatedLinks[type.id] && (
        <div className="bg-slate-900/50 border border-amber-500/20 rounded-lg p-3">
          <p className="text-xs text-slate-400 mb-1">One-time link (expires in 24h):</p>
          <p className="text-xs text-amber-400/70 break-all font-mono">
            {generatedLinks[type.id]}
          </p>
        </div>
      )}
    </div>
  );

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

        <div className="max-w-6xl mx-auto space-y-12">
          <div>
            <h2 className="text-3xl font-decorative text-amber-400 text-center mb-8">
              Classic Spreads
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {classicTypes.map(renderCard)}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-decorative text-amber-400 text-center mb-8">
              Thematic Readings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {thematicTypes.map(renderCard)}
            </div>
          </div>
        </div>

        <footer className="text-center mt-16 text-slate-400 text-sm">
          <p>Trust in the wisdom of the cards, but remember: you shape your own destiny</p>
        </footer>
      </div>
    </div>
  );
}
