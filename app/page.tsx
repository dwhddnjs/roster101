"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useUser } from "@/hooks/useUser"
import { useMediaQuery } from "usehooks-ts"
import { LandingMobile } from "@/components/landing-mobile"

export default function HomePage() {
  const { push } = useRouter()
  const isMobile = useMediaQuery("(max-width: 768px)")
  const user = useUser()

  if (isMobile) {
    return <LandingMobile />
  }

  return (
    <div className="w-full h-full bg-[#1a1a1a] flex flex-col  justify-center items-center pt-[48px] ">
      <div className="flex flex-col justify-between items-center pt-[80px] h-screen">
        <div className="text-center space-y-6 ">
          <h3 className="text-4xl font-extrabold text-white tracking-wide">
            당신만의 LCK 로스터를 만들어보세요!
          </h3>
          <p className="text-md text-[#c4c4c4] leading-5 tracking-wide">
            E-Sports LCK 선수 평균 계약기간 1년 ~ 2년
            <br /> 치열한 LCK 스토브리그 선수 영입 경쟁에서 전력적인 승리를 위해
            <br />
            당신만의 매력적인 로스터를 구성 해보세요!!
          </p>
          <div className="space-x-5 pb-[48px] mr-3  ">
            <Button
              onClick={() => push("/roster")}
              className="w-[160px] h-[44px] bg-[#555555] text-[16px] rounded-none font-bold "
            >
              로스터 만들기
            </Button>
            {!user && (
              <Button
                onClick={() => push("/auth/login")}
                className="w-[120px] h-[44px] bg-[#272727] text-[16px] rounded-none font-bold"
              >
                로그인
              </Button>
            )}
          </div>
        </div>
        <div className=" shadow-[#272727] shadow-2xl border-2 border-[#1e1e1e] ">
          <Image
            src="/images/landing.png"
            width={1200}
            height={400}
            alt="roster101 landing"
          />
        </div>
      </div>
      <div className="w-full h-[48px] flex justify-end px-6 py-3">
        <div className="flex space-x-2">
          <Image
            src="/images/empty_esport_icon.svg"
            width={16}
            height={16}
            alt="roster101 empty_icon"
          />
          <p className="text-[#c4c4c4] text-sm">syd1215no@gmail.com</p>
        </div>
      </div>
    </div>
  )
}
