/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["res.cloudinary.com"],
    formats: ['image/avif', 'image/webp'],
  },
  // Experimental features
  experimental: {
    // The serverComponents option has been renamed/removed in Next.js 15
    // optimizeCss and optimizeFonts are no longer in experimental
  },
  // Compiler options
  compiler: {
    // Remove console in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Add gzip compression for better loading performance
  compress: true,
  // Improve page loading with prefetching
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer(nextConfig)
