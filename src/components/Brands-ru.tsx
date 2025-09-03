import React from 'react';
import { Award, Star, Shield, Truck } from 'lucide-react';

/**
 * Brands Component - Russian Version
 * Professional brands catalog page showcasing Common Auto Parts partners
 */
export const BrandsRu: React.FC = () => {
  // Based on the catalog image, these are the main brand categories
  const brandCategories = [
    {
      title: "Премиальные Бренды",
      description: "Ведущие мировые производители автозапчастей",
      brands: [
        { name: "BOSCH", specialty: "Системы зажигания и электроника", logo: "🔧" },
        { name: "MANN-FILTER", specialty: "Фильтрационные системы", logo: "🔍" },
        { name: "SACHS", specialty: "Амортизаторы и сцепление", logo: "⚙️" },
        { name: "BREMBO", specialty: "Тормозные системы", logo: "🛡️" }
      ]
    },
    {
      title: "Моторные Масла",
      description: "Высококачественные смазочные материалы",
      brands: [
        { name: "MOBIL 1", specialty: "Синтетические масла", logo: "🛢️" },
        { name: "CASTROL", specialty: "Моторные масла премиум класса", logo: "⚡" },
        { name: "SHELL", specialty: "Инновационные смазочные материалы", logo: "🔥" },
        { name: "TOTAL", specialty: "Профессиональные масла", logo: "💎" }
      ]
    },
    {
      title: "Оригинальные Запчасти",
      description: "OEM компоненты от производителей автомобилей",
      brands: [
        { name: "BMW", specialty: "Оригинальные запчасти BMW", logo: "🚗" },
        { name: "MERCEDES-BENZ", specialty: "Genuine Parts Mercedes", logo: "⭐" },
        { name: "AUDI", specialty: "Оригинальные детали Audi", logo: "🔷" },
        { name: "VOLKSWAGEN", specialty: "VW Original Parts", logo: "🚙" }
      ]
    }
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
            Мы сотрудничаем только с ведущими мировыми производителями автозапчастей, 
            гарантируя высочайшее качество и надежность каждого компонента.
          </p>
        </div>

        {/* Catalog Image Section */}
        <div className="relative z-10 mb-16">
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Каталог <span className="text-blue-500">Common Auto Parts</span>
              </h2>
              <p className="text-gray-300">Полный ассортимент премиальных автозапчастей</p>
            </div>
            
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img 
                src="/katalog c.a.p.jpg"
                alt="Каталог Common Auto Parts"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Brand Categories */}
        <div className="relative z-10 space-y-16">
          {brandCategories.map((category, categoryIndex) => (
            <div key={category.title} className="mb-16">
              {/* Category Header */}
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  {category.title}
                </h2>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                  {category.description}
                </p>
              </div>

              {/* Brands Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {category.brands.map((brand, brandIndex) => (
                  <div 
                    key={brand.name}
                    className="group bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl"
                  >
                    {/* Brand Logo/Icon */}
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full mb-4 group-hover:from-blue-500 group-hover:to-blue-600 transition-all duration-300 text-2xl">
                        {brand.logo}
                      </div>
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                        {brand.name}
                      </h3>
                    </div>

                    {/* Brand Specialty */}
                    <div className="text-center">
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {brand.specialty}
                      </p>
                    </div>

                    {/* Quality Badge */}
                    <div className="mt-4 flex justify-center">
                      <div className="flex items-center space-x-1 bg-blue-600/20 px-3 py-1 rounded-full">
                        <Star className="w-4 h-4 text-blue-400" />
                        <span className="text-xs text-blue-400 font-semibold">PREMIUM</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quality Assurance Section */}
        <div className="relative z-10 mt-20">
          <div className="bg-gradient-to-r from-blue-900/30 to-blue-800/30 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full mb-6">
                <Shield className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Гарантия <span className="text-blue-500">Качества</span>
              </h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Все представленные бренды проходят строгий отбор по критериям качества, 
                надежности и соответствия международным стандартам. Мы гарантируем 
                подлинность каждой запчасти и предоставляем официальную гарантию.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full mb-4">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Сертифицированные Бренды</h3>
                <p className="text-gray-400 text-sm">Только проверенные производители</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full mb-4">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Гарантия Качества</h3>
                <p className="text-gray-400 text-sm">Официальная гарантия на все товары</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full mb-4">
                  <Truck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Быстрая Доставка</h3>
                <p className="text-gray-400 text-sm">Оперативная доставка по региону</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};