/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Memaksa webpack untuk menggunakan 'polling' setiap 500ms.
    // Ini adalah solusi andal untuk masalah file watcher di Windows.
    config.watchOptions = {
      poll: 500,
      aggregateTimeout: 300,
    };
    return config;
  },
};

export default nextConfig;