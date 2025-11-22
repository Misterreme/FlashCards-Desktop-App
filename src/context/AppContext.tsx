import { createContext, useContext, useState, type Dispatch, type SetStateAction } from "react";

type Card = {
    id: string
    title: string
    text: string
}

type Set = {
    id: string
    title: string
    subtitle: string,
    cards: Card[],
    createdAt: string
}

interface AppState {
    isCreatingSet: boolean;
    setIsCreatingSet: (v: boolean) => void;
    isCreatingCard: boolean;
    setIsCreatingCard: Dispatch<SetStateAction<boolean>>;
    cards: Card[];
    setCards: Dispatch<SetStateAction<Card[]>>;
    sets: Set[];
    setSets: Dispatch<SetStateAction<Set[]>>;
    error: string;
    setError: (v: string) => void;
    isEditingSet: boolean;
    setIsEditingSet: (v: boolean) => void;
    isEditingCard: boolean;
    setIsEditingCard: (v: boolean) => void;
    isStudyngSet: boolean;
    setIsStudyngSet: (v: boolean) => void;
    studyngSetId: string;
    setStudyngSetId: (v: string) => void;
    cardError: string;
    setCardError: (v: string) => void;
    toDelteSetId: string;
    setToDeleteSetId: (v: string) => void;
    isDeleteModalOpen: boolean;
    setIsDeleteModalOpen: (v: boolean) => void;
    handleDeleteSet: (v: string) => void;
    deleteSet: (v: string) => void;
}

const AppContext = createContext<AppState | null>(null);
export function AppProvider({ children }: { children: React.ReactNode }) {
    const [ isCreatingSet, setIsCreatingSet ] = useState(false);
    const [ isCreatingCard, setIsCreatingCard ] = useState(false);
    const [ sets, setSets ] = useState<Set[]>([]);
    const [ cards, setCards ] = useState<Card[]>([]);
    const [ error, setError ] = useState("");
    const [ isEditingSet, setIsEditingSet ] = useState(false);
    const [ isEditingCard, setIsEditingCard ] = useState(false);
    const [ isStudyngSet, setIsStudyngSet ] = useState(false);
    const [ studyngSetId, setStudyngSetId ] = useState("");
    const [ cardError, setCardError ] = useState("");
    const [ toDelteSetId, setToDeleteSetId ] = useState("");
    const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState(false);

    function handleDeleteSet(id: string) {
        setIsDeleteModalOpen(true);
        setToDeleteSetId(id);
    }

    function deleteSet(id: string) {
        window.CRUD.deleteJSON(id).then(() => {
            setSets(prev => {
                const sets = prev.filter(set => set.id !== id);
                return sets
            })
        })
    }

    return (
        <AppContext.Provider value={{isCreatingSet, setIsCreatingSet, isCreatingCard, setIsCreatingCard, sets, setSets, cards, setCards, error, setError, isEditingSet, setIsEditingSet, isEditingCard, setIsEditingCard, setIsStudyngSet, isStudyngSet, studyngSetId, setStudyngSetId, cardError, setCardError,  setToDeleteSetId, toDelteSetId, isDeleteModalOpen, setIsDeleteModalOpen, handleDeleteSet, deleteSet}}>
            { children }
        </AppContext.Provider>
    )
}

export function useAppContext() {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error("useAppContext must be used inside AppProvider");
    return ctx
}