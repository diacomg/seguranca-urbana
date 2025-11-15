'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Bell, 
  Shield, 
  User, 
  MapPin, 
  Moon, 
  Sun,
  Volume2,
  VolumeX,
  Smartphone,
  Mail,
  Lock,
  HelpCircle,
  LogOut,
  ChevronRight
} from 'lucide-react';
import BottomNav from '@/components/custom/bottom-nav';

export default function ConfiguracoesPage() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);

  const [selectedAlertTypes, setSelectedAlertTypes] = useState({
    assalto: true,
    tiroteio: true,
    suspeito: true,
    transito: false,
    acidente: true,
    outros: false
  });

  const toggleAlertType = (type: keyof typeof selectedAlertTypes) => {
    setSelectedAlertTypes(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 pb-20">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 px-4 py-4 sticky top-0 z-40">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Link href="/" className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-white" />
          </Link>
          <h1 className="text-lg font-bold text-white">Configurações</h1>
          <div className="w-9"></div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Perfil do Usuário */}
        <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 rounded-2xl p-6 border border-blue-700/30">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-white font-bold text-lg">Usuário Anônimo</h2>
              <p className="text-blue-200 text-sm">Membro desde Jan 2024</p>
            </div>
            <ChevronRight className="w-5 h-5 text-blue-300" />
          </div>
        </div>

        {/* Notificações */}
        <div className="space-y-3">
          <h3 className="text-white font-bold px-1">Notificações</h3>
          
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-white font-semibold">Notificações Push</p>
                  <p className="text-gray-400 text-xs">Receba alertas em tempo real</p>
                </div>
              </div>
              <button
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  notificationsEnabled ? 'bg-blue-600' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    notificationsEnabled ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="border-t border-gray-700 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {soundEnabled ? (
                  <Volume2 className="w-5 h-5 text-blue-400" />
                ) : (
                  <VolumeX className="w-5 h-5 text-gray-400" />
                )}
                <div>
                  <p className="text-white font-semibold">Som de Alerta</p>
                  <p className="text-gray-400 text-xs">Tocar som nas notificações</p>
                </div>
              </div>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  soundEnabled ? 'bg-blue-600' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    soundEnabled ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Tipos de Alertas */}
        <div className="space-y-3">
          <h3 className="text-white font-bold px-1">Tipos de Alertas</h3>
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
            {Object.entries(selectedAlertTypes).map(([type, enabled], index) => (
              <div
                key={type}
                className={`p-4 flex items-center justify-between ${
                  index !== 0 ? 'border-t border-gray-700' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-blue-400" />
                  <p className="text-white font-semibold capitalize">{type}</p>
                </div>
                <button
                  onClick={() => toggleAlertType(type as keyof typeof selectedAlertTypes)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    enabled ? 'bg-blue-600' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      enabled ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Preferências */}
        <div className="space-y-3">
          <h3 className="text-white font-bold px-1">Preferências</h3>
          
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-white font-semibold">Localização</p>
                  <p className="text-gray-400 text-xs">Compartilhar localização em tempo real</p>
                </div>
              </div>
              <button
                onClick={() => setLocationEnabled(!locationEnabled)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  locationEnabled ? 'bg-blue-600' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    locationEnabled ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="border-t border-gray-700 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {darkMode ? (
                  <Moon className="w-5 h-5 text-blue-400" />
                ) : (
                  <Sun className="w-5 h-5 text-yellow-400" />
                )}
                <div>
                  <p className="text-white font-semibold">Modo Escuro</p>
                  <p className="text-gray-400 text-xs">Tema escuro ativado</p>
                </div>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  darkMode ? 'bg-blue-600' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    darkMode ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Conta e Segurança */}
        <div className="space-y-3">
          <h3 className="text-white font-bold px-1">Conta e Segurança</h3>
          
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
            <Link href="/configuracoes/email" className="p-4 flex items-center justify-between hover:bg-gray-700/30 transition-colors">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <p className="text-white font-semibold">Email</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>

            <div className="border-t border-gray-700" />

            <Link href="/configuracoes/senha" className="p-4 flex items-center justify-between hover:bg-gray-700/30 transition-colors">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-blue-400" />
                <p className="text-white font-semibold">Senha</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>

            <div className="border-t border-gray-700" />

            <Link href="/configuracoes/privacidade" className="p-4 flex items-center justify-between hover:bg-gray-700/30 transition-colors">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-blue-400" />
                <p className="text-white font-semibold">Privacidade</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
          </div>
        </div>

        {/* Suporte */}
        <div className="space-y-3">
          <h3 className="text-white font-bold px-1">Suporte</h3>
          
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
            <Link href="/ajuda" className="p-4 flex items-center justify-between hover:bg-gray-700/30 transition-colors">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-blue-400" />
                <p className="text-white font-semibold">Central de Ajuda</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>

            <div className="border-t border-gray-700" />

            <Link href="/feedback" className="p-4 flex items-center justify-between hover:bg-gray-700/30 transition-colors">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-blue-400" />
                <p className="text-white font-semibold">Enviar Feedback</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
          </div>
        </div>

        {/* Sair */}
        <button className="w-full bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 rounded-xl p-4 flex items-center justify-center gap-3 transition-colors">
          <LogOut className="w-5 h-5 text-red-400" />
          <span className="text-red-400 font-semibold">Sair da Conta</span>
        </button>

        {/* Versão */}
        <div className="text-center text-gray-500 text-sm py-4">
          <p>Vizinhança Segura v1.0.0</p>
          <p className="text-xs mt-1">© 2024 Todos os direitos reservados</p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
