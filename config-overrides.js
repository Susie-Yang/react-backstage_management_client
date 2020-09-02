const {override, fixBabelImports, addLessLoader} = require('customize-cra');

module.exports = override(
  // 针对antd实现按需打包：根据import来打包（使用babel-plugin-import）
  fixBabelImports('import', { // babel-plugin-import的'import'
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true, // 自动打包相关的样式
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: {'@primary-color': '#1DA57A'},
    }
  })
);