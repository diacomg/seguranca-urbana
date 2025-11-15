'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <header className="bg-gray-900 border-b border-gray-800 px-4 py-4 sticky top-0 z-40">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Link href="/configuracoes" className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-white" />
          </Link>
          <h1 className="text-lg font-bold text-white">Termos de Uso</h1>
          <div className="w-9"></div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-4">Última atualização: Janeiro de 2024</p>
          
          <div className="space-y-6 text-gray-300">
            <section>
              <h2 className="text-white font-bold text-lg mb-3">1. Aceitação dos Termos</h2>
              <p className="text-sm leading-relaxed">
                Ao utilizar o Vizinhança Segura, você concorda com estes Termos de Uso. 
                Se não concordar, não utilize o aplicativo.
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold text-lg mb-3">2. Uso do Serviço</h2>
              <p className="text-sm leading-relaxed mb-2">
                O Vizinhança Segura é uma plataforma comunitária de alertas de segurança. Você concorda em:
              </p>
              <ul className="list-disc list-inside text-sm space-y-1 ml-2">
                <li>Fornecer informações verdadeiras e precisas</li>
                <li>Não enviar alertas falsos ou enganosos</li>
                <li>Respeitar outros usuários da comunidade</li>
                <li>Não usar o app para fins ilegais</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white font-bold text-lg mb-3">3. Alertas Comunitários</h2>
              <p className="text-sm leading-relaxed">
                Os alertas são enviados por usuários e podem não ser verificados. 
                Use as informações como referência, mas sempre priorize sua segurança pessoal.
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold text-lg mb-3">4. Privacidade</h2>
              <p className="text-sm leading-relaxed">
                Seus dados são protegidos conforme nossa Política de Privacidade. 
                Alertas são anônimos e não compartilhamos informações pessoais.
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold text-lg mb-3">5. Limitação de Responsabilidade</h2>
              <p className="text-sm leading-relaxed">
                O Vizinhança Segura não se responsabiliza por danos decorrentes do uso do aplicativo. 
                As informações são fornecidas "como estão" sem garantias.
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold text-lg mb-3">6. Modificações</h2>
              <p className="text-sm leading-relaxed">
                Podemos modificar estes termos a qualquer momento. 
                Continuando a usar o app, você aceita as mudanças.
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold text-lg mb-3">7. Contato</h2>
              <p className="text-sm leading-relaxed">
                Para dúvidas sobre estes termos, entre em contato através do app.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
