import Nav from '@/components/Nav'
import HomeLayout from '@/components/HomeLayout'
import { getAllCases } from '@/lib/cases'

export default function HomePage() {
  const cases = getAllCases()
  return (
    <>
      <Nav />
      <HomeLayout cases={cases} />
    </>
  )
}
