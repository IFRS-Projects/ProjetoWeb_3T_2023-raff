import Image from "next/image";
import background from '@/img/backgound-purple.svg'
import logo from '@/img/logo.svg'
import title from '@/img/title-name.svg'
import { Button } from "@/components/ui/button";
import input from "postcss/lib/input";
import { Input } from "@/components/Input/Input";

export default function Login() {
  return (
    <div className={`min-h-screen flex flex-col`}>
      <main className="flex-1 flex gap-6">
        <aside className="w-80 space-y-6 relative flex flex-col items-center justify-start">
          <Image className="w-full h-full object-cover" src={background} alt="" />
          <div className="absolute flex w-full h-10 justify-center items-center">
            <Image className="w-14 mr-2" src={logo} alt="logotype flickery" />
            <Image className="w-28 mt-2" src={title} alt="title flickery" />
          </div>
        </aside>
        <div className="w-3/4 flex flex-col justify-center items-center">
          <div className="text-2xl flex">
            <div className="w-52 border-b-2 border-b-white">
              <a className="w-full mr-4 p-1 flex justify-center">Log in</a>
            </div>
            <div className="w-52 border-b-2 border-b-white">
              <a className="w-full mr-4 p-1 flex justify-center">Register</a>
            </div>
          </div>
          <form action="" className="flex flex-col items-center">
            <Input label="Email" type="email" />
            <Input label="Senha" type="password" />
            <Button className="rounded-full">Entrar</Button>
          </form>
        </div>
      </main>
    </div>
  )
}