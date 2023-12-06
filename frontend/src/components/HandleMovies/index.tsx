'use client'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import api from '@/lib/api'
import { movieType } from '@/lib/types/movie'
import { toast } from 'sonner'
import { Input } from '../ui/input'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import axios from 'axios'
import Image from 'next/image'
import { Image as PImage, TrashSimple } from '@phosphor-icons/react'
import { Label } from '@radix-ui/react-menubar'

const schema = z.object({
  title: z.string({
    required_error: 'É necessário um nome',
    invalid_type_error: 'O nome precisa ser uma string.',
  }),
  description: z.string(),
  file: z.any(),
})

type formProps = z.infer<typeof schema>

export default function HandleMovies() {
  const {
    handleSubmit,
    register,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<formProps>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues: {
      description: '',
      file: [],
      title: '',
    },
  })
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

  const handleCreateMovie = async (data: formProps) => {
    const formData = new FormData()
    formData.append('file', data.file)
    console.log(data.file)

    delete data.file

    formData.append('title', data.title.trim())
    formData.append('description', data.description.trim())

    const res = await axios({
      method: 'post',
      url: 'http://localhost:4000/movies',
      data: formData,
    })

    console.log(res)

    if (res.status === 201) {
      return true
    } else {
      throw new Error('Filme não criado')
    }
  }

  const handleForm = (data: formProps) => {
    data.file = data.file[0]

    toast.promise(handleCreateMovie(data), {
      loading: 'Loading...',
      duration: 2000,

      success: () => {
        return `Filme cadastrado!`
      },
      error: 'Não foi possivel cadastrar o filme',
    })

    reset()
  }

  const hasNewImage = watch('file').length > 0
  const image = watch('file')[0]
  console.log(hasNewImage)

  return (
    <div className="min-w-min w-3/4 bg-figma-gray p-6 rounded-xl flex flex-col items-center ">
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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="rounded-full h-6">Editar</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Edição de filme</DialogTitle>
                    </DialogHeader>
                    <form
                      className="w-full p-6 flex flex-col items-center"
                      onSubmit={handleSubmit(handleForm)}
                    >
                      {hasNewImage ? (
                        <div className="relative p-6 rounded-[8px] bg-figma-gray2">
                          <p>Capa do filme</p>
                          <TrashSimple
                            size={24}
                            color="#f50000"
                            weight="thin"
                            className="absolute top-3 right-0 cursor-pointer"
                            onClick={() => {
                              setValue('file', [])
                            }}
                          />
                          <Image
                            alt="new image preview"
                            src={URL.createObjectURL(image)}
                            width={384}
                            height={160}
                            className="z-10 bg-cover"
                          />
                        </div>
                      ) : (
                        <>
                          <Label
                            className="gap-x-2 flex cursor-pointer items-center justify-center border-2 border-dashed border-figma-white p-8 rounded w-80 h-40 leading-relaxed mb-4"
                            htmlFor="imageMovies"
                          >
                            <PImage size={24} weight="thin" />
                            <p className="font-light">Capa do filme</p>
                          </Label>

                          <Input
                            required
                            className="hidden"
                            id="imageMovies"
                            type="file"
                            {...register('file')}
                          />
                        </>
                      )}

                      <Label className="text-base" htmlFor="name">
                        Nome
                      </Label>

                      <Input
                        required
                        id="name"
                        className="mb-6 mt-2 max-w-sm rounded"
                        type="text"
                        {...register('title')}
                      />

                      <Label className="text-base" htmlFor="description">
                        Descrição
                      </Label>

                      <Input
                        required
                        id="description"
                        className="mb-6 mt-2 max-w-sm rounded"
                        type="text"
                        {...register('description')}
                      />

                      <DialogFooter>
                        <Button className="rounded-full" type="submit">
                          Salvar
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>

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
  )
}
