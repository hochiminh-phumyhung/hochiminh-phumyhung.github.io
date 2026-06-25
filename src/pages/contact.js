import React from "react"
import Layout from "../components/layout"

export default function ContactPage() {
  return (
    <Layout>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "60px 20px" }}>
        <h1 style={{ fontSize: "2.2rem", fontWeight: "800", color: "#111827", marginBottom: "20px" }}>문의하기 📞</h1>
        <p style={{ lineHeight: "1.8", color: "#4b5563", fontSize: "16px", marginBottom: "25px" }}>
          협업 제안이나 비즈니스 문의가 있으신 경우, 아래의 연락처 또는 공식 홈페이지를 통해 언제든 연락해주세요.
        </p>
        <div style={{
          padding: "20px",
          backgroundColor: "#f3f4f6",
          borderRadius: "8px",
          border: "1px solid #e5e7eb"
        }}>
          <p style={{ margin: "5px 0" }}>📧 <b>이메일</b> : <a href="mailto:support@coupong.online">support@coupong.online</a></p>
          <p style={{ margin: "5px 0" }}>🌐 <b>공식 홈페이지</b> : <a href="https://vinatong.store" target="_blank" rel="noreferrer" style={{ color: "#2563eb", textDecoration: "none" }}>vinatong.store</a></p>
        </div>
      </div>
    </Layout>
  )
}

export const Head = () => <title>문의하기 - VinaTong Blog</title>
