import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

type Character = {
  character: string
  romaji: string
  romajiVariant?: string
  meaning?: string
  meaningVariant?: string
}
type CharacterList = Character[]

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const randomCharacter = (characterList: CharacterList, character?: Character): Character => {
  const index = Math.floor(Math.random() * characterList.length)
  const picked = characterList[index]
  if (character && character.character === picked.character) {
    return randomCharacter(characterList, character)
  }
  return characterList[index]
}

export function capitalize(str: string): string {
  if (!str) return ""
  return str[0].toUpperCase() + str.slice(1)
}
