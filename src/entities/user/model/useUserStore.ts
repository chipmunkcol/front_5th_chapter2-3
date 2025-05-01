import { create } from "zustand"
import { SelectedUser } from "./type"

type UserStoreState = {
  selectedUser: SelectedUser | null
}

type UserStoreActions = {
  setSelectedUser: (selectedUser: SelectedUser | null) => void
}

type UserStore = UserStoreState & UserStoreActions

export const useUserStore = create<UserStore>((set) => ({
  selectedUser: null,
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}))
