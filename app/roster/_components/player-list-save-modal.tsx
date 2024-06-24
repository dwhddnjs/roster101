import React, { useTransition } from "react"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { usePlayerListModal } from "@/hooks/usePlayerListModalStore"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

export const PlayerListSaveModal = () => {
  const { isOpen, onOpen, onClose } = usePlayerListModal()
  const { push } = useRouter()
  const [isPending, startTransition] = useTransition()

  // const form = useForm<z.infer<typeof LoginSchema>>({
  //   resolver: zodResolver(LoginSchema),
  //   defaultValues: {
  //     email: "",
  //     password: "",
  //   },
  // })

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1e1e1e] border-[#272727]">
        <DialogHeader>
          <h3 className="text-lg text-[#eeeeee] font-bold">선수 생성</h3>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
