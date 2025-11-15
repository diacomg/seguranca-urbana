'use client';

import Link from 'next/link';
import { Shield, MapPin, Cloud, Sun, CloudRain, Wind, Map, Navigation, Users, Search, AlertTriangle, TrendingUp, TrendingDown, Minus, Settings } from 'lucide-react';
import BottomNav from '@/components/custom/bottom-nav';
import { currentNeighborhood, currentWeather, recentAlerts, quickActions, cityNews } from '@/lib/mock-data';

export default function Home() {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'baixo': return 'text-green-400 bg-green-500/10 border-green-500/20';
      case 'medio': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      case 'alto': return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
      case 'critico': return 'text-red-400 bg-red-500/10 border-red-500/20';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

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
      case 'alta': return 'border-l-red-500 bg-red-500/5';
      case 'media': return 'border-l-orange-500 bg-orange-500/5';
      case 'baixa': return 'border-l-yellow-500 bg-yellow-500/5';
      default: return 'border-l-gray-500 bg-gray-500/5';
    }
  };

  const getTrendIcon = () => {
    switch (currentNeighborhood.safetyTrend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-400" />;
      default: return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-6 shadow-xl">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 backdrop-blur-sm p-2 rounded-xl">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Vizinhança Segura</h1>
                <div className="flex items-center gap-1 text-blue-100 text-sm">
                  <MapPin className="w-3 h-3" />
                  <span>{currentNeighborhood.name}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link 
                href="/configuracoes"
                className="bg-white/10 backdrop-blur-sm p-2 rounded-xl hover:bg-white/20 transition-all"
              >
                <Settings className="w-5 h-5 text-white" />
              </Link>
              <Link 
                href="/alertas"
                className="relative bg-white/10 backdrop-blur-sm p-2 rounded-xl hover:bg-white/20 transition-all"
              >
                <AlertTriangle className="w-5 h-5 text-white" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {currentNeighborhood.recentAlerts}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Cartão Segurança do Bairro */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 shadow-2xl">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-white mb-1">Segurança do Bairro</h2>
              <p className="text-gray-400 text-sm">{currentNeighborhood.name}</p>
            </div>
            {getTrendIcon()}
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-bold text-white">{currentNeighborhood.riskScore}</span>
                <span className="text-gray-400 text-sm">/10</span>
              </div>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium ${getRiskColor(currentNeighborhood.riskLevel)}`}>
                <Shield className="w-4 h-4" />
                Risco {currentNeighborhood.riskLevel}
              </div>
            </div>

            {/* Mini Heatmap Visual */}
            <div className="w-24 h-24 bg-gray-950 rounded-xl p-2 border border-gray-700">
              <div className="w-full h-full relative">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-orange-500/30 to-red-500/40 rounded-lg blur-sm"></div>
                <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <div className="absolute bottom-3 left-3 w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-500 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-700">
            <div>
              <p className="text-gray-400 text-xs mb-1">Alertas recentes</p>
              <p className="text-white font-bold">{currentNeighborhood.recentAlerts}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs mb-1">População</p>
              <p className="text-white font-bold">{(currentNeighborhood.population / 1000).toFixed(0)}k</p>
            </div>
          </div>
        </div>

        {/* Clima */}
        <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 rounded-2xl p-5 border border-blue-700/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-blue-500/20 p-3 rounded-xl">
                <Cloud className="w-8 h-8 text-blue-300" />
              </div>
              <div>
                <p className="text-3xl font-bold text-white">{currentWeather.temp}°</p>
                <p className="text-blue-200 text-sm">{currentWeather.condition}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-blue-200 text-sm">Máx/Mín</p>
              <p className="text-white font-semibold">{currentWeather.high}° / {currentWeather.low}°</p>
            </div>
          </div>
        </div>

        {/* Acesso Rápido */}
        <div>
          <h3 className="text-white font-bold mb-3 px-1">Acesso Rápido</h3>
          <div className="grid grid-cols-4 gap-3">
            {quickActions.map((action) => {
              const IconComponent = action.icon === 'Map' ? Map : 
                                   action.icon === 'Navigation' ? Navigation :
                                   action.icon === 'Users' ? Users : Search;
              
              return (
                <Link
                  key={action.id}
                  href={action.href}
                  className="group"
                >
                  <div className={`bg-gradient-to-br ${action.color} rounded-2xl p-4 flex flex-col items-center justify-center gap-2 shadow-lg hover:scale-105 transition-transform`}>
                    <IconComponent className="w-6 h-6 text-white" />
                    <span className="text-white text-xs font-medium text-center">{action.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Alertas Recentes */}
        <div>
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="text-white font-bold">Alertas Recentes</h3>
            <Link href="/comunidade" className="text-blue-400 text-sm hover:text-blue-300">
              Ver todos
            </Link>
          </div>
          <div className="space-y-3">
            {recentAlerts.slice(0, 3).map((alert) => (
              <Link
                key={alert.id}
                href={`/alertas/${alert.id}`}
                className={`block bg-gray-800/50 rounded-xl p-4 border-l-4 ${getAlertColor(alert.urgency)} hover:bg-gray-800/70 transition-all`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{getAlertIcon(alert.type)}</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-semibold mb-1">{alert.title}</h4>
                    <p className="text-gray-400 text-sm mb-2 line-clamp-1">{alert.description}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{alert.distance}</span>
                      <span>•</span>
                      <span>{alert.timeAgo}</span>
                      <span>•</span>
                      <span className="text-blue-400">{alert.confirmations} confirmações</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Notícias da Cidade */}
        <div>
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="text-white font-bold">Notícias da Cidade</h3>
            <Link href="/noticias" className="text-blue-400 text-sm hover:text-blue-300">
              Ver todas
            </Link>
          </div>
          <div className="space-y-3">
            {cityNews.slice(0, 2).map((news) => (
              <Link
                key={news.id}
                href={`/noticias/${news.id}`}
                className="block bg-gray-800/50 rounded-xl overflow-hidden hover:bg-gray-800/70 transition-all"
              >
                <div className="flex gap-3">
                  <img 
                    src={news.image} 
                    alt={news.title}
                    className="w-24 h-24 object-cover"
                  />
                  <div className="flex-1 p-3">
                    <h4 className="text-white font-semibold text-sm mb-2 line-clamp-2">{news.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <MapPin className="w-3 h-3" />
                      <span>{news.neighborhood}</span>
                      <span>•</span>
                      <span>{news.timeAgo}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
