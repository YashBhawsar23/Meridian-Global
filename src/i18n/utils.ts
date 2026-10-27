import { translations, defaultLang, languages, type SupportedLanguage } from './translations';

export const supportedLocales: SupportedLanguage[] = Object.keys(languages) as SupportedLanguage[];

export function getLangFromUrl(url: URL): SupportedLanguage {
  const [, lang] = url.pathname.split('/');
  if (lang && lang in languages) {
    return lang as SupportedLanguage;
  }
  return defaultLang;
}

export function useTranslations(lang: SupportedLanguage) {
  return translations[lang] || translations[defaultLang];
}

export function stripLangFromPath(pathname: string): string {
  const segments = pathname.replace(/^\/+|\/+$/g, '').split('/');
  if (segments[0] && segments[0] in languages) {
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
  
  const urls: Record<SupportedLanguage, string> = {
    en: clean === '/' ? `${base}/` : `${base}${clean}`,
    es: clean === '/' ? `${base}/es` : `${base}/es${clean}`,
    hi: clean === '/' ? `${base}/hi` : `${base}/hi${clean}`,
    mr: clean === '/' ? `${base}/mr` : `${base}/mr${clean}`,
  };

  return {
    canonical: (lang: SupportedLanguage) => urls[lang] || urls[defaultLang],
    en: urls.en,
    es: urls.es,
    hi: urls.hi,
    mr: urls.mr,
    xDefault: urls.en,
  };
}
