module.exports = {
  collectCoverageFrom: [
    'app/**/*.{js,jsx}',
    '!app/**/*.test.{js,jsx}',
    '!app/*/RbGenerated*/*.{js,jsx}',
    '!app/app.js',
    '!app/global-styles.js',
    '!app/*/*/Loadable.{js,jsx}',
    '!app/**/*.stories.@(js|jsx|ts|tsx)',
    '!app/**/styles.@(js|jsx|ts|tsx)',
    '!app/**/theme.@(js|jsx|ts|tsx)',
    '!dist/**/*',
  ],
  coverageThreshold: {
    global: {
      statements: 95,
      branches: 85,
      functions: 92,
      lines: 96,
    },
  },
  moduleDirectories: ['node_modules', 'app'],
  modulePathIgnorePatterns: ['<rootDir>/dist', '<rootDir>/node_modules'],
  moduleNameMapper: {
    '.*\\.(css|less|styl|scss|sass)$': '<rootDir>/internals/mocks/cssModule.js',
    '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/internals/mocks/image.js',
  },
  setupFilesAfterEnv: [
    '<rootDir>/internals/testing/test-bundler.js',
    'react-testing-library/cleanup-after-each',
  ],
  setupFiles: ['raf/polyfill', './app/utils/jestDotenvForTest'],
  testRegex: 'tests/.*\\.test\\.js$',
  snapshotSerializers: [],
  testTimeout: 30000,
};
