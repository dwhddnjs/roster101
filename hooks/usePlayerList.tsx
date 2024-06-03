"use clinet"

// import { getUserfromPlayerList } from "@/prisma/data/user"
import { useQuery } from "@tanstack/react-query"
import { useUser } from "./useUser"
import { playerList } from "@/actions/player-list"

export const usePlayerList = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["playerList"],
    queryFn: playerList,
  })

  console.log("data: ", data)

  return {
    data,
    isLoading,
    isError,
  }
}
