import { create } from "zustand";
type user = {
  id: number,
  name: string
}
type StoreProps = {
  state: {
    user: user
  },
  actions: {
    update: (user: user) => void
    getState: () => user
  }
}

export const AuthStore = create<StoreProps>()(
  (set, get) => ({
    state: {
      user: { id: 0, name: '' }
    },
    actions: {
      getState: () => get().state.user,
      update: (user) => {
        set({ state: { user } })
      }
    }
  })
)