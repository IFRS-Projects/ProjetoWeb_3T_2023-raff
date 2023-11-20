'use client'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import api from '@/lib/api'
import { movieType } from '@/lib/types/movie'
import { toast } from 'sonner'

export default function FormEdit() {
  const [movies, setMovies] = useState<movieType[]>([])
  const getAllMovies = async () => {
    const r = await api.movies.list()
    if (r.success) {
      setMovies(r.data)
    }
  }
  useEffect(() => {
    getAllMovies()
  }, [])

  return (
    <div className="min-w-min w-3/4 bg-figma-gray p-6 rounded-xl flex flex-col items-center">
      {movies?.length ? (
        movies.map((movie) => {
          return (
            <div
              key={movie.id}
              className="bg-figma-gray2 w-3/4 h-16 rounded-xl gap-5 p-2 flex items-center shadow-sm"
            >
              <span className="text-base ml-2">{movie.title}</span>
              <Separator
                orientation="vertical"
                className="h-7 bg-figma-white"
              ></Separator>
              <Button className="h-6 rounded-full">Editar</Button>
              <Separator
                orientation="vertical"
                className="h-7 bg-figma-white"
              ></Separator>
              <Button
                className="h-6 rounded-full"
                onClick={async () => {
                  toast.promise(api.movies.delete(movie.id), {
                    loading: 'Loading...',
                    duration: 2000,

                    success: () => {
                      setMovies((prev) =>
                        prev.filter((Fmovie) => Fmovie.id !== movie.id),
                      )
                      return `${movie.title} excluido com sucesso!`
                    },
                    error: `Não foi possivel excluir ${movie.title}, tente novamente!`,
                  })
                }}
              >
                Excluir
              </Button>
            </div>
          )
        })
      ) : (
        <p className="font-bold text-xl">Não há filmes cadastrados!</p>
      )}
    </div>
  )
}
