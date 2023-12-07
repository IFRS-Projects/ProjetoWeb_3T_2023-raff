import { movieType } from '@/lib/types/movie'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Image from 'next/image'
import { Image as PImage, TrashSimple } from '@phosphor-icons/react'

const schema = z.object({
  title: z.string({
    required_error: 'É necessário um nome',
    invalid_type_error: 'O nome precisa ser uma string.',
  }),
  description: z.string(),
  file: z.any(),
})

type formProps = z.infer<typeof schema>

export default function UpdateModal({ movie }: { movie: movieType }) {
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
      description: movie.description,
      file: [],
      title: movie.title,
    },
  })

  const handleCreateMovie = async (data: formProps) => {
    console.log(data)

    const formData = new FormData()
    if (data.file) {
      formData.append('file', data.file)
    }

    formData.append('title', data.title.trim())

    formData.append('description', data.description.trim())

    const res = await axios({
      method: 'patch',
      url: `http://localhost:4000/movies/${movie.id}`,
      data: formData,
      withCredentials: true,
    })

    console.log(res)

    if (res.status === 200) {
      return true
    } else {
      throw new Error('Filme não atualizado')
    }
  }

  const handleForm = (data: formProps) => {
    if (data.file) {
      data.file = data.file[0]
    }

    toast.promise(handleCreateMovie(data), {
      loading: 'Loading...',
      duration: 2000,

      success: () => {
        return `Filme atualizar!`
      },
      error: 'Não foi possivel atualizar o filme',
    })

    reset()
  }

  const hasNewImage = watch('file').length > 0
  const image = watch('file')[0]

  console.log(hasNewImage)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Editar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar: {movie.title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleForm)} className="grid gap-4 py-4">
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
                className="gap-x-2 flex cursor-pointer items-center justify-center border-2 border-dashed border-figma-white p-8 rounded w-96 h-40 leading-relaxed "
                htmlFor="imageMovies"
              >
                <PImage size={24} weight="thin" />
                <p className="font-light">Capa do filme</p>
              </Label>

              <Input
                className="hidden"
                id="imageMovies"
                type="file"
                {...register('file')}
              />
            </>
          )}
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="title" className="text-right">
              Titulo
            </label>
            <Input
              id="title"
              className="col-span-3 rounded-[6px] border border-figma-gray2"
              {...register('title')}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="description" className="text-right">
              Descrição
            </label>
            <Input
              id="description"
              className="col-span-3 rounded-[6px] border border-figma-gray2"
              {...register('description')}
            />
          </div>
          <DialogFooter>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
