import type { LangCode } from "./types";
import { localStorageManager } from "@/utils/storageManager";
import { STORAGE_KEYS } from "@/constants";
import { DEFAULT_LANGUAGE } from "./constants";

export const getLocalStorageLanguage = () => localStorageManager.getItem<LangCode, true>(STORAGE_KEYS.i18n, true);

export const removeLocalStorageLanguage = () => localStorageManager.removeItem(STORAGE_KEYS.i18n);

export const setLocalStorageLanguage = (value: LangCode) => localStorageManager.setItem(STORAGE_KEYS.i18n, value);

export const checkLanguageIsSupported = (language?: LangCode, supportedLanguages?: LangCode[]) => {
  if (!language) return false;
  if (!supportedLanguages) return true;
  return supportedLanguages.some((supportedLang) => language.toLowerCase().includes(supportedLang.toLowerCase()));
};

export const getLanguagesFromEnv = (): LangCode[] => {
  const langListString = import.meta.env.VITE_SUPPORTED_LANGUAGES?.trim();
  return langListString ? (langListString.split(",") as LangCode[]) : [DEFAULT_LANGUAGE];
};

export const getSupportedLanguages = getLanguagesFromEnv;
