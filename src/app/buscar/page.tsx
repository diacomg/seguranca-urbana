'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, MapPin, Shield, TrendingUp, TrendingDown, AlertTriangle, Users } from 'lucide-react';
import BottomNav from '@/components/custom/bottom-nav';

const bairros = [
  {
    id: '1',
    nome: 'Pinheiros',
    cidade: 'São Paulo',
    risco: 6.8,
    nivel: 'medio',
    ocorrencias: 12,
    populacao: 65000,
    tendencia: 'stable',
    imagem: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=200&fit=crop'
  },
  {
    id: '2',
    nome: 'Vila Madalena',
    cidade: 'São Paulo',
    risco: 5.2,
    nivel: 'baixo',
    ocorrencias: 6,
    populacao: 42000,
    tendencia: 'up',
    imagem: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop'
  },
  {
    id: '3',
    nome: 'Jardins',
    cidade: 'São Paulo',
    risco: 4.5,
    nivel: 'baixo',
    ocorrencias: 4,
    populacao: 58000,
    tendencia: 'up',
    imagem: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=200&fit=crop'
  },
  {
    id: '4',
    nome: 'Centro',
    cidade: 'São Paulo',
    risco: 8.5,
    nivel: 'alto',
    ocorrencias: 28,
    populacao: 120000,
    tendencia: 'down',
    imagem: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=200&fit=crop'
  },
  {
    id: '5',
    nome: 'Moema',
    cidade: 'São Paulo',
    risco: 3.8,
    nivel: 'baixo',
    ocorrencias: 3,
    populacao: 48000,
    tendencia: 'up',
    imagem: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400&h=200&fit=crop'
  },
  {
    id: '6',
    nome: 'Itaim Bibi',
    cidade: 'São Paulo',
    risco: 5.9,
    nivel: 'medio',
    ocorrencias: 9,
    populacao: 52000,
    tendencia: 'stable',
    imagem: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=200&fit=crop'
  }
];

export default function BuscarPage() {
  const [busca, setBusca] = useState('');
  const [bairrosFiltrados, setBairrosFiltrados] = useState(bairros);

  const handleBusca = (valor: string) => {
    setBusca(valor);
    if (valor.trim() === '') {
      setBairrosFiltrados(bairros);
    } else {
      const filtrados = bairros.filter(b => 
        b.nome.toLowerCase().includes(valor.toLowerCase()) ||
        b.cidade.toLowerCase().includes(valor.toLowerCase())
      );
      setBairrosFiltrados(filtrados);
    }
  };

  const getRiskColor = (nivel: string) => {
    switch (nivel) {
      case 'baixo': return 'text-green-400 bg-green-500/10 border-green-500/20';
      case 'medio': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      case 'alto': return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
      case 'critico': return 'text-red-400 bg-red-500/10 border-red-500/20';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getTrendIcon = (tendencia: string) => {
    switch (tendencia) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-400" />;
      default: return <div className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 pb-20">
      <header className="bg-gray-900 border-b border-gray-800 px-4 py-4 sticky top-0 z-40">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Link href="/" className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-white" />
          </Link>
          <h1 className="text-lg font-bold text-white">Buscar Bairro</h1>
          <div className="w-9"></div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Barra de Busca */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={busca}
            onChange={(e) => handleBusca(e.target.value)}
            placeholder="Digite o nome do bairro..."
            className="w-full bg-gray-800/50 border border-gray-700 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Resultados */}
        <div>
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-white font-bold">
              {busca ? `Resultados (${bairrosFiltrados.length})` : 'Bairros Populares'}
            </h3>
          </div>

          {bairrosFiltrados.length === 0 ? (
            <div className="bg-gray-800/30 rounded-xl p-8 text-center">
              <Search className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">Nenhum bairro encontrado</p>
              <p className="text-gray-500 text-sm mt-1">Tente buscar por outro nome</p>
            </div>
          ) : (
            <div className="space-y-4">
              {bairrosFiltrados.map((bairro) => (
                <Link
                  key={bairro.id}
                  href={`/bairro/${bairro.id}`}
                  className="block bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 hover:bg-gray-800/70 transition-all"
                >
                  <img 
                    src={bairro.imagem} 
                    alt={bairro.nome}
                    className="w-full h-32 object-cover"
                  />
                  
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-white font-bold text-lg">{bairro.nome}</h4>
                        <div className="flex items-center gap-1 text-gray-400 text-sm">
                          <MapPin className="w-3 h-3" />
                          <span>{bairro.cidade}</span>
                        </div>
                      </div>
                      {getTrendIcon(bairro.tendencia)}
                    </div>

                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-white">{bairro.risco}</span>
                        <span className="text-gray-400 text-sm">/10</span>
                      </div>
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium ${getRiskColor(bairro.nivel)}`}>
                        <Shield className="w-3 h-3" />
                        Risco {bairro.nivel}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-700">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-orange-400" />
                        <div>
                          <p className="text-gray-400 text-xs">Ocorrências</p>
                          <p className="text-white font-semibold text-sm">{bairro.ocorrencias}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-400" />
                        <div>
                          <p className="text-gray-400 text-xs">População</p>
                          <p className="text-white font-semibold text-sm">{(bairro.populacao / 1000).toFixed(0)}k</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
