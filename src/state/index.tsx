import { create } from 'zustand'
import Provider from 'zustand'

interface Tag {
    id: string;
    content: string;
}

interface State {
    tags: Tag[];
}

const initialState: State = {
    tags: [],
};

export const useStore = create((set) => ({
    tags: initialState.tags,
    addTag: (tag: Tag) => set((state: State) => ({ tags: [...state.tags, tag] })),
    deleteTag: (tagId: string) =>
        set((state: State) => ({
            tags: state.tags.filter((tag) => tag.id !== tagId),
        })),
    editTag: (tagId: string, content: string) =>
        set((state: State) => ({
            tags: state.tags.map((tag) =>
                tag.id === tagId ? { ...tag, content: content } : tag
            ),
        })),
}))

export const useStoreState = () => useStore((state) => state)

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const store = useStore();
    return <>{children}</>;
};
