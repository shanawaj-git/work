import React, { useMemo } from "react";
import { getTranslation, TranslationsType } from "../translations";
import { IntlProvider } from "react-intl";
import { flatData, I18NLocale } from ".";

export const withWrapper = (component: JSX.Element, pageProps = { en: {} }) => (
  <IntlProviderWrapper locale="en" pageProps={pageProps}>
    {component}
  </IntlProviderWrapper>
);

export const IntlProviderWrapper = ({
  children,
  pageProps,
  locale,
}: {
  children: JSX.Element;
  pageProps: TranslationsType;
  locale: I18NLocale;
}) => {
  const messages = useMemo(() => {
    return {
      ...getTranslation(locale),
      ...flatData(pageProps[locale] || {}),
    };
  }, [locale, pageProps]);

  return (
    <IntlProvider locale={`${locale}`} messages={messages}>
      {children}
    </IntlProvider>
  );
};
