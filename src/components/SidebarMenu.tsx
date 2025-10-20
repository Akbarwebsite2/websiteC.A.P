import React from 'react';
import { X, Home, Package, Award, Mail, Phone } from 'lucide-react';

interface SidebarMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: 'ru' | 'en';
  onLanguageChange: (lang: 'ru' | 'en') => void;
}

export const SidebarMenu: React.FC<SidebarMenuProps> = ({
  isOpen,
  onClose,
  currentLanguage,
  onLanguageChange
}) => {
  const menuItems = currentLanguage === 'ru' ? [
    { label: 'Главная', icon: Home, href: '/' },
    { label: 'Продукты', icon: Package, href: '/#products' },
    { label: 'Бренды', icon: Award, href: '/#brands' },
    { label: 'О нас', icon: Mail, href: '/#about' },
    { label: 'Контакты', icon: Phone, href: '/#contact' },
  ] : [
    { label: 'Home', icon: Home, href: '/' },
    { label: 'Products', icon: Package, href: '/#products' },
    { label: 'Brands', icon: Award, href: '/#brands' },
    { label: 'About', icon: Mail, href: '/#about' },
    { label: 'Contact', icon: Phone, href: '/#contact' },
  ];

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed left-0 top-0 bottom-0 w-80 bg-gradient-to-b from-gray-900 to-black border-r border-gray-700 z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <h2 className="text-xl font-bold text-white">Меню</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto py-6">
            <ul className="space-y-2 px-4">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-blue-600/20 hover:text-white transition-all duration-200"
                    onClick={onClose}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};