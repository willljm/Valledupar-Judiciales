import React, { useState } from 'react';
import { Article } from '../types/article';
import { Calendar, Upload } from 'lucide-react';
import { categories } from '../data/categories';
import { useArticles } from '../context/ArticlesContext';

interface PublishNewsPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  category: string;
  subcategory: string;
  authorName: string;
  authorAvatar: string;
  authorRole: string;
  tags: string;
  publishDate?: string;
}

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[áäâà]/g, 'a')
    .replace(/[éëêè]/g, 'e')
    .replace(/[íïîì]/g, 'i')
    .replace(/[óöôò]/g, 'o')
    .replace(/[úüûù]/g, 'u')
    .replace(/ñ/g, 'n')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
};

export default function PublishNewsPopup({ isOpen, onClose }: PublishNewsPopupProps) {
  const { addArticle } = useArticles();
  
  const initialFormData: FormData = {
    title: '',
    description: '',
    content: '',
    imageUrl: '',
    category: '',
    subcategory: '',
    authorName: '',
    authorAvatar: '',
    authorRole: '',
    tags: ''
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [error, setError] = useState<string>('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState('');

  const validateForm = (): boolean => {
    if (!formData.title.trim()) {
      setError('El título es obligatorio');
      return false;
    }
    if (!formData.description.trim()) {
      setError('La descripción es obligatoria');
      return false;
    }
    if (!formData.content.trim()) {
      setError('El contenido es obligatorio');
      return false;
    }
    if (!formData.category) {
      setError('La categoría es obligatoria');
      return false;
    }
    if (!formData.authorName.trim()) {
      setError('El nombre del autor es obligatorio');
      return false;
    }
    return true;
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const selectedCategory = categories.find(cat => cat.name === formData.category);
      
      if (!selectedCategory) {
        setError('Categoría no válida');
        return;
      }

      const slug = generateSlug(formData.title);
      const newArticle: Article = {
        id: `${slug}-${Date.now()}`,
        title: formData.title.trim(),
        description: formData.description.trim(),
        content: formData.content.trim(),
        imageUrl: formData.imageUrl || '/default-image.jpg',
        category: selectedCategory.name,
        subcategory: formData.subcategory || undefined,
        date: formData.publishDate || new Date().toISOString(),
        author: {
          name: formData.authorName.trim(),
          avatar: avatarPreview || '/default-avatar.jpg',
          role: formData.authorRole.trim() || 'Editor'
        },
        readTime: `${Math.max(1, Math.ceil(formData.content.length / 1000))} min`,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        views: 0,
        shareCount: 0
      };

      await addArticle(newArticle);
      setFormData(initialFormData);
      setError('');
      onClose();
    } catch (err) {
      setError('Error al crear el artículo. Por favor intenta de nuevo.');
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-[800px] max-h-[90vh] overflow-y-auto m-4">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Publicar Noticia</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Título *"
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
          <textarea
            placeholder="Descripción *"
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            required
          />
          <textarea
            placeholder="Contenido *"
            className="w-full p-2 border rounded h-32 dark:bg-gray-700 dark:text-white"
            value={formData.content}
            onChange={(e) => setFormData({...formData, content: e.target.value})}
            required
          />
          <input
            type="url"
            placeholder="URL de la imagen"
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            value={formData.imageUrl}
            onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
          />
          <select
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value, subcategory: ''})}
            required
          >
            <option value="">Seleccionar categoría *</option>
            {categories.map(category => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          {formData.category && (
            <select
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              value={formData.subcategory}
              onChange={(e) => setFormData({...formData, subcategory: e.target.value})}
            >
              <option value="">Seleccionar subcategoría</option>
              {categories
                .find(cat => cat.name === formData.category)
                ?.subcategories.map(sub => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
            </select>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nombre del autor *"
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              value={formData.authorName}
              onChange={(e) => setFormData({...formData, authorName: e.target.value})}
              required
            />
            <input
              type="text"
              placeholder="Rol del autor *"
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              value={formData.authorRole}
              onChange={(e) => setFormData({...formData, authorRole: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Avatar del autor
            </label>
            <div className="flex items-center space-x-4">
              {avatarPreview && (
                <img src={avatarPreview} alt="Preview" className="w-16 h-16 rounded-full object-cover" />
              )}
              <label className="cursor-pointer bg-gray-100 dark:bg-gray-700 p-2 rounded-lg flex items-center">
                <Upload className="h-5 w-5 mr-2" />
                <span>Subir imagen</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </label>
            </div>
          </div>
          <input
            type="datetime-local"
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            value={formData.publishDate || ''}
            onChange={(e) => setFormData({...formData, publishDate: e.target.value})}
          />
          <input
            type="text"
            placeholder="Tags (separados por coma)"
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            value={formData.tags}
            onChange={(e) => setFormData({...formData, tags: e.target.value})}
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded dark:bg-gray-600 dark:text-white"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Publicar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
