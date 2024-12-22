export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

export function getRelativeTime(date: number | string | Date): string {
  const now = new Date();
  const articleDate = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - articleDate.getTime()) / 1000);
  
  const intervals = {
    año: 31536000,
    mes: 2592000,
    semana: 604800,
    día: 86400,
    hora: 3600,
    minuto: 60,
    segundo: 1
  };

  for (const [unit, seconds] of Object.entries(intervals)) {
    const diff = Math.floor(diffInSeconds / seconds);
    
    if (diff >= 1) {
      return `hace ${diff} ${unit}${diff > 1 ? (unit === 'mes' ? 'es' : 's') : ''}`;
    }
  }

  return 'Justo ahora';
}