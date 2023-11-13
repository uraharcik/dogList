/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    ...nextConfig,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.dog.ceo',
                port: '',
                pathname: '/breeds/**',
            },
        ],
    },
}
