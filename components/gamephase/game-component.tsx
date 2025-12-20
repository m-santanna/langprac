import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { useState } from "react"
import {
  gamePhaseAtom,
  characterAtom,
  scoreAtom,
  usedTimeAtom,
  alphabetAtom,
  gameModeAtom,
} from "@/lib/atoms"
import { Character, randomCharacter } from "@/lib/utils"
import { getCharacterList } from "@/lib/alphabet-map"

const GameComponent = () => {
  const gamemode = useAtomValue(gameModeAtom)
  const alphabet = useAtomValue(alphabetAtom)
  const setGamePhase = useSetAtom(gamePhaseAtom)
  const [character, setCharacter] = useAtom(characterAtom)
  const [score, setScore] = useAtom(scoreAtom)
  const usedTime = useAtomValue(usedTimeAtom)
  const [showAnswer, setShowAnswer] = useState(false)
  const characterList: Character[] = getCharacterList(alphabet)

  document.onkeydown = (e) => {
    if (e.key === "Enter" && gamemode === "practice") {
      if (showAnswer) {
        setCharacter(randomCharacter(characterList, character))
      }
      setShowAnswer(!showAnswer)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const processedInput = e.target.value.toLowerCase().trim()

    if (
      processedInput === character.romaji ||
      processedInput === character.romajiVariant ||
      processedInput === character.meaning ||
      processedInput === character.meaningVariant
    ) {
      setScore((prevScore) => prevScore + 1)
      setCharacter(randomCharacter(characterList, character))
      e.target.value = ""
    }
  }

  if (!showAnswer)
    return (
      <>
        <Button onClick={() => setGamePhase("tutorial")} className="rounded-full absolute top-24">
          <ArrowLeft />
        </Button>
        <div className="flex flex-col items-center justify-center gap-4 h-full">
          <h1 className="text-gradient text-center text-7xl">{character.character}</h1>
          {gamemode !== "practice" && (
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
          {gamemode === "practice" && (
            <div className="flex gap-2 mt-2">
              <Button onClick={() => setShowAnswer(true)}>Show Answer</Button>
              <Button variant={"outline"} onClick={() => setGamePhase("gameover")}>
                End
              </Button>
            </div>
          )}
        </div>
      </>
    )
  return (
    <>
      <Button onClick={() => setGamePhase("tutorial")} className="rounded-full absolute top-24">
        <ArrowLeft />
      </Button>
      <div className="flex flex-col items-center justify-center gap-4 h-full">
        <h1 className="text-gradient text-center text-7xl">{character.character}</h1>
        <p className="text-2xl text-gradient text-center">
          {character.romaji}
          {character.romajiVariant && <> / {character.romajiVariant}</>}
          <br />
          {character.meaning}
          {character.meaningVariant && <> / {character.meaningVariant}</>}
        </p>
        <div className="flex gap-2 mt-2">
          <Button
            onClick={() => {
              setCharacter(randomCharacter(characterList, character))
              setShowAnswer(false)
            }}
          >
            Continue
          </Button>
          <Button onClick={() => setGamePhase("gameover")}>End</Button>
        </div>
      </div>
    </>
  )
}

export default GameComponent
