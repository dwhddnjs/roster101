"use client"

import { Input } from "@/components/ui/input"
import { SearchCheck, SearchIcon } from "lucide-react"
import React from "react"

interface SearchPlayerInputProps {
  searchValue: string
  onChangeSearchValue: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const SearchPlayerInput = ({
  searchValue,
  onChangeSearchValue,
}: SearchPlayerInputProps) => {
  return (
    <div className="bg-[#1a1a1a] flex items-center justify-center border-2 border-[#555555] rounded-lg ">
      <div className="p-3  ">
        <SearchIcon size={18} className="" color="#c4c4c4" />
      </div>
      <Input
        placeholder="이름 또는 닉네임을 검색해주세요"
        className="w-[240px] bg-[#1f1f1f] border-none focus:outline-0 text-[#c4c4c4]"
        value={searchValue}
        onChange={onChangeSearchValue}
      />
    </div>
  )
}
