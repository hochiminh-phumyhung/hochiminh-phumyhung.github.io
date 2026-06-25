import * as React from "react"
import { graphql, Link } from "gatsby"

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes

  return (
    <main style={{
      maxWidth: "800px",
      margin: "0 auto",
      padding: "60px 20px",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      color: "#1f2937"
    }}>
      <header style={{ marginBottom: "50px" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "800", color: "#111827", margin: "0 0 10px 0" }}>
          My Vinatong Blog 📝
        </h1>
        <p style={{ color: "#6b7280", fontSize: "16px", margin: 0 }}>
          Gatsby와 React로 제작된 웹사이트입니다. 작성된 글 목록을 만나보세요.
        </p>
      </header>

      <section>
        {posts.length === 0 ? (
          <p style={{ color: "#9ca3af", fontStyle: "italic" }}>아직 작성된 포스트가 없습니다.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {posts.map(post => (
              <li key={post.id} style={{ 
                marginBottom: "30px", 
                paddingBottom: "25px", 
                borderBottom: "1px solid #f3f4f6" 
              }}>
                <span style={{ fontSize: "14px", color: "#9ca3af" }}>{post.frontmatter.date}</span>
                <h2 style={{ margin: "5px 0 10px 0", fontSize: "1.4rem" }}>
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
                  fontSize: "15px", 
                  margin: 0,
                  lineHeight: "1.6"
                }}>
                  {post.frontmatter.description || "상세 보기 클릭..."}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        id
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "YYYY년 MM월 DD일")
          description
        }
      }
    }
  }
`

export default IndexPage

export const Head = () => <title>My Vinatong Blog</title>
