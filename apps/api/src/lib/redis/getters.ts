import { redis } from "./client"

/**
 * Checks if the given player is inside the given lobby
 *
 * @param playerJWT The playerJWT to check
 * @param lobbyId The lobbyId to check
 *
 * @returns true if check is successful, false otherwise
 */
export async function isPlayerInLobby({
  lobbyId,
  playerJWT,
}: {
  lobbyId: string
  playerJWT: string
}): Promise<boolean> {
  const response = await redis.sismember(`lobby:${lobbyId}:players`, playerJWT)
  return response === 0 ? false : true
}

/**
 * Checks if the given lobby is empty or not.
 *
 * @param lobbyId The lobbyId to check
 *
 * @returns true if check is successful, false otherwise
 */
export async function isLobbyEmpty({ lobbyId }: { lobbyId: string }): Promise<boolean> {
  const response = await redis.scard(`lobby:${lobbyId}:players`)
  return response === 0
}
