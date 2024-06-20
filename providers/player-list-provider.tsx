"use client"

import { usePlayerListStore } from "@/hooks/usePlayerListStore"
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
