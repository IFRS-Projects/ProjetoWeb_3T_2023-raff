import { ArrowFatLineUp, ArrowFatLineDown } from "@phosphor-icons/react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import Image from "next/image";
import teste from '@/img/img.svg'

export default function List() {
  return (
    <div className="w-3/4 bg-figma-gray p-6 rounded-xl">
      <div className="w-full m-6">
        <span className="text-3xl font-bold">Nome Filme</span>
      </div>
      <div className="w-full m-6 flex">
        <Image className="w-11/12 h-3/4 bg-figma-gray" src={teste} alt="wallpaper movies" />
      </div>
      <div className="w-full flex m-6 gap-6">
        <Button className="rounded-full"><ArrowFatLineUp size={25} /></Button>
        <Separator orientation="vertical" className="h-8"></Separator>
        <Button className="rounded-full"><ArrowFatLineDown size={25} /></Button>
      </div>
    </div>
  )
}