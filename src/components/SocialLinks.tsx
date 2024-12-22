import React from 'react';
import { Twitter, Facebook, Instagram, Youtube } from 'lucide-react';

interface SocialLinksProps {
  className?: string;
}

export default function SocialLinks({ className = '' }: SocialLinksProps) {
  const socialLinks = [
    {
      icon: Facebook,
      href: 'https://facebook.com',
      color: 'hover:text-blue-600'
    },
    {
      icon: Twitter,
      href: 'https://twitter.com',
      color: 'hover:text-blue-400'
    },
    {
      icon: Instagram,
      href: 'https://instagram.com',
      color: 'hover:text-pink-600'
    },
    {
      icon: Youtube,
      href: 'https://youtube.com',
      color: 'hover:text-red-600'
    }
  ];

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {socialLinks.map((link, index) => (
        <a
          key={index}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ${link.color}`}
        >
          <link.icon className="h-5 w-5" />
        </a>
      ))}
    </div>
  );
}