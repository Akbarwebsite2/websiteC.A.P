import React, { useState, useEffect } from 'react';
import { Upload, FileText, Save, Eye, EyeOff } from 'lucide-react';
import * as XLSX from 'xlsx';
import { supabase } from '../lib/supabase';

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

interface AdminPanelProps {
  onCatalogUpdate: (data: PartData[], fileNames?: string[]) => void;
  currentCatalogSize: number;
  showAdminButton: boolean;
  currentFiles: string[];
  onClose: () => void;
}

interface AccessRequest {
  id: string;
  userEmail: string;
  userName: string;
  phone?: string;
  address?: string;
  companyName?: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedDate?: string;
}
export const AdminPanel: React.FC<AdminPanelProps> = ({ onCatalogUpdate, currentCatalogSize, showAdminButton, currentFiles, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewData, setPreviewData] = useState<PartData[]>([]);
  const [allCatalogData, setAllCatalogData] = useState<PartData[]>([]);
  const [adminPassword, setAdminPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessRequests, setAccessRequests] = useState<AccessRequest[]>([]);
  const [activeTab, setActiveTab] = useState<'catalog' | 'access'>('catalog');

  // Простой пароль для демо (в реальном проекте используйте более безопасную аутентификацию)
  const ADMIN_PASSWORD = 'cap2025';

  useEffect(() => {
    loadCatalogFromDatabase();
    loadPendingUsers();
  }, [isVisible]);

  const loadPendingUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('catalog_users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        const requests: AccessRequest[] = data.map(user => ({
          id: user.id.toString(),
          userEmail: user.email,
          userName: user.name,
          phone: user.phone_number,
          address: user.address,
          companyName: user.company_name,
          requestDate: new Date(user.created_at).toLocaleString('ru-RU'),
          status: user.status,
          approvedDate: user.status !== 'pending' ? new Date(user.created_at).toLocaleString('ru-RU') : undefined
        }));
        setAccessRequests(requests);
      }
    } catch (error) {
      console.error('Ошибка загрузки запросов:', error);
    }
  };

  const loadCatalogFromDatabase = async () => {
    try {
      let allData: any[] = [];
      let from = 0;
      const batchSize = 1000;
      let hasMore = true;

      while (hasMore) {
        const { data, error } = await supabase
          .from('catalog_parts')
          .select('*')
          .order('code')
          .range(from, from + batchSize - 1);

        if (error) throw error;

        if (data && data.length > 0) {
          allData = [...allData, ...data];
          from += batchSize;
          hasMore = data.length === batchSize;
        } else {
          hasMore = false;
        }
      }

      const catalogData: PartData[] = allData.map(item => ({
        code: item.code,
        name: item.name,
        brand: item.brand,
        price: item.price,
        weight: item.weight,
        category: item.category,
        description: item.description,
        availability: item.availability
      }));
      setAllCatalogData(catalogData);
    } catch (error) {
      console.error('Ошибка загрузки каталога из базы:', error);
    }
  };

  const handleAccessRequest = async (requestId: string, action: 'approve' | 'reject') => {
    try {
      const newStatus = action === 'approve' ? 'approved' : 'rejected';

      const { error } = await supabase
        .from('catalog_users')
        .update({ status: newStatus })
        .eq('id', requestId);

      if (error) throw error;

      const request = accessRequests.find(req => req.id === requestId);
      if (request) {
        alert(`Запрос от ${request.userName} (${request.userEmail}) ${action === 'approve' ? 'одобрен' : 'отклонен'}!`);
      }

      loadPendingUsers();
    } catch (error) {
      console.error('Ошибка обновления статуса:', error);
      alert('Ошибка при обработке запроса');
    }
  };
  const handleLogin = () => {
    if (adminPassword === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
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
    const allProcessedData: PartData[] = [...allCatalogData]; // Сохраняем существующие данные
    
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

          // Найти индексы колонок
          const headerRow = jsonData[0] as string[];
          
          console.log('Заголовки файла:', headerRow);
          
          // Поиск колонки с кодом запчасти (поддержка разных названий)
          const partNoIndex = headerRow.findIndex(header => {
            if (!header) return false;
            const headerLower = header.toString().toLowerCase();
            return headerLower === 'part no' || 
                   headerLower === 'part no.' ||
                   headerLower === 'partno';
          });
          
          // Поиск колонки с описанием
          const descriptionIndex = headerRow.findIndex(header => {
            if (!header) return false;
            const headerLower = header.toString().toLowerCase();
            return headerLower === 'part name' ||
                   headerLower.includes('description') || 
                   headerLower === 'discrapion';
          });
          
          // Поиск колонки с ценой (поддержка разных названий)
          const priceIndex = headerRow.findIndex(header => {
            if (!header) return false;
            const headerLower = header.toString().toLowerCase();
            return headerLower === 'price in aed' ||
                   headerLower === 'u/p aed' ||
                   headerLower === 'nett';
          });

          console.log('Найденные индексы:', {
            partNoIndex,
            descriptionIndex, 
            priceIndex
          });

          if (partNoIndex === -1) {
            console.warn(`В файле ${file.name} не найдена колонка с кодом запчасти`);
          }
          if (descriptionIndex === -1) {
            console.warn(`В файле ${file.name} не найдена колонка с описанием`);
          }
          if (priceIndex === -1) {
            console.warn(`В файле ${file.name} не найдена колонка с ценой`);
          }

          // Обработать данные начиная со второй строки
          for (let i = 1; i < jsonData.length; i++) {
            const row = jsonData[i] as any[];
            
            if (row && row.length > 0 && partNoIndex !== -1) {
              const partNo = row[partNoIndex]?.toString().trim() || '';
              const description = descriptionIndex !== -1 ? (row[descriptionIndex]?.toString().trim() || '') : '';
              const price = priceIndex !== -1 ? (row[priceIndex]?.toString().trim() || '') : '';

              if (partNo && partNo !== '') {
                // Проверить, не существует ли уже такой код
                const existingIndex = allProcessedData.findIndex(item => item.code === partNo);
                const newItem = {
                  code: partNo,
                  name: description || partNo,
                  brand: 'C.A.P',
                  price: price && price !== '' ? `${price} AED` : 'Цена по запросу',
                  weight: '',
                  category: `Файл ${fileIndex + 1}: ${file.name}`,
                  description: description || partNo,
                  availability: 'В наличии'
                };
                
                if (existingIndex >= 0) {
                  // Обновить существующий элемент
                  allProcessedData[existingIndex] = newItem;
                } else {
                  // Добавить новый элемент
                  allProcessedData.push(newItem);
                }
              } else {
                console.warn(`Строка ${i + 1} в файле ${file.name}: пустой код запчасти`);
              }
            }
          }

          processedFiles++;
          
          // Если все файлы обработаны
          if (processedFiles === files.length) {
            setPreviewData(allProcessedData);
            setAllCatalogData(allProcessedData);
            setIsProcessing(false);
          }
        } catch (error) {
          console.error(`Ошибка обработки файла ${file.name}:`, error);
          processedFiles++;
          
          if (processedFiles === files.length) {
            setPreviewData(allProcessedData);
            setAllCatalogData(allProcessedData);
            setIsProcessing(false);
          }
        }
      };

      reader.readAsArrayBuffer(file);
    });
  };

  const saveCatalog = async () => {
    if (previewData.length > 0) {
      setIsProcessing(true);
      try {
        // Удалить все существующие записи
        const { error: deleteError } = await supabase
          .from('catalog_parts')
          .delete()
          .neq('id', '00000000-0000-0000-0000-000000000000');

        if (deleteError) throw deleteError;

        // Вставить новые данные батчами по 1000 записей
        const catalogToInsert = previewData.map(item => ({
          code: item.code,
          name: item.name,
          brand: item.brand,
          price: item.price,
          weight: item.weight,
          category: item.category,
          description: item.description,
          availability: item.availability
        }));

        const batchSize = 1000;
        for (let i = 0; i < catalogToInsert.length; i += batchSize) {
          const batch = catalogToInsert.slice(i, i + batchSize);
          const { error: insertError } = await supabase
            .from('catalog_parts')
            .insert(batch);

          if (insertError) throw insertError;
          console.log(`Загружено ${Math.min(i + batchSize, catalogToInsert.length)} из ${catalogToInsert.length} позиций`);
        }

        onCatalogUpdate(previewData, selectedFiles.map(file => file.name));
        alert(`Каталог сохранен в базу данных! Загружено ${previewData.length} позиций.`);
        setSelectedFiles([]);
        setPreviewData([]);
        setAllCatalogData(previewData);
        onClose();
      } catch (error: any) {
        console.error('Ошибка сохранения каталога:', error);
        alert(`Ошибка сохранения: ${error.message}`);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const clearCatalog = async () => {
    if (confirm('Вы уверены, что хотите очистить весь каталог? Это действие нельзя отменить.')) {
      setIsProcessing(true);
      try {
        const { error } = await supabase
          .from('catalog_parts')
          .delete()
          .neq('id', '00000000-0000-0000-0000-000000000000');

        if (error) throw error;

        setAllCatalogData([]);
        setPreviewData([]);
        onCatalogUpdate([], []);
        alert('Каталог полностью очищен из базы данных!');
      } catch (error: any) {
        console.error('Ошибка очистки каталога:', error);
        alert(`Ошибка очистки: ${error.message}`);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Админ-панель - Управление каталогом</h2>
          <button
            onClick={() => {
              onClose();
            }}
            className="text-gray-400 hover:text-white"
          >
            <EyeOff className="w-6 h-6" />
          </button>
        </div>

        {!isAuthenticated ? (
          <div className="text-center">
            <h3 className="text-xl text-white mb-4">Вход в админ-панель</h3>
            <div className="max-w-sm mx-auto">
              <input
                type="password"
                placeholder="Введите пароль администратора"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white mb-4"
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
              <button
                onClick={handleLogin}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg"
              >
                Войти
              </button>
              <p className="text-gray-400 text-sm mt-4">
                Пароль для демо: <code className="bg-gray-700 px-2 py-1 rounded">cap2025</code>
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6">
              {/* Tabs */}
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={() => setActiveTab('catalog')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    activeTab === 'catalog' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Управление каталогом
                </button>
                <button
                  onClick={() => setActiveTab('access')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors relative ${
                    activeTab === 'access' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Запросы доступа
                  {accessRequests.filter(req => req.status === 'pending').length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {accessRequests.filter(req => req.status === 'pending').length}
                    </span>
                  )}
                </button>
              </div>

              {activeTab === 'catalog' ? (
                <>
                  <p className="text-gray-300 mb-4">
                Текущий каталог: <span className="text-green-400 font-bold">{currentCatalogSize} позиций</span>
                {currentFiles.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-400">Загруженные файлы:</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {currentFiles.map((fileName, index) => (
                        <span key={index} className="bg-blue-600 text-white px-2 py-1 rounded text-xs">
                          {fileName}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </p>
              
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  Загрузить файлы Excel для каталога
                </h3>
                <p className="text-gray-400 mb-4">
                  Выберите один или несколько Excel файлов:<br/>
                  Поддерживаемые колонки:<br/>
                  • Код: PART NO, Part No, PARTNO<br/>
                  • Описание: Part Name, DESCRIPTION, DISCRAPION<br/>
                  • Цена: Price in AED, U/P AED, NETT
                </p>
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="admin-file-upload"
                />
                <label
                  htmlFor="admin-file-upload"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Выбрать файлы Excel
                </label>
              </div>

                  {selectedFiles.length > 0 && (
              <div className="mb-6 p-4 bg-gray-800 rounded-lg">
                <p className="text-green-400 mb-2">
                  ✅ Файлы выбраны: {selectedFiles.map(f => f.name).join(', ')}
                </p>
                {isProcessing && (
                  <p className="text-yellow-400">🔄 Обработка файлов...</p>
                )}
              </div>

                  )}

                  {allCatalogData.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  Весь каталог ({allCatalogData.length} позиций)
                </h3>
                <div className="bg-gray-800 rounded-lg p-4 max-h-60 overflow-y-auto">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="font-bold text-gray-300">Код</div>
                    <div className="font-bold text-gray-300">Название</div>
                    <div className="font-bold text-gray-300">Источник</div>
                    
                    {allCatalogData.slice(0, 15).map((item, index) => (
                      <React.Fragment key={index}>
                        <div className="text-blue-400">{item.code}</div>
                        <div className="text-white">{item.name}</div>
                        <div className="text-gray-400 text-xs">{item.category}</div>
                      </React.Fragment>
                    ))}
                  </div>
                  {allCatalogData.length > 15 && (
                    <p className="text-gray-400 mt-4 text-center">
                      ... и еще {allCatalogData.length - 15} позиций
                    </p>
                  )}
                </div>
                
                <button
                  onClick={saveCatalog}
                  className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg flex items-center justify-center"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Сохранить каталог ({allCatalogData.length} позиций)
                </button>
              </div>
                  )}
                </>
              ) : (
                /* Access Requests Tab */
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    Запросы на доступ к каталогу ({accessRequests.length})
                  </h3>
                  
                  {accessRequests.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-400">Нет запросов на доступ</p>
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {accessRequests.map((request) => (
                        <div
                          key={request.id}
                          className={`p-4 rounded-lg border ${
                            request.status === 'pending'
                              ? 'bg-yellow-500/10 border-yellow-500/30'
                              : request.status === 'approved'
                              ? 'bg-green-500/10 border-green-500/30'
                              : 'bg-red-500/10 border-red-500/30'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="text-white font-semibold text-lg">{request.userName}</h4>
                              <div className="mt-2 space-y-1">
                                <p className="text-gray-400 text-sm">
                                  <span className="text-gray-500">Email:</span> {request.userEmail}
                                </p>
                                {request.phone && (
                                  <p className="text-gray-400 text-sm">
                                    <span className="text-gray-500">Телефон:</span> {request.phone}
                                  </p>
                                )}
                                {request.companyName && (
                                  <p className="text-gray-400 text-sm">
                                    <span className="text-gray-500">Компания:</span> {request.companyName}
                                  </p>
                                )}
                                {request.address && (
                                  <p className="text-gray-400 text-sm">
                                    <span className="text-gray-500">Адрес:</span> {request.address}
                                  </p>
                                )}
                              </div>
                              <p className="text-gray-500 text-xs mt-2">
                                Запрос: {request.requestDate}
                              </p>
                              {request.approvedDate && (
                                <p className="text-gray-500 text-xs">
                                  Обработан: {request.approvedDate}
                                </p>
                              )}
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                request.status === 'pending' 
                                  ? 'bg-yellow-500/20 text-yellow-400' 
                                  : request.status === 'approved'
                                  ? 'bg-green-500/20 text-green-400'
                                  : 'bg-red-500/20 text-red-400'
                              }`}>
                                {request.status === 'pending' ? 'Ожидает' : 
                                 request.status === 'approved' ? 'Одобрен' : 'Отклонен'}
                              </span>
                              
                              {request.status === 'pending' && (
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => handleAccessRequest(request.id, 'approve')}
                                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-semibold"
                                  >
                                    Одобрить
                                  </button>
                                  <button
                                    onClick={() => handleAccessRequest(request.id, 'reject')}
                                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-semibold"
                                  >
                                    Отклонить
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};