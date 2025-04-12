import { atom } from "jotai"

export const gameModeAtom = atom("landing-page")
export const gamePhaseAtom = atom("tutorial")
export const scoreAtom = atom(0)
export const usedTimeAtom = atom(1000)
export const inputValueAtom = atom("")
export const katakanasAtom = atom({ kana: "", romaji: "" })

export const randomAtom = atom("random")
export const katakanaDeckAtom = atom("all")
export const stopwatchAtom = atom(0)
export const timerAtom = atom(60)
export const scoreGoalAtom = atom(50)
