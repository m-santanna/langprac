import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import {
  pageAtom,
  gamePhaseAtom,
  charactersAtom,
  scoreAtom,
  usedTimeAtom,
  alphabetAtom,
} from "@/lib/atoms"
import { randomCharacter } from "@/lib/utils"
import { katakanaList, hiraganaList, russianList } from "@/lib/alphabets"

const GameComponent = () => {
  const alphabet = useAtomValue(alphabetAtom)
  const page = useAtomValue(pageAtom)
  const setGamePhase = useSetAtom(gamePhaseAtom)
  const [characters, setCharacters] = useAtom(charactersAtom)
  const [score, setScore] = useAtom(scoreAtom)
  const usedTime = useAtomValue(usedTimeAtom)
  const charactersList =
    alphabet === "katakana" ? katakanaList : alphabet === "hiragana" ? hiraganaList : russianList

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const processedInput = e.target.value.toLowerCase().trim()
    if (processedInput === characters.romaji) {
      setScore((prevScore) => prevScore + 1)
      setCharacters(randomCharacter(charactersList))
      e.target.value = ""
    } else if (processedInput === "fu" && characters.romaji === "hu/fu") {
      setScore((prevScore) => prevScore + 1)
      setCharacters(randomCharacter(charactersList))
      e.target.value = ""
    } else if (processedInput === "hu" && characters.romaji === "hu/fu") {
      setScore((prevScore) => prevScore + 1)
      setCharacters(randomCharacter(charactersList))
      e.target.value = ""
    }
  }

  return (
    <>
      <Button onClick={() => setGamePhase("tutorial")} className="rounded-full absolute top-24">
        <ArrowLeft />
      </Button>
      <div className="flex flex-col items-center justify-center gap-4 h-full">
        <h1 className="text-gradient text-center text-7xl">{characters.character}</h1>
        {page !== "practice" && (
          <p className="text-2xl text-gradient text-center">
            Score: {score} | Time: {usedTime}
          </p>
        )}
        <Input
          type="text"
          autoFocus
          defaultValue=""
          className="mt-2 rounded-full w-1/3"
          onChange={handleInputChange}
        />
        {page === "practice" && (
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
