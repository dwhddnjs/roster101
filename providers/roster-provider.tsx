"use client"

import { useRosterStore } from "@/hooks/useRosterStore"
import React, { useEffect, useState } from "react"

export const RosterProvider = ({ children }: { children: React.ReactNode }) => {
  const { action, rosters } = useRosterStore()

  useEffect(() => {
    action()
  }, [action])

  return <>{children}</>
}
