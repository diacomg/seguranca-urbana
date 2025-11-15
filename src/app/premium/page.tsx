'use client';

import Link from 'next/link';
import { ArrowLeft, Check, Crown, Zap } from 'lucide-react';

const beneficios = [
  'Rotas seguras ilimitadas',
  'Estatísticas completas e detalhadas',
  'Alertas antecipados em tempo real',
  'Relatórios semanais personalizados',
  'Histórico completo de rotas',
  'Prioridade no suporte',
  'Sem anúncios',
  'Modo offline avançado',
];

export default function PremiumPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <header className="bg-gray-900 border-b border-gray-800 px-4 py-4 sticky top-0 z-40">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Link href="/configuracoes" className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-white" />
          </Link>
          <h1 className="text-lg font-bold text-white">Premium</h1>
          <div className="w-9"></div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-8 space-y-6">
        {/* Hero */}
        <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl p-8 text-center">
          <Crown className="w-16 h-16 text-white mx-auto mb-4" />
          <h2 className="text-white font-bold text-2xl mb-2">Vizinhança Segura Premium</h2>
          <p className="text-white/90 text-sm">Proteção máxima para você e sua família</p>
        </div>

        {/* Preço */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 text-center">
          <div className="inline-block bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
            7 DIAS GRÁTIS
          </div>
          <div className="flex items-baseline justify-center gap-2 mb-2">
            <span className="text-gray-400 line-through text-lg">R$ 29,90</span>
            <span className="text-white font-bold text-4xl">R$ 19,90</span>
            <span className="text-gray-400">/mês</span>
          </div>
          <p className="text-gray-400 text-sm">Cancele quando quiser</p>
        </div>

        {/* Benefícios */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            O que você ganha
          </h3>
          <div className="space-y-3">
            {beneficios.map((beneficio, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="bg-blue-600 rounded-full p-1 mt-0.5">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-gray-300">{beneficio}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Comparação */}
        <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
          <div className="grid grid-cols-3 bg-gray-900 p-3">
            <div></div>
            <div className="text-center text-gray-400 text-sm font-medium">Grátis</div>
            <div className="text-center text-yellow-400 text-sm font-bold">Premium</div>
          </div>
          <div className="divide-y divide-gray-700">
            {[
              { feature: 'Alertas básicos', free: true, premium: true },
              { feature: 'Rotas seguras', free: '3/dia', premium: 'Ilimitado' },
              { feature: 'Estatísticas', free: false, premium: true },
              { feature: 'Relatórios', free: false, premium: true },
            ].map((item, index) => (
              <div key={index} className="grid grid-cols-3 p-3 items-center">
                <div className="text-gray-300 text-sm">{item.feature}</div>
                <div className="text-center">
                  {typeof item.free === 'boolean' ? (
                    item.free ? (
                      <Check className="w-4 h-4 text-green-400 mx-auto" />
                    ) : (
                      <span className="text-gray-600">—</span>
                    )
                  ) : (
                    <span className="text-gray-400 text-xs">{item.free}</span>
                  )}
                </div>
                <div className="text-center">
                  {typeof item.premium === 'boolean' ? (
                    <Check className="w-4 h-4 text-yellow-400 mx-auto" />
                  ) : (
                    <span className="text-yellow-400 text-xs font-bold">{item.premium}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-105 shadow-lg">
          Começar 7 dias grátis
        </button>

        <p className="text-gray-400 text-xs text-center">
          Após o período de teste, será cobrado R$ 19,90/mês. Cancele a qualquer momento sem taxas.
        </p>
      </div>
    </div>
  );
}
