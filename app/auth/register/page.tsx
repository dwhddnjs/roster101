"use client"

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
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import React from "react"
import Image from "next/image"
import { SocialButton } from "../_components/social-button"
import { Divider } from "@/components/divider"
import { useRouter } from "next/navigation"

function RegisterPage() {
  const { push } = useRouter()

  const formSchema = z.object({
    email: z
      .string()
      .min(1, { message: "최소 1글자 이상 작성해주세요" })
      .email("이메일 주소가 유효하지 않습니다"),
    password: z.string().min(7, { message: "최소 7자 이상 작성해주세요" }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  return (
    <div className="bg-[#1a1a1a] flex justify-center items-center h-full p-50 ">
      <div className="bg-[#1e1e1e] w-[1200px] h-[700px] flex flex-row border-2 border-[#1e1e1e] drop-shadow-2xl ">
        <div className="w-[45%] flex justify-center items-center">
          <Image
            src="/images/esport_icon.svg"
            width={300}
            height={300}
            alt="logo"
          />
        </div>
        <div className="w-[55%] bg-[#272727] px-24 py-20 space-y-6">
          <div className="space-y-3">
            <h2 className="text-white font-bold text-4xl">Sign up</h2>
            <p className="text-[#c4c4c4] text-sm">
              회원가입 양식에 맞게 입력 해주세요.
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(() => {})}
              onChange={() => console.log(form.getValues())}
            >
              <div className="space-y-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#c4c4c4] font-semibold pl-1">
                        Email*
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-[#1e1e1e] border-[#1a1a1a] text-white h-12 placeholder:text-[#555555]"
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
                      <FormLabel className="text-[#c4c4c4] font-semibold pl-1">
                        Password*
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-[#1e1e1e] border-[#1a1a1a] text-white h-12 placeholder:text-[#555555]"
                          placeholder="*******"
                          type="password"
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
                      <FormLabel className="text-[#c4c4c4] font-semibold pl-1">
                        Password*
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-[#1e1e1e] border-[#1a1a1a] text-white h-12 placeholder:text-[#555555]"
                          placeholder="*******"
                          type="password"
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
                      <FormLabel className="text-[#c4c4c4] font-semibold pl-1">
                        Password*
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-[#1e1e1e] border-[#1a1a1a] text-white h-12 placeholder:text-[#555555]"
                          placeholder="*******"
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-8 flex flex-col ">
                <Button size="lg" type="submit">
                  회원가입
                </Button>

                <Button
                  type="submit"
                  variant="link"
                  // disabled={isLoading}
                  onClick={(e) => {
                    e.preventDefault()
                    push("/auth/login")
                  }}
                >
                  <p className="mt-2 text-xs">이미 가입된 계정이 있으신가요?</p>
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
