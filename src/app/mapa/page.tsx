'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, MapPin, Plus, Shield, AlertTriangle, Navigation2, Layers } from 'lucide-react';
import dynamic from 'next/dynamic';
import BottomNav from '@/components/custom/bottom-nav';
import { recentAlerts } from '@/lib/mock-data';

// Importação dinâmica do mapa para evitar problemas de SSR
const MapComponent = dynamic(() => import('@/components/custom/live-map'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-400">Carregando mapa ao vivo...</p>
      </div>
    </div>
  ),
});

export default function MapaPage() {
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 pb-20">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 px-4 py-4 sticky top-0 z-40">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Link href="/" className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-white" />
          </Link>
          <h1 className="text-lg font-bold text-white">Mapa ao Vivo</h1>
          <div className="w-9"></div>
        </div>
      </header>

      {/* Mapa Interativo com Leaflet */}
      <div className="relative h-[calc(100vh-180px)] bg-gray-900">
        {mounted && <MapComponent showHeatmap={showHeatmap} />}

        {/* Legenda */}
        <div className="absolute top-4 left-4 bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-xl p-3 shadow-xl z-[1000]">
          <h3 className="text-white font-semibold text-sm mb-2">Legenda</h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-300">Alto risco</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-gray-300">Médio risco</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-300">Baixo risco</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></div>
              <span className="text-gray-300">Sua localização</span>
            </div>
          </div>
        </div>

        {/* Stats Card */}
        <div className="absolute top-4 right-4 bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-xl p-3 shadow-xl z-[1000]">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-blue-400" />
            <span className="text-white font-semibold text-sm">Área Atual</span>
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex items-center justify-between gap-3">
              <span className="text-gray-400">Risco:</span>
              <span className="text-yellow-400 font-semibold">Médio</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-gray-400">Alertas:</span>
              <span className="text-white font-semibold">{recentAlerts.length}</span>
            </div>
          </div>
        </div>

        {/* Toggle Heatmap */}
        <button
          onClick={() => setShowHeatmap(!showHeatmap)}
          className={`absolute bottom-4 left-4 px-4 py-2 rounded-xl font-semibold text-sm shadow-xl transition-all z-[1000] ${
            showHeatmap 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4" />
            <span>{showHeatmap ? 'Ocultar' : 'Mostrar'} Mapa de Calor</span>
          </div>
        </button>
      </div>

      {/* Botões Flutuantes */}
      <div className="fixed bottom-24 right-4 flex flex-col gap-3 z-40">
        <Link
          href="/viagem"
          className="bg-gradient-to-r from-purple-600 to-purple-700 p-4 rounded-full shadow-2xl hover:scale-110 transition-transform"
        >
          <Navigation2 className="w-6 h-6 text-white" />
        </Link>
        <Link
          href="/alertas"
          className="bg-gradient-to-r from-red-600 to-red-700 p-4 rounded-full shadow-2xl hover:scale-110 transition-transform animate-pulse"
        >
          <Plus className="w-6 h-6 text-white" />
        </Link>
      </div>

      {/* Banner de Aviso */}
      <div className="fixed bottom-20 left-4 right-4 z-30 max-w-md mx-auto">
        <div className="bg-orange-500/90 backdrop-blur-sm border border-orange-400 rounded-xl p-3 shadow-2xl">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-white font-semibold text-sm mb-1">Área de atenção</h4>
              <p className="text-white/90 text-xs">3 alertas recentes em um raio de 300m</p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
