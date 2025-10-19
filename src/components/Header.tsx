import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';

/**
 * Header Component
 * Premium navigation with bold styling and WhatsApp CTA
 */
export const Header: React.FC = () => {
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
    { name: 'Home', href: '#home' },
    { name: 'Products', href: '#products' },
    { name: 'Catalog', href: '/catalog.html' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hello, I'm interested in C.A.P. auto parts.");
    window.open(`https://wa.me/971561747182?text=${message}`, '_blank');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/95 backdrop-blur-sm shadow-2xl' : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile Menu Button - Left Corner */}
          <button
            className="lg:hidden p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex items-center space-x-8 mx-auto">
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

          {/* Empty spacer for mobile to center content */}
          <div className="lg:hidden w-10"></div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        {/* Mobile Menu Sidebar */}
        <div className={`lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-gradient-to-b from-gray-900 via-gray-800 to-black border-r-2 border-blue-600/30 shadow-2xl transform transition-transform duration-300 ease-out z-50 ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-6 border-b border-blue-600/20">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-blue-400">Menu</h2>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block px-4 py-3 text-gray-300 hover:text-blue-400 hover:bg-blue-600/10 font-semibold rounded-lg transition-all duration-200 border border-transparent hover:border-blue-600/30"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-blue-600/20">
              <div className="text-sm text-gray-500 text-center">
                © 2024 C.A.P.
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};