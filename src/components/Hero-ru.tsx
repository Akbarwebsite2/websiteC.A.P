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
          alt="C.A.P Auto Parts Background"
          className="w-full h-full object-cover brightness-110 contrast-125 saturate-110 filter"
          style={{ 
            imageRendering: 'crisp-edges',
            WebkitImageRendering: 'crisp-edges',
            msImageRendering: 'crisp-edges'
          }}
        />
        <div className="absolute inset-0 bg-black/60"></div>
        {/* Красивая тень внизу */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Centered Logo */}
        <div className="mb-6 mt-24">
          <img 
            src="/cap logotip.jpg" 
            alt="C.A.P. Logo" 
            className="h-32 w-32 sm:h-36 sm:w-36 lg:h-40 lg:w-40 rounded-full object-cover border-4 border-blue-600 shadow-2xl mx-auto brightness-110 contrast-125 saturate-110 filter drop-shadow-2xl"
            style={{ 
              imageRendering: 'crisp-edges',
              WebkitImageRendering: 'crisp-edges',
              msImageRendering: 'crisp-edges'
            }}
          />
        </div>

        {/* Main Heading - C.A.P text */}
        <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black text-white mb-8 leading-tight tracking-tight">
          <div className="text-blue-800 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 tracking-widest" style={{ fontFamily: 'Saira Condensed, Exo 2, Rajdhani, Oswald, Impact, Arial Black, sans-serif', fontWeight: '900', textShadow: '3px 3px 6px rgba(0,0,0,0.7)' }}>
            Common Auto Parts
          </div>
        </h1>

        {/* Description - moved lower */}
        <div className="mb-6 mt-8">
          <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent text-2xl sm:text-3xl lg:text-4xl font-bold">
            Ваш проводник в сфере автозапчастей
          </span>
        </div>

        {/* Tagline */}
        {/* Description */}
        <p className="text-lg sm:text-xl text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed font-medium">
          Мы предлагаем профессиональный сервис, широкий выбор и быстрые поставки.
        </p>
      </div>
    </section>
  );
};