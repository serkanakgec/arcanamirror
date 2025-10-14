import { useState } from 'react';
import { Globe } from 'lucide-react';
import { languages, Language } from '../i18n/translations';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export function LanguageSelector({ currentLanguage, onLanguageChange }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find(l => l.code === currentLanguage);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-slate-900/50 border border-amber-500/30 rounded-lg hover:border-amber-500/50 transition-all"
      >
        <Globe size={18} className="text-amber-400" />
        <span className="text-lg">{currentLang?.flag}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-slate-900 border-2 border-amber-500/30 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  onLanguageChange(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2 text-left hover:bg-slate-800 transition-colors flex items-center gap-3 ${
                  currentLanguage === lang.code ? 'bg-slate-800 text-amber-400' : 'text-slate-300'
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="text-sm">{lang.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
