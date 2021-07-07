module.exports = {
    siteMetadata: {
        siteUrl: `https://www.yourdomain.tld`,
    },
    plugins: [
        {
            resolve: 'gatsby-source-prismic',
	    options: {
		repositoryName: 'my-gatsby-site',
		schemas: {
		    'main-page': require('./custom-type/main-page-type.json')
		}
	    }
	}
    ]
}
