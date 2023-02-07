const plugins = [
  'styled-components',
  ['@babel/plugin-proposal-class-properties', { loose: true }],
  '@babel/plugin-syntax-dynamic-import',
  '@babel/plugin-transform-modules-commonjs',
  '@babel/plugin-proposal-optional-chaining',
  process.argv.includes('--addBabelResoverPlugin')
    ? [
        require.resolve('babel-plugin-module-resolver'),
        {
          root: ['./app/'],
          alias: {
            // define aliases to shorten the import paths
            '': './app',
          },
          extensions: ['.js', '.jsx', '.tsx'],
        },
      ]
    : {},
];

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        loose: true,
      },
    ],
    '@babel/preset-react',
  ],
  plugins,
  env: {
    production: {
      only: ['app'],
      plugins: [
        'lodash',
        'transform-react-remove-prop-types',
        '@babel/plugin-transform-react-inline-elements',
        '@babel/plugin-transform-react-constant-elements',
      ],
    },
    test: {
      plugins: [
        '@babel/plugin-transform-modules-commonjs',
        'dynamic-import-node',
      ],
    },
  },
};
