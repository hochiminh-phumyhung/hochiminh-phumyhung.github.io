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
          <li>🚀 베트남 시장 진출 및 비즈니스 컨설팅</li>
          <li>💻 웹 애플리케이션 및 플랫폼 설계 & 개발</li>
          <li>📈 디지털 마케팅 및 SEO 최적화 솔루션</li>
        </ul>
      </div>
    </Layout>
  )
}

export const Head = () => <title>서비스 - VinaTong Blog</title>
