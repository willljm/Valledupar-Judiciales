import { useEffect, useState } from 'react';
import { ref, onValue, query, orderByChild } from 'firebase/database';
import { db } from '../firebase/config';
import { Article } from '../types/article';

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const articlesRef = ref(db, 'articles');
    const articlesQuery = query(articlesRef, orderByChild('date'));

    const unsubscribe = onValue(articlesQuery, (snapshot) => {
      const articles: Article[] = [];
      snapshot.forEach((childSnapshot) => {
        const article = childSnapshot.val();
        article.id = childSnapshot.key;
        articles.unshift(article);
      });
      setArticles(articles);
      setLoading(false);
    });

    // Limpiar suscripción cuando el componente se desmonte
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  // ...resto del código de renderizado...
}
