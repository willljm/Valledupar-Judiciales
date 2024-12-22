import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useArticles } from '../context/ArticlesContext';
import ArticleCard from '../components/ArticleCard';
import Footer from '../components/Footer';
import { categories } from '../data/categories';

export default function CategoryPage() {
  const { category } = useParams();
  const { articles } = useArticles();

  // Verificar si la categoría existe
  const categoryData = categories.find(
    cat => cat.id === category?.toLowerCase()
  );

  if (!categoryData) {
    return <Navigate to="/" replace />;
  }

  const categoryArticles = articles.filter(
    article => article.category.toLowerCase() === categoryData.name.toLowerCase()
  );

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white capitalize">
          {categoryData.name}
        </h1>
        
        {categoryArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No hay noticias en esta categoría.
          </p>
        )}
      </main>
      <Footer />
    </>
  );
}
