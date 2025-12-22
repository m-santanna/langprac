import { Character } from "@repo/types/character"
import { cyrillicList, hiraganaList, kanjiList, katakanaList } from "./alphabets"

export const alphabetMap: Map<string, Character[]> = new Map()
alphabetMap.set("hiragana", hiraganaList)
alphabetMap.set("katakana", katakanaList)
alphabetMap.set("kanji", kanjiList)
alphabetMap.set("cyrillic", cyrillicList)

export function getCharacterList(alphabetName: string): Character[] {
  let alphabet = alphabetMap.get(alphabetName)
  if (!alphabet) alphabet = kanjiList
  return alphabet
}
