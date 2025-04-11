export const katakanaList = [
  // A-row
  { kana: "ア", romaji: "a" },
  { kana: "イ", romaji: "i" },
  { kana: "ウ", romaji: "u" },
  { kana: "エ", romaji: "e" },
  { kana: "オ", romaji: "o" },

  // K-row
  { kana: "カ", romaji: "ka" },
  { kana: "キ", romaji: "ki" },
  { kana: "ク", romaji: "ku" },
  { kana: "ケ", romaji: "ke" },
  { kana: "コ", romaji: "ko" },

  // S-row
  { kana: "サ", romaji: "sa" },
  { kana: "シ", romaji: "shi" },
  { kana: "ス", romaji: "su" },
  { kana: "セ", romaji: "se" },
  { kana: "ソ", romaji: "so" },

  // T-row
  { kana: "タ", romaji: "ta" },
  { kana: "チ", romaji: "chi" },
  { kana: "ツ", romaji: "tsu" },
  { kana: "テ", romaji: "te" },
  { kana: "ト", romaji: "to" },

  // N-row
  { kana: "ナ", romaji: "na" },
  { kana: "ニ", romaji: "ni" },
  { kana: "ヌ", romaji: "nu" },
  { kana: "ネ", romaji: "ne" },
  { kana: "ノ", romaji: "no" },

  // H-row
  { kana: "ハ", romaji: "ha" },
  { kana: "ヒ", romaji: "hi" },
  { kana: "フ", romaji: "hu" },
  { kana: "ヘ", romaji: "he" },
  { kana: "ホ", romaji: "ho" },

  // M-row
  { kana: "マ", romaji: "ma" },
  { kana: "ミ", romaji: "mi" },
  { kana: "ム", romaji: "mu" },
  { kana: "メ", romaji: "me" },
  { kana: "モ", romaji: "mo" },

  // R-row
  { kana: "ラ", romaji: "ra" },
  { kana: "リ", romaji: "ri" },
  { kana: "ル", romaji: "ru" },
  { kana: "レ", romaji: "re" },
  { kana: "ロ", romaji: "ro" },

  // Y-row
  { kana: "ヤ", romaji: "ya" },
  { kana: "ユ", romaji: "yu" },
  { kana: "ヨ", romaji: "yo" },

  // W-row
  { kana: "ワ", romaji: "wa" },
  { kana: "ヲ", romaji: "wo" },

  // N
  { kana: "ン", romaji: "n" },
]

export const katakanaDakuten = [
  // G-row
  { kana: "ガ", romaji: "ga" },
  { kana: "ギ", romaji: "gi" },
  { kana: "グ", romaji: "gu" },
  { kana: "ゲ", romaji: "ge" },
  { kana: "ゴ", romaji: "go" },

  // Z-row
  { kana: "ザ", romaji: "za" },
  { kana: "ジ", romaji: "ji" },
  { kana: "ズ", romaji: "zu" },
  { kana: "ゼ", romaji: "ze" },
  { kana: "ゾ", romaji: "zo" },

  // D-row
  { kana: "ダ", romaji: "da" },
  { kana: "ヂ", romaji: "ji" },
  { kana: "ヅ", romaji: "zu" },
  { kana: "デ", romaji: "de" },
  { kana: "ド", romaji: "do" },

  // B-row
  { kana: "バ", romaji: "ba" },
  { kana: "ビ", romaji: "bi" },
  { kana: "ブ", romaji: "bu" },
  { kana: "ベ", romaji: "be" },
  { kana: "ボ", romaji: "bo" },

  { kana: "パ", romaji: "pa" },
  { kana: "ピ", romaji: "pi" },
  { kana: "プ", romaji: "pu" },
  { kana: "ペ", romaji: "pe" },
  { kana: "ポ", romaji: "po" },
]

export const katakanaHandakuten = [
  { kana: "パ", romaji: "pa" },
  { kana: "ピ", romaji: "pi" },
  { kana: "プ", romaji: "pu" },
  { kana: "ペ", romaji: "pe" },
  { kana: "ポ", romaji: "po" },
]

export const fullKatakanaList = [
  ...katakanaList,
  ...katakanaDakuten,
  ...katakanaHandakuten,
]
