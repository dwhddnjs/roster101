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

import { useRoster } from "@/hooks/useRoster"
import { useRosterBoxStore } from "@/hooks/useRosterBoxStore"
import { useRosterStore } from "@/hooks/useRosterStore"
import { useSaveRosterModalStore } from "@/hooks/useSaveRosterModalStore"
import { revalidatePath, unstable_cache } from "next/cache"
import { useRouter } from "next/navigation"

import React, { useState, useTransition } from "react"

export const RosterSaveModal = () => {
  const { isOpen, onClose } = useSaveRosterModalStore()
  const [inputValue, setInputValue] = useState("")
  const { roster } = useRosterBoxStore()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const { rosters, onUpdateRoster } = useRoster()

  // const { onUpdateRoster } = useRosterStore()

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  // const onSaveRoster = () => {
  //   try {
  //     const res = await saveRoster(roster, inputValue)
  //     console.log("res: ", res)
  //     if (res) {
  //       onClose()
  //       onUpdateRoster(res.data)
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   } finally {
  //     router.refresh()
  //   }
  // }

  const onSaveRoster = () => {
    startTransition(() => {
      saveRoster(roster, inputValue).then((data) => {
        onUpdateRoster([data.data, ...(rosters as any)])
      })
      router.refresh()
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
            // disabled={isLoading}
          />
          <DialogFooter className="mt-3">
            <Button
              type="submit"
              // onClick={onSaveRoster}
              size="lg"
              className="bg-[#555555] text-[#eeeeee]"
              // disabled={isLoading}
            >
              저장
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
