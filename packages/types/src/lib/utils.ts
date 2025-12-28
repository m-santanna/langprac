import { Character } from "../character.js"

export function createEmptyCharacter(): Character {
  return { character: "", romaji: "", romajiVariant: "", meaning: "", meaningVariant: "" }
}
