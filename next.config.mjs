// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        // pathname: '/**',
          pathname: '/dit3dubrf/image/upload/**',
      },
    ],
      domains: ['res.cloudinary.com'],
  },
};

export default nextConfig;