"use client"

import { PlusIcon } from "lucide-react"
import { CldUploadButton, CldUploadWidget } from "next-cloudinary"
import React, { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { usePlayerListModal } from "@/hooks/usePlayerListModalStore"
import { useSaveRosterModalStore } from "@/hooks/useSaveRosterModalStore"
import { Input } from "./ui/input"

interface ImageUploaderProps {
  value: string
  onChange: (result: any) => void
}

export const ImageUploader = ({ value, onChange }: ImageUploaderProps) => {
  //   const onUpload = (result: any) => {
  //     console.log("result: ", result)
  //     onChange(result.info.secure_url)
  //   }
  //   const [value2, setValue2] = useState()
  //   console.log("value2: ", value2)

  return (
    // <CldUploadWidget uploadPreset="jkydykab">
    //   {({ open }) => {
    //     const onClick = (e: any) => {
    //       e.preventDefault()
    //       open()
    //     }
    //     return (
    //       <Button
    //         type="button"
    //         onClick={onClick}
    //         className="w-[180px] h-[240px] flex justify-center items-center border-2 border-[#1e1e1e] bg-[#1e1e1e] rounded-lg"
    //       >
    //         <PlusIcon color="#555555" width={32} height={32} />
    //       </Button>
    //     )
    //   }}
    // </CldUploadWidget>
    <Button
      type="button"
      className="w-[180px] h-[240px] flex justify-center items-center border-2 border-[#1e1e1e] bg-[#1e1e1e] rounded-lg"
    >
      <Input
        type="file"
        onChange={(e) => onChange(e.target.value)}
        value={value}
        className="absolute w-[180px] h-[240px] opacity-0"
      />
      <PlusIcon color="#555555" width={32} height={32} />
    </Button>
  )
}
