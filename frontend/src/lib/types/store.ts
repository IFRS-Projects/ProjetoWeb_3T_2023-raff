import { userDataType, userLogin } from "./user"

export type StoreProps = {
  state: {
    user: userDataType
  }
  actions: ActionsProps
}


export type ActionsProps = {
  login: (user: userLogin) => void
  logout: () => void
}