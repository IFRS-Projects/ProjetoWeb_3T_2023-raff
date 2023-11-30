'use client'
import api from '@/lib/api'
import { toast } from 'sonner'
import { X } from '@phosphor-icons/react'
import { Separator } from '@radix-ui/react-menubar'

export default function Page() {
  const getMovies = async () => {
    const r = await api.movies.findAll()
    if (r.success) {
      return r.data
    } else {
      throw new Error('API no response')
    }
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <p>tost page test</p>

      <button onClick={() => toast.success('My success toast')}>
        sucess toast
      </button>

      <button onClick={() => toast.error('My error toast', {})}>
        sucess toast
      </button>

      <button
        onClick={() =>
          toast('My action toast', {
            action: {
              label: 'close',
              onClick: () => console.log('Action!'),
            },
          })
        }
      >
        toast with action
      </button>

      <button
        onClick={() => {
          toast.promise(getMovies, {
            loading: 'Loading...',
            duration: 2000,

            success: (data) => {
              return `Movies has been loaded`
            },
            error: 'Error',
          })
        }}
      >
        promisse toast
      </button>

      <button
        onClick={() => {
          toast.custom((t) => (
            <div className="w-fit p-2 h-fit border border-gray-600 bg-slate-500/80 rounded flex items-center">
              This is a custom component{' '}
              <button onClick={() => toast.dismiss(t)}>
                <X />
              </button>
            </div>
          ))
        }}
      >
        custom toast
      </button>
    </div>
  )
}
