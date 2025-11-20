import React, { useState, useEffect, useRef } from 'react';
import { Search, Package, Weight, Info, LogOut, User, Upload, Menu, ChevronDown, ShoppingCart, Plus, FileUp } from 'lucide-react';
import * as XLSX from 'xlsx';
import { AdminPanel } from './AdminPanel';
import { SidebarMenu } from './SidebarMenu';
import { CartModal } from './CartModal';
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
  qty?: string;
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

interface CartItem {
  id: string;
  part_code: string;
  part_name: string;
  brand: string;
  price: string;
  quantity: number;
}

interface ExchangeRate {
  currency_from: string;
  currency_to: string;
  rate: number;
  updated_at: string;
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
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<'ru' | 'en'>('ru');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [partQuantities, setPartQuantities] = useState<{ [key: string]: number | '' }>({});
  const [quantityWarning, setQuantityWarning] = useState<{ [key: string]: boolean }>({});
  const [selectedCurrency, setSelectedCurrency] = useState<'AED' | 'TJS' | 'USD'>('AED');
  const [exchangeRates, setExchangeRates] = useState<{ [key: string]: number }>({ AED: 1, TJS: 2.5249, USD: 0.2723 });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const UPLOAD_PASSWORD = 'cap2025';
  const ADMIN_EMAIL = 't8.fd88@gmail.com';
  const ADMIN_EMAILS = ['t8.fd88@gmail.com', 'admin@cap.com']; // Список админов

  // Проверка является ли пользователь админом
  const isAdmin = ADMIN_EMAILS.includes(user.email.toLowerCase());

  const formatPrice = (price: string): string => {
    if (!price) return 'Цена по запросу';
    const numPrice = parseFloat(price);
    if (isNaN(numPrice)) return price;

    const rate = exchangeRates[selectedCurrency] || 1;
    const convertedPrice = numPrice * rate;

    return `${convertedPrice.toFixed(2)} ${selectedCurrency}`;
  };

