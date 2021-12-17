import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import LocalStorage from 'utils/LocalStorage';
import enUS from './en';
import esES from './es';

i18next.use(LanguageDetector).init({
  detection: {
    lookupQuerystring: 'lang',
  },
  lng: LocalStorage.getString('language') || 'es',
  debug: false,
  defaultNS: 'cnig',
  keySeparator: '.',
  returnObjects: true,
  interpolation: {
    escapeValue: false,
    formatSeparator: ','
  },
  react: {
    wait: true,
  },
  resources: {
    en: {
      cnig: enUS,
    },
    es: {
      cnig: esES,
    },
  },
});

export default i18next;
