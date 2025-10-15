import { useState } from 'react';
import { X, Lock, AlertCircle } from 'lucide-react';
import { ReadingType } from '../types/reading';
import { validateLink, markLinkAsUsed } from '../services/linkService';
import { Language, getTranslation } from '../i18n/translations';

interface ReferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  selectedReadingType: ReadingType;
  language: Language;
}

export function ReferenceModal({
  isOpen,
  onClose,
  onSuccess,
  selectedReadingType,
  language
}: ReferenceModalProps) {
  const [referenceNumber, setReferenceNumber] = useState('');
  const [error, setError] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  const t = (key: Parameters<typeof getTranslation>[1]) => getTranslation(language, key);

  const errorMessages: Record<string, Record<Language, string>> = {
    invalidReference: {
      en: 'Invalid reference number or already used.',
      tr: 'Geçersiz referans numarası veya zaten kullanılmış.',
      de: 'Ungültige Referenznummer oder bereits verwendet.',
      it: 'Numero di riferimento non valido o già utilizzato.',
      fr: 'Numéro de référence invalide ou déjà utilisé.',
      ru: 'Неверный номер ссылки или уже использован.',
      zh: '无效的参考号或已使用。',
      es: 'Número de referencia inválido o ya usado.',
      pt: 'Número de referência inválido ou já usado.',
      nl: 'Ongeldig referentienummer of al gebruikt.',
      ja: '無効な参照番号または既に使用されています。',
      fa: 'شماره مرجع نامعتبر یا قبلاً استفاده شده است.',
      ar: 'رقم المرجع غير صالح أو مستخدم بالفعل.',
      el: 'Μη έγκυρος αριθμός αναφοράς ή ήδη χρησιμοποιημένος.'
    },
    typeMismatch: {
      en: 'This reference number is not valid for the selected reading type.',
      tr: 'Bu referans numarası seçtiğiniz fal türü için geçerli değildir.',
      de: 'Diese Referenznummer ist für den ausgewählten Lesetyp nicht gültig.',
      it: 'Questo numero di riferimento non è valido per il tipo di lettura selezionato.',
      fr: 'Ce numéro de référence n\'est pas valide pour le type de lecture sélectionné.',
      ru: 'Этот номер ссылки не действителен для выбранного типа чтения.',
      zh: '此参考号对所选阅读类型无效。',
      es: 'Este número de referencia no es válido para el tipo de lectura seleccionado.',
      pt: 'Este número de referência não é válido para o tipo de leitura selecionado.',
      nl: 'Dit referentienummer is niet geldig voor het geselecteerde lezingstype.',
      ja: 'この参照番号は、選択した読み取りタイプには無効です。',
      fa: 'این شماره مرجع برای نوع خواندن انتخاب شده معتبر نیست.',
      ar: 'رقم المرجع هذا غير صالح لنوع القراءة المحدد.',
      el: 'Αυτός ο αριθμός αναφοράς δεν είναι έγκυρος για τον επιλεγμένο τύπο ανάγνωσης.'
    },
    enterReference: {
      en: 'Please enter your reference number.',
      tr: 'Lütfen referans numaranızı girin.',
      de: 'Bitte geben Sie Ihre Referenznummer ein.',
      it: 'Inserisci il tuo numero di riferimento.',
      fr: 'Veuillez entrer votre numéro de référence.',
      ru: 'Пожалуйста, введите ваш номер ссылки.',
      zh: '请输入您的参考号。',
      es: 'Por favor ingrese su número de referencia.',
      pt: 'Por favor, insira seu número de referência.',
      nl: 'Voer uw referentienummer in.',
      ja: '参照番号を入力してください。',
      fa: 'لطفاً شماره مرجع خود را وارد کنید.',
      ar: 'الرجاء إدخال رقم المرجع الخاص بك.',
      el: 'Παρακαλώ εισάγετε τον αριθμό αναφοράς σας.'
    }
  };

  const modalLabels: Record<string, Record<Language, string>> = {
    title: {
      en: 'Enter Reference Number',
      tr: 'Referans Numarası Girin',
      de: 'Referenznummer eingeben',
      it: 'Inserisci il numero di riferimento',
      fr: 'Entrez le numéro de référence',
      ru: 'Введите номер ссылки',
      zh: '输入参考号',
      es: 'Ingrese el número de referencia',
      pt: 'Digite o número de referência',
      nl: 'Voer referentienummer in',
      ja: '参照番号を入力',
      fa: 'شماره مرجع را وارد کنید',
      ar: 'أدخل رقم المرجع',
      el: 'Εισάγετε τον αριθμό αναφοράς'
    },
    description: {
      en: 'Please enter the unique reference number provided to you.',
      tr: 'Lütfen size verilen benzersiz referans numarasını girin.',
      de: 'Bitte geben Sie die Ihnen zur Verfügung gestellte eindeutige Referenznummer ein.',
      it: 'Inserisci il numero di riferimento univoco fornito.',
      fr: 'Veuillez entrer le numéro de référence unique qui vous a été fourni.',
      ru: 'Пожалуйста, введите уникальный номер ссылки, который вам был предоставлен.',
      zh: '请输入提供给您的唯一参考号。',
      es: 'Por favor ingrese el número de referencia único proporcionado.',
      pt: 'Por favor, insira o número de referência único fornecido.',
      nl: 'Voer het unieke referentienummer in dat u is verstrekt.',
      ja: '提供された一意の参照番号を入力してください。',
      fa: 'لطفاً شماره مرجع منحصر به فرد ارائه شده را وارد کنید.',
      ar: 'الرجاء إدخال رقم المرجع الفريد المقدم لك.',
      el: 'Παρακαλώ εισάγετε τον μοναδικό αριθμό αναφοράς που σας δόθηκε.'
    },
    placeholder: {
      en: 'Enter your reference number...',
      tr: 'Referans numaranızı girin...',
      de: 'Geben Sie Ihre Referenznummer ein...',
      it: 'Inserisci il tuo numero di riferimento...',
      fr: 'Entrez votre numéro de référence...',
      ru: 'Введите ваш номер ссылки...',
      zh: '输入您的参考号...',
      es: 'Ingrese su número de referencia...',
      pt: 'Digite seu número de referência...',
      nl: 'Voer uw referentienummer in...',
      ja: '参照番号を入力...',
      fa: 'شماره مرجع خود را وارد کنید...',
      ar: 'أدخل رقم المرجع الخاص بك...',
      el: 'Εισάγετε τον αριθμό αναφοράς σας...'
    },
    continue: {
      en: 'Continue',
      tr: 'Devam Et',
      de: 'Weiter',
      it: 'Continua',
      fr: 'Continuer',
      ru: 'Продолжить',
      zh: '继续',
      es: 'Continuar',
      pt: 'Continuar',
      nl: 'Doorgaan',
      ja: '続ける',
      fa: 'ادامه',
      ar: 'متابعة',
      el: 'Συνέχεια'
    },
    validating: {
      en: 'Validating...',
      tr: 'Doğrulanıyor...',
      de: 'Überprüfung...',
      it: 'Validazione...',
      fr: 'Validation...',
      ru: 'Проверка...',
      zh: '验证中...',
      es: 'Validando...',
      pt: 'Validando...',
      nl: 'Valideren...',
      ja: '検証中...',
      fa: 'اعتبارسنجی...',
      ar: 'التحقق...',
      el: 'Επικύρωση...'
    },
    close: {
      en: 'Close',
      tr: 'Kapat',
      de: 'Schließen',
      it: 'Chiudi',
      fr: 'Fermer',
      ru: 'Закрыть',
      zh: '关闭',
      es: 'Cerrar',
      pt: 'Fechar',
      nl: 'Sluiten',
      ja: '閉じる',
      fa: 'بستن',
      ar: 'إغلاق',
      el: 'Κλείσιμο'
    }
  };

  const handleValidate = async () => {
    if (!referenceNumber.trim()) {
      setError(errorMessages.enterReference[language]);
      return;
    }

    setIsValidating(true);
    setError('');

    try {
      const result = await validateLink(referenceNumber.trim());

      if (!result.valid || !result.readingType || !result.linkId) {
        setError(errorMessages.invalidReference[language]);
        setIsValidating(false);
        return;
      }

      if (!result.isMaster && result.readingType !== selectedReadingType) {
        setError(errorMessages.typeMismatch[language]);
        setIsValidating(false);
        return;
      }

      setIsValidating(false);
      setReferenceNumber('');
      setError('');
      onSuccess();
    } catch (err) {
      setError(errorMessages.invalidReference[language]);
      setIsValidating(false);
    }
  };

  const handleClose = () => {
    setReferenceNumber('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 border-2 border-amber-500/50 rounded-xl p-8 max-w-md w-full shadow-2xl animate-scale-in">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Lock className="text-amber-400 w-6 h-6" />
            <h2 className="text-2xl font-decorative text-amber-400">
              {modalLabels.title[language]}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-amber-400 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <p className="text-slate-300 mb-6">
          {modalLabels.description[language]}
        </p>

        <div className="space-y-4">
          <input
            type="text"
            value={referenceNumber}
            onChange={(e) => setReferenceNumber(e.target.value)}
            placeholder={modalLabels.placeholder[language]}
            className="w-full bg-slate-900/50 border-2 border-amber-500/30 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:border-amber-500/60 focus:outline-none transition-colors"
            onKeyDown={(e) => e.key === 'Enter' && handleValidate()}
          />

          {error && (
            <div className="flex items-start gap-2 p-3 bg-red-900/30 border border-red-500/50 rounded-lg">
              <AlertCircle className="text-red-400 w-5 h-5 flex-shrink-0 mt-0.5" />
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleValidate}
              disabled={isValidating}
              className="flex-1 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-900 font-semibold py-3 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isValidating ? modalLabels.validating[language] : modalLabels.continue[language]}
            </button>
            <button
              onClick={handleClose}
              className="px-6 bg-slate-800/50 border border-amber-500/30 text-amber-400 hover:bg-slate-800/80 hover:border-amber-500/50 py-3 rounded-lg transition-all"
            >
              {modalLabels.close[language]}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
