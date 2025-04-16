import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"

export const pageAtom = atom("landing-page")
export const gamePhaseAtom = atom("tutorial")
export const scoreAtom = atom(0)
export const usedTimeAtom = atom(1000)
export const stopwatchAtom = atom(0)
export const characterAtom = atom<{
  character: string
  romaji: string
  romajiVariant?: string
  meaning?: string
  meaningVariant?: string
}>({
  character: "",
  romaji: "",
})

export const alphabetAtom = atomWithStorage("alphabet", "kanji")
export const timerAtom = atomWithStorage("timer", 60)
export const scoreGoalAtom = atomWithStorage("scoreGoal", 50)
