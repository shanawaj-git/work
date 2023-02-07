const path = require('path');

module.exports = {
  stories: [
    '../app/**/*.stories.mdx',
    '../app/**/*.stories.@(js|jsx|ts|tsx)',
    '../stories/**/*.stories.mdx',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal(config) {
    delete config.resolve.alias['emotion-theming'];
    delete config.resolve.alias['@emotion/styled'];
    delete config.resolve.alias['@emotion/core'];

    return {
      ...config,
      resolve: {
        modules: ['node_modules', 'app'],
        extensions: ['.js', '.jsx', '.react.js'],
      },
    };
  },
  framework: '@storybook/react',
};
