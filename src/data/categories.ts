export interface Category {
  id: string;
  name: string;
  subcategories: string[];
  color: string;
}

export const categories: Category[] = [
  {
    id: 'judiciales',
    name: 'Judiciales',
    color: 'darkred',
    subcategories: ['Crímenes', 'Procesos Judiciales', 'Casos Policiales', 'Investigaciones', 'Sentencias', 'Capturas', 'Operativos']
  },
  {
    id: 'regionales',
    name: 'Regionales',
    color: 'blue',
    subcategories: ['Política Regional', 'Economía Local', 'Desarrollo', 'Infraestructura', 'Medio Ambiente', 'Salud', 'Educación']
  },
  {
    id: 'cesar',
    name: 'Cesar',
    color: 'teal',
    subcategories: ['Política', 'Seguridad', 'Medio Ambiente', 'Economía', 'Sociedad', 'Educación', 'Salud', 'Cultura']
  },
  {
    id: 'valledupar',
    name: 'Valledupar',
    color: 'green',
    subcategories: ['Cultura', 'Deportes', 'Economía', 'Política', 'Seguridad', 'Sociedad', 'Eventos', 'Educación']
  },
  {
    id: 'nacional',
    name: 'Nacional',
    color: 'orange',
    subcategories: ['Política', 'Economía', 'Justicia', 'Conflicto', 'Paz', 'Congreso', 'Gobierno', 'Elecciones']
  },
  {
    id: 'internacional',
    name: 'Internacional',
    color: 'pink',
    subcategories: ['América Latina', 'Estados Unidos', 'Europa', 'Asia', 'África', 'Medio Oriente', 'Economía Global', 'Crisis Mundial']
  },
  {
    id: 'farandula',
    name: 'Farandula',
    color: 'gold',
    subcategories: ['Entretenimiento', 'Música', 'Cine', 'Televisión', 'Celebridades', 'Realeza', 'Moda', 'Escándalos']
  },
  {
    id: 'comunidad',
    name: 'Comunidad',
    color: 'purple',
    subcategories: ['Proyectos Sociales', 'Voluntariado', 'Historias de Vida', 'Denuncias', 'Medio Ambiente', 'Salud', 'Educación']
  }
];

export type CategoryType = 'Judiciales' | 'Regionales' | 'Cesar' | 'Valledupar' | 'Nacional' | 'Internacional' | 'Farandula' | 'Comunidad';
export type SubcategoryType = string;
