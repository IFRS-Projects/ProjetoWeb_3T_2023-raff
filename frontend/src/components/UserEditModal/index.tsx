import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { DialogHeader } from '../ui/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { userDataType } from '@/lib/types/user'
import api from '@/lib/api'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

const schema = z
  .object({
    name: z
      .string()
      .min(3, 'O nome de usuário deve conter mais de 3 caracteres'),
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

export default function UserEditModal({ user }: { user: userDataType | null }) {
  const { push } = useRouter()

  const { handleSubmit, register } = useForm<formProps>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues: {
      name: user?.username,
      password: '',
      confirmPassword: '',
    },
  })
  const handleForm = async (data: formProps) => {
    delete data.confirmPassword

    try {
      const res = await api.user.update(data)
      if (res.success) {
        toast.success('Dados Atualizados', {
          duration: 20000,
        })
        push('/home/user')
      } else {
        throw new Error('não foi possivel atualizar os dados')
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
    <Dialog>
      <DialogTrigger>Editar</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar: {user?.username}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleForm)} className="space-y-2">
          <div className="flex flex-col">
            <label htmlFor="userNameUpadte" className="text-sm">
              Nome:
            </label>
            <input
              className="bg-figma-gray p-1 rounded border border-figma-gray2"
              id="userNameUpadte"
              {...register('name')}
              defaultValue={user?.username}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="text-sm">
              Email:
            </label>
            <input
              className="bg-figma-gray p-1 rounded border border-figma-gray2"
              defaultValue={user?.email}
              disabled
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="text-sm">
              Nova senha:
            </label>
            <input
              className="bg-figma-gray p-1 rounded border border-figma-gray2"
              {...register('password')}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="text-sm">
              Confirme a nova senha:
            </label>
            <input
              className="bg-figma-gray p-1 rounded border border-figma-gray2"
              {...register('confirmPassword')}
            />
          </div>

          <Button type="submit" className="rounded">
            Salvar{' '}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
