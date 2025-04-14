import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"

export const pageAtom = atom("landing-page")
export const gamePhaseAtom = atom("tutorial")
export const scoreAtom = atom(0)
export const usedTimeAtom = atom(1000)
export const stopwatchAtom = atom(0)
export const loadedAtom = atom(false)
export const charactersAtom = atom<{ character: string; romaji: string; romajiVariant?: string }>({
  character: "",
  romaji: "",
})

export const alphabetAtom = atomWithStorage("alphabet", "katakana")
export const timerAtom = atomWithStorage("timer", 60)
export const scoreGoalAtom = atomWithStorage("scoreGoal", 50)
