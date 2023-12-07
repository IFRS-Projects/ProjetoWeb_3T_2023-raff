'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [page, setPage] = useState<number>(1)

  const { push } = useRouter()

  return (
    <>
      <section className="w-full h-fit flex flex-col justify-center items-center">
        <div className="w-3/4 h-12 bg-figma-gray flex justify-around items-center rounded-full mt-2">
          <a
            onClick={() => {
              setPage(1)
              push('/home/user')
            }}
            className={`w-20 h-8 rounded-full flex justify-center items-center font-bold cursor-pointer ${
              page === 1 ? 'bg-figma-purple' : ''
            }`}
          >
            Listar
          </a>
          <a
            onClick={() => {
              setPage(2)
              push('/home/user/rank')
            }}
            className={`w-20 h-8 rounded-full flex justify-center items-center font-bold cursor-pointer ${
              page === 2 ? 'bg-figma-purple' : ''
            }`}
          >
            Ranks
          </a>
        </div>
      </section>
      {children}
    </>
  )
}
