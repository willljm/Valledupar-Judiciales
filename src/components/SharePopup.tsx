import React, { useState } from 'react';
import { Share2, Facebook, Instagram } from 'lucide-react';

interface SharePopupProps {
  url: string;
  title: string;
}

export default function SharePopup({ url, title }: SharePopupProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleShare = (e: React.MouseEvent, platform: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'instagram':
        shareUrl = `https://instagram.com`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}`;
        break;
    }
    window.open(shareUrl, '_blank');
  };

  const togglePopup = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" onClick={e => e.stopPropagation()}>
      <button
        onClick={togglePopup}
        className="p-1.5 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50 transition-all duration-300"
      >
        <Share2 className="h-4 w-4" />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40"
            onClick={togglePopup}
          />
          <div className="absolute right-0 top-full mt-1 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-2 min-w-[120px] animate-scale-in">
            <div className="flex gap-1">
              <button
                onClick={(e) => handleShare(e, 'facebook')}
                className="p-1.5 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
              >
                <Facebook className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              </button>
              <button
                onClick={(e) => handleShare(e, 'instagram')}
                className="p-1.5 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
              >
                <Instagram className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              </button>
              <button
                onClick={(e) => handleShare(e, 'whatsapp')}
                className="p-1.5 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
              >
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="h-4 w-4 text-gray-600 dark:text-gray-300"
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