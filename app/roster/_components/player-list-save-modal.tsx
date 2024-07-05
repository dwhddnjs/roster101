"use client"

import React, { useState, useTransition } from "react"
import { CldUploadWidget, CldUploadWidgetProps } from "next-cloudinary"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { usePlayerListModal } from "@/hooks/usePlayerListModalStore"
import { useRouter } from "next/navigation"
import { Controller, useFieldArray, useForm } from "react-hook-form"
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
import { icons, Minus, PlusIcon } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { usePlayerListStore } from "@/hooks/usePlayerListStore"
import { savePlayer } from "@/actions/save-player"
import { ImageUploader } from "@/components/image-uploader"
import { PlayerTypes } from "@/types/player-types"

export const PlayerListSaveModal = () => {
  const { isOpen, onOpen, onClose } = usePlayerListModal()
  const { push } = useRouter()
  const [isPending, startTransition] = useTransition()
  const { playerList } = usePlayerListStore()
  const [file, setFile] = useState("")

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

  const { append, fields, remove } = useFieldArray({
    control: form.control,
    name: "career",
  } as any)

  const onSubmit = (values: z.infer<typeof PlayerSchema>) => {
    const careersValues = values.career.map((career) => career.value)

    if (!playerList) return

    const requestBody = {
      id: playerList[`${values.position}`].length + 1,
      nickname: values.nickname,
      name: values.name,
      position: values.position,
      img: values.img,
      careers: careersValues,
    }

    startTransition(() => {
      savePlayer(requestBody).then((data) => {
        console.log(data)
      })
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#191919] border-[#191919]">
        <DialogHeader>
          <h3 className="text-lg text-[#eeeeee] font-bold">선수 생성</h3>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              onChange={(e) => console.log(form.getValues())}
            >
              <div className="flex space-x-4 ">
                <FormField
                  control={form.control}
                  name="img"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <ImageUploader
                          value={field.value as string}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col w-full space-y-2">
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
                            className="bg-[#1e1e1e] border-[#1a1a1a] text-white  placeholder:text-[#555555] text-xs"
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
                            className="bg-[#1e1e1e] border-[#1a1a1a] text-[#eeeeee]  placeholder:text-[#555555] text-xs"
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
                            <SelectTrigger className="w-full bg-[#1e1e1e] border-[#1a1a1a] text-[#c4c4c4]">
                              <SelectValue placeholder="포지션을 선택해주세요." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-[#1e1e1e] text-[#eeeeee] border-none">
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
                  <div className="space-y-2 ">
                    <h3 className="text-[#c4c4c4] font-semibold pl-1 text-sm">
                      Careers*
                    </h3>
                    {fields.map((item, index) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-3"
                      >
                        <Input
                          {...form.register(`career.${index}.value`)}
                          className="bg-[#191919] h-6 text-[#eeeeee] border-t-0 border-l-0 border-r-0 rounded-none border-[#555555] placeholder:text-[#555555] text-xs "
                          placeholder="Ex :) 2024 Worlds 우승"
                          type="text"
                        />

                        <Button
                          size={"xs"}
                          onClick={() => remove(index)}
                          className="bg-red-500 h-6"
                        >
                          <Minus size={16} />
                        </Button>
                      </div>
                    ))}
                    <div className="w-full flex justify-center">
                      <Button
                        size={"xs"}
                        onClick={(e) => {
                          e.preventDefault()
                          append({ value: "" })
                        }}
                        className="rounded-full w-7 bg-[#555555]"
                      >
                        <PlusIcon size={16} />
                      </Button>
                    </div>
                  </div>
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
