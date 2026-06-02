import Nav from '@/components/Nav'
import Sidebar from '@/components/Sidebar'
import HomeFeed from '@/components/HomeFeed'
import { getAllCases } from '@/lib/cases'

export default function HomePage() {
  const cases = getAllCases()

  return (
    <>
      <Nav />
      <div className="flex max-w-5xl mx-auto px-6">
        <Sidebar />
        <HomeFeed cases={cases} />
      </div>
    </>
  )
}
