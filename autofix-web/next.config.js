/** @type {import('next').NextConfig} */

const webpack = (config) => {
  const fileLoaderRule = config.module.rules.find(
    (rule) => rule.test && rule.test.test(".svg")
  );
  fileLoaderRule.exclude = /\.svg$/;
  config.module.rules.push({
    use: [
      {
        loader: "url-loader",
        options: {
          esModule: false,
        },
      },
    ],
    test: /\.svg$/,
  });

  return config;
};

const withTM = require("next-transpile-modules")([
  "@albathanext/design-system",
]);
const nextConfig = {
  i18n: {
    locales: ["ar", "en"],
    defaultLocale: "en",
  },
  images: {
    domains: ["autofix-apim.azure-api.net"],
  },
  webpack,
  pageExtensions: ["tsx"],
  output: "standalone",
  compiler: {
    styledComponents: true,
  },
};

module.exports = withTM(nextConfig);
