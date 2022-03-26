import i18n from 'i18next';
import second, { initReactI18next } from 'react-i18next';
import enFile from './en.json';
import roFile from './ro.json';

const resources = {
  en: { translation: enFile },
  ro: { translation: roFile },
};

i18n.use(initReactI18next).init({ resources, lng: 'en', interpolation: { escapeValue: false }, initImmediate: false });

export default i18n;
