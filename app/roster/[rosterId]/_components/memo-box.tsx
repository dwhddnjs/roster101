"use client"

import { memo } from "@/actions/memo"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useRosterStore } from "@/hooks/useRosterStore"
import { cn } from "@/lib/utils"
import { useParams } from "next/navigation"
import React, { useEffect, useRef, useState, useTransition } from "react"
import { toast } from "sonner"
import { useMediaQuery } from "usehooks-ts"

export const MemoBox = () => {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const { rosterId } = useParams()
  const [isPending, startTrasition] = useTransition()
  const ref = useRef<HTMLTextAreaElement | null>(null)
  const { rosters, onUpdate } = useRosterStore()

  const currentRoster = rosters.filter(
    (roster) => roster.id === parseInt(rosterId as string)
  )[0]

  useEffect(() => {
    if (currentRoster?.memo && ref.current) {
      ref.current.value = JSON.parse(currentRoster.memo as string)
    }
  }, [currentRoster])

  const onSubmitMemo = () => {
    const textValue = JSON.stringify(ref.current?.value)
    startTrasition(() => {
      memo(rosterId as string, textValue)
        .then((data) => {
          if (data?.success) {
            toast(data?.success)
            onUpdate(parseInt(rosterId as string), data.data)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    })
  }

  return (
    <div
      className={cn(
        "w-1/2 h-[450px] bg-[#1e1e1e] px-[24px] pt-[24px] drop-shadow-lg",
        isMobile && "w-full h-[200px] px-[18px] py-[14px]"
      )}
    >
      <form action={onSubmitMemo} className="h-full space-y-3">
        <div className="flex justify-between items-center">
          <h3
            className={cn(
              "text-xl text-[#eeeeee] font-bold",
              isMobile && "text-lg"
            )}
          >
            메모
          </h3>
          <Button
            size={isMobile ? "xs" : "sm"}
            className="bg-[#272727] p-3"
            type="submit"
            disabled={isPending}
          >
            <p className="text-sm">저장</p>
          </Button>
        </div>
        <Textarea
          className={cn(
            "h-full max-h-[350px] bg-[#1a1a1a] border-[#1e1e1e] text-lg text-[#eeeeee]",
            isMobile && "max-h-[130px] text-sm"
          )}
          placeholder="로스터에 대한 평가를 적어보세요"
          ref={ref}
          disabled={isPending}
        />
      </form>
    </div>
  )
}
