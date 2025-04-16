import React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import { useAtom } from "jotai"
import { alphabetAtom, pageAtom } from "@/lib/atoms"

const NavbarAlphabet = () => {
  const [page, setPage] = useAtom(pageAtom)
  const [alphabet, setAlphabet] = useAtom(alphabetAtom)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link" className="hover:text-zinc-500 text-md border-none">
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
          <DropdownMenuRadioItem className="rounded-2xl" value="kanji">
            Kanji
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className="rounded-2xl" value="hiragana">
            Hiragana
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className="rounded-2xl" value="katakana">
            Katakana
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className="rounded-2xl" value="cyrillic">
            Cyrillic
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default NavbarAlphabet
