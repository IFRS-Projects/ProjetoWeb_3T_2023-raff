'use client'
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

export default function FormEdit() {

  return (
    <div className="min-w-min w-3/4 bg-figma-gray p-6 rounded-xl flex flex-col items-center">
      <div className="bg-figma-gray2 w-3/4 h-16 rounded-xl gap-5 p-2 flex items-center shadow-sm">
        <span className="text-base ml-2">Nome do Filme</span>
        <Separator orientation="vertical" className="h-7 bg-figma-white"></Separator>
        <Button className="h-6 rounded-full">Editar</Button>
        <Separator orientation="vertical" className="h-7 bg-figma-white"></Separator>
        <Button className="h-6 rounded-full">Excluir</Button>
      </div>
    </div>
  )
}