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
    { name: "BOSCH", category: "Автозапчасти" },
    { name: "MANN-FILTER", category: "Фильтры" },
    { name: "SACHS", category: "Амортизаторы" },
    { name: "BREMBO", category: "Тормоза" },
    { name: "FEBI", category: "Запчасти" },
    { name: "SWAG", category: "Запчасти" },
    
    // Row 2
    { name: "MOBIL 1", category: "Масла" },
    { name: "CASTROL", category: "Масла" },
    { name: "SHELL", category: "Масла" },
    { name: "TOTAL", category: "Масла" },
    { name: "LIQUI MOLY", category: "Масла" },
    { name: "MOTUL", category: "Масла" },
    
    // Row 3
    { name: "MAHLE", category: "Фильтры" },
    { name: "HELLA", category: "Освещение" },
    { name: "CONTINENTAL", category: "Шины" },
    { name: "VALEO", category: "Электрика" },
    { name: "PIERBURG", category: "Двигатель" },
    { name: "VDO", category: "Электрика" },
    
    // Row 4
    { name: "LEMFÖRDER", category: "Подвеска" },
    { name: "CORTECO", category: "Уплотнители" },
    { name: "ELRING", category: "Прокладки" },
    { name: "TRUCKTEC", category: "Грузовые" },
    { name: "MEYLE", category: "Запчасти" },
    { name: "TOPRAN", category: "Запчасти" },
    
    // Row 5
    { name: "OPTIMAL", category: "Подвеска" },
    { name: "BIRTH", category: "Резина" },
    { name: "MAPCO", category: "Запчасти" },
    { name: "GATES", category: "Ремни" },
    { name: "DAYCO", category: "Ремни" },
    { name: "INA", category: "Подшипники" },
    
    // Row 6 (bottom row)
    { name: "FAG", category: "Подшипники" },
    { name: "SKF", category: "Подшипники" },
    { name: "ZIMMERMANN", category: "Тормоза" },
    { name: "ATE", category: "Тормоза" },
    { name: "TRW", category: "Тормоза" },
    { name: "TEXTAR", category: "Тормоза" }
  ];

  return (
    <section id="brands" className="py-16 relative bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="relative z-10 text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight">
            НАШИ <span className="text-blue-500">БРЕНДЫ</span>
          </h1>
          <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Работаем с ведущими мировыми производителями автозапчастей
          </p>
        </div>

        {/* Small Brand Cards Grid - Exactly like catalog */}
        <div className="relative z-10">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2 md:gap-3">
            {brands.map((brand, index) => (
              <div 
                key={`${brand.name}-${index}`}
                className="group bg-white/95 rounded-md p-2 border border-gray-200 hover:border-blue-400 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
              >
                {/* Small Logo Area */}
                <div className="aspect-square bg-white rounded-sm p-1 mb-1 flex items-center justify-center">
                  <div className="text-gray-800 font-bold text-[8px] sm:text-[10px] text-center leading-tight break-words">
                    {brand.name}
                  </div>
                </div>
                
                {/* Brand Name - Very Small */}
                <div className="text-gray-700 text-[7px] sm:text-[8px] font-medium text-center leading-tight">
                  {brand.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Info */}
        <div className="relative z-10 mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-900/10 to-blue-800/10 backdrop-blur-sm rounded-lg p-6 border border-blue-500/20">
            <h2 className="text-xl font-bold text-white mb-2">
              Более <span className="text-blue-500">40+ брендов</span> в каталоге
            </h2>
            <p className="text-gray-300 text-sm max-w-xl mx-auto">
              Постоянно расширяем ассортимент качественных автозапчастей
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};