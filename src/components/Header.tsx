import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Sun, Moon, Plus, Newspaper, Shield, User } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import SearchBar from './SearchBar';
import MobileMenu from './MobileMenu';
import CategoryNav from './CategoryNav';
import SocialLinks from './SocialLinks';
import { useArticles } from '../context/ArticlesContext';
import Logo from '../public/cropped-cropped-cropped-cropped-logo-judiciales-valledupar-e1678684785552-removebg-preview.png';
import LoginPopup from './LoginPopup';
import PublishNewsPopup from './PublishNewsPopup';
import { Article } from '../types/article';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isPublishOpen, setIsPublishOpen] = useState(false);
  const { articles, addArticle, isAdmin, setIsAdmin, showNotification } = useArticles();

  // Agregar esta transformación para el menú móvil
  const isDark = theme === 'dark';

  const handleLogin = () => {
    setIsLoginOpen(false);
    setIsPublishOpen(true);
  };

  const handlePublish = (article: Article) => {
    addArticle(article);
    setIsPublishOpen(false);
  };

  const handleLogout = () => {
    setIsAdmin(false);
    showNotification('Sesión cerrada exitosamente');
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-red-50 to-white dark:from-gray-900 dark:to-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <img 
              src={Logo}
              alt="logo" 
              className={`h-8 w-auto sm:h-10 ${
                theme === 'dark' ? 'brightness-0 invert' : ''
              }`}
            />
          </Link>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {isAdmin && (
              <div className="hidden sm:flex items-center space-x-2 bg-red-50 dark:bg-red-900/50 px-3 py-1 rounded-full">
                <Shield className="h-4 w-4 text-red-600 dark:text-red-400" />
                <span className="text-sm font-medium text-red-600 dark:text-red-400">
                  Modo Administrador
                </span>
                <button onClick={handleLogout} className="text-sm hover:text-red-600">
                  Cerrar Sesión
                </button>
              </div>
            )}
            <div className="hidden sm:block">
              <SearchBar articles={articles} />
            </div>
            {isAdmin ? (
              <div className="relative group">
                <button
                  onClick={() => setIsPublishOpen(true)}
                  className="hidden sm:block p-2 rounded-md hover:bg-red-100 dark:hover:bg-gray-700"
                >
                  <User className="h-5 w-5 text-gray-700 dark:text-white" />
                </button>
                <div className="absolute z-50 pointer-events-none group-hover:pointer-events-auto invisible group-hover:visible bg-black dark:bg-white text-white dark:text-black text-sm py-1.5 px-3 rounded-md top-full left-1/2 transform -translate-x-1/2 mt-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 ease-out">
                  Modo Administrador
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-black dark:border-b-white"></div>
                </div>
              </div>
            ) : (
              <div className="relative group">
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="hidden sm:block p-2 rounded-md hover:bg-red-100 dark:hover:bg-gray-700"
                >
                  <User className="h-5 w-5 text-gray-700 dark:text-white" />
                </button>
                <div className="absolute z-50 pointer-events-none group-hover:pointer-events-auto invisible group-hover:visible bg-black dark:bg-white text-white dark:text-black text-sm py-1.5 px-3 rounded-md top-full left-1/2 transform -translate-x-1/2 mt-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 ease-out">
                  Iniciar sesión como Admin
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-black dark:border-b-white"></div>
                </div>
              </div>
            )}
            {/* Botón modo oscuro con tooltip */}
            <div className="relative group hidden sm:block">
              <button 
                onClick={toggleTheme} 
                className="p-2 rounded-md hover:bg-red-100 dark:hover:bg-gray-700"
              >
                {theme === 'light' ? (
                  <Moon className="h-5 w-5 text-gray-700 dark:text-white" />
                ) : (
                  <Sun className="h-5 w-5 text-gray-700 dark:text-white" />
                )}
              </button>
              <div className="absolute z-50 pointer-events-none group-hover:pointer-events-auto invisible group-hover:visible bg-black dark:bg-white text-white dark:text-black text-sm py-1.5 px-3 rounded-md top-full left-1/2 transform -translate-x-1/2 mt-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 ease-out">
                {theme === 'light' ? 'Modo Oscuro' : 'Modo Claro'}
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-black dark:border-b-white"></div>
              </div>
            </div>
            
            <button
              className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-red-600"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      <CategoryNav />
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        isDark={isDark}
        toggleDark={toggleTheme}
      />
      <LoginPopup 
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSuccess={handleLogin}
      />
      <PublishNewsPopup
        isOpen={isPublishOpen}
        onClose={() => setIsPublishOpen(false)}
        onPublish={handlePublish}
      />
    </header>
  );
}