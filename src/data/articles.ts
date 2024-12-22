import { ref, push, get, query, orderByChild } from 'firebase/database';
import { db } from '../firebase/config';
import { Article } from '../types/article';

// Eliminar la importación de Firestore y usar solo Database

export const articles: Article[] = [];

export const getArticles = async (): Promise<Article[]> => {
  const articlesRef = ref(db, 'articles');
  const articlesQuery = query(articlesRef, orderByChild('date'));
  
  const snapshot = await get(articlesQuery);
  const articles: Article[] = [];
  
  snapshot.forEach((childSnapshot) => {
    const article = childSnapshot.val();
    article.id = childSnapshot.key;
    articles.unshift(article);
  });
  
  return articles;
};

export const addArticle = async (article: Article): Promise<void> => {
  const articlesRef = ref(db, 'articles');
  await push(articlesRef, article);
};

