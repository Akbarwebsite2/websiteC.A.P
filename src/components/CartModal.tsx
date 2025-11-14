import React from 'react';
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
  selectedCurrency: 'AED' | 'TJS' | 'USD';
  exchangeRates: { [key: string]: number };
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onClearCart,
  onUpdateQuantity,
  selectedCurrency,
  exchangeRates
}) => {
  if (!isOpen) return null;

  const formatPrice = (priceAED: string): number => {
    const price = parseFloat(priceAED);
    if (isNaN(price)) return 0;
    const rate = exchangeRates[selectedCurrency] || 1;
    return price * rate;
  };

  const calculateTotal = (): number => {
    return items.reduce((total, item) => {
      const convertedPrice = formatPrice(item.price);
      return total + (convertedPrice * item.quantity);
    }, 0);
  };

  const handleWhatsAppPayment = () => {
    let message = 'Здравствуйте! Хочу оформить заказ:\n\n';
    items.forEach((item, index) => {
      const convertedPrice = formatPrice(item.price);
      message += `${index + 1}. ${item.part_name}\n`;
      message += `   Код: ${item.part_code}\n`;
      message += `   Бренд: ${item.brand}\n`;
      message += `   Цена: ${convertedPrice.toFixed(2)} ${selectedCurrency}\n`;
      message += `   Количество: ${item.quantity}\n\n`;
    });
    message += `Общая сумма: ${calculateTotal().toFixed(2)} ${selectedCurrency}\n\n`;
    message += 'Оплатить через Dc - Alif';

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/971561747182?text=${encodedMessage}`, '_blank');
  };

  const handleExportToExcel = () => {
    const wb = XLSX.utils.book_new();

    const headers = ['№', 'Артикул', 'Описание', 'Количество', `Цена (${selectedCurrency})`, `Сумма (${selectedCurrency})`];

    const dataRows = items.map((item, index) => {
      const convertedPrice = formatPrice(item.price);
      const itemTotal = convertedPrice * item.quantity;
      return [
        index + 1,
        item.part_code,
        item.part_name,
        item.quantity,
        convertedPrice.toFixed(2),
        itemTotal.toFixed(2)
      ];
    });

    const totalRow = ['', '', '', '', 'Общая сумма:', calculateTotal().toFixed(2)];

    const allData = [headers, ...dataRows, totalRow];
    const ws = XLSX.utils.aoa_to_sheet(allData);

    const range = XLSX.utils.decode_range(ws['!ref'] || 'A1');
    for (let R = range.s.r; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
        if (!ws[cellAddress]) continue;

        if (!ws[cellAddress].s) ws[cellAddress].s = {};

        ws[cellAddress].s = {
          alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
          border: {
            top: { style: 'thin', color: { rgb: "000000" } },
            bottom: { style: 'thin', color: { rgb: "000000" } },
            left: { style: 'thin', color: { rgb: "000000" } },
            right: { style: 'thin', color: { rgb: "000000" } }
          }
        };

        if (R === 0) {
          ws[cellAddress].s.font = { bold: true, sz: 11 };
        }

        if (R === items.length + 1 && (C === 4 || C === 5)) {
          ws[cellAddress].s.font = { bold: true };
        }
      }
    }

    const colWidths = [
      { wch: 8 },
      { wch: 20 },
      { wch: 50 },
      { wch: 12 },
      { wch: 15 },
      { wch: 15 }
    ];
    ws['!cols'] = colWidths;

    const rowHeights = [{ hpt: 25 }];
    for (let i = 0; i <= items.length; i++) {
      rowHeights.push({ hpt: 20 });
    }
    ws['!rows'] = rowHeights;

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
                        <span className="text-green-400 font-semibold">{formatPrice(item.price).toFixed(2)} {selectedCurrency}</span>
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
                {calculateTotal().toFixed(2)} {selectedCurrency}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button
                onClick={handleExportToExcel}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Скачать Excel</span>
              </button>

              <button
                onClick={onClearCart}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <Trash2 className="w-5 h-5" />
                <span>Очистить корзину</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
