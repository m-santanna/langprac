import { Elysia, t } from "elysia"
import { jwt } from "@elysiajs/jwt"
import { createPlayer, createLobby, joinLobby, leaveLobby } from "./lib/redis/setters"
import { cors } from "@elysiajs/cors"
import { z } from "zod"
import { alphabetSchema, gamemodeSchema, lobbyCapacitySchema } from "@repo/types/multiplayer"
import { isPlayerInLobby } from "./lib/redis/getters"

const sessionCookieSchema = {
  cookie: t.Cookie({
    session: t.Optional(t.String()),
  }),
}

const app = new Elysia()
  .use(
    cors({
      //origin: /.*\.langprac\.vercel.app$/,
      origin: "http://localhost:3000",
      credentials: true,
    }),
  )
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET!,
      schema: t.Object({
        username: t.String(),
        lobbyId: t.String(),
      }),
    }),
  )
  .get(
    "/check-session",
    async ({ jwt, cookie: { session }, status }) => {
      if (!session || !session.value) {
        return status(201, { isInLobby: false, lobbyId: undefined })
      }
      const payload = await jwt.verify(session.value)
      if (!payload) {
        session.remove()
        return status(202, { isInLobby: false, lobbyId: undefined })
      }

      if (
        await isPlayerInLobby({
          playerJWT: session.value,
          lobbyId: payload.lobbyId,
        })
      )
        return status(203, { isInLobby: true, lobbyId: payload.lobbyId })
      else {
        session.remove()
        return status(204, { isInLobby: false, lobbyId: undefined })
      }
    },
    sessionCookieSchema,
  )
  .post(
    "/create-lobby",
    async ({
      jwt,
      cookie: { session },
      body: { username, alphabet, capacity, gamemode },
      status,
    }) => {
      const lobbyId = crypto.randomUUID()
      const token = await jwt.sign({ username, lobbyId })

      await createPlayer({ jwt: token, username: username })
      await createLobby({ lobbyId, alphabet, capacity, gamemode, playerJWT: token })
      session.set({
        value: token,
        httpOnly: true,
        maxAge: 60 * 60, // 1 hour
        secure: false,
        sameSite: "lax",
      })
      return status("Created", { lobbyId })
    },
    {
      body: z.object({
        username: z.string().min(4),
        alphabet: alphabetSchema,
        capacity: lobbyCapacitySchema,
        gamemode: gamemodeSchema,
      }),
    },
  )
  .post(
    "/join-lobby",
    async ({ jwt, cookie: { session }, body: { username, lobbyId }, status }) => {
      if (lobbyId.startsWith("http")) {
        lobbyId = lobbyId.split("/").filter(Boolean).pop()!
      }
      const token = await jwt.sign({ username, lobbyId })

      const res = await joinLobby({ playerJWT: token, lobbyId })
      if (res === -1) return status("Locked", { error: "Invalid lobbyId" })
      if (res === 0) return status("Locked", { error: "Lobby full" })

      await createPlayer({ jwt: token, username })
      session.set({
        value: token,
        httpOnly: true,
        maxAge: 60 * 60, // 1 hour
        secure: false,
        sameSite: "lax",
      })
      return status("OK", { lobbyId: lobbyId })
    },
    {
      body: z.object({
        username: z.string(),
        lobbyId: z.string(),
      }),
    },
  )
  .post(
    "/leave-lobby",
    async ({ jwt, cookie: { session }, status }) => {
      if (!session || !session.value) {
        return status("Not Acceptable", { error: "Cookie not found" })
      }
      const payload = await jwt.verify(session.value)
      if (!payload) return status("Not Acceptable", { error: "JWT verification fail" })

      await leaveLobby({ lobbyId: payload.lobbyId, playerJWT: session.value })
      session.remove()
      return status("OK")
    },
    sessionCookieSchema,
  )
  .post(
    "/reconnect",
    async ({ jwt, cookie: { session }, status }) => {
      if (!session || !session.value) return status("Not Acceptable", { error: "Cookie not found" })
      const payload = await jwt.verify(session.value)
      if (!payload) return status("Not Acceptable", { error: "JWT verification fail" })
      return status("OK", { lobbyId: payload.lobbyId })
    },
    sessionCookieSchema,
  )
  .listen({
    port: 8080,
    hostname: "localhost",
  })

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
