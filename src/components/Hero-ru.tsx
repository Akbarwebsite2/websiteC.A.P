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
        {/* Main Heading - C.A.P text above logo */}
        <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black text-white mb-8 leading-tight tracking-tight mt-16">
          <span className="block text-blue-500 text-3xl sm:text-4xl lg:text-5xl font-black mb-4 tracking-widest">
            C.A.P
          </span>
        </h1>

        {/* Centered Logo - positioned below C.A.P text */}
        <div className="mb-6">
          <img 
            src="/cap logotip.jpg" 
            alt="C.A.P. Logo" 
            className="h-24 w-24 sm:h-28 sm:w-28 lg:h-32 lg:w-32 rounded-full object-cover border-4 border-blue-600 shadow-2xl mx-auto brightness-110 contrast-125 saturate-110"
          />
        </div>

        {/* Description */}
        <div className="mb-8">
          <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent text-2xl sm:text-3xl lg:text-4xl font-bold">
            Ваш проводник в сфере автозапчастей
          </span>
        </div>

        {/* Tagline */}
        <div className="text-xl sm:text-2xl lg:text-3xl text-blue-400 mb-6 font-bold tracking-wide">
          КАЧЕСТВО ГАРАНТИРОВАНО
        </div>

        {/* Description */}
        <p className="text-base sm:text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed font-medium">
          Профессиональные автозапчасти высокого качества. Когда важна надежность, выбирают C.A.P.
        </p>
      </div>
    </section>
  );
};