"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAtom, useAtomValue } from "jotai"
import { gameModeAtom, targetScoreAtom, timerAtom } from "@/lib/atoms"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const OptionsComponent = () => {
  const gamemode = useAtomValue(gameModeAtom)
  const [targetScore, setTargetScore] = useAtom(targetScoreAtom)
  const [timer, setTimer] = useAtom(timerAtom)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"}>Options</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-30 rounded-2xl">
        {gamemode === "rush" && (
          <>
            <DropdownMenuLabel className="text-center">Timer</DropdownMenuLabel>
            <Input
              type="number"
              placeholder="Min 10 secs"
              className="w-full rounded-2xl appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
              onChange={(e) => {
                const value = parseInt(e.target.value)
                if (value >= 10) {
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
        {gamemode === "target-score" && (
          <>
            <DropdownMenuLabel className="text-center">Target Score</DropdownMenuLabel>
            <Input
              type="number"
              placeholder="Min 15"
              className="w-full rounded-2xl appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
              onChange={(e) => {
                const value = parseInt(e.target.value)
                if (value >= 15) {
                  setTargetScore(value)
                }
              }}
              defaultValue={targetScore}
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
