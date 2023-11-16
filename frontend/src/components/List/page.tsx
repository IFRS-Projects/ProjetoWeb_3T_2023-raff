'use client'
import { ArrowFatLineUp, ArrowFatLineDown } from "@phosphor-icons/react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import Image from "next/image";
import teste from '@/img/img.svg'
import { useEffect, useState } from "react";
import { movieType } from "@/lib/types/movie";
import api from "@/lib/api";

export default function List() {
  const [movies, setMovies] = useState<movieType[]>([])
  const getMovies = async () => {
    const allMovies = await api.movies.findAll()
    console.log(allMovies.data);
    
    setMovies(allMovies.data)
  }
  useEffect(() => { 
    getMovies()
  },[])

  console.log(movies);
  
  return (
    <div className="w-3/4 bg-figma-gray p-6 rounded-xl">
      {
        movies.map(movie => {
          return (
            <div key={movie.id}>
              <div className="w-full m-6">
                <span className="text-3xl font-bold">{ movie.title}</span>
              </div>
              <div className="w-full m-6 flex">
                <Image className="w-11/12 h-3/4 bg-figma-gray" src={movie.image_url} width={400} height={210} alt="wallpaper movies" />
              </div>
              <div className="w-full flex m-6 gap-6">
                <Button className="rounded-full" onClick={async () => {
                  await api.movies.update
                }}><ArrowFatLineUp size={25} /></Button>
                <Separator orientation="vertical" className="h-8"></Separator>
                <Button className="rounded-full"><ArrowFatLineDown size={25} /></Button>
              </div>
            </div>
          )
        })
      }
      
    </div>
  )
}