import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-red-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/" className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Volver al inicio
        </Link>
        
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Términos de Uso
          </h1>
          
          <div className="space-y-8">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Al acceder y utilizar este sitio web, usted acepta cumplir y estar sujeto a los siguientes términos y condiciones de uso.
            </p>

            <div className="grid gap-8">
              <div className="bg-red-50 dark:bg-gray-700 p-6 rounded-xl">
                <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
                  1. Uso del Contenido
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Todo el contenido publicado en Judiciales Valledupar está protegido por derechos de autor. 
                  No está permitida la reproducción total o parcial sin autorización expresa.
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-gray-700 p-6 rounded-xl">
                <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                  2. Comentarios y Participación
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Los usuarios que participen en nuestro sitio web deben hacerlo de manera respetuosa, 
                  evitando contenido ofensivo, ilegal o inapropiado.
                </p>
              </div>

              <div className="bg-green-50 dark:bg-gray-700 p-6 rounded-xl">
                <h2 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-4">
                  3. Responsabilidad
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Judiciales Valledupar no se hace responsable por comentarios u opiniones expresadas 
                  por los usuarios en la plataforma.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
