"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FaUser } from "react-icons/fa"
import { LogOutIcon } from "lucide-react"
import { signOut } from "next-auth/react"
import { toast } from "sonner"
import { useUser } from "@/hooks/useUser"

export const UserButton = () => {
  const user = useUser()

  const onLogout = () => {
    signOut()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-[#555555]">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-40 bg-[#27272a] border-[#272727]"
        align="end"
      >
        <DropdownMenuItem onClick={onLogout}>
          <LogOutIcon className="h-4 w-4 mr-2 text-[#eeeeee]" />
          <p className="text-[#eeeeee] font-semibold cursor-pointer">Logout</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
