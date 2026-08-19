import { useEffect, useState } from 'react';
import { FaGlobe } from 'react-icons/fa';

interface LanguageSelectorProps {
  forceShowModal?: boolean;
}

const languages = [
  { code: 'en', short: 'EN', label: 'English', hint: 'Continue in English' },
  { code: 'rw', short: 'KIN', label: 'Kinyarwanda', hint: 'Komeza mu Kinyarwanda' },
];

const LanguageSelector = ({ forceShowModal = false }: LanguageSelectorProps) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('lang')) setShowModal(true);
  }, [forceShowModal]);

  const handleLanguageSelect = (lang: string) => {
    localStorage.setItem('lang', lang);
    setShowModal(false);
    location.reload();
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6">
        <span className="inline-flex w-9 h-9 rounded-lg bg-slate-100 items-center justify-center mb-4">
          <FaGlobe className="w-4 h-4 text-primary" />
        </span>

        <h2 className="text-lg font-semibold tracking-tight text-slate-900">
          Choose your language
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Hitamo ururimi rwawe
        </p>

        <div className="mt-5 space-y-2">
          {languages.map((language) => (
            <button
              key={language.code}
              type="button"
              onClick={() => handleLanguageSelect(language.code)}
              className="w-full flex items-center gap-3 rounded-lg border border-slate-200 px-4 py-3 text-left hover:border-primary hover:bg-slate-50 transition-colors"
            >
              <span className="w-10 text-xs font-semibold tracking-wide text-slate-400">
                {language.short}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-medium text-slate-900">
                  {language.label}
                </span>
                <span className="block text-xs text-slate-500">
                  {language.hint}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
