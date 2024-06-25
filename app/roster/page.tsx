"use client"

import { PlayersContainer } from "./_components/players-container"
import { RosterBox } from "./_components/roster-box"
import { RosterSidebar } from "./_components/roster-sidebar"
import { useMediaQuery } from "usehooks-ts"
import { RosterMobile } from "./_components/roster-mobile"
import { Button } from "@/components/ui/button"
import { usePlayerListModal } from "@/hooks/usePlayerListModalStore"

function RosterPage() {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const { onOpen } = usePlayerListModal()

  if (isMobile) {
    return <RosterMobile />
  }

  return (
    <div className="w-full min-h-full flex relative ">
      <RosterSidebar />
      <div className="w-[82%] h-full pt-24 px-[48px] space-y-5 ">
        <div className="w-full flex justify-between items-end">
          <div className="space-y-1 ml-3">
            <h3 className="text-4xl text-[#eeeeee] font-bold">Roster</h3>
            <p className="text-md text-[#c4c4c4]">
              당신의 로스터를 구성해보세요
            </p>
          </div>
          {/* <Button size="sm" className="text-sm bg-[#272727]" onClick={onOpen}>
            선수 생성
          </Button> */}
        </div>
        <PlayersContainer />
      </div>
      <RosterBox />
    </div>
  )
}

export default RosterPage
