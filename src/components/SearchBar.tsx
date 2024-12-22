import React, { useState } from 'react';
import { Article } from '../types/article';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  articles: Article[];
}

export default function SearchBar({ articles }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setShowResults(false);
      setQuery('');
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          placeholder="Buscar noticias..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowResults(true);
          }}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </form>

      {showResults && query && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 overflow-hidden">
          {filteredArticles.length > 0 ? (
            <ul className="divide-y divide-gray-100 dark:divide-gray-700">
              {filteredArticles.map((article) => (
                <li key={article.id}>
                  <button
                    onClick={() => {
                      navigate(`/article/${article.id}`);
                      setShowResults(false);
                      setQuery('');
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                  >
                    <div className="flex items-start">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-1">
                          {article.title}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {article.category}
                        </p>
                      </div>
                      {article.imageUrl && (
                        <img
                          src={article.imageUrl}
                          alt=""
                          className="w-12 h-12 object-cover rounded ml-3"
                        />
                      )}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 text-center">
              No se encontraron resultados
            </div>
          )}
        </div>
      )}
    </div>
  );
}