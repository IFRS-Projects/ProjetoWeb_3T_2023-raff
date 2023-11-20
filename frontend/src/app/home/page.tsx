'use client'
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { Separator } from "@/components/ui/separator";
import logo from '@/img/logo.svg'
import title from '@/img/title-name.svg'
import Image from "next/image";
import { useState } from "react";
import List from '@/components/List/page'
import Create from '@/components/FormCreate/page'
import Edit from '@/components/FormEdit/page'
import Rank from '@/components/Rank/page'
import { User } from "@phosphor-icons/react";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { AuthStore } from "@/stores/auth";
import { useRouter } from "next/navigation";

export default function Home() {
  const [page, setPage] = useState<number>(1)
  const { push } = useRouter()
  const { actions: {
    logout
  }} = AuthStore()
  const user = useAuthStore(AuthStore,(store) => store.state.user)
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
                <User size={18} />
              </MenubarTrigger>
              <MenubarContent>
              { user?.sub !== '' ? 
                  <MenubarItem className="rounded-xl" onClick={() => {
                    logout()
                    push('/API/auth/user/logout')
                }}>
                  Logout
                </MenubarItem>
                :
                  <MenubarItem className="rounded-xl" onClick={() => {
                    push('/user/login')
                  }}>login</MenubarItem>
              }
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
