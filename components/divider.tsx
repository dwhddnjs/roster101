"use client"

import React from "react"

interface DividerProps {
  isAuth: boolean
}

export const Divider = ({ isAuth }: DividerProps) => {
  return (
    <div className=" flex justify-center items-center space-x-3 py-3">
      {isAuth ? (
        <>
          <div className="w-full bg-[#c4c4c4] h-[1px] " />
          <p className="text-[#c4c4c4] text-[14px]">or</p>
          <div className="w-full bg-[#c4c4c4] h-[1px] " />
        </>
      ) : (
        <div className="w-full bg-[#c4c4c4] h-[1px] " />
      )}
    </div>
  )
}
