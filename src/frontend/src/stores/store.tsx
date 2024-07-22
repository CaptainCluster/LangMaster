import { create } from "zustand";

interface Application {
  currentPageName: string;
  currentUser: string;
  updateCurrentPageName: (newPage: string) => void;
  updateCurrentUser: (newUser: string) => void;
}

const useStore = create<Application>((set) => ({
  currentPageName: "",
  currentUser: "",

  updateCurrentPageName: (newPage: string) =>
    set((state) => ({
      ...state,
      currentPageName: newPage,
    })),

  updateCurrentUser: (newUser: string) => {
    set((state) => ({
      ...state,
      currentUser: newUser,
    }));
  },
}));

export default useStore;
