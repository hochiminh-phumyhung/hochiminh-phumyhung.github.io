/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `My vinatong blog`,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // TODO: 실제 Google Analytics 트래킹 ID가 있다면 아래에 입력해주세요. (예: "G-XXXXXXXXXX")
        trackingIds: [
          "G-9L7YDDS674",
        ],
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        "icon": "src/images/icon.png"
      }
    }, "gatsby-plugin-mdx", "gatsby-transformer-remark", "gatsby-plugin-sharp", "gatsby-transformer-sharp", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "pages",
      "path": "./src/pages/"
    },
    __key: "pages"
  }]
};