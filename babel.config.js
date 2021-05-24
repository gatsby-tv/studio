const extras = {
  development: ['@babel/plugin-transform-runtime'],
  production: [
    '@babel/plugin-transform-react-constant-elements',
    '@babel/plugin-transform-react-inline-elements',
    'babel-plugin-dev-expression',
    'babel-plugin-transform-react-remove-prop-types',
  ],
};

module.exports = (api) => {
  const development = api.env(['development', 'test']);

  return {
    presets: [
      '@babel/preset-env',
      '@babel/preset-typescript',
      ['@babel/preset-react', { development }],
    ],
    plugins: [
      '@babel/plugin-transform-object-assign',
      '@babel/plugin-syntax-dynamic-import',
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      ['@babel/plugin-proposal-private-methods', { loose: true }],
      ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
      [
        'module-resolver',
        {
          root: './app',
          alias: {
            '@app': './app',
          },
        },
      ],
      ...(development ? extras.development : extras.production),
    ],
  };
};
