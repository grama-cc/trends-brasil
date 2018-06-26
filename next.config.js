/* eslint-disable import/no-extraneous-dependencies */
const withSass = require('@zeit/next-sass');

const isProd = process.env.NODE_ENV === 'production';

module.exports = withSass({
	assetPrefix: isProd ? 'http://projetos.grama.cc/trends-brasil/' : '',
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[name]_[local]_[hash:base64:5]',
  },
  useFileSystemPublicRoutes: false,
});
