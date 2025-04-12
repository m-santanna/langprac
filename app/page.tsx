"use client"

import { useAtomValue } from "jotai"
import { gameModeAtom } from "@/lib/atoms"
import LandingPage from "@/components/landing-page"
import PracticePage from "@/components/practice"
import GoalPage from "@/components/goal"
import RushPage from "@/components/rush"
import Cheatsheet from "@/components/cheatsheet"
import Navbar from "@/components/navbar"

const page = () => {
  const gameMode = useAtomValue(gameModeAtom)
  return (
    <>
      <Navbar />
      <main>
        {gameMode === "landing-page" && <LandingPage />}
        {gameMode === "practice" && <PracticePage />}
        {gameMode === "goal" && <GoalPage />}
        {gameMode === "rush" && <RushPage />}
        {gameMode === "cheatsheet" && <Cheatsheet />}
      </main>
    </>
  )
}

export default page
