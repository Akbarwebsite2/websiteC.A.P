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
          <div className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 tracking-tight">
            <img 
              src="/Parts 1.png" 
              alt="Ваш проводник в сфере автозапчастей" 
              className="h-8 sm:h-10 lg:h-12 xl:h-14 mx-auto object-contain filter brightness-110 contrast-125 saturate-110"
              style={{ 
                imageRendering: 'crisp-edges',
                WebkitImageRendering: 'crisp-edges',
                msImageRendering: 'crisp-edges'
              }}
            />
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white mt-4 tracking-wide">
              Ваш проводник в сфере автозапчастей
            </h2>
          </div>
          
        </h1>

        {/* Description */}
        <p className="text-lg sm:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-medium mt-2">
          <span className="tracking-wide">Мы предлагаем профессиональный сервис, широкий выбор и быстрые поставки.</span>
        </p>
      </div>
    </section>
  );
};