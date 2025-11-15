'use client';

import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <header className="bg-gray-900 border-b border-gray-800 px-4 py-4 sticky top-0 z-40">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Link href="/configuracoes" className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-white" />
          </Link>
          <h1 className="text-lg font-bold text-white">Política de Privacidade</h1>
          <div className="w-9"></div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        <div className="bg-blue-900/20 border border-blue-800/30 rounded-xl p-4 flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-400 mt-0.5" />
          <p className="text-blue-200 text-sm">
            Sua privacidade é nossa prioridade. Leia como protegemos seus dados.
          </p>
        </div>

        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-4">Última atualização: Janeiro de 2024</p>
          
          <div className="space-y-6 text-gray-300">
            <section>
              <h2 className="text-white font-bold text-lg mb-3">1. Informações Coletadas</h2>
              <p className="text-sm leading-relaxed mb-2">Coletamos apenas o necessário para o funcionamento do app:</p>
              <ul className="list-disc list-inside text-sm space-y-1 ml-2">
                <li>Localização (apenas quando você usa o app)</li>
                <li>Alertas que você envia (anônimos)</li>
                <li>Preferências de configuração</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white font-bold text-lg mb-3">2. Como Usamos Seus Dados</h2>
              <p className="text-sm leading-relaxed mb-2">Seus dados são usados para:</p>
              <ul className="list-disc list-inside text-sm space-y-1 ml-2">
                <li>Mostrar alertas relevantes próximos a você</li>
                <li>Calcular rotas seguras</li>
                <li>Gerar estatísticas agregadas (sem identificação)</li>
                <li>Melhorar o serviço</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white font-bold text-lg mb-3">3. Anonimato</h2>
              <p className="text-sm leading-relaxed">
                Todos os alertas são 100% anônimos. Não vinculamos alertas a usuários específicos. 
                Sua identidade nunca é revelada para outros usuários.
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold text-lg mb-3">4. Compartilhamento de Dados</h2>
              <p className="text-sm leading-relaxed mb-2">
                Nunca vendemos seus dados. Compartilhamos apenas:
              </p>
              <ul className="list-disc list-inside text-sm space-y-1 ml-2">
                <li>Dados agregados e anônimos para pesquisas de segurança pública</li>
                <li>Informações quando exigido por lei</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white font-bold text-lg mb-3">5. Segurança</h2>
              <p className="text-sm leading-relaxed">
                Utilizamos criptografia de ponta a ponta e medidas de segurança avançadas 
                para proteger seus dados contra acesso não autorizado.
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold text-lg mb-3">6. Seus Direitos</h2>
              <p className="text-sm leading-relaxed mb-2">Você tem direito a:</p>
              <ul className="list-disc list-inside text-sm space-y-1 ml-2">
                <li>Acessar seus dados</li>
                <li>Solicitar exclusão de dados</li>
                <li>Desativar localização a qualquer momento</li>
                <li>Exportar seus dados</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white font-bold text-lg mb-3">7. Cookies e Rastreamento</h2>
              <p className="text-sm leading-relaxed">
                Usamos cookies apenas para funcionalidade essencial. 
                Não usamos cookies de rastreamento de terceiros.
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold text-lg mb-3">8. Menores de Idade</h2>
              <p className="text-sm leading-relaxed">
                O app é destinado a maiores de 13 anos. 
                Menores devem ter autorização dos responsáveis.
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold text-lg mb-3">9. Alterações na Política</h2>
              <p className="text-sm leading-relaxed">
                Podemos atualizar esta política. Notificaremos sobre mudanças significativas.
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold text-lg mb-3">10. Contato</h2>
              <p className="text-sm leading-relaxed">
                Para questões sobre privacidade, entre em contato através das configurações do app.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
