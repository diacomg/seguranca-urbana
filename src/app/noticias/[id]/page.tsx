'use client';

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, Clock, Share2 } from 'lucide-react';
import { cityNews } from '@/lib/mock-data';
import BottomNav from '@/components/custom/bottom-nav';

export default function NewsDetailPage() {
  const params = useParams();
  const router = useRouter();
  const newsId = params.id as string;

  const news = cityNews.find(n => n.id === newsId);

  if (!news) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 pb-20">
        <div className="max-w-md mx-auto px-4 py-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar</span>
          </button>
          <div className="text-center py-12">
            <p className="text-6xl mb-4">📰</p>
            <h2 className="text-xl font-bold text-white mb-2">Notícia não encontrada</h2>
            <p className="text-gray-400">Esta notícia pode ter sido removida ou não existe.</p>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-6 shadow-xl border-b border-gray-700">
        <div className="max-w-md mx-auto">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar</span>
          </button>
        </div>
      </header>

      <div className="max-w-md mx-auto">
        {/* Imagem destaque */}
        <div className="relative h-64 overflow-hidden">
          <img 
            src={news.image} 
            alt={news.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent"></div>
        </div>

        <div className="px-4 -mt-8 relative z-10 space-y-6 pb-6">
          {/* Categoria */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-sm font-medium">
            {news.category}
          </div>

          {/* Título */}
          <h1 className="text-2xl font-bold text-white leading-tight">
            {news.title}
          </h1>

          {/* Meta informações */}
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{news.neighborhood}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{news.timeAgo}</span>
            </div>
          </div>

          {/* Conteúdo */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 shadow-2xl">
            <p className="text-gray-300 leading-relaxed mb-4">
              {news.summary}
            </p>
            
            <p className="text-gray-300 leading-relaxed mb-4">
              A situação tem gerado preocupação entre moradores e comerciantes da região, que pedem mais atenção das autoridades. Segundo relatos, os incidentes têm ocorrido principalmente durante o período noturno.
            </p>

            <p className="text-gray-300 leading-relaxed">
              As autoridades orientam a população a manter atenção redobrada e reportar qualquer atividade suspeita através dos canais oficiais. O policiamento na área foi reforçado como medida preventiva.
            </p>
          </div>

          {/* Ações */}
          <div className="space-y-3">
            <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg">
              <Share2 className="w-5 h-5" />
              Compartilhar Notícia
            </button>
          </div>

          {/* Notícias relacionadas */}
          <div className="pt-6 border-t border-gray-700">
            <h3 className="text-white font-bold mb-4">Notícias Relacionadas</h3>
            <div className="space-y-3">
              {cityNews.filter(n => n.id !== newsId).slice(0, 2).map((relatedNews) => (
                <button
                  key={relatedNews.id}
                  onClick={() => router.push(`/noticias/${relatedNews.id}`)}
                  className="block w-full bg-gray-800/50 rounded-xl overflow-hidden hover:bg-gray-800/70 transition-all text-left"
                >
                  <div className="flex gap-3">
                    <img 
                      src={relatedNews.image} 
                      alt={relatedNews.title}
                      className="w-20 h-20 object-cover"
                    />
                    <div className="flex-1 p-3">
                      <h4 className="text-white font-semibold text-sm mb-2 line-clamp-2">
                        {relatedNews.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>{relatedNews.neighborhood}</span>
                        <span>•</span>
                        <span>{relatedNews.timeAgo}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
