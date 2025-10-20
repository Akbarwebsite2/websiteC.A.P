import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle, LogIn } from 'lucide-react';

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
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hello, I'm interested in C.A.P. auto parts.");
    window.open(`https://wa.me/971561747182?text=${message}`, '_blank');
  };

  return (
    <>
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

            {/* Login/Register Button - Desktop */}
            <a
              href="/catalog.html"
              className="hidden lg:flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-colors shadow-lg"
            >
              <LogIn className="w-5 h-5" />
              <span>Login/Register</span>
            </a>

            {/* Login/Register Button - Mobile */}
            <a
              href="/catalog.html"
              className="lg:hidden flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm"
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </a>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/80 z-[100]"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Sidebar */}
      <div className={`lg:hidden fixed left-0 top-0 bottom-0 h-screen w-80 bg-black border-r border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.3)] transform transition-transform duration-300 ease-out z-[101] ${
        isMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-8 border-b border-blue-500/30">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">MENU</h2>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-blue-400 hover:text-blue-300 hover:rotate-90 transition-all duration-200"
              >
                <X className="h-7 w-7" />
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 px-6 py-8 space-y-1 overflow-y-auto">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-6 py-4 text-lg text-gray-300 hover:text-white hover:bg-blue-600/20 font-bold tracking-wide border-l-4 border-transparent hover:border-blue-500 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
                style={{
                  animationDelay: `${index * 50}ms`
                }}
              >
                {link.name}
              </a>
            ))}
          </div>

        </div>
      </div>
    </>
  );
};