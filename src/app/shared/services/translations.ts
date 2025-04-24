export type Idioma = 'es' | 'en' | 'ja';

export const translations = {
  home: {
    es: 'Inicio',
    en: 'Home',
    ja: 'ホーム'
  },
  create_podium: {
    es: 'Crear Podio',
    en: 'Create Podium',
    ja: '表彰台を作成'
  },
  about_project: {
    es: 'Sobre el Proyecto',
    en: 'About Project',
    ja: 'プロジェクトについて'
  },
  search: {
    es: 'Buscar',
    en: 'Search',
    ja: '検索'
  }
} as const;
