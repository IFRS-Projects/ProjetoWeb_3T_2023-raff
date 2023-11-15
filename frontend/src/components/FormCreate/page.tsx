'use client'
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string({
    required_error: 'É necessário um nome',
    invalid_type_error: 'O nome precisa ser uma string.'
  }),
  desc: z.string()
})

type formProps = z.infer<typeof schema>

export default function Create() {
  const { handleSubmit, register, formState: { errors } } = useForm<formProps>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(schema)
  })

  const handleForm = (data: formProps) => {
    console.log(data)
  }
  return (
    <div className="w-3/4 bg-figma-gray p-6 rounded-xl flex flex-col items-center">
      <form className="w-full p-6 flex flex-col items-center" onSubmit={handleSubmit(handleForm)}>

        <Label className="text-base" htmlFor="imageMovies">Imagem</Label>

        <Input required className="mb-6 mt-2 max-w-sm" id="imageMovies" type="file" />


        <Label className="text-base" htmlFor="name">Nome</Label>

        <Input required
          id="name" className="mb-6 mt-2 max-w-sm" type="text"
          {...register('name')} />


        <Label className="text-base" htmlFor="description">Descrição</Label>

        <Input required
          id="description" className="mb-6 mt-2 max-w-sm" type="text"
          {...register('desc')} />

        <Button className="rounded-full mt-4">Cadastrar</Button>
      </form>
    </div>
  )
}