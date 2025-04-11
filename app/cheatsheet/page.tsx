import { katakanaList } from "@/lib/katakana"

export default function Home() {
  return (
    <section className="p-8 w-[80vw] h-full mx-auto mt-20">
      <h1 className="text-6xl text-gradient text-center">
        Remember your Katakana
      </h1>
      <p className="text-xl text-center mt-8">
        The following sheet will help you remember each katakana and its
        corresponding romanji.
      </p>
      <div className="grid grid-cols-5 gap-4 mt-12">
        {katakanaList.map((item) => (
          <div
            key={item.kana}
            className="bg-slate-800 p-4 rounded-lg shadow-md text-center"
          >
            <h2 className="text-xl">{item.kana}</h2>
            <p className="text-lg">{item.romaji}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
