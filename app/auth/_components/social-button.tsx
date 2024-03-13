"use client"

import { Button } from "@/components/ui/button"

import React from "react"
import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"

export const SocialButton = () => {
  return (
    <div className="flex items-center w-full gap-x-3">
      <Button size="lg" className="w-full" variant="outline" onClick={() => {}}>
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button size="lg" className="w-full bg-[#1a1a1a]" onClick={() => {}}>
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  )
}
