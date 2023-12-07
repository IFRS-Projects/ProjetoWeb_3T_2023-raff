'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AdminHome({ children }: { children: React.ReactNode }) {
  const [page, setPage] = useState<number>(4)
  const { push } = useRouter()

  return (
    <section className="flex-1 flex-col p-6 flex gap-6 justify-start items-center">
      <div className="w-3/4 h-12 bg-figma-gray flex justify-around items-center rounded-full">
        <a
          onClick={() => {
            push('/home/admin/rank')
            setPage(4)
          }}
          className={`w-20 h-8 rounded-full flex justify-center items-center font-bold cursor-pointer ${
            page === 4 ? 'bg-figma-purple' : ''
          }`}
        >
          Ranks
        </a>
        <a
          onClick={() => {
            push('/home/admin/create')

            setPage(2)
          }}
          className={`w-20 h-8 rounded-full flex justify-center items-center font-bold cursor-pointer ${
            page === 2 ? 'bg-figma-purple' : ''
          }`}
        >
          Criar
        </a>
        <a
          onClick={() => {
            push('/home/admin/list')

            setPage(3)
          }}
          className={`w-20 h-8 rounded-full flex justify-center items-center font-bold cursor-pointer ${
            page === 3 ? 'bg-figma-purple' : ''
          }`}
        >
          Listagem
        </a>
      </div>

      {children}
    </section>
  )
}
