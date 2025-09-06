import React from 'react';

/**
 * Brands Component - Russian Version
 * Exact replica of the catalog image with small brand cards
 * Carefully extracted brand names from the catalog
 */
export const BrandsRu: React.FC = () => {
  // Exactly 36 brand cards - logos first, then text brands
  const brands = [
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
    
    // Remaining 26 brands (text only) to make exactly 36 total
    { name: "ERISTIC Gasket", category: "Прокладки" },
    { name: "FBK", category: "Прокладки" },
    { name: "RIK", category: "Поршневые кольца" },
    { name: "GMB", category: "Водяная помпа" },
    { name: "MANN FILTER", category: "Фильтры" },
    { name: "NTN", category: "Подшипники" },
    { name: "Stone", category: "Прокладки" },
    { name: "AISIN", category: "Аккумулятор" },
    { name: "NPG", category: "Поршневые кольца" },
    { name: "EXEDY", category: "Диски сцепления" },
    { name: "TONG HONG GASKETS", category: "Прокладки головки блока" },
    { name: "TURBO", category: "Стартер + Генератор" },
    { name: "DREKF", category: "Тормозные диски" },
    { name: "SB", category: "Амортизаторы" },
    { name: "KYOSAN", category: "Топливный насос" },
    { name: "PMC Valeo", category: "Воздушный фильтр" },
    { name: "TEIKIN", category: "Все комплектующие детали" },
    { name: "TAMA", category: "Термостаты" },
    { name: "MUSASHI", category: "Поршневая группа" },
    { name: "BANDO", category: "Ремень ГРМ" },
    { name: "D.I.D", category: "Цепь ГРМ" },
    { name: "KOYO", category: "Свечи зажигания" },
    { name: "ROCKY", category: "Масло для двигателя гидравлических частей" },
    { name: "OSK", category: "Ремкомплект цепи ГРМ" },
    { name: "CAMELLIA", category: "Натяжитель, цепи Ремкомплект цепи" },
    { name: "FLAMMA", category: "Катушка зажигания" },
    { name: "IZUMI", category: "Цепь ГРМ" },
    { name: "FEBEST", category: "Подвеска" },
    { name: "GATES", category: "Ремни" },
    { name: "BOSCH", category: "Электрика" },
    { name: "DENSO", category: "Свечи зажигания" }
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
          
          {/* Catalog header like in image */}
          <div className="bg-gradient-to-r from-gray-600 to-gray-700 text-white text-center py-4 mb-8 rounded-lg shadow-lg border border-blue-500/20">
            <h3 className="text-xl lg:text-2xl font-bold tracking-wide">
              МОТОРНЫЕ ЧАСТИ
            </h3>
          </div>
        </div>

        {/* Brand Cards Grid - Compact and professional */}
        <div className="relative z-10">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {brands.map((brand, index) => (
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

        {/* Bottom Info with website colors */}
        <div className="relative z-10 mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-900/20 to-blue-800/20 backdrop-blur-sm rounded-xl p-8 border border-blue-500/30 shadow-xl">
            <h4 className="text-2xl font-bold text-white mb-3">
              Более <span className="text-blue-500">40+ брендов</span> в каталоге
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