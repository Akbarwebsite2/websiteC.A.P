import React, { useEffect } from 'react';
import { HeaderRu } from './components/Header-ru';
import { HeroRu } from './components/Hero-ru';
import { ProductsRu } from './components/Products-ru';
import { WhyChooseRu } from './components/WhyChoose-ru';
import { ContactRu } from './components/Contact-ru';
import { WhatsAppFloat } from './components/WhatsAppFloat';

/**
 * Main App Component - Russian Version
 * Premium auto parts website for C.A.P. (Common Auto Parts)
 * Bold, masculine design focused on engine oils and quality parts
 */
function AppRu() {
  useEffect(() => {
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
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className="min-h-screen font-sans relative">
      <HeaderRu />
      <main>
        <HeroRu />
        <ProductsRu />
        <WhyChooseRu />
        <ContactRu />
      </main>
      <WhatsAppFloat />
    </div>
  );
}

export default AppRu;