import React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../types/article';
import { formatDate } from '../utils/dateUtils';

interface RelatedArticlesProps {
  currentArticleId: string;
  articles: Article[];
}

export default function RelatedArticles({ currentArticleId, articles }: RelatedArticlesProps) {
  const relatedArticles = articles
    .filter(article => article.id !== currentArticleId)
    .slice(0, 3);

  return (
    <section className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        You May Also Like
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedArticles.map((article) => (
          <Link
            key={article.id}
            to={`/article/${article.id}`}
            className="group"
          >
            <article className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-4">
                <span className="px-2 py-1 text-xs font-semibold bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 rounded-full">
                  {article.category}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-200 line-clamp-2">
                  {article.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                  {article.description}
                </p>
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>{formatDate(article.date)}</span>
                  <span>{article.readTime}</span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}