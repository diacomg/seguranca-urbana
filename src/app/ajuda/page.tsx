'use client';

import Link from 'next/link';
import { ArrowLeft, Search, ChevronRight, HelpCircle, Shield, MapPin, Bell, Users, Lock } from 'lucide-react';
import BottomNav from '@/components/custom/bottom-nav';

const faqCategories = [
  {
    id: 'seguranca',
    title: 'Segurança',
    icon: Shield,
    questions: [
      {
        q: 'Como funciona o sistema de alertas?',
        a: 'Os alertas são reportados pela comunidade em tempo real. Quando alguém identifica uma situação de risco, pode criar um alerta que será visível para todos os usuários próximos.'
      },
      {
        q: 'Os alertas são verificados?',
        a: 'Sim! Outros usuários podem confirmar ou negar alertas. Quanto mais confirmações, maior a credibilidade do alerta.'
      },
      {
        q: 'Como reportar um alerta falso?',
        a: 'Você pode marcar um alerta como "não confirmado" ou reportá-lo diretamente através do botão de opções no alerta.'
      }
    ]
  },
  {
    id: 'mapa',
    title: 'Mapa e Localização',
    icon: MapPin,
    questions: [
      {
        q: 'Por que preciso compartilhar minha localização?',
        a: 'A localização é usada apenas para mostrar alertas relevantes próximos a você. Seus dados são privados e não são compartilhados com outros usuários.'
      },
      {
        q: 'Como funciona o mapa de calor?',
        a: 'O mapa de calor mostra áreas com maior concentração de alertas recentes, ajudando você a identificar regiões de maior risco.'
      },
      {
        q: 'Posso usar o app sem GPS?',
        a: 'Sim, mas você precisará inserir manualmente seu bairro para ver alertas relevantes.'
      }
    ]
  },
  {
    id: 'notificacoes',
    title: 'Notificações',
    icon: Bell,
    questions: [
      {
        q: 'Como ativar notificações push?',
        a: 'Vá em Configurações > Notificações e ative "Notificações Push". Você também pode personalizar quais tipos de alertas deseja receber.'
      },
      {
        q: 'Posso escolher quais alertas receber?',
        a: 'Sim! Em Configurações você pode selecionar apenas os tipos de alertas que são importantes para você.'
      },
      {
        q: 'As notificações funcionam em segundo plano?',
        a: 'Sim, você receberá notificações mesmo com o app fechado, desde que as permissões estejam ativas.'
      }
    ]
  },
  {
    id: 'comunidade',
    title: 'Comunidade',
    icon: Users,
    questions: [
      {
        q: 'Como posso contribuir?',
        a: 'Você pode reportar alertas, confirmar alertas de outros usuários e compartilhar informações úteis sobre sua região.'
      },
      {
        q: 'Minha identidade fica anônima?',
        a: 'Sim! Todos os alertas são anônimos. Apenas estatísticas gerais são visíveis para outros usuários.'
      },
      {
        q: 'Como ganhar credibilidade?',
        a: 'Reportando alertas precisos e confirmando alertas verdadeiros. Usuários com alta credibilidade têm seus alertas priorizados.'
      }
    ]
  },
  {
    id: 'privacidade',
    title: 'Privacidade',
    icon: Lock,
    questions: [
      {
        q: 'Meus dados são compartilhados?',
        a: 'Não! Seus dados pessoais e localização são privados. Apenas estatísticas anônimas são usadas para melhorar o serviço.'
      },
      {
        q: 'Como excluir minha conta?',
        a: 'Vá em Configurações > Conta e Segurança > Excluir Conta. Todos os seus dados serão permanentemente removidos.'
      },
      {
        q: 'O app coleta quais dados?',
        a: 'Apenas localização aproximada (para alertas relevantes) e dados de uso anônimos para melhorar o serviço.'
      }
    ]
  }
];

export default function AjudaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 pb-20">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 px-4 py-4 sticky top-0 z-40">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Link href="/configuracoes" className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-white" />
          </Link>
          <h1 className="text-lg font-bold text-white">Central de Ajuda</h1>
          <div className="w-9"></div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar ajuda..."
            className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Hero Card */}
        <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 rounded-2xl p-6 border border-blue-700/30">
          <div className="flex items-center gap-3 mb-3">
            <HelpCircle className="w-8 h-8 text-blue-400" />
            <h2 className="text-white font-bold text-xl">Como podemos ajudar?</h2>
          </div>
          <p className="text-blue-200 text-sm">
            Encontre respostas rápidas para as perguntas mais comuns sobre o Vizinhança Segura.
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-4">
          {faqCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div key={category.id} className="space-y-3">
                <div className="flex items-center gap-2 px-1">
                  <IconComponent className="w-5 h-5 text-blue-400" />
                  <h3 className="text-white font-bold">{category.title}</h3>
                </div>
                
                <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
                  {category.questions.map((item, index) => (
                    <details
                      key={index}
                      className={`group ${index !== 0 ? 'border-t border-gray-700' : ''}`}
                    >
                      <summary className="p-4 cursor-pointer hover:bg-gray-700/30 transition-colors flex items-center justify-between">
                        <span className="text-white font-semibold text-sm pr-4">{item.q}</span>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform flex-shrink-0" />
                      </summary>
                      <div className="px-4 pb-4 text-gray-300 text-sm leading-relaxed">
                        {item.a}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Support */}
        <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 text-center">
          <h3 className="text-white font-bold mb-2">Ainda precisa de ajuda?</h3>
          <p className="text-gray-400 text-sm mb-4">
            Nossa equipe está pronta para ajudar você
          </p>
          <Link
            href="/feedback"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            <HelpCircle className="w-5 h-5" />
            <span>Falar com Suporte</span>
          </Link>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
