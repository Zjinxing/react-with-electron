const path = require('path')
const tsImportPluginFactory = require('ts-import-plugin')
const {
  override,
  setWebpackTarget,
  addWebpackResolve,
  addWebpackModuleRule
} = require('customize-cra')

module.exports = override(
  setWebpackTarget('electron-renderer'),
  addWebpackResolve({
    alias: {
      src: path.resolve(__dirname, 'src')
    },
    modules: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules')]
  }),
  addWebpackModuleRule({
    test: /\.(jsx|tsx|js|ts)$/,
    loader: 'ts-loader',
    options: {
      transpileOnly: true,
      getCustomTransformers: () => ({
        before: [
          tsImportPluginFactory({
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: 'css'
          })
        ]
      }),
      compilerOptions: {
        module: 'es2015'
      }
    },
    exclude: /node_modules/
  })
)
