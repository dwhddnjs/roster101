import { error } from "console"
import { roster } from "@/actions/roster"
import { NextApiRequest, NextApiResponse } from "next"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await roster()
    console.log("response: ", response)
    return NextResponse.json(response)
  } catch (error) {
    return new NextResponse("Interal error", { status: 500 })
  }
}
