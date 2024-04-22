"use client"

import { memo } from "@/actions/memo"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useRosterStore } from "@/hooks/useRosterStore"
import { useParams } from "next/navigation"
import React, { useEffect, useRef, useState, useTransition } from "react"
import { toast } from "sonner"

export const MemoBox = () => {
  const { rosterId } = useParams()
  const [isPending, startTrasition] = useTransition()
  const ref = useRef<any>(null)
  const { rosters, onUpdate } = useRosterStore()

  const currentRoster = rosters.filter(
    (roster) => roster.id === parseInt(rosterId as string)
  )[0]

  useEffect(() => {
    if (currentRoster?.memo) {
      ref.current.value = JSON.parse(currentRoster.memo as string)
    }
  }, [currentRoster])

  const onSubmitMemo = () => {
    const textValue = JSON.stringify(ref.current.value)
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
    <div className="flex-1  h-[450px] bg-[#1e1e1e] px-[24px] pt-[24px]  drop-shadow-lg">
      <form action={onSubmitMemo} className="h-full space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl text-[#eeeeee] font-bold">메모</h3>
          <Button
            size={"sm"}
            className="bg-[#272727]"
            type="submit"
            disabled={isPending}
          >
            저장
          </Button>
        </div>
        <Textarea
          className="h-full max-h-[350px] bg-[#1a1a1a] border-[#1e1e1e] text-lg text-[#eeeeee]"
          placeholder="로스터에 대한 평가를 적어보세요"
          ref={ref}
          disabled={isPending}
        />
      </form>
    </div>
  )
}
