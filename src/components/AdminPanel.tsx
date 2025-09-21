import React, { useState, useEffect } from 'react';
import { Upload, FileText, Save, Eye, EyeOff } from 'lucide-react';
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

interface AdminPanelProps {
  onCatalogUpdate: (data: PartData[], fileNames?: string[]) => void;
  currentCatalogSize: number;
  showAdminButton: boolean;
  currentFiles: string[];
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onCatalogUpdate, currentCatalogSize, showAdminButton, currentFiles }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewData, setPreviewData] = useState<PartData[]>([]);
  const [allCatalogData, setAllCatalogData] = useState<PartData[]>([]);
  const [adminPassword, setAdminPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Простой пароль для демо (в реальном проекте используйте более безопасную аутентификацию)
  const ADMIN_PASSWORD = 'cap2025';

  // Загрузить существующие данные при открытии
  useEffect(() => {
    const savedCatalog = localStorage.getItem('capCatalog');
    if (savedCatalog) {
      try {
        const catalogData = JSON.parse(savedCatalog);
        setAllCatalogData(catalogData);
      } catch (error) {
        console.error('Ошибка загрузки каталога:', error);
      }
    }
  }, [isVisible]);

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
          
          // Поиск колонки с кодом запчасти (поддержка разных названий)
          const partNoIndex = headerRow.findIndex(header => {
            if (!header) return false;
            const headerLower = header.toString().toLowerCase();
            return headerLower.includes('part no') || 
                   headerLower.includes('part name') || 
                   headerLower.includes('partno') ||
                   headerLower.includes('part_no') ||
                   headerLower.includes('part');
          });
          
          // Поиск колонки с описанием
          const descriptionIndex = headerRow.findIndex(header => {
            if (!header) return false;
            const headerLower = header.toString().toLowerCase();
            return headerLower.includes('description') || 
                   headerLower.includes('discrapion') ||
                   headerLower.includes('desc');
          });
          
          // Поиск колонки с ценой (поддержка разных названий)
          const priceIndex = headerRow.findIndex(header => {
            if (!header) return false;
            const headerLower = header.toString().toLowerCase();
            return headerLower.includes('price in aed') ||
                   headerLower.includes('u/p aed') ||
                   headerLower.includes('nett') ||
                   headerLower.includes('price') ||
                   headerLower.includes('cost');
          });
          );

          // Обработать данные начиная со второй строки
          for (let i = 1; i < jsonData.length; i++) {
            const row = jsonData[i] as any[];
            
            if (row && row.length > 0) {
              const partNo = row[partNoIndex]?.toString().trim() || '';
              const description = row[descriptionIndex]?.toString().trim() || '';
              const price = row[priceIndex]?.toString().trim() || '';

              if (partNo) {
                // Проверить, не существует ли уже такой код
                const existingIndex = allProcessedData.findIndex(item => item.code === partNo);
                const newItem = {
                  code: partNo,
                  name: description,
                  brand: 'C.A.P',
                  price: price ? `${price} AED` : 'Цена по запросу',
                  weight: '',
                  category: `Файл ${fileIndex + 1}: ${file.name}`,
                  description: description,
                  availability: 'В наличии'
                };
                
                if (existingIndex >= 0) {
                  // Обновить существующий элемент
                  allProcessedData[existingIndex] = newItem;
                } else {
                  // Добавить новый элемент
                  allProcessedData.push(newItem);
                }
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

  const saveCatalog = () => {
    if (previewData.length > 0) {
      // Получить список имен файлов
      const fileNames = selectedFiles.map(file => file.name);
      
      // Сохранить в localStorage для демо
      localStorage.setItem('capCatalog', JSON.stringify(previewData));
      localStorage.setItem('capCatalogFiles', JSON.stringify(fileNames));
      localStorage.setItem('capCatalogUploaded', 'true');
      onCatalogUpdate(previewData, fileNames);
      alert(`Каталог сохранен! Загружено ${previewData.length} позиций.`);
      setSelectedFiles([]);
      setPreviewData([]);
      setIsVisible(false);
    }
  };

  const clearCatalog = () => {
    if (confirm('Вы уверены, что хотите очистить весь каталог? Это действие нельзя отменить.')) {
      localStorage.removeItem('capCatalog');
      localStorage.removeItem('capCatalogUploaded');
      localStorage.removeItem('capCatalogFiles');
      setAllCatalogData([]);
      setPreviewData([]);
      onCatalogUpdate([], []);
      alert('Каталог полностью очищен!');
    }
  };

  // Показывать кнопку только если каталог не загружен или showAdminButton = true
  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed top-4 left-4 bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg z-50 opacity-30 hover:opacity-100 transition-all duration-300 transform hover:scale-110"
        title="Админ-панель"
      >
        <Eye className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Админ-панель - Управление каталогом</h2>
          <button
            onClick={() => setIsVisible(false)}
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
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6">
                      <div className="font-bold text-gray-300">Код запчасти</div>
                Текущий каталог: <span className="text-green-400 font-bold">{currentCatalogSize} позиций</span>
                      <div className="font-bold text-gray-300">Цена (AED)</div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-400">Загруженные файлы:</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {currentFiles.map((fileName, index) => (
                        <span key={index} className="bg-blue-600 text-white px-2 py-1 rounded text-xs">
                          <div className="text-green-400 text-sm">{item.price}</div>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </p>
              
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  Загрузить новый каталог Excel
                </h3>
                <p className="text-gray-400 mb-4">
                  Файл должен содержать колонки: PART NO, DESCRIPTION, NETT
                </p>
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="admin-file-upload"
                />
                <label
                  htmlFor="admin-file-upload"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Выбрать файл Excel
                </label>
              </div>
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
        )}
      </div>
    </div>
  );
};