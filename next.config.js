const path = require('path');
const Dotenv = require('dotenv-webpack');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
    }
  },
  webpack: config => {
    config.plugins = [
      ...config.plugins,
      new Dotenv({
          path: path.join(__dirname, `.env`),
          systemvars: true,
      })
    ]
    return config;
  }
}

module.exports = nextConfig
