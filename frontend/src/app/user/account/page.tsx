'use client'
import { User } from '@phosphor-icons/react'
import logo from '@/img/logo.svg'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar'
import Image from 'next/image'
import title from '@/img/title-name.svg'
import { Separator } from '@/components/ui/separator'
import { useRouter } from 'next/navigation'
import { AuthStore } from '@/stores/auth'
import { useAuthStore } from '../../../../hooks/useAuthStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  title: z.string({
    required_error: 'É necessário um nome',
    invalid_type_error: 'O nome precisa ser uma string.',
  }),
  description: z.string(),
  file: z.any(),
})

type formProps = z.infer<typeof schema>

export default function Account() {
  const { handleSubmit } = useForm<formProps>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues: {
      description: '',
      file: [],
      title: '',
    },
  })
  const handleForm = (data: formProps) => {
    console.log(data)
  }
  const { push } = useRouter()
  const {
    actions: { logout },
  } = AuthStore()
  const user = useAuthStore(AuthStore, (store) => store.state.user)
  return (
    <div className="min-h-screen flex flex-col bg-background justify-start items-center">
      <div className="px-6 py-3 flex items-center justify-between border-b bg-figma-gray w-full mb-6">
        <div className="flex items-center gap-2">
          <Image src={logo} alt="logo" />
          <Image className="w-24" src={title} alt="title" />
        </div>
        <div className="flex items-center gap-3">
          <Separator orientation="vertical" className="h-6"></Separator>

          <Menubar className="rounded-md">
            <MenubarMenu>
              <MenubarTrigger className="rounded-xl">
                <User size={18} />
              </MenubarTrigger>
              <MenubarContent>
                {user?.sub !== '' ? (
                  <>
                    <MenubarLabel className="rounded-xl w-full justify-center flex">
                      {user?.username}
                    </MenubarLabel>
                    <MenubarSeparator />
                    <MenubarItem
                      className="rounded-xl"
                      onClick={() => {
                        push('/user/account')
                      }}
                    >
                      Perfil
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem
                      className="rounded-xl"
                      onClick={() => {
                        logout()
                        push('/API/auth/user/logout')
                      }}
                    >
                      Logout
                    </MenubarItem>
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
      <div className="w-2/4 bg-figma-gray p-6 rounded-xl flex flex-col items-center ">
        <form
          className="p-6 flex flex-col items-center"
          onSubmit={handleSubmit(handleForm)}
        >
          <Input type="text" />
          <Input type="text" />
          <Input type="text" />
          <Button className="rounded-full mt-4">Cadastrar</Button>
        </form>
      </div>
    </div>
  )
}
