import React from "react"
import Layout from "../components/layout"

export default function ServicesPage() {
  return (
    <Layout>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "60px 20px" }}>
        <h1 style={{ fontSize: "2.2rem", fontWeight: "800", color: "#111827", marginBottom: "20px" }}>제공 서비스 🛠️</h1>
        <p style={{ lineHeight: "1.8", color: "#4b5563", fontSize: "16px" }}>
          저희 비나통에서 제공하는 전문 서비스 라인업을 소개합니다.
        </p>
        <ul style={{ marginTop: "20px", paddingLeft: "20px", lineHeight: "2.0", color: "#374151" }}>
          <li>🚀 베트남 업소정보 및 할인쿠폰 제공</li>
          <li>💻 베트남 소상공인 온라인 홍보지원</li>
          <li>📈 베트남 교민 커뮤니티 활성화</li>
        </ul>
      </div>
    </Layout>
  )
}

export const Head = () => <title>비나통 서비스 - VinaTong Blog</title>
