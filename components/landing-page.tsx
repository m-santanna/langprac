"use client"

import { Button } from "@/components/ui/button"
import React from "react"
import { useAtomValue, useSetAtom } from "jotai"
import { alphabetAtom, pageAtom, gamePhaseAtom } from "@/lib/atoms"

export default function LandingPage() {
  const setPage = useSetAtom(pageAtom)
  const setGamePhase = useSetAtom(gamePhaseAtom)
  const alphabet = useAtomValue(alphabetAtom)
  return (
    <section className="h-[calc(100vh-80px)] md:h-screen w-screen p-4 md:p-8">
      <div className="flex flex-col items-center justify-center gap-4 h-full">
        <h1 className="text-7xl text-gradient">Welcome!</h1>
        <p className="text-gradient text-2xl text-center">
          Select a game mode to enhance your {alphabet} knowledge.
        </p>
        <div className="flex justify-between items-center gap-2 mt-2">
          <Button
            size={"lg"}
            onClick={() => {
              setPage("practice")
              setGamePhase("tutorial")
            }}
            className="rounded-full text-lg"
          >
            Practice
          </Button>
          <Button
            size={"lg"}
            onClick={() => {
              setPage("rush")
              setGamePhase("tutorial")
            }}
            className="rounded-full text-lg"
          >
            Rush
          </Button>
          <Button
            size={"lg"}
            onClick={() => {
              setPage("goal")
              setGamePhase("tutorial")
            }}
            className="rounded-full text-lg"
          >
            Goal
          </Button>
        </div>
      </div>
    </section>
  )
}
