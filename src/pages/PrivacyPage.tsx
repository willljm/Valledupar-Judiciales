import React from 'react';
import { ArrowLeft, Lock, Shield, Database } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-red-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/" className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Volver al inicio
        </Link>
        
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Política de Privacidad
          </h1>
          
          <div className="space-y-8">
            <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
              Su privacidad es importante para nosotros. Esta política explica cómo recopilamos, 
              usamos y protegemos su información personal.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-purple-50 dark:bg-gray-700 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <Database className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  <h2 className="text-xl font-bold text-purple-600 dark:text-purple-400">
                    Información Recopilada
                  </h2>
                </div>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Información de registro</li>
                  <li>• Datos de uso del sitio</li>
                  <li>• Información del dispositivo</li>
                </ul>
              </div>

              <div className="bg-blue-50 dark:bg-gray-700 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    Uso de la Información
                  </h2>
                </div>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Mejorar nuestros servicios</li>
                  <li>• Personalizar su experiencia</li>
                  <li>• Enviar actualizaciones importantes</li>
                </ul>
              </div>

              <div className="bg-green-50 dark:bg-gray-700 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
                  <h2 className="text-xl font-bold text-green-600 dark:text-green-400">
                    Protección de Datos
                  </h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  Implementamos medidas de seguridad para proteger su información personal contra 
                  acceso no autorizado y uso indebido.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
