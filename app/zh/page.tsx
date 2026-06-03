import Nav from '@/components/Nav'
import Sidebar from '@/components/Sidebar'
import HomeFeed from '@/components/HomeFeed'
import { getAllCases } from '@/lib/cases'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Agenthanks — 真实 AI Agent 应用案例',
  description: '按行业浏览真实 AI Agent 应用案例：销售、客服、HR、法务、运营、市场等。',
}

export default function HomePageZh() {
  const cases = getAllCases()
  return (
    <>
      <Nav lang="zh" />
      <div className="flex max-w-5xl mx-auto px-6">
        <Sidebar lang="zh" />
        <HomeFeed cases={cases} lang="zh" />
      </div>
    </>
  )
}
