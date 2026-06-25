import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"

export default function BlogPost({ data }) {
  const post = data?.markdownRemark || data?.mdx
  if (!post) {
    return (
      <Layout>
        <div style={{ padding: "40px", textAlign: "center", fontFamily: "sans-serif" }}>
          <h2>포스트를 찾을 수 없습니다.</h2>
          <Link to="/" style={{ color: "#2563eb", textDecoration: "none" }}>홈으로 돌아가기</Link>
        </div>
      </Layout>
    )
  }

  const { title, date } = post.frontmatter
  const htmlContent = post.html

  return (
    <Layout>
      <div style={{
        maxWidth: "800px",
        margin: "40px auto",
        padding: "0 20px",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        lineHeight: "1.7",
        color: "#333"
      }}>
        {/* 상단 가로 배너 이미지 (반응형) */}
        <div style={{ marginBottom: "30px" }}>
          <a href="https://vinatong.store" target="_blank" rel="noreferrer" style={{ display: "block" }}>
            <img
              src="https://cdn.sanity.io/images/8xyje6wz/production/fc266096da8a9463c123e111d93328021734f289-1980x956.jpg?h=300&fit=max&q=80"
              alt="비나통 공식홈페이지"
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "200px",
                objectFit: "cover",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                display: "block"
              }}
            />
          </a>
        </div>

        <Link to="/" style={{ color: "#2563eb", textDecoration: "none", fontSize: "14px" }}>← 홈으로 돌아가기</Link>
        <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "20px 0" }} />
        <article>
          <header>
            <h1 style={{ fontSize: "2.2rem", fontWeight: "bold", margin: "10px 0", color: "#111" }}>{title}</h1>
            <p style={{ color: "#6b7280", fontSize: "14px", margin: "0 0 30px 0" }}>발행일: {date}</p>
          </header>

          {/* 본문 이미지 반응형 및 모바일 넘침 방지를 위한 스타일 주입 */}
          <style>{`
            .blog-post-content img {
              max-width: 100% !important;
              height: auto !important;
              display: block;
              margin: 1.5rem auto;
              border-radius: 8px;
            }
          `}</style>

          {/* 마크다운과 MDX 포스트 모두 지원하기 위해 children(MDX)이 있으면 렌더링하고, 없으면 htmlContent 사용 */}
          <section className="blog-post-content" style={{ fontSize: "16px", color: "#1f2937" }}>
            {htmlContent ? (
              <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
            ) : (
              post.body
            )}
          </section>
        </article>
      </div>
    </Layout>
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
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        date(formatString: "YYYY년 MM월 DD일")
      }
    }
  }
`
