import React, { useState, useEffect } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"

export default function BlogPost({ data, children }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      if (params.get("openCoupon") === "true") {
        setIsModalOpen(true)
      }
    }
  }, [])

  const post = data?.mdx || data?.markdownRemark

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

  const {
    title,
    date,
    couponActive,
    discountRate,
    expiryDate,
    couponCode,
    couponImage
  } = post.frontmatter
  const htmlContent = post.html

  // 유효기간 만료 체크 로직
  let isExpired = false
  if (couponActive && expiryDate) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    // YYYY-MM-DD 형식 파싱
    const [year, month, day] = expiryDate.split("-").map(Number)
    const exp = new Date(year, month - 1, day, 23, 59, 59, 999)
    
    if (today > exp) {
      isExpired = true
    }
  }

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
               src="https://cdn.sanity.io/images/8xyje6wz/production/d1730ee604282afcce900adf5da8cc733581d4e0-1200x300.jpg?h=300&fit=max&q=80"
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
            <p style={{ color: "#6b7280", fontSize: "14px", margin: "0 0 20px 0" }}>발행일: {date}</p>
          </header>

          {/* 쿠폰 UI 영역 */}
          {couponActive && (
            <div style={{
              background: "linear-gradient(135deg, #fef2f2 0%, #fff5f5 100%)",
              border: "2px dashed #f87171",
              borderRadius: "12px",
              padding: "24px",
              marginBottom: "30px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              boxShadow: "0 4px 15px rgba(248, 113, 113, 0.1)"
            }}>
              <span style={{
                background: "#fee2e2",
                color: "#ef4444",
                padding: "4px 12px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: "bold",
                marginBottom: "10px"
              }}>
                비나통 단독 할인 혜택
              </span>
              <div style={{ fontSize: "28px", fontWeight: "800", color: "#b91c1c", marginBottom: "8px" }}>
                {discountRate || "스페셜 할인 혜택"}
              </div>
              <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "18px" }}>
                유효기간: {expiryDate} {isExpired && <span style={{ color: "#ef4444", fontWeight: "bold" }}>(기간 만료)</span>}
              </div>
              
              <button
                onClick={() => !isExpired && setIsModalOpen(true)}
                disabled={isExpired}
                style={{
                  background: isExpired ? "#d1d5db" : "#ef4444",
                  color: "#fff",
                  border: "none",
                  padding: "12px 30px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  borderRadius: "30px",
                  cursor: isExpired ? "not-allowed" : "pointer",
                  boxShadow: isExpired ? "none" : "0 4px 6px rgba(239, 68, 68, 0.2)",
                  transition: "transform 0.2s"
                }}
                onMouseOver={(e) => !isExpired && (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseOut={(e) => !isExpired && (e.currentTarget.style.transform = "scale(1)")}
              >
                {isExpired ? "만료된 쿠폰입니다" : "쿠폰 사용하기"}
              </button>
            </div>
          )}

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

          {/* 마크다운과 MDX 포스트 모두 지원하기 위해 mdx 데이터가 있으면 children으로 렌더링하고, 없으면 htmlContent 사용 */}
          <section className="blog-post-content" style={{ fontSize: "16px", color: "#1f2937" }}>
            {data?.mdx ? (
              children
            ) : htmlContent ? (
              <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
            ) : null}
          </section>
        </article>
      </div>

      {/* 팝업 모달 영역 */}
      {isModalOpen && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.6)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999,
          padding: "20px"
        }}>
          <div style={{
            backgroundColor: "#fff",
            borderRadius: "16px",
            width: "100%",
            maxWidth: "400px",
            padding: "28px",
            textAlign: "center",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.15)",
            position: "relative"
          }}>
            <h3 style={{ fontSize: "20px", fontWeight: "bold", margin: "0 0 10px 0", color: "#111" }}>
              쿠퐁온라인(비나통)회원입니다!
            </h3>
            <p style={{ fontSize: "14px", color: "#6b7280", margin: "0 0 24px 0" }}>
              매장 직원에게 아래 화면을 보여주세요.
            </p>

            {/* 진한 빨간색 할인율 표시 (쿠폰코드 불필요) */}
            <div style={{
              color: "#b91c1c",
              fontSize: "32px",
              fontWeight: "900",
              marginBottom: "6px"
            }}>
              {discountRate || "10% 즉시 할인"}
            </div>

            {/* 유효기간 표시 (작은 글씨) */}
            <div style={{
              fontSize: "13px",
              color: "#9ca3af",
              marginBottom: "28px"
            }}>
              유효기간: ~{expiryDate || "2026-12-31"}
            </div>

            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                background: "#1f2937",
                color: "#fff",
                border: "none",
                width: "100%",
                padding: "12px 0",
                fontSize: "15px",
                fontWeight: "bold",
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              닫기
            </button>
          </div>
        </div>
      )}
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
        couponActive
        discountRate
        expiryDate
        couponCode
        couponImage
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        date(formatString: "YYYY년 MM월 DD일")
        couponActive
        discountRate
        expiryDate
        couponCode
        couponImage
      }
    }
  }
`
