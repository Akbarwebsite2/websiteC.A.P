import React, { useState, useEffect } from 'react';
import { Search, Upload, Package, DollarSign, Weight, Info, FileText, Download } from 'lucide-react';
import * as XLSX from 'xlsx';

interface PartData {
  code: string;
  name: string;
  brand: string;
  price: number;
  weight: number;
  category: string;
  description?: string;
  availability: string;
}

/**
 * Catalog Component - Russian Version
 * Search system for auto parts with Excel file integration
 */
export const CatalogRu: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<PartData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [partsData, setPartsData] = useState<PartData[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isFileProcessed, setIsFileProcessed] = useState(false);
  const [totalParts, setTotalParts] = useState(0);


  // Функция поиска
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    
    if (!isFileProcessed) {
      setSearchResults([]);
      return;
    }
    
    setIsLoading(true);

    // Имитация поиска с задержкой
    setTimeout(() => {
      if (term.trim() === '') {
        setSearchResults([]);
      } else {
        const results = partsData.filter(part =>
          part.code.toLowerCase().includes(term.toLowerCase()) ||
          part.name.toLowerCase().includes(term.toLowerCase()) ||
          part.brand.toLowerCase().includes(term.toLowerCase()) ||
          part.category.toLowerCase().includes(term.toLowerCase())
        );
        setSearchResults(results);
      }
      setIsLoading(false);
    }, 300);
  };

  // Функция загрузки Excel файла
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setIsFileProcessed(false);
      setPartsData([]);
      setSearchResults([]);
      setTotalParts(0);
    }
  };

  // Функция обработки Excel файла
  const processExcelFile = async () => {
    if (selectedFile) {
      setIsLoading(true);
      try {
        const arrayBuffer = await selectedFile.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        // Преобразование данных Excel в формат PartData
        const processedData: PartData[] = jsonData.map((row: any) => ({
          code: String(row['Код'] || row['Code'] || row['код'] || row['КОД'] || row['code'] || '').trim(),
          name: String(row['Название'] || row['Name'] || row['название'] || row['НАЗВАНИЕ'] || row['name'] || '').trim(),
          brand: String(row['Бренд'] || row['Brand'] || row['бренд'] || row['БРЕНД'] || row['brand'] || '').trim(),
          price: parseFloat(String(row['Цена'] || row['Price'] || row['цена'] || row['ЦЕНА'] || row['price'] || '0').replace(/[^\d.,]/g, '').replace(',', '.')) || 0,
          weight: parseFloat(String(row['Вес'] || row['Weight'] || row['вес'] || row['ВЕС'] || row['weight'] || '0').replace(/[^\d.,]/g, '').replace(',', '.')) || 0,
          category: String(row['Категория'] || row['Category'] || row['категория'] || row['КАТЕГОРИЯ'] || row['category'] || 'Запчасти').trim(),
          description: String(row['Описание'] || row['Description'] || row['описание'] || row['ОПИСАНИЕ'] || row['description'] || '').trim(),
          availability: String(row['Наличие'] || row['Availability'] || row['наличие'] || row['НАЛИЧИЕ'] || row['availability'] || 'Под заказ').trim()
        })).filter(part => part.code && part.code !== ''); // Фильтруем пустые коды
        
        setPartsData(processedData);
        setTotalParts(processedData.length);
        setIsFileProcessed(true);
        setIsLoading(false);
        
        if (processedData.length > 0) {
          alert(`✅ Успешно загружено ${processedData.length} позиций из файла ${selectedFile.name}`);
        } else {
          alert(`⚠️ Файл обработан, но данные не найдены. Проверьте названия колонок в Excel файле.`);
        }
      } catch (error) {
        console.error('Ошибка при обработке файла:', error);
        alert('❌ Ошибка при обработке файла. Проверьте формат Excel файла.');
        setIsLoading(false);
      }
    }
  };

  return (
    <section id="catalog" className="py-20 relative bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="relative z-10 text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-black text-white mb-6 tracking-tight">
            КАТАЛОГ <span className="text-[#144374]">ЗАПЧАСТЕЙ</span>
          </h2>
          <div className="w-24 h-1 bg-[#144374] mx-auto mb-8"></div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-medium">
            Найдите нужную запчасть по коду, названию или бренду из нашего каталога более 25,000 позиций
          </p>
        </div>

        {/* Upload Section */}
        <div className="relative z-10 mb-12">
          <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-2xl p-8 border border-[#144374]/20">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Upload className="w-6 h-6 mr-3 text-[#144374]" />
              Загрузка каталога Excel
            </h3>
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1">
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleFileUpload}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#144374] file:text-white hover:file:bg-[#0f3660]"
                />
              </div>
              <button
                onClick={processExcelFile}
                disabled={!selectedFile}
                className="px-6 py-3 bg-[#144374] text-white rounded-lg hover:bg-[#0f3660] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Обработка...
                  </>
                ) : (
                  <>
                <FileText className="w-5 h-5 mr-2" />
                Обработать файл
                  </>
                )}
              </button>
            </div>
            {selectedFile && (
              <p className="mt-4 text-green-400 flex items-center">
                <Package className="w-4 h-4 mr-2" />
                Выбран файл: {selectedFile.name}
              </p>
            )}
            {isFileProcessed && totalParts > 0 && (
              <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-green-400 flex items-center">
                  <Package className="w-4 h-4 mr-2" />
                  ✅ Файл успешно обработан! Загружено {totalParts} позиций запчастей.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Search Section */}
        <div className="relative z-10 mb-12">
          <div className="max-w-2xl mx-auto">
            {!isFileProcessed && (
              <div className="mb-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-center">
                <p className="text-yellow-400">
                  ⚠️ Сначала загрузите и обработайте Excel файл с каталогом запчастей
                </p>
              </div>
            )}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                placeholder={isFileProcessed ? "Введите код запчасти, название или бренд..." : "Сначала загрузите Excel файл..."}
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                disabled={!isFileProcessed}
                className={`w-full pl-12 pr-4 py-4 bg-gray-800/90 border border-gray-600 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-[#144374] focus:ring-2 focus:ring-[#144374]/20 transition-all duration-200 text-lg ${!isFileProcessed ? 'opacity-50 cursor-not-allowed' : ''}`}
              />
            </div>
            {isFileProcessed && totalParts > 0 && (
              <p className="text-center text-gray-400 mt-2 text-sm">
                Доступно для поиска: {totalParts.toLocaleString()} позиций
              </p>
            )}
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#144374]"></div>
            <p className="text-gray-400 mt-2">Поиск...</p>
          </div>
        )}

        {/* Search Results */}
        {searchResults.length > 0 && !isLoading && (
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-white mb-6">
              Результаты поиска ({searchResults.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((part, index) => (
                <div
                  key={part.code}
                  className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-[#144374] transition-all duration-300 transform hover:-translate-y-2"
                >
                  {/* Part Code */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-[#144374] text-white px-3 py-1 rounded-full text-sm font-bold">
                      {part.code}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      part.availability === 'В наличии' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {part.availability}
                    </span>
                  </div>

                  {/* Part Info */}
                  <h4 className="text-lg font-bold text-white mb-2">{part.name}</h4>
                  <p className="text-gray-400 text-sm mb-4">{part.brand} • {part.category}</p>
                  
                  {part.description && (
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                      {part.description}
                    </p>
                  )}

                  {/* Price and Weight */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-green-400">
                      <DollarSign className="w-4 h-4 mr-1" />
                      <span className="font-bold">${part.price}</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Weight className="w-4 h-4 mr-1" />
                      <span className="text-sm">{part.weight} кг</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {searchTerm && searchResults.length === 0 && !isLoading && isFileProcessed && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-400 mb-2">Ничего не найдено</h3>
            <p className="text-gray-500">
              Попробуйте изменить поисковый запрос или проверьте правильность кода запчасти
            </p>
          </div>
        )}

        {/* Instructions */}
        {!searchTerm && isFileProcessed && (
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="bg-[#144374] p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Поиск по коду</h3>
              <p className="text-gray-400">
                Введите код запчасти для быстрого поиска
              </p>
            </div>
            <div className="text-center">
              <div className="bg-[#144374] p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Info className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Подробная информация</h3>
              <p className="text-gray-400">
                Цены, вес, наличие и характеристики
              </p>
            </div>
            <div className="text-center">
              <div className="bg-[#144374] p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Download className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Быстрый заказ</h3>
              <p className="text-gray-400">
                Свяжитесь с нами для оформления заказа
              </p>
            </div>
          </div>
        )}
        
        {/* File Upload Instructions */}
        {!isFileProcessed && (
          <div className="relative z-10 mt-16">
            <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-2xl p-8 border border-[#144374]/20">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                📋 Инструкция по загрузке каталога
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-bold text-[#144374] mb-4">Поддерживаемые колонки Excel:</h4>
                  <ul className="text-gray-300 space-y-2">
                    <li>• <strong>Код/Code</strong> - код запчасти</li>
                    <li>• <strong>Название/Name</strong> - название детали</li>
                    <li>• <strong>Бренд/Brand</strong> - производитель</li>
                    <li>• <strong>Цена/Price</strong> - стоимость</li>
                    <li>• <strong>Вес/Weight</strong> - масса</li>
                    <li>• <strong>Категория/Category</strong> - тип запчасти</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#144374] mb-4">Как использовать:</h4>
                  <ol className="text-gray-300 space-y-2">
                    <li>1. Выберите ваш Excel файл (.xlsx/.xls)</li>
                    <li>2. Нажмите "Обработать файл"</li>
                    <li>3. Дождитесь загрузки данных</li>
                    <li>4. Используйте поиск по коду или названию</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};