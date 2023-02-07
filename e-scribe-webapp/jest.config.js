module.exports = {
  globals: {
    'ts-jest': {
      // Tell ts-jest about our typescript config.
      // You can specify a path to your tsconfig.json file,
      // but since we're compiling specifically for node here,
      // this works too.
      tsConfig: {
        target: 'es2019',
      },
    },
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    '!app/configureGraphQLClient.ts', // TODO: temporary, to be removed
    '!app/graphQLCache.ts', // TODO: temporary, to be removed
    '!app/**/*.test.{js,jsx,ts,tsx}',
    '!app/*/RbGenerated*/*.{js,jsx,ts,tsx}',
    '!app/app.tsx',
    '!app/global-styles.js',
    '!app/*/*/Loadable.{js,jsx,ts,tsx}',
    '!app/**/*/loadable.{js,jsx,ts,tsx}',
    '!app/containers/LanguageProvider/selectors.js',
    // TODO: add test cases for theme utils
    '!app/themes/**',
  ],
  modulePathIgnorePatterns: ['app/tests/configureGraphQLClient.test.js'], // TODO: temporary, to be removed
  coverageThreshold: {
    global: {
      statements: 98,
      branches: 91,
      functions: 97,
      lines: 98,
    },
  },
  moduleDirectories: [
    'node_modules',
    'app',
    'node_modules/@albathanext/design-system/dist',
  ],
  moduleNameMapper: {
    '.*\\.(css|less|styl|scss|sass)$': '<rootDir>/internals/mocks/cssModule.js',
    '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/internals/mocks/image.js',
  },
  setupFilesAfterEnv: [
    '<rootDir>/internals/testing/test-bundler.js',
    'react-testing-library/cleanup-after-each',
  ],
  setupFiles: ['raf/polyfill'],
  testRegex: 'tests/.*\\.test\\.js$',
  snapshotSerializers: [],
};
