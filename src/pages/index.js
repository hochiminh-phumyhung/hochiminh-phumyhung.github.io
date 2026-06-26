import React, { useState } from "react"
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

  // 카테고리 탭 상태 ("all", "restaurant", "barber", "massage", "karaoke", "news")
  const [activeTab, setActiveTab] = useState("all")

  // 가맹점(쿠폰 제공)과 일반 뉴스 분리
  const shopPosts = allPosts.filter(post => post.frontmatter.couponActive === true)
  const newsPosts = allPosts.filter(post => post.frontmatter.couponActive !== true)

  // 카테고리별 필터링
  const getFilteredShops = () => {
    if (activeTab === "all") return shopPosts
    
    // frontmatter.category 필드를 매칭
    return shopPosts.filter(post => {
      const cat = post.frontmatter.category || ""
      if (activeTab === "restaurant") return cat === "맛집"
      if (activeTab === "barber") return cat === "이발소"
      if (activeTab === "massage") return cat === "마사지" || cat === "마사지·스파" || cat === "스파"
      if (activeTab === "karaoke") return cat === "가라오케"
      return false
    })
  }

  const filteredShops = getFilteredShops()

  return (
    <Layout>
      {/* 프리미엄 미니멀 히어로 */}
      <div style={{
        background: "radial-gradient(circle at 80% 20%, #fff5f5 0%, #ffffff 100%)",
        padding: "45px 20px",
        textAlign: "center",
        borderBottom: "1px solid #f3f4f6",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* 장식용 그라데이션 블러 서클 */}
        <div style={{
          position: "absolute",
          top: "-50px",
          right: "-50px",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "rgba(249, 115, 22, 0.08)",
          filter: "blur(40px)",
          zIndex: 1
        }} />
        <div style={{
          position: "absolute",
          bottom: "-30px",
          left: "-50px",
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          background: "rgba(239, 68, 68, 0.06)",
          filter: "blur(30px)",
          zIndex: 1
        }} />

        <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: 2 }}>
          <span style={{
            background: "linear-gradient(90deg, #ef4444, #f97316)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: "12px",
            fontWeight: "800",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            display: "inline-block",
            marginBottom: "12px"
          }}>
            HO CHI MINH PREMIUM COUPON
          </span>
          {/* 타이틀 모바일 반응형 한 줄 설정 */}
          <h1 style={{
            fontSize: "clamp(1.4rem, 5.2vw, 2.1rem)",
            fontWeight: "900",
            margin: "0 0 12px 0",
            letterSpacing: "-0.03em",
            color: "#111827",
            lineHeight: "1.3",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}>
            베트남은 비나통으로 통한다
          </h1>
          <p style={{
            color: "#6b7280",
            fontSize: "14px",
            margin: 0,
            fontWeight: "500",
            lineHeight: "1.6",
            maxWidth: "500px",
            marginLeft: "auto",
            marginRight: "auto"
          }}>
            호치민 푸미흥 검증된 제휴 업소의 10% 즉시 할인 쿠폰을 폰 화면 그대로 현장에서 제시하세요.
          </p>
        </div>
      </div>

      <main style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "30px 20px",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
      }}>
        {/* 탭 카테고리 필터 (글자로만 이루어진 스와이프 가능한 칩) */}
        <div style={{
          display: "flex",
          gap: "10px",
          overflowX: "auto",
          paddingBottom: "15px",
          marginBottom: "30px",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          flexWrap: "nowrap",
          WebkitOverflowScrolling: "touch"
        }} className="no-scrollbar">
          {[
            { id: "all", label: "전체" },
            { id: "restaurant", label: "맛집" },
            { id: "barber", label: "이발소" },
            { id: "massage", label: "마사지" },
            { id: "karaoke", label: "가라오케" },
            { id: "news", label: "로컬 뉴스" }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "10px 20px",
                borderRadius: "30px",
                border: "none",
                fontSize: "14px",
                fontWeight: "700",
                cursor: "pointer",
                backgroundColor: activeTab === tab.id ? "#111827" : "#f3f4f6",
                color: activeTab === tab.id ? "#ffffff" : "#4b5563",
                transition: "all 0.2s",
                flexShrink: 0,
                whiteSpace: "nowrap"
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 콘텐츠 렌더링 영역 */}
        {activeTab !== "news" ? (
          /* 가맹점 탭 활성화 시 */
          <section>
            {filteredShops.length === 0 ? (
              <div style={{
                padding: "60px 20px",
                textAlign: "center",
                backgroundColor: "#fff",
                borderRadius: "16px",
                color: "#9ca3af",
                border: "1px solid #f3f4f6",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.02)"
              }}>
                아직 등록된 가맹점이 없습니다. 곧 멋진 혜택으로 찾아오겠습니다!
              </div>
            ) : (
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                gap: "20px"
              }}>
                {filteredShops.map(post => {
                  const thumbnailProp = post.frontmatter.thumbnail || post.frontmatter.image
                  return (
                    <div
                      key={post.id}
                      style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "16px",
                        overflow: "hidden",
                        border: "1px solid #f1f2f4",
                        boxShadow: "0 10px 20px -10px rgba(0, 0, 0, 0.08)",
                        display: "flex",
                        flexDirection: "column",
                        position: "relative",
                        transition: "all 0.3s"
                      }}
                      className="shop-card"
                    >
                      {/* 컴팩트 그라데이션 할인율 뱃지 */}
                      <div style={{
                        position: "absolute",
                        top: "14px",
                        left: "14px",
                        background: "linear-gradient(135deg, #ef4444 0%, #f97316 100%)",
                        color: "#ffffff",
                        padding: "5px 12px",
                        borderRadius: "20px",
                        fontSize: "11.5px",
                        fontWeight: "800",
                        zIndex: 10,
                        boxShadow: "0 4px 10px rgba(239, 68, 68, 0.25)"
                      }}>
                        {post.frontmatter.discountRate || "10% 할인"}
                      </div>

                      {/* 썸네일 클릭 시 상세페이지 이동 */}
                      <Link to={post.fields.slug} style={{ display: "block", height: "130px", backgroundColor: "#f9fafb", overflow: "hidden", position: "relative" }}>
                        {thumbnailProp ? (
                          <img
                            src={thumbnailProp}
                            alt={post.frontmatter.title}
                            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}
                            className="shop-img"
                          />
                        ) : (
                          <div style={{
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#d1d5db",
                            fontSize: "13px"
                          }}>
                            No Image
                          </div>
                        )}
                      </Link>

                      <div style={{ padding: "18px", flex: 1, display: "flex", flexDirection: "column" }}>
                        <h3 style={{ margin: "0 0 6px 0", fontSize: "1.1rem", fontWeight: "800", lineHeight: "1.4" }}>
                          <Link to={post.fields.slug} style={{ color: "#111827", textDecoration: "none" }}>
                            {post.frontmatter.title.replace(" 디시 할인받기", "").replace(" 정보", "")}
                          </Link>
                        </h3>
                        <p style={{
                          color: "#9ca3af",
                          fontSize: "12px",
                          marginBottom: "12px"
                        }}>
                          쿠폰유효기간: ~{post.frontmatter.expiryDate || "2026-12-31"}
                        </p>
                        
                        {/* 본문 요약 클릭 시 상세페이지 이동 (요약 10자 추가하여 52글자 제한) */}
                        <Link to={post.fields.slug} style={{ color: "inherit", textDecoration: "none", display: "flex", flex: 1, flexDirection: "column" }}>
                          <p style={{
                            color: "#6b7280",
                            fontSize: "13px",
                            lineHeight: "1.5",
                            margin: "0 0 16px 0",
                            flex: 1
                          }}>
                            {post.frontmatter.description ? post.frontmatter.description.substring(0, 52) + "..." : "전용 특별 할인 혜택을 매장에서 즉시 적용받으세요."}
                          </p>
                        </Link>
                        
                        {/* 버튼 2개로 분리 (상세보기 / 쿠폰 사용하기) */}
                        <div style={{ display: "flex", gap: "8px" }}>
                          <Link to={post.fields.slug} style={{
                            flex: 1,
                            textAlign: "center",
                            background: "#111827",
                            color: "#ffffff",
                            textDecoration: "none",
                            fontWeight: "800",
                            padding: "10px 0",
                            borderRadius: "10px",
                            fontSize: "12px",
                            display: "block",
                            border: "1px solid #111827",
                            transition: "all 0.2s"
                          }}
                          className="btn-detail"
                          >
                            상세보기
                          </Link>
                          <Link to={post.fields.slug} style={{
                            flex: 1.3,
                            textAlign: "center",
                            background: "#f9fafb",
                            color: "#111827",
                            textDecoration: "none",
                            fontWeight: "800",
                            padding: "10px 0",
                            borderRadius: "10px",
                            fontSize: "12px",
                            display: "block",
                            border: "1px solid #e5e7eb",
                            transition: "all 0.2s"
                          }}
                          className="btn-coupon"
                          >
                            쿠폰 사용하기
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </section>
        ) : (
          /* 뉴스 탭 활성화 시 */
          <section>
            {newsPosts.length === 0 ? (
              <div style={{
                padding: "60px 20px",
                textAlign: "center",
                backgroundColor: "#fff",
                borderRadius: "16px",
                color: "#9ca3af",
                border: "1px solid #f3f4f6"
              }}>
                등록된 로컬 소식이 없습니다.
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {newsPosts.map(post => {
                  const thumbnailProp = post.frontmatter.thumbnail || post.frontmatter.image
                  return (
                    <div key={post.id} style={{
                      backgroundColor: "#ffffff",
                      borderRadius: "14px",
                      padding: "16px",
                      border: "1px solid #f1f2f4",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.01)",
                      display: "flex",
                      gap: "16px",
                      alignItems: "center"
                    }} className="news-item">
                      {thumbnailProp && (
                        <Link to={post.fields.slug} style={{ display: "block" }}>
                          <div style={{
                            width: "90px",
                            height: "70px",
                            flexShrink: 0,
                            backgroundColor: "#f9fafb",
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
                        </Link>
                      )}

                      <div style={{ flex: 1 }}>
                        <span style={{ fontSize: "11px", color: "#9ca3af" }}>{post.frontmatter.date}</span>
                        <h3 style={{ margin: "2px 0 5px 0", fontSize: "1rem", fontWeight: "700" }}>
                          <Link to={post.fields.slug} style={{ color: "#2563eb", textDecoration: "none" }}>
                            {post.frontmatter.title}
                          </Link>
                        </h3>
                        <Link to={post.fields.slug} style={{ color: "inherit", textDecoration: "none" }}>
                          <p style={{
                            color: "#6b7280",
                            fontSize: "13px",
                            margin: 0,
                            lineHeight: "1.5"
                          }}>
                            {post.frontmatter.description || "상세 보기 클릭..."}
                          </p>
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </section>
        )}
      </main>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .shop-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
          border-color: #ef4444 !important;
        }
        .shop-card:hover .shop-img {
          transform: scale(1.08);
        }
        .shop-card:hover .btn-coupon {
          background: #ef4444 !important;
          color: #ffffff !important;
          border-color: #ef4444 !important;
        }
        @media (max-width: 640px) {
          .news-item {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
          }
          .news-thumbnail {
            width: 100% !important;
            height: 140px !important;
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
          category
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
          category
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
