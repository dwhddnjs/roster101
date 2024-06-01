import { getUserfromPlayerList } from "@/prisma/data/user"
import { useQuery } from "@tanstack/react-query"
import { useUser } from "./useUser"

export const usePlayerList = () => {
  const user = useUser()

  const { data, isLoading, isError } = useQuery({
    queryKey: ["playerList"],
    queryFn: () => getUserfromPlayerList(user?.id as string),
  })

  return {
    data,
    isLoading,
    isError,
  }
}
