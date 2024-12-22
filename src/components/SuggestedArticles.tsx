import React from 'react';
import { Article } from '../types/article';
import ArticleCard from './ArticleCard';

interface SuggestedArticlesProps {
  articles: Article[];
}

export default function SuggestedArticles({ articles }: SuggestedArticlesProps) {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Te puede interesar
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}