import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UseStoreState {
  currentPageName: string;
  updateCurrentPageName: (pageName: string) => void;
}

const useStore = create<UseStoreState>()(
  persist(
    (set) => ({
      currentPageName: "",

      updateCurrentPageName: (pageName: string) =>
        set((state: UseStoreState) => ({
          ...state,
          currentPageName: pageName,
        })),
    }),
    {
      name: "use-storage",
    }
  )
);

export default useStore;
