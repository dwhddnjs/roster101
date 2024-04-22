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
import { useRouter } from "next/navigation"
import Link from "next/link"

export const UserButton = () => {
  const user = useUser()
  const { replace, push } = useRouter()

  const onLogout = async () => {
    await signOut()
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
          <Link
            href="/roster"
            className="text-[#eeeeee] font-semibold cursor-pointer"
          >
            Logout
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
