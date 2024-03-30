"use client"

import { useOptimistic } from "react"
import { useRosterStore } from "./useRosterStore"

export const useOp = () => {
  const { rosters, action } = useRosterStore()
  const [data, setData] = useOptimistic<any, any>(rosters, (state, value) => [
    value,
    ...state,
  ])
  console.log("data: ", data)

  const update = (roster: any) => {
    console.log("roster: ", roster)
    setData(roster)
    action()
  }

  return {
    rosters: data,
    onUpdate: update,
  }
}
