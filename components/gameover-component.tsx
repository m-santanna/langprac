import { Button } from "@/components/ui/button"
import {
  gameModeAtom,
  gamePhaseAtom,
  inputValueAtom,
  katakanasAtom,
  scoreAtom,
  stopwatchAtom,
  timerAtom,
  usedTimeAtom,
} from "@/lib/atoms"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { randomKatakana } from "@/lib/utils"
import { katakanaList } from "@/lib/katakana"

const GameOverComponent = () => {
  const [gameMode, setGameMode] = useAtom(gameModeAtom)
  const setGamePhase = useSetAtom(gamePhaseAtom)
  const setKatakanas = useSetAtom(katakanasAtom)
  const [score, setScore] = useAtom(scoreAtom)
  const setInputValue = useSetAtom(inputValueAtom)
  const [usedTime, setUsedTime] = useAtom(usedTimeAtom)
  const time = gameMode === "rush" ? useAtomValue(timerAtom) : useAtomValue(stopwatchAtom)

  return (
    <div className="flex flex-col items-center justify-center gap-4 h-full">
      <h1 className="text-gradient text-center text-7xl">Game Over</h1>
      <p className="text-2xl text-gradient text-center">
        {gameMode === "goal" && <span>Your final time is {usedTime} secs.</span>}
        {gameMode === "rush" && <span>Your final score is {score}.</span>}
        {gameMode === "practice" && (
          <span>
            You did {score} katakanas in {usedTime} secs.
          </span>
        )}
      </p>
      <div className="flex gap-4 mt-2">
        <Button
          onClick={() => {
            setGamePhase("game")
            setKatakanas(randomKatakana(katakanaList))
            setScore(0)
            setInputValue("")
            setUsedTime(time)
          }}
          className="rounded-full text-lg"
        >
          Restart
        </Button>
        <Button onClick={() => setGameMode("landing-page")} className="rounded-full text-lg">
          Go Back
        </Button>
      </div>
    </div>
  )
}

export default GameOverComponent
