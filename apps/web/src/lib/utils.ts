import { Character } from "@repo/types/character"

export const randomCharacter = (characterList: Character[], character?: Character): Character => {
  const index = Math.floor(Math.random() * characterList.length)
  const picked = characterList[index]!

  // this checks makes sure we never return the same character the user just played
  if (character && character.character === picked.character) {
    return randomCharacter(characterList, character)
  }
  return characterList[index]!
}

export function capitalize(str: string): string {
  return str[0]!.toUpperCase() + str.slice(1)
}
