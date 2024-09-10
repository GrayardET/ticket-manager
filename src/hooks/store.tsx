import { create } from 'zustand'

interface ModalState {
  isOpen: boolean
  toggleModal: () => void
}

export const useModalState = create<ModalState>()((set) => ({
  isOpen: false,
  toggleModal: () => set((state) => ({isOpen: !state.isOpen})),
}))