import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const randomKatakana = (
  katakanaList: { kana: string; romaji: string }[],
) => {
  const randomIndex = Math.floor(Math.random() * katakanaList.length)
  return katakanaList[randomIndex]
}
