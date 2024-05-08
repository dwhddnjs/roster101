"use client"

import { saveRoster } from "@/actions/save-roster"
import { updateRoster } from "@/actions/update-roster"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useRosterBoxStore } from "@/hooks/useRosterBoxStore"
import { useRosterStore } from "@/hooks/useRosterStore"
import { useSaveRosterModalStore } from "@/hooks/useSaveRosterModalStore"
import { useUser } from "@/hooks/useUser"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import React, { useRef, useState, useTransition } from "react"
import { toast } from "sonner"
import { useMediaQuery } from "usehooks-ts"

export const RosterSaveModal = () => {
  const { isOpen, onClose } = useSaveRosterModalStore()
  const [inputValue, setInputValue] = useState("")
  const { roster, rosterId, onResetRoster } = useRosterBoxStore()
  const { onSave, rosters, action, onUpdate, onResponse } = useRosterStore()
  const [isPending, startTransition] = useTransition()
  const { replace } = useRouter()
  const user = useUser()
  const isMobile = useMediaQuery("(max-width: 768px)")

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const onSaveRoster = () => {
    if (!user) {
      onClose()
      toast("로그인이 필요합니다")
      replace("/auth/login")
      setInputValue("")
      return
    }

    if (inputValue.length === 0) {
      return toast("로스터 이름을 입력해주세요.")
    }

    for (let player of roster) {
      if (!player.img || !player.name || !player.nickname) {
        return toast("로스터를 채워주세요")
      }
    }

    startTransition(() => {
      const responseData = {
        id: rosters.length + 1,
        title: inputValue,
        players: roster.map((player) => ({
          ...player,
          rosterId: rosters.length + 1,
        })),
        userId: user?.id as string,
      }

      if (rosterId) {
        onUpdate(rosterId, {
          ...responseData,
          id: rosterId,
          players: roster.map((player) => ({
            ...player,
            rosterId: rosterId,
          })),
        })
        updateRoster(rosterId, inputValue, roster).then((data) => {
          if (data.success) {
            toast(data.success)
            onResponse(data.data, "update")
          }
          if (data.error) {
            toast(data.error)
            action()
          }
        })
        return
      }

      onSave(responseData)
      saveRoster(roster, inputValue)
        .then((data) => {
          if (data.success) {
            toast(data.success)
            onResponse(data.data, "save")
          }
          if (data.error) {
            toast(data.error)
            action()
          }
        })
        .catch((error) => console.log(error))
    })
    setInputValue("")
    onResetRoster()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          "bg-[#272727] border-[#1e1e1e] text-[#c4c4c4]",
          isMobile && "w-[330px]  mb-[50px]"
        )}
      >
        <DialogHeader>
          <DialogTitle className="text-[#c4c4c4] font-semibold text-[16px] pl-[8px] ">
            저장하실 로스터 이름을 입력해주세요.
          </DialogTitle>
        </DialogHeader>
        <form action={onSaveRoster}>
          <Input
            className="bg-[#1e1e1e] border-[#1a1a1a] text-white h-[48px] text-sm placeholder:text-[#555555] "
            onChange={(e) => onChangeText(e)}
            placeholder="최대 12글자 작성 가능"
            value={inputValue}
            maxLength={12}
            disabled={isPending}
          />
          <DialogFooter className="mt-4">
            <Button
              type="submit"
              className="bg-[#555555] text-[#eeeeee]"
              disabled={isPending}
            >
              저장
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
;``
