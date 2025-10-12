import React, { useState } from 'react';
import { User, Lock, Mail, Eye, EyeOff, X, KeyRound } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { hashPassword, verifyPassword } from '../lib/crypto';
import { generateVerificationCode, sendVerificationCode } from '../lib/emailService';

interface AuthUser {
  id: string;
  email: string;
  name: string;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: AuthUser) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [pendingVerificationId, setPendingVerificationId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleVerifyCode = async () => {
    if (verificationCode.length !== 6) {
      setError('Код должен содержать 6 цифр');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const { data: verification, error: fetchError } = await supabase
        .from('verification_codes')
        .select('*')
        .eq('code', verificationCode)
        .eq('verified', false)
        .maybeSingle();

      if (fetchError) throw fetchError;

      if (!verification) {
        setError('Неверный код подтверждения');
        return;
      }

      const now = new Date();
      const expiresAt = new Date(verification.expires_at);

      if (now > expiresAt) {
        setError('Код истек. Пожалуйста, зарегистрируйтесь снова');
        await supabase
          .from('verification_codes')
          .delete()
          .eq('id', verification.id);
        return;
      }

      const { data: newUser, error: insertError } = await supabase
        .from('catalog_users')
        .insert([{
          email: verification.email,
          password_hash: verification.password_hash,
          name: verification.name
        }])
        .select()
        .single();

      if (insertError) throw insertError;

      await supabase
        .from('verification_codes')
        .update({ verified: true })
        .eq('id', verification.id);

      if (newUser) {
        const authUser: AuthUser = {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name
        };
        onLogin(authUser);
        onClose();
        setSuccess('Регистрация успешно завершена!');
        resetForm();
      }
    } catch (error: any) {
      setError(error.message || 'Произошла ошибка при проверке кода');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      if (isLoginMode) {
        const { data: users, error: fetchError } = await supabase
          .from('catalog_users')
          .select('*')
          .eq('email', formData.email)
          .maybeSingle();

        if (fetchError) throw fetchError;

        if (users) {
          const isPasswordValid = await verifyPassword(formData.password, users.password_hash);

          if (isPasswordValid) {
            const authUser: AuthUser = {
              id: users.id,
              email: users.email,
              name: users.name
            };
            onLogin(authUser);
            onClose();
            resetForm();
          } else {
            setError('Неверный email или пароль');
          }
        } else {
          setError('Неверный email или пароль');
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError('Пароли не совпадают');
          return;
        }

        if (formData.password.length < 6) {
          setError('Пароль должен содержать минимум 6 символов');
          return;
        }

        const { data: existingUser } = await supabase
          .from('catalog_users')
          .select('id')
          .eq('email', formData.email)
          .maybeSingle();

        if (existingUser) {
          setError('Пользователь с таким email уже существует');
          return;
        }

        const code = generateVerificationCode();
        const passwordHash = await hashPassword(formData.password);

        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 10);

        const { data: verificationRecord, error: insertError } = await supabase
          .from('verification_codes')
          .insert([{
            email: formData.email,
            name: formData.name,
            code: code,
            password_hash: passwordHash,
            expires_at: expiresAt.toISOString()
          }])
          .select()
          .single();

        if (insertError) throw insertError;

        const emailSent = await sendVerificationCode(
          formData.email,
          formData.name,
          code
        );

        if (!emailSent) {
          await supabase
            .from('verification_codes')
            .delete()
            .eq('id', verificationRecord.id);
          setError('Ошибка отправки email. Попробуйте снова');
          return;
        }

        setPendingVerificationId(verificationRecord.id);
        setShowVerificationInput(true);
        setSuccess('Код подтверждения отправлен на вашу почту!');
      }
    } catch (error: any) {
      setError(error.message || 'Произошла ошибка. Попробуйте снова.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setVerificationCode('');
    setShowVerificationInput(false);
    setPendingVerificationId(null);
    setError('');
    setSuccess('');
  };

  const switchMode = () => {
    setIsLoginMode(!isLoginMode);
    resetForm();
  };

  if (showVerificationInput) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-gray-900 rounded-2xl p-8 max-w-md w-full border border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              Подтверждение email
            </h2>
            <button
              onClick={() => {
                resetForm();
                onClose();
              }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-[#144374]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-[#144374]" />
            </div>
            <p className="text-gray-300 mb-2">
              Мы отправили 6-значный код на
            </p>
            <p className="text-white font-semibold mb-4">
              t8.fd88@gmail.com
            </p>
            <p className="text-sm text-gray-400">
              Код действителен 10 минут
            </p>
          </div>

          {success && (
            <div className="bg-green-500/20 border border-green-500 rounded-lg p-3 mb-4">
              <p className="text-green-400 text-sm text-center">{success}</p>
            </div>
          )}

          {error && (
            <div className="bg-red-500/20 border border-red-500 rounded-lg p-3 mb-4">
              <p className="text-red-400 text-sm text-center">{error}</p>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2 text-center">
              Введите код подтверждения
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                maxLength={6}
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white text-center text-2xl tracking-widest placeholder-gray-400 focus:outline-none focus:border-[#144374] focus:ring-2 focus:ring-[#144374]/20"
                placeholder="000000"
              />
            </div>
          </div>

          <button
            onClick={handleVerifyCode}
            disabled={isLoading || verificationCode.length !== 6}
            className="w-full bg-[#144374] hover:bg-[#1a5490] text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4"
          >
            {isLoading ? 'Проверка...' : 'Подтвердить'}
          </button>

          <button
            onClick={resetForm}
            className="w-full text-gray-400 hover:text-white py-2 text-sm transition-colors"
          >
            Вернуться к регистрации
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl p-8 max-w-md w-full border border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            {isLoginMode ? 'Вход в систему' : 'Регистрация'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLoginMode && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Имя
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#144374] focus:ring-2 focus:ring-[#144374]/20"
                  placeholder="Введите ваше имя"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#144374] focus:ring-2 focus:ring-[#144374]/20"
                placeholder="Введите ваш email"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Пароль
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full pl-10 pr-12 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#144374] focus:ring-2 focus:ring-[#144374]/20"
                placeholder="Введите пароль"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {!isLoginMode && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Подтвердите пароль
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#144374] focus:ring-2 focus:ring-[#144374]/20"
                  placeholder="Повторите пароль"
                />
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-500/20 border border-red-500 rounded-lg p-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-green-500/20 border border-green-500 rounded-lg p-3">
              <p className="text-green-400 text-sm">{success}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#144374] hover:bg-[#1a5490] text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Загрузка...' : (isLoginMode ? 'Войти' : 'Зарегистрироваться')}
          </button>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              {isLoginMode ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
              <button
                type="button"
                onClick={switchMode}
                className="ml-2 text-[#144374] hover:text-[#1a5490] font-semibold"
              >
                {isLoginMode ? 'Зарегистрироваться' : 'Войти'}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
