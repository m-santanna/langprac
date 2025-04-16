"use client"

import { Button } from "./ui/button"
import { useSetAtom } from "jotai"
import { pageAtom } from "@/lib/atoms"
import { Home } from "lucide-react"
import NavbarAlphabet from "./navbar-alphabet"

const Navbar = () => {
  const setPage = useSetAtom(pageAtom)
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
        <div className="flex gap-1">
          <Button
            onClick={() => setPage("cheatsheet")}
            className="text-md hover:text-zinc-500"
            variant={"link"}
          >
            Cheatsheet
          </Button>
          <NavbarAlphabet />
        </div>
      </nav>
    </header>
  )
}

export default Navbar
