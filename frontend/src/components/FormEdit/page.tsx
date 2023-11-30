'use client'
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import api from "@/lib/api";
import { movieType } from "@/lib/types/movie";

export default function FormEdit() {

  const [movies, setMovies] = useState<movieType[]>([])
  const getAllMovies = async () => {
    const r = await api.movies.findAll()
    // @ts-ignore
    setMovies(r.data)
  }
  useEffect(() => {
    getAllMovies()
  }, [])

  return (
    <div className="min-w-min w-3/4 bg-figma-gray p-6 rounded-xl flex flex-col items-center">
      {movies?.length && movies.map(movie => {
        return (
          <div className="bg-figma-gray2 w-3/4 h-16 rounded-xl gap-5 p-2 flex items-center shadow-sm">
            <span className="text-base ml-2">{movie.title}</span>
            <Separator orientation="vertical" className="h-7 bg-figma-white"></Separator>
            <Button className="h-6 rounded-full">Editar</Button>
            <Separator orientation="vertical" className="h-7 bg-figma-white"></Separator>
            <Button className="h-6 rounded-full" onClick={async () => {
              await api.movies.delete(movie.id)
            }}>Excluir</Button>
          </div>
        )
      })}
    </div>
  )
}