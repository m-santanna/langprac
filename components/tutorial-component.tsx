import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  gameModeAtom,
  gamePhaseAtom,
  katakanasAtom,
  scoreAtom,
  stopwatchAtom,
  timerAtom,
  usedTimeAtom,
} from "@/lib/atoms"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { randomKatakana } from "@/lib/utils"
import { katakanaList } from "@/lib/katakana"

const TutorialComponent = () => {
  const [gameMode, setGameMode] = useAtom(gameModeAtom)
  const setGamePhase = useSetAtom(gamePhaseAtom)
  const setKatakanas = useSetAtom(katakanasAtom)
  const setScore = useSetAtom(scoreAtom)
  const setUsedTime = useSetAtom(usedTimeAtom)
  const time = gameMode === "rush" ? useAtomValue(timerAtom) : useAtomValue(stopwatchAtom)

  return (
    <>
      <Button onClick={() => setGameMode("landing-page")} className="rounded-full absolute top-24">
        <ArrowLeft />
      </Button>
      <div className="flex flex-col items-center justify-center gap-4 h-full">
        {gameMode === "rush" && (
          <>
            <h1 className="text-gradient text-center text-7xl">Rush Mode</h1>
            <p className="text-2xl text-gradient text-center">
              One timer. You. Katakanas. Tension! BOOOOOM!!!!!
            </p>
          </>
        )}
        {gameMode === "practice" && (
          <>
            <h1 className="text-gradient text-center text-7xl">Practice Mode</h1>
            <p className="text-2xl text-gradient text-center">
              Take your time. Breath. Open your mind to infinity!
            </p>
          </>
        )}
        {gameMode === "goal" && (
          <>
            <h1 className="text-gradient text-center text-7xl">Goal Mode</h1>
            <p className="text-2xl text-gradient text-center">
              50 katakanas to go. The less time you take, the better! DUH
            </p>
          </>
        )}
        <Button
          size={"lg"}
          onClick={() => {
            setGamePhase("game")
            setKatakanas(randomKatakana(katakanaList))
            setScore(0)
            setUsedTime(time)
          }}
          className="rounded-full text-lg mt-2"
        >
          Start Game
        </Button>
      </div>
    </>
  )
}
export default TutorialComponent
