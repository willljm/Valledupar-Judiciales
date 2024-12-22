import React, { useState, useEffect } from 'react';
import { ref, push, remove, onValue } from 'firebase/database';
import { db } from '../firebase/config';
import { Trash2 } from 'lucide-react';
import { useArticles } from '../context/ArticlesContext';

interface Comment {
  id: string;
  text: string;
  author: string;
  timestamp: number;
}

interface CommentSectionProps {
  articleId: string;
}

export default function CommentSection({ articleId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [author, setAuthor] = useState('');
  const { isAdmin } = useArticles();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cargar comentarios al montar el componente
  useEffect(() => {
    console.log('Iniciando suscripción a comentarios para artículo:', articleId);
    const commentsRef = ref(db, `comments/${articleId}`);

    const unsubscribe = onValue(commentsRef, (snapshot) => {
      console.log('Snapshot recibido:', snapshot.val());
      const data = snapshot.val();
      if (data) {
        const commentsArray = Object.entries(data).map(([id, value]: [string, any]) => ({
          id,
          ...value,
        }));
        console.log('Comentarios procesados:', commentsArray);
        setComments(commentsArray.sort((a, b) => b.timestamp - a.timestamp));
      } else {
        console.log('No hay comentarios para este artículo');
        setComments([]);
      }
    }, (error) => {
      console.error('Error al cargar comentarios:', error);
    });

    return () => {
      console.log('Limpiando suscripción de comentarios');
      unsubscribe();
    };
  }, [articleId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !author.trim() || isSubmitting) return;

    setIsSubmitting(true);
    console.log('Intentando publicar comentario...');

    try {
      const commentsRef = ref(db, `comments/${articleId}`);
      const newCommentData = {
        text: newComment.trim(),
        author: author.trim(),
        timestamp: Date.now(),
      };

      console.log('Datos del comentario:', newCommentData);
      await push(commentsRef, newCommentData);
      console.log('Comentario publicado exitosamente');

      setNewComment('');
    } catch (error) {
      console.error('Error al publicar comentario:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (commentId: string) => {
    if (!isAdmin) return;
    
    try {
      console.log('Deleting comment:', commentId); // Debug log
      const commentRef = ref(db, `comments/${articleId}/${commentId}`);
      await remove(commentRef);
      console.log('Comment deleted successfully'); // Debug log
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Comentarios ({comments.length})
      </h3>
      
      {/* Formulario de comentarios */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Nombre
          </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Tu nombre"
            required
          />
        </div>
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Comentario
          </label>
          <textarea
            id="comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            rows={4}
            placeholder="Escribe tu comentario..."
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Publicando...' : 'Publicar comentario'}
        </button>
      </form>

      {/* Lista de comentarios */}
      <div className="space-y-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {comment.author}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(comment.timestamp).toLocaleDateString()}
                  </p>
                </div>
                {isAdmin && (
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
                  >
                    <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                  </button>
                )}
              </div>
              <p className="mt-2 text-gray-700 dark:text-gray-300">{comment.text}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No hay comentarios aún. ¡Sé el primero en comentar!
          </p>
        )}
      </div>
    </div>
  );
}
