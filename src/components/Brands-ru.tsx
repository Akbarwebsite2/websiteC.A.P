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
    { name: "NDC", category: "Тормозные колодки" },
    { name: "TF", category: "Поршневые кольца" },
    { name: "NPR", category: "Поршневая группа" },
    { name: "Hemel", category: "Фильтры" },
    { name: "JTEKT", category: "Подшипники" },
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
    <section id="brands" className="py-16 relative bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section - Exact match to catalog */}
        <div className="relative z-10 mb-8">
          {/* Gray header bar like in catalog */}
          <div className="bg-gray-300 text-black text-center py-3 mb-6 rounded-t-lg">
            <h1 className="text-2xl lg:text-3xl font-bold tracking-wide">
              МОТОРНЫЕ ЧАСТИ
            </h1>
          </div>
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