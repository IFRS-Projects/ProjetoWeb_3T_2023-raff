'use client'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { toast } from 'sonner'

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
    formState: { errors },
  } = useForm<formProps>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(schema),
  })

  const handleCreateMovie = async (data: formProps) => {
    const formData = new FormData()
    formData.append('file', data.file)
    delete data.file
    console.log(data)

    formData.append('title', data.title.trim())
    formData.append('description', data.description.trim())
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
    const res = await axios.post(
      'http://localhost:4000/movies',
      formData,
      config,
    )
    if (res.status === 201) {
      return true
    } else {
      return false
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
  return (
    <div className="w-3/4 bg-figma-gray p-6 rounded-xl flex flex-col items-center">
      <form
        className="w-full p-6 flex flex-col items-center"
        onSubmit={handleSubmit(handleForm)}
      >
        <Label className="text-base" htmlFor="imageMovies">
          Imagem
        </Label>

        <Input
          required
          className="mb-6 mt-2 max-w-sm"
          id="imageMovies"
          type="file"
          {...register('file')}
        />

        <Label className="text-base" htmlFor="name">
          Nome
        </Label>

        <Input
          required
          id="name"
          className="mb-6 mt-2 max-w-sm"
          type="text"
          {...register('title')}
        />

        <Label className="text-base" htmlFor="description">
          Descrição
        </Label>

        <Input
          required
          id="description"
          className="mb-6 mt-2 max-w-sm"
          type="text"
          {...register('description')}
        />

        <Button className="rounded-full mt-4">Cadastrar</Button>
      </form>
    </div>
  )
}
