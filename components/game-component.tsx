import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Input } from "@/components/ui/input"

const GameComponent = ({
  gameMode,
  states,
  setStates,
  checkCorrect,
}: {
  gameMode: string
  states: {
    katakanas: { kana: string; romaji: string }
    score: number
    gamePhase: string
    time: number
    inputValue: string
  }
  setStates: React.Dispatch<
    React.SetStateAction<{
      katakanas: {
        kana: string
        romaji: string
      }
      score: number
      gamePhase: string
      time: number
      inputValue: string
    }>
  >
  checkCorrect: () => void
}) => {
  return (
    <>
      <Button
        onClick={() =>
          setStates((prevStates) => ({
            ...prevStates,
            gamePhase: "tutorial",
          }))
        }
        className="rounded-full absolute top-24"
      >
        <ArrowLeft />
      </Button>
      <div className="flex flex-col items-center justify-center gap-4 h-full">
        <h1 className="text-gradient text-center text-7xl">
          {states.katakanas.kana}
        </h1>
        {gameMode !== "practice" && (
          <p className="text-2xl text-gradient text-center">
            Score: {states.score} | Time: {states.time}
          </p>
        )}
        <Input
          type="text"
          autoFocus
          className="mt-2 rounded-full w-1/3"
          value={states.inputValue}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              checkCorrect()
            }
          }}
          onChange={(e) => {
            setStates((prevStates) => ({
              ...prevStates,
              inputValue: e.target.value,
            }))
          }}
        />
        {gameMode === "practice" && (
          <Button
            size={"lg"}
            className="rounded-full text-lg mt-2"
            onClick={() =>
              setStates((prevStates) => ({
                ...prevStates,
                gamePhase: "gameover",
              }))
            }
          >
            Enough!
          </Button>
        )}
      </div>
    </>
  )
}

export default GameComponent
