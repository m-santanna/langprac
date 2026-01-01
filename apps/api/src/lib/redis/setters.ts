import { Alphabet, GameMode, Player, Lobby } from "@repo/types/multiplayer"
import { createEmptyCharacter } from "@repo/types/lib/utils"
import { redis } from "./client"

/**
 * Creates a player in our redis cache.
 *
 * @param jwt The player's jwt to associate in the key
 * @param username The player's username
 */
export async function createPlayer({
  jwt,
  username,
}: {
  jwt: string
  username: string
}): Promise<void> {
  const key = `player:${jwt}:meta`
  const value: Player = {
    username: username,
    score: 0,
    usedTime: 0,
    isReady: 0,
    character: createEmptyCharacter(),
  }
  await redis.set(key, JSON.stringify(value))
}

/**
 * Creates a lobby in our redis cache.
 *
 * @param lobbyId The lobbyId to use as the key
 * @param playerJWT The player's jwt to register as the owner of the lobby
 * @param capacity The capacity of the lobby, i.e., max players allowed
 * @param alphabet The alphabet to be used
 * @param gamemode The gamemode to be used
 */
export async function createLobby({
  lobbyId,
  playerJWT,
  capacity,
  alphabet,
  gamemode,
}: {
  lobbyId: string
  playerJWT: string
  capacity?: number
  alphabet?: Alphabet
  gamemode?: GameMode
}): Promise<void> {
  const key = `lobby:${lobbyId}:meta`
  const value: Lobby = {
    owner: playerJWT,
    capacity: capacity ? capacity : 10,
    alphabet: alphabet ? alphabet : "kanji",
    gamemode: gamemode ? gamemode : "rush",
    gamephase: "lobby",
    usedTime: 0,
  }
  await redis.set(key, JSON.stringify(value))
  await redis.sadd(`lobby:${lobbyId}:players`, playerJWT)
}

/**
 * Joins a player in a given lobby, if that is possible.
 *
 * @param lobbyId - The id of the lobby to delete.
 * @param playerJWT - The JWT of the player requesting to leave.
 *
 * @returns -1 if lobbyId is invalid, 0 if the lobby is already full or 1 if successful
 */
export async function joinLobby({ playerJWT, lobbyId }: { playerJWT: string; lobbyId: string }) {
  const joinLobbyLuaScript = `
    -- KEYS[1] = players set
    -- KEYS[2] = meta key
    -- ARGV[1] = jwt

    local metaRaw = redis.call("GET", KEYS[2])
    if not metaRaw then
      return -1
    end

    local meta = cjson.decode(metaRaw)
    local max = meta.capacity

    local current = redis.call("SCARD", KEYS[1])
    if current >= max then
      return 0
    end

    redis.call("SADD", KEYS[1], ARGV[1])
    return 1
  `
  const result = await redis.eval(
    joinLobbyLuaScript,
    2,
    `lobby:${lobbyId}:players`,
    `lobby:${lobbyId}:meta`,
    playerJWT,
  )

  return result
}

/**
 * Leaves the lobby.
 * If the user leaving is the owner of the lobby, the lobby is
 * deleted and so are the players inside.
 *
 * @param lobbyId - The id of the lobby to delete.
 * @param playerJWT - The JWT of the player requesting to leave.
 */
export async function leaveLobby({ lobbyId, playerJWT }: { lobbyId: string; playerJWT: string }) {
  const lobbyMeta = await redis.get(`lobby:${lobbyId}:meta`)
  const parsedMeta: Lobby = JSON.parse(lobbyMeta!)
  if (parsedMeta.owner === playerJWT) deleteLobbyAndPlayers({ lobbyId })
  else {
    await redis.srem(`lobby:${lobbyId}:players`, playerJWT)
    await redis.del(`player:${playerJWT}:meta`)
  }
}

/**
 * Deletes the lobby and its players.
 *
 * @param lobbyId - The id of the lobby to delete.
 */
export async function deleteLobbyAndPlayers({ lobbyId }: { lobbyId: string }) {
  await redis.del(`lobby:${lobbyId}:meta`)
  const numOfPlayers = await redis.scard(`lobby:${lobbyId}:players`)
  for (let i = 0; i < numOfPlayers; i++) {
    const currJWT = await redis.spop(`lobby:${lobbyId}:players`)
    await redis.del(`player:${currJWT}:meta`)
  }
  await redis.del(`lobby:${lobbyId}:players`)
}
