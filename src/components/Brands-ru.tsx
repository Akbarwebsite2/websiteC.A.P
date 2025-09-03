import React from 'react';

/**
 * Brands Component - Russian Version
 * Brand cards extracted from the Common Auto Parts catalog image
 * Professional layout matching the catalog design
 */
export const BrandsRu: React.FC = () => {
  // Brands extracted from the catalog image
  const brands = [
    // Row 1
    { name: "BOSCH", logo: "/brands/bosch.png", category: "Автозапчасти" },
    { name: "MANN-FILTER", logo: "/brands/mann.png", category: "Фильтры" },
    { name: "SACHS", logo: "/brands/sachs.png", category: "Амортизаторы" },
    { name: "BREMBO", logo: "/brands/brembo.png", category: "Тормоза" },
    { name: "FEBI", logo: "/brands/febi.png", category: "Запчасти" },
    
    // Row 2
    { name: "MOBIL 1", logo: "/brands/mobil.png", category: "Масла" },
    { name: "CASTROL", logo: "/brands/castrol.png", category: "Масла" },
    { name: "SHELL", logo: "/brands/shell.png", category: "Масла" },
    { name: "TOTAL", logo: "/brands/total.png", category: "Масла" },
    { name: "LIQUI MOLY", logo: "/brands/liquimoly.png", category: "Масла" },
    
    // Row 3
    { name: "MAHLE", logo: "/brands/mahle.png", category: "Фильтры" },
    { name: "HELLA", logo: "/brands/hella.png", category: "Освещение" },
    { name: "CONTINENTAL", logo: "/brands/continental.png", category: "Шины" },
    { name: "VALEO", logo: "/brands/valeo.png", category: "Электрика" },
    { name: "PIERBURG", logo: "/brands/pierburg.png", category: "Двигатель" },
    
    // Row 4
    { name: "LEMFÖRDER", logo: "/brands/lemforder.png", category: "Подвеска" },
    { name: "SWAG", logo: "/brands/swag.png", category: "Запчасти" },
    { name: "CORTECO", logo: "/brands/corteco.png", category: "Уплотнители" },
    { name: "ELRING", logo: "/brands/elring.png", category: "Прокладки" },
    { name: "TRUCKTEC", logo: "/brands/trucktec.png", category: "Грузовые" },
    
    // Row 5
    { name: "MEYLE", logo: "/brands/meyle.png", category: "Запчасти" },
    { name: "TOPRAN", logo: "/brands/topran.png", category: "Запчасти" },
    { name: "OPTIMAL", logo: "/brands/optimal.png", category: "Подвеска" },
    { name: "BIRTH", logo: "/brands/birth.png", category: "Резина" },
    { name: "MAPCO", logo: "/brands/mapco.png", category: "Запчасти" },
    
    // Row 6
    { name: "GATES", logo: "/brands/gates.png", category: "Ремни" },
    { name: "DAYCO", logo: "/brands/dayco.png", category: "Ремни" },
    { name: "INA", logo: "/brands/ina.png", category: "Подшипники" },
    { name: "FAG", logo: "/brands/fag.png", category: "Подшипники" },
    { name: "SKF", logo: "/brands/skf.png", category: "Подшипники" }
  ];

  return (
    <section id="brands" className="py-20 relative bg-transparent min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="relative z-10 text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-black text-white mb-6 tracking-tight">
            НАШИ <span className="text-blue-500">БРЕНДЫ</span>
          </h1>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-medium">
            Мы работаем только с ведущими мировыми производителями автозапчастей, 
            гарантируя высочайшее качество каждого компонента.
          </p>
        </div>

        {/* Brands Grid - Matching catalog layout */}
        <div className="relative z-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {brands.map((brand, index) => (
              <div 
                key={brand.name}
                className="group bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Brand Logo Area */}
                <div className="aspect-square bg-white/90 rounded-md p-3 mb-3 flex items-center justify-center group-hover:bg-white transition-colors duration-300">
                  {/* Placeholder for brand logo - using text for now since we don't have actual logo files */}
                  <div className="text-gray-800 font-bold text-xs text-center leading-tight">
                    {brand.name}
                  </div>
                </div>
                
                {/* Brand Name */}
                <h3 className="text-white text-sm font-semibold text-center mb-1 group-hover:text-blue-400 transition-colors duration-300">
                  {brand.name}
                </h3>
                
                {/* Category */}
                <p className="text-gray-400 text-xs text-center">
                  {brand.category}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="relative z-10 mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-900/20 to-blue-800/20 backdrop-blur-sm rounded-xl p-8 border border-blue-500/20">
            <h2 className="text-2xl font-bold text-white mb-4">
              Более <span className="text-blue-500">30 брендов</span> в нашем каталоге
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Постоянно расширяем ассортимент, добавляя новые бренды и продукты 
              для удовлетворения всех потребностей наших клиентов.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};