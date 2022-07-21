/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://pixel-property-finder.herokuapp.com',
  generateRobotsTxt: true, // (optional)
  exclude:['/auth/*','/buy/*','/rent/*','/login']
  // ...other options
};

// export default config
