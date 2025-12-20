"use client"

import React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { useAtom } from "jotai"
import { alphabetAtom } from "@/lib/atoms"
import { Home } from "lucide-react"
import Link from "next/link"

const dropdownMenuRadioList: { value: string; label: string }[] = [
  { value: "kanji", label: "Kanji" },
  { value: "hiragana", label: "Hiragana" },
  { value: "katakana", label: "Katakana" },
  { value: "cyrillic", label: "Cyrillic" },
]

const AlphabetDropdown = () => {
  const [alphabet, setAlphabet] = useAtom(alphabetAtom)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:text-zinc-500 hover:cursor-pointer">
        Alphabet
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-30 rounded-2xl">
        <DropdownMenuRadioGroup value={alphabet} onValueChange={(value) => setAlphabet(value)}>
          {dropdownMenuRadioList.map((elem, idx) => (
            <DropdownMenuRadioItem key={idx} className="rounded-2xl" value={elem.value}>
              {elem.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const Navbar = () => {
  return (
    <header className="fixed top-5 left-1/2 transform -translate-x-1/2 w-[80vw] md:w-full max-w-2xl z-10">
      <nav className="flex justify-between items-center py-4 px-8 bg-zinc-900 text-white h-16 rounded-3xl">
        <Link href="/" className="hover:text-zinc-500">
          <Home className="size-7" />
        </Link>
        <div className="flex gap-6 items-center">
          <Link href="/cheatsheet" className="hover:text-zinc-500">
            Cheatsheet
          </Link>
          <AlphabetDropdown />
        </div>
      </nav>
    </header>
  )
}

export default Navbar
