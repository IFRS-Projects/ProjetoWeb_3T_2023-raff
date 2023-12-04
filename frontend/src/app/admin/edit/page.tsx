'use client'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import logo from '@/img/logo.svg'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import api from '@/lib/api'
import { movieType } from '@/lib/types/movie'
import { useRouter } from 'next/navigation'
import { User } from '@phosphor-icons/react'
import { title } from 'process'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar'
import Image from 'next/image'
import { AuthStore } from '@/stores/auth'
import { useAuthStore } from '../../../../hooks/useAuthStore'

export default function FormEdit() {
  const [movies, setMovies] = useState<movieType[]>([])
  const [open, setOpen] = useState<number>(0)
  const {
    actions: { logout },
  } = AuthStore()
  const user = useAuthStore(AuthStore, (store) => store.state.user)
  const { push } = useRouter()
  const getAllMovies = async () => {
    const r = await api.movies.findAll()

    setMovies(r.data)
  }
  useEffect(() => {
    getAllMovies()
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-background">
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
                {user?.sub !== '' ? (
                  <MenubarItem
                    className="rounded-xl"
                    onClick={() => {
                      logout()
                      push('/API/auth/user/logout')
                    }}
                  >
                    Logout
                  </MenubarItem>
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

      <main className="flex-1 flex-col p-6 flex gap-6 justify-start items-center">
        <div className="max-h-96 flex-col bg-figma-gray2 w-3/4 rounded-xl gap-5 p-2 flex items-center shadow-sm overflow-auto">
          {movies?.length &&
            movies.map((movie) => {
              return (
                <div className="w-full p-2 mt-2" key={movie.id}>
                  <div className="w-full m flex gap-4 items-center justify-start">
                    <span>{movie.title}</span>
                    <Separator
                      orientation="vertical"
                      className="h-4 bg-white"
                    ></Separator>
                    <Button
                      className="h-6 rounded-full"
                      onClick={() => setOpen(1)}
                    >
                      Editar
                    </Button>
                    <Separator
                      orientation="vertical"
                      className="h-4 bg-white"
                    ></Separator>
                    <Button className="h-6 rounded-full">Excluir</Button>
                  </div>
                  <Separator
                    orientation="horizontal"
                    className="w-full bg-white mt-7"
                  ></Separator>
                </div>
              )
            })}
        </div>
      </main>
    </div>
  )
}
