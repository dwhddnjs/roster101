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
import { useRouter } from "next/navigation"
import { RegisterSchema } from "../schemas"
import { register } from "@/actions/register"
import { toast } from "sonner"
import { useMediaQuery } from "usehooks-ts"
import { RegisterMobile } from "../_components/register-mobile"

function RegisterPage() {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const { push } = useRouter()
  const [isLoading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setLoading(true)
    try {
      const res = await register(values)
      if (res.success) {
        toast(res.success)
        push("/auth/login")
      }
      if (res.error) {
        toast(res.error)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {isMobile ? (
        <RegisterMobile form={form} onSubmit={onSubmit} isPending={isLoading} />
      ) : (
        <div className="bg-[#1a1a1a] flex justify-center items-center h-full p-50 ">
          <div className="bg-[#1e1e1e] w-[1200px] h-[700px] flex flex-row border-2 border-[#1e1e1e] drop-shadow-2xl ">
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
                <h2 className="text-white font-bold text-4xl">Sign up</h2>
                <p className="text-[#c4c4c4] text-sm">
                  회원가입 양식에 맞게 입력 해주세요.
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
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#c4c4c4] font-semibold pl-1">
                            Name*
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="bg-[#1e1e1e] border-[#1a1a1a] text-white h-12 placeholder:text-[#555555]"
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
                  <div className="mt-8 flex flex-col ">
                    <Button size="lg" type="submit" disabled={isLoading}>
                      회원가입
                    </Button>

                    <Button
                      type="submit"
                      variant="link"
                      disabled={isLoading}
                      onClick={(e) => {
                        e.preventDefault()
                        push("/auth/login")
                      }}
                    >
                      <p className="mt-2 text-xs">
                        이미 가입된 계정이 있으신가요?
                      </p>
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

export default RegisterPage
