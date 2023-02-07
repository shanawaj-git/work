import "../styles/globals.css";
import { GlobalTheme } from "@albathanext/design-system";
import { store } from "@/features/index";
import { Provider } from "react-redux";
import React, { useState } from "react";
import { useRouter, NextRouter } from "next/router";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../apollo";
import { IntlProviderWrapper } from "@/utils/IntlProviderWrapper";
import { autoFixTheme } from "src/theme";
import { I18NLocale } from "@/utils/index";
import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";

/**
 * * Handling Translations:
 * Every page Static content should be passed to props from getStaticProps,
 * fetch that page data, and pass it through props.
 *
 * @param
 * Component : React Component
 * pageProps : Page Props passed either by getStaticProps or getServerProps
 *
 * @returns React Component
 */
GlobalTheme.setTheme({ theme: autoFixTheme, name: "AUTOFIX" });
export default function MyApp({ Component, pageProps }: AppProps) {
  const [theme] = useState<any>(GlobalTheme.getActiveTheme().theme);
  const { locale = "en" }: NextRouter = useRouter();
  return (
    <ThemeProvider theme={theme}>
      <IntlProviderWrapper locale={locale as I18NLocale} pageProps={pageProps}>
        <Provider store={store}>
          <ApolloProvider client={apolloClient}>
            {theme && <Component {...pageProps} />}
          </ApolloProvider>
        </Provider>
      </IntlProviderWrapper>
    </ThemeProvider>
  );
}
