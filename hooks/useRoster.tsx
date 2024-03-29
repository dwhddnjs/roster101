"use clinet"

import { useEffect, useState } from "react"
import { useUser } from "./useUser"
import { roster } from "@/actions/roster"
import { Player, Roster } from "@prisma/client"

export type RosterTypes = Roster & { players: Player[] }

export const useRoster = () => {
  const [rosters, setRosters] = useState<RosterTypes[]>()
  const [loading, setLoading] = useState(false)
  const user = useUser()

  useEffect(() => {
    setLoading(true)
    if (user) {
      ;(async () => {
        try {
          const res = await roster()
          setRosters(res)
        } catch (error) {
          console.error(error)
        } finally {
          setLoading(false)
        }
      })()
    }
  }, [user, rosters])

  const onUpdateRoster = (roster: any) => {
    setRosters(roster)
  }

  return {
    rosters,
    isLoading: loading,
    onUpdateRoster: onUpdateRoster,
  }
}
