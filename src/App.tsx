import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ArticlesProvider } from './context/ArticlesContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import ArticleCard from './components/ArticleCard';
import CategoryPage from './pages/CategoryPage';
import { seedDatabase } from './data/seedDatabase';
import AboutPage from './pages/AboutPage';
import AdvertisePage from './pages/AdvertisePage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';

function App() {
  useEffect(() => {
    // Remover completamente la llamada a seedDatabase
    // Solo usar una vez para inicializar y luego comentar
    // seedDatabase();
  }, []);

  return (
    <BrowserRouter>
      <ArticlesProvider>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 w-full overflow-x-hidden">
            <Header />
            <main className="flex-1 w-full">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/article/:id" element={<ArticlePage />} />
                <Route path="/category/:category" element={<CategoryPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/advertise" element={<AdvertisePage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ArticlesProvider>
    </BrowserRouter>
  );
}

export default App;