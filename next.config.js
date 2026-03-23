/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // На self-hosted (Amvera и т.д.) оптимизация через сервер часто даёт таймауты
    // для внешних CDN (Cloudinary) — картинки «серые». Браузер грузит URL напрямую.
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.cloudinary.com', pathname: '/**' },
      { protocol: 'https', hostname: 'placehold.co', pathname: '/**' },
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
    ],
  },
};

module.exports = nextConfig;
