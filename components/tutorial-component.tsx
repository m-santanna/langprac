import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

const TutorialComponent = ({
  title,
  description,
  router,
  initializeGame,
}: {
  title: string
  description: string
  router: AppRouterInstance
  initializeGame: () => void
}) => {
  return (
    <>
      <Button
        onClick={() => router.back()}
        className="rounded-full absolute top-24"
      >
        <ArrowLeft />
      </Button>
      <div className="flex flex-col items-center justify-center gap-4 h-full">
        <h1 className="text-gradient text-center text-7xl">{title}</h1>
        <p className="text-2xl text-gradient text-center">{description}</p>
        <Button
          size={"lg"}
          onClick={initializeGame}
          className="rounded-full text-lg mt-2"
        >
          Start Game
        </Button>
      </div>
    </>
  )
}
export default TutorialComponent
