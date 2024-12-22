export type CategoryType = 'Cesar' | 'Valledupar' | 'Nacional';
export type SubcategoryType = 
  | 'Política' 
  | 'Seguridad' 
  | 'Medio Ambiente' 
  | 'Cultura' 
  | 'Deportes' 
  | 'Economía' 
  | 'Sociedad' 
  | 'Educación' 
  | 'Salud' 
  | 'Eventos' 
  | 'Tecnología';

export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  category: CategoryType;
  subcategory: SubcategoryType;
  date: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  readTime: string;
  tags: string[];
  relatedArticles?: string[];
  views: number;
  shareCount: number;
}