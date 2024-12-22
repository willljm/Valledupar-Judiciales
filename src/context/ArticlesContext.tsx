import React, { createContext, useState, useEffect, useContext } from 'react';
import { ref, onValue, query, orderByChild, push } from 'firebase/database';
import { db } from '../firebase/config';
import { Article } from '../types/article';

interface ArticlesContextType {
  articles: Article[];
  loading: boolean;
  addArticle: (article: Article) => Promise<void>;
  isAdmin: boolean;
  setIsAdmin: (value: boolean) => void;
  showNotification: (message: string) => void;
}

const ArticlesContext = createContext<ArticlesContextType>({
  articles: [],
  loading: true,
  addArticle: async () => {},
  isAdmin: false,
  setIsAdmin: () => {},
  showNotification: () => {}
});

export function ArticlesProvider({ children }: { children: React.ReactNode }) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const showNotification = (message: string) => {
    alert(message);
  };

  const addArticle = async (article: Article) => {
    try {
      const articlesRef = ref(db, 'articles');
      // Firebase se encargará de actualizar el estado a través del listener
      await push(articlesRef, article);
      showNotification('Artículo publicado con éxito');
    } catch (error) {
      console.error('Error al publicar artículo:', error);
      showNotification('Error al publicar el artículo');
      throw error;
    }
  };

  useEffect(() => {
    const articlesRef = ref(db, 'articles');
    const articlesQuery = query(articlesRef, orderByChild('date'));

    const unsubscribe = onValue(articlesQuery, (snapshot) => {
      if (!snapshot.exists()) {
        // Si no hay datos, inicializar con los artículos predeterminados
        console.log('No hay datos en Firebase, inicializando...');
        seedDatabase().then(() => {
          console.log('Base de datos inicializada con éxito');
        });
        return;
      }

      const articlesData: Article[] = [];
      snapshot.forEach((childSnapshot) => {
        const article = childSnapshot.val();
        article.id = childSnapshot.key;
        articlesData.unshift(article);
      });
      console.log('Artículos cargados:', articlesData.length);
      setArticles(articlesData);
      setLoading(false);
    }, (error) => {
      console.error('Error al cargar artículos:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <ArticlesContext.Provider value={{ 
      articles, 
      loading, 
      addArticle,
      isAdmin,
      setIsAdmin,
      showNotification
    }}>
      {children}
    </ArticlesContext.Provider>
  );
}

export const useArticles = () => useContext(ArticlesContext);
