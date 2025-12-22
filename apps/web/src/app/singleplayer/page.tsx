"use client"

import { useAtomValue, useSetAtom } from "jotai"
import { gameModeAtom, gamePhaseAtom } from "@/lib/atoms"
import LandingPage from "@/components/gamemode/landing-page"
import PracticePage from "@/components/gamemode/practice"
import TargetScorePage from "@/components/gamemode/target-score"
import RushPage from "@/components/gamemode/rush"
import { useHasMounted } from "@repo/ui/hooks/use-has-mounted"
import LoadingPage from "../loading"
import { useEffect } from "react"

export default function HomePage() {
  const hasMounted = useHasMounted()
  const setGamePhase = useSetAtom(gamePhaseAtom)
  const setGameMode = useSetAtom(gameModeAtom)
  const gamemode = useAtomValue(gameModeAtom)

  useEffect(() => {
    setGamePhase("tutorial")
    setGameMode("landing-page")
  }, [])

  if (!hasMounted) return <LoadingPage />
  return (
    <main>
      {gamemode === "landing-page" && <LandingPage />}
      {gamemode === "practice" && <PracticePage />}
      {gamemode === "target-score" && <TargetScorePage />}
      {gamemode === "rush" && <RushPage />}
    </main>
  )
}
