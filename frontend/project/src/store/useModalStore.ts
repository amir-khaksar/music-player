import { create } from "zustand";

type ModalState = {
    modal: { type: "success" | "error"; title: string; message: string } | null;
    showModal: (modal: ModalState["modal"]) => void;
    closeModal: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
    modal: null,
    showModal: (modal) => set({ modal }),
    closeModal: () => set({ modal: null }),
}));
