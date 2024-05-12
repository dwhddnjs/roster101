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
import React, { useState, useTransition } from "react"
import Image from "next/image"
import { SocialButton } from "../_components/social-button"
import { Divider } from "@/components/divider"
import { useRouter } from "next/navigation"
import { LoginSchema } from "../schemas"
import { login } from "@/actions/login"
import { useMediaQuery } from "usehooks-ts"
import { LoginMobile } from "../_components/login-mobile"

function LoginPage() {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const { push } = useRouter()
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      login(values).catch((error) => {
        console.log(error)
      })
    })
  }

  return (
    <>
      {isMobile ? (
        <LoginMobile form={form} onSubmit={onSubmit} isPending={isPending} />
      ) : (
        <div className="bg-[#1a1a1a] flex justify-center items-center h-full p-50 ">
          <div className="bg-[#1e1e1e] w-[1200px] h-[700px] flex flex-row border-2 border-[#1e1e1e] drop-shadow-2xl">
            <div className="w-[45%] flex justify-center items-center">
              <Image
                src="/images/esport_icon.svg"
                width={300}
                height={300}
                alt="esport_icon"
              />
            </div>
            <div className="w-[55%] bg-[#272727] px-24 py-32 space-y-6">
              <div className="space-y-3">
                <h2 className="text-white font-bold text-4xl">Login</h2>
                <p className="text-[#c4c4c4] text-sm">
                  이메일와 비밀번호를 입력해주세요.
                </p>
              </div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
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
                  </div>
                  <div className="mt-10 flex flex-col ">
                    <Button size="lg" type="submit" disabled={isPending}>
                      로그인
                    </Button>
                    <Divider isAuth />
                    <SocialButton disabled={isPending} />
                    <Button
                      type="submit"
                      variant="link"
                      disabled={isPending}
                      onClick={(e) => {
                        e.preventDefault()
                        push("/auth/register")
                      }}
                    >
                      <p className="mt-12 text-xs">회원가입을 원하시나요 ?</p>
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default LoginPage
