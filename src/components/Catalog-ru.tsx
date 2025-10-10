import React, { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';
import { AuthModal } from './AuthModal';
import { CatalogPage } from './CatalogPage';

interface PartData {
  partNo: string;
  name: string;
  price: string;
  brand: string;
  category: string;
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Создать тестового пользователя при первом запуске
  useEffect(() => {
    // Убираем создание тестового пользователя
    // Теперь все пользователи должны регистрироваться с кодом
    localStorage.removeItem('capUsers'); // Удаляем старых пользователей

    // Проверить сохраненную сессию
    const savedUser = localStorage.getItem('capCurrentUser');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        // Проверяем, что пользователь верифицирован
        const verifiedUsers = JSON.parse(localStorage.getItem('capVerifiedUsers') || '[]');
        const isVerified = verifiedUsers.find((u: AuthUser) => 
          u.email === user.email && u.isVerified === true
        );
        
        if (isVerified) {
          setCurrentUser(user);
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('capCurrentUser');
        }
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
  };

  const handleBackToSite = () => {
    // Не выходим из системы, просто возвращаемся к основному сайту
    // setIsAuthenticated(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
    }
  }
  // Если пользователь авторизован, показываем отдельную страницу каталога
  if (isAuthenticated && currentUser) {
    return (
      <CatalogPage 
        user={currentUser}
        onLogout={handleLogout}
        onBack={handleBackToSite}
      />
    );
  }

  return (
    <section id="catalog" className="py-20 relative bg-transparent">
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={handleLogin}
      />

      {/* Показываем только форму входа, если пользователь не авторизован */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-black text-white mb-6 tracking-tight">
            КАТАЛОГ <span className="text-[#144374]">ЗАПЧАСТЕЙ</span>
          </h2>
          <div className="w-24 h-1 bg-[#144374] mx-auto mb-8"></div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-medium">
            Найдите нужную запчасть по коду, названию или бренду из нашего объединенного каталога
          </p>
        </div>

        {/* Login Required Section */}
        <div className="relative z-10 text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="bg-gray-800/90 rounded-2xl p-8 border border-gray-700">
              <Lock className="w-16 h-16 text-[#144374] mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">
                🔐 Новая система регистрации
              </h3>
              <p className="text-yellow-400 mb-4 text-sm font-semibold">
                ⚠️ Старые аккаунты удалены. Требуется новая регистрация с кодом подтверждения.
              </p>
              <h4 className="text-xl font-bold text-white mb-4">
                Требуется авторизация
              </h4>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Для доступа к каталогу запчастей необходимо зарегистрироваться с кодом подтверждения от администратора
              </p>
              <button
                onClick={() => setShowAuthModal(true)}
                className="w-full bg-[#144374] hover:bg-[#1a5490] text-white py-3 px-6 rounded-lg font-semibold transition-colors"
              >
                🔑 Регистрация с кодом
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}