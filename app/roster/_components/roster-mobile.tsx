"use client"

import React, { useState } from "react"
import { RosterBox } from "./roster-box"
import { PlayersContainer } from "./players-container"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { WalletCards } from "lucide-react"
import { useRosterStore } from "@/hooks/useRosterStore"
import { RosterCard } from "./roster-card"
import Link from "next/link"
import { useRosterBoxStore } from "@/hooks/useRosterBoxStore"
import { toast } from "sonner"
import Image from "next/image"

export const RosterMobile = () => {
  const [open, setOpen] = useState(false)
  const { rosters, isLoading } = useRosterStore()
  const { rosterId } = useRosterBoxStore()

  const onClickOpenButton = () => {
    if (!rosterId) {
      setOpen(false)
      return toast("로스터 카드를 선택해주세요")
    }
  }

  return (
    <div className="pt-[60px] w-full h-full flex flex-col justify-between space-y-4 overflow-hidden">
      <div className="space-y-1 ml-3  px-[18px] flex items-center justify-between">
        <div>
          <h3 className="text-xl text-[#eeeeee] font-bold">Roster</h3>
          <p className="text-xs text-[#c4c4c4]">당신의 로스터를 구성해보세요</p>
        </div>
        <Button
          size="xs"
          className="bg-[#1e1e1e] "
          onClick={() => setOpen(true)}
        >
          <WalletCards className="w-5 h-5" />
        </Button>
      </div>
      <div className="w-full h-full  px-[18px]">
        <PlayersContainer />
      </div>
      <RosterBox />
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="bg-[#191919] border-none space-y-3 pt-[55px] text-[#eeeeee] font-bold">
          {!rosters && (
            <div className="flex flex-col items-center justify-center mt-[200px]  z-1000 space-y-3">
              <Image
                src="/images/empty_esport_icon.svg"
                width={60}
                height={60}
                alt="roster101 esport_empty_icon"
              />
              <p className="text-[#c4c4c4] text-center font-semibold text-sm">
                저장된 로스터가 <br />
                없습니다.
              </p>
            </div>
          )}
          {rosters && rosters.length === 0 && (
            <div className="flex flex-col items-center justify-center mt-[200px]  z-1000 space-y-3">
              <Image
                src="/images/empty_esport_icon.svg"
                width={60}
                height={60}
                alt="roster101 esport_empty_icon"
              />
              <p className="text-[#c4c4c4] text-center font-semibold text-sm">
                저장된 로스터가 <br />
                없습니다.
              </p>
            </div>
          )}
          {rosters && rosters.length > 0 && (
            <>
              {rosters?.map((roster) => (
                <RosterCard key={roster.id} roster={roster} />
              ))}
              <div className="w-full flex justify-end">
                <Button size={"sm"} className="rounded-[50px] bg-[#272727] ">
                  {!rosterId ? (
                    <span onClick={onClickOpenButton} className="text-xs">
                      OPEN
                    </span>
                  ) : (
                    <Link className="text-xs" href={`/roster/${rosterId}`}>
                      OPEN
                    </Link>
                  )}
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
