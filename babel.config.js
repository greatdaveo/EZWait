module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          envName: 'APP_ENV',
          moduleName: '@env',
          path: '.env'
        }
      ],
      // Compile Exported Namespaces
      '@babel/plugin-proposal-export-namespace-from',
      // React Native Reanimated
      'react-native-reanimated/plugin',
      // Use Absolute Imports
      ['module-resolver', { alias: { src: './src' } }]
    ]
  }
}
