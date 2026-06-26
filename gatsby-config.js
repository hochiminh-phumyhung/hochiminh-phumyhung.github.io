/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `비나통 | 할인쿠폰 가맹점 정보`,
    description: `베트남은 비나통으로 통한다! 베트남 호치민 푸미흥 업소의 할인쿠폰을 제공, 베트남 교민을 위한 할인혜택과 소상공인 업소 홍보를 위한 정보공유 커뮤니티 플랫폼`,
    siteUrl: `https://coupon.vinatong.store`
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
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 800,
              linkImagesToOriginal: false,
              showCaptions: true,
              wrapperStyle: "margin-bottom: 1.0725rem;",
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 800,
              linkImagesToOriginal: false,
              showCaptions: true,
              wrapperStyle: "margin-bottom: 1.0725rem;",
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "images",
        "path": "./src/images/"
      },
      __key: "images"
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "pages",
        "path": "./src/pages/"
      },
      __key: "pages"
    }
  ]
};