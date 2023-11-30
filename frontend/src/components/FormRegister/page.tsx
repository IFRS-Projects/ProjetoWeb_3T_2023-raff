<<<<<<< HEAD
'use client'
import { Button } from "../ui/button";
import { Input } from "@/components/Input/Input";
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form";
import api from "@/lib/api";
import { AuthStore } from "@/stores/auth";
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z.string().min(3, 'O nome de usuário deve conter mais de 3 caracteres'),
  email: z.string().email('O campo deve ser um email').refine((value) => value.endsWith('@aluno.feliz.ifrs.edu.br'), {
    message: 'O dominio de email deve ser @aluno.feliz.ifrs.edu.br'
  }),
  password: z.string().min(8, 'A senha deve conter no minímo de 8 caracteres'),
  confirmPassword: z.string().optional()
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
  const { push } = useRouter()
  const {actions:{login}} = AuthStore()

  const handleForm = async (data: formProps) => {
    delete data.confirmPassword
    const r = await api.user.create(data)
    if (r.success) {
      const token = await login({
        email: data.email,
        password: data.password
      })
      push(`/API/auth/user/login?token=${token}`)
    }
  }
  return (
    <form onSubmit={handleSubmit(handleForm)} className="flex flex-col items-center mt-20">
      <Input
        label="Usuário"
        type="text"
        {...register('name')} />
      {!!errors.name?.message ? <p className='text-red-600 text-sm'>{errors.name.message}</p> : ''}
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
=======
/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import { Button } from '../ui/button'
import { Input } from '@/components/Input/Input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import api from '@/lib/api'
import { AuthStore } from '@/stores/auth'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const schema = z
  .object({
    name: z
      .string()
      .min(3, 'O nome de usuário deve conter mais de 3 caracteres'),
    email: z
      .string()
      .email('O campo deve ser um email')
      .refine((value) => value.endsWith('@aluno.feliz.ifrs.edu.br'), {
        message: 'O dominio de email deve ser @aluno.feliz.ifrs.edu.br',
      }),
    password: z
      .string()
      .min(8, 'A senha deve conter no minímo de 8 caracteres'),
    confirmPassword: z.string().optional(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    path: ['confirmPassword'],
    message: 'As senhas precisam ser iguais.',
  })

type formProps = z.infer<typeof schema>

export default function FormRegister() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<formProps>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(schema),
  })
  const { push } = useRouter()
  const {
    actions: { login },
  } = AuthStore()

  const handleForm = async (data: formProps) => {
    delete data.confirmPassword

    const execLogin = async () => {
      const token = await login(data)
      // @ts-ignore
      if (token !== '') {
        return token
      } else {
        throw new Error(
          'Ocorreum um erro com o login automatico, tente efetuar o login manualmente',
        )
      }
    }

    try {
      const res = await api.user.create(data)
      if (res.success) {
        toast.promise(execLogin, {
          loading: 'Loading...',
          duration: 2000,

          success: (token) => {
            push(`/API/auth/user/login?token=${token}`)
            return `Login efetuado`
          },
          error: (error) => {
            return `${error.message}`
          },
        })
      } else {
        // @ts-ignore
        throw new Error(res.data.message)
      }
    } catch (error: any) {
      console.log(error)
      if (
        error.message.includes(
          '[P2002]: Unique constraint failed on the fields: (`email`)',
        )
      ) {
        toast.error(`O Email informado já está sendo usado!`)
      } else {
        toast.error(`Aconteceu um erro, tente novamente!`)
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleForm)}
      className="flex flex-col items-center mt-20"
    >
      <Input label="Usuário" type="text" {...register('name')} />
      {errors.name?.message ? (
        <p className="text-red-600 text-sm">{errors.name.message}</p>
      ) : (
        ''
      )}
      <Input label="Email" type="email" {...register('email')} />
      {errors.email?.message ? (
        <p className="text-red-600 text-sm">{errors.email.message}</p>
      ) : (
        ''
      )}
      <Input label="Senha" type="password" {...register('password')} />
      {errors.password?.message ? (
        <p className="text-red-600 text-sm">{errors.password.message}</p>
      ) : (
        ''
      )}
      <Input
        label="Confirmar senha"
        type="password"
        {...register('confirmPassword')}
      />
      {errors.confirmPassword?.message ? (
        <p className="text-red-600 text-sm">{errors.confirmPassword.message}</p>
      ) : (
        ''
      )}
      <Button className="mt-10 rounded-full w-36 text-lg">Registrar</Button>
    </form>
  )
}
>>>>>>> RaffDv/issue15
