"use client"

import React from "react"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAtom } from "jotai"
import { alphabetAtom, pageAtom } from "@/lib/atoms"
import { Home } from "lucide-react"

const Navbar = () => {
  const [page, setPage] = useAtom(pageAtom)
  const [alphabet, setAlphabet] = useAtom(alphabetAtom)
  return (
    <header className="fixed top-5 left-1/2 transform -translate-x-1/2 w-[80vw] md:w-full max-w-2xl z-10">
      <nav className="flex justify-between items-center p-4 bg-zinc-900 text-white h-16 rounded-3xl">
        <Button
          variant={"link"}
          onClick={() => setPage("landing-page")}
          className="text-lg hover:text-zinc-500"
        >
          <Home className="size-6" />
        </Button>
        <ul className="flex space-x-4">
          <li>
            <Button onClick={() => setPage("cheatsheet")} className="text-md" variant={"link"}>
              Cheatsheet
            </Button>
          </li>
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="link" className="text-md border-none">
                  Alphabet
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-30 rounded-2xl">
                <DropdownMenuRadioGroup
                  value={alphabet}
                  onValueChange={(value) => {
                    setAlphabet(value)
                    if (page !== "cheatsheet") setPage("landing-page")
                  }}
                >
                  <DropdownMenuRadioItem className="rounded-2xl" value="katakana">
                    Katakana
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem className="rounded-2xl" value="hiragana">
                    Hiragana
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem className="rounded-2xl" value="kanji">
                    Kanji
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem className="rounded-2xl" value="cyrillic">
                    Cyrillic
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
