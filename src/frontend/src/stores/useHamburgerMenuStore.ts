import { create } from "zustand";
import HamburgerMenuStore from "../types/stores/HamburgerMenuStore";

const useHamburgerMenuStore = create<HamburgerMenuStore>((set) => ({
  isOpen: false,
  updateIsOpen: (newIsOpen: boolean) =>
    set((state: HamburgerMenuStore) => ({
      ...state,
      isOpen: newIsOpen,
    })),
}));

export default useHamburgerMenuStore;
