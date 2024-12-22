import React from 'react';
import { ArrowLeft, Mail, Phone, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdvertisePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-red-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/" className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Volver al inicio
        </Link>
        
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Publicidad
          </h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-xl text-gray-700 dark:text-gray-300 text-center mb-12">
              Amplíe el alcance de su marca anunciándose en Judiciales Valledupar, 
              el portal de noticias judiciales más visitado del Cesar.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-gray-700 dark:to-gray-600 p-6 rounded-xl">
                <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
                  ¿Por qué anunciarse con nosotros?
                </h2>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li className="flex items-center gap-2">
                    <BarChart className="w-5 h-5 text-red-500" />
                    Alcance significativo en la región
                  </li>
                  <li className="flex items-center gap-2">
                    <BarChart className="w-5 h-5 text-red-500" />
                    Audiencia específica y comprometida
                  </li>
                  <li className="flex items-center gap-2">
                    <BarChart className="w-5 h-5 text-red-500" />
                    Diferentes formatos publicitarios
                  </li>
                  <li className="flex items-center gap-2">
                    <BarChart className="w-5 h-5 text-red-500" />
                    Métricas detalladas de rendimiento
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-600 p-6 rounded-xl">
                <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                  Contáctenos
                </h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-blue-500" />
                    publicidad@judicialesvalledupar.com
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-blue-500" />
                    +57 300 123 4567
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
