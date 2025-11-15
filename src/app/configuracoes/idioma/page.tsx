'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check } from 'lucide-react';

const idiomas = [
  { code: 'pt-BR', name: 'Português (Brasil)', flag: '🇧🇷' },
  { code: 'en-US', name: 'English (US)', flag: '🇺🇸' },
  { code: 'es-ES', name: 'Español', flag: '🇪🇸' },
  { code: 'fr-FR', name: 'Français', flag: '🇫🇷' },
];

export default function IdiomaPage() {
  const [selectedLanguage, setSelectedLanguage] = useState('pt-BR');

  return (
    <div className="min-h-screen bg-gray-950">
      <header className="bg-gray-900 border-b border-gray-800 px-4 py-4 sticky top-0 z-40">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Link href="/configuracoes" className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-white" />
          </Link>
          <h1 className="text-lg font-bold text-white">Idioma</h1>
          <div className="w-9"></div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6">
        <div className="bg-gray-800/50 rounded-xl border border-gray-700 divide-y divide-gray-700">
          {idiomas.map((idioma) => (
            <button
              key={idioma.code}
              onClick={() => setSelectedLanguage(idioma.code)}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-800/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{idioma.flag}</span>
                <span className="text-white font-medium">{idioma.name}</span>
              </div>
              {selectedLanguage === idioma.code && (
                <Check className="w-5 h-5 text-blue-400" />
              )}
            </button>
          ))}
        </div>

        <div className="mt-6 bg-blue-900/20 border border-blue-800/30 rounded-xl p-4">
          <p className="text-blue-300 text-sm">
            O idioma será aplicado em todo o aplicativo após a seleção.
          </p>
        </div>
      </div>
    </div>
  );
}
