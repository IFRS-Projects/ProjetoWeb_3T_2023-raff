'use client'

import api from '@/lib/api'
import { movieType } from '@/lib/types/movie'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import UpdateModal from '../Modal'
import { Button } from '../ui/button'

export default function HandleMovies() {
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
    <div className="py-10">
      <div className="mx-auto max-w-sm space-y-4 rounded-lg p-4">
        {movies?.length ? (
          movies.map((movie) => {
            return (
              <div
                key={movie.id}
                className="bg-figma-gray2 w-3/4 h-16 rounded-xl gap-5 mb-4 p-2 flex items-center shadow-sm"
              >
                <div className="w-1/2">
                  <span className="text-base ml-2">{movie.title}</span>
                </div>
                <div className="w-1/2 flex items-center justify-end mr-5 gap-4">
                  <UpdateModal movie={movie} />

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
              </div>
            )
          })
        ) : (
          <p className="font-bold text-xl">Não há filmes cadastrados!</p>
        )}
      </div>
    </div>
  )
}
