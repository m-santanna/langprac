"use client"

import { useEffect } from "react"
import { useAtom, useSetAtom, useAtomValue } from "jotai"
import { scoreAtom, gamePhaseAtom, targetScoreAtom, usedTimeAtom } from "@/lib/atoms"
import TutorialComponent from "@/components/gamephase/tutorial-component"
import GameOverComponent from "@/components/gamephase/gameover-component"
import GameComponent from "@/components/gamephase/game-component"

export default function TargetScorePage() {
  const score = useAtomValue(scoreAtom)
  const targetScore = useAtomValue(targetScoreAtom)
  const [gamePhase, setGamePhase] = useAtom(gamePhaseAtom)
  const setUsedTime = useSetAtom(usedTimeAtom)

  useEffect(() => {
    if (score == targetScore) setGamePhase("gameover")
    let timer: NodeJS.Timeout
    if (gamePhase === "game") {
      timer = setInterval(() => setUsedTime((prevTime) => prevTime + 1), 1000)
      return () => clearInterval(timer)
    }
  }, [gamePhase, score, targetScore, setGamePhase, setUsedTime])

  return (
    <section className="relative h-[calc(100vh-80px)] md:h-screen max-w-2xl mx-auto p-4 md:p-8">
      {gamePhase === "tutorial" && <TutorialComponent />}
      {gamePhase === "game" && <GameComponent />}
      {gamePhase === "gameover" && <GameOverComponent />}
    </section>
  )
}
