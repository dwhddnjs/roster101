"use client"

import { PlusIcon } from "lucide-react"
import { CldUploadWidget } from "next-cloudinary"
import React, { useEffect, useState } from "react"
import { Button } from "./ui/button"

interface ImageUploaderProps {
  value: string
  onChange: (result: any) => void
}

export const ImageUploader = ({ value, onChange }: ImageUploaderProps) => {
  //   const onUpload = (result: any) => {
  //     console.log("result: ", result)
  //     onChange(result.info.secure_url)
  //   }

  return (
    <CldUploadWidget uploadPreset="jkydykab">
      {({ open }) => {
        const onClick = () => {
          open()
        }
        return (
          <Button
            type="button"
            onClick={onClick}
            className="w-[180px] h-[240px] flex justify-center items-center border-2 border-[#1e1e1e] bg-[#1e1e1e] rounded-lg"
          >
            <PlusIcon color="#555555" width={32} height={32} />
          </Button>
        )
      }}
    </CldUploadWidget>
  )
}
