"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAtom, useAtomValue } from "jotai"
import { scoreGoalAtom, timerAtom, pageAtom } from "@/lib/atoms"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const OptionsComponent = () => {
  const [scoreGoal, setScoreGoal] = useAtom(scoreGoalAtom)
  const [timer, setTimer] = useAtom(timerAtom)
  const page = useAtomValue(pageAtom)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"lg"} variant={"outline"} className="rounded-full text-lg">
          Options
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-30 rounded-2xl">
        {page === "rush" && (
          <>
            <DropdownMenuLabel className="text-center">Timer</DropdownMenuLabel>
            <Input
              type="number"
              placeholder="Min 10sec"
              className="w-full rounded-2xl appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
              onChange={(e) => {
                const value = parseInt(e.target.value)
                if (value >= 20) {
                  setTimer(value)
                }
              }}
              defaultValue={timer}
              min={10}
              max={240}
              step={5}
            />
          </>
        )}
        {page === "goal" && (
          <>
            <DropdownMenuLabel className="text-center">Score Goal</DropdownMenuLabel>
            <Input
              type="number"
              placeholder="Min 15"
              className="w-full rounded-2xl appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
              onChange={(e) => {
                const value = parseInt(e.target.value)
                if (value >= 15) {
                  setScoreGoal(value)
                }
              }}
              defaultValue={scoreGoal}
              min={15}
              max={100}
              step={5}
            />
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default OptionsComponent
