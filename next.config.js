/* eslint-disable import/no-extraneous-dependencies */
const withSass = require('@zeit/next-sass');

module.exports = withSass({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[name]_[local]_[hash:base64:5]',
  },
  useFileSystemPublicRoutes: false,
});
