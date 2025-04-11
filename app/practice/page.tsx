"use client"

import { useState, useEffect } from "react"
import { katakanaList } from "@/lib/katakana"
import { randomKatakana } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Input } from "@/components/ui/input"

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
        <h1 className="text-gradient text-center text-7xl">Practice Mode</h1>
        <p className="text-2xl text-gradient text-center">
          Take your time. Breath. Open your mind to infinity!
        </p>
        <Button
          size={"lg"}
          onClick={initializeGame}
          className="rounded-full text-lg mt-2"
        >
          Start Game
        </Button>
      </div>
    </>
  )
}

const GameComponent = ({
  states,
  setStates,
}: {
  states: {
    katakanas: { kana: string; romaji: string }
    score: number
    gamePhase: string
    time: number
    inputValue: string
  }
  setStates: React.Dispatch<
    React.SetStateAction<{
      katakanas: {
        kana: string
        romaji: string
      }
      score: number
      gamePhase: string
      time: number
      inputValue: string
    }>
  >
}) => {
  return (
    <>
      <Button
        onClick={() =>
          setStates((prevStates) => ({
            ...prevStates,
            gamePhase: "tutorial",
          }))
        }
        className="rounded-full absolute top-24"
      >
        <ArrowLeft />
      </Button>
      <div className="flex flex-col items-center justify-center gap-4 h-full">
        <h1 className="text-gradient text-center text-7xl">
          {states.katakanas.kana}
        </h1>
        <Input
          type="text"
          autoFocus
          className="mt-2 rounded-full w-1/3"
          value={states.inputValue}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (states.inputValue === states.katakanas.romaji) {
                setStates((prevStates) => ({
                  ...prevStates,
                  inputValue: "",
                  score: prevStates.score + 1,
                  katakanas: randomKatakana(katakanaList),
                }))
              }
            }
          }}
          onChange={(e) => {
            setStates((prevStates) => ({
              ...prevStates,
              inputValue: e.target.value,
            }))
          }}
        />
        <Button
          size={"lg"}
          className="rounded-full text-lg mt-2"
          onClick={() =>
            setStates((prevStates) => ({
              ...prevStates,
              gamePhase: "gameover",
            }))
          }
        >
          Enough!
        </Button>
      </div>
    </>
  )
}

const GameOverComponent = ({
  states,
  setStates,
  router,
  initializeGame,
}: {
  states: {
    katakanas: { kana: string; romaji: string }
    score: number
    gamePhase: string
    time: number
    inputValue: string
  }
  setStates: React.Dispatch<
    React.SetStateAction<{
      katakanas: {
        kana: string
        romaji: string
      }
      score: number
      gamePhase: string
      time: number
      inputValue: string
    }>
  >
  router: AppRouterInstance
  initializeGame: () => void
}) => {
  return (
    <>
      <Button
        onClick={() =>
          setStates((prevStates) => ({ ...prevStates, gamePhase: "tutorial" }))
        }
        className="rounded-full absolute top-24"
      >
        <ArrowLeft />
      </Button>
      <div className="flex flex-col items-center justify-center gap-4 h-full">
        <h1 className="text-gradient text-center text-7xl">Game Over</h1>
        <p className="text-2xl text-gradient text-center">
          You did {states.score} katakanas in {states.time} secs.
        </p>
        <div className="flex gap-4 mt-2">
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

export default function Page() {
  const [states, setStates] = useState({
    katakanas: { kana: "", romaji: "" },
    score: 0,
    gamePhase: "tutorial",
    time: 0,
    inputValue: "",
  })
  const router = useRouter()

  const initializeGame = () => {
    setStates({
      score: 0,
      gamePhase: "game",
      time: 0,
      inputValue: "",
      katakanas: randomKatakana(katakanaList),
    })
  }

  useEffect(() => {
    if (states.score == 50)
      setStates((prevStates) => ({ ...prevStates, gamePhase: "gameover" }))
    const timer = setInterval(() => {
      if (states.gamePhase === "game")
        setStates((prevStates) => ({
          ...prevStates,
          time: prevStates.time + 1,
        }))
    }, 1000)
    return () => clearInterval(timer)
  }, [states.gamePhase, states.score])

  return (
    <section className="relative h-[calc(100vh-64px)] md:h-screen max-w-2xl mx-auto p-4 md:p-8">
      {states.gamePhase === "tutorial" && (
        <TutorialComponent initializeGame={initializeGame} router={router} />
      )}
      {states.gamePhase === "game" && (
        <GameComponent states={states} setStates={setStates} />
      )}
      {states.gamePhase === "gameover" && (
        <GameOverComponent
          initializeGame={initializeGame}
          states={states}
          setStates={setStates}
          router={router}
        />
      )}
    </section>
  )
}
