'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, MapPin, CheckCircle, Clock, Filter } from 'lucide-react';
import BottomNav from '@/components/custom/bottom-nav';
import { recentAlerts } from '@/lib/mock-data';
import type { AlertType } from '@/lib/types';

export default function ComunidadePage() {
  const [filter, setFilter] = useState<'todos' | AlertType>('todos');
  const [confirmedAlerts, setConfirmedAlerts] = useState<Set<string>>(new Set());

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'assalto': return '🔫';
      case 'suspeito': return '👁️';
      case 'tiroteio': return '⚠️';
      case 'transito': return '🚗';
      case 'barulho': return '🔊';
      case 'incendio': return '🔥';
      case 'clima': return '🌧️';
      default: return '📍';
    }
  };

  const getAlertColor = (urgency: string) => {
    switch (urgency) {
      case 'alta': return 'border-l-red-500 bg-red-500/5';
      case 'media': return 'border-l-orange-500 bg-orange-500/5';
      case 'baixa': return 'border-l-yellow-500 bg-yellow-500/5';
      default: return 'border-l-gray-500 bg-gray-500/5';
    }
  };

  const handleConfirm = (alertId: string) => {
    setConfirmedAlerts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(alertId)) {
        newSet.delete(alertId);
      } else {
        newSet.add(alertId);
      }
      return newSet;
    });
  };

  const filteredAlerts = filter === 'todos' 
    ? recentAlerts 
    : recentAlerts.filter(alert => alert.type === filter);

  return (
    <div className="min-h-screen bg-gray-950 pb-20">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 px-4 py-4 sticky top-0 z-40">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-white" />
            </Link>
            <h1 className="text-lg font-bold text-white">Feed da Comunidade</h1>
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Filter className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Filtros */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setFilter('todos')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                filter === 'todos'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilter('assalto')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                filter === 'assalto'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              🔫 Assalto
            </button>
            <button
              onClick={() => setFilter('suspeito')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                filter === 'suspeito'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              👁️ Suspeito
            </button>
            <button
              onClick={() => setFilter('transito')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                filter === 'transito'
                  ? 'bg-gray-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              🚗 Trânsito
            </button>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-b border-gray-800 px-4 py-3">
        <div className="max-w-md mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-400" />
            <span className="text-gray-300">{filteredAlerts.length} alertas ativos</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-gray-300">{confirmedAlerts.size} confirmados</span>
          </div>
        </div>
      </div>

      {/* Feed de Alertas */}
      <div className="max-w-md mx-auto px-4 py-4 space-y-3">
        {filteredAlerts.map((alert) => {
          const isConfirmed = confirmedAlerts.has(alert.id);
          const currentConfirmations = alert.confirmations + (isConfirmed ? 1 : 0);

          return (
            <div
              key={alert.id}
              className={`bg-gray-800/50 rounded-xl border-l-4 ${getAlertColor(alert.urgency)} overflow-hidden hover:bg-gray-800/70 transition-all`}
            >
              {/* Conteúdo do Alerta */}
              <div className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl">{getAlertIcon(alert.type)}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-bold mb-1">{alert.title}</h3>
                    <p className="text-gray-400 text-sm mb-2">{alert.description}</p>
                    
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                      <MapPin className="w-3 h-3" />
                      <span>{alert.location.address}</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-blue-400 font-medium">{alert.distance}</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-500">{alert.timeAgo}</span>
                      <span className="text-gray-500">•</span>
                      <span className={`font-medium ${
                        currentConfirmations >= 5 ? 'text-green-400' : 'text-gray-400'
                      }`}>
                        {currentConfirmations} confirmações
                      </span>
                    </div>
                  </div>
                </div>

                {/* Botões de Ação */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleConfirm(alert.id)}
                    className={`flex-1 py-2.5 rounded-lg font-medium text-sm transition-all ${
                      isConfirmed
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {isConfirmed ? (
                      <span className="flex items-center justify-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Confirmado
                      </span>
                    ) : (
                      'Confirmar'
                    )}
                  </button>
                  <Link
                    href={`/alertas/${alert.id}`}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors"
                  >
                    Ver detalhes
                  </Link>
                </div>
              </div>

              {/* Barra de Validação */}
              {currentConfirmations >= 3 && (
                <div className={`px-4 py-2 text-xs font-medium ${
                  currentConfirmations >= 5 
                    ? 'bg-red-500/20 text-red-400 border-t border-red-500/30'
                    : 'bg-orange-500/20 text-orange-400 border-t border-orange-500/30'
                }`}>
                  {currentConfirmations >= 5 
                    ? '🚨 Zona de alto risco confirmada'
                    : '⚠️ Área de atenção - aguardando mais confirmações'
                  }
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredAlerts.length === 0 && (
        <div className="max-w-md mx-auto px-4 py-12 text-center">
          <div className="bg-gray-800/30 rounded-2xl p-8">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-white font-bold text-lg mb-2">Nenhum alerta deste tipo</h3>
            <p className="text-gray-400 text-sm">Sua região está tranquila no momento</p>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
