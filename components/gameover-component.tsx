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
import { katakanaList, hiraganaList, cyrillicList, kanjiList } from "@/lib/alphabets"

const GameOverComponent = () => {
  const alphabet = useAtomValue(alphabetAtom)
  const [page, setPage] = useAtom(pageAtom)
  const setGamePhase = useSetAtom(gamePhaseAtom)
  const setCharacters = useSetAtom(charactersAtom)
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
    <div className="flex flex-col items-center justify-center gap-4 h-full">
      <h1 className="text-gradient text-center text-7xl">Game Over</h1>
      <p className="text-2xl text-gradient text-center">
        {page === "goal" && <span>Your final time is {usedTime} secs.</span>}
        {page === "rush" && <span>Your final score is {score}.</span>}
        {page === "practice" && (
          <span>
            You did {score} characters in {usedTime} secs.
          </span>
        )}
      </p>
      <div className="flex gap-4 mt-2">
        <Button
          onClick={() => {
            setGamePhase("game")
            setCharacters(randomCharacter(charactersList))
            setScore(0)
            setUsedTime(time)
          }}
          className="rounded-full text-lg"
        >
          Restart
        </Button>
        <Button onClick={() => setPage("landing-page")} className="rounded-full text-lg">
          Go Back
        </Button>
      </div>
    </div>
  )
}

export default GameOverComponent
