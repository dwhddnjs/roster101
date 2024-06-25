import * as z from "zod"

export const PlayerSchema = z.object({
  img: z.string().optional(),
  position: z.string().min(1, { message: "포지션을 선택해주세요" }),
  nickname: z.string().min(1, { message: "최소 1글자 이상 작성해주세요" }),
  name: z.string().min(1, { message: "최소 1글자 이상 작성해주세요" }),
  career: z.array(z.string()).optional(),
})
