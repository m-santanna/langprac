"use client"

import React from "react"
import { Button } from "./ui/button"
import { useSetAtom } from "jotai"
import { gameModeAtom } from "@/lib/atoms"

const Navbar = () => {
  const setGameMode = useSetAtom(gameModeAtom)
  return (
    <header className="fixed top-5 left-1/2 transform -translate-x-1/2 w-[80vw] md:w-full max-w-2xl z-10">
      <nav className="flex justify-between items-center p-4 bg-zinc-900 text-white h-16 rounded-3xl">
        <Button
          variant={"link"}
          onClick={() => setGameMode("landing-page")}
          className="font-bold text-lg"
        >
          practice-katakana
        </Button>
        <ul className="flex space-x-4">
          <li>
            <Button
              onClick={() => setGameMode("cheatsheet")}
              className="text-lg"
              variant={"link"}
            >
              Cheatsheet
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
