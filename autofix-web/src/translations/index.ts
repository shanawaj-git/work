import { I18NLocale } from "./../utils/index";
import ARABIC from "../translations/ar.json";
import ENGLISH from "../translations/en.json";
export interface TranslationsType {
  en?: typeof ENGLISH | {};
  ar?: typeof ARABIC | {};
}
export const translations: TranslationsType = {
  ar: ARABIC,
  en: ENGLISH,
};

export const getTranslation = (locale: string) =>
  translations[locale as I18NLocale];
