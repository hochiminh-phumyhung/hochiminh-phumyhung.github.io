import * as React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"

const IndexPage = ({ data }) => {
  // 마크다운 포스트와 MDX 포스트 목록을 합쳐서 정렬합니다.
  const mdPosts = data?.allMarkdownRemark?.nodes || []
  const mdxPosts = data?.allMdx?.nodes || []
  const posts = [...mdPosts, ...mdxPosts].sort((a, b) => {
    const dateA = a.frontmatter.rawDate || ""
    const dateB = b.frontmatter.rawDate || ""
    return dateB.localeCompare(dateA)
  })

  return (
    <Layout>
      <main style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "40px 20px",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        color: "#1f2937"
      }}>
        <header style={{ marginBottom: "50px" }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "800", color: "#111827", margin: "0 0 10px 0" }}>
            비나통 | 커뮤니티 블로그 📝
          </h1>
          <p style={{ color: "#6b7280", fontSize: "16px", margin: 0 }}>
            베트남 업소 할인쿠폰 제공업소 정보 제공 블로그입니다. 유용한 정보와 꿀팁을 얻어가세요.
          </p>
        </header>

        <section>
          {posts.length === 0 ? (
            <p style={{ color: "#9ca3af", fontStyle: "italic" }}>아직 작성된 포스트가 없습니다.</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {posts.map(post => {
                const thumbnailProp = post.frontmatter.thumbnail || post.frontmatter.image

                return (
                  <li key={post.id} style={{
                    marginBottom: "35px",
                    paddingBottom: "30px",
                    borderBottom: "1px solid #f3f4f6",
                    display: "flex",
                    flexDirection: "row",
                    gap: "20px",
                    alignItems: "flex-start"
                  }} className="post-item">
                    {/* 썸네일 노출 영역 */}
                    <div style={{
                      width: "150px",
                      height: "100px",
                      flexShrink: 0,
                      backgroundColor: "#f3f4f6",
                      borderRadius: "8px",
                      overflow: "hidden",
                      border: "1px solid #e5e7eb",
                      position: "relative"
                    }} className="post-thumbnail-wrapper">
                      {thumbnailProp ? (
                        <img
                          src={thumbnailProp}
                          alt={post.frontmatter.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover"
                          }}
                        />
                      ) : (
                        <div style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#9ca3af",
                          fontSize: "13px",
                          fontWeight: "500"
                        }}>
                          No Image
                        </div>
                      )}
                    </div>

                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: "13px", color: "#9ca3af" }}>{post.frontmatter.date}</span>
                      <h2 style={{ margin: "5px 0 10px 0", fontSize: "1.3rem" }}>
                        <Link to={post.fields.slug} style={{
                          color: "#2563eb",
                          textDecoration: "none",
                          fontWeight: "700"
                        }}>
                          {post.frontmatter.title}
                        </Link>
                      </h2>
                      <p style={{
                        color: "#4b5563",
                        fontSize: "14.5px",
                        margin: 0,
                        lineHeight: "1.6"
                      }}>
                        {post.frontmatter.description || "상세 보기 클릭..."}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </section>
      </main>

      <style>{`
        @media (max-width: 640px) {
          .post-item {
            flex-direction: column !important;
            gap: 15px !important;
          }
          .post-thumbnail-wrapper {
            width: 100% !important;
            height: 180px !important;
          }
        }
      `}</style>
    </Layout>
  )
}

export const query = graphql`
  query IndexPageQuery {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        id
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "YYYY년 MM월 DD일")
          rawDate: date(formatString: "YYYY-MM-DDTHH:mm:ssZ")
          description
          thumbnail
          image
        }
      }
    }
    allMdx(sort: { frontmatter: { date: DESC } }) {
      nodes {
        id
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "YYYY년 MM월 DD일")
          rawDate: date(formatString: "YYYY-MM-DDTHH:mm:ssZ")
          description
          thumbnail
          image
        }
      }
    }
  }
`

export default IndexPage

export const Head = ({ data }) => (
  <>
    <title>비나통 | 할인쿠폰 가맹점 정보</title>
    <meta name="description" content="베트남은 비나통으로 통한다! 베트남 호치민 푸미흥 업소의 할인쿠폰을 제공, 베트남 교민을 위한 할인혜택과 소상공인 업소 홍보를 위한 정보공유 커뮤니티 플랫폼" />
  </>
)
