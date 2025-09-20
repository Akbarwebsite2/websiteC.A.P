import React, { useEffect } from 'react';
import { HeaderRu } from './components/Header-ru';
import { HeroRu } from './components/Hero-ru';
import { ProductsRu } from './components/Products-ru';
import { BrandsRu } from './components/Brands-ru';
import { WhyChooseRu } from './components/WhyChoose-ru';
import { ContactRu } from './components/Contact-ru';
import { WhatsAppFloat } from './components/WhatsAppFloat';

/**
 * Main App Component - Russian Version
 * Premium auto parts website for C.A.P. (Common Auto Parts)
 * Bold, masculine design focused on engine oils and quality parts
 */
function AppRu() {
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    // Скрыть загрузчик через 3.5 секунды
    const loaderTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);

    // Mouse movement effect
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      document.documentElement.style.setProperty('--mouse-x', `${x}%`);
      document.documentElement.style.setProperty('--mouse-y', `${y}%`);
    };

    // Click ripple effect
    const handleClick = (e: MouseEvent) => {
      const ripple = document.createElement('div');
      ripple.className = 'click-ripple';
      ripple.style.left = `${e.clientX - 50}px`;
      ripple.style.top = `${e.clientY - 50}px`;
      ripple.style.width = '100px';
      ripple.style.height = '100px';
      
      document.body.appendChild(ripple);
      
      setTimeout(() => {
        document.body.removeChild(ripple);
      }, 800);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);

    return () => {
      clearTimeout(loaderTimer);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className="min-h-screen font-sans relative">
      {/* МОЩНЫЙ ЗАГРУЗЧИК ПРИВЕТСТВИЯ */}
      {isLoading && (
        <div className="page-loader">
          {/* Анимированные частицы */}
          <div className="particles">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="particle"></div>
            ))}
          </div>
          
          {/* Центральный логотип */}
          <div className="text-center">
            <img 
              src="/cap logotip.jpg" 
              alt="C.A.P. Logo" 
              className="loader-logo h-32 w-32 sm:h-40 sm:w-40 lg:h-48 lg:w-48 rounded-full object-cover border-4 border-blue-600 mx-auto brightness-110 contrast-125 saturate-110 filter"
              style={{ 
                imageRendering: 'crisp-edges',
                WebkitImageRendering: 'crisp-edges',
                msImageRendering: 'crisp-edges'
              }}
            />
            
            {/* Анимированный текст C.A.P */}
            <div className="mt-8">
              <img 
                src="/Parts 2.png" 
                alt="C.A.P" 
                className="h-16 sm:h-20 lg:h-24 object-contain mx-auto filter brightness-110 contrast-125 saturate-110 loader-logo"
                style={{ 
                  imageRendering: 'crisp-edges',
                  WebkitImageRendering: 'crisp-edges',
                  msImageRendering: 'crisp-edges'
                }}
              />
            </div>
          </div>
          
          {/* Текст приветствия */}
          <div className="welcome-text">
            <div className="typewriter">
              Добро пожаловать в мир качественных автозапчастей
            </div>
          </div>
        </div>
      )}

      <HeaderRu />
      <main>
        <HeroRu />
        <ProductsRu />
        <BrandsRu />
        <WhyChooseRu />
        <ContactRu />
      </main>
      <WhatsAppFloat />
    </div>
  );
}

export default AppRu;