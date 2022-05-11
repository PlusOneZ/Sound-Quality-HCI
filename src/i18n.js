import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import main_en from "./i18n/en/main_en.json";
import main_zh from "./i18n/zh/main_zh.json";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    main: main_en,
  },
  zh: {
    main: main_zh,
  }
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      resources,
      lng: "zh", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
      // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
      // if you're using a language detector, do not define the lng option

      interpolation: {
        escapeValue: false // react already safes from xss
      }
    });

export default i18n;

if (i18n.language === 'en') {
  document.title = "Sound Quality"
} else {
  document.title = "声音质量"
}