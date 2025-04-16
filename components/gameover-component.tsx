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
} from "@/lib/atoms"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { randomCharacter } from "@/lib/utils"
import { katakanaList, hiraganaList, cyrillicList, kanjiList } from "@/lib/alphabets"

const GameOverComponent = () => {
  const alphabet = useAtomValue(alphabetAtom)
  const [page, setPage] = useAtom(pageAtom)
  const setGamePhase = useSetAtom(gamePhaseAtom)
  const setCharacter = useSetAtom(characterAtom)
  const [score, setScore] = useAtom(scoreAtom)
  const [usedTime, setUsedTime] = useAtom(usedTimeAtom)
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
    <div className="flex flex-col items-center justify-center gap-4 h-full animate-in fade-in zoom-in duration-300">
      <h1 className="text-gradient text-center text-7xl">Game Over</h1>
      <p className="text-2xl text-gradient text-center">
        {page === "goal" && <span>Your final time is {usedTime} secs.</span>}
        {page === "rush" && <span>Your final score is {score}.</span>}
        {page === "practice" && (
          <span>
            You typed {score} {alphabet}s in {usedTime} secs.
          </span>
        )}
      </p>
      <div className="flex gap-2 mt-2">
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
          Restart
        </Button>
        <Button
          size={"lg"}
          onClick={() => setPage("landing-page")}
          className="rounded-full text-lg"
        >
          Go Back
        </Button>
      </div>
    </div>
  )
}

export default GameOverComponent
