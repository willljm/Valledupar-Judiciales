import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Eye} from 'lucide-react';
// Importar iconos faltantes específicamente de lucide-react
import { Facebook, Twitter, MessageCircle } from 'lucide-react';
import { useArticles } from '../context/ArticlesContext';
import ArticleCard from '../components/ArticleCard';
import { ref, update } from 'firebase/database';
import { db } from '../firebase/config';
import AdBanner from '../components/AdBanner';
import CommentSection from '../components/CommentSection';
import { getRelativeTime } from '../utils/dateUtils';

export default function ArticlePage() {
  const { id } = useParams();
  const { articles, loading } = useArticles();
  const viewUpdated = useRef(false);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  const article = articles.find(a => a.id === id);

  useEffect(() => {
    const updateViews = async () => {
      if (article && !viewUpdated.current) {
        viewUpdated.current = true;
        const articleRef = ref(db, `articles/${id}`);
        const currentViews = article.views || 0;
        await update(articleRef, {
          views: currentViews + 1
        });
      }
    };

    updateViews();
  }, [id, articles]);

  useEffect(() => {
    if (article) {
      document.title = `${article.title} | Judiciales Valledupar`;
    }
    
    // Restaurar el título original cuando se desmonte el componente
    return () => {
      document.title = 'Judiciales Valledupar | Portal de noticias';
    };
  }, [article]);

  const handleShare = (platform: 'facebook' | 'twitter' | 'whatsapp') => {
    if (!article) return;
    
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(article.title);
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      whatsapp: `https://wa.me/?text=${text}%20${url}`
    };

    window.open(shareUrls[platform], '_blank');
  };

  // Obtener artículos relacionados por categoría o tags
  const relatedArticles = articles
    .filter(a => a.id !== id && (
      a.category === article?.category ||
      a.tags.some(tag => article?.tags.includes(tag))
    ))
    .slice(0, 3);

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Artículo no encontrado
        </h1>
        <Link to="/" className="mt-4 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 inline-flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Columna principal */}
          <article className="flex-1">
            <div className="flex justify-between items-start mb-6">
              <Link to="/" className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al inicio
              </Link>
            </div>

            <header className="space-y-4 mb-8">
              <div className="flex items-center space-x-4">
                <span className="px-3 py-1 text-sm font-semibold bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full">
                  {article.category}
                </span>
                {article.subcategory && (
                  <span className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                    {article.subcategory}
                  </span>
                )}
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{article.title}</h1>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{article.author.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{article.author.role}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{getRelativeTime(article.date)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4" />
                    <span>{article.views} views</span>
                  </div>
                </div>
              </div>
            </header>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-[400px] object-cover rounded-xl mb-8"
              />
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 font-medium">
                {article.description}
              </p>
              {article.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-800 dark:text-gray-200">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/tag/${tag}`}
                    className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4 mt-6 border-t pt-6">
              <button
                onClick={() => handleShare('facebook')}
                className="p-2 hover:bg-blue-100 rounded-full transition-colors"
              >
                <Facebook className="h-5 w-5 text-blue-600" />
              </button>
              <button
                onClick={() => handleShare('twitter')}
                className="p-2 hover:bg-blue-100 rounded-full transition-colors"
              >
                <Twitter className="h-5 w-5 text-blue-400" />
              </button>
              <button
                onClick={() => handleShare('whatsapp')}
                className="p-2 hover:bg-green-100 rounded-full transition-colors"
              >
                <MessageCircle className="h-5 w-5 text-green-500" />
              </button>
            </div>

            {/* Agregar la sección de comentarios */}
            {id && <CommentSection articleId={id} />}
          </article>

          <aside className="lg:w-96">
            <div className="sticky top-4">
              <AdBanner />
            </div>
          </aside>
        </div>
      </div>

      {relatedArticles.length > 0 && (
        <section className="w-full bg-gray-50 dark:bg-gray-800 py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Te puede interesar
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {relatedArticles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}