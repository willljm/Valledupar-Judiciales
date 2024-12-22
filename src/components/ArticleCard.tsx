import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Share2, Trash2, Clock } from 'lucide-react';
import { Article } from '../types/article';
import { useArticles } from '../context/ArticlesContext';
import { getRelativeTime } from '../utils/dateUtils';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export default function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const { isAdmin, deleteArticle } = useArticles();

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const url = `${window.location.origin}/article/${article.id}`;
    const shareData = {
      title: article.title,
      text: article.description,
      url: url
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(url)}`;
        window.open(shareUrl, '_blank');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <Link to={`/article/${article.id}`} className="block group">
      <article className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        {isAdmin && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (window.confirm('¿Estás seguro de eliminar este artículo?')) {
                deleteArticle(article.id);
              }
            }}
            className="absolute top-2 right-2 z-10 p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}

        <div className="relative overflow-hidden">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
          {article.subcategory && (
            <span className="absolute top-2 left-2 px-2 py-1 text-xs font-medium bg-black/50 text-white rounded">
              {article.subcategory}
            </span>
          )}
        </div>

        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-2 py-1 text-xs font-semibold bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 rounded-full">
              {article.category}
            </span>
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{getRelativeTime(article.date)}</span>
              </div>
              <button
                onClick={handleShare}
                className="p-1 hover:text-red-500 transition-colors"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400">
            {article.title}
          </h3>

          <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
            {article.description}
          </p>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="h-6 w-6 rounded-full"
              />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {article.author.name}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Eye className="h-4 w-4" />
              <span>{article.views}</span>
            </div>
          </div>

          {article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}