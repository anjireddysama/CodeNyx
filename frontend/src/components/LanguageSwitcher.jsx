import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="relative inline-flex items-center gap-2">
      <Globe className="h-4 w-4 text-slate-400" />
      <select
        value={i18n.language || 'en'}
        onChange={changeLanguage}
        className="appearance-none bg-transparent text-sm font-medium text-slate-700 hover:text-brand-600 focus:outline-none cursor-pointer pr-4"
        style={{ backgroundImage: 'none' }}
      >
        <option value="en">English (EN)</option>
        <option value="hi">हिंदी (HI)</option>
        <option value="te">తెలుగు (TE)</option>
      </select>
      <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2">
        <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}
