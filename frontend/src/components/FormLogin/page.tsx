'use client'
import { Button } from "../ui/button";
import { Input } from "@/components/Input/Input";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { AuthStore } from "@/stores/auth";
import { useAuthStore } from "../../../hooks/useAuthStore";

const schema = z.object({
  email: z.string().email('O campo deve ser um email').refine((value) => value.endsWith('@aluno.feliz.ifrs.edu.br'), {
    message: 'O dominio de email deve ser @aluno.feliz.ifrs.edu.br'
  }),
  password: z.string()
})


type formProps = z.infer<typeof schema>

export default function FormLogin() {
  const { push } = useRouter()

  const user = useAuthStore(AuthStore, (state) => state.state.user)
  const {
    actions:{ login }
  } = AuthStore()

  const { handleSubmit, register, formState: { errors } } = useForm<formProps>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(schema)
  })

  const handleForm = async (data: formProps) => {
    const token = await login(data)

    push(`/API/auth/user/login?token=${token}&route=/home`)
    
  }
  return (
    <form onSubmit={handleSubmit(handleForm)} className="flex flex-col items-center mt-20">
      <Input label="Email" type="email" {...register('email')} />
      {!!errors.email?.message ? <p className='text-red-600 text-sm'>{errors.email.message}</p> : ''}
      <Input label="Senha" type="password" {...register('password')} />
      {!!errors.password?.message ? <p className='text-red-600 text-sm'>{errors.password.message}</p> : ''}
      <Button className="mt-10 rounded-full w-36 text-lg">Entrar</Button>
    </form>
  )
}