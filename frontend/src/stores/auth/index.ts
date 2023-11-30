<<<<<<< HEAD

import api from '@/lib/api'
import { StoreProps } from '@/lib/types/store'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { jwtDecode } from "jwt-decode";
import { set, get } from 'react-hook-form'
import { Permission, userLogin } from '@/lib/types/user'

export type jwtType = {
  sub: string,
  username: string,
  email: string,
  permissions: Permission[],
}

export const AuthStore = create<StoreProps>()(
  persist(
    (set, get) => ({
      state: {
        user: {
          email: '',
          permissions: [],
          sub: '',
          username:''
        },
      },
      actions: {
        login: async (user) => {
          let token = ''
          const userData: userLogin  = {
            email: user.email,
            password: user.password,
          }

          const r = await api.auth.login(userData )
          if (r.success) {
            token = r.data.access_token
            const tokenData: jwtType = jwtDecode(token)
            set({ state: { user: tokenData } })
            return token
          }
        },
        logout: () => {
          set({
            state: {
              user: {
                email: '',
                permissions: [],
                sub: '',
                username:''
              },
            },
          })
        },
      }}),
    {
      name: 'auth',
      storage: createJSONStorage(() => localStorage),
      partialize: ({ state }) => ({ state }),
    },
  ),
)
=======
import api from '@/lib/api'
import { StoreProps } from '@/lib/types/store'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { jwtDecode } from 'jwt-decode'
import { set, get } from 'react-hook-form'
import { Permission, userLogin } from '@/lib/types/user'

export type jwtType = {
  sub: string
  username: string
  email: string
  permissions: Permission[]
}

export const AuthStore = create<StoreProps>()(
  persist(
    (set, get) => ({
      state: {
        user: {
          email: '',
          permissions: [],
          sub: '',
          username: '',
        },
      },
      actions: {
        login: async (user): Promise<string> => {
          let token = ''
          const userData: userLogin = {
            email: user.email,
            password: user.password,
          }

          const r = await api.auth.login(userData)
          if (r.success) {
            token = r.data.access_token
            const tokenData: jwtType = jwtDecode(token)
            set({ state: { user: tokenData } })
            return token
          }
          return token
        },
        logout: () => {
          set({
            state: {
              user: {
                email: '',
                permissions: [],
                sub: '',
                username: '',
              },
            },
          })
        },
      },
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => localStorage),
      partialize: ({ state }) => ({ state }),
    },
  ),
)
>>>>>>> RaffDv/issue15
