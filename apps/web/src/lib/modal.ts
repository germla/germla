import { create } from "zustand";

type Modals = "feedback" | "board";

type ModalState = {
    feedback: boolean;
    board: boolean;
    toggleModal: (modal: Modals) => void;
}

export const useModalStore = create<ModalState>((set) => ({
    feedback: false,
    board: false,
    toggleModal: (modal) => set((state) => ({
        ...state,
        [modal]: !state[modal],
    }))
}))
