import { create } from "zustand";

interface Application {
    currentPageName: string;

    updateCurrentPageName: (newPage: string) => void;
}

const useStore = create<Application>((set) => ({
    currentPageName: "",

    updateCurrentPageName: (newPage: string) => 
        set((state) => ({
            ...state,
            currentPageName: newPage,
        })),
    
}));

export default useStore;