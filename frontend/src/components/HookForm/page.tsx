'use client'

import * as Yup from 'yup'

import { useForm } from "react-hook-form"

import { yupResolver } from '@hookform/resolvers/yup'
import { isAwaitExpression } from 'typescript'

const asyncFunction = async () => {
  const myPromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve('Hello')
    }, 3000);
  })

  return myPromise
}

const schema = Yup.object().shape({
  password: Yup.string().min(6, 'A senha precisa ter no minímo 6 caracteres').required('Campo obrigatório'), //deixa o campo como obrigatório, e verifica a quantidade de caracteres do input
  confirmPassword: Yup.string().oneOf([Yup.ref('password')],
    'As senhas precisam ser iguais').required('Campo obrigatório') //verifica se o ConfirmPassword está igual ao Password, também atuando como campo requerido
})

export default function HookForm() {
  const { register, handleSubmit, formState, reset } = useForm({
    mode: 'all',
    resolver: yupResolver(schema)
  })

  const { errors, isSubmitting } = formState

  console.log('errors', errors)

  const handleSubmitData = (data: any) => {
    console.log('submit', data)

  }
  return (
    <form onSubmit={handleSubmit(handleSubmitData)}>
      <p>Formulário</p>

      <input {...register('password')} type="password" placeholder="password" />
      {errors.password && <p>{errors.password.message}</p>}
      <input {...register('confirmPassword')} type="password" placeholder="confirm password" />
      {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      <button type="submit">{isSubmitting ? 'Enviando...' : 'Enviar'}</button>
    </form>
  )
}