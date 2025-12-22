"use client"

import { Button } from "@repo/ui/components/button"
import {
  gamePhaseAtom,
  characterAtom,
  scoreAtom,
  stopwatchAtom,
  timerAtom,
  usedTimeAtom,
  alphabetAtom,
  gameModeAtom,
} from "@/lib/atoms"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { Character, randomCharacter } from "@/lib/utils"
import { getCharacterList } from "@/lib/alphabet-map"

const GameOverComponent = () => {
  const [gamemode, setGameMode] = useAtom(gameModeAtom)
  const alphabet = useAtomValue(alphabetAtom)
  const setGamePhase = useSetAtom(gamePhaseAtom)
  const setCharacter = useSetAtom(characterAtom)
  const [score, setScore] = useAtom(scoreAtom)
  const [usedTime, setUsedTime] = useAtom(usedTimeAtom)
  const timer = useAtomValue(timerAtom)
  const stopwatch = useAtomValue(stopwatchAtom)
  const time = gamemode === "rush" ? timer : stopwatch
  const charactersList: Character[] = getCharacterList(alphabet)

  return (
    <div className="flex flex-col items-center justify-center gap-4 h-full animate-in fade-in zoom-in duration-300">
      <h1 className="text-gradient text-center text-7xl">Game Over</h1>
      <p className="text-2xl text-gradient text-center">
        {gamemode === "target-score" && <span>Your final time is {usedTime} secs.</span>}
        {gamemode === "rush" && <span>Your final score is {score}.</span>}
        {gamemode === "practice" && (
          <span>
            You typed {score} {alphabet}s in {usedTime} secs.
          </span>
        )}
      </p>
      <div className="flex gap-2 mt-2">
        <Button
          onClick={() => {
            setGamePhase("game")
            setCharacter(randomCharacter(charactersList))
            setScore(0)
            setUsedTime(time)
          }}
        >
          Restart
        </Button>
        <Button onClick={() => setGameMode("landing-page")}>Go Back</Button>
      </div>
    </div>
  )
}

export default GameOverComponent
