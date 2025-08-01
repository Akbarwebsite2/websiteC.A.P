import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';

/**
 * Header Component - Russian Version
 * Premium navigation with bold styling and WhatsApp CTA
 */
export const HeaderRu: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Главная', href: '#home' },
    { name: 'Продукты', href: '#products' },
    { name: 'О нас', href: '#about' },
    { name: 'Контакты', href: '#contact' }
  ];

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Здравствуйте, меня интересуют автозапчасти C.A.P.");
    window.open(`https://wa.me/971561747182?text=${message}`, '_blank');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/95 backdrop-blur-sm shadow-2xl' : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-6">
            <img 
              src="/C.A.P logo.jpg" 
              alt="C.A.P. Logo" 
              className="h-16 w-16 rounded-full object-cover border-2 border-blue-600"
            />
            <div>
              <h1 className="text-3xl lg:text-4xl font-black text-white tracking-tight">
                <span className="text-blue-500 font-black">C.A.P</span>
              </h1>
              <p className="text-sm lg:text-base text-gray-400 font-bold tracking-wider">
                COMMON AUTO PARTS
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-blue-500 font-semibold transition-colors duration-200 relative group tracking-wide"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-200 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <div className="hidden lg:block">
            <button 
              onClick={handleWhatsAppClick}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-bold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 shadow-lg"
            >
              <MessageCircle className="h-5 w-5" />
              <span>+971 56 174 71 82</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-sm border-t border-gray-800">
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-gray-300 hover:text-blue-500 font-semibold py-2 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <button 
                onClick={handleWhatsAppClick}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-bold hover:from-blue-700 hover:to-blue-800 transition-colors duration-200 flex items-center justify-center space-x-2 mt-4"
              >
                <MessageCircle className="h-5 w-5" />
                <span>+971 56 174 71 82</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};