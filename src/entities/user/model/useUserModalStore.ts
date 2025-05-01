import { create } from "zustand"

type UserModalStoreState = {
  showUserModal: boolean
}

type UserModalStoreActions = {
  setShowUserModal: (showUserModal: boolean) => void
}

type UserModalStore = UserModalStoreState & UserModalStoreActions

export const useUserModalStore = create<UserModalStore>((set) => ({
  showUserModal: false,
  setShowUserModal: (showUserModal) => set({ showUserModal }),
}))
