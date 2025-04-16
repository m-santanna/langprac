import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  pageAtom,
  gamePhaseAtom,
  characterAtom,
  scoreAtom,
  stopwatchAtom,
  timerAtom,
  usedTimeAtom,
  alphabetAtom,
  scoreGoalAtom,
} from "@/lib/atoms"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { randomCharacter, capitalize } from "@/lib/utils"
import { katakanaList, hiraganaList, cyrillicList, kanjiList } from "@/lib/alphabets"
import OptionsComponent from "@/components/option"

const TutorialComponent = () => {
  const alphabet = useAtomValue(alphabetAtom)
  const [page, setPage] = useAtom(pageAtom)
  const setGamePhase = useSetAtom(gamePhaseAtom)
  const setCharacter = useSetAtom(characterAtom)
  const setScore = useSetAtom(scoreAtom)
  const scoreGoal = useAtomValue(scoreGoalAtom)
  const setUsedTime = useSetAtom(usedTimeAtom)
  const timer = useAtomValue(timerAtom)
  const stopwatch = useAtomValue(stopwatchAtom)
  const time = page === "rush" ? timer : stopwatch
  const charactersList: {
    character: string
    romaji: string
    romajiVariant?: string
    meaning?: string
    meaningVariant?: string
  }[] =
    alphabet === "katakana"
      ? katakanaList
      : alphabet === "hiragana"
      ? hiraganaList
      : alphabet === "kanji"
      ? kanjiList
      : cyrillicList

  return (
    <>
      <Button onClick={() => setPage("landing-page")} className="rounded-full absolute top-24">
        <ArrowLeft />
      </Button>
      <div className="flex flex-col items-center justify-center gap-4 h-full animate-in fade-in zoom-in duration-300">
        {page === "rush" && (
          <>
            <h1 className="text-gradient text-center text-7xl">Rush Mode</h1>
            <p className="text-2xl text-gradient text-center">
              One timer. {timer} seconds. You. {capitalize(alphabet)}s. Tension! BOOOOOM!!!!!
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
              {scoreGoal} {alphabet}s to go. The less time you take, the better! DUH
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
            size={"lg"}
            onClick={() => {
              setGamePhase("game")
              setCharacter(randomCharacter(charactersList))
              setScore(0)
              setUsedTime(time)
            }}
            className="rounded-full text-lg"
          >
            Start Game
          </Button>
          {page !== "practice" && <OptionsComponent />}
        </div>
      </div>
    </>
  )
}
export default TutorialComponent
