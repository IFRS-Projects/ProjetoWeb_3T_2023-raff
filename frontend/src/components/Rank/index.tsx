'use client'
import { Separator } from '../ui/separator'
import { useEffect, useState } from 'react'
import api from '@/lib/api'
import { movieType } from '@/lib/types/movie'
import { toast } from 'sonner'
import { ArrowFatLinesDown, ArrowFatLinesUp } from '@phosphor-icons/react'

export default function Rank() {
  const [active, setActive] = useState<number>(1)
  const [order, setOrder] = useState<string>('asc')
  const [movies, setMovies] = useState<movieType[]>([])

  const getMovies = async () => {
    const allMovies = await api.movies.rank()
    console.log(allMovies.data)
    setMovies(allMovies.data)
  }
  useEffect(() => {
    getMovies()
  }, [])

  return (
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

          <button
            onClick={async () => {
              setActive(3)
              const res = await api.movies.highLove()
              if (res.success) {
                setMovies(res.data)
                setOrder('asc')
              } else {
                toast.error(
                  'Ocorreu um erro ao buscar os filmes! Tente novamente',
                )
              }
            }}
            className={`${
              active === 3 ? 'bg-figma-purple' : ''
            } cursor-pointer rounded-full p-1 text-sm`}
          >
            Mais amados
          </button>
          <button
            onClick={async () => {
              setActive(4)
              const res = await api.movies.lowLove()
              if (res.success) {
                setMovies(res.data)
                setOrder('asc')
              } else {
                toast.error(
                  'Ocorreu um erro ao buscar os filmes! Tente novamente',
                )
              }
            }}
            className={`${
              active === 4 ? 'bg-figma-purple' : ''
            } cursor-pointer rounded-full p-1 text-sm`}
          >
            Menos amados
          </button>
        </div>
      </nav>
      <div className="w-full h-fit py-2 flex justify-end mr-10 space-x-2">
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
                  <span className="text-base ml-2 font-bold text-figma-purple">
                    {idx + 1}°{' '}
                  </span>
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
        <p>Não há filmes cadastrados!</p>
      )}
    </div>
  )
}
