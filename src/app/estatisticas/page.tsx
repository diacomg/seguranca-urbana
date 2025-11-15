'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  Shield, 
  MapPin, 
  Clock,
  Users,
  AlertTriangle,
  Calendar,
  BarChart3
} from 'lucide-react';
import BottomNav from '@/components/custom/bottom-nav';

const weeklyData = [
  { day: 'Seg', alerts: 12, risk: 6.5 },
  { day: 'Ter', alerts: 8, risk: 5.2 },
  { day: 'Qua', alerts: 15, risk: 7.8 },
  { day: 'Qui', alerts: 10, risk: 6.0 },
  { day: 'Sex', alerts: 18, risk: 8.5 },
  { day: 'Sáb', alerts: 22, risk: 9.2 },
  { day: 'Dom', alerts: 14, risk: 7.0 }
];

const alertsByType = [
  { type: 'Assalto', count: 45, percentage: 35, color: 'bg-red-500' },
  { type: 'Suspeito', count: 38, percentage: 30, color: 'bg-orange-500' },
  { type: 'Tiroteio', count: 25, percentage: 20, color: 'bg-yellow-500' },
  { type: 'Trânsito', count: 19, percentage: 15, color: 'bg-blue-500' }
];

const topNeighborhoods = [
  { name: 'Centro', alerts: 89, trend: 'up', change: '+12%' },
  { name: 'Jardim América', alerts: 67, trend: 'down', change: '-8%' },
  { name: 'Vila Nova', alerts: 54, trend: 'up', change: '+5%' },
  { name: 'Parque Industrial', alerts: 43, trend: 'stable', change: '0%' },
  { name: 'Bela Vista', alerts: 38, trend: 'down', change: '-15%' }
];

export default function EstatisticasPage() {
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('week');

  const maxAlerts = Math.max(...weeklyData.map(d => d.alerts));

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 pb-20">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 px-4 py-4 sticky top-0 z-40">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Link href="/" className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-white" />
          </Link>
          <h1 className="text-lg font-bold text-white">Estatísticas</h1>
          <div className="w-9"></div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Period Selector */}
        <div className="flex gap-2">
          {(['week', 'month', 'year'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`flex-1 py-2 px-4 rounded-xl font-semibold text-sm transition-all ${
                period === p
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {p === 'week' ? 'Semana' : p === 'month' ? 'Mês' : 'Ano'}
            </button>
          ))}
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 rounded-2xl p-4 border border-blue-700/30">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-blue-400" />
              <span className="text-blue-200 text-xs">Total de Alertas</span>
            </div>
            <p className="text-3xl font-bold text-white mb-1">127</p>
            <div className="flex items-center gap-1 text-xs text-green-400">
              <TrendingDown className="w-3 h-3" />
              <span>-8% vs semana anterior</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 rounded-2xl p-4 border border-purple-700/30">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-purple-400" />
              <span className="text-purple-200 text-xs">Índice de Risco</span>
            </div>
            <p className="text-3xl font-bold text-white mb-1">7.2</p>
            <div className="flex items-center gap-1 text-xs text-red-400">
              <TrendingUp className="w-3 h-3" />
              <span>+0.5 vs semana anterior</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 rounded-2xl p-4 border border-green-700/30">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-green-400" />
              <span className="text-green-200 text-xs">Usuários Ativos</span>
            </div>
            <p className="text-3xl font-bold text-white mb-1">2.4k</p>
            <div className="flex items-center gap-1 text-xs text-green-400">
              <TrendingUp className="w-3 h-3" />
              <span>+15% vs semana anterior</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-900/30 to-orange-800/20 rounded-2xl p-4 border border-orange-700/30">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-orange-400" />
              <span className="text-orange-200 text-xs">Tempo Médio</span>
            </div>
            <p className="text-3xl font-bold text-white mb-1">3.2m</p>
            <div className="flex items-center gap-1 text-xs text-green-400">
              <TrendingDown className="w-3 h-3" />
              <span>-12% vs semana anterior</span>
            </div>
          </div>
        </div>

        {/* Weekly Chart */}
        <div className="bg-gray-800/50 rounded-2xl p-5 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold">Alertas por Dia</h3>
            <BarChart3 className="w-5 h-5 text-blue-400" />
          </div>
          
          <div className="flex items-end justify-between gap-2 h-40">
            {weeklyData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col items-center justify-end flex-1">
                  <div
                    className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all hover:from-blue-500 hover:to-blue-300 relative group"
                    style={{ height: `${(data.alerts / maxAlerts) * 100}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {data.alerts} alertas
                    </div>
                  </div>
                </div>
                <span className="text-xs text-gray-400">{data.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts by Type */}
        <div className="bg-gray-800/50 rounded-2xl p-5 border border-gray-700">
          <h3 className="text-white font-bold mb-4">Alertas por Tipo</h3>
          <div className="space-y-4">
            {alertsByType.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300 text-sm">{item.type}</span>
                  <span className="text-white font-semibold text-sm">{item.count}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div
                    className={`${item.color} h-full rounded-full transition-all duration-500`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Neighborhoods */}
        <div className="bg-gray-800/50 rounded-2xl p-5 border border-gray-700">
          <h3 className="text-white font-bold mb-4">Bairros com Mais Alertas</h3>
          <div className="space-y-3">
            {topNeighborhoods.map((neighborhood, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-900/50 rounded-xl hover:bg-gray-900/70 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{neighborhood.name}</p>
                    <p className="text-gray-400 text-xs">{neighborhood.alerts} alertas</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold ${
                    neighborhood.trend === 'up' ? 'text-red-400' :
                    neighborhood.trend === 'down' ? 'text-green-400' :
                    'text-gray-400'
                  }`}>
                    {neighborhood.change}
                  </span>
                  {neighborhood.trend === 'up' && <TrendingUp className="w-4 h-4 text-red-400" />}
                  {neighborhood.trend === 'down' && <TrendingDown className="w-4 h-4 text-green-400" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Peak Hours */}
        <div className="bg-gray-800/50 rounded-2xl p-5 border border-gray-700">
          <h3 className="text-white font-bold mb-4">Horários de Pico</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-center">
              <Clock className="w-5 h-5 text-red-400 mx-auto mb-2" />
              <p className="text-white font-bold">18h-21h</p>
              <p className="text-red-400 text-xs">Alto risco</p>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-3 text-center">
              <Clock className="w-5 h-5 text-orange-400 mx-auto mb-2" />
              <p className="text-white font-bold">21h-00h</p>
              <p className="text-orange-400 text-xs">Médio risco</p>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3 text-center">
              <Clock className="w-5 h-5 text-yellow-400 mx-auto mb-2" />
              <p className="text-white font-bold">06h-09h</p>
              <p className="text-yellow-400 text-xs">Baixo risco</p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
