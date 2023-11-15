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
