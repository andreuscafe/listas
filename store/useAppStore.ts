import { create } from "zustand";

type AppStore = {
  isClockViewOpen: boolean;
  setIsClockViewOpen: (isOpen: boolean) => void;
};

export const useAppStore = create<AppStore>((set) => ({
  isClockViewOpen: false,
  setIsClockViewOpen: (isOpen) => set({ isClockViewOpen: isOpen })
}));
