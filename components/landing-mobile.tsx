"use client"

import Image from "next/image"
import React from "react"
import { Button } from "./ui/button"
import { useUser } from "@/hooks/useUser"
import { useRouter } from "next/navigation"

export const LandingMobile = () => {
  const user = useUser()
  const { push } = useRouter()

  return (
    <div className="w-full h-full bg-[#1a1a1a] flex flex-col  justify-center items-center pt-[24px] ">
      <div className="flex flex-col justify-between items-center pt-[64px] h-full relative w-full px-[18px]">
        <div className="text-center space-y-2 z-20">
          <h3 className="text-3xl font-extrabold text-white tracking-wide">
            당신만의 LCK 로스터를 <br />
            만들어보세요!
          </h3>
          <p className="text-sm text-[#c4c4c4] leading-4 tracking-wide ">
            E-Sports LCK 선수 평균 계약기간 1년 ~ 2년
            <br /> LCK 스토브리그 선수 영입 경쟁 속에서 <br />
            당신만의 로스터를 구성 해보세요!!
          </p>
          <div className="space-x-6 p-[18px] mr-3  ">
            <Button
              onClick={() => push("/roster")}
              className=" bg-[#555555] text-sm rounded-none font-bold "
            >
              로스터 만들기
            </Button>
            {!user && (
              <Button
                onClick={() => push("/auth/login")}
                className=" bg-[#272727] text-sm rounded-none font-bold"
              >
                로그인
              </Button>
            )}
          </div>
        </div>
        <div className=" shadow-[#272727] shadow-xl border-2 border-[#1e1e1e] absolute -bottom-44">
          <Image
            src="/images/rending_mobile.png"
            width={320}
            height={200}
            alt="roster101 rending_mobile_icon"
          />
        </div>
      </div>
    </div>
  )
}
