"use client"

import { katakanaList, hiraganaList, cyrillicList, kanjiList } from "@/lib/alphabets"
import { alphabetAtom } from "@/lib/atoms"
import { useAtomValue } from "jotai"

export default function Cheatsheet() {
  const alphabet = useAtomValue(alphabetAtom)
  const alphabetList: {
    character: string
    romaji: string
    romajiVariant?: string
    meaning?: string
    meaningVariant?: string
  }[] =
    alphabet === "katakana"
      ? katakanaList
      : alphabet === "hiragana"
      ? hiraganaList
      : alphabet === "kanji"
      ? kanjiList
      : cyrillicList

  return (
    <section className="p-4 md:p-8 w-[90vw] md:w-[80vw] h-full mx-auto mt-20">
      <h1 className="text-4xl md:text-6xl text-gradient text-center">Remember your {alphabet}</h1>
      <p className="text-lg md:text-xl text-center mt-8">
        The following sheet will help you remember each character and its corresponding romaji.
      </p>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mt-12">
        {alphabetList.map((item) => (
          <div key={item.character} className="bg-slate-800 p-4 shadow-md text-center">
            <h2 className="text-2xl">{item.character}</h2>
            {item.romajiVariant ? (
              <p className="text-lg">
                {item.romaji} / {item.romajiVariant}
              </p>
            ) : (
              <p className="text-lg">{item.romaji}</p>
            )}
            {item.meaningVariant ? (
              <p className="text-sm text-gray-400">
                {item.meaning} / {item.meaningVariant}
              </p>
            ) : (
              <p className="text-sm text-gray-400">{item.meaning}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
