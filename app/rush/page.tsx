"use client"

import React, { useState, useEffect } from "react"
import { katakanaList } from "@/lib/katakana"
import { useRouter } from "next/navigation"
import { randomKatakana } from "@/lib/utils"
import GameOverComponent from "@/components/gameover-component"
import TutorialComponent from "@/components/tutorial-component"
import GameComponent from "@/components/game-component"

const Page = () => {
  const [states, setStates] = useState({
    katakanas: { kana: "", romaji: "" },
    score: 0,
    gamePhase: "tutorial",
    time: 60,
    inputValue: "",
  })
  const router = useRouter()

  useEffect(() => {
    if (states.time <= 0)
      setStates((prevStates) => ({ ...prevStates, gamePhase: "gameover" }))
    const timer = setInterval(() => {
      if (states.gamePhase === "game")
        setStates((prevStates) => ({
          ...prevStates,
          time: prevStates.time - 1,
        }))
    }, 1000)
    return () => clearInterval(timer) // Cleanup on unmount
  }, [states.time, states.gamePhase])

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

  const initializeGame = () => {
    setStates({
      score: 0,
      gamePhase: "game",
      time: 60,
      inputValue: "",
      katakanas: randomKatakana(katakanaList),
    })
  }

  return (
    <section className="relative h-[calc(100vh-80px)] md:h-screen max-w-2xl mx-auto p-4 md:p-8">
      {states.gamePhase === "tutorial" && (
        <TutorialComponent
          title="Rush Mode"
          description="One timer. You. Katakanas. Tension! BOOOOOM!!!!!"
          router={router}
          initializeGame={initializeGame}
        />
      )}
      {states.gamePhase === "game" && (
        <GameComponent
          gameMode="rush"
          states={states}
          setStates={setStates}
          checkCorrect={checkCorrect}
        />
      )}
      {states.gamePhase === "gameover" && (
        <GameOverComponent
          gameMode="rush"
          states={states}
          router={router}
          initializeGame={initializeGame}
        />
      )}
    </section>
  )
}

export default Page
