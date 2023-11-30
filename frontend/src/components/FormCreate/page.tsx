'use client'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { toast } from 'sonner'
import { Image as PImage, TrashSimple } from '@phosphor-icons/react'
import Image from 'next/image'

const schema = z.object({
  title: z.string({
    required_error: 'É necessário um nome',
    invalid_type_error: 'O nome precisa ser uma string.',
  }),
  description: z.string(),
  file: z.any(),
})

type formProps = z.infer<typeof schema>

export default function Create() {
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

  const handleCreateMovie = async (data: formProps) => {
    const formData = new FormData()
    formData.append('file', data.file)
    console.log(data.file)

    delete data.file
<<<<<<< HEAD
    formData.append('title', JSON.stringify(data.title))
    formData.append('description', JSON.stringify(data.description))
    const res = await axios.post("http://localhost:4000/movies", formData, config);

=======

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
>>>>>>> RaffDv/issue15
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
    <div className="w-3/4 bg-figma-gray p-6 rounded-xl flex flex-col items-center ">
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
              className="gap-x-2 flex items-center justify-center border-2 border-dashed border-figma-white p-8 rounded w-96 h-40 leading-relaxed "
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

        <Button className="rounded-full mt-4">Cadastrar</Button>
      </form>
    </div>
  )
}
