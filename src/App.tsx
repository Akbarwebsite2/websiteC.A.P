import React from 'react';
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
  return (
    <div className="min-h-screen bg-gray-900 font-sans">
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