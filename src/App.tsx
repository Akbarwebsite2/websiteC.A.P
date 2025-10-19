import React, { useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Products } from './components/Products';
import { WhyChoose } from './components/WhyChoose';
import { Contact } from './components/Contact';
import { WhatsAppFloat } from './components/WhatsAppFloat';

/**
 * Main App Component
 * Premium auto parts website for C.A.P. (Common Auto Parts)
 * Bold, masculine design focused on engine oils and quality parts
 */
function App() {
  useEffect(() => {
  }, []);

  return (
    <div className="min-h-screen font-sans relative">
      <Header />
      <main>
        <Hero />
        <Products />
        <WhyChoose />
        <Contact />
      </main>
      <WhatsAppFloat />
    </div>
  );
}

export default App;