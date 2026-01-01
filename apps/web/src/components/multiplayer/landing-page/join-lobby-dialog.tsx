"use client"

import { Label } from "@repo/ui/components/label"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
} from "@repo/ui/components/dialog"
import { Button } from "@repo/ui/components/button"
import { Input } from "@repo/ui/components/input"
import { usernameAtom } from "@/lib/atoms"
import { useAtom } from "jotai"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { Loader } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function JoinLobbyDialog() {
  const [username, setUsername] = useAtom(usernameAtom)
  const [lobbyId, setLobbyId] = useState("")
  const router = useRouter()

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      if (username.length < 4) toast.error("Username must have at least 4 characters")
      else {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL! + "/join-lobby", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, lobbyId }),
        })
        const json = await res.json()
        if (!res.ok) {
          toast.error(json.error)
          return
        }
        router.push(`/multiplayer/${json.lobbyId}`)
        return json
      }
    },
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Join</Button>
      </DialogTrigger>
      <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      <DialogContent className="max-w-[90vw] sm:max-w-106.25 space-y-2">
        <DialogHeader>
          <DialogTitle>Join Lobby</DialogTitle>
          <DialogDescription>
            Provide a username and the lobby URL or the lobby code.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <div className="flex gap-4 items-center">
            <Label className="w-30">Username</Label>
            <Input value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="flex items-center gap-4">
            <Label className="w-30">Lobby</Label>
            <Input value={lobbyId} onChange={(e) => setLobbyId(e.target.value)} />
          </div>
        </div>
        <Button disabled={isPending} className="sm:text-md" onClick={() => mutate()}>
          {isPending ? <Loader className="size-4 animate-spin" /> : "Join"}
        </Button>
      </DialogContent>
    </Dialog>
  )
}
