import { Button } from "@repo/ui/components/button"
import Link from "next/link"

export default function LandingPage() {
  return (
    <section className="h-[calc(100vh-80px)] md:h-screen w-screen p-4 md:p-8 animate-in fade-in zoom-in duration-300">
      <div className="flex flex-col items-center justify-center gap-6 sm:gap-4 h-full">
        <h1 className="text-5xl sm:text-7xl text-gradient">Welcome!</h1>
        <p className="text-gradient text-lg sm:text-2xl text-center">
          You can play alone or create a lobby to play with up to 4 friends.
        </p>
        <div className="flex justify-between items-center gap-2 mt-2">
          <Link href="/singleplayer" className="rounded-full">
            <Button>Solo</Button>
          </Link>
          <Link href="/multiplayer" className="rounded-full">
            <Button>Lobby</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
