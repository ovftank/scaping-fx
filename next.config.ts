import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    reactStrictMode: true,
    reactCompiler: true,
    turbopack: {
        rules: {
            '*.svg': {
                loaders: ['@svgr/webpack'],
                as: '*.js'
            }
        }
    },
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: []
    },
    logging: {
        fetches: {
            fullUrl: true
        }
    }
};

export default nextConfig;
