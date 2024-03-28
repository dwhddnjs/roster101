"use clinet"

import { useEffect, useState } from "react"
import { useUser } from "./useUser"
import { roster } from "@/actions/roster"
import { Player, Roster } from "@prisma/client"

export const useMyRoster = () => {
  const [myRoster, setMyRoster] = useState<Roster[]>()
  const [loading, setLoading] = useState(false)

  const user = useUser()

  useEffect(() => {
    setLoading(true)
    if (user) {
      ;(async () => {
        try {
          const res = await roster()
          setMyRoster(res)
        } catch (error) {
          console.error(error)
        } finally {
          setLoading(false)
        }
      })()
    }
  }, [user])

  return {
    rosters: myRoster,
    isLoading: loading,
  }
}
