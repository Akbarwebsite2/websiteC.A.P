import React from 'react';

/**
 * Brands Component - Russian Version
 * Exact replica of the catalog image with small brand cards
 * Carefully extracted brand names from the catalog
 */
export const BrandsRu: React.FC = () => {
  // Моторные части - 36 карточек
  const motorBrands = [
    // First 10 brands with logos (1.png to 10.png)
    { name: "Вкладыши", category: "Моторные части", logo: "/1.png" },
    { name: "Поршневые кольца", category: "Моторные части", logo: "/2.png" },
    { name: "Водяной помпа", category: "Моторные части", logo: "/karta 3.png" },
    { name: "Фильтры", category: "Моторные части", logo: "/karta 4.png" },
    { name: "Подшипники", category: "Моторные части", logo: "/5.png" },
    { name: "Комплект прокладок", category: "Моторные части", logo: "/6.png" },
    { name: "Вкладыши", category: "Моторные части", logo: "/7.png" },
    { name: "Поршневые кольца", category: "Моторные части", logo: "/8.png" },
    { name: "Водяной помпа", category: "Моторные части", logo: "/9.png" },
    { name: "Фильтры", category: "Моторные части", logo: "/10.png" },
    
    // Next 5 brands with logos (11.png to 15.png)
    { name: "Подшипники", category: "Моторные части", logo: "/11.png" },
    { name: "Комплект прокладок", category: "Моторные части", logo: "/12.png" },
    { name: "Вкладыши", category: "Моторные части", logo: "/13.png" },
    { name: "Поршневые кольца", category: "Моторные части", logo: "/14.png" },
    { name: "Детали сцепления", category: "Моторные части", logo: "/15.png" },
    
    // Cards 16-20 with logos (16.png to 20.png)
    { name: "Фильтры", category: "Моторные части", logo: "/16.png" },
    { name: "Подшипники", category: "Моторные части", logo: "/17.png" },
    { name: "Комплект прокладок", category: "Моторные части", logo: "/18.png" },
    { name: "Стартер - Генератор", category: "Моторные части", logo: "/19.png" },
    { name: "Переключатель давление масла", category: "Моторные части", logo: "/20.png" },
    
    // Cards 21-25 with logos (21.png to 25.png)
    { name: "Все компоненты двигателя", category: "Моторные части", logo: "/21.png" },
    { name: "Топливный насос", category: "Моторные части", logo: "/22.png" },
    { name: "Диск сцепление", category: "Моторные части", logo: "/23.png" },
    { name: "Все компоненты двигателя", category: "Моторные части", logo: "/24.png" },
    { name: "Термостаты", category: "Моторные части", logo: "/25.png" },
    
    // Cards 26-30 with logos (26.png to 30.png)
    { name: "Сальники", category: "Моторные части", logo: "/26.png" },
    { name: "Ремень ГРМ", category: "Моторные части", logo: "/27.png" },
    { name: "Цепь ГРМ", category: "Моторные части", logo: "/28.png" },
    { name: "Свечи зажигания", category: "Моторные части", logo: "/29.png" },
    { name: "Подшипники", category: "Моторные части", logo: "/30.png" },
    
    // Remaining brands (text only) to make exactly 36 total
    { name: "Клапан двигателя", category: "Моторные части", logo: "/31.png" },
    { name: "Ремкомплект цепи ГРМ", category: "Моторные части", logo: "/32.png" },
    { name: "Натяжитель цепи", category: "Моторные части", logo: "/33.png" },
    { name: "Ремень ГРМ", category: "Моторные части", logo: "/34.png" },
    { name: "Катушка зажигания", category: "Моторные части", logo: "/35.png" },
    { name: "Цепь ГРМ", category: "Моторные части", logo: "/36.png" },
  ];

  // Ходовые части - 6 карточек
  const hodovyeBrands = [
    { name: "", category: "Ходовые части", logo: "/1 copy.png" },
    { name: "", category: "Ходовые части", logo: "/2 copy.png" },
    { name: "", category: "Ходовые части", logo: "/3 copy.png" },
    { name: "Амортизаторы", category: "Ходовые части", logo: "/4 copy.png" },
    { name: "Амортизаторы", category: "Ходовые части", logo: "/5 copy.png" },
    { name: "Амортизаторы", category: "Ходовые части", logo: "/6 copy.png" },
  ];

  // Тормозные части и трансмиссии - 5 карточек
  const tormoznyeBrands = [
    { name: "", category: "Тормозные колодки", logo: "/tormoz 1.png" },
    { name: "", category: "Тормозные диски", logo: "/tormoz 2.png" },
    { name: "Гидравлические части тормоза", category: "Тормозная жидкость", logo: "/tormoz 3.png" },
    { name: "", category: "Трансмиссионное масло", logo: "/tormoz 4.png" },
    { name: "", category: "Сцепление", logo: "/tormoz 5.png" },
  ];

  // Кузовные части / Рестайлинг - 4 карточки
  const kuzovnyeBrands = [
    { name: "Кузовные компоненты", category: "Бамперы", logo: "/kuzovnie 1.png" },
    { name: "Фары", category: "Фары", logo: "/kuzovnie 2.png" },
    { name: "Фары", category: "Зеркала", logo: "/kuzovnie 3.png" },
    { name: "Кузовные части", category: "Молдинги", logo: "/kuzovnie 4.png" },
  ];

  return (
    <section id="brands" className="py-20 relative bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="relative z-10 text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-black text-white mb-6 tracking-tight">
            НАШИ <span className="text-blue-500">БРЕНДЫ</span>
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
        </div>

        {/* МОТОРНЫЕ ЧАСТИ */}
        <div className="relative z-10">
          {/* Section Header */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white text-center py-6 mb-8 rounded-2xl shadow-2xl border border-blue-500/30 backdrop-blur-sm">
            <h3 className="text-2xl lg:text-3xl font-black tracking-wide text-shadow-glow">
              МОТОРНЫЕ ЧАСТИ
            </h3>
          </div>

          {/* Brand Cards Grid - Прямоугольные карточки */}
          <div className="flex flex-wrap justify-center gap-2 mb-16">
            {motorBrands.map((brand, index) => (
              <div 
                key={`${brand.name}-${index}`}
                className="group"
              >
                {/* Прямоугольная карточка с градиентом */}
                <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-xl p-1 hover:from-gray-700/90 hover:to-gray-800/90 transition-all duration-300 flex items-center justify-center overflow-hidden border border-blue-500/20 hover:border-blue-400/40 relative shadow-lg hover:shadow-blue-500/10 hover:shadow-xl transform hover:scale-102" style={{ width: '140px', height: '100px' }}>
                  {brand.logo ? (
                    <img 
                      src={brand.logo} 
                      alt={`${brand.name} logo`}
                      className="w-full h-full object-cover max-w-none filter brightness-110 contrast-110 rounded-lg"
                      style={{ 
                        width: '100%', 
                        height: '100%',
                        imageRendering: 'crisp-edges',
                        WebkitImageRendering: 'crisp-edges',
                        msImageRendering: 'crisp-edges'
                      }}
                    />
                  ) : (
                    <div className="text-white font-bold text-sm text-center leading-tight break-words p-1">
                      {brand.name}
                    </div>
                  )}
                  
                  {/* Gradient Shadow - всегда показывается */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent rounded-b-xl py-2">
                    {brand.name && (
                      <div className="text-white text-xs font-bold text-center px-1">
                        {brand.name}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ХОДОВЫЕ ЧАСТИ */}
        <div className="relative z-10 mt-16">
          {/* Section Header */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white text-center py-6 mb-8 rounded-2xl shadow-2xl border border-blue-500/30 backdrop-blur-sm">
            <h3 className="text-2xl lg:text-3xl font-black tracking-wide text-shadow-glow">
              ХОДОВЫЕ ЧАСТИ
            </h3>
          </div>

          {/* Ходовые части Grid - Прямоугольные карточки */}
          <div className="flex flex-wrap justify-center gap-2 mb-16">
            {hodovyeBrands.map((brand, index) => (
              <div 
                key={`hodovye-${brand.name}-${index}`}
                className="group"
              >
                {/* Прямоугольная карточка с градиентом */}
                <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-xl p-1 hover:from-gray-700/90 hover:to-gray-800/90 transition-all duration-300 flex items-center justify-center overflow-hidden border border-blue-500/20 hover:border-blue-400/40 relative shadow-lg hover:shadow-blue-500/10 hover:shadow-xl transform hover:scale-102" style={{ width: '140px', height: '100px' }}>
                  <img 
                    src={brand.logo} 
                    alt={`${brand.name} logo`}
                    className="w-full h-full object-cover max-w-none filter brightness-110 contrast-110 rounded-lg"
                    style={{ 
                      width: '100%', 
                      height: '100%',
                      imageRendering: 'crisp-edges',
                      WebkitImageRendering: 'crisp-edges',
                      msImageRendering: 'crisp-edges'
                    }}
                  />
                  
                  {/* Gradient Shadow - точно такая же как у карточек с названиями */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent rounded-b-xl py-2">
                    <div className="text-white text-xs font-bold text-center px-1">
                      {brand.name}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ТОРМОЗНЫЕ ЧАСТИ И ТРАНСМИССИИ */}
        <div className="relative z-10 mt-16">
          {/* Section Header */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white text-center py-6 mb-8 rounded-2xl shadow-2xl border border-blue-500/30 backdrop-blur-sm">
            <h3 className="text-2xl lg:text-3xl font-black tracking-wide text-shadow-glow">
              ТОРМОЗНЫЕ ЧАСТИ И ТРАНСМИССИИ
            </h3>
          </div>

          {/* Тормозные части Grid - Прямоугольные карточки */}
          <div className="flex flex-wrap justify-center gap-2 mb-16">
            {tormoznyeBrands.map((brand, index) => (
              <div 
                key={`tormoznye-${brand.name}-${index}`}
                className="group"
              >
                {/* Прямоугольная карточка с градиентом */}
                <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-xl p-1 hover:from-gray-700/90 hover:to-gray-800/90 transition-all duration-300 flex items-center justify-center overflow-hidden border border-blue-500/20 hover:border-blue-400/40 relative shadow-lg hover:shadow-blue-500/10 hover:shadow-xl transform hover:scale-102" style={{ width: '140px', height: '100px' }}>
                  <img 
                    src={brand.logo} 
                    alt={`${brand.name} logo`}
                    className="w-full h-full object-cover max-w-none filter brightness-110 contrast-110 rounded-lg"
                    style={{ 
                      width: '100%', 
                      height: '100%',
                      imageRendering: 'crisp-edges',
                      WebkitImageRendering: 'crisp-edges',
                      msImageRendering: 'crisp-edges'
                    }}
                  />
                  
                  {/* Gradient Shadow - точно такая же как у карточек с названиями */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent rounded-b-xl py-2">
                    <div className="text-white text-xs font-bold text-center px-1">
                      {brand.name}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* КУЗОВНЫЕ ЧАСТИ / РЕСТАЙЛИНГ */}
        <div className="relative z-10 mt-16">
          {/* Section Header */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white text-center py-6 mb-8 rounded-2xl shadow-2xl border border-blue-500/30 backdrop-blur-sm">
            <h3 className="text-2xl lg:text-3xl font-black tracking-wide text-shadow-glow">
              КУЗОВНЫЕ ЧАСТИ / РЕСТАЙЛИНГ
            </h3>
          </div>

          {/* Кузовные части Grid - Прямоугольные карточки */}
          <div className="flex flex-wrap justify-center gap-2 mb-16">
            {kuzovnyeBrands.map((brand, index) => (
              <div 
                key={`kuzovnye-${brand.name}-${index}`}
                className="group"
              >
                {/* Прямоугольная карточка с градиентом */}
                <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-xl p-1 hover:from-gray-700/90 hover:to-gray-800/90 transition-all duration-300 flex items-center justify-center overflow-hidden border border-blue-500/20 hover:border-blue-400/40 relative shadow-lg hover:shadow-blue-500/10 hover:shadow-xl transform hover:scale-102" style={{ width: '140px', height: '100px' }}>
                  <img 
                    src={brand.logo} 
                    alt={`${brand.name} logo`}
                    className="w-full h-full object-cover max-w-none filter brightness-110 contrast-110 rounded-lg"
                    style={{ 
                      width: '100%', 
                      height: '100%',
                      imageRendering: 'crisp-edges',
                      WebkitImageRendering: 'crisp-edges',
                      msImageRendering: 'crisp-edges'
                    }}
                  />
                  
                  {/* Gradient Shadow - точно такая же как у карточек с названиями */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent rounded-b-xl py-2">
                    <div className="text-white text-xs font-bold text-center px-1">
                      {brand.name}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* МОТОРНОЕ МАСЛО */}
        <div className="relative z-10 mt-16">
          {/* Section Header */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white text-center py-6 mb-8 rounded-2xl shadow-2xl border border-[#144374]/30 backdrop-blur-sm">
            <h3 className="text-2xl lg:text-3xl font-black tracking-wide text-shadow-glow">
              МОТОРНОЕ МАСЛО
            </h3>
          </div>

          {/* Моторное масло Grid - Прямоугольные карточки */}
          <div className="flex flex-wrap justify-center gap-2 mb-16">
            {[
              { name: "", category: "Синтетическое масло", logo: "/maslo 1.png" },
              { name: "", category: "Полусинтетическое масло", logo: "/maslo 2.png" },
              { name: "", category: "Минеральное масло", logo: "/maslo 3.png" },
              { name: "", category: "Трансмиссионное масло", logo: "/maslo 4.png" },
            ].map((brand, index) => (
              <div 
                key={`oil-${brand.name}-${index}`}
                className="group"
              >
                {/* Прямоугольная карточка с градиентом */}
                <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-xl p-1 hover:from-gray-700/90 hover:to-gray-800/90 transition-all duration-300 flex items-center justify-center overflow-hidden border border-blue-500/20 hover:border-blue-400/40 relative shadow-lg hover:shadow-blue-500/10 hover:shadow-xl transform hover:scale-102" style={{ width: '140px', height: '100px' }}>
                  <img 
                    src={brand.logo} 
                    alt={`${brand.name} logo`}
                    className="w-full h-full object-cover max-w-none filter brightness-110 contrast-110 rounded-lg"
                    style={{ 
                      width: '100%', 
                      height: '100%',
                      imageRendering: 'crisp-edges',
                      WebkitImageRendering: 'crisp-edges',
                      msImageRendering: 'crisp-edges'
                    }}
                  />
                  
                  {/* Gradient Shadow - всегда показывается */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent rounded-b-xl py-2">
                    {brand.name && (
                      <div className="text-white text-xs font-bold text-center px-1">
                        {brand.name}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};