import React, { useState } from "react"
import { Link } from "gatsby"

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div style={{
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      color: "#1f2937",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#fcfcfd"
    }}>
      {/* 글로벌 네비게이션 바 */}
      <nav style={{
        backgroundColor: "#ffffff",
        borderBottom: "2px solid #fee2e2",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.01)"
      }}>
        <div style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "0 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "64px"
        }}>
          {/* 로고 */}
          <Link to="/" style={{
            fontSize: "1.35rem",
            fontWeight: "900",
            color: "#ef4444",
            textDecoration: "none",
            letterSpacing: "-0.03em",
            display: "flex",
            alignItems: "center",
            gap: "6px"
          }}>
            비나통 할인쿠폰 🎟️
          </Link>

          {/* 데스크톱 메뉴 */}
          <div style={{ display: "flex", gap: "24px" }} className="desktop-menu">
            <Link to="/about" style={{ color: "#4b5563", textDecoration: "none", fontWeight: "600", fontSize: "15px" }} activeStyle={{ color: "#ef4444", fontWeight: "800" }}>소개</Link>
            <Link to="/services" style={{ color: "#4b5563", textDecoration: "none", fontWeight: "600", fontSize: "15px" }} activeStyle={{ color: "#ef4444", fontWeight: "800" }}>서비스</Link>
            <Link to="/contact" style={{ color: "#4b5563", textDecoration: "none", fontWeight: "600", fontSize: "15px" }} activeStyle={{ color: "#ef4444", fontWeight: "800" }}>문의하기</Link>
          </div>

          {/* 모바일 햄버거 토글 버튼 */}
          <button 
            onClick={toggleMenu}
            aria-label="Toggle menu"
            style={{
              display: "none",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              color: "#ef4444"
            }}
            className="mobile-menu-btn"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              {isOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>

        {/* 모바일 드롭다운 메뉴 */}
        {isOpen && (
          <div style={{
            borderTop: "1px solid #fee2e2",
            backgroundColor: "#fffafa",
            padding: "10px 20px"
          }} className="mobile-dropdown">
            <Link to="/about" onClick={() => setIsOpen(false)} style={{ display: "block", padding: "12px 0", color: "#4b5563", textDecoration: "none", fontWeight: "600", borderBottom: "1px solid #fff5f5" }} activeStyle={{ color: "#ef4444" }}>소개</Link>
            <Link to="/services" onClick={() => setIsOpen(false)} style={{ display: "block", padding: "12px 0", color: "#4b5563", textDecoration: "none", fontWeight: "600", borderBottom: "1px solid #fff5f5" }} activeStyle={{ color: "#ef4444" }}>서비스</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} style={{ display: "block", padding: "12px 0", color: "#4b5563", textDecoration: "none", fontWeight: "600" }} activeStyle={{ color: "#ef4444" }}>문의하기</Link>
          </div>
        )}
      </nav>

      {/* 모바일 미디어 쿼리를 입히기 위한 글로벌 Style 태그 */}
      <style>{`
        @media (max-width: 640px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }
      `}</style>

      {/* 메인 콘텐츠 영역 */}
      <div style={{ flex: 1 }}>
        {children}
      </div>

      {/* 푸터 */}
      <footer style={{
        backgroundColor: "#1f2937",
        borderTop: "1px solid #111827",
        padding: "40px 20px",
        textAlign: "center",
        fontSize: "14px",
        color: "#9ca3af"
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ fontWeight: "bold", color: "#fff", marginBottom: "10px", fontSize: "16px" }}>비나통 | VinaTong</div>
          <p style={{ margin: "0 0 20px 0", color: "#6b7280", fontSize: "13px", lineHeight: "1.6" }}>
            베트남 교민과 여행객을 위한 실시간 할인쿠폰 및 로컬 제휴 정보 공유 커뮤니티 플랫폼.
          </p>
          <div style={{ fontSize: "12px", color: "#4b5563" }}>
            © {new Date().getFullYear()} VinaTong. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
