"use server"

import { LoginSchema } from "@/app/auth/schemas"
import { signIn } from "@/auth"
import { getUserByEmail } from "@/prisma/data/user"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { AuthError } from "next-auth"
import * as z from "zod"

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedField = LoginSchema.safeParse(values)

  if (!validatedField.success) {
    return { error: "잘못된 정보를 작성하셨습니다" }
  }

  const { email, password } = validatedField.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "이메일이 존재하지 않습니다" }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "유효하지 않은 정보입니다" }
        default:
          return { error: "잘못된 정보 입니다" }
      }
    }
    throw error
  }
}
