import React, { useState, useEffect } from 'react';
import { Search, Package, Weight, Info, LogOut, User, Upload, FileText, ArrowLeft } from 'lucide-react';
import * as XLSX from 'xlsx';
import { AdminPanel } from './AdminPanel';

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

interface CatalogPageProps {
  user: AuthUser;
  onLogout: () => void;
  onBack: () => void;
}

interface AccessRequest {
  id: string;
  userEmail: string;
  userName: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedDate?: string;
}
/**
 * Separate Catalog Page Component
 * Dedicated page for catalog search after authentication
 */
export const CatalogPage: React.FC<CatalogPageProps> = ({ user, onLogout, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<PartData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [partsData, setPartsData] = useState<PartData[]>([]);
  const [showUploadSection, setShowUploadSection] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadPassword, setUploadPassword] = useState('');
  const [isUploadAuthenticated, setIsUploadAuthenticated] = useState(false);
  const [hasSearchAccess, setHasSearchAccess] = useState(false);
  const [accessRequestSent, setAccessRequestSent] = useState(false);
  const [isCheckingAccess, setIsCheckingAccess] = useState(true);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  const UPLOAD_PASSWORD = 'cap2025';
  const ADMIN_EMAIL = 't8.fd88@gmail.com';
  const ADMIN_EMAILS = ['t8.fd88@gmail.com', 'admin@cap.com']; // Список админов

  // Проверка является ли пользователь админом
  const isAdmin = ADMIN_EMAILS.includes(user.email.toLowerCase());


  // Обработка URL параметров при загрузке страницы
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const action = urlParams.get('action');
    const requestId = urlParams.get('requestId');
    const token = urlParams.get('token');

    if (action && requestId && token) {
      handleEmailAction(action, requestId, token);
    }
  }, []);
  // Проверить статус доступа пользователя
  useEffect(() => {
    checkUserAccess();
  }, [user.email]);

  const checkUserAccess = () => {
    setIsCheckingAccess(true);
    
    // Получить все запросы на доступ
    const accessRequests = JSON.parse(localStorage.getItem('capAccessRequests') || '[]') as AccessRequest[];
    
    // Найти запрос текущего пользователя
    const userRequest = accessRequests.find(req => req.userEmail === user.email);
    
    // Сбросить состояния
    setHasSearchAccess(false);
    setAccessRequestSent(false);
    
    if (userRequest) {
      if (userRequest.status === 'approved') {
        setHasSearchAccess(true);
      } else if (userRequest.status === 'pending') {
        setAccessRequestSent(true);
      } else if (userRequest.status === 'rejected') {
        // Запрос отклонен - показать возможность отправить новый
        setAccessRequestSent(false);
      }
    } else {
      // Нет запроса - просто устанавливаем состояние
    }
    
    setIsCheckingAccess(false);
  };

  const checkStatusWithAlert = () => {
    // Получить все запросы на доступ
    const accessRequests = JSON.parse(localStorage.getItem('capAccessRequests') || '[]') as AccessRequest[];
    
    // Найти запрос текущего пользователя
    const userRequest = accessRequests.find(req => req.userEmail === user.email);
    
    if (userRequest) {
      if (userRequest.status === 'approved') {
        alert(`🎉 ДОСТУП ОДОБРЕН!\n\n✅ Ваш запрос был одобрен ${userRequest.approvedDate || 'недавно'}\n🔍 Теперь вы можете искать по каталогу запчастей!`);
        // Обновить состояние
        setHasSearchAccess(true);
        setAccessRequestSent(false);
      } else if (userRequest.status === 'pending') {
        alert(`⏳ ЗАПРОС В ОЖИДАНИИ\n\n📋 Ваш запрос отправлен: ${userRequest.requestDate}\n⏰ Ожидайте подтверждения от администратора`);
      } else if (userRequest.status === 'rejected') {
        alert(`❌ ЗАПРОС ОТКЛОНЕН\n\n🚫 Ваш запрос был отклонен\n💡 Вы можете отправить новый запрос`);
        setAccessRequestSent(false);
      }
    } else {
      alert(`📝 ЗАПРОС НЕ НАЙДЕН\n\n❓ У вас нет активных запросов на доступ\n💡 Отправьте запрос для получения доступа к каталогу`);
    }
  };

  const handleEmailAction = (action: string, requestId: string, token: string) => {
    // Отключено для безопасности - обработка только через админ-панель
    alert('🔒 Обработка запросов доступна только администратору через админ-панель.');
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  const sendAccessRequest = () => {
    const accessRequests = JSON.parse(localStorage.getItem('capAccessRequests') || '[]') as AccessRequest[];
    
    // Проверить, не отправлял ли уже пользователь запрос
    const existingRequest = accessRequests.find(req => req.userEmail === user.email);
    if (existingRequest) {
      alert('Запрос уже отправлен! Ожидайте подтверждения.');
      return;
    }
    
    // Создать новый запрос
    const newRequest: AccessRequest = {
      id: Date.now().toString(),
      userEmail: user.email,
      userName: user.name,
      requestDate: new Date().toLocaleString('ru-RU'),
      status: 'pending'
    };
    
    accessRequests.push(newRequest);
    localStorage.setItem('capAccessRequests', JSON.stringify(accessRequests));
    
    // Отправить email (симуляция)
    const emailSubject = encodeURIComponent('Запрос доступа к каталогу C.A.P');
    
    // Создать токен безопасности
    const securityToken = btoa(user.email + newRequest.id);
    const baseUrl = window.location.origin;
    
    // Ссылки для одобрения и отклонения
    const approveUrl = `${baseUrl}?action=approve&requestId=${newRequest.id}&token=${securityToken}`;
    const rejectUrl = `${baseUrl}?action=reject&requestId=${newRequest.id}&token=${securityToken}`;
    
    const emailBody = encodeURIComponent(`
🔔 НОВЫЙ ЗАПРОС НА ДОСТУП К КАТАЛОГУ C.A.P

👤 Пользователь: ${user.name}
📧 Email: ${user.email}
📅 Дата запроса: ${newRequest.requestDate}
🆔 ID запроса: ${newRequest.id}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 ДЕЙСТВИЯ АДМИНИСТРАТОРА:
Для обработки этого запроса войдите в админ-панель на сайте.

🔐 Безопасность: Обработка запросов доступна только через админ-панель

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🏢 С уважением,
Система управления каталогом C.A.P
🌐 ${baseUrl}
    `);
    
    // Открыть почтовый клиент
    window.open(`mailto:${ADMIN_EMAIL}?subject=${emailSubject}&body=${emailBody}`, '_self');
    
    setAccessRequestSent(true);
    alert('✅ Запрос отправлен администратору!\n\n📧 Администратор получит уведомление и обработает ваш запрос через админ-панель.\n\n⏰ Проверьте статус через несколько минут, нажав кнопку "Проверить статус".');
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
                  category: 'Автозапчасти',
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
            // Также сохраняем в sessionStorage для дополнительной надежности
            sessionStorage.setItem('capCatalog', JSON.stringify(allProcessedData));
            // Создаем резервную копию с timestamp
            const backupKey = `capCatalog_backup_${Date.now()}`;
            localStorage.setItem(backupKey, JSON.stringify(allProcessedData));
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
    // Загрузить каталог из localStorage
    let catalogData: PartData[] = [];

    const savedCatalog = localStorage.getItem('capCatalog');
    if (savedCatalog) {
      try {
        catalogData = JSON.parse(savedCatalog);
        setPartsData(catalogData);
        console.log(`Загружен каталог: ${catalogData.length} позиций`);
      } catch (error) {
        console.error('Ошибка загрузки каталога:', error);
        // Попробовать загрузить из sessionStorage
        const sessionCatalog = sessionStorage.getItem('capCatalog');
        if (sessionCatalog) {
          try {
            catalogData = JSON.parse(sessionCatalog);
            setPartsData(catalogData);
            // Восстановить в localStorage
            localStorage.setItem('capCatalog', sessionCatalog);
            console.log(`Восстановлен каталог из sessionStorage: ${catalogData.length} позиций`);
          } catch (sessionError) {
            console.error('Ошибка загрузки из sessionStorage:', sessionError);
            setPartsData([]);
          }
        } else {
          setPartsData([]);
        }
      }
    } else {
      // Попробовать загрузить из sessionStorage
      const sessionCatalog = sessionStorage.getItem('capCatalog');
      if (sessionCatalog) {
        try {
          catalogData = JSON.parse(sessionCatalog);
          setPartsData(catalogData);
          // Восстановить в localStorage
          localStorage.setItem('capCatalog', sessionCatalog);
          console.log(`Восстановлен каталог из sessionStorage: ${catalogData.length} позиций`);
        } catch (error) {
          console.error('Ошибка загрузки из sessionStorage:', error);
          setPartsData([]);
        }
      } else {
        // Если нет сохраненного каталога, показать пустой каталог
        setPartsData([]);
        console.log('Каталог пуст - ожидается загрузка Excel файлов');
      }
    }
  }, []);

  const totalParts = partsData.length;

  // Функция поиска
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    
    setIsLoading(true);

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
    <div className="min-h-screen font-sans relative">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-black"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div></div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 bg-green-500/20 border border-green-500 rounded-lg px-4 py-2">
              <User className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-semibold">
                {user.name}
              </span>
              <button
                onClick={onLogout}
                className="text-green-400 hover:text-green-300 ml-2"
                title="Выйти"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>


        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-6xl font-black text-white mb-6 tracking-tight">
            КАТАЛОГ <span className="text-[#144374]">ЗАПЧАСТЕЙ</span>
          </h1>
          <div className="w-24 h-1 bg-[#144374] mx-auto mb-8"></div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-medium">
            Найдите нужную запчасть по коду, названию или бренду из нашего каталога
          </p>
        </div>

        {/* Access Request Section */}
        {isCheckingAccess ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#144374]"></div>
            <p className="text-gray-400 mt-2">Проверка доступа...</p>
          </div>
        ) : !hasSearchAccess ? (
          <div className="max-w-2xl mx-auto mb-12">
            <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 text-center">
              {!accessRequestSent ? (
                <>
                  <div className="bg-yellow-500/20 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                    <svg className="w-10 h-10 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Требуется подтверждение доступа
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    Для поиска по каталогу необходимо получить подтверждение от администратора. 
                    Ваш запрос будет отправлен на email: <span className="text-[#144374] font-semibold">{ADMIN_EMAIL}</span>
                  </p>
                  <button
                    onClick={sendAccessRequest}
                    className="bg-[#144374] hover:bg-[#1a5490] text-white py-3 px-8 rounded-lg font-semibold transition-colors"
                  >
                    Отправить запрос на доступ
                  </button>
                </>
              ) : (
                <>
                  <div className="bg-blue-500/20 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                    <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Запрос отправлен
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    Ваш запрос на доступ к каталогу отправлен администратору. 
                    Ожидайте подтверждения по email или обновите страницу через несколько минут.
                  </p>
                  <div className="space-y-3">
                    <button
                      onClick={checkStatusWithAlert}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-lg font-semibold transition-colors"
                    >
                      🔄 Проверить статус
                    </button>
                    <p className="text-gray-500 text-sm">
                      Если ваш запрос был одобрен, нажмите "Проверить статус"
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        ) : null}


        {/* Search Section */}
        {hasSearchAccess && (
          <div className="mb-12 max-w-4xl mx-auto">
            {/* Excel Upload Button */}
            <div className="text-center mb-8">
              <button
                onClick={() => setShowAdminPanel(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
              >
                <Upload className="w-5 h-5 mr-2" />
                Загрузить Excel файлы
              </button>
            </div>
            
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
        )}

        {/* Loading */}
        {hasSearchAccess && isLoading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#144374]"></div>
            <p className="text-gray-400 mt-2">Поиск...</p>
          </div>
        )}

        {/* Search Results */}
        {hasSearchAccess && searchResults.length > 0 && !isLoading && (
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
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
                  <p className="text-gray-400 text-sm mb-4">{part.brand}</p>
                  
                  {part.description && part.description !== part.name && (
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                      {part.description}
                    </p>
                  )}

                  {/* Price and Weight */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-green-400">
                      <span className="font-bold">{part.price || 'Цена по запросу'}</span>
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
        {hasSearchAccess && searchTerm && searchResults.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-400 mb-2">Ничего не найдено</h3>
            <p className="text-gray-500">
              Попробуйте изменить поисковый запрос или проверьте правильность кода запчасти
            </p>
          </div>
        )}

        {/* Instructions */}
        {hasSearchAccess && !searchTerm && totalParts > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
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

        {/* Empty Catalog Message - только для админов */}
        {!searchTerm && totalParts === 0 && isAdmin && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-400 mb-2">Каталог пуст</h3>
            <p className="text-gray-500 mb-6">
              Загрузите Excel файлы для заполнения каталога запчастей
            </p>
            <button
              onClick={() => setShowAdminPanel(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <Upload className="w-5 h-5 mr-2 inline" />
              Загрузить Excel файлы
            </button>
          </div>
        )}

        {/* Admin Panel */}
        {showAdminPanel && (
          <AdminPanel
            onCatalogUpdate={(data, fileNames) => {
              setPartsData(data);
            }}
            currentCatalogSize={partsData.length}
            showAdminButton={true}
            currentFiles={[]}
            onClose={() => setShowAdminPanel(false)}
          />
        )}

        {/* Empty Catalog Message - для обычных пользователей */}
        {!searchTerm && totalParts === 0 && !isAdmin && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-400 mb-2">Каталог временно недоступен</h3>
            <p className="text-gray-500">
              Каталог запчастей обновляется. Попробуйте позже.
            </p>
          </div>
        )}
      </div>
      
    </div>
  );
};