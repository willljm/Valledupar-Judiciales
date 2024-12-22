import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  X, Search, Plus, User, Settings,
  ChevronRight, Home, BookOpen, Bell,
  Moon, Sun, Shield
} from 'lucide-react';
import { useArticles } from '../context/ArticlesContext';
import { Article } from '../types/article';
import PublishNewsPopup from './PublishNewsPopup';
import SearchBar from './SearchBar';
import { categories } from '../data/categories';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
  toggleDark: () => void;
}

export default function MobileMenu({ isOpen, onClose, isDark, toggleDark }: MobileMenuProps) {
  const { isAdmin, setIsAdmin, addArticle, articles } = useArticles();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loginError, setLoginError] = useState('');

  // Añadir función de filtrado de artículos
  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    if (username === 'admin@admin.com' && password === 'Administrador1011') { 
      setIsAdmin(true);
      setShowLoginModal(false);
      setLoginError('');
    } else {
      setLoginError('Usuario o contraseña incorrectos');
    }
  };

  const handlePublish = (article: Article) => {
    addArticle(article);
    setShowPublishModal(false);
    onClose();
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
        <div className="fixed right-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-xl overflow-y-auto">
          <div className="p-4">
            {/* Cabecera del menú */}
            <div className="flex justify-between items-center pb-4 border-b">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Menú</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Buscador y Resultados */}
            <div className="mt-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar noticias..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                {searchQuery && (
                  <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 mt-1 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50 border dark:border-gray-700">
                    {filteredArticles.length > 0 ? (
                      <div className="divide-y divide-gray-100 dark:divide-gray-700">
                        {filteredArticles.map((article) => (
                          <Link
                            key={article.id}
                            to={`/article/${article.id}`}
                            onClick={() => {
                              setSearchQuery('');
                              onClose();
                            }}
                            className="block hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                          >
                            <div className="p-3 flex items-start">
                              {article.imageUrl && (
                                <img
                                  src={article.imageUrl}
                                  alt=""
                                  className="w-16 h-16 object-cover rounded-lg"
                                />
                              )}
                              <div className="flex-1 ml-3">
                                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                  {article.title}
                                </h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  {article.category} • {new Date(article.date).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 text-sm text-center text-gray-500 dark:text-gray-400">
                        No se encontraron resultados
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <nav className="mt-4">
              <Link to="/" className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200" onClick={onClose}>
                <Home className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-3" />
                <span>Inicio</span>
              </Link>
              <button
                onClick={toggleDark}
                className="mt-2 flex items-center w-full p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
              >
                {isDark ? (
                  <>
                    <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-3" />
                    <span>Modo Claro</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-3" />
                    <span>Modo Oscuro</span>
                  </>
                )}
              </button>
            </nav>

            <div className="mt-4 border-t pt-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-200 mb-2">Categorías</h3>
              <div className="space-y-1">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/category/${category.id}`}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={onClose}
                  >
                    <span className="text-gray-600 dark:text-gray-400">{category.name}</span>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Controles de Administrador */}
            <div className="mt-4 border-t pt-4">
              {isAdmin ? (
                <div className="space-y-2">
                  <div className="flex items-center p-3 bg-red-50 dark:bg-red-900/50 rounded-lg">
                    <Shield className="h-5 w-5 text-red-600 dark:text-red-400 mr-3" />
                    <span className="text-red-600 dark:text-red-400">Modo Administrador</span>
                  </div>
                  <button
                    onClick={() => setShowPublishModal(true)}
                    className="flex items-center w-full p-3 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg"
                  >
                    <Plus className="h-5 w-5 mr-3" />
                    <span>Nueva Noticia</span>
                  </button>
                  <button
                    onClick={() => setIsAdmin(false)}
                    className="flex items-center w-full p-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg"
                  >
                    <Settings className="h-5 w-5 mr-3" />
                    <span>Cerrar sesión</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
                >
                  <User className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-3" />
                  <span>Iniciar sesión como Admin</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>


      {showLoginModal && (
        <div className="md:hidden fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-xl font-bold mb-4">Iniciar sesión como Admin</h3>
            <form onSubmit={handleLogin} className="space-y-4">
              {loginError && (
                <div className="text-red-600 text-sm">{loginError}</div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700">Usuario</label>
                <input 
                  name="username"
                  type="text" 
                  className="mt-1 block w-full border rounded-md px-3 py-2" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                <input 
                  name="password"
                  type="password" 
                  className="mt-1 block w-full border rounded-md px-3 py-2" 
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowLoginModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Iniciar sesión
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PopUp de publicación */}
      {showPublishModal && (
        <PublishNewsPopup
          isOpen={showPublishModal}
          onClose={() => setShowPublishModal(false)}
          onPublish={handlePublish}
        />
      )}
    </>
  );
}