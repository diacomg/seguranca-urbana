'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldAlert, Eye, AlertTriangle, Volume2, CloudRain, Car, Flame, Camera, MapPin, Info } from 'lucide-react';
import BottomNav from '@/components/custom/bottom-nav';
import { alertTypes } from '@/lib/mock-data';
import type { AlertType, UrgencyLevel } from '@/lib/types';

export default function AlertasPage() {
  const [step, setStep] = useState<'quick' | 'detailed' | 'success'>('quick');
  const [selectedType, setSelectedType] = useState<AlertType | null>(null);
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState<UrgencyLevel>('media');
  const [photo, setPhoto] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldAlert': return ShieldAlert;
      case 'Eye': return Eye;
      case 'AlertTriangle': return AlertTriangle;
      case 'Volume2': return Volume2;
      case 'CloudRain': return CloudRain;
      case 'Car': return Car;
      case 'Flame': return Flame;
      default: return AlertTriangle;
    }
  };

  const handleQuickAlert = (type: AlertType) => {
    setSelectedType(type);
    setStep('detailed');
  };

  const handleSubmit = () => {
    setStep('success');
    setTimeout(() => {
      window.location.href = '/mapa';
    }, 2000);
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-gradient-to-br from-green-500 to-green-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Alerta enviado com sucesso!</h2>
          <p className="text-gray-400 mb-2">Sua comunidade foi notificada</p>
          <p className="text-sm text-gray-500">Aguardando validação...</p>
        </div>
      </div>
    );
  }

  if (step === 'detailed') {
    return (
      <div className="min-h-screen bg-gray-950 pb-20">
        <header className="bg-gray-900 border-b border-gray-800 px-4 py-4 sticky top-0 z-40">
          <div className="max-w-md mx-auto flex items-center justify-between">
            <button 
              onClick={() => setStep('quick')}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-lg font-bold text-white">Detalhar Alerta</h1>
            <div className="w-9"></div>
          </div>
        </header>

        <div className="max-w-md mx-auto px-4 py-6 space-y-6">
          {/* Tipo Selecionado */}
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <p className="text-gray-400 text-sm mb-2">Tipo de alerta</p>
            <div className="flex items-center gap-3">
              {alertTypes.map((type) => {
                if (type.type === selectedType) {
                  const Icon = getIcon(type.icon);
                  return (
                    <div key={type.type} className={`${type.color} rounded-xl p-3 flex items-center gap-2`}>
                      <Icon className="w-5 h-5 text-white" />
                      <span className="text-white font-semibold">{type.label}</span>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>

          {/* Upload de Foto */}
          <div>
            <label className="block text-white font-semibold mb-3">Foto (opcional)</label>
            <div className="bg-gray-800/50 border-2 border-dashed border-gray-700 rounded-xl p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
              {photo ? (
                <img src={photo} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
              ) : (
                <div>
                  <Camera className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                  <p className="text-gray-400 text-sm">Toque para adicionar foto</p>
                </div>
              )}
            </div>
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-white font-semibold mb-3">Descrição</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva o que aconteceu..."
              className="w-full bg-gray-800/50 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none h-32"
            />
          </div>

          {/* Localização */}
          <div>
            <label className="block text-white font-semibold mb-3">Localização</label>
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
              <div className="flex items-start gap-3 mb-3">
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-white font-medium">Rua dos Pinheiros, 450</p>
                  <p className="text-gray-400 text-sm">Pinheiros, São Paulo</p>
                </div>
              </div>
              <button className="text-blue-400 text-sm hover:text-blue-300 transition-colors">
                Ajustar no mapa
              </button>
            </div>
          </div>

          {/* Urgência */}
          <div>
            <label className="block text-white font-semibold mb-3">Nível de urgência</label>
            <div className="grid grid-cols-3 gap-3">
              {(['baixa', 'media', 'alta'] as UrgencyLevel[]).map((level) => (
                <button
                  key={level}
                  onClick={() => setUrgency(level)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    urgency === level
                      ? level === 'alta' 
                        ? 'bg-red-500/20 border-red-500 text-red-400'
                        : level === 'media'
                        ? 'bg-orange-500/20 border-orange-500 text-orange-400'
                        : 'bg-yellow-500/20 border-yellow-500 text-yellow-400'
                      : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:border-gray-600'
                  }`}
                >
                  <span className="font-semibold capitalize">{level}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Informativo de Anonimato */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-blue-400 font-semibold mb-1">100% Anônimo</h4>
                <p className="text-blue-200/80 text-sm">Sua identidade não será revelada. Apenas a localização aproximada será compartilhada.</p>
              </div>
            </div>
          </div>

          {/* Botão Enviar */}
          <button
            onClick={handleSubmit}
            disabled={!description.trim()}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-4 rounded-xl hover:from-red-700 hover:to-red-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
          >
            Enviar Alerta
          </button>
        </div>

        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 pb-20">
      <header className="bg-gray-900 border-b border-gray-800 px-4 py-4 sticky top-0 z-40">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Link href="/" className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-white" />
          </Link>
          <h1 className="text-lg font-bold text-white">Enviar Alerta</h1>
          <div className="w-9"></div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-white text-xl font-bold mb-2">O que está acontecendo?</h2>
          <p className="text-gray-400 text-sm">Selecione o tipo de alerta para notificar sua comunidade</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {alertTypes.map((type) => {
            const Icon = getIcon(type.icon);
            return (
              <button
                key={type.type}
                onClick={() => handleQuickAlert(type.type as AlertType)}
                className={`${type.color} rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:scale-105 transition-transform shadow-xl`}
              >
                <Icon className="w-8 h-8 text-white" />
                <span className="text-white font-semibold text-center">{type.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 bg-gray-800/30 border border-gray-700 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white font-semibold mb-1">Alertas Anônimos</h4>
              <p className="text-gray-400 text-sm">Todos os alertas são enviados de forma anônima. Sua privacidade está protegida.</p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
