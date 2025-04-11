"use client"

import { Input } from "@/components/ui/input"
import React, { useState, useEffect } from "react"
import { katakanaList } from "@/lib/katakana"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { randomKatakana } from "@/lib/utils"

const TutorialComponent = ({
  router,
  initializeGame,
}: {
  router: AppRouterInstance
  initializeGame: () => void
}) => {
  return (
    <>
      <Button
        onClick={() => router.back()}
        className="rounded-full absolute top-24"
      >
        <ArrowLeft />
      </Button>
      <div className="flex flex-col items-center justify-center gap-4 h-full">
        <h1 className="text-7xl text-gradient text-center">Rush Mode</h1>
        <p className="text-2xl text-gradient text-center">
          One timer. You. Katakanas. Tension! BOOOOOM!!!!!
        </p>
        <div className="flex justify-between items-center gap-4 mt-2">
          <Button
            size={"lg"}
            onClick={initializeGame}
            className="rounded-full text-lg"
          >
            Start Game
          </Button>
        </div>
      </div>
    </>
  )
}

const GameOverComponent = ({
  score,
  router,
  initializeGame,
}: {
  score: number
  router: AppRouterInstance
  initializeGame: () => void
}) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 h-full">
        <h1 className="text-7xl text-gradient text-center">Game Over</h1>
        <p className="text-2xl text-gradient text-center">
          Your final score is {score}.
        </p>
        <div className="flex justify-between items-center gap-4 mt-2">
          <Button onClick={initializeGame} className="rounded-full text-lg">
            Restart
          </Button>
          <Button onClick={router.back} className="rounded-full text-lg">
            Go Back
          </Button>
        </div>
      </div>
    </>
  )
}

const Page = () => {
  const [gameState, setGameState] = useState("tutorial")
  const [score, setScore] = useState(0)
  const [time, setTime] = useState(60)
  const [currentKatakana, setCurrentKatakana] = useState(
    randomKatakana(katakanaList),
  )
  const [inputValue, setInputValue] = useState("")
  const router = useRouter()

  useEffect(() => {
    if (time <= 0) setGameState("gameover")

    const timer = setInterval(() => {
      if (gameState === "game") setTime((t) => t - 1)
    }, 1000)
    return () => clearInterval(timer) // Cleanup on unmount
  }, [time, gameState])

  const checkCorrect = (input: string, currentKatakana: string) => {
    if (input === currentKatakana) {
      setScore(score + 1)
      setCurrentKatakana(randomKatakana(katakanaList))
    } else {
    }
  }

  const initializeGame = () => {
    setGameState("game")
    setScore(0)
    setCurrentKatakana(randomKatakana(katakanaList))
    setTime(60)
  }

  return (
    <section className="relative h-[calc(100vh-64px)] md:h-screen max-w-2xl mx-auto p-4 md:p-8">
      {gameState === "tutorial" && (
        <TutorialComponent router={router} initializeGame={initializeGame} />
      )}
      {gameState === "game" && (
        <>
          <Button
            onClick={() => setGameState("tutorial")}
            className="rounded-full absolute top-24"
          >
            <ArrowLeft />
          </Button>
          <div className="flex flex-col items-center justify-center gap-4 h-full ">
            <h1 id="kana" className="text-7xl text-gradient text-center">
              {currentKatakana.kana}
            </h1>
            <p className="text-xl text-center">
              Score: {score} | Time: {time}
            </p>
            <Input
              autoFocus
              type="text"
              className="mt-2 rounded-full w-1/3"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  checkCorrect(inputValue, currentKatakana.romaji)
                  setInputValue("")
                }
              }}
            />
          </div>
        </>
      )}
      {gameState === "gameover" && (
        <GameOverComponent
          score={score}
          router={router}
          initializeGame={initializeGame}
        />
      )}
    </section>
  )
}

export default Page
