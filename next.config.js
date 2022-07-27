/** @type {import('next').NextConfig} */

import withLess from "next-with-less";

const nextConfig = {
  reactStrictMode: false,
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

export default nextConfig;
