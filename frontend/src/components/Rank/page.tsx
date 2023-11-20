'use client'
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { ArrowFatDown } from '@phosphor-icons/react'
import api from "@/lib/api";
import { movieType } from "@/lib/types/movie";

export default function Rank() {
  const [order, setOrder] = useState<number>(1)
  const [movies, setMovies] = useState<movieType[]>([])

  const getMovies = async () => {
    const allMovies = await api.movies.rank()
    console.log(allMovies.data);
    // @ts-ignore
    setMovies(allMovies.data)
  }
  useEffect(() => { 
    getMovies()
  },[])

  return (
    <div className="min-w-min w-3/4 bg-figma-gray p-6 rounded-xl flex flex-col items-center">
      <nav className="w-full flex ">
        <div className="w-1/2 space-x-10">
          <a onClick={() => {
            setOrder(1)
            setMovies(movies.reverse())
          }}
            className={`${order === 1 ? 'bg-figma-purple' : ''} cursor-pointer rounded-full p-1 text-sm`}>
            Mais vistos
          </a>
          <a onClick={() => {
            setOrder(2)
            setMovies(movies.reverse())
          }}
            className={`${order === 2 ? 'bg-figma-purple' : ''} cursor-pointer rounded-full p-1 text-sm`}>
            Menos vistos
          </a>
        </div>
      </nav>
      {
        movies.map((movie,idx) => {
          return (
            <div className="w-24 bg-figma-gray p-6 rounded-xl flex flex-col items-center" key={movie.id}>
        <div className="bg-figma-gray2 w-64 h-16 rounded-xl gap-5 p-2 flex items-center shadow-sm">
          <span className="text-base ml-2">{idx + 1}° </span>
          <Separator orientation="vertical" className="h-7 bg-figma-white"></Separator>
                <span>{movie.title }</span>
          <Separator orientation="vertical" className="h-7 bg-figma-white"></Separator>
          <span>
            Votos:
                  <span className="font-bold"> { movie.love_amount}</span>
          </span>
        </div>
      </div>
          )
        })
      }
    </div>
  )
}