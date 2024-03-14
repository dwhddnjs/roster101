"use server"

import { RegisterSchema } from "@/app/auth/schemas"
import { db } from "@/lib/db"
import { getUserByEmail } from "@/prisma/data/user"

import bcrypt from "bcryptjs"
import * as z from "zod"

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedField = RegisterSchema.safeParse(values)

  if (!validatedField.success) {
    return { error: "Invalid fields" }
  }

  const { email, password, name } = validatedField.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return { error: "사용중인 이메일 입니다" }
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  })

  return { success: "회원가입이 되었습니다" }
}
