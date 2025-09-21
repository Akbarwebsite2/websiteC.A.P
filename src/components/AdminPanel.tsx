import React, { useState } from 'react';
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
  onCatalogUpdate: (data: PartData[]) => void;
  currentCatalogSize: number;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onCatalogUpdate, currentCatalogSize }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewData, setPreviewData] = useState<PartData[]>([]);
  const [adminPassword, setAdminPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Простой пароль для демо (в реальном проекте используйте более безопасную аутентификацию)
  const ADMIN_PASSWORD = 'cap2025';

  const handleLogin = () => {
    if (adminPassword === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Неверный пароль!');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      processExcelFile(file);
    }
  };

  const processExcelFile = (file: File) => {
    setIsProcessing(true);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const processedData: PartData[] = [];
        
        // Найти индексы колонок
        const headerRow = jsonData[0] as string[];
        const partNoIndex = headerRow.findIndex(header => 
          header && header.toString().toLowerCase().includes('part')
        );
        const descriptionIndex = headerRow.findIndex(header => 
          header && (header.toString().toLowerCase().includes('description') || 
                    header.toString().toLowerCase().includes('discrapion'))
        );
        const priceIndex = headerRow.findIndex(header => 
          header && header.toString().toLowerCase().includes('nett')
        );

        // Обработать данные начиная со второй строки
        for (let i = 1; i < jsonData.length; i++) {
          const row = jsonData[i] as any[];
          
          if (row && row.length > 0) {
            const partNo = row[partNoIndex]?.toString().trim() || '';
            const description = row[descriptionIndex]?.toString().trim() || '';
            const price = row[priceIndex]?.toString().trim() || '';

            if (partNo) {
              processedData.push({
                code: partNo,
                name: description,
                brand: 'C.A.P',
                price: price,
                weight: '',
                category: 'Автозапчасти',
                description: description,
                availability: 'В наличии'
              });
            }
          }
        }

        setPreviewData(processedData);
        setIsProcessing(false);
      } catch (error) {
        console.error('Ошибка обработки файла:', error);
        alert('Ошибка при обработке файла Excel');
        setIsProcessing(false);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const saveCatalog = () => {
    if (previewData.length > 0) {
      // Сохранить в localStorage для демо
      localStorage.setItem('capCatalog', JSON.stringify(previewData));
      onCatalogUpdate(previewData);
      alert(`Каталог сохранен! Загружено ${previewData.length} позиций.`);
      setSelectedFile(null);
      setPreviewData([]);
    }
  };

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed top-4 left-4 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg z-50"
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
              <p className="text-gray-300 mb-4">
                Текущий каталог: <span className="text-green-400 font-bold">{currentCatalogSize} позиций</span>
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

            {selectedFile && (
              <div className="mb-6 p-4 bg-gray-800 rounded-lg">
                <p className="text-green-400 mb-2">
                  ✅ Файл выбран: {selectedFile.name}
                </p>
                {isProcessing && (
                  <p className="text-yellow-400">🔄 Обработка файла...</p>
                )}
              </div>
            )}

            {previewData.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  Предварительный просмотр ({previewData.length} позиций)
                </h3>
                <div className="bg-gray-800 rounded-lg p-4 max-h-60 overflow-y-auto">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="font-bold text-gray-300">Код</div>
                    <div className="font-bold text-gray-300">Название</div>
                    <div className="font-bold text-gray-300">Цена</div>
                    
                    {previewData.slice(0, 10).map((item, index) => (
                      <React.Fragment key={index}>
                        <div className="text-blue-400">{item.code}</div>
                        <div className="text-white">{item.name}</div>
                        <div className="text-green-400">{item.price}</div>
                      </React.Fragment>
                    ))}
                  </div>
                  {previewData.length > 10 && (
                    <p className="text-gray-400 mt-4 text-center">
                      ... и еще {previewData.length - 10} позиций
                    </p>
                  )}
                </div>
                
                <button
                  onClick={saveCatalog}
                  className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg flex items-center justify-center"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Сохранить каталог ({previewData.length} позиций)
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};