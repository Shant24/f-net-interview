import type { InitOptions } from "i18next";
import type { LANGUAGES } from "./constants";

import type common from "@/../public/locales/en/common.json";
import type form from "@/../public/locales/en/form.json";
import type auth from "@/../public/locales/en/auth.json";

export interface LocalizationResources {
  common: typeof common;
  form: typeof form;
  auth: typeof auth;
}

export type Locale = typeof LANGUAGES;

export type LangCode = Locale[number];

export type LocalizationDefaultNamespace = "common";

type LocalizationNamespaces = keyof LocalizationResources;

export interface I18nOptions<DefaultNS extends LocalizationNamespaces = LocalizationDefaultNamespace>
  extends InitOptions {
  ns: LocalizationNamespaces[];
  defaultNS: DefaultNS;
}
