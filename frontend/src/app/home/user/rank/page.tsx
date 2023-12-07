'use client'
import { Separator } from '@/components/ui/separator'
import api from '@/lib/api'
import { movieType } from '@/lib/types/movie'
import { ArrowFatLinesUp, ArrowFatLinesDown } from '@phosphor-icons/react'

import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { useAuthStore } from '../../../../../hooks/useAuthStore'
import { AuthStore } from '@/stores/auth'

export default function UserRankPage() {
  const user = useAuthStore(AuthStore, (store) => store.state.user)

  const [active, setActive] = useState<number>(1)
  const [order, setOrder] = useState<string>('asc')
  const [movies, setMovies] = useState<movieType[]>([])

  console.log(user)

  const getMovies = async () => {
    const allMovies = await api.movies.userRank()
    console.log(allMovies.data)
    setMovies(allMovies.data)
  }
  useEffect(() => {
    getMovies()
  }, [])

  return (
    <section className="w-full flex fçex-col justify-center mt-2">
      <div className="min-w-min w-3/4 bg-figma-gray p-6 rounded-xl flex flex-col items-center">
        <nav className="w-full flex ">
          <div className="w-1/2 space-x-10">
            <button
              onClick={() => {
                setActive(1)
                getMovies()
                setOrder('asc')
              }}
              className={`${
                active === 1 ? 'bg-figma-purple' : ''
              } cursor-pointer rounded-full p-1 text-sm`}
            >
              Geral
            </button>
          </div>
        </nav>
        <div className="w-full h-fit py-2 flex justify-center space-x-2">
          <ArrowFatLinesUp
            size={28}
            color="#fff"
            weight={order === 'asc' ? 'fill' : 'thin'}
            onClick={() => {
              if (order !== 'asc') {
                setMovies(movies.reverse())
                setOrder('asc')
              }
            }}
          />

          <ArrowFatLinesDown
            size={28}
            color="#fff"
            weight={order === 'desc' ? 'fill' : 'thin'}
            onClick={() => {
              if (order !== 'desc') {
                setMovies(movies.reverse())
                setOrder('desc')
              }
            }}
          />
        </div>
        {movies.length > 0 ? (
          movies.map((movie, idx) => {
            return (
              <div
                className="w-3/4 bg-figma-gray p-6 rounded-xl flex flex-col items-center"
                key={movie.id}
              >
                <div className="bg-figma-gray2 w-full h-16 rounded-xl gap-5 p-2 flex items-center shadow-sm">
                  <div className="w-1/2 flex space-x-4">
                    <span className="text-base ml-2">{idx + 1}° </span>
                    <Separator
                      orientation="vertical"
                      className="h-7 bg-figma-white relative"
                    ></Separator>
                    <span>{movie.title}</span>
                  </div>

                  <div className="w-1/2 flex justify-end mr-4">
                    <span>
                      Votos:
                      <span className="font-bold"> {movie.love_amount}</span>
                    </span>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <p>Você ainda não classificou nenhum filme</p>
        )}
      </div>
    </section>
  )
}
