import React, { useState } from 'react';
import { Share2, Facebook, Instagram } from 'lucide-react';

interface ShareButtonsProps {
  url: string;
  title: string;
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const shareButtons = [
    {
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      label: 'Share on Facebook'
    },
    {
      icon: Instagram,
      href: `https://instagram.com`,
      label: 'Share on Instagram'
    }
  ];

  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50 transition-all duration-300"
        aria-label="Share"
      >
        <Share2 className="h-5 w-5 stroke-2" />
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute -top-2 right-0 z-50 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-xl animate-scale-in">
            <div className="flex items-center gap-1">
              {shareButtons.map((button, index) => (
                <a
                  key={index}
                  href={button.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300"
                  aria-label={button.label}
                >
                  <button.icon className="h-5 w-5 stroke-2 text-gray-600 dark:text-gray-300" />
                </a>
              ))}
              <button
                onClick={handleWhatsAppShare}
                className="p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300"
                aria-label="Share on WhatsApp"
              >
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="h-5 w-5 text-gray-600 dark:text-gray-300"
                >
                  <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                  <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
                </svg>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}