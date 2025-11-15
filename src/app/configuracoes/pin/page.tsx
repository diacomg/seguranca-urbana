'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Lock, Check } from 'lucide-react';

export default function PinPage() {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (pin.length === 4 && pin === confirmPin) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <header className="bg-gray-900 border-b border-gray-800 px-4 py-4 sticky top-0 z-40">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Link href="/configuracoes" className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-white" />
          </Link>
          <h1 className="text-lg font-bold text-white">PIN de Segurança</h1>
          <div className="w-9"></div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-8 space-y-6">
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-600/20 p-3 rounded-lg">
              <Lock className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h2 className="text-white font-bold">Proteja seu App</h2>
              <p className="text-gray-400 text-sm">Configure um PIN de 4 dígitos</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-gray-300 text-sm font-medium mb-2 block">Novo PIN</label>
              <input
                type="password"
                maxLength={4}
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                placeholder="••••"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white text-center text-2xl tracking-widest focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-gray-300 text-sm font-medium mb-2 block">Confirmar PIN</label>
              <input
                type="password"
                maxLength={4}
                value={confirmPin}
                onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ''))}
                placeholder="••••"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white text-center text-2xl tracking-widest focus:outline-none focus:border-blue-500"
              />
            </div>

            {pin.length === 4 && confirmPin.length === 4 && pin !== confirmPin && (
              <p className="text-red-400 text-sm">Os PINs não coincidem</p>
            )}

            <button
              onClick={handleSave}
              disabled={pin.length !== 4 || pin !== confirmPin}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {saved ? (
                <>
                  <Check className="w-5 h-5" />
                  PIN Salvo!
                </>
              ) : (
                'Salvar PIN'
              )}
            </button>
          </div>
        </div>

        <div className="bg-blue-900/20 border border-blue-800/30 rounded-xl p-4">
          <p className="text-blue-300 text-sm">
            <strong>Dica:</strong> Escolha um PIN que você lembre facilmente, mas que não seja óbvio como 1234 ou sua data de nascimento.
          </p>
        </div>
      </div>
    </div>
  );
}
