import { Divider } from "@/components/divider"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import Image from "next/image"
import React from "react"
import { Input } from "@/components/ui/input"
import { RegisterSchema } from "../schemas"
import * as z from "zod"
import { UseFormReturn } from "react-hook-form"
import { SocialButton } from "./social-button"
import { useRouter } from "next/navigation"

interface RegisterMobileProps {
  form: UseFormReturn<z.infer<typeof RegisterSchema>>
  onSubmit: (values: z.infer<typeof RegisterSchema>) => void
  isPending: boolean
}

export const RegisterMobile = ({
  form,
  onSubmit,
  isPending,
}: RegisterMobileProps) => {
  const { push } = useRouter()

  return (
    <div className="h-full w-full flex flex-col  items-center bg-[#1e1e1e] space-y-4 pt-[64px]">
      <div className="flex flex-col space-y-6 w-full justify-center items-center ">
        <div>
          <Image
            src="/images/esport_icon.svg"
            height={100}
            width={100}
            alt=""
          />
        </div>
        <div className=" w-full px-[48px] space-y-1.5 pl-[52px]">
          <h2 className="text-3xl text-[#eeeeee] font-bold">Sign up</h2>
          <p className="text-[#c4c4c4] text-xs">
            회원가입 양식에 맞게 입력 해주세요.
          </p>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onChange={() => console.log(form.getValues())}
          className="w-full"
        >
          <div className="space-y-1  w-full px-[48px]">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#c4c4c4] font-semibold pl-1 text-xs">
                    Name*
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-[#1a1a1a] border-[#1e1e1e] text-white h-11 placeholder:text-[#555555]"
                      placeholder="홍길동"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#c4c4c4] font-semibold pl-1 text-xs">
                    Email*
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-[#1a1a1a] border-[#1e1e1e] text-white h-11 placeholder:text-[#555555]"
                      placeholder="example@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#c4c4c4] font-semibold pl-1 text-xs">
                    Password*
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-[#1a1a1a] border-[#1e1e1e] text-white h-11 placeholder:text-[#555555]"
                      placeholder="*******"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col px-[48px] pt-[28px] ">
            <Button type="submit" disabled={isPending} className="text-sm">
              회원가입
            </Button>
            <Button
              className="mt-4"
              type="submit"
              variant="link"
              disabled={isPending}
              onClick={(e) => {
                e.preventDefault()
                push("/auth/login")
              }}
            >
              <p className="text-xs">이미 가입된 계정이 있으신가요?</p>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
