"use client"

import React, { useState } from "react"
import { useParams, usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import EsportIcon from "@/public/images/esport_icon.svg"
import Image from "next/image"
import { Button } from "./ui/button"
import { signOut, useSession } from "next-auth/react"
import { toast } from "sonner"
import { UserButton } from "./user-button"

export const MainHeader = ({
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLElement>) => {
  const { data, status } = useSession()

  const pathname = usePathname()
  const { replace, push } = useRouter()

  const routes = [
    {
      href: `/roster`,
      label: "Roster",
      active: pathname === `/roster`,
    },

    {
      href: `/tier`,
      label: "Tier",
      active: pathname === `/tier`,
    },
    {
      href: `/news`,
      label: "News",
      active: pathname === `/news`,
    },
  ]

  if (pathname === "/auth/login" || pathname === "/auth/register") {
    return null
  }

  return (
    <div className="w-full px-7 h-16 flex fixed justify-between items-center bg-[#1a1a1a] z-10">
      <div className="space-x-10 flex items-center">
        <div
          className="flex space-x-2 cursor-pointer"
          onClick={() => replace("/")}
        >
          <Image src={EsportIcon} width={24} height={24} alt="" />
          <h1 className="font-bold text-white text-[18px] ">LoLStar</h1>
        </div>
        <nav className="flex items-center space-x-5">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-white",
                route.active ? "text-white dark:text-white" : "text-[#555555]"
              )}
            >
              {route.label}
            </Link>
          ))}
        </nav>
      </div>
      {status === "unauthenticated" && (
        <Button
          variant="ghost"
          className="text-[#eeeeee] hover:bg-[#1a1a1a] hover:text-[#eeeeee]/80"
        >
          <Link href="/auth/login">Login</Link>
        </Button>
      )}
      {status === "authenticated" && <UserButton />}
    </div>
  )
}
