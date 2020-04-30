module.exports = {
  siteMetadata: {
    name: "Vassago's Blog",
    description: "Happy code Happy hacker",
    keywords: ["tech", "blog", "program", "life"],
    siteUrl: 'https://vongola.tk/',
    siteImage: 'images/open-graph-image.jpeg', 
    profileImage: 'profile.png',
    lang: `en`,
    config: {
      sidebarWidth: 280,
    },
  },
  plugins: [
    {
      resolve: `@pauliescanlon/gatsby-theme-terminal`,
      options: {
        source: [`posts`, `projects`],
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-151521286-1',
      },
    },
    {
      resolve: `gatsby-plugin-baidu-analytics`,
      options: {
	      // baidu analytics siteId
        siteId: "aa14d9ec8097f7630cc7c68cd0c169a8",
        // Put analytics script in the head instead of the body [default:false]
        head: false,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      }
    },
  ],
}
