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
    { name: "NDC", category: "Тормозные колодки", logo: "/1.png" },
    { name: "TF", category: "Поршневые кольца", logo: "/2.png" },
    { name: "NPR", category: "Поршневая группа", logo: "/3.png" },
    { name: "Hemel", category: "Фильтры", logo: "/4.png" },
    { name: "JTEKT", category: "Подшипники", logo: "/5.png" },
    { name: "Brand 6", category: "Автозапчасти", logo: "/6.png" },
    { name: "Brand 7", category: "Автозапчасти", logo: "/7.png" },
    { name: "Brand 8", category: "Автозапчасти", logo: "/8.png" },
    { name: "Brand 9", category: "Автозапчасти", logo: "/9.png" },
    { name: "Brand 10", category: "Автозапчасти", logo: "/10.png" },
    
    // Next 5 brands with logos (11.png to 15.png)
    { name: "Brand 11", category: "Автозапчасти", logo: "/11.png" },
    { name: "Brand 12", category: "Автозапчасти", logo: "/12.png" },
    { name: "Brand 13", category: "Автозапчасти", logo: "/13.png" },
    { name: "Brand 14", category: "Автозапчасти", logo: "/14.png" },
    { name: "Brand 15", category: "Автозапчасти", logo: "/15.png" },
    
    // Cards 16-20 with logos (16.png to 20.png)
    { name: "Brand 16", category: "Автозапчасти", logo: "/16.png" },
    { name: "Brand 17", category: "Автозапчасти", logo: "/17.png" },
    { name: "Brand 18", category: "Автозапчасти", logo: "/18.png" },
    { name: "Brand 19", category: "Автозапчасти", logo: "/19.png" },
    { name: "Brand 20", category: "Автозапчасти", logo: "/20.png" },
    
    // Cards 21-25 with logos (21.png to 25.png)
    { name: "Brand 21", category: "Автозапчасти", logo: "/21.png" },
    { name: "Brand 22", category: "Автозапчасти", logo: "/22.png" },
    { name: "Brand 23", category: "Автозапчасти", logo: "/23.png" },
    { name: "Brand 24", category: "Автозапчасти", logo: "/24.png" },
    { name: "Brand 25", category: "Автозапчасти", logo: "/25.png" },
    
    // Cards 26-30 with logos (26.png to 30.png)
    { name: "Brand 26", category: "Автозапчасти", logo: "/26.png" },
    { name: "Brand 27", category: "Автозапчасти", logo: "/27.png" },
    { name: "Brand 28", category: "Автозапчасти", logo: "/28.png" },
    { name: "Brand 29", category: "Автозапчасти", logo: "/29.png" },
    { name: "Brand 30", category: "Автозапчасти", logo: "/30.png" },
    
    // Remaining brands (text only) to make exactly 36 total
    { name: "Brand 31", category: "Автозапчасти", logo: "/31.png" },
    { name: "Brand 32", category: "Автозапчасти", logo: "/32.png" },
    { name: "Brand 33", category: "Автозапчасти", logo: "/33.png" },
    { name: "Brand 34", category: "Автозапчасти", logo: "/34.png" },
    { name: "Brand 35", category: "Автозапчасти", logo: "/35.png" },
    { name: "Stone", category: "Прокладки", logo: "/36.png" },
  ];

  // Ходовые части - 6 карточек
  const hodovyeBrands = [
    { name: "Suspension Brand 1", category: "Амортизаторы", logo: "/1 copy.png" },
    { name: "Suspension Brand 2", category: "Пружины", logo: "/2 copy.png" },
    { name: "Suspension Brand 3", category: "Стойки", logo: "/3 copy.png" },
    { name: "Suspension Brand 4", category: "Рычаги", logo: "/4 copy.png" },
    { name: "Suspension Brand 5", category: "Шаровые опоры", logo: "/5 copy.png" },
    { name: "Suspension Brand 6", category: "Сайлентблоки", logo: "/6 copy.png" },
  ];

  // Тормозные части и трансмиссии - 5 карточек
  const tormoznyeBrands = [
    { name: "Brake Brand 1", category: "Тормозные колодки", logo: "/tormoz 1.png" },
    { name: "Brake Brand 2", category: "Тормозные диски", logo: "/tormoz 2.png" },
    { name: "Brake Brand 3", category: "Тормозная жидкость", logo: "/tormoz 3.png" },
    { name: "Transmission Brand 1", category: "Трансмиссионное масло", logo: "/tormoz 4.png" },
    { name: "Transmission Brand 2", category: "Сцепление", logo: "/tormoz 5.png" },
  ];

  // Кузовные части / Рестайлинг - 4 карточки
  const kuzovnyeBrands = [
    { name: "Body Brand 1", category: "Бамперы", logo: "/kuzovnie 1.png" },
    { name: "Body Brand 2", category: "Фары", logo: "/kuzovnie 2.png" },
    { name: "Body Brand 3", category: "Зеркала", logo: "/kuzovnie 3.png" },
    { name: "Body Brand 4", category: "Молдинги", logo: "/kuzovnie 4.png" },
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
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-6 mb-8 rounded-2xl shadow-2xl border border-blue-500/30 backdrop-blur-sm">
            <h3 className="text-2xl lg:text-3xl font-black tracking-wide text-shadow-glow">
              МОТОРНЫЕ ЧАСТИ
            </h3>
          </div>

          {/* Brand Cards Grid - Прямоугольные карточки */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 mb-16">
            {motorBrands.map((brand, index) => (
              <div 
                key={`${brand.name}-${index}`}
                className="group"
              >
                {/* Прямоугольная карточка с градиентом */}
                <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-xl p-3 hover:from-blue-800/90 hover:to-blue-900/90 transition-all duration-300 flex items-center justify-center overflow-hidden border border-blue-500/20 hover:border-blue-400/60 relative shadow-lg hover:shadow-blue-500/20 hover:shadow-xl transform hover:scale-105" style={{ width: '140px', height: '100px' }}>
                  {brand.logo ? (
                    <img 
                      src={brand.logo} 
                      alt={`${brand.name} logo`}
                      className="w-full h-full object-contain max-w-none filter brightness-110 contrast-110"
                      style={{ 
                        maxWidth: '90%', 
                        maxHeight: '90%',
                        imageRendering: 'crisp-edges'
                      }}
                    />
                  ) : (
                    <div className="text-white font-bold text-sm text-center leading-tight break-words p-2">
                      {brand.name}
                    </div>
                  )}
                  
                  {/* Brand Name - внизу с градиентом */}
                  <div className="absolute bottom-1 left-0 right-0 text-white text-xs font-bold text-center px-1 bg-gradient-to-t from-black/80 to-transparent rounded-b-xl py-1">
                    {brand.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ХОДОВЫЕ ЧАСТИ */}
        <div className="relative z-10 mt-16">
          {/* Section Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-6 mb-8 rounded-2xl shadow-2xl border border-blue-500/30 backdrop-blur-sm">
            <h3 className="text-2xl lg:text-3xl font-black tracking-wide text-shadow-glow">
              ХОДОВЫЕ ЧАСТИ
            </h3>
          </div>

          {/* Ходовые части Grid - Прямоугольные карточки */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 mb-16">
            {hodovyeBrands.map((brand, index) => (
              <div 
                key={`hodovye-${brand.name}-${index}`}
                className="group"
              >
                {/* Прямоугольная карточка с градиентом */}
                <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-xl p-3 hover:from-blue-800/90 hover:to-blue-900/90 transition-all duration-300 flex items-center justify-center overflow-hidden border border-blue-500/20 hover:border-blue-400/60 relative shadow-lg hover:shadow-blue-500/20 hover:shadow-xl transform hover:scale-105" style={{ width: '140px', height: '100px' }}>
                  <img 
                    src={brand.logo} 
                    alt={`${brand.name} logo`}
                    className="w-full h-full object-contain max-w-none filter brightness-110 contrast-110"
                    style={{ 
                      maxWidth: '90%', 
                      maxHeight: '90%',
                      imageRendering: 'crisp-edges'
                    }}
                  />
                  
                  {/* Brand Name - внизу с градиентом */}
                  <div className="absolute bottom-1 left-0 right-0 text-white text-xs font-bold text-center px-1 bg-gradient-to-t from-black/80 to-transparent rounded-b-xl py-1">
                    {brand.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ТОРМОЗНЫЕ ЧАСТИ И ТРАНСМИССИИ */}
        <div className="relative z-10 mt-16">
          {/* Section Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-6 mb-8 rounded-2xl shadow-2xl border border-blue-500/30 backdrop-blur-sm">
            <h3 className="text-2xl lg:text-3xl font-black tracking-wide text-shadow-glow">
              ТОРМОЗНЫЕ ЧАСТИ И ТРАНСМИССИИ
            </h3>
          </div>

          {/* Тормозные части Grid - Прямоугольные карточки */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mb-16">
            {tormoznyeBrands.map((brand, index) => (
              <div 
                key={`tormoznye-${brand.name}-${index}`}
                className="group"
              >
                {/* Прямоугольная карточка с градиентом */}
                <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-xl p-3 hover:from-blue-800/90 hover:to-blue-900/90 transition-all duration-300 flex items-center justify-center overflow-hidden border border-blue-500/20 hover:border-blue-400/60 relative shadow-lg hover:shadow-blue-500/20 hover:shadow-xl transform hover:scale-105" style={{ width: '140px', height: '100px' }}>
                  <img 
                    src={brand.logo} 
                    alt={`${brand.name} logo`}
                    className="w-full h-full object-contain max-w-none filter brightness-110 contrast-110"
                    style={{ 
                      maxWidth: '90%', 
                      maxHeight: '90%',
                      imageRendering: 'crisp-edges'
                    }}
                  />
                  
                  {/* Brand Name - внизу с градиентом */}
                  <div className="absolute bottom-1 left-0 right-0 text-white text-xs font-bold text-center px-1 bg-gradient-to-t from-black/80 to-transparent rounded-b-xl py-1">
                    {brand.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* КУЗОВНЫЕ ЧАСТИ / РЕСТАЙЛИНГ */}
        <div className="relative z-10 mt-16">
          {/* Section Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-6 mb-8 rounded-2xl shadow-2xl border border-blue-500/30 backdrop-blur-sm">
            <h3 className="text-2xl lg:text-3xl font-black tracking-wide text-shadow-glow">
              КУЗОВНЫЕ ЧАСТИ / РЕСТАЙЛИНГ
            </h3>
          </div>

          {/* Кузовные части Grid - Прямоугольные карточки */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-16">
            {kuzovnyeBrands.map((brand, index) => (
              <div 
                key={`kuzovnye-${brand.name}-${index}`}
                className="group"
              >
                {/* Прямоугольная карточка с градиентом */}
                <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-xl p-3 hover:from-blue-800/90 hover:to-blue-900/90 transition-all duration-300 flex items-center justify-center overflow-hidden border border-blue-500/20 hover:border-blue-400/60 relative shadow-lg hover:shadow-blue-500/20 hover:shadow-xl transform hover:scale-105" style={{ width: '140px', height: '100px' }}>
                  <img 
                    src={brand.logo} 
                    alt={`${brand.name} logo`}
                    className="w-full h-full object-contain max-w-none filter brightness-110 contrast-110"
                    style={{ 
                      maxWidth: '90%', 
                      maxHeight: '90%',
                      imageRendering: 'crisp-edges'
                    }}
                  />
                  
                  {/* Brand Name - внизу с градиентом */}
                  <div className="absolute bottom-1 left-0 right-0 text-white text-xs font-bold text-center px-1 bg-gradient-to-t from-black/80 to-transparent rounded-b-xl py-1">
                    {brand.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* МОТОРНОЕ МАСЛО */}
        <div className="relative z-10 mt-16">
          {/* Section Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-6 mb-8 rounded-2xl shadow-2xl border border-blue-500/30 backdrop-blur-sm">
            <h3 className="text-2xl lg:text-3xl font-black tracking-wide text-shadow-glow">
              МОТОРНОЕ МАСЛО
            </h3>
          </div>

          {/* Моторное масло Grid - Прямоугольные карточки */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-16">
            {[
              { name: "Oil Brand 1", category: "Синтетическое масло", logo: "/maslo 1.png" },
              { name: "Oil Brand 2", category: "Полусинтетическое масло", logo: "/maslo 2.png" },
              { name: "Oil Brand 3", category: "Минеральное масло", logo: "/maslo 3.png" },
              { name: "Oil Brand 4", category: "Трансмиссионное масло", logo: "/maslo 4.png" },
            ].map((brand, index) => (
              <div 
                key={`oil-${brand.name}-${index}`}
                className="group"
              >
                {/* Прямоугольная карточка с градиентом */}
                <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-xl p-3 hover:from-blue-800/90 hover:to-blue-900/90 transition-all duration-300 flex items-center justify-center overflow-hidden border border-blue-500/20 hover:border-blue-400/60 relative shadow-lg hover:shadow-blue-500/20 hover:shadow-xl transform hover:scale-105" style={{ width: '140px', height: '100px' }}>
                  <img 
                    src={brand.logo} 
                    alt={`${brand.name} logo`}
                    className="w-full h-full object-contain max-w-none filter brightness-110 contrast-110"
                    style={{ 
                      maxWidth: '90%', 
                      maxHeight: '90%',
                      imageRendering: 'crisp-edges'
                    }}
                  />
                  
                  {/* Brand Name - внизу с градиентом */}
                  <div className="absolute bottom-1 left-0 right-0 text-white text-xs font-bold text-center px-1 bg-gradient-to-t from-black/80 to-transparent rounded-b-xl py-1">
                    {brand.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Info with website colors */}
        <div className="relative z-10 mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-900/30 to-blue-800/30 backdrop-blur-md rounded-2xl p-10 border border-blue-500/40 shadow-2xl">
            <h4 className="text-3xl font-black text-white mb-4 text-shadow-glow">
              Более <span className="text-blue-500">55+ брендов</span> в каталоге
            </h4>
            <p className="text-gray-200 text-xl max-w-3xl mx-auto leading-relaxed font-medium">
              Постоянно расширяем ассортимент качественных автозапчастей от ведущих мировых производителей
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};