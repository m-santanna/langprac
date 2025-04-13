"use client"

import { useEffect } from "react"
import { useAtomValue, useSetAtom } from "jotai"
import { gamePhaseAtom, usedTimeAtom } from "@/lib/atoms"
import TutorialComponent from "@/components/tutorial-component"
import GameComponent from "@/components/game-component"
import GameOverComponent from "@/components/gameover-component"

export default function PracticePage() {
  const gamePhase = useAtomValue(gamePhaseAtom)
  const setUsedTime = useSetAtom(usedTimeAtom)

  useEffect(() => {
    const timer = setInterval(() => {
      if (gamePhase === "game") setUsedTime((prevTime) => prevTime + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [gamePhase, setUsedTime])

  return (
    <section className="relative h-[calc(100vh-80px)] md:h-screen max-w-2xl mx-auto p-4 md:p-8">
      {gamePhase === "tutorial" && <TutorialComponent />}
      {gamePhase === "game" && <GameComponent />}
      {gamePhase === "gameover" && <GameOverComponent />}
    </section>
  )
}
