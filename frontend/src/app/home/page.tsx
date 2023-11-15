'use client'
import { Button } from "@/components/ui/button";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { Separator } from "@/components/ui/separator";
import logo from '@/img/logo.svg'
import title from '@/img/title-name.svg'
import Image from "next/image";
import teste from '@/img/img.svg'
import { useState } from "react";
import List from '@/components/List/page'
import Create from '@/components/FormCreate/page'
import Edit from '@/components/FormEdit/page'
import Rank from '@/components/Rank/page'


export default function Home() {
  const [page, setPage] = useState<number>(1)
  return (
    <div className='min-h-screen flex flex-col bg-background'>
      <div className="px-6 py-3 flex items-center justify-between border-b bg-figma-gray">
        <div className="flex items-center gap-2">
          <Image src={logo} alt="logo" />
          <Image className="w-24" src={title} alt="title" />
        </div>
        <div className="flex items-center gap-3">
          <Separator orientation="vertical" className="h-6"></Separator>


          <Menubar className="bg-figma-gray">
            <MenubarMenu>
              <MenubarTrigger className="rounded-xl">
                User
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem className="rounded-xl">
                  Logout
                </MenubarItem>

              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>

      <main className="flex-1 flex-col p-6 flex gap-6 justify-start items-center">
        <div
          className="w-3/4 h-12 bg-figma-gray flex justify-around items-center rounded-full">
          <a onClick={() => setPage(1)}
            className={`w-20 h-8 rounded-full flex justify-center items-center font-bold cursor-pointer ${page === 1 ? 'bg-figma-purple' : ''}`}>
            Listar
          </a>
          <a onClick={() => setPage(2)}
            className={`w-20 h-8 rounded-full flex justify-center items-center font-bold cursor-pointer ${page === 2 ? 'bg-figma-purple' : ''}`}>
            Criar
          </a>
          <a onClick={() => setPage(3)}
            className={`w-20 h-8 rounded-full flex justify-center items-center font-bold cursor-pointer ${page === 3 ? 'bg-figma-purple' : ''}`}>
            Editar
          </a>
          <a onClick={() => setPage(4)}
            className={`w-20 h-8 rounded-full flex justify-center items-center font-bold cursor-pointer ${page === 4 ? 'bg-figma-purple' : ''}`}>
            Rank
          </a>
        </div>
        {page === 1 ? <List /> : ''}
        {page === 2 ? <Create /> : ''}
        {page === 3 ? <Edit /> : ''}
        {page === 4 ? <Rank /> : ''}
      </main>
    </div>
  )
}
