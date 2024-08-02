import type { I18nOptions } from "./types";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { DEFAULT_LANGUAGE } from "./constants";
import { getEndpoint } from "./endpoints";
import CustomBackend from "./CustomBackend";

export const initI18n = async (defaultLang: string): Promise<void> => {
  if (i18n.isInitialized) {
    return;
  }

  const initOptions: I18nOptions = {
    debug: import.meta.env.MODE === "development",
    ns: ["common"],
    defaultNS: "common",
    lng: defaultLang,
    fallbackLng: DEFAULT_LANGUAGE,
    load: "currentOnly",
    returnObjects: true,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
    appendNamespaceToMissingKey: true,
    backend: {
      loadPath: ([language]: [string], [namespace]: [string]) => getEndpoint(language, namespace),
    },
  };

  await i18n.use(initReactI18next).use(CustomBackend).use(LanguageDetector).init(initOptions);
};
