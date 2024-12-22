import { ref, set, get } from 'firebase/database';
import { db } from '../firebase/config';
import { articles as initialArticles } from './articles';

// También asegúrate de que solo uses importaciones de database

export const seedDatabase = async () => {
  try {
    const articlesRef = ref(db, 'articles');
    
    // Verificar si ya existen datos
    const snapshot = await get(articlesRef);
    if (snapshot.exists()) {
      console.log('La base de datos ya está inicializada');
      return;
    }

    // Solo inicializar si no hay datos
    const articlesData = initialArticles.reduce((acc, article) => {
      acc[article.id] = {
        ...article,
        date: new Date().toISOString() // Asegurar que la fecha está en formato ISO
      };
      return acc;
    }, {});

    await set(articlesRef, articlesData);
    console.log('Base de datos inicializada con éxito');
  } catch (error) {
    console.error('Error en seedDatabase:', error);
  }
};
