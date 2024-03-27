import { create } from "zustand"

type SaveRosterModalStoreTypes = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useSaveRosterModalStore = create<SaveRosterModalStoreTypes>(
  (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  })
)
