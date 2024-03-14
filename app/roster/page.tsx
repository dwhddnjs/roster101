"use client"

import React from "react"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"

function RosterPage() {
  return (
    <div>
      <Button onClick={() => signOut()}>로그아웃</Button>
    </div>
  )
}

export default RosterPage
