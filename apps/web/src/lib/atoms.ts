import { Character } from "@repo/types/character"
import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"

export const gameModeAtom = atom("landing-page")
export const gamePhaseAtom = atom("tutorial")
export const scoreAtom = atom(0)
export const usedTimeAtom = atom(1000)
export const stopwatchAtom = atom(0)
export const characterAtom = atom<Character>({
  character: "",
  romaji: "",
})

export const usernameAtom = atomWithStorage("username", "")
export const alphabetAtom = atomWithStorage("alphabet", "kanji")
export const timerAtom = atomWithStorage("timer", 60)
export const targetScoreAtom = atomWithStorage("target-score", 50)
