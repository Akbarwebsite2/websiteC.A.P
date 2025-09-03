import React from 'react';
import { ArrowDown } from 'lucide-react';

/**
 * Hero Component - Russian Version
 * Bold, masculine hero section with premium automotive styling
 */
export const HeroRu: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/bolt background.jpg"
          alt="Auto Parts Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Centered Logo */}
        <div className="mb-8">
          <img 
            src="/cap logotip.jpg" 
            alt="C.A.P. Logo" 
            className="h-32 w-32 sm:h-40 sm:w-40 lg:h-48 lg:w-48 rounded-full object-cover border-4 border-blue-600 shadow-2xl mx-auto brightness-110 contrast-125 saturate-110"
          />
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black text-white mb-4 leading-tight tracking-tight mt-24">
          <span className="block text-blue-500 text-3xl sm:text-4xl lg:text-5xl font-black mb-4 tracking-widest">
            C.A.P
          </span>
          <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent text-2xl sm:text-3xl lg:text-4xl font-bold">
            Ваш проводник в сфере автозапчастей
          </span>
        </h1>

        {/* Tagline */}
        <div className="text-xl sm:text-2xl lg:text-3xl text-blue-400 mb-6 font-bold tracking-wide">
          КАЧЕСТВО ГАРАНТИРОВАНО
        </div>

        {/* Description */}
        <p className="text-base sm:text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed font-medium">
          Профессиональные автозапчасти высокого качества. Когда важна надежность, выбирают C.A.P.
        </p>

        {/* Navigation Menu at Bottom */}
        <div className="mt-16 flex flex-wrap justify-center gap-6 sm:gap-8">
          <a href="#products" className="text-gray-300 hover:text-blue-400 font-semibold text-lg transition-colors duration-200 relative group">
            Продукты
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-200 group-hover:w-full"></span>
          </a>
          <a href="#about" className="text-gray-300 hover:text-blue-400 font-semibold text-lg transition-colors duration-200 relative group">
            О нас
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-200 group-hover:w-full"></span>
          </a>
          <a href="#contact" className="text-gray-300 hover:text-blue-400 font-semibold text-lg transition-colors duration-200 relative group">
            Контакты
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-200 group-hover:w-full"></span>
          </a>
        </div>
      </div>
    </section>
  );
};