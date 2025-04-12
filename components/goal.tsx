"use client"

import { useEffect } from "react"
import { useAtom, useSetAtom, useAtomValue } from "jotai"
import {
  scoreAtom,
  gamePhaseAtom,
  scoreGoalAtom,
  usedTimeAtom,
} from "@/lib/atoms"
import TutorialComponent from "@/components/tutorial-component"
import GameOverComponent from "@/components/gameover-component"
import GameComponent from "@/components/game-component"

export default function GoalPage() {
  const score = useAtomValue(scoreAtom)
  const goalScore = useAtomValue(scoreGoalAtom)
  const [gamePhase, setGamePhase] = useAtom(gamePhaseAtom)
  const setUsedTime = useSetAtom(usedTimeAtom)

  useEffect(() => {
    if (score == goalScore) setGamePhase("gameover")
    const timer = setInterval(() => {
      if (gamePhase === "game") setUsedTime((prevTime) => prevTime + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [gamePhase, score])

  return (
    <section className="relative h-[calc(100vh-80px)] md:h-screen max-w-2xl mx-auto p-4 md:p-8">
      {gamePhase === "tutorial" && <TutorialComponent />}
      {gamePhase === "game" && <GameComponent />}
      {gamePhase === "gameover" && <GameOverComponent />}
    </section>
  )
}
