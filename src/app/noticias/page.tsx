'use client';

import Link from 'next/link';
import { ArrowLeft, MapPin, Clock, TrendingUp } from 'lucide-react';
import BottomNav from '@/components/custom/bottom-nav';
import { cityNews } from '@/lib/mock-data';

export default function NoticiasPage() {
  return (
    <div className="min-h-screen bg-gray-950 pb-20">
      <header className="bg-gray-900 border-b border-gray-800 px-4 py-4 sticky top-0 z-40">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Link href="/" className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-white" />
          </Link>
          <h1 className="text-lg font-bold text-white">Notícias da Cidade</h1>
          <div className="w-9"></div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-white text-xl font-bold mb-2">Últimas Notícias</h2>
          <p className="text-gray-400 text-sm">Fique por dentro do que acontece na sua cidade</p>
        </div>

        <div className="space-y-4">
          {cityNews.map((news) => (
            <Link
              key={news.id}
              href={`/noticias/${news.id}`}
              className="block bg-gray-800/50 rounded-xl overflow-hidden hover:bg-gray-800/70 transition-all border border-gray-700"
            >
              <img 
                src={news.image} 
                alt={news.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-blue-500/20 text-blue-400 text-xs font-semibold px-3 py-1 rounded-full">
                    {news.category}
                  </span>
                  <div className="flex items-center gap-1 text-gray-500 text-xs">
                    <Clock className="w-3 h-3" />
                    <span>{news.timeAgo}</span>
                  </div>
                </div>
                
                <h3 className="text-white font-bold text-lg mb-2">{news.title}</h3>
                
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">{news.summary}</p>
                
                <div className="flex items-center justify-between pt-3 border-t border-gray-700">
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{news.neighborhood}</span>
                  </div>
                  <TrendingUp className="w-4 h-4 text-blue-400" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
