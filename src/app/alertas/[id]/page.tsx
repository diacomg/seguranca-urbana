'use client';

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, Clock, Users, AlertTriangle, CheckCircle } from 'lucide-react';
import { recentAlerts } from '@/lib/mock-data';
import BottomNav from '@/components/custom/bottom-nav';

export default function AlertDetailPage() {
  const params = useParams();
  const router = useRouter();
  const alertId = params.id as string;

  const alert = recentAlerts.find(a => a.id === alertId);

  if (!alert) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 pb-20">
        <div className="max-w-md mx-auto px-4 py-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar</span>
          </button>
          <div className="text-center py-12">
            <AlertTriangle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Alerta não encontrado</h2>
            <p className="text-gray-400">Este alerta pode ter sido removido ou não existe.</p>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'assalto': return '🔫';
      case 'suspeito': return '👁️';
      case 'tiroteio': return '⚠️';
      case 'transito': return '🚗';
      default: return '📍';
    }
  };

  const getAlertColor = (urgency: string) => {
    switch (urgency) {
      case 'alta': return 'border-red-500 bg-red-500/10 text-red-400';
      case 'media': return 'border-orange-500 bg-orange-500/10 text-orange-400';
      case 'baixa': return 'border-yellow-500 bg-yellow-500/10 text-yellow-400';
      default: return 'border-gray-500 bg-gray-500/10 text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-6 shadow-xl border-b border-gray-700">
        <div className="max-w-md mx-auto">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar</span>
          </button>
          <div className="flex items-center gap-3">
            <span className="text-4xl">{getAlertIcon(alert.type)}</span>
            <div>
              <h1 className="text-xl font-bold text-white">{alert.title}</h1>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium mt-2 ${getAlertColor(alert.urgency)}`}>
                <AlertTriangle className="w-4 h-4" />
                Urgência {alert.urgency}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Informações principais */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 shadow-2xl">
          <h2 className="text-lg font-bold text-white mb-4">Descrição</h2>
          <p className="text-gray-300 leading-relaxed mb-6">{alert.description}</p>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-400 mt-0.5" />
              <div>
                <p className="text-gray-400 text-sm">Localização</p>
                <p className="text-white font-medium">{alert.location.address}</p>
                <p className="text-gray-500 text-sm">{alert.location.neighborhood}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-400 mt-0.5" />
              <div>
                <p className="text-gray-400 text-sm">Horário</p>
                <p className="text-white font-medium">{alert.timeAgo}</p>
                <p className="text-gray-500 text-sm">{alert.timestamp.toLocaleString('pt-BR')}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-blue-400 mt-0.5" />
              <div>
                <p className="text-gray-400 text-sm">Confirmações</p>
                <p className="text-white font-medium">{alert.confirmations} pessoas confirmaram</p>
              </div>
            </div>
          </div>
        </div>

        {/* Distância */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <MapPin className="w-6 h-6 text-blue-400" />
            <div>
              <p className="text-blue-300 text-sm">Distância de você</p>
              <p className="text-white font-bold text-lg">{alert.distance}</p>
            </div>
          </div>
        </div>

        {/* Ações */}
        <div className="space-y-3">
          <button className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 hover:from-green-700 hover:to-green-800 transition-all shadow-lg">
            <CheckCircle className="w-5 h-5" />
            Confirmar Alerta
          </button>
          
          <button className="w-full bg-gray-800 text-white font-semibold py-4 rounded-xl hover:bg-gray-700 transition-all border border-gray-700">
            Ver no Mapa
          </button>
        </div>

        {/* Aviso */}
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
          <p className="text-yellow-300 text-sm text-center">
            ⚠️ Mantenha-se seguro e evite a área se possível
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
