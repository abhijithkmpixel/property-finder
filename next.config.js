/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    // API_DOMAIN_URL: "http://localhost:3000",
    API_DOMAIN_URL: "https://pixel-property-finder.herokuapp.com",
    //API_URL: 'http://localhost:4000/api/v1/buyer',
  },
}

module.exports = nextConfig
