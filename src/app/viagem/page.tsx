'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Navigation, MapPin, AlertTriangle, Shield, Clock, TrendingUp } from 'lucide-react';
import BottomNav from '@/components/custom/bottom-nav';

export default function ViagemPage() {
  const [modoAtivo, setModoAtivo] = useState(false);

  return (
    <div className="min-h-screen bg-gray-950 pb-20">
      <header className="bg-gray-900 border-b border-gray-800 px-4 py-4 sticky top-0 z-40">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Link href="/" className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-white" />
          </Link>
          <h1 className="text-lg font-bold text-white">Modo Viagem</h1>
          <div className="w-9"></div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Toggle Modo Viagem */}
        <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/30 rounded-2xl p-6 border border-purple-700/30">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-purple-500/20 p-3 rounded-xl">
                <Navigation className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h2 className="text-white font-bold text-lg">Modo Viagem</h2>
                <p className="text-purple-200 text-sm">Monitoramento contínuo</p>
              </div>
            </div>
            <button
              onClick={() => setModoAtivo(!modoAtivo)}
              className={`relative w-16 h-8 rounded-full transition-colors ${
                modoAtivo ? 'bg-purple-600' : 'bg-gray-600'
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform shadow-lg ${
                  modoAtivo ? 'translate-x-8' : ''
                }`}
              />
            </button>
          </div>

          {modoAtivo && (
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
              <p className="text-purple-200 text-sm">
                ✓ Você será alertado automaticamente sobre riscos na sua rota
              </p>
            </div>
          )}
        </div>

        {/* Status da Área Atual */}
        <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700">
          <h3 className="text-white font-bold mb-4">Área Atual</h3>
          
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-5 h-5 text-blue-400" />
            <div className="flex-1">
              <p className="text-white font-medium">Pinheiros</p>
              <p className="text-gray-400 text-sm">São Paulo, SP</p>
            </div>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-yellow-400 font-semibold mb-1">Risco Médio</p>
                <p className="text-yellow-200/80 text-sm">12 alertas nas últimas 2 horas</p>
              </div>
            </div>
          </div>
        </div>

        {/* Alertas Automáticos */}
        <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700">
          <h3 className="text-white font-bold mb-4">Alertas Automáticos</h3>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-red-400 font-semibold text-sm mb-1">Área de risco detectada</p>
                <p className="text-red-200/80 text-xs">Assalto reportado a 180m da sua localização</p>
                <p className="text-red-300/60 text-xs mt-1">há 15 min</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-orange-400 font-semibold text-sm mb-1">Movimento suspeito</p>
                <p className="text-orange-200/80 text-xs">Grupo observando carros a 320m</p>
                <p className="text-orange-300/60 text-xs mt-1">há 32 min</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sugestões de Rota Segura */}
        <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700">
          <h3 className="text-white font-bold mb-4">Rotas Seguras</h3>
          
          <Link
            href="/mapa"
            className="block bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-4 hover:from-blue-700 hover:to-blue-800 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/10 p-2 rounded-lg">
                  <Navigation className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold">Calcular Rota Segura</p>
                  <p className="text-blue-200 text-sm">Evite áreas de risco</p>
                </div>
              </div>
              <ArrowLeft className="w-5 h-5 text-white rotate-180" />
            </div>
          </Link>
        </div>

        {/* Estatísticas */}
        <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700">
          <h3 className="text-white font-bold mb-4">Suas Estatísticas</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <p className="text-gray-400 text-xs">Tempo viajando</p>
              </div>
              <p className="text-white text-2xl font-bold">2h 15m</p>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <p className="text-gray-400 text-xs">Riscos evitados</p>
              </div>
              <p className="text-white text-2xl font-bold">8</p>
            </div>
          </div>
        </div>

        {/* Informação */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-blue-400 font-semibold mb-1">Como funciona?</h4>
              <p className="text-blue-200/80 text-sm">
                O Modo Viagem monitora continuamente sua localização e envia alertas automáticos quando você se aproxima de áreas de risco.
              </p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
