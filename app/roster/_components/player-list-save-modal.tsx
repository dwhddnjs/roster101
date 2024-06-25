"use client"

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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { PlayerSchema } from "../schemas"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const PlayerListSaveModal = () => {
  const { isOpen, onOpen, onClose } = usePlayerListModal()
  const { push } = useRouter()
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof PlayerSchema>>({
    resolver: zodResolver(PlayerSchema),
    defaultValues: {
      img: "",
      position: "",
      name: "",
      nickname: "",
      career: [],
    },
  })

  const onSubmit = (values: z.infer<typeof PlayerSchema>) => {
    console.log("시발", values)
    // startTransition(() => {
    //   login(values).catch((error) => {
    //     console.log(error)
    //   })
    // })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1a1a1a] border-[#272727]">
        <DialogHeader>
          <h3 className="text-lg text-[#eeeeee] font-bold">선수 생성</h3>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form
              // onSubmit={form.handleSubmit(onSubmit)}
              onChange={() => console.log(form.getValues())}
            >
              <div className="flex ">
                <FormField
                  control={form.control}
                  name="nickname"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="w-[120px] flex justify-center items-center h-full border-2">
                          <PlusIcon color="#eeeeee" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col w-full">
                  <FormField
                    control={form.control}
                    name="nickname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#c4c4c4] font-semibold pl-1">
                          Nickname*
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-[#1e1e1e] border-[#1a1a1a] text-white h-12 placeholder:text-[#555555] text-xs"
                            placeholder="Ex :) Faker"
                            type="text"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#c4c4c4] font-semibold pl-1">
                          Name*
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-[#1e1e1e] border-[#1a1a1a] text-[#eeeeee] h-12 placeholder:text-[#555555] text-xs"
                            placeholder="Ex :) 이상혁"
                            type="text"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#c4c4c4] font-semibold pl-1">
                          Position*
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full bg-[#1e1e1e] border-[#1a1a1a] text-[#eeeeee]">
                              <SelectValue placeholder="포지션을 선택해주세요." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-[#1e1e1e] text-[#eeeeee]">
                            <SelectItem value="top">TOP</SelectItem>
                            <SelectItem value="jgl">JGL</SelectItem>
                            <SelectItem value="mid">MID</SelectItem>
                            <SelectItem value="ad">AD</SelectItem>
                            <SelectItem value="spt">SPT</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="career"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#c4c4c4] font-semibold pl-1">
                          Career*
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-[#1e1e1e] border-[#1a1a1a] text-[#eeeeee] h-12 placeholder:text-[#555555] text-xs"
                            placeholder="Ex :) 이상혁"
                            type="text"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="mt-10 flex flex-col ">
                <Button size="lg" type="submit" disabled={isPending}>
                  생성하기
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
