"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"

import React from "react"
import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"

interface SocialButtonProps {
  disabled?: boolean
  isMobile?: boolean
}

export const SocialButton = ({ disabled, isMobile }: SocialButtonProps) => {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    })
  }

  return (
    <div className="flex items-center w-full gap-x-3">
      <Button
        size={isMobile ? "default" : "lg"}
        className="w-full bg-[#ffffff] hover:bg-[#ffffff]/80"
        disabled={disabled}
        onClick={(e) => {
          e.preventDefault()
          onClick("google")
        }}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        size={isMobile ? "default" : "lg"}
        disabled={disabled}
        className="w-full bg-[#1a1a1a] hover:bg-[#1a1a1a]/60"
        onClick={(e) => {
          e.preventDefault()
          onClick("github")
        }}
      >
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  )
}
