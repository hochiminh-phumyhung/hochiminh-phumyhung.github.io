const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: MarkdownRemarkFrontmatter
    }
    type MarkdownRemarkFrontmatter {
      title: String
      date: Date @dateformat
      description: String
      thumbnail: File @fileByRelativePath
    }
    type Mdx implements Node {
      frontmatter: MdxFrontmatter
    }
    type MdxFrontmatter {
      title: String
      date: Date @dateformat
      description: String
      thumbnail: File @fileByRelativePath
    }
  `
  createTypes(typeDefs)
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  // 마크다운과 MDX 노드 모두에 slug 필드를 동적으로 부여합니다.
  if (node.internal.type === `MarkdownRemark` || node.internal.type === `Mdx`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
      allMdx {
        edges {
          node {
            fields {
              slug
            }
            internal {
              contentFilePath
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query in gatsby-node.js.`, result.errors)
    return
  }

  // 1. 일반 마크다운(.md) 페이지 생성
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    // fields와 slug가 안전하게 존재하는 경우에만 페이지를 생성합니다.
    if (node.fields && node.fields.slug) {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/blog-post.js`),
        context: {
          slug: node.fields.slug,
        },
      })
    }
  })

  // 2. MDX(.mdx) 페이지 생성 (Gatsby 5 공식 추천 레이아웃 결합 방식)
  result.data.allMdx.edges.forEach(({ node }) => {
    if (node.fields && node.fields.slug) {
      createPage({
        path: node.fields.slug,
        component: `${path.resolve(`./src/templates/blog-post.js`)}?__contentFilePath=${node.internal.contentFilePath}`,
        context: {
          slug: node.fields.slug,
        },
      })
    }
  })
}
