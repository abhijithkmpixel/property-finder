const sanityClient = require('@sanity/client')

const client = sanityClient({
  projectId: 'srwx75cy',
  dataset: 'production',
  apiVersion: '2021-10-21', // use a UTC date string
  token: 'sanity-auth-token', // or leave blank for unauthenticated usage
  useCdn: true, // `false` if you want to ensure fresh data
})

export default client