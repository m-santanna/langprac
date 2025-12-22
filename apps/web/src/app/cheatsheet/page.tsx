"use client"

import { alphabetAtom } from "@/lib/atoms"
import { useAtomValue } from "jotai"
import { capitalize, Character } from "@/lib/utils"
import { useHasMounted } from "@repo/ui/hooks/use-has-mounted"
import LoadingPage from "@/app/loading"
import { getCharacterList } from "@/lib/alphabet-map"

export default function Cheatsheet() {
  const hasMounted = useHasMounted()
  const alphabet = useAtomValue(alphabetAtom)
  const alphabetList: Character[] = getCharacterList(alphabet)

  if (!hasMounted) return <LoadingPage />
  return (
    <section className="p-4 md:p-8 w-[90vw] md:w-[80vw] h-full mx-auto mt-24 md:mt-20">
      <h1 className="text-6xl text-gradient text-center animate-in fade-in zoom-in duration-300">
        {capitalize(alphabet)}
      </h1>
      <p className="text-lg md:text-xl text-center mt-8 animate-in fade-in zoom-in duration-300">
        These are all the {alphabet}s we have in our server, with their corresponding romaji
        {alphabet === "kanji" ? " and meaning!" : "."}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-12">
        {alphabetList.map((item) => (
          <div
            key={item.character}
            className="bg-slate-800 p-4 shadow-md text-center animate-in fade-in zoom-in duration-500"
          >
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
