import type { LocalizationDefaultNamespace, LocalizationResources } from "./types";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: LocalizationDefaultNamespace;
    resources: LocalizationResources;
    returnObjects: true;
  }
}
