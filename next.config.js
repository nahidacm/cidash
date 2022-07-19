/** @type {import('next').NextConfig} */

import withLess from "next-with-less";

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

export default nextConfig;
