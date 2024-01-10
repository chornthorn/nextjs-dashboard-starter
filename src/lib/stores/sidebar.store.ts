import { create } from "zustand";

type SidebarStore = {
  isSmall: boolean;
  setSmallSidebar: (value: boolean) => void;
};

export const useSidebarStore = create<SidebarStore>((set) => ({
  isSmall: false,
  setSmallSidebar: (value) => set({ isSmall: value }),
}));
