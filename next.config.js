const pkg = require('./package.json');

const nextConfig = {
  env: {
    VERSION: pkg.version,
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  reactStrictMode: true,
};

module.exports = nextConfig;
