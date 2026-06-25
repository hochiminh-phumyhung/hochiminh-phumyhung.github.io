import React from "react"
import Layout from "../components/layout"

export default function AboutPage() {
  return (
    <Layout>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "60px 20px" }}>
        <h1 style={{ fontSize: "2.2rem", fontWeight: "800", color: "#111827", marginBottom: "20px" }}>회사 및 블로그 소개 💡</h1>
        <p style={{ lineHeight: "1.8", color: "#4b5563", fontSize: "16px" }}>
          베트남은 비나통으로 통한다! 베트남 호치민 푸미흥 업소의 할인쿠폰을 제공, 베트남 교민을 위한 할인혜택과 소상공인 업소 홍보를 위한 정보공유 커뮤니티 플랫폼입니다.
        </p>
        <p style={{ lineHeight: "1.8", color: "#4b5563", fontSize: "16px", marginTop: "15px" }}>
          지속적으로 할인혜택을 제공하고 다양한 업소 정보를 생산하여 회원분들께 유익한 정보를 제공하겠습니다.
        </p>
      </div>
    </Layout>
  )
}

export const Head = () => <title>소개 - VinaTong Blog</title>
