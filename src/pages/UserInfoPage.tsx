import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Language, getTranslation } from '../i18n/translations';

interface UserInfoPageProps {
  onSubmit: (userInfo: UserInfo) => void;
  language: Language;
}

export interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
}

export function UserInfoPage({ onSubmit, language }: UserInfoPageProps) {
  const [formData, setFormData] = useState<UserInfo>({
    firstName: '',
    lastName: '',
    email: '',
    birthDate: ''
  });
  const [errors, setErrors] = useState<Partial<UserInfo>>({});

  const t = (key: Parameters<typeof getTranslation>[1]) => getTranslation(language, key);

  const validateForm = (): boolean => {
    const newErrors: Partial<UserInfo> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = t('firstNameRequired');
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = t('lastNameRequired');
    }

    if (!formData.email.trim()) {
      newErrors.email = t('emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('emailInvalid');
    }

    if (!formData.birthDate) {
      newErrors.birthDate = t('birthDateRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: keyof UserInfo, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen starfield flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-decorative text-purple-300 mb-2">
            {t('appName')}
          </h1>
          <p className="text-slate-300">
            {t('consultationUserInfo')}
          </p>
        </div>

        <div className="glass-card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-purple-300 mb-2">
                {t('firstName')}
              </label>
              <input
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                className="w-full px-4 py-2 bg-slate-800/50 border border-purple-500/30 rounded-lg
                         text-white placeholder-slate-400 focus:outline-none focus:border-purple-400
                         focus:ring-2 focus:ring-purple-400/20 transition-all"
                placeholder={t('firstNamePlaceholder')}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-400">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-purple-300 mb-2">
                {t('lastName')}
              </label>
              <input
                type="text"
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                className="w-full px-4 py-2 bg-slate-800/50 border border-purple-500/30 rounded-lg
                         text-white placeholder-slate-400 focus:outline-none focus:border-purple-400
                         focus:ring-2 focus:ring-purple-400/20 transition-all"
                placeholder={t('lastNamePlaceholder')}
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-400">{errors.lastName}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-purple-300 mb-2">
                {t('email')}
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-4 py-2 bg-slate-800/50 border border-purple-500/30 rounded-lg
                         text-white placeholder-slate-400 focus:outline-none focus:border-purple-400
                         focus:ring-2 focus:ring-purple-400/20 transition-all"
                placeholder={t('emailPlaceholder')}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="birthDate" className="block text-sm font-medium text-purple-300 mb-2">
                {t('birthDate')}
              </label>
              <input
                type="date"
                id="birthDate"
                value={formData.birthDate}
                onChange={(e) => handleChange('birthDate', e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2 bg-slate-800/50 border border-purple-500/30 rounded-lg
                         text-white placeholder-slate-400 focus:outline-none focus:border-purple-400
                         focus:ring-2 focus:ring-purple-400/20 transition-all"
              />
              {errors.birthDate && (
                <p className="mt-1 text-sm text-red-400">{errors.birthDate}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6
                       rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700
                       transition-all transform hover:scale-105 active:scale-95
                       flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              {t('continue')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
