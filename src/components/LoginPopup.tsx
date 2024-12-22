import React, { useState } from 'react';
import { useArticles } from '../context/ArticlesContext';
import { Lock, Mail } from 'lucide-react';

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function LoginPopup({ isOpen, onClose, onSuccess }: LoginPopupProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setIsAdmin, showNotification } = useArticles();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Añadir logs para depuración
    console.log('Intentando login con:', {
      email,
      password,
      expectedEmail: 'admin@admin.com',
      expectedPassword: 'Administrador1011'
    });

    // Trim para eliminar espacios en blanco
    if (email.trim() === 'admin@admin.com' && password === 'Administrador1011') {
      console.log('Login exitoso');
      setIsAdmin(true);
      showNotification('¡Bienvenido, Administrador!');
      onSuccess();
      onClose();
      setError('');
    } else {
      console.log('Login fallido');
      setError('Credenciales inválidas');
      showNotification('Credenciales inválidas');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl w-full max-w-md transform transition-all">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center">
          Modo Administrador
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="admin@admin.com"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="••••••••••••"
              />
            </div>
          </div>
          {error && (
            <p className="text-red-500 text-center text-sm bg-red-50 dark:bg-red-900/50 p-2 rounded">
              {error}
            </p>
          )}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
