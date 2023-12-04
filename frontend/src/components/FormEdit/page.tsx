'use client'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import api from '@/lib/api'
import { movieType } from '@/lib/types/movie'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  title: z.string({
    required_error: 'É necessário um nome',
    invalid_type_error: 'O nome precisa ser uma string.',
  }),
  description: z.string(),
  file: z.any(),
})

type formProps = z.infer<typeof schema>

export default function FormEdit() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<formProps>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(schema),
  })

  const handleForm = async (data: formProps) => {
    data.file = data.file[0]

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }

    const formData = new FormData()
    formData.append('file', data.file)
    delete data.file
    formData.append('title', JSON.stringify(data.title))
    formData.append('description', JSON.stringify(data.description))
    const res = await axios.post(
      'http://localhost:4000/movies',
      formData,
      config,
    )
  }

  const [movies, setMovies] = useState<movieType[]>([])
  const { push } = useRouter()
  const getAllMovies = async () => {
    const r = await api.movies.findAll()

    setMovies(r.data)
  }
  useEffect(() => {
    getAllMovies()
  }, [])

  return (
    <div className="min-w-min w-3/4 bg-figma-gray p-6 rounded-xl flex flex-col items-center h-3/4">
      <div className="max-h-96 flex-col bg-figma-gray2 w-3/4 rounded-xl gap-5 p-2 flex items-center shadow-sm overflow-auto">
        {movies?.length &&
          movies.map((movie) => {
            return (
              <div className="w-full p-2 mt-2" key={movie.id}>
                <div className="w-full m flex gap-4 items-center justify-start">
                  <span>{movie.title}</span>
                  <Separator
                    orientation="vertical"
                    className="h-4 bg-white"
                  ></Separator>
                  <Dialog>
                    <DialogTrigger
                      className="bg-figma-purple h-6 rounded-full"
                      asChild
                    >
                      <Button variant="outline">Editar</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edição de Filme</DialogTitle>
                      </DialogHeader>
                      <form
                        className="grid gap-4 py-4"
                        onSubmit={handleSubmit(handleForm)}
                      >
                        <Label htmlFor="iptImage">Editar imagem</Label>
                        <Input
                          id="iptImage"
                          type="file"
                          {...register('file')}
                        />
                        <Label htmlFor="iptText">Descrição do filme</Label>
                        <Input
                          id="iptText"
                          type="text"
                          {...register('title')}
                        />
                        <Label htmlFor="iptDesc">Descrição do filme</Label>
                        <Input
                          id="iptDesc"
                          type="text"
                          {...register('description')}
                        />
                        <DialogFooter>
                          <Button type="submit">Salvar alteração</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <Separator
                    orientation="vertical"
                    className="h-4 bg-white"
                  ></Separator>
                  <Button className="h-6 rounded-full">Excluir</Button>
                </div>
                <Separator
                  orientation="horizontal"
                  className="w-full bg-white mt-7"
                ></Separator>
              </div>
            )
          })}
      </div>
    </div>
  )
}
