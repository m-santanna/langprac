"use client"

import { useState, useEffect } from "react"
import { katakanaList } from "@/lib/katakana"
import { randomKatakana } from "@/lib/utils"
import { useRouter } from "next/navigation"
import TutorialComponent from "@/components/tutorial-component"
import GameOverComponent from "@/components/gameover-component"
import GameComponent from "@/components/game-component"

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

  const checkCorrect = () => {
    const processedInput = states.inputValue.toLowerCase().trim()
    if (processedInput === states.katakanas.romaji)
      setStates((prevStates) => ({
        ...prevStates,
        inputValue: "",
        score: prevStates.score + 1,
        katakanas: randomKatakana(katakanaList),
      }))
    else if (processedInput === "fu" && states.katakanas.romaji === "hu/fu")
      setStates((prevStates) => ({
        ...prevStates,
        inputValue: "",
        score: prevStates.score + 1,
        katakanas: randomKatakana(katakanaList),
      }))
    else if (processedInput === "hu" && states.katakanas.romaji === "hu/fu")
      setStates((prevStates) => ({
        ...prevStates,
        inputValue: "",
        score: prevStates.score + 1,
        katakanas: randomKatakana(katakanaList),
      }))
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
    <section className="relative h-[calc(100vh-80px)] md:h-screen max-w-2xl mx-auto p-4 md:p-8">
      {states.gamePhase === "tutorial" && (
        <TutorialComponent
          title="Practice Mode"
          description="Take your time. Breath. Open your mind to infinity!"
          initializeGame={initializeGame}
          router={router}
        />
      )}
      {states.gamePhase === "game" && (
        <GameComponent
          gameMode="practice"
          checkCorrect={checkCorrect}
          states={states}
          setStates={setStates}
        />
      )}
      {states.gamePhase === "gameover" && (
        <GameOverComponent
          gameMode="practice"
          initializeGame={initializeGame}
          states={states}
          router={router}
        />
      )}
    </section>
  )
}
