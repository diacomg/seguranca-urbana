'use client';

import Link from 'next/link';
import { ArrowLeft, Shield, Users, MapPin, Bell, TrendingUp, Lock } from 'lucide-react';

const recursos = [
  {
    icon: Bell,
    title: 'Alertas Comunitários',
    description: 'Receba e envie alertas em tempo real sobre sua região',
  },
  {
    icon: MapPin,
    title: 'Mapa de Calor',
    description: 'Visualize áreas de risco com heatmap inteligente',
  },
  {
    icon: Shield,
    title: 'Rotas Seguras',
    description: 'Navegue evitando zonas de perigo',
  },
  {
    icon: Users,
    title: 'Validação Social',
    description: 'Comunidade confirma alertas para maior precisão',
  },
  {
    icon: TrendingUp,
    title: 'Estatísticas',
    description: 'Dados detalhados sobre segurança por bairro',
  },
  {
    icon: Lock,
    title: 'Privacidade Total',
    description: 'Alertas 100% anônimos e dados criptografados',
  },
];

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <header className="bg-gray-900 border-b border-gray-800 px-4 py-4 sticky top-0 z-40">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Link href="/configuracoes" className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-white" />
          </Link>
          <h1 className="text-lg font-bold text-white">Sobre o App</h1>
          <div className="w-9"></div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-8 space-y-6">
        {/* Logo e Nome */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-white font-bold text-2xl mb-2">Vizinhança Segura</h2>
          <p className="text-gray-400">Versão 1.0.0</p>
        </div>

        {/* Descrição */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-white font-bold mb-3">Nossa Missão</h3>
          <p className="text-gray-300 leading-relaxed">
            Criar o app de segurança urbana mais completo do Brasil, conectando comunidades e 
            fornecendo informações em tempo real para que todos possam se deslocar com mais segurança 
            e tranquilidade.
          </p>
        </div>

        {/* Recursos */}
        <div>
          <h3 className="text-white font-bold mb-4 px-1">Principais Recursos</h3>
          <div className="space-y-3">
            {recursos.map((recurso, index) => (
              <div key={index} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-600/20 p-2 rounded-lg">
                    <recurso.icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">{recurso.title}</h4>
                    <p className="text-gray-400 text-sm">{recurso.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compromisso */}
        <div className="bg-blue-900/20 border border-blue-800/30 rounded-xl p-6">
          <h3 className="text-blue-300 font-bold mb-3 flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Compromisso com Privacidade
          </h3>
          <p className="text-blue-200 text-sm leading-relaxed">
            Seus dados são 100% privados e criptografados. Todos os alertas são anônimos e 
            nunca compartilhamos informações pessoais com terceiros.
          </p>
        </div>

        {/* Links */}
        <div className="bg-gray-800/50 rounded-xl border border-gray-700 divide-y divide-gray-700">
          <Link href="/termos" className="p-4 flex items-center justify-between hover:bg-gray-800/30 transition-colors">
            <span className="text-white">Termos de Uso</span>
            <span className="text-gray-400">→</span>
          </Link>
          <Link href="/privacidade" className="p-4 flex items-center justify-between hover:bg-gray-800/30 transition-colors">
            <span className="text-white">Política de Privacidade</span>
            <span className="text-gray-400">→</span>
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center pt-4">
          <p className="text-gray-500 text-sm">
            © 2024 Vizinhança Segura. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}
