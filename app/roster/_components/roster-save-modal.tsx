"use client"

import { saveRoster } from "@/actions/save-roster"
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
import { revalidatePath, unstable_cache } from "next/cache"
import { useRouter } from "next/navigation"

import React, { useState, useTransition } from "react"
import { toast } from "sonner"

export const RosterSaveModal = () => {
  const { isOpen, onClose } = useSaveRosterModalStore()
  const [inputValue, setInputValue] = useState("")
  const { roster } = useRosterBoxStore()
  const { onUpdate, rosters, action } = useRosterStore()
  const [isPending, startTransition] = useTransition()
  const user = useUser()

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const onSaveRoster = () => {
    if (inputValue.length === 0) {
      return toast("로스터 이름을 입력해주세요.")
    }

    for (let player of roster) {
      if (!player.img || !player.name || !player.nickname) {
        return toast("로스터를 채워주세요")
      }
    }

    startTransition(() => {
      onUpdate({
        id: rosters.length + 1,
        title: inputValue,
        players: roster.map((player) => ({
          ...player,
          rosterId: rosters.length + 1,
        })),
        userId: user?.id as string,
      })
      saveRoster(roster, inputValue)
        .then((data) => {
          if (data.success) {
            toast(data.success)
          }
          if (data.error) {
            toast(data.error)
            action()
          }
        })
        .catch((error) => console.log(error))
      onClose()
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#272727] border-[#1e1e1e] text-[#c4c4c4]">
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
          <DialogFooter className="mt-3">
            <Button
              type="submit"
              size="lg"
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
