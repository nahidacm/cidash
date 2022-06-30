/** @type {import('next').NextConfig} */

const withLess = require("next-with-less");

const nextConfig = {
  reactStrictMode: true,
  ...withLess({
    lessLoaderOptions: {
      /* ... */
      lessOptions: {
        /* ... */
        modifyVars: {
        },
      },
    },
  })
}

module.exports = nextConfig
