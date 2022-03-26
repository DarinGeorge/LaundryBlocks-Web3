/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  nextConfig,
  images: {
    domains: ['randomuser.me', 'laundryblocks-storage-1bba9373162019-staging.s3.us-east-1.amazonaws.com'],
  },
};
