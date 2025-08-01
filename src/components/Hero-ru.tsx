import React from 'react';
import { ArrowDown } from 'lucide-react';

/**
 * Hero Component - Russian Version
 * Bold, masculine hero section with premium automotive styling
 */
export const HeroRu: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dark Automotive Background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        
        {/* Metallic texture overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, #3b82f6 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, #2563eb 0%, transparent 50%),
              linear-gradient(45deg, transparent 40%, rgba(59, 130, 246, 0.1) 50%, transparent 60%)
            `,
            backgroundSize: '200px 200px, 300px 300px, 100px 100px'
          }}></div>
        </div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Logo Section */}
        <div className="mb-8">
          <div className="inline-block relative">
            <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-xl scale-110"></div>
            <img 
              src="/C.A.P logo.jpg" 
              alt="C.A.P. Common Auto Parts" 
              className="relative h-28 w-28 lg:h-36 lg:w-36 rounded-full object-cover border-4 border-blue-600 shadow-2xl"
            />
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black text-white mb-8 leading-tight tracking-tight">
          <span className="block text-blue-500 text-3xl sm:text-4xl lg:text-5xl font-black mb-4 tracking-widest">
            C.A.P
          </span>
          <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
            СОЗДАНО ДЛЯ РАБОТЫ
          </span>
        </h1>

        {/* Tagline */}
        <div className="text-2xl sm:text-3xl lg:text-4xl text-gray-300 mb-8 font-bold tracking-wide">
          КАЧЕСТВО ГАРАНТИРОВАНО
        </div>

        {/* Description */}
        <p className="text-lg sm:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
          Моторные части, ходовые части, моторное масло, кузовные части, оригинальные автозапчасти и автомаркет автозапчасти. 
          Когда важно качество, профессионалы выбирают C.A.P. для превосходной производительности и надежности.
        </p>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-8 w-8 text-gray-500" />
        </div>
      </div>
    </section>
  );
};