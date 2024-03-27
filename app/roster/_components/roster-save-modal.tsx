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
import { useSaveRosterModalStore } from "@/hooks/useSaveRosterModalStore"
import { DialogClose } from "@radix-ui/react-dialog"

import React, { useState } from "react"

export const RosterSaveModal = () => {
  const { isOpen, onClose } = useSaveRosterModalStore()
  const [inputValue, setInputValue] = useState("")

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const onSaveRoster = () => {
    saveRoster([], "asdasdasd")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#272727] border-[#1e1e1e] text-[#c4c4c4]">
        <DialogHeader>
          <DialogTitle className="text-[#c4c4c4] font-semibold text-[16px] pl-[8px] ">
            저장하실 로스터 이름을 입력해주세요.
          </DialogTitle>
        </DialogHeader>
        <Input
          className="bg-[#1e1e1e] border-[#1a1a1a] text-white h-[48px] text-sm placeholder:text-[#555555] "
          onChange={(e) => onChangeText(e)}
          placeholder="최대 12글자 작성 가능"
          value={inputValue}
          maxLength={12}
        />
        <DialogFooter className="mt-3">
          <Button
            onClick={onSaveRoster}
            size="lg"
            className="bg-[#555555] text-[#eeeeee]"
          >
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
