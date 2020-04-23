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
  ],
}
