import React from 'react';
import { MessageCircle } from 'lucide-react';

/**
 * Floating WhatsApp Button Component
 * Fixed position WhatsApp button that follows scroll
 */
export const WhatsAppFloat: React.FC = () => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Здравствуйте, меня интересуют");
    window.open(`https://wa.me/971561747182?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-4 right-4 bg-green-500 hover:bg-green-600 text-white px-4 py-3 sm:p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 z-50 flex items-center space-x-1.5 content-reveal delay-4"
      aria-label="WhatsApp"
    >
      <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
      <span className="font-semibold text-sm sm:text-base">WhatsApp</span>
    </button>
  );
};