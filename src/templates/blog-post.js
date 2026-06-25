import React from "react"
import { graphql, Link } from "gatsby"

export default function BlogPost({ data }) {
  const post = data?.markdownRemark
  if (!post) {
    return (
      <div style={{ padding: "40px", textAlign: "center", fontFamily: "sans-serif" }}>
        <h2>포스트를 찾을 수 없습니다.</h2>
        <Link to="/" style={{ color: "#2563eb", textDecoration: "none" }}>홈으로 돌아가기</Link>
      </div>
    )
  }
  return (
    <div style={{ 
      maxWidth: "800px", 
      margin: "40px auto", 
      padding: "0 20px", 
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      lineHeight: "1.7",
      color: "#333"
    }}>
      <Link to="/" style={{ color: "#2563eb", textDecoration: "none", fontSize: "14px" }}>← 홈으로 돌아가기</Link>
      <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "20px 0" }} />
      <article>
        <header>
          <h1 style={{ fontSize: "2.2rem", fontWeight: "bold", margin: "10px 0", color: "#111" }}>{post.frontmatter.title}</h1>
          <p style={{ color: "#6b7280", fontSize: "14px", margin: "0 0 30px 0" }}>발행일: {post.frontmatter.date}</p>
        </header>
        <section 
          dangerouslySetInnerHTML={{ __html: post.html }} 
          style={{ fontSize: "16px", color: "#1f2937" }}
          className="blog-post-content"
        />
      </article>
    </div>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "YYYY년 MM월 DD일")
      }
    }
  }
`
