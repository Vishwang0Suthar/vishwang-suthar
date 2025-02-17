/** @type {import('next').NextConfig} */
// const { withStoreConfig } = require("./store-config")
// const store = require("./store.config.json")

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
        // for webpack 5 use
        // { and: [/\.(js|ts)x?$/] }
      },

      use: ['@svgr/webpack'],
    });

    return config;
  },

  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};
