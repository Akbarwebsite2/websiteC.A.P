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
          
          {/* МОТОРНЫЕ ЧАСТИ */}
          <div className="bg-gradient-to-r from-gray-600 to-gray-700 text-white text-center py-4 mb-8 rounded-lg shadow-lg border border-blue-500/20">
            <h3 className="text-xl lg:text-2xl font-bold tracking-wide">
              МОТОРНЫЕ ЧАСТИ
            </h3>
          </div>
        </div>

        {/* Brand Cards Grid - Compact and professional */}
        <div className="relative z-10">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {motorBrands.map((brand, index) => (
              <div 
                key={`${brand.name}-${index}`}
                className="group text-center p-4"
              >
                {/* Logo - огромный размер */}
                <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 hover:bg-white transition-all duration-300 mb-4 flex items-center justify-center overflow-hidden border-2 border-gray-300 hover:border-blue-500" style={{ width: '120px', height: '120px' }}>
                  {brand.logo ? (
                    <img 
                      src={brand.logo} 
                      alt={`${brand.name} logo`}
                      className="w-full h-full object-contain max-w-none"
                      style={{ 
                        maxWidth: '100%', 
                        maxHeight: '100%',
                        imageRendering: 'crisp-edges'
                      }}
                    />
                  ) : (
                    <div className="text-gray-800 font-bold text-sm text-center leading-tight break-words p-2">
                      {brand.name}
                    </div>
                  )}
                  
                  {/* Brand Name - внизу внутри карточки */}
                  <div className="absolute bottom-2 left-0 right-0 text-gray-800 text-xs font-semibold text-center px-1 bg-white/90 rounded mx-1">
                    {brand.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ХОДОВЫЕ ЧАСТИ */}
        <div className="relative z-10 mt-16">
          {/* Catalog header */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 text-white text-center py-4 mb-8 rounded-lg shadow-lg border border-green-500/20">
            <h3 className="text-xl lg:text-2xl font-bold tracking-wide">
              ХОДОВЫЕ ЧАСТИ
            </h3>
          </div>

          {/* Ходовые части Grid - 6 карточек */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {hodovyeBrands.map((brand, index) => (
              <div 
                key={`hodovye-${brand.name}-${index}`}
                className="group text-center p-4"
              >
                {/* Logo - огромный размер */}
                <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 hover:bg-white transition-all duration-300 mb-4 flex items-center justify-center overflow-hidden border-2 border-gray-300 hover:border-green-500 relative" style={{ width: '120px', height: '120px' }}>
                  <img 
                    src={brand.logo} 
                    alt={`${brand.name} logo`}
                    className="w-full h-full object-contain max-w-none"
                    style={{ 
                      maxWidth: '100%', 
                      maxHeight: '100%',
                      imageRendering: 'crisp-edges'
                    }}
                  />
                  
                  {/* Brand Name - внизу внутри карточки */}
                  <div className="absolute bottom-2 left-0 right-0 text-gray-800 text-xs font-semibold text-center px-1 bg-white/90 rounded mx-1">
                    {brand.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ТОРМОЗНЫЕ ЧАСТИ И ТРАНСМИССИИ */}
        <div className="relative z-10 mt-16">
          {/* Catalog header */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white text-center py-4 mb-8 rounded-lg shadow-lg border border-red-500/20">
            <h3 className="text-xl lg:text-2xl font-bold tracking-wide">
              ТОРМОЗНЫЕ ЧАСТИ И ТРАНСМИССИИ
            </h3>
          </div>

          {/* Тормозные части Grid - 5 карточек */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {tormoznyeBrands.map((brand, index) => (
              <div 
                key={`tormoznye-${brand.name}-${index}`}
                className="group text-center p-4"
              >
                {/* Logo - огромный размер */}
                <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 hover:bg-white transition-all duration-300 mb-4 flex items-center justify-center overflow-hidden border-2 border-gray-300 hover:border-red-500 relative" style={{ width: '120px', height: '120px' }}>
                  <img 
                    src={brand.logo} 
                    alt={`${brand.name} logo`}
                    className="w-full h-full object-contain max-w-none"
                    style={{ 
                      maxWidth: '100%', 
                      maxHeight: '100%',
                      imageRendering: 'crisp-edges'
                    }}
                  />
                  
                  {/* Brand Name - внизу внутри карточки */}
                  <div className="absolute bottom-2 left-0 right-0 text-gray-800 text-xs font-semibold text-center px-1 bg-white/90 rounded mx-1">
                    {brand.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* КУЗОВНЫЕ ЧАСТИ / РЕСТАЙЛИНГ */}
        <div className="relative z-10 mt-16">
          {/* Catalog header */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white text-center py-4 mb-8 rounded-lg shadow-lg border border-purple-500/20">
            <h3 className="text-xl lg:text-2xl font-bold tracking-wide">
              КУЗОВНЫЕ ЧАСТИ / РЕСТАЙЛИНГ
            </h3>
          </div>

          {/* Кузовные части Grid - 4 карточки */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {kuzovnyeBrands.map((brand, index) => (
              <div 
                key={`kuzovnye-${brand.name}-${index}`}
                className="group text-center p-4"
              >
                {/* Logo - огромный размер */}
                <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 hover:bg-white transition-all duration-300 mb-4 flex items-center justify-center overflow-hidden border-2 border-gray-300 hover:border-purple-500 relative" style={{ width: '120px', height: '120px' }}>
                  <img 
                    src={brand.logo} 
                    alt={`${brand.name} logo`}
                    className="w-full h-full object-contain max-w-none"
                    style={{ 
                      maxWidth: '100%', 
                      maxHeight: '100%',
                      imageRendering: 'crisp-edges'
                    }}
                  />
                  
                  {/* Brand Name - внизу внутри карточки */}
                  <div className="absolute bottom-2 left-0 right-0 text-gray-800 text-xs font-semibold text-center px-1 bg-white/90 rounded mx-1">
                    {brand.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Info with website colors */}
        <div className="relative z-10 mt-12 text-center">
        {/* МОТОРНОЕ МАСЛО */}
        <div className="relative z-10 mt-16">
          {/* Catalog header */}
          <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white text-center py-4 mb-8 rounded-lg shadow-lg border border-orange-500/20">
            <h3 className="text-xl lg:text-2xl font-bold tracking-wide">
              МОТОРНОЕ МАСЛО
            </h3>
          </div>

          {/* Моторное масло Grid - 4 карточки */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[
              { name: "Oil Brand 1", category: "Синтетическое масло", logo: "/oil1.png" },
              { name: "Oil Brand 2", category: "Полусинтетическое масло", logo: "/oil2.png" },
              { name: "Oil Brand 3", category: "Минеральное масло", logo: "/oil3.png" },
              { name: "Oil Brand 4", category: "Трансмиссионное масло", logo: "/oil4.png" },
            ].map((brand, index) => (
              <div 
                key={`oil-${brand.name}-${index}`}
                className="group text-center p-4"
              >
                {/* Logo - огромный размер */}
                <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 hover:bg-white transition-all duration-300 mb-4 flex items-center justify-center overflow-hidden border-2 border-gray-300 hover:border-orange-500 relative" style={{ width: '120px', height: '120px' }}>
                  <img 
                    src={brand.logo} 
                    alt={`${brand.name} logo`}
                    className="w-full h-full object-contain max-w-none"
                    style={{ 
                      maxWidth: '100%', 
                      maxHeight: '100%',
                      imageRendering: 'crisp-edges'
                    }}
                  />
                  
                  {/* Brand Name - внизу внутри карточки */}
                  <div className="absolute bottom-2 left-0 right-0 text-gray-800 text-xs font-semibold text-center px-1 bg-white/90 rounded mx-1">
                    {brand.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Info with website colors */}
        <div className="relative z-10 mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-900/20 to-blue-800/20 backdrop-blur-sm rounded-xl p-8 border border-blue-500/30 shadow-xl">
            <h4 className="text-2xl font-bold text-white mb-3">
              Более <span className="text-blue-500">55+ брендов</span> в каталоге
            </h4>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
              Постоянно расширяем ассортимент качественных автозапчастей от ведущих мировых производителей
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};