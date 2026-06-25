import React from "react"
import Layout from "../components/layout"

export default function AboutPage() {
  return (
    <Layout>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "60px 20px" }}>
        <h1 style={{ fontSize: "2.2rem", fontWeight: "800", color: "#111827", marginBottom: "20px" }}>회사 및 블로그 소개 💡</h1>
        <p style={{ lineHeight: "1.8", color: "#4b5563", fontSize: "16px" }}>
          비나통 블로그에 오신 것을 환영합니다! 저희는 베트남 및 글로벌 비즈니스와 관련된 유용한 정보와 IT 기술 소식을 전해드리고 있습니다.
        </p>
        <p style={{ lineHeight: "1.8", color: "#4b5563", fontSize: "16px", marginTop: "15px" }}>
          지속적으로 가치 있는 콘텐츠를 생산하여 독자분들의 비즈니스 성장에 기여하겠습니다.
        </p>
      </div>
    </Layout>
  )
}

export const Head = () => <title>소개 - VinaTong Blog</title>
