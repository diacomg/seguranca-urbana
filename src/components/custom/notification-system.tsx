'use client';

import { useState, useEffect } from 'react';
import { X, Bell, AlertTriangle, Shield, MapPin } from 'lucide-react';

interface Alert {
  id: string;
  type: 'assalto' | 'tiroteio' | 'suspeito' | 'transito' | 'acidente';
  title: string;
  description: string;
  urgency: 'alta' | 'media' | 'baixa';
  distance: string;
  timestamp: Date;
}

export default function NotificationSystem() {
  const [notifications, setNotifications] = useState<Alert[]>([]);
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    // Verificar permissão de notificações
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }

    // Simular recebimento de notificações em tempo real
    const interval = setInterval(() => {
      // Apenas para demonstração - em produção viria de WebSocket/SSE
      if (Math.random() > 0.95) {
        const mockAlert: Alert = {
          id: Date.now().toString(),
          type: ['assalto', 'tiroteio', 'suspeito'][Math.floor(Math.random() * 3)] as any,
          title: 'Novo alerta próximo a você',
          description: 'Um novo alerta foi reportado na sua região',
          urgency: ['alta', 'media', 'baixa'][Math.floor(Math.random() * 3)] as any,
          distance: `${Math.floor(Math.random() * 500) + 100}m`,
          timestamp: new Date()
        };

        setNotifications(prev => [mockAlert, ...prev].slice(0, 5));

        // Enviar notificação do navegador
        if (Notification.permission === 'granted') {
          new Notification(mockAlert.title, {
            body: mockAlert.description,
            icon: '/icon.svg',
            tag: mockAlert.id,
            requireInteraction: mockAlert.urgency === 'alta'
          });
        }
      }
    }, 30000); // A cada 30 segundos

    return () => clearInterval(interval);
  }, []);

  const requestPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      const result = await Notification.requestPermission();
      setPermission(result);
    }
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'alta': return 'border-red-500 bg-red-500/10';
      case 'media': return 'border-orange-500 bg-orange-500/10';
      case 'baixa': return 'border-yellow-500 bg-yellow-500/10';
      default: return 'border-gray-500 bg-gray-500/10';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'assalto': return '🔫';
      case 'tiroteio': return '⚠️';
      case 'suspeito': return '👁️';
      case 'transito': return '🚗';
      case 'acidente': return '🚑';
      default: return '📍';
    }
  };

  if (permission === 'default') {
    return (
      <div className="fixed top-4 right-4 z-50 max-w-sm">
        <div className="bg-blue-600 rounded-xl p-4 shadow-2xl border border-blue-500">
          <div className="flex items-start gap-3">
            <Bell className="w-6 h-6 text-white flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-white font-bold mb-1">Ativar Notificações</h3>
              <p className="text-blue-100 text-sm mb-3">
                Receba alertas em tempo real sobre eventos próximos a você
              </p>
              <button
                onClick={requestPermission}
                className="w-full bg-white hover:bg-blue-50 text-blue-600 font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Ativar Agora
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm space-y-3">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`bg-gray-900 rounded-xl p-4 shadow-2xl border-l-4 ${getUrgencyColor(notification.urgency)} animate-slide-in`}
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl">{getTypeIcon(notification.type)}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h4 className="text-white font-semibold text-sm">{notification.title}</h4>
                <button
                  onClick={() => removeNotification(notification.id)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-gray-300 text-xs mb-2">{notification.description}</p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <MapPin className="w-3 h-3" />
                <span>{notification.distance}</span>
                <span>•</span>
                <span>Agora</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
