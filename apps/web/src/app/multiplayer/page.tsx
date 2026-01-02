"use client"

import CreateLobbyDialog from "@/components/multiplayer/landing-page/create-lobby-dialog"
import JoinLobbyDialog from "@/components/multiplayer/landing-page/join-lobby-dialog"
import { Button } from "@repo/ui/components/button"
import { Skeleton } from "@repo/ui/components/skeleton"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function MultiplayerPage() {
  const queryClient = useQueryClient()
  const router = useRouter()

  const handleCheckSession = async () => {
    if (process.env.NEXT_PUBLIC_MULTIPLAYER_STATE === "development") {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL! + "/check-session", {
        method: "GET",
        credentials: "include",
      })
      console.log(res)
      return await res.json()
    } else {
      return { isInLobby: false }
    }
  }

  const handleLeave = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL! + "/leave-lobby", {
      method: "POST",
      credentials: "include",
    })
    console.log(res)
    if (res.status === 200) {
      queryClient.invalidateQueries({ queryKey: ["check-session"] })
      return await res.json()
    }
  }

  const handleReconnect = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL! + "/reconnect", {
      method: "POST",
      credentials: "include",
    }).then((res) => res.json())
    router.push(`/multiplayer/${res.lobbyId}`)
  }

  const { data, isPending } = useQuery({
    queryKey: ["check-session"],
    queryFn: handleCheckSession,
  })

  if (process.env.NEXT_PUBLIC_MULTIPLAYER_STATE === "prod")
    return (
      <section className="h-[calc(100vh-80px)] md:h-screen w-screen p-4 md:p-8 animate-in fade-in zoom-in duration-300">
        <div className="flex flex-col items-center justify-center gap-6 sm:gap-4 h-full">
          <h1 className="text-5xl sm:text-7xl text-gradient">Multiplayer</h1>
          <p className="text-gradient text-lg sm:text-2xl text-center">
            Currently under development! Come back later!
          </p>
          <div className="flex justify-between items-center gap-2 sm:mt-2">
            <Link href="/singleplayer">
              <Button className="w-full h-full">Soloplay</Button>
            </Link>
          </div>
        </div>
      </section>
    )
  else if (isPending)
    return (
      <section className="h-[calc(100vh-80px)] md:h-screen w-screen p-4 md:p-8 animate-in fade-in zoom-in duration-300">
        <div className="flex flex-col items-center justify-center gap-6 sm:gap-4 h-full">
          <h1 className="text-5xl sm:text-7xl text-gradient">Multiplayer</h1>
          <Skeleton className="h-[5vh] w-[70vw]" />
          <Skeleton className="h-[5vh] w-[30vw]" />
        </div>
      </section>
    )
  else if (data.isInLobby)
    return (
      <section className="h-[calc(100vh-80px)] md:h-screen w-screen p-4 md:p-8 animate-in fade-in zoom-in duration-300">
        <div className="flex flex-col items-center justify-center gap-6 sm:gap-4 h-full">
          <h1 className="text-5xl sm:text-7xl text-gradient">Multiplayer</h1>
          <p className="text-gradient text-lg sm:text-2xl text-center">
            Looks like you disconnected from your previous lobby!
          </p>
          <div className="flex justify-between items-center gap-2 sm:mt-2">
            <Button onClick={handleReconnect}>Reconnect</Button>
            <Button variant="destructive" onClick={handleLeave}>
              Leave
            </Button>
          </div>
        </div>
      </section>
    )
  return (
    <section className="h-[calc(100vh-80px)] md:h-screen w-screen p-4 md:p-8 animate-in fade-in zoom-in duration-300">
      <div className="flex flex-col items-center justify-center gap-6 sm:gap-4 h-full">
        <h1 className="text-5xl sm:text-7xl text-gradient">Multiplayer</h1>
        <p className="text-gradient text-lg sm:text-2xl text-center">
          You can either create or join a lobby.
        </p>
        <div className="flex justify-between items-center gap-2 sm:mt-2">
          <CreateLobbyDialog />
          <JoinLobbyDialog />
        </div>
      </div>
    </section>
  )
}
