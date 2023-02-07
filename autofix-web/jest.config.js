const nextJest = require("next/jest");
const esModules = ["@albathanext/design-system", "uuid", "uuidv4"].join("|");
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

const moduleNameMapper = () => {
  const structure = {
    "@/components/*": ["src/components/*"],
    "@/pages/*": ["src/pages/*"],
    "@/containers/*": ["src/containers/*"],
    "@/styles/*": ["src/styles/*"],
    "@/features/*": ["src/features/*"],
    "@/hoc/*": ["src/hoc/*"],
    "@/services/*": ["src/services/*"],
    "@/translations/*": ["src/translations/*"],
    "@/utils/*": ["src/utils/*"],
    "@/apollo/*": ["src/apollo/*"],
    "@/assets/*": ["src/assets/*"],
    "@/app/*": ["src/*"],
  };

  return Object.entries(structure).reduce(
    (acc, [key, [value]]) => {
      const newKey = `^${key.replace("*", "(.*)$")}`;
      const newValue = `<rootDir>/${value.replace("*", "$1")}`;
      acc[newKey] = newValue;
      return acc;
    },
    { "^uuid$": require.resolve("uuid") }
  );
};

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jsdom",
  testEnvironment: "jest-environment-jsdom",
  globals: {
    "ts-jest": {
      // Tell ts-jest about our typescript config.
      // You can specify a path to your tsconfig.json file,
      // but since we're compiling specifically for node here,
      // this works too.
      tsConfig: {
        target: "es2019",
      },
    },
  },
  transform: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/fileTransformer.js",
    "^.+\\.ts?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    ".*\\.(css|less|styl|scss|sass)$": "<rootDir>/internals/mocks/cssModule.js",
    ".*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/internals/mocks/image.js",
  },
  transformIgnorePatterns: [`<rootDir>/node_modules/(?!${esModules})`],
  moduleDirectories: [
    "node_modules",
    "app",
    "node_modules/@albathanext/design-system/dist",
  ],
  moduleNameMapper: moduleNameMapper(),
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 79,
      functions: 80,
      lines: 80,
      statements: -24,
    },
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
