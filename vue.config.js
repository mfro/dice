const path = require('path');

module.exports = {
  publicPath: '',

  outputDir: 'dist',

  pages: {
    index: {
      title: 'dice',
      entry: 'src/main.ts',
      template: 'src/main.html',
      filename: 'index.html',
    },
  },

  devServer: {
    disableHostCheck: true,
  },

  configureWebpack: {
    resolve: {
      symlinks: false,
    },
  },

  chainWebpack: config => {
    config.module.rule('vue')
      .use('vue-loader')
      .tap(args => {
        args.compilerOptions = args.compilerOptions || {};
        args.compilerOptions.whitespace = 'condense';
        return args;
      });
  },
};
