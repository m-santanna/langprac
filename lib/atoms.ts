import { atom } from "jotai"

export const pageAtom = atom("landing-page")
export const gamePhaseAtom = atom("tutorial")
export const scoreAtom = atom(0)
export const usedTimeAtom = atom(1000)
export const charactersAtom = atom({ character: "", romaji: "" })

export const alphabetAtom = atom("katakana")
export const randomAtom = atom("random")
export const stopwatchAtom = atom(0)
export const timerAtom = atom(60)
export const scoreGoalAtom = atom(50)
