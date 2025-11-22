import { GrAddCircle } from "react-icons/gr";
import { useAppContext } from "../context/AppContext";

type Props = {
    text: string,
    onClick: () => void;
    variant?: "set" | "card" 
}

function AddButton({ text, onClick, variant = "set" }: Props) {

    const { isEditingCard, isCreatingCard } = useAppContext();

    const base = "flex items-center justify-center gap-3 bg-brand-600 rounded-xl text-background-light cursor-pointer hover:scale-105 active:scale-100 active:opacity-70 transition-all"
    const variants = {
        set: "p-4 font-bold",
        card: "p-3 text-sm font-semibold text-md"
    }

    return (
        <button onClick={onClick} id="add-set-button" className={`${base} ${variants[variant]} disabled:scale-100 disabled:cursor-not-allowed`} disabled={ isEditingCard || isCreatingCard ? true : false}>
            <GrAddCircle size={20} />
            <span>{ text }</span>
        </button>
    );
}

export default AddButton;