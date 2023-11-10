'use client'
import Image from "next/image";
import background from '@/img/backgound-purple.svg'
import logo from '@/img/logo.svg'
import title from '@/img/title-name.svg'
import FormLogin from '@/components/FormLogin/page'
import FormRegister from '@/components/FormRegister/page'
import { useState } from "react";

export default function Login() {
  const [page, setPage] = useState<number>(1)
  return (
    <div className={`min-h-screen flex flex-col`}>
      <main className="flex-1 flex gap-6">
        <aside className="w-80 space-y-6 relative flex flex-col items-center justify-start">
          <Image className="w-full h-full object-cover" src={background} alt="" />
          <div className="absolute flex w-full h-10 mr-10 justify-center items-center">
            <Image className="w-14 mr-2" src={logo} alt="logotype flickery" />
            <Image className="w-28 mt-2" src={title} alt="title flickery" />
          </div>
        </aside>
        <div className="w-3/4 flex flex-col justify-center items-center">
          <div className="text-2xl flex">
            <div
              className={`w-52 cursor-pointer ${page === 1 ? 'border-b-8 border-b-figma-purple' : 'border-b-2 border-b-white'}`}
              onClick={() => setPage(1)}>
              <a className="w-full mr-4 p-1 flex justify-center">Log in</a>
            </div>
            <div
              className={`w-52 cursor-pointer ${page === 2 ? 'border-b-8 border-b-figma-purple' : 'border-b-2 border-b-white'}`}
              onClick={() => setPage(2)}>
              <a className="w-full mr-4 p-1 flex justify-center">Register</a>
            </div>
          </div>
          {page === 1 ? <FormLogin /> : <FormRegister />}
        </div>
      </main>
    </div>
  )
}