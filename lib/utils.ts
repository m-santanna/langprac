import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const randomCharacter = (characterList: { character: string; romaji: string }[]) => {
  const randomIndex = Math.floor(Math.random() * characterList.length)
  return characterList[randomIndex]
}

export function capitalize(str: string): string {
  if (!str) return ""
  return str[0].toUpperCase() + str.slice(1)
}