  const calculateCartTotal = (): number => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price);
      if (!isNaN(price)) {
        return total + (price * item.quantity);
      }
      return total;
    }, 0);
  };

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const { data, error } = await supabase
          .from('exchange_rates')
          .select('currency_to, rate');

        if (error) {
          console.error('Error fetching exchange rates:', error);
          return;
        }

        if (data && data.length > 0) {
          const rates: { [key: string]: number } = { AED: 1 };
          data.forEach((item: any) => {
            rates[item.currency_to] = item.rate;
          });
          setExchangeRates(rates);
        }
      } catch (error) {
        console.error('Error loading exchange rates:', error);
      }
    };

    fetchExchangeRates();

    const interval = setInterval(fetchExchangeRates, 3600000);

    return () => clearInterval(interval);
  }, []);

  const handleUploadLogin = () => {
    if (uploadPassword === UPLOAD_PASSWORD) {
      setIsUploadAuthenticated(true);
    } else {
      alert('Неверный пароль!');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('[FILE] handleFileUpload вызван');
    const files = Array.from(event.target.files || []);
    console.log('[FILE] Количество выбранных файлов:', files.length);
    if (files.length > 0) {
      files.forEach((f, idx) => {
        console.log(`[FILE] Файл ${idx + 1}: ${f.name}, размер: ${(f.size / 1024 / 1024).toFixed(2)} MB`);
      });
      setSelectedFiles(files);
      processMultipleExcelFiles(files);
    } else {
      console.log('[FILE] Нет выбранных файлов');
    }
  };

  const processMultipleExcelFiles = (files: File[]) => {
    console.log('[PROCESS] Начало обработки файлов:', files.length);
    setIsProcessing(true);
    const allProcessedData: PartData[] = [];

    let processedFiles = 0;

    files.forEach((file, fileIndex) => {
      console.log(`[PROCESS] Читаем файл ${fileIndex + 1}/${files.length}: ${file.name}`);
      const reader = new FileReader();

      reader.onerror = (error) => {
        console.error(`[PROCESS] ❌ Ошибка чтения файла ${file.name}:`, error);
        processedFiles++;
        if (processedFiles === files.length) {
          setIsProcessing(false);
          alert('Ошибка чтения файла!');
        }
      };

      reader.onload = (e) => {
        try {
          console.log(`[PROCESS] Файл ${file.name} загружен, начинаем парсинг...`);
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          console.log(`[PROCESS] Размер данных: ${data.length} байт`);

          const workbook = XLSX.read(data, { type: 'array' });
          console.log(`[PROCESS] Workbook прочитан, листов: ${workbook.SheetNames.length}`);

          const sheetName = workbook.SheetNames[0];
          console.log(`[PROCESS] Используем лист: ${sheetName}`);

          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          console.log(`[PROCESS] Строк в файле: ${jsonData.length}`);

          const headerRow = jsonData[0] as string[];
          console.log('[PROCESS] Заголовки:', headerRow);
          
          const partNoIndex = headerRow.findIndex(header => {
            if (!header) return false;
            const headerLower = header.toString().toLowerCase().trim();
            return headerLower === 'part no' ||
                   headerLower === 'part no.' ||
                   headerLower === 'part no' ||
                   headerLower === 'partno' ||
                   headerLower === 'item code';
          });

          const descriptionIndex = headerRow.findIndex(header => {
            if (!header) return false;
            const headerLower = header.toString().toLowerCase().trim();
            return headerLower === 'part name' ||
                   headerLower === 'description' ||
                   headerLower === 'discrapion' ||
                   headerLower === 'name';
          });

          const priceIndex = headerRow.findIndex(header => {
            if (!header) return false;
            const headerLower = header.toString().toLowerCase().trim();
            return headerLower === 'price in aed' ||
                   headerLower === 'price/aed' ||
                   headerLower === 'price' ||
                   headerLower === 'nett' ||
                   headerLower === 'u/p aed';
          });

          const qtyIndex = headerRow.findIndex(header => {
            if (!header) return false;
            const headerLower = header.toString().toLowerCase().trim();
            return headerLower === 'available qty' ||
                   headerLower === 'qty' ||
                   headerLower === 'quantity on hand' ||
                   headerLower === 'quantity';
          });

          console.log('[PROCESS] Headers found:', {
            partNo: partNoIndex,
            description: descriptionIndex,
            price: priceIndex,
            qty: qtyIndex
          });
          console.log('[PROCESS] Header row:', headerRow);

          if (partNoIndex === -1) {
            console.error('[PROCESS] ❌ КРИТИЧЕСКАЯ ОШИБКА: Не найдена колонка с кодом запчасти!');
            console.error('[PROCESS] Доступные заголовки:', headerRow);
            throw new Error('Не найдена колонка Part No / Item Code');
          }

          console.log('[PROCESS] Начинаем парсинг строк...');
          let parsedCount = 0;

          for (let i = 1; i < jsonData.length; i++) {
            const row = jsonData[i] as any[];

            if (row && row.length > 0 && partNoIndex !== -1) {
              const partNo = row[partNoIndex]?.toString().trim() || '';
              const description = descriptionIndex !== -1 ? (row[descriptionIndex]?.toString().trim() || '') : '';
              const price = priceIndex !== -1 ? (row[priceIndex]?.toString().trim() || '') : '';
              const qty = qtyIndex !== -1 ? (row[qtyIndex]?.toString().trim() || '') : '';

              if (i <= 3) {
                console.log(`[PROCESS] Row ${i} data:`, {
                  partNo,
                  description,
                  price,
                  qty,
                  qtyRaw: row[qtyIndex]
                });
              }

              if (partNo && partNo !== '') {
                parsedCount++;
                const existingIndex = allProcessedData.findIndex(item => item.code === partNo);
                const cleanPrice = price && price !== '' ? price.toString().replace(/[^\d.]/g, '') : '';
                const newItem = {
                  code: partNo,
                  name: description || partNo,
                  brand: '',
                  price: cleanPrice || '0',
                  weight: '',
                  category: 'Автозапчасти',
                  description: description || partNo,
                  availability: 'В наличии',
                  qty: qty || '0'
                };
                
                if (existingIndex >= 0) {
                  allProcessedData[existingIndex] = newItem;
                } else {
                  allProcessedData.push(newItem);
                }

                // Логируем прогресс каждые 1000 записей
                if (parsedCount % 1000 === 0) {
                  console.log(`[PROCESS] Обработано строк: ${parsedCount}, в массиве: ${allProcessedData.length}`);
                }
              }
            }
          }

          console.log(`[PROCESS] ✅ Парсинг завершен. Обработано строк: ${parsedCount}, добавлено записей: ${allProcessedData.length}`);

          processedFiles++;
          console.log(`[PROCESS] ✅ Файл обработан. Всего обработано файлов: ${processedFiles}/${files.length}`);
          console.log(`[PROCESS] Всего записей в массиве: ${allProcessedData.length}`);

          if (processedFiles === files.length) {
            console.log(`[PROCESS] 🎉 Все файлы обработаны!`);
            console.log(`[PROCESS] Общее количество записей: ${allProcessedData.length}`);
            console.log(`[PROCESS] Первые 3 записи:`, allProcessedData.slice(0, 3));

            setPartsData(allProcessedData);
            console.log('[PROCESS] Данные установлены в state');

            localStorage.setItem('capCatalog', JSON.stringify(allProcessedData));
            sessionStorage.setItem('capCatalog', JSON.stringify(allProcessedData));
            const backupKey = `capCatalog_backup_${Date.now()}`;
            localStorage.setItem(backupKey, JSON.stringify(allProcessedData));
            console.log('[PROCESS] Данные сохранены в localStorage');

            console.log('[PROCESS] Начинаем сохранение в базу данных...');
            saveCatalogToDatabase(allProcessedData).then(savedCount => {
              console.log(`[PROCESS] ✅ Успешно сохранено в БД: ${savedCount} записей`);
              setIsProcessing(false);
              alert(`✅ Импорт завершён!\n\nОбработано: ${allProcessedData.length} позиций\nСохранено в базу данных: ${savedCount} позиций\n\nВсе данные сохранены и будут доступны всегда!`);
              setSelectedFiles([]);
              setShowUploadSection(false);
              // Перезагрузить каталог из базы данных чтобы показать все данные
              loadCatalogFromDatabase();
            }).catch(error => {
              console.error('[PROCESS] ❌ Ошибка сохранения в базу:', error);
              setIsProcessing(false);
              alert(`⚠️ Частичный импорт\n\nОбработано: ${allProcessedData.length} позиций\nОшибка сохранения в базу данных.\n\nПроверьте консоль для деталей.`);
              setSelectedFiles([]);
              setShowUploadSection(false);
            });
          }
        } catch (error) {
          console.error(`[PROCESS] ❌ Критическая ошибка обработки файла ${file.name}:`, error);
          console.error('[PROCESS] Stack trace:', error instanceof Error ? error.stack : 'No stack');
          processedFiles++;

          if (processedFiles === files.length) {
            console.log('[PROCESS] ❌ Обработка завершена с ошибками');
            setIsProcessing(false);
            alert('Ошибка обработки файла. Проверьте консоль для деталей.');
          }
        }
      };

      reader.readAsArrayBuffer(file);
    });
  };

  // Загрузить курсы валют из базы данных
  const loadExchangeRates = async () => {
    try {
      console.log('[CURRENCY] Загрузка курсов валют из базы данных...');
      const { data, error } = await supabase
        .from('exchange_rates')
        .select('*')
        .eq('currency_from', 'AED');

      if (error) throw error;

      if (data && data.length > 0) {
        const rates: { [key: string]: number } = { AED: 1 };
        data.forEach(rate => {
          rates[rate.currency_to] = parseFloat(rate.rate);
          console.log(`[CURRENCY] ${rate.currency_to}: ${rate.rate}`);
        });
        setExchangeRates(rates);
        console.log('[CURRENCY] ✅ Курсы валют загружены:', rates);
      }
    } catch (error) {
      console.error('[CURRENCY] ❌ Ошибка загрузки курсов валют:', error);
    }
  };

  // Обновить курсы валют через API
  const updateExchangeRates = async () => {
    try {
      console.log('[CURRENCY] Запрос обновления курсов валют...');
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/update-exchange-rates`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log('[CURRENCY] ✅ Курсы валют обновлены:', result);
        // Перезагрузить курсы из базы данных
        await loadExchangeRates();
      } else {
        console.error('[CURRENCY] ❌ Ошибка обновления курсов:', response.statusText);
      }
    } catch (error) {
      console.error('[CURRENCY] ❌ Ошибка при обновлении курсов:', error);
    }
  };

  // Загрузить каталог из базы данных при запуске
  useEffect(() => {
    loadCatalogFromDatabase();
    loadCartItems();
    loadExchangeRates();

    // Обновлять курсы каждые 6 часов (21600000 мс)
    updateExchangeRates();
    const rateUpdateInterval = setInterval(updateExchangeRates, 21600000);

    return () => clearInterval(rateUpdateInterval);
  }, []);

  const loadCartItems = async () => {
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_email', user.email)
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) {
        setCartItems(data);
      }
    } catch (error) {
      console.error('Ошибка загрузки корзины:', error);
    }
  };

  const addToCart = async (part: PartData) => {
    try {
      const quantityToAdd = typeof partQuantities[part.code] === 'number' ? partQuantities[part.code] : 1;

      if (quantityToAdd < 1) {
        alert('Пожалуйста, укажите количество');
        return;
      }

      const existingItem = cartItems.find(item => item.part_code === part.code);

      if (existingItem) {
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity: existingItem.quantity + quantityToAdd, updated_at: new Date().toISOString() })
          .eq('id', existingItem.id);

        if (error) throw error;

        setCartItems(prev => prev.map(item =>
          item.id === existingItem.id
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        ));
      } else {
        const { data, error } = await supabase
          .from('cart_items')
          .insert([{
            user_email: user.email,
            part_code: part.code,
            part_name: part.name,
            brand: part.brand,
            price: part.price,
            quantity: quantityToAdd
          }])
          .select();

        if (error) throw error;
        if (data) {
          setCartItems(prev => [...prev, data[0]]);
        }
      }

      setPartQuantities(prev => ({ ...prev, [part.code]: 0 }));
      console.log(`✅ Добавлено ${quantityToAdd} шт. запчасти ${part.code} в корзину`);
    } catch (error) {
      console.error('Ошибка добавления в корзину:', error);
      alert('Ошибка добавления в корзину');
    }
  };

  const handleExcelRequest = () => {
    const message = `Пожалуйста выберите Excel файл для заказа.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/971561747182?text=${encodedMessage}`, '_blank');
  };

  const removeFromCart = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;

      setCartItems(prev => prev.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Ошибка удаления из корзины:', error);
      alert('Ошибка удаления из корзины');
    }
  };

  const updateCartQuantity = async (itemId: string, quantity: number) => {
    try {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity, updated_at: new Date().toISOString() })
        .eq('id', itemId);

      if (error) throw error;

      setCartItems(prev => prev.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      ));
    } catch (error) {
      console.error('Ошибка обновления количества:', error);
      alert('Ошибка обновления количества');
    }
  };

  const clearCart = async () => {
    if (!confirm('Очистить всю корзину?')) return;

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_email', user.email);

      if (error) throw error;

      setCartItems([]);
    } catch (error) {
      console.error('Ошибка очистки корзины:', error);
      alert('Ошибка очистки корзины');
    }
  };

  const saveCatalogToDatabase = async (catalogData: PartData[]) => {
    try {
      console.log(`[IMPORT] Начало сохранения ${catalogData.length} позиций в базу данных...`);
      console.log(`[IMPORT] Первые 3 записи:`, catalogData.slice(0, 3));
      console.log('[IMPORT] ВАЖНО: Используем UPSERT - данные будут обновлены или добавлены, старые данные сохранятся');

      const batchSize = 1000;
      let successCount = 0;
      let failedCount = 0;
      let updatedCount = 0;
      let insertedCount = 0;

      console.log(`[IMPORT] Загрузка данных батчами по ${batchSize} записей...`);

      for (let i = 0; i < catalogData.length; i += batchSize) {
        const batch = catalogData.slice(i, i + batchSize);
        console.log(`[IMPORT] Обработка батча ${Math.floor(i/batchSize) + 1}/${Math.ceil(catalogData.length/batchSize)} (записи ${i}-${i + batch.length})...`);

        const dataToUpsert = batch.map(item => ({
          code: item.code,
          name: item.name,
          brand: item.brand || 'C.A.P',
          price: item.price,
          weight: item.weight || '',
          category: item.category,
          description: item.description,
          availability: item.availability,
          qty: item.qty || '0'
        }));

        // Используем UPSERT вместо INSERT
        // Если запчасть с таким code существует - обновим её
        // Если нет - добавим новую
        const { data, error } = await supabase
          .from('catalog_parts')
          .upsert(dataToUpsert, {
            onConflict: 'code',
            ignoreDuplicates: false
          })
          .select();

        if (error) {
          console.error(`[IMPORT] ❌ Ошибка сохранения батча ${i}-${i + batchSize}:`, error);
          console.error('[IMPORT] Детали ошибки:', JSON.stringify(error, null, 2));
          console.error('[IMPORT] Пример данных из батча:', dataToUpsert.slice(0, 2));
          failedCount += batch.length;
        } else {
          successCount += batch.length;
          console.log(`[IMPORT] ✅ Обработано ${successCount} из ${catalogData.length} позиций (${Math.round(successCount/catalogData.length*100)}%)`);
        }
      }

      console.log(`[IMPORT] ========================================`);
      console.log(`[IMPORT] Сохранение завершено!`);
      console.log(`[IMPORT] Успешно: ${successCount} позиций`);
      console.log(`[IMPORT] Ошибки: ${failedCount} позиций`);
      console.log(`[IMPORT] Всего: ${catalogData.length} позиций`);
      console.log(`[IMPORT] ========================================`);

      return successCount;
    } catch (error) {
      console.error('[IMPORT] ❌ Критическая ошибка сохранения:', error);
      return 0;
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
        availability: item.availability,
        qty: item.qty
      }));
      setPartsData(catalogData);
      console.log(`Загружен каталог из базы: ${catalogData.length} позиций`);
    } catch (error) {
      console.error('Ошибка загрузки каталога из базы:', error);
      setPartsData([]);
    }
  };

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
        {/* Sidebar Menu */}
        <SidebarMenu
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          currentLanguage={currentLanguage}
          onLanguageChange={setCurrentLanguage}
        />

        {/* Header - Mobile Responsive */}
        <div className="bg-gradient-to-r from-gray-900/95 to-gray-800/95 backdrop-blur-sm border-2 border-blue-600/30 rounded-2xl p-3 md:p-4 mb-6 md:mb-8 shadow-xl">
          {/* Mobile Layout - Stacked */}
          <div className="lg:hidden">
            {/* Top Row - Menu, Cart and User */}
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors px-2 py-2 rounded-lg hover:bg-blue-600/10"
              >
                <Menu className="w-6 h-6" />
                <span className="font-medium text-sm">Меню</span>
              </button>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleExcelRequest}
                  className="bg-purple-600/20 border border-purple-500 rounded-xl px-3 py-2 hover:bg-purple-600/30 transition-colors"
                  title="Запрос через Excel"
                >
                  <FileUp className="w-5 h-5 text-purple-400" />
                </button>

                <button
                  onClick={() => setShowCart(true)}
                  className="relative bg-blue-600/20 border border-blue-500 rounded-xl px-3 py-2 hover:bg-blue-600/30 transition-colors flex items-center space-x-2 min-w-[120px] max-w-[120px]"
                >
                  <ShoppingCart className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  {cartItems.length > 0 && (
                    <>
                      <span className="text-white font-semibold text-sm truncate">
                        {calculateCartTotal().toFixed(2)} AED
                      </span>
                      <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                        {cartItems.length}
                      </span>
                    </>
                  )}
                </button>

                <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center bg-blue-600/20 border border-blue-500 rounded-xl px-2 py-2 hover:bg-blue-600/30 transition-colors w-[110px]"
                >
                  <User className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <span className="text-white font-medium text-sm truncate flex-1 mx-1">{user.name}</span>
                  <ChevronDown className="w-4 h-4 text-blue-400 flex-shrink-0" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
                    {isAdmin && (
                      <>
                        <button
                          onClick={() => {
                            setShowAdminPanel(true);
                            setShowUserMenu(false);
                          }}
                          className="w-full flex items-center space-x-2 px-4 py-3 text-white hover:bg-gray-700 transition-colors border-b border-gray-700"
                        >
                          <Upload className="w-4 h-4" />
                          <span>Управление каталогом</span>
                        </button>
                        <button
                          onClick={() => {
                            fileInputRef.current?.click();
                            setShowUserMenu(false);
                          }}
                          className="w-full flex items-center space-x-2 px-4 py-3 text-green-400 hover:bg-gray-700 transition-colors border-b border-gray-700"
                        >
                          <FileUp className="w-4 h-4" />
                          <span>Загрузить Excel файлы</span>
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => {
                        onLogout();
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center space-x-2 px-4 py-3 text-red-400 hover:bg-gray-700 transition-colors rounded-b-lg"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Выход</span>
                    </button>
                  </div>
                )}
                </div>
              </div>
            </div>

            {/* Bottom Row - Currency and Search */}
            <div className="flex items-center space-x-2">
              <select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value as 'AED' | 'TJS' | 'USD')}
                className="px-3 py-2.5 bg-gray-800/90 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm font-medium"
              >
                <option value="AED">AED</option>
                <option value="TJS">TJS</option>
                <option value="USD">USD</option>
              </select>

              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Поиск..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-12 py-2.5 bg-gray-800/90 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
                />
                <button
                  onClick={() => handleSearch(searchTerm)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded-lg transition-colors"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Layout - Single Row */}
          <div className="hidden lg:flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors px-3 py-2 rounded-lg hover:bg-blue-600/10"
            >
              <Menu className="w-6 h-6" />
              <span className="font-medium">Меню</span>
            </button>

            <div className="flex items-center space-x-3 flex-1 max-w-3xl mx-6">
              <select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value as 'AED' | 'TJS' | 'USD')}
                className="px-4 py-3 bg-gray-800/90 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
              >
                <option value="AED">AED</option>
                <option value="TJS">TJS</option>
                <option value="USD">USD</option>
              </select>

              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Поиск по коду, названию или бренду..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-12 pr-16 py-3 bg-gray-800/90 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
                <button
                  onClick={() => handleSearch(searchTerm)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleExcelRequest}
                className="bg-purple-600/20 border border-purple-500 rounded-xl px-4 py-3 hover:bg-purple-600/30 transition-colors flex items-center space-x-2"
                title="Запрос через Excel"
              >
                <FileUp className="w-5 h-5 text-purple-400" />
                <span className="text-white font-medium text-sm">Excel запрос</span>
              </button>

              <button
                onClick={() => setShowCart(true)}
                className="relative bg-blue-600/20 border border-blue-500 rounded-xl px-4 py-3 hover:bg-blue-600/30 transition-colors flex items-center space-x-3"
              >
                <ShoppingCart className="w-5 h-5 text-blue-400" />
                <div className="flex flex-col items-start">
                  <span className="text-white font-medium text-sm">Корзина</span>
                  {cartItems.length > 0 && (
                    <span className="text-green-400 font-bold text-xs">
                      {calculateCartTotal().toFixed(2)} AED
                    </span>
                  )}
                </div>
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
                    {cartItems.length}
                  </span>
                )}
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center bg-blue-600/20 border border-blue-500 rounded-xl px-3 py-3 hover:bg-blue-600/30 transition-colors w-[180px]"
                >
                <User className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-white font-medium truncate flex-1 mx-2">{user.name}</span>
                <ChevronDown className="w-4 h-4 text-blue-400 flex-shrink-0" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
                  {isAdmin && (
                    <>
                      <button
                        onClick={() => {
                          setShowAdminPanel(true);
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center space-x-2 px-4 py-3 text-white hover:bg-gray-700 transition-colors border-b border-gray-700"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Управление каталогом</span>
                      </button>
                      <button
                        onClick={() => {
                          fileInputRef.current?.click();
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center space-x-2 px-4 py-3 text-green-400 hover:bg-gray-700 transition-colors border-b border-gray-700"
                      >
                        <FileUp className="w-4 h-4" />
                        <span>Загрузить Excel файлы</span>
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => {
                      onLogout();
                      setShowUserMenu(false);
                    }}
                    className="w-full flex items-center space-x-2 px-4 py-3 text-red-400 hover:bg-gray-700 transition-colors rounded-b-lg"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Выход</span>
                  </button>
                </div>
              )}
              </div>
            </div>
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
                  {/* Availability and Quantity */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      part.availability === 'В наличии'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {part.availability}
                    </span>
                    {part.qty && (
                      <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-bold">
                        Кол-во: {part.qty}
                      </span>
                    )}
                  </div>

                  {/* Part Info */}
                  <h4 className="text-lg font-bold text-white mb-2">{part.name}</h4>
                  <p className="text-gray-400 text-sm mb-4">{part.code}</p>

                  {part.description && part.description !== part.name && (
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                      {part.description}
                    </p>
                  )}

                  {/* Price and Weight */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-green-400">
                      <span className="font-bold">{formatPrice(part.price)}</span>
                    </div>
                    {part.weight && (
                      <div className="flex items-center text-gray-400">
                        <Weight className="w-4 h-4 mr-1" />
                        <span className="text-sm">{part.weight}</span>
                      </div>
                    )}
                  </div>

                  {/* Quantity Input */}
                  <div className="mb-3">
                    <label className="block text-gray-400 text-sm mb-1">
                      Количество:
                      {part.qty && parseInt(part.qty) > 0 && (
                        <span className="ml-2 text-xs text-gray-500">(макс: {part.qty})</span>
                      )}
                    </label>
                    <input
                      type="number"
                      min="1"
                      max={part.qty && parseInt(part.qty) > 0 ? parseInt(part.qty) : undefined}
                      value={partQuantities[part.code] !== undefined && partQuantities[part.code] !== '' ? partQuantities[part.code] : ''}
                      placeholder="1"
                      onChange={(e) => {
                        const inputValue = e.target.value;

                        // Скрыть предупреждение при новом вводе
                        setQuantityWarning(prev => ({ ...prev, [part.code]: false }));

                        // Разрешить пустое поле
                        if (inputValue === '') {
                          setPartQuantities(prev => ({ ...prev, [part.code]: '' }));
                          return;
                        }

                        const value = parseInt(inputValue);

                        // Проверить что значение валидное
                        if (isNaN(value) || value < 1) {
                          setPartQuantities(prev => ({ ...prev, [part.code]: '' }));
                          return;
                        }

                        const availableQty = part.qty ? parseInt(part.qty) : 0;
                        if (availableQty > 0 && value > availableQty) {
                          setPartQuantities(prev => ({ ...prev, [part.code]: availableQty }));
                          setQuantityWarning(prev => ({ ...prev, [part.code]: true }));
                          setTimeout(() => {
                            setQuantityWarning(prev => ({ ...prev, [part.code]: false }));
                          }, 3000);
                          return;
                        }

                        setPartQuantities(prev => ({ ...prev, [part.code]: value }));
                      }}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    />
                    {quantityWarning[part.code] && (
                      <p className="text-amber-400 text-xs mt-1 font-medium">
                        ⚠ Максимальное количество в наличии: {part.qty}
                      </p>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => addToCart(part)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Добавить в корзину</span>
                  </button>
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
        {!searchTerm && totalParts > 0 && (
          <>
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
                  Цены, наличие и характеристики
                </p>
              </div>
              <div className="text-center">
                <div className="bg-[#144374] p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <ShoppingCart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Корзина</h3>
                <p className="text-gray-400">
                  Добавьте товары для быстрого заказа
                </p>
              </div>
            </div>

            {/* Payment QR Code Section */}
            <div className="mt-8 border-4 border-[#144374] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl">
              <div className="p-6 md:p-8">
                <h3 className="text-2xl font-bold text-white mb-2 text-center">Удобная оплата</h3>
                <p className="text-gray-300 text-center mb-6">
                  Удобная оплата через Dc - Alif для вашего комфорта
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {/* Первый QR код - Dc */}
                  <div className="bg-white p-4 rounded-xl shadow-lg">
                    <img
                      src="/QR Dc .jpg"
                      alt="QR код для оплаты Dc"
                      className="w-full h-auto"
                      style={{ aspectRatio: '1/1', objectFit: 'contain' }}
                    />
                  </div>

                  {/* Второй QR код - Alif */}
                  <div className="bg-white p-4 rounded-xl shadow-lg">
                    <img
                      src="/QR alif 2.jpg"
                      alt="QR код для оплаты Alif"
                      className="w-full h-auto"
                      style={{ aspectRatio: '1/1', objectFit: 'contain' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
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
              loadCatalogFromDatabase();
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

      {/* Cart Modal */}
      <CartModal
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        items={cartItems}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
        onUpdateQuantity={updateCartQuantity}
        selectedCurrency={selectedCurrency}
        exchangeRates={exchangeRates}
      />

      {/* Hidden File Input for Quick Upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls"
        multiple
        onChange={handleFileUpload}
        className="hidden"
      />

    </div>
  );
};