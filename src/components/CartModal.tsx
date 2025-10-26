import React, { useRef } from 'react';
import { X, Trash2, ShoppingCart, FileUp, Download } from 'lucide-react';
import * as XLSX from 'xlsx';

interface CartItem {
  id: string;
  part_code: string;
  part_name: string;
  brand: string;
  price: string;
  quantity: number;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onClearCart,
  onUpdateQuantity
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const calculateTotal = (): number => {
    return items.reduce((total, item) => {
      const price = parseFloat(item.price);
      if (!isNaN(price)) {
        return total + (price * item.quantity);
      }
      return total;
    }, 0);
  };

  const handleWhatsAppPayment = () => {
    let message = 'Здравствуйте! Хочу оформить заказ:\n\n';
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.part_name}\n`;
      message += `   Код: ${item.part_code}\n`;
      message += `   Бренд: ${item.brand}\n`;
      message += `   Цена: ${item.price}\n`;
      message += `   Количество: ${item.quantity}\n\n`;
    });
    message += `Общая сумма: ${calculateTotal().toFixed(2)} AED\n\n`;
    message += 'Оплатить через Dc - Alif';

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/971561747182?text=${encodedMessage}`, '_blank');
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    alert(`Пожалуйста, отправьте файл "${file.name}" напрямую через WhatsApp после открытия чата.`);

    const message = `Здравствуйте! Я хочу отправить файл Excel с запросом на запчасти.\n\nИмя файла: ${file.name}\nРазмер: ${(file.size / 1024).toFixed(2)} KB`;
    const encodedMessage = encodeURIComponent(message);

    window.open(`https://wa.me/971561747182?text=${encodedMessage}`, '_blank');

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleExportToExcel = () => {
    const exportData = items.map((item, index) => ({
      '№': index + 1,
      'Название запчасти': item.part_name,
      'Код запчасти': item.part_code,
      'Количество': item.quantity,
      'Цена (AED)': parseFloat(item.price).toFixed(2),
      'Сумма (AED)': (parseFloat(item.price) * item.quantity).toFixed(2)
    }));

    exportData.push({
      '№': '',
      'Название запчасти': '',
      'Код запчасти': '',
      'Количество': '',
      'Цена (AED)': 'Общая сумма:',
      'Сумма (AED)': calculateTotal().toFixed(2)
    });

    const ws = XLSX.utils.json_to_sheet(exportData);

    const colWidths = [
      { wch: 5 },
      { wch: 40 },
      { wch: 20 },
      { wch: 12 },
      { wch: 12 },
      { wch: 12 }
    ];
    ws['!cols'] = colWidths;

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Заказ');

    const fileName = `Заказ_${new Date().toLocaleDateString('ru-RU').replace(/\./g, '-')}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col border-2 border-blue-600/30">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <ShoppingCart className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">Корзина</h2>
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {items.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">Корзина пуста</p>
              <p className="text-gray-500 text-sm mt-2">
                Добавьте запчасти в корзину для быстрого доступа
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 hover:border-blue-600/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-lg font-mono text-sm font-semibold">
                          {item.part_code}
                        </span>
                        <span className="text-gray-400 text-sm">{item.brand}</span>
                      </div>
                      <h3 className="text-white font-medium mb-2">{item.part_name}</h3>
                      <div className="flex items-center space-x-4">
                        <span className="text-green-400 font-semibold">{item.price}</span>
                        <div className="flex items-center space-x-2">
                          <label className="text-gray-500 text-sm">Количество:</label>
                          <input
                            type="number"
                            min="0"
                            value={item.quantity}
                            onChange={(e) => {
                              const value = parseInt(e.target.value) || 0;
                              onUpdateQuantity(item.id, value >= 0 ? value : 0);
                            }}
                            className="w-20 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-red-400 hover:text-red-300 transition-colors p-2 hover:bg-red-600/10 rounded-lg"
                      title="Удалить из корзины"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-gray-700 space-y-4">
            <div className="flex items-center justify-between bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <span className="text-gray-300 text-lg font-semibold">Общая сумма:</span>
              <span className="text-green-400 text-2xl font-bold">
                {calculateTotal().toFixed(2)} AED
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button
                onClick={handleWhatsAppPayment}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors underline decoration-2 underline-offset-4"
              >
                Оплатить через Dc - Alif
              </button>

              <button
                onClick={handleExportToExcel}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Скачать Excel</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <FileUp className="w-5 h-5" />
                <span>Запрос через Excel</span>
              </button>

              <button
                onClick={onClearCart}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <Trash2 className="w-5 h-5" />
                <span>Очистить корзину</span>
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        )}
      </div>
    </div>
  );
};
