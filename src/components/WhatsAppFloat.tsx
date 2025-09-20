import React from 'react';
import { MessageCircle } from 'lucide-react';

/**
 * Floating WhatsApp Button Component
 * Fixed position WhatsApp button that follows scroll
 */
export const WhatsAppFloat: React.FC = () => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Здравствуйте, меня интересуют автозапчасти C.A.P.");
    window.open(`https://wa.me/971561747182?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 z-50 flex items-center space-x-2 content-reveal delay-4"
      aria-label="WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="hidden sm:block font-semibold">WhatsApp</span>
    </button>
  );
};