import { Button } from "@/components/ui/button"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

const GameOverComponent = ({
  gameMode,
  states,
  router,
  initializeGame,
}: {
  gameMode: string
  states: {
    katakanas: { kana: string; romaji: string }
    score: number
    gamePhase: string
    time: number
    inputValue: string
  }
  router: AppRouterInstance
  initializeGame: () => void
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-full">
      <h1 className="text-gradient text-center text-7xl">Game Over</h1>
      <p className="text-2xl text-gradient text-center">
        {gameMode === "goal" && (
          <span>Your final time is {states.time} secs.</span>
        )}
        {gameMode === "rush" && (
          <span>Your final score is {states.score}.</span>
        )}
        {gameMode === "practice" && (
          <span>
            You did {states.score} katakanas in {states.time} secs.
          </span>
        )}
      </p>
      <div className="flex gap-4 mt-2">
        <Button onClick={initializeGame} className="rounded-full text-lg">
          Restart
        </Button>
        <Button onClick={router.back} className="rounded-full text-lg">
          Go Back
        </Button>
      </div>
    </div>
  )
}

export default GameOverComponent
