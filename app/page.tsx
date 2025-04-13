"use client"

import { useAtomValue } from "jotai"
import { pageAtom } from "@/lib/atoms"
import LandingPage from "@/components/landing-page"
import PracticePage from "@/components/practice"
import GoalPage from "@/components/goal"
import RushPage from "@/components/rush"
import Cheatsheet from "@/components/cheatsheet"
import Navbar from "@/components/navbar"

export default function HomePage() {
  const page = useAtomValue(pageAtom)
  return (
    <>
      <Navbar />
      <main>
        {page === "landing-page" && <LandingPage />}
        {page === "practice" && <PracticePage />}
        {page === "goal" && <GoalPage />}
        {page === "rush" && <RushPage />}
        {page === "cheatsheet" && <Cheatsheet />}
      </main>
    </>
  )
}
