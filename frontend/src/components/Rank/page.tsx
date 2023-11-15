'use client'
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { useState } from "react";
import { ArrowFatDown } from '@phosphor-icons/react'

export default function Rank() {
  const [order, setOrder] = useState<number>(1)
  return (
    <div className="min-w-min w-3/4 bg-figma-gray p-6 rounded-xl flex flex-col items-center">
      <nav className="w-full flex ">
        <div className="w-1/2 space-x-10">
          <a onClick={() => setOrder(1)}
            className={`${order === 1 ? 'bg-figma-purple' : ''} cursor-pointer rounded-full p-1 text-sm`}>
            Mais vistos
          </a>
          <a onClick={() => setOrder(2)}
            className={`${order === 2 ? 'bg-figma-purple' : ''} cursor-pointer rounded-full p-1 text-sm`}>
            Menos vistos
          </a>
        </div>
      </nav>
      <div className="min-w-min w-3/4 bg-figma-gray p-6 rounded-xl flex flex-col items-center">
        <div className="bg-figma-gray2 w-3/4 h-16 rounded-xl gap-5 p-2 flex items-center shadow-sm">
          <span className="text-base ml-2">{1}° </span>
          <Separator orientation="vertical" className="h-7 bg-figma-white"></Separator>
          <span>Nome filme</span>
          <Separator orientation="vertical" className="h-7 bg-figma-white"></Separator>
          <span>
            Votos:
            <span className="font-bold"> 1111</span>
          </span>
        </div>
      </div>
    </div>
  )
}