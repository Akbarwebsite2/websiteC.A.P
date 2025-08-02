import React from 'react';
import { Wrench, Car, Droplets, Shield, Award, Store } from 'lucide-react';

const Products = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">PREMIUM AUTO PARTS</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive range of high-quality automotive parts and accessories
          </p>
        </div>

        {/* Main 4 cards in 2x2 grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="aspect-[9/16] bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
              <Wrench className="w-16 h-16 text-white" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Моторные части</h3>
              <p className="text-gray-600">
                Высококачественные детали двигателя для оптимальной производительности и долговечности вашего автомобиля.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="aspect-[9/16] bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
              <Car className="w-16 h-16 text-white" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Ходовые части</h3>
              <p className="text-gray-600">
                Надежные компоненты подвески и рулевого управления для безопасной и комфортной езды.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="aspect-[9/16] bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
              <Droplets className="w-16 h-16 text-white" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Моторное масло</h3>
              <p className="text-gray-600">
                Премиальные моторные масла и жидкости для защиты двигателя и продления срока службы.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="aspect-[9/16] bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
              <Shield className="w-16 h-16 text-white" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Кузовные части</h3>
              <p className="text-gray-600">
                Качественные детали кузова и аксессуары для восстановления и улучшения внешнего вида.
              </p>
            </div>
          </div>
        </div>

        {/* Additional 2 cards in wide format */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="aspect-[16/9] bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center">
              <Award className="w-20 h-20 text-white" />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Оригинальные автозапчасти</h3>
              <p className="text-gray-600">
                Подлинные запчасти от ведущих производителей с гарантией качества и полной совместимостью с вашим автомобилем.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="aspect-[16/9] bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center">
              <Store className="w-20 h-20 text-white" />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Автомаркет автозапчасти</h3>
              <p className="text-gray-600">
                Широкий ассортимент запчастей для всех марок автомобилей по конкурентным ценам с быстрой доставкой.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;