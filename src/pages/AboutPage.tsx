import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-red-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/" className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Volver al inicio
        </Link>
        
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Sobre Nosotros
          </h1>
          
          <div className="space-y-8">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                Judiciales Valledupar es el principal portal de noticias judiciales del departamento del Cesar. 
                Fundado en 2020, nos dedicamos a proporcionar información precisa y oportuna sobre acontecimientos 
                judiciales y legales que afectan a nuestra comunidad.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="bg-red-50 dark:bg-gray-700 p-6 rounded-xl">
                <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
                  Nuestra Misión
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Brindar cobertura periodística de calidad sobre temas judiciales, contribuyendo a mantener 
                  informada a la comunidad sobre los acontecimientos más relevantes del sistema judicial en 
                  nuestra región.
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-gray-700 p-6 rounded-xl">
                <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                  Nuestro Equipo
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Contamos con un equipo de periodistas especializados en temas judiciales, comprometidos 
                  con la verdad y la objetividad en cada nota que publicamos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
