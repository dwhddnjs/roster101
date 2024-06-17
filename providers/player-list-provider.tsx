"use client"

import { usePlayerListStore } from "@/hooks/usePlayerListStore"
import { useRosterStore } from "@/hooks/useRosterStore"
import { useUser } from "@/hooks/useUser"
import React, { useEffect, useState } from "react"

export const PlayerListProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { action, playerList } = usePlayerListStore()

  useEffect(() => {
    action()
  }, [action])

  return <>{children}</>
}
