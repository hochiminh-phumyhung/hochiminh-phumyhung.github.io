import * as React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"

const IndexPage = ({ data }) => {
  const mdPosts = data?.allMarkdownRemark?.nodes || []
  const mdxPosts = data?.allMdx?.nodes || []
  
  // 모든 포스트 병합 및 정렬
  const allPosts = [...mdPosts, ...mdxPosts].sort((a, b) => {
    const dateA = a.frontmatter.rawDate || ""
    const dateB = b.frontmatter.rawDate || ""
    return dateB.localeCompare(dateA)
  })

  // 가맹점(쿠폰 제공)과 일반 뉴스 분리
  const shopPosts = allPosts.filter(post => post.frontmatter.couponActive === true)
  const newsPosts = allPosts.filter(post => post.frontmatter.couponActive !== true)

  return (
    <Layout>
      {/* 프리미엄 헤더/히어로 영역 */}
      <div style={{
        background: "linear-gradient(135deg, #ef4444 0%, #f97316 100%)",
        color: "#ffffff",
        padding: "60px 20px",
        textAlign: "center",
        boxShadow: "inset 0 -10px 20px rgba(0,0,0,0.05)"
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <span style={{
            background: "rgba(255, 255, 255, 0.2)",
            padding: "6px 16px",
            borderRadius: "20px",
            fontSize: "13px",
            fontWeight: "bold",
            letterSpacing: "1px",
            textTransform: "uppercase",
            display: "inline-block",
            marginBottom: "15px"
          }}>
            Vietnam Premium Coupon Platform
          </span>
          <h1 style={{
            fontSize: "2.2rem",
            fontWeight: "900",
            margin: "0 0 15px 0",
            letterSpacing: "-0.03em",
            lineHeight: "1.2"
          }}>
            비나통 | 베트남 할인 혜택 🎟️
          </h1>
          <p style={{
            color: "rgba(255, 255, 255, 0.9)",
            fontSize: "18px",
            margin: 0,
            fontWeight: "500",
            lineHeight: "1.6"
          }}>
            호치민 푸미흥 최고 업소들의 특별 할인 쿠폰을 지금 바로 확인해 보세요!
          </p>
        </div>
      </div>

      <main style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "40px 20px",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
      }}>
        {/* 1. 🎟️ 인기 할인 가맹점 섹션 */}
        <section style={{ marginBottom: "50px" }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
            borderBottom: "2px solid #fee2e2",
            paddingBottom: "10px"
          }}>
            <h2 style={{ fontSize: "1.6rem", fontWeight: "800", color: "#111827", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ color: "#ef4444" }}>🎟️</span> 제휴 할인 가맹점
            </h2>
            <span style={{ fontSize: "13px", color: "#ef4444", fontWeight: "bold" }}>총 {shopPosts.length}곳 혜택 중</span>
          </div>

          {shopPosts.length === 0 ? (
            <div style={{
              padding: "40px",
              textAlign: "center",
              backgroundColor: "#f9fafb",
              borderRadius: "12px",
              color: "#9ca3af",
              border: "1px dashed #e5e7eb"
            }}>
              준비 중인 가맹점이 없습니다. 곧 추가됩니다!
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "20px"
            }} className="shop-grid">
              {shopPosts.map(post => {
                const thumbnailProp = post.frontmatter.thumbnail || post.frontmatter.image
                return (
                  <div key={post.id} style={{
                    backgroundColor: "#fff",
                    borderRadius: "14px",
                    overflow: "hidden",
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.02)",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative"
                  }}>
                    {/* 할인율 뱃지 */}
                    <div style={{
                      position: "absolute",
                      top: "12px",
                      left: "12px",
                      backgroundColor: "#ef4444",
                      color: "#fff",
                      padding: "5px 12px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      zIndex: 10,
                      boxShadow: "0 2px 8px rgba(239, 68, 68, 0.3)"
                    }}>
                      {post.frontmatter.discountRate || "할인중"}
                    </div>

                    <div style={{ height: "140px", backgroundColor: "#f3f4f6", overflow: "hidden" }}>
                      {thumbnailProp ? (
                        <img
                          src={thumbnailProp}
                          alt={post.frontmatter.title}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      ) : (
                        <div style={{
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#9ca3af",
                          fontSize: "14px"
                        }}>
                          No Image
                        </div>
                      )}
                    </div>

                    <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column" }}>
                      <h3 style={{ margin: "0 0 8px 0", fontSize: "1.15rem", fontWeight: "700" }}>
                        <Link to={post.fields.slug} style={{ color: "#111827", textDecoration: "none" }}>
                          {post.frontmatter.title.replace(" 정보", "")}
                        </Link>
                      </h3>
                      <p style={{
                        color: "#6b7280",
                        fontSize: "13px",
                        lineHeight: "1.5",
                        margin: "0 0 16px 0",
                        flex: 1
                      }}>
                        {post.frontmatter.description ? post.frontmatter.description.substring(0, 50) + "..." : "자세한 가맹점 정보와 전용 할인 쿠폰을 확인하세요."}
                      </p>
                      
                      <Link to={post.fields.slug} style={{
                        textAlign: "center",
                        backgroundColor: "#fee2e2",
                        color: "#ef4444",
                        textDecoration: "none",
                        fontWeight: "bold",
                        padding: "10px 0",
                        borderRadius: "8px",
                        fontSize: "14px",
                        display: "block"
                      }}>
                        쿠폰 받기 🎟️
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </section>

        {/* 2. 📰 베트남 로컬 뉴스 & 꿀팁 섹션 */}
        <section>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
            borderBottom: "2px solid #e5e7eb",
            paddingBottom: "10px"
          }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#111827", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ color: "#3b82f6" }}>📰</span> 로컬 뉴스 & 꿀팁 정보
            </h2>
            <span style={{ fontSize: "13px", color: "#6b7280" }}>유용한 리포트</span>
          </div>

          {newsPosts.length === 0 ? (
            <p style={{ color: "#9ca3af", fontStyle: "italic", textAlign: "center" }}>등록된 뉴스 정보가 없습니다.</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {newsPosts.map(post => {
                const thumbnailProp = post.frontmatter.thumbnail || post.frontmatter.image
                return (
                  <li key={post.id} style={{
                    marginBottom: "20px",
                    paddingBottom: "20px",
                    borderBottom: "1px solid #f3f4f6",
                    display: "flex",
                    flexDirection: "row",
                    gap: "20px",
                    alignItems: "center"
                  }} className="news-item">
                    {thumbnailProp && (
                      <div style={{
                        width: "110px",
                        height: "80px",
                        flexShrink: 0,
                        backgroundColor: "#f3f4f6",
                        borderRadius: "8px",
                        overflow: "hidden",
                        border: "1px solid #e5e7eb"
                      }} className="news-thumbnail">
                        <img
                          src={thumbnailProp}
                          alt={post.frontmatter.title}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </div>
                    )}

                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: "12px", color: "#9ca3af" }}>{post.frontmatter.date}</span>
                      <h3 style={{ margin: "3px 0 6px 0", fontSize: "1.1rem", fontWeight: "700" }}>
                        <Link to={post.fields.slug} style={{ color: "#2563eb", textDecoration: "none" }}>
                          {post.frontmatter.title}
                        </Link>
                      </h3>
                      <p style={{
                        color: "#4b5563",
                        fontSize: "13.5px",
                        margin: 0,
                        lineHeight: "1.5"
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
          .news-item {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
          }
          .news-thumbnail {
            width: 100% !important;
            height: 150px !important;
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
          couponActive
          discountRate
          expiryDate
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
          couponActive
          discountRate
          expiryDate
        }
      }
    }
  }
`

export default IndexPage
export const Head = ({ data }) => (
  <>
    <title>비나통 | 베트남 호치민 할인쿠폰 가맹점 정보</title>
    <meta name="description" content="베트남은 비나통으로 통한다! 베트남 호치민 푸미흥 업소의 할인쿠폰을 제공, 베트남 교민을 위한 할인혜택과 소상공인 업소 홍보를 위한 정보공유 커뮤니티 플랫폼" />
    <meta name="google-site-verification" content="WGZEl3xQD3TwJZ5LEDKXFsea_mhB5EbTweNIL-NjLyw" />
  </>
)
