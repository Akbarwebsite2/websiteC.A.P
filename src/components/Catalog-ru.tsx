import React, { useState, useEffect } from 'react';
import { Search, Package, Weight, Info, Lock, LogOut, User, Upload, FileText, Save } from 'lucide-react';
import { AuthModal } from './AuthModal';
import * as XLSX from 'xlsx';

interface PartData {
  code: string;
  name: string;
  brand: string;
  price: string;
  weight: string;
  category: string;
  description?: string;
  availability: string;
}

interface AuthUser {
  email: string;
  password: string;
  name: string;
}

/**
 * Catalog Component - Russian Version
 * Search system for auto parts with Excel file integration
 */
export const CatalogRu: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<PartData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAdminButton, setShowAdminButton] = useState(false);
  const [catalogFiles, setCatalogFiles] = useState<string[]>([]);
  const [partsData, setPartsData] = useState<PartData[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUploadSection, setShowUploadSection] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadPassword, setUploadPassword] = useState('');
  const [isUploadAuthenticated, setIsUploadAuthenticated] = useState(false);

  const UPLOAD_PASSWORD = 'cap2025';

  // Создать тестового пользователя при первом запуске
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('capUsers') || '[]');
    if (users.length === 0) {
      const testUser = {
        name: 'Тестовый пользователь',
        email: 'test@cap.com',
        password: '123456'
      };
      localStorage.setItem('capUsers', JSON.stringify([testUser]));
    }

    // Проверить сохраненную сессию
    const savedUser = localStorage.getItem('capCurrentUser');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem('capCurrentUser');
      }
    }
  }, []);

  const handleLogin = (user: AuthUser) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('capCurrentUser', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('capCurrentUser');
    setSearchTerm('');
    setSearchResults([]);
    setIsUploadAuthenticated(false);
    setUploadPassword('');
  };

  const handleUploadLogin = () => {
    if (uploadPassword === UPLOAD_PASSWORD) {
      setIsUploadAuthenticated(true);
    } else {
      alert('Неверный пароль!');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      setSelectedFiles(files);
      processMultipleExcelFiles(files);
    }
  };

  const processMultipleExcelFiles = (files: File[]) => {
    setIsProcessing(true);
    const allProcessedData: PartData[] = [...partsData];
    
    let processedFiles = 0;
    
    files.forEach((file, fileIndex) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

          const headerRow = jsonData[0] as string[];
          
          const partNoIndex = headerRow.findIndex(header => {
            if (!header) return false;
            const headerLower = header.toString().toLowerCase();
            return headerLower === 'part no' || 
                   headerLower === 'part no.' ||
                   headerLower === 'partno';
          });
          
          const descriptionIndex = headerRow.findIndex(header => {
            if (!header) return false;
            const headerLower = header.toString().toLowerCase();
            return headerLower === 'part name' ||
                   headerLower.includes('description') || 
                   headerLower === 'discrapion';
          });
          
          const priceIndex = headerRow.findIndex(header => {
            if (!header) return false;
            const headerLower = header.toString().toLowerCase();
            return headerLower === 'price in aed' ||
                   headerLower === 'u/p aed' ||
                   headerLower === 'nett';
          });

          for (let i = 1; i < jsonData.length; i++) {
            const row = jsonData[i] as any[];
            
            if (row && row.length > 0 && partNoIndex !== -1) {
              const partNo = row[partNoIndex]?.toString().trim() || '';
              const description = descriptionIndex !== -1 ? (row[descriptionIndex]?.toString().trim() || '') : '';
              const price = priceIndex !== -1 ? (row[priceIndex]?.toString().trim() || '') : '';

              if (partNo && partNo !== '') {
                const existingIndex = allProcessedData.findIndex(item => item.code === partNo);
                const newItem = {
                  code: partNo,
                  name: description || partNo,
                  brand: 'C.A.P',
                  price: price && price !== '' ? `${price} AED` : 'Цена по запросу',
                  weight: '',
                  category: `Файл: ${file.name}`,
                  description: description || partNo,
                  availability: 'В наличии'
                };
                
                if (existingIndex >= 0) {
                  allProcessedData[existingIndex] = newItem;
                } else {
                  allProcessedData.push(newItem);
                }
              }
            }
          }

          processedFiles++;
          
          if (processedFiles === files.length) {
            setPartsData(allProcessedData);
            localStorage.setItem('capCatalog', JSON.stringify(allProcessedData));
            const fileNames = files.map(f => f.name);
            setCatalogFiles(fileNames);
            localStorage.setItem('capCatalogFiles', JSON.stringify(fileNames));
            setIsProcessing(false);
            alert(`Каталог обновлен! Загружено ${allProcessedData.length} позиций.`);
            setSelectedFiles([]);
            setShowUploadSection(false);
          }
        } catch (error) {
          console.error(`Ошибка обработки файла ${file.name}:`, error);
          processedFiles++;
          
          if (processedFiles === files.length) {
            setIsProcessing(false);
          }
        }
      };

      reader.readAsArrayBuffer(file);
    });
  };

  // Загрузить каталог из localStorage при запуске
  useEffect(() => {
    // Примеры данных - замените на ваши реальные данные
    setPartsData([
    {
      code: "15208-65F0C",
      name: "Фильтр масляный",
      brand: "C.A.P",
      price: "63,81",
      weight: "0.5",
      category: "Моторные части",
      description: "Фильтр масляный для двигателя",
      availability: "В наличии"
    },
    {
      code: "16546-0W020",
      name: "Фильтр топливный",
      brand: "C.A.P",
      price: "125,50",
      weight: "0.3",
      category: "Топливная система",
      description: "Фильтр топливный высокого качества",
      availability: "В наличии"
    },
    {
      code: "90915-YZZD4",
      name: "Фильтр масляный Toyota",
      brand: "Toyota",
      price: "89,99",
      weight: "0.4",
      category: "Оригинальные запчасти",
      description: "Оригинальный масляный фильтр Toyota",
      availability: "В наличии"
    }
    // Добавьте больше данных здесь...
  ]);
    const savedCatalog = localStorage.getItem('capCatalog');
    const savedFiles = localStorage.getItem('capCatalogFiles');
    
    if (savedFiles) {
      try {
        const filesData = JSON.parse(savedFiles);
        setCatalogFiles(filesData);
      } catch (error) {
        console.error('Ошибка загрузки списка файлов:', error);
        setCatalogFiles([]);
      }
    }
    
    if (savedCatalog) {
      try {
        const catalogData = JSON.parse(savedCatalog);
        setPartsData(catalogData);
      } catch (error) {
        console.error('Ошибка загрузки каталога:', error);
      }
    }
  }, []);

  const totalParts = partsData.length;

  // Функция поиска
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    
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

  return (
    <section id="catalog" className="py-20 relative bg-transparent">
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={handleLogin}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="relative z-10 text-center mb-16">
          {/* Auth Status */}
          {isAuthenticated && currentUser && (
            <div className="flex justify-center mb-6">
              <div className="bg-green-500/20 border border-green-500 rounded-lg px-4 py-2 flex items-center space-x-3">
                <User className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-semibold">
                  Добро пожаловать, {currentUser.name}!
                </span>
                <button
                  onClick={handleLogout}
                  className="text-green-400 hover:text-green-300 ml-2"
                  title="Выйти"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          <h2 className="text-4xl lg:text-6xl font-black text-white mb-6 tracking-tight">
            КАТАЛОГ <span className="text-[#144374]">ЗАПЧАСТЕЙ</span>
          </h2>
          <div className="w-24 h-1 bg-[#144374] mx-auto mb-8"></div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-medium">
            Найдите нужную запчасть по коду, названию или бренду из нашего объединенного каталога
          </p>
          
          {/* Upload Excel Button - только для авторизованных пользователей */}
          {isAuthenticated && (
            <div className="mt-8">
              <button
                onClick={() => setShowUploadSection(!showUploadSection)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center mx-auto"
              >
                <Upload className="w-5 h-5 mr-2" />
                Загрузить Excel файлы
              </button>
            </div>
          )}
        </div>

        {!isAuthenticated ? (
          /* Login Required Section */
          <div className="relative z-10 text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="bg-gray-800/90 rounded-2xl p-8 border border-gray-700">
                <Lock className="w-16 h-16 text-[#144374] mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  Требуется авторизация
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Для доступа к каталогу запчастей и ценам необходимо войти в систему или зарегистрироваться
                </p>
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="w-full bg-[#144374] hover:bg-[#1a5490] text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                >
                  Войти / Регистрация
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Search Section */}
            <div className="relative z-10 mb-12">
              {/* Upload Section */}
              {showUploadSection && (
                <div className="mb-8 p-6 bg-gray-800/90 rounded-2xl border border-gray-700">
                  {!isUploadAuthenticated ? (
                    <div className="text-center">
                      <h3 className="text-xl text-white mb-4">Загрузка Excel файлов</h3>
                      <div className="max-w-sm mx-auto">
                        <input
                          type="password"
                          placeholder="Пароль для загрузки"
                          value={uploadPassword}
                          onChange={(e) => setUploadPassword(e.target.value)}
                          className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white mb-4"
                          onKeyPress={(e) => e.key === 'Enter' && handleUploadLogin()}
                        />
                        <button
                          onClick={handleUploadLogin}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg"
                        >
                          Войти
                        </button>
                        <p className="text-gray-400 text-sm mt-2">
                          Пароль: <code className="bg-gray-700 px-2 py-1 rounded">cap2025</code>
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-xl text-white mb-4 text-center">Загрузить Excel файлы в каталог</h3>
                      <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-400 mb-4">
                          Поддерживаемые колонки:<br/>
                          • Код: PART NO, Part No, PARTNO<br/>
                          • Описание: Part Name, DESCRIPTION<br/>
                          • Цена: Price in AED, U/P AED, NETT
                        </p>
                        <input
                          type="file"
                          accept=".xlsx,.xls"
                          multiple
                          onChange={handleFileUpload}
                          className="hidden"
                          id="excel-upload"
                        />
                        <label
                          htmlFor="excel-upload"
                          className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg cursor-pointer"
                        >
                          <FileText className="w-5 h-5 mr-2" />
                          Выбрать Excel файлы
                        </label>
                      </div>
                      
                      {selectedFiles.length > 0 && (
                        <div className="mt-4 p-4 bg-gray-700 rounded-lg">
                          <p className="text-green-400 mb-2">
                            ✅ Файлы выбраны: {selectedFiles.map(f => f.name).join(', ')}
                          </p>
                          {isProcessing && (
                            <p className="text-yellow-400">🔄 Обработка файлов...</p>
                          )}
                        </div>
                      )}
                      
                      <div className="mt-4 text-center">
                        <button
                          onClick={() => {
                            setShowUploadSection(false);
                            setIsUploadAuthenticated(false);
                            setUploadPassword('');
                          }}
                          className="text-gray-400 hover:text-white"
                        >
                          Закрыть
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                  <input
                    type="text"
                    placeholder="Введите код запчасти, название или бренд..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-800/90 border border-gray-600 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-[#144374] focus:ring-2 focus:ring-[#144374]/20 transition-all duration-200 text-lg"
                  />
                </div>
                {totalParts > 0 && (
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
                      <p className="text-gray-400 text-sm mb-4">{part.brand}{part.category ? ` • ${part.category}` : ''}</p>
                      
                      {part.description && part.description !== part.name && (
                        <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                          {part.description}
                        </p>
                      )}

                      {/* Price and Weight */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-green-400">
                          <span className="text-xs mr-1">AED</span>
                          <span className="font-bold">{part.price ? part.price : 'Цена по запросу'}</span>
                        </div>
                        {part.weight && (
                          <div className="flex items-center text-gray-400">
                            <Weight className="w-4 h-4 mr-1" />
                            <span className="text-sm">{part.weight}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {searchTerm && searchResults.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-400 mb-2">Ничего не найдено</h3>
                <p className="text-gray-500">
                  Попробуйте изменить поисковый запрос или проверьте правильность кода запчасти
                </p>
              </div>
            )}

            {/* Instructions */}
            {!searchTerm && (
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
                    <Package className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Каталог запчастей</h3>
                  <p className="text-gray-400">
                    Более {totalParts.toLocaleString()} позиций в наличии
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};