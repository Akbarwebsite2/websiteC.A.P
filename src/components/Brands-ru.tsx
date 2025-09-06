import React from 'react';

/**
 * Brands Component - Russian Version
 * Exact replica of the catalog image with small brand cards
 * Carefully extracted brand names from the catalog
 */
export const BrandsRu: React.FC = () => {
  // Brands extracted exactly from the catalog image - row by row
  const brands = [
    // Row 1 (top row from catalog)
    { name: "NDC", category: "Тормозные колодки", logo: "/1.png" },
    { name: "TF", category: "Поршневые кольца", logo: "/2.png" },
    { name: "NPR", category: "Поршневая группа", logo: "/3.png" },
    { name: "Hemel", category: "Фильтры", logo: "/4.png" },
    { name: "JTEKT", category: "Подшипники", logo: "/5.png" },
    { name: "ERISTIC Gasket", category: "Прокладки" },
    
    // Row 2
    { name: "FBK", category: "Прокладки" },
    { name: "RIK", category: "Поршневые кольца" },
    { name: "GMB", category: "Водяная помпа" },
    { name: "MANN FILTER", category: "Фильтры" },
    { name: "NTN", category: "Подшипники" },
    { name: "Stone", category: "Прокладки" },
    
    // Row 3
    { name: "AISIN", category: "Аккумулятор" },
    { name: "NPG", category: "Поршневые кольца" },
    { name: "EXEDY", category: "Диски сцепления" },
    { name: "MANN FILTER", category: "Фильтры" },
    { name: "NTN", category: "Подшипники" },
    { name: "TONG HONG GASKETS", category: "Прокладки головки блока" },
    
    // Row 4
    { name: "TURBO", category: "Стартер + Генератор" },
    { name: "DREKF", category: "Тормозные диски" },
    { name: "SB", category: "Амортизаторы" },
    { name: "KYOSAN", category: "Топливный насос" },
    { name: "PMC Valeo", category: "Воздушный фильтр" },
    { name: "TEIKIN", category: "Все комплектующие детали" },
    
    // Row 5
    { name: "TAMA", category: "Термостаты" },
    { name: "M", category: "MUSASHI" },
    { name: "BANDO", category: "Ремень ГРМ" },
    { name: "D.I.D", category: "Цепь ГРМ" },
    { name: "KOYO", category: "Свечи зажигания" },
    { name: "AISIN", category: "Подшипники + амортизаторы" },
    
    // Row 6 (bottom row)
    { name: "ROCKY", category: "Масло для двигателя гидравлических частей" },
    { name: "OSK", category: "Ремкомплект цепи ГРМ" },
    { name: "CAMELLIA", category: "Натяжитель, цепи Ремкомплект цепи" },
    { name: "GMB", category: "Ремень ГРМ" },
    { name: "FLAMMA", category: "Катушка зажигания" },
    { name: "IZUMI", category: "Цепь ГРМ" }
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
          <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-15 gap-2">
            {brands.map((brand, index) => (
              <div 
                key={`${brand.name}-${index}`}
                className="group bg-white/95 backdrop-blur-sm rounded-md p-1 border border-gray-200 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-white"
              >
                {/* Logo Area */}
                <div className="aspect-square bg-white rounded-sm p-1 mb-1 flex items-center justify-center shadow-sm overflow-hidden h-12 w-12 mx-auto">
                  {brand.logo ? (
                    <img 
                      src={brand.logo} 
                      alt={`${brand.name} logo`}
                      className="w-10 h-10 object-contain"
                      style={{ 
                        maxWidth: '100%', 
                        maxHeight: '100%',
                        imageRendering: 'crisp-edges'
                      }}
                    />
                  ) : (
                    <div className="text-gray-800 font-bold text-[8px] text-center leading-tight break-words">
                      {brand.name}
                    </div>
                  )}
                </div>
                
                {/* Brand Name */}
                <div className="text-gray-700 text-[8px] font-semibold text-center leading-tight group-hover:text-blue-600 transition-colors duration-300">
                  {brand.name}
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