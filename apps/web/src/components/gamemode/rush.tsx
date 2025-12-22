"use client"

import { useEffect } from "react"
import { useAtom } from "jotai"
import { gamePhaseAtom, usedTimeAtom } from "@/lib/atoms"
import TutorialComponent from "@/components/gamephase/tutorial-component"
import GameComponent from "@/components/gamephase/game-component"
import GameOverComponent from "@/components/gamephase/gameover-component"

const RushPage = () => {
  const [gamePhase, setGamePhase] = useAtom(gamePhaseAtom)
  const [usedTime, setUsedTime] = useAtom(usedTimeAtom)

  useEffect(() => {
    if (usedTime <= 0 && gamePhase === "game") setGamePhase("gameover")
    let timer: NodeJS.Timeout
    if (gamePhase === "game") {
      timer = setInterval(() => setUsedTime((prevTime) => prevTime - 1), 1000)
      return () => clearInterval(timer)
    }
  }, [usedTime, gamePhase, setGamePhase, setUsedTime])

  return (
    <section className="relative h-[calc(100vh-80px)] md:h-screen max-w-2xl mx-auto p-4 md:p-8">
      {gamePhase === "tutorial" && <TutorialComponent />}
      {gamePhase === "game" && <GameComponent />}
      {gamePhase === "gameover" && <GameOverComponent />}
    </section>
  )
}

export default RushPage
