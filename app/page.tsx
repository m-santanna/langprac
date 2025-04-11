import { Button } from "@/components/ui/button"
import Link from "next/link"
import React from "react"

const page = () => {
  return (
    <section className="h-screen w-screen">
      <div className="flex flex-col items-center justify-center gap-4 h-full">
        <h1 className="text-7xl text-gradient">Welcome!</h1>
        <p className="text-gradient text-2xl text-center">
          Select a game mode to practice your katakana knowledge.
        </p>
        <div className="flex justify-between items-center gap-4 mt-2">
          <Button size={"lg"} asChild className="rounded-full text-lg">
            <Link href="/rush">Rush</Link>
          </Button>
          <Button size={"lg"} asChild className="rounded-full text-lg">
            <Link href={"/goal"}>Goal</Link>
          </Button>
          <Button size={"lg"} asChild className="rounded-full text-lg">
            <Link href={"/practice"}>Practice</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default page
