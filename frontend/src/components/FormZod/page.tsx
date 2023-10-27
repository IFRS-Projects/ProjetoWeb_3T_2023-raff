'use client'

import Input from '@/components/Input/page'
import { useForm } from 'react-hook-form'

import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@/hooks/useAuth'
import { AuthStore } from '@/stores/users'

const schema = z.object({
  password: z.string().min(6, 'Minímo são 6 caracteres'),
  confirmPassword: z.string(),
  amount: z.number({
    errorMap: () => {
      return {
        message: 'Informe um número válido'
      }
    }
  }).positive('Por favor, informe um número maior que 0'),
  url: z.string().url('Por favor informe uma URL valida'),
  role: z.enum(['admin', 'user'], {
    errorMap: () => {
      return {
        message: `Informe 'admin' ou 'user'`
      }
    }
  })
}).refine((fields) => fields.password === fields.confirmPassword, {
  path: ['confirmPassword'],
  message: 'As senhas precisam ser iguais'
})

type formProps = z.infer<typeof schema>

export default function FormZod() {

  const { handleSubmit, register, formState: { errors } } = useForm<formProps>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(schema)
  })

  const handleForm = (data: formProps) => {
    console.log({ data })
  }
  const user = useAuth(AuthStore, (state) => state.state.user)
  const { update } = AuthStore(state => state.actions)
  return (
    <div className='h-full w-full flex flex-col justify-center items-center'>
      <h2 className='text-3xl font-mono font-bold mb-4 text-cyan-400'>Form Avançado</h2>

      <form className='flex flex-col justify-center items-center' onSubmit={handleSubmit(handleForm)}>
        <label className="font-bold text-base text-cyan-400">Senha</label>
        <input
          {...register('password')}
          className="mb-4 border-2 border-cyan-100 rounded-lg p-2 bg-slate-100 text-black"
          type='password' placeholder="Informe a senha"
        />
        {!!errors.password?.message ? <p className='text-red-600 text-sm'>{errors.password.message}</p> : ''}

        <label className="font-bold text-base text-cyan-400">Confirmação de senha</label>
        <input
          {...register('confirmPassword')}
          className="mb-4 border-2 border-cyan-100 rounded-lg p-2 bg-slate-100 text-black"
          type='password' placeholder="Informe a senha" />
        {!!errors.confirmPassword?.message ? <p className='text-red-600 text-sm'>{errors.confirmPassword.message}</p> : ''}

        <label className="font-bold text-base text-cyan-400">Quantidade</label>
        <input
          {...register('amount')}
          className="mb-4 border-2 border-cyan-100 rounded-lg p-2 bg-slate-100 text-black"
          type='number' placeholder="Informe a quantidade" />
        {!!errors.amount?.message ? <p className='text-red-600 text-sm'>{errors.amount.message}</p> : ''}

        <label className="font-bold text-base text-cyan-400">URL</label>
        <input
          {...register('url')}
          className="mb-4 border-2 border-cyan-100 rounded-lg p-2 bg-slate-100 text-black"
          type='text' placeholder="Informe a URL" />
        {!!errors.url?.message ? <p className='text-red-600 text-sm'>{errors.url.message}</p> : ''}

        <label className="font-bold text-base text-cyan-400">Permissão</label>
        <input
          {...register('role')}
          className="mb-4 border-2 border-cyan-100 rounded-lg p-2 bg-slate-100 text-black"
          type='text' placeholder="Informe a permissão" />
        {!!errors.role?.message ? <p className='text-red-600 text-sm'>{errors.role.message}</p> : ''}

        <button className='w-36 h-10 bg-cyan-300 text-white rounded-lg' type="submit">Enviar</button>
      </form>
      <button onClick={() => {
        update({ id: 1, name: 'Jose' })
      }}>Atualizar</button>
      {user?.name}
    </div>
  )
}