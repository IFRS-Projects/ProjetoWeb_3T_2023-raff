'use client'
import { AuthStore } from '@/stores/auth'
import { useAuthStore } from '../../../../hooks/useAuthStore'
import UserEditModal from '@/components/UserEditModal'

export default function Account() {
  const user = useAuthStore(AuthStore, (store) => store.state.user)
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="bg-figma-gray2 w-fit space-y-4 mt-2 p-4 rounded-[6px] ">
        <div className="flex flex-col">
          <label htmlFor="" className="text-sm">
            Nome:
          </label>
          <p>{user?.username}</p>
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="text-sm">
            Email:
          </label>
          <p>{user?.email}</p>
        </div>
        <UserEditModal user={user ?? null} />
      </div>
    </div>
  )
}
