import { translations, defaultLang, type SupportedLanguage } from './translations';

export function getLangFromUrl(url: URL): SupportedLanguage {
  const [, lang] = url.pathname.split('/');
  if (lang === 'es') return 'es';
  return defaultLang;
}

export function useTranslations(lang: SupportedLanguage) {
  return translations[lang] || translations[defaultLang];
}

export function stripLangFromPath(pathname: string): string {
  const segments = pathname.replace(/^\/+|\/+$/g, '').split('/');
  if (segments[0] === 'es' || segments[0] === 'en') {
    segments.shift();
  }
  return '/' + segments.filter(Boolean).join('/');
}

export function getLocalizedPath(path: string, targetLang: SupportedLanguage): string {
  const cleanPath = stripLangFromPath(path);
  if (targetLang === defaultLang) {
    return cleanPath === '/' ? '/' : cleanPath;
  }
  return cleanPath === '/' ? `/${targetLang}` : `/${targetLang}${cleanPath}`;
}

export function getHreflangUrls(siteUrl: string, pathname: string) {
  const clean = stripLangFromPath(pathname);
  const base = siteUrl.replace(/\/+$/, '');
  
  const enPath = clean === '/' ? '/' : clean;
  const esPath = clean === '/' ? '/es' : `/es${clean}`;

  return {
    canonical: (lang: SupportedLanguage) => (lang === 'es' ? `${base}${esPath}` : `${base}${enPath}`),
    en: `${base}${enPath}`,
    es: `${base}${esPath}`,
    xDefault: `${base}${enPath}`,
  };
}
