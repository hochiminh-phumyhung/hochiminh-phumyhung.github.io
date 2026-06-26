import React, { useState } from "react"
import { Link } from "gatsby"

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div style={{
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif",
      color: "#1f2937",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#fafafb"
    }}>
      {/* 글로벌 네비게이션 바 */}
      <nav style={{
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid #f3f4f6",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 1px 2px rgba(0,0,0,0.01)"
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
          {/* 로고 이미지 적용 */}
          <Link to="/" style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none"
          }}>
            <img 
              src="/VinaTong_logo_black.png" 
              alt="비나통 로고" 
              style={{ 
                height: "26px", 
                width: "auto",
                display: "block" 
              }} 
            />
          </Link>

          {/* 데스크톱 메뉴 */}
          <div style={{ display: "flex", gap: "24px" }} className="desktop-menu">
            <Link to="/about" style={{ color: "#6b7280", textDecoration: "none", fontWeight: "600", fontSize: "14px", transition: "color 0.2s" }} activeStyle={{ color: "#ef4444" }}>소개</Link>
            <Link to="/services" style={{ color: "#6b7280", textDecoration: "none", fontWeight: "600", fontSize: "14px", transition: "color 0.2s" }} activeStyle={{ color: "#ef4444" }}>서비스</Link>
            <Link to="/contact" style={{ color: "#6b7280", textDecoration: "none", fontWeight: "600", fontSize: "14px", transition: "color 0.2s" }} activeStyle={{ color: "#ef4444" }}>문의하기</Link>
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
              color: "#111827"
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
            borderTop: "1px solid #f3f4f6",
            backgroundColor: "rgba(255,255,255,0.95)",
            padding: "10px 20px"
          }} className="mobile-dropdown">
            <Link to="/about" onClick={() => setIsOpen(false)} style={{ display: "block", padding: "12px 0", color: "#4b5563", textDecoration: "none", fontWeight: "600", borderBottom: "1px solid #f9fafb" }} activeStyle={{ color: "#ef4444" }}>소개</Link>
            <Link to="/services" onClick={() => setIsOpen(false)} style={{ display: "block", padding: "12px 0", color: "#4b5563", textDecoration: "none", fontWeight: "600", borderBottom: "1px solid #f9fafb" }} activeStyle={{ color: "#ef4444" }}>서비스</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} style={{ display: "block", padding: "12px 0", color: "#4b5563", textDecoration: "none", fontWeight: "600" }} activeStyle={{ color: "#ef4444" }}>문의하기</Link>
          </div>
        )}
      </nav>

      {/* 모바일 미디어 쿼리 */}
      <style>{`
        .desktop-menu a:hover {
          color: #ef4444 !important;
        }
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
        backgroundColor: "#111827",
        borderTop: "1px solid #1f2937",
        padding: "45px 20px",
        textAlign: "center",
        color: "#9ca3af"
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ fontWeight: "800", color: "#ffffff", marginBottom: "8px", fontSize: "15px", letterSpacing: "0.5px" }}>비나통 | VINATONG</div>
          <p style={{ margin: "0 0 25px 0", color: "#6b7280", fontSize: "13px", lineHeight: "1.6" }}>
            베트남 교민과 여행자를 위한 통합 모바일 할인 혜택 플랫폼
          </p>
          <div style={{ fontSize: "11px", color: "#4b5563" }}>
            © {new Date().getFullYear()} VinaTong. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
