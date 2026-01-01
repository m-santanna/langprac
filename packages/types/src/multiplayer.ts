import z from "zod"
import { characterSchema } from "./character.js"

export const alphabetSchema = z.literal(["kanji", "katakana", "hiragana", "cyrillic"])
export type Alphabet = z.infer<typeof alphabetSchema>

export const gamemodeSchema = z.literal(["rush", "target-score"])
export type GameMode = z.infer<typeof gamemodeSchema>

export const gamephaseSchema = z.literal(["lobby", "in-game"])
export type GamePhase = z.infer<typeof gamephaseSchema>

export const lobbyCapacitySchema = z.coerce.number().min(2).max(10)
export type LobbyCapacity = z.infer<typeof lobbyCapacitySchema>

export const lobbyPlayersSchema = z.string().array()
export type LobbyPlayers = z.infer<typeof lobbyPlayersSchema>

export const lobbySchema = z.object({
  owner: z.string(),
  usedTime: z.number().min(0),
  alphabet: alphabetSchema,
  gamemode: gamemodeSchema,
  gamephase: gamephaseSchema,
  capacity: lobbyCapacitySchema,
})
export type Lobby = z.infer<typeof lobbySchema>

export const playerSchema = z.object({
  username: z.string(),
  character: characterSchema,
  isReady: z.number().min(0).max(1),
  score: z.number().min(0),
  usedTime: z.number().min(0),
})
export type Player = z.infer<typeof playerSchema>
