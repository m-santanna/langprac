import { Button } from "@/components/ui/button"
import Link from "next/link"
import React from "react"

const page = () => {
  return (
    <section className="h-[calc(100vh-128px)] md:h-screen w-screen p-4 md:p-8">
      <div className="flex flex-col items-center justify-center gap-4 h-full">
        <h1 className="text-7xl text-gradient">Welcome!</h1>
        <p className="text-gradient text-2xl text-center">
          Select a game mode to enhance your katakana knowledge.
        </p>
        <div className="flex justify-between items-center gap-2 mt-2">
          <Button size={"lg"} asChild className="rounded-full text-lg">
            <Link href={"/practice"}>Practice</Link>
          </Button>
          <Button size={"lg"} asChild className="rounded-full text-lg">
            <Link href="/rush">Rush</Link>
          </Button>
          <Button size={"lg"} asChild className="rounded-full text-lg">
            <Link href={"/goal"}>Goal</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default page
