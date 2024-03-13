"use client"

import { cn } from "@/lib/utils"
import React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ModeToggle } from "./mode-toggle"

export const Navbar = () => {
  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg- fixed top-0 flex items-center w-full p-6"
      )}
    >
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        <ModeToggle />
      </div>
    </div>
  )
}
