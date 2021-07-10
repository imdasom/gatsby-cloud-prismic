module.exports = {
  siteMetadata: {
    siteUrl: 'https://team.wired.company',
    title: 'team-wired',
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-gatsby-cloud',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-prismic',
      options: {
        repositoryName: 'team-wired',
        schemas: {
          Home: require('./src/custom-types/home.json'),
          Culture: require('./src/custom-types/culture.json'),
          JobDetail: require('./src/custom-types/job-detail.json'),
        },
      },
    },
  ],
};
