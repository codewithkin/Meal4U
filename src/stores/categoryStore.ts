import { create } from 'zustand';

type CategoryStore = {
  category: string | null;
  setCategory: (category: string) => void;
};

const useCategoryStore = create<CategoryStore>((set: ({ category }: { category: string | null }) =>  void) => ({
  category: null,
  setCategory: (category: string) => set({ category }),
}));

export default useCategoryStore;
