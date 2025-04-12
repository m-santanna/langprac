import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import {
  gameModeAtom,
  gamePhaseAtom,
  inputValueAtom,
  katakanasAtom,
  scoreAtom,
  usedTimeAtom,
} from "@/lib/atoms"
import { randomKatakana } from "@/lib/utils"
import { katakanaList } from "@/lib/katakana"

const GameComponent = () => {
  const gameMode = useAtomValue(gameModeAtom)
  const setGamePhase = useSetAtom(gamePhaseAtom)
  const [katakanas, setKatakanas] = useAtom(katakanasAtom)
  const [score, setScore] = useAtom(scoreAtom)
  const [inputValue, setInputValue] = useAtom(inputValueAtom)
  const usedTime = useAtomValue(usedTimeAtom)

  const checkCorrect = () => {
    const processedInput = inputValue.toLowerCase().trim()
    if (processedInput === katakanas.romaji) {
      setScore((prevScore) => prevScore + 1)
      setKatakanas(randomKatakana(katakanaList))
      setInputValue("")
    } else if (processedInput === "fu" && katakanas.romaji === "hu/fu") {
      setScore((prevScore) => prevScore + 1)
      setKatakanas(randomKatakana(katakanaList))
      setInputValue("")
    } else if (processedInput === "hu" && katakanas.romaji === "hu/fu") {
      setScore((prevScore) => prevScore + 1)
      setKatakanas(randomKatakana(katakanaList))
      setInputValue("")
    }
  }

  return (
    <>
      <Button
        onClick={() => setGamePhase("tutorial")}
        className="rounded-full absolute top-24"
      >
        <ArrowLeft />
      </Button>
      <div className="flex flex-col items-center justify-center gap-4 h-full">
        <h1 className="text-gradient text-center text-7xl">{katakanas.kana}</h1>
        {gameMode !== "practice" && (
          <p className="text-2xl text-gradient text-center">
            Score: {score} | Time: {usedTime}
          </p>
        )}
        <Input
          type="text"
          autoFocus
          className="mt-2 rounded-full w-1/3"
          value={inputValue}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              checkCorrect()
            }
          }}
          onChange={(e) => {
            setInputValue(e.target.value)
          }}
        />
        {gameMode === "practice" && (
          <Button
            size={"lg"}
            className="rounded-full text-lg mt-2"
            onClick={() => setGamePhase("gameover")}
          >
            Enough!
          </Button>
        )}
      </div>
    </>
  )
}

export default GameComponent
