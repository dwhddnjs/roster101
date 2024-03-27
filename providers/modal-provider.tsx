"use client"

import { RosterSaveModal } from "@/app/roster/_components/roster-save-modal"
import React, { useEffect, useState } from "react"

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <RosterSaveModal />
    </>
  )
}
