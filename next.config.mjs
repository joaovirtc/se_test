import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';  //Ignora verificação de SSL Temporariamente

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.softexpert.com',
            },
            {
                protocol: 'https',
                hostname: 'cdn2.softexpert.com',
            },
            {
                protocol: 'http',
                hostname: '18.207.202.228',
            },
            {
                protocol: 'https',
                hostname: 'demo-softexpert.s3.amazonaws.com',
            },
            {
                protocol: 'https',
                hostname: 's3.us-east-1.amazonaws.com'
            },
            {
                protocol: 'https',
                hostname: 'assets.softexpert.com'
            },
        ],
    },
};

export default withNextIntl(nextConfig);
