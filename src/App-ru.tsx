import React from 'react';
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
  return (
    <div className="min-h-screen bg-black font-sans">
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