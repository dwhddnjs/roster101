import { create } from "zustand"

type PlayerListModalTypes = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const usePlayerListModal = create<PlayerListModalTypes>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
