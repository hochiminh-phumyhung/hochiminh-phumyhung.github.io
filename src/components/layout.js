import React, { useState } from "react"
import { Link } from "gatsby"

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div style={{
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      color: "#1f2937",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column"
    }}>
      {/* 글로벌 네비게이션 바 */}
      <nav style={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
      }}>
        <div style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "0 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "60px"
        }}>
          {/* 로고 */}
          <Link to="/" style={{
            fontSize: "1.25rem",
            fontWeight: "800",
            color: "#111827",
            textDecoration: "none",
            letterSpacing: "-0.025em"
          }}>
            VinaTong Blog 📝
          </Link>

          {/* 데스크톱 메뉴 */}
          <div style={{ display: "flex", gap: "20px" }} className="desktop-menu">
            <Link to="/about" style={{ color: "#4b5563", textDecoration: "none", fontWeight: "500", fontSize: "15px" }} activeStyle={{ color: "#2563eb", fontWeight: "700" }}>소개</Link>
            <Link to="/services" style={{ color: "#4b5563", textDecoration: "none", fontWeight: "500", fontSize: "15px" }} activeStyle={{ color: "#2563eb", fontWeight: "700" }}>서비스</Link>
            <Link to="/contact" style={{ color: "#4b5563", textDecoration: "none", fontWeight: "500", fontSize: "15px" }} activeStyle={{ color: "#2563eb", fontWeight: "700" }}>문의하기</Link>
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
              color: "#4b5563"
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
            borderTop: "1px solid #e5e7eb",
            backgroundColor: "#f9fafb",
            padding: "10px 20px"
          }} className="mobile-dropdown">
            <Link to="/about" onClick={() => setIsOpen(false)} style={{ display: "block", padding: "10px 0", color: "#4b5563", textDecoration: "none", fontWeight: "500" }} activeStyle={{ color: "#2563eb" }}>소개</Link>
            <Link to="/services" onClick={() => setIsOpen(false)} style={{ display: "block", padding: "10px 0", color: "#4b5563", textDecoration: "none", fontWeight: "500" }} activeStyle={{ color: "#2563eb" }}>서비스</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} style={{ display: "block", padding: "10px 0", color: "#4b5563", textDecoration: "none", fontWeight: "500" }} activeStyle={{ color: "#2563eb" }}>문의하기</Link>
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
        backgroundColor: "#f9fafb",
        borderTop: "1px solid #e5e7eb",
        padding: "30px 20px",
        textAlign: "center",
        fontSize: "14px",
        color: "#9ca3af"
      }}>
        © {new Date().getFullYear()} VinaTong Blog. All rights reserved.
      </footer>
    </div>
  )
}
