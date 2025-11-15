'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface NotificationSettings {
  enabled: boolean;
  sound: boolean;
  vibration: boolean;
  alertTypes: {
    assalto: boolean;
    tiroteio: boolean;
    suspeito: boolean;
    transito: boolean;
    acidente: boolean;
    outros: boolean;
  };
}

interface UserPreferences {
  darkMode: boolean;
  location: boolean;
  notifications: NotificationSettings;
  radius: number; // km
}

interface PreferencesContextType {
  preferences: UserPreferences;
  updatePreferences: (updates: Partial<UserPreferences>) => void;
  requestNotificationPermission: () => Promise<boolean>;
  sendNotification: (title: string, body: string, data?: any) => void;
}

const defaultPreferences: UserPreferences = {
  darkMode: true,
  location: true,
  notifications: {
    enabled: true,
    sound: true,
    vibration: true,
    alertTypes: {
      assalto: true,
      tiroteio: true,
      suspeito: true,
      transito: false,
      acidente: true,
      outros: false
    }
  },
  radius: 2
};

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);

  // Carregar preferências do localStorage
  useEffect(() => {
    const saved = localStorage.getItem('userPreferences');
    if (saved) {
      try {
        setPreferences(JSON.parse(saved));
      } catch (e) {
        console.error('Erro ao carregar preferências:', e);
      }
    }
  }, []);

  // Salvar preferências no localStorage
  useEffect(() => {
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
  }, [preferences]);

  const updatePreferences = (updates: Partial<UserPreferences>) => {
    setPreferences(prev => ({ ...prev, ...updates }));
  };

  const requestNotificationPermission = async (): Promise<boolean> => {
    if (!('Notification' in window)) {
      console.log('Notificações não suportadas neste navegador');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }

    return false;
  };

  const sendNotification = (title: string, body: string, data?: any) => {
    if (!preferences.notifications.enabled) return;

    if (Notification.permission === 'granted') {
      const notification = new Notification(title, {
        body,
        icon: '/icon.svg',
        badge: '/icon.svg',
        data,
        tag: data?.alertId || 'general',
        requireInteraction: data?.urgency === 'alta',
        vibrate: preferences.notifications.vibration ? [200, 100, 200] : undefined
      });

      // Som de notificação
      if (preferences.notifications.sound) {
        const audio = new Audio('/notification.mp3');
        audio.volume = 0.5;
        audio.play().catch(() => {
          // Ignorar erro se não conseguir tocar
        });
      }

      notification.onclick = () => {
        window.focus();
        if (data?.url) {
          window.location.href = data.url;
        }
        notification.close();
      };
    }
  };

  return (
    <PreferencesContext.Provider
      value={{
        preferences,
        updatePreferences,
        requestNotificationPermission,
        sendNotification
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences deve ser usado dentro de PreferencesProvider');
  }
  return context;
}
