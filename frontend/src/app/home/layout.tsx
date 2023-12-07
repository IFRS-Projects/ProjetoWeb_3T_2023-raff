/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import { AuthStore } from '@/stores/auth'
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarLabel,
  MenubarSeparator,
  MenubarItem,
} from '@/components/ui/menubar'
import { useAuthStore } from '../../../hooks/useAuthStore'
import { House, User } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import logo from '@/img/logo.svg'
import title from '@/img/title-name.svg'
import { Separator } from '@/components/ui/separator'

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { push } = useRouter()
  const {
    actions: { logout },
  } = AuthStore()
  const user = useAuthStore(AuthStore, (store) => store.state.user)

  return (
    <>
      <div className="min-h-screen flex flex-col bg-background">
        <div className="px-6 py-3 flex items-center justify-between border-b bg-figma-gray">
          <div className="flex items-center gap-2">
            <Image src={logo} alt="logo" />
            <Image className="w-24" src={title} alt="title" />
          </div>
          <div className="flex items-center gap-3">
            <button
              className="cursor-pointer"
              onClick={() => push('/home/user')}
            >
              <House size={24} weight="thin" />
            </button>
            <Separator orientation="vertical" className="h-6"></Separator>
            <Menubar className="rounded-xl">
              <MenubarMenu>
                <MenubarTrigger className="rounded-xl">
                  <User size={18} />
                </MenubarTrigger>
                <MenubarContent className="rounded-[6px]">
                  {user?.sub !== '' ? (
                    <>
                      <MenubarLabel className="rounded-xl w-full justify-center flex">
                        {user?.username}
                      </MenubarLabel>
                      <MenubarSeparator />
                      <MenubarItem
                        className="rounded-[6px]"
                        onClick={() => {
                          push('/user/account')
                        }}
                      >
                        Perfil
                      </MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem
                        className="rounded-[6px]"
                        onClick={() => {
                          logout()
                          push('/API/auth/user/logout')
                        }}
                      >
                        Logout
                      </MenubarItem>
                      {/* @ts-ignore */}
                      {user?.permissions.includes('MASTER') && (
                        <>
                          <MenubarSeparator />
                          <MenubarItem
                            className="rounded-[6px]"
                            onClick={() => push('/home/admin/rank')}
                          >
                            Dashboard
                          </MenubarItem>
                        </>
                      )}
                    </>
                  ) : (
                    <MenubarItem
                      className="rounded-xl"
                      onClick={() => {
                        push('/user/login')
                      }}
                    >
                      login
                    </MenubarItem>
                  )}
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
        {children}
      </div>
    </>
  )
}
