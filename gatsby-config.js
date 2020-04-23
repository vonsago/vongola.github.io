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
      resolve: `gatsby-remark-images`,
      options: {
        // It's important to specify the maxWidth (in pixels) of
        // the content container as this plugin uses this as the
        // base for generating different widths of each image.
        maxWidth: 1200,
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
    }
  ],
}
