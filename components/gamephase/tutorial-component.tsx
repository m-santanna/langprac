import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  gamePhaseAtom,
  characterAtom,
  scoreAtom,
  stopwatchAtom,
  timerAtom,
  usedTimeAtom,
  alphabetAtom,
  targetScoreAtom,
  gameModeAtom,
} from "@/lib/atoms"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { randomCharacter, capitalize, Character } from "@/lib/utils"
import OptionsComponent from "@/components/option"
import { getCharacterList } from "@/lib/alphabet-map"

const TutorialComponent = () => {
  const [gamemode, setGameMode] = useAtom(gameModeAtom)
  const alphabet = useAtomValue(alphabetAtom)
  const setGamePhase = useSetAtom(gamePhaseAtom)
  const setCharacter = useSetAtom(characterAtom)
  const setScore = useSetAtom(scoreAtom)
  const targetScore = useAtomValue(targetScoreAtom)
  const setUsedTime = useSetAtom(usedTimeAtom)
  const timer = useAtomValue(timerAtom)
  const stopwatch = useAtomValue(stopwatchAtom)
  const time = gamemode === "rush" ? timer : stopwatch
  const charactersList: Character[] = getCharacterList(alphabet)

  return (
    <>
      <Button onClick={() => setGameMode("landing-page")} className="rounded-full absolute top-24">
        <ArrowLeft />
      </Button>
      <div className="flex flex-col items-center justify-center gap-4 h-full animate-in fade-in zoom-in duration-300">
        {gamemode === "rush" && (
          <>
            <h1 className="text-gradient text-center text-5xl sm:text-7xl">Rush Mode</h1>
            <p className="text-xl sm:text-2xl text-gradient text-center">
              One timer. {time} seconds. You. {capitalize(alphabet)}s. Tension! BOOOOOM!!!!!
            </p>
          </>
        )}
        {gamemode === "practice" && (
          <>
            <h1 className="text-gradient text-center text-5xl sm:text-7xl">Practice Mode</h1>
            <p className="text-xl sm:text-2xl text-gradient text-center">
              Take your time. Breath. Open your mind to infinity!
            </p>
          </>
        )}
        {gamemode === "target-score" && (
          <>
            <h1 className="text-gradient text-center text-5xl sm:text-7xl">Goal Mode</h1>
            <p className="text-xl sm:text-2xl text-gradient text-center">
              {targetScore} {alphabet}s to go. The less time you take, the better! DUH
            </p>
          </>
        )}
        {alphabet === "kanji" && (
          <p className="text-lg text-gray-500 text-center">
            OBS: The kanji meaning also counts as a correct answer.
          </p>
        )}
        <div className="flex mt-2 gap-2">
          <Button
            onClick={() => {
              setGamePhase("game")
              setCharacter(randomCharacter(charactersList))
              setScore(0)
              setUsedTime(time)
            }}
          >
            Start Game
          </Button>
          {gamemode !== "practice" && <OptionsComponent />}
        </div>
      </div>
    </>
  )
}
export default TutorialComponent
