import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { getLocales } from 'expo-localization'
import { Asset } from 'expo-asset'
import * as FileSystem from 'expo-file-system'

const resources = {
  en: {
    translation: require('../locales/en.json')
  },
  vi: {
    translation: require('../locales/vi.json')
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getLocales()[0].languageCode || 'vi',
    fallbackLng: 'vi',
    debug: false,
    keySeparator: false,
    react: {
      useSuspense: false
    },
    interpolation: {
      escapeValue: false,
      formatSeparator: ','
    }
  })

export default i18n

export const LANGUAGE_OPTIONS = [
  {
    language: 'Tiếng Việt', 
    value: 'vi',
  },
  {
    language: 'Tiếng Anh',
    value: 'en'
  }
]