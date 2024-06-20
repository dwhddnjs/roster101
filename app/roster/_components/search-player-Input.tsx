"use client"

import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"
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
    <div className="bg-[#1a1a1a] flex items-center  border-[1px] border-[#1a1a1a] rounded-md ">
      <div className="p-3 ">
        <SearchIcon size={18} className="" color="#c4c4c4" />
      </div>
      <Input
        placeholder="Ex :)  이상혁  or  faker"
        className="min-w-[240px]  bg-[#1e1e1e] border-none focus:outline-0 text-[#c4c4c4] text-xs"
        value={searchValue}
        onChange={onChangeSearchValue}
      />
    </div>
  )
}
