import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import React from "react"

export const MemoBox = () => {
  return (
    <div className="flex-1  h-[450px] bg-[#1e1e1e] px-[24px] pt-[24px] space-y-4 drop-shadow-lg">
      <div className="flex justify-between items-center">
        <h3 className="text-xl text-[#eeeeee] font-bold">메모</h3>
        <Button size={"sm"} className="bg-[#272727]">
          저장
        </Button>
      </div>
      <Textarea
        className="h-full max-h-[350px] bg-[#1a1a1a] border-[#1e1e1e] text-lg text-[#eeeeee]"
        placeholder="로스터에 대한 평가를 적어보세요"
      />
    </div>
  )
}
