import React from 'react';
import { useArticles } from '../context/ArticlesContext';
import { Article } from '../types/article';
import NewsCarousel from '../components/NewsCarousel';
import ArticleCard from '../components/ArticleCard';
import AdBanner from '../components/AdBanner';
import Footer from '../components/Footer';
import SuggestedArticles from '../components/SuggestedArticles';

// Función helper para obtener artículos aleatorios
const getRandomArticles = (articles: Article[], count: number): Article[] => {
  const shuffled = [...articles]
    .sort(() => 0.5 - Math.random())
    .slice(0, count);
  return shuffled;
};

export default function HomePage() {
  const { articles, loading } = useArticles();
  
  console.log('Estado actual:', { loading, articlesCount: articles.length });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!articles.length) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-600 dark:text-gray-300">
          No hay artículos disponibles
        </p>
      </div>
    );
  }
  
  // Ordenar artículos por fecha
  const latestArticles = [...articles].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Obtener 3 artículos aleatorios para sugerencias
  const suggestedArticles = getRandomArticles(articles, 3);

  return (
    <div className="w-full overflow-x-hidden">
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="w-full overflow-hidden">
            <NewsCarousel articles={latestArticles.slice(0, 5)} />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Últimas Noticias
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {latestArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </section>
            </div>
            
            <div>
              <AdBanner />
            </div>
          </div>
        </div>
      </main>
      <div className="w-full">
        <SuggestedArticles articles={suggestedArticles} />
        <Footer />
      </div>
    </div>
  );
}