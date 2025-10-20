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
  useEffect(() => {
  }, []);

  return (
    <div className="min-h-screen font-sans relative">
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