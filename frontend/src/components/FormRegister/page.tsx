'use client'
import { Button } from "../ui/button";
import { Input } from "@/components/Input/Input";
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from "react-hook-form";

const schema = z.object({
  user: z.string().min(3, 'O nome de usuário deve conter mais de 3 caracteres'),
  email: z.string().email('O campo deve ser um email').refine((value) => value.endsWith('@aluno.feliz.ifrs.edu.br'), {
    message: 'O dominio de email deve ser @aluno.feliz.ifrs.edu.br'
  }),
  password: z.string().min(8, 'A senha deve conter no minímo de 8 caracteres'),
  confirmPassword: z.string()
}).refine(({ password, confirmPassword }) => password === confirmPassword, {
  path: ['confirmPassword'],
  message: 'As senhas precisam ser iguais.'
})

type formProps = z.infer<typeof schema>

export default function FormRegister() {
  const { handleSubmit, register, formState: { errors } } = useForm<formProps>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(schema)
  })

  const handleForm = (data: formProps) => {

  }
  return (
    <form onSubmit={handleSubmit(handleForm)} className="flex flex-col items-center mt-20">
      <Input
        label="Usuário"
        type="text"
        {...register('user')} />
      {!!errors.user?.message ? <p className='text-red-600 text-sm'>{errors.user.message}</p> : ''}
      <Input
        label="Email"
        type="email"
        {...register('email')} />
      {!!errors.email?.message ? <p className='text-red-600 text-sm'>{errors.email.message}</p> : ''}
      <Input
        label="Senha"
        type="password"
        {...register('password')} />
      {!!errors.password?.message ? <p className='text-red-600 text-sm'>{errors.password.message}</p> : ''}
      <Input
        label="Confirmar senha"
        type="password"
        {...register('confirmPassword')} />
      {!!errors.confirmPassword?.message ? <p className='text-red-600 text-sm'>{errors.confirmPassword.message}</p> : ''}
      <Button className="mt-10 rounded-full w-36 text-lg">Registrar</Button>
    </form>
  )
}