import React from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, Mail, Phone, MapPin } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { categories } from '../data/categories'; 
import Logo from '../public/cropped-cropped-cropped-cropped-logo-judiciales-valledupar-e1678684785552-removebg-preview.png';


export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className="bg-gradient-to-b from-red-50 to-red-100 dark:from-gray-800 dark:to-gray-900 text-gray-700 dark:text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 group">
            <img 
              src={Logo}
              alt="logo" 
              className={`h-8 w-auto sm:h-10 ${
                theme === 'dark' ? 'brightness-0 invert' : ''
              }`}
            />
            </div>
            <p className="text-base"> Tu portal de noticias judiciales más importante del Cesar.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-red-600 dark:text-red-500">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm hover:text-red-600 dark:hover:text-red-500 transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/advertise" className="text-sm hover:text-red-600 dark:hover:text-red-500 transition-colors duration-200">
                  Advertise
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm hover:text-red-600 dark:hover:text-red-500 transition-colors duration-200">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm hover:text-red-600 dark:hover:text-red-500 transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-red-600 dark:text-red-500">Categories</h3>
            <ul className="space-y-2">
              {categories.map(category => (
                <li key={category.id}>
                  <Link 
                    to={`/category/${category.id}`} 
                    className="text-sm hover:text-red-600 dark:hover:text-red-500 transition-colors duration-200"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-red-600 dark:text-red-500">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 group">
                <Mail className="h-5 w-5 text-red-600 dark:text-red-500 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm">info@judicialesvalledupar.com</span>  
              </li>
              <li className="flex items-center space-x-2 group">
                <Phone className="h-5 w-5 text-red-600 dark:text-red-500 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm">+57 300 123 4567</span>
              </li>
              <li className="flex items-center space-x-2 group">
                <MapPin className="h-5 w-5 text-red-600 dark:text-red-500 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm">Valledupar, Cesar</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-red-200 dark:border-gray-700 mt-8 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Judiciales Valledupar. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}