import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  pageAtom,
  gamePhaseAtom,
  charactersAtom,
  scoreAtom,
  stopwatchAtom,
  timerAtom,
  usedTimeAtom,
  alphabetAtom,
} from "@/lib/atoms"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { randomCharacter } from "@/lib/utils"
import { katakanaList, hiraganaList, russianList } from "@/lib/alphabets"

const TutorialComponent = () => {
  const alphabet = useAtomValue(alphabetAtom)
  const [page, setPage] = useAtom(pageAtom)
  const setGamePhase = useSetAtom(gamePhaseAtom)
  const setCharacters = useSetAtom(charactersAtom)
  const setScore = useSetAtom(scoreAtom)
  const setUsedTime = useSetAtom(usedTimeAtom)
  const timer = useAtomValue(timerAtom)
  const stopwatch = useAtomValue(stopwatchAtom)
  const time = page === "rush" ? timer : stopwatch
  const charactersList =
    alphabet === "katakana" ? katakanaList : alphabet === "hiragana" ? hiraganaList : russianList

  return (
    <>
      <Button onClick={() => setPage("landing-page")} className="rounded-full absolute top-24">
        <ArrowLeft />
      </Button>
      <div className="flex flex-col items-center justify-center gap-4 h-full">
        {page === "rush" && (
          <>
            <h1 className="text-gradient text-center text-7xl">Rush Mode</h1>
            <p className="text-2xl text-gradient text-center">
              One timer. You. Katakanas. Tension! BOOOOOM!!!!!
            </p>
          </>
        )}
        {page === "practice" && (
          <>
            <h1 className="text-gradient text-center text-7xl">Practice Mode</h1>
            <p className="text-2xl text-gradient text-center">
              Take your time. Breath. Open your mind to infinity!
            </p>
          </>
        )}
        {page === "goal" && (
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
            setCharacters(randomCharacter(charactersList))
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
