"use client"

import { Button } from "@/components/ui/button"
import { useAtomValue, useSetAtom } from "jotai"
import { alphabetAtom, gameModeAtom, gamePhaseAtom } from "@/lib/atoms"

export default function LandingPage() {
  const setGameMode = useSetAtom(gameModeAtom)
  const setGamePhase = useSetAtom(gamePhaseAtom)
  const alphabet = useAtomValue(alphabetAtom)

  return (
    <section className="h-[calc(100vh-80px)] md:h-screen w-screen p-4 md:p-8 animate-in fade-in zoom-in duration-300">
      <div className="flex flex-col items-center justify-center gap-6 sm:gap-4 h-full">
        <h1 className="text-5xl sm:text-7xl text-gradient">Singleplayer</h1>
        <p className="text-gradient text-xl sm:text-2xl text-center">
          Select a game mode to enhance your {alphabet} knowledge.
        </p>
        <div className="flex justify-between items-center gap-2 mt-2">
          <Button
            onClick={() => {
              setGameMode("rush")
              setGamePhase("tutorial")
            }}
          >
            Rush
          </Button>
          <Button
            onClick={() => {
              setGameMode("practice")
              setGamePhase("tutorial")
            }}
          >
            Practice
          </Button>
          <Button
            onClick={() => {
              setGameMode("target-score")
              setGamePhase("tutorial")
            }}
          >
            Goal
          </Button>
        </div>
      </div>
    </section>
  )
}
