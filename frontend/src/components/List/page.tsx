'use client'
import { ArrowFatLineUp, ArrowFatLineDown } from "@phosphor-icons/react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import Image from "next/image";
import { useEffect, useState } from "react";
import { movieType } from "@/lib/types/movie";
import api from "@/lib/api";
import { AnimatePresence } from "framer-motion";
import Card from "../Card";

import Lights from '@/utils/lights.png';

export default function List() {
  const [movies, setMovies] = useState<movieType[]>([])
  const getMovies = async () => {
    const allMovies = await api.movies.findAll()
    console.log(allMovies.data);

    // @ts-ignore
    setMovies(allMovies.data)
  }

  const [rightSwipe, setRightSwipe] = useState(0);
  const [leftSwipe, setLeftSwipe] = useState(0);

  const activeIndex = movies.length - 1;
  const removeCard = (id: string, action: 'right' | 'left') => {
    setMovies((prev) => prev.filter((movie) => movie.id !== id));
    if (action === 'right') {
      setRightSwipe((prev) => prev + 1);
    } else {
      setLeftSwipe((prev) => prev + 1);
    }
  };

  const stats = [
    {
      name: 'Left',
      count: leftSwipe,
    },
    {
      name: 'Right',
      count: rightSwipe,
    },
  ];
  useEffect(() => {
    getMovies()
  }, [])


  return (
    <div className="w-3/4 bg-figma-gray p-6 rounded-xl">
    <div className="relative flex h-screen w-full items-center justify-center overflow-clip bg-bgBlack text-textGrey">
      <div className="absolute bottom-0 h-[50%] w-screen scale-125 sm:h-[80%] sm:scale-110 md:scale-100">
        
      </div>
      <AnimatePresence>
        {movies.length ? (
          movies.map((movie,idx) => (
            <Card
              key={movie.id}
              data={movie}
              active={idx === activeIndex}
              removeCard={removeCard}
            />
          ))
        ) : (
          <h2 className="absolute z-10 text-center text-2xl font-bold text-textGrey ">
            
            Volte amanhã para mais!
          </h2>
        )}
      </AnimatePresence>
      
    </div>

    </div>
  )
}