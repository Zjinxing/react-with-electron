const path = require('path')

module.exports = function override(config) {
  config.target = 'electron-renderer';
  const resolve = {
    alias: {
      src: path.resolve(__dirname, 'src')
    },
    modules: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules')]
  }
  config.resolve = {
    ...config.resolve,
    ...resolve
  }
  return config;
}
