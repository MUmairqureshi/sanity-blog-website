/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
   
  },
   images: {
      domains: ["cdn.sanity.io", "images.pexels.com"],
    },
  
}

module.exports = nextConfig
