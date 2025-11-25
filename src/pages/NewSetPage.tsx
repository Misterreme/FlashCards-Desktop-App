import { useNavigate, useParams } from "react-router-dom"; 
import { BsArrowLeft } from "react-icons/bs";
import AddButton from "../components/AddButton";
import { BsPlusLg } from "react-icons/bs";
import { useAppContext } from "../context/AppContext";
import { useEffect, useState } from "react";
import { FaRegSave } from "react-icons/fa";
import CardPreview from "../components/CardPreview";
import ErrorMessage from "../components/notifications/ErrorMessage";
import DeleteMessage from "../components/notifications/DeleteMessage";

function NewSetPage() {

    const { 
            isCreatingSet, 
            setIsCreatingSet, 
            isCreatingCard, 
            setIsCreatingCard, 
            cards, 
            setCards, 
            error, 
            setError,
            isEditingSet, 
            setIsEditingSet,
            sets,
            isEditingCard,
            setIsEditingCard,
            cardError,
            setCardError,
            handleDeleteCard

        } = useAppContext();

    const navigate = useNavigate();
    const params = useParams();

    const currentSet = sets.find(set => set.id === params.id);

    const [ cardTitle, setCardTitle] = useState("");
    const [ cardText, setCardText] = useState("");

    const [ setTitle, setSetTitle] = useState("");
    const [ setText, setSetText] = useState("");

    const [ editingCardId, setEditingCardId ] = useState<string | null>(null)

    function saveSet() {
        if (isCreatingSet) {
            if (setTitle && setText) {
                const newSet = {
                    id: crypto.randomUUID(), 
                    title: setTitle, 
                    subtitle: setText, 
                    cards: cards, 
                    createdAt: new Date().toLocaleDateString()
                }

                window.CRUD.saveJSON(newSet);

                resetAllStates();
                setCards([]);
                setError("");

            } else {
                setError("Todos los campos son requeridos");
            }

        } else if (isEditingSet) {
            if (setTitle && setText) {
                const newSet = {
                    id: params.id, 
                    title: setTitle,
                    subtitle: setText, 
                    cards: cards, 
                    createdAt: currentSet?.createdAt
                }

                window.CRUD.editJSON(newSet);

                resetAllStates();
                setError("");

            } else {
                setError("Todos los campos son requeridos");
            }
        }
    }

    function addCard() {
        if (cardTitle && cardText) {
            setCards(prev => [
                ...prev,
                { id: crypto.randomUUID(), title: cardTitle, text: cardText }
            ])
            resetCardStates();
            
        } else {
            setCardError("La tarjeta no puede estar vacia");
        }
    }

    function handleNavigate(url: string) {
        resetAllStates();
        setError("");
        navigate(url);
    }

    function editCard(id: string) {
        setIsEditingCard(true);
        setEditingCardId(id);
        
        const card = cards.find(card => card.id === id) as any;
        const title = card?.title;
        const text = card?.text;

        setCardTitle(title);
        setCardText(text);
    }

    function saveEditCard() {
        if (!isEditingCard) return;
        if (cardTitle && cardText) {
            setCards(prev => 
                prev.map(card => 
                    card.id === editingCardId
                    ? { ...card, title: cardTitle, text: cardText }
                    : card
                )
            );
    
            resetCardStates();

        } else {
            setCardError("La tarjeta no puede estar vacia");
        }
    }

    function resetCardStates() {
        setIsCreatingCard(false);
        setIsEditingCard(false);
        setCardTitle("");
        setCardText("");
        setEditingCardId(null);
    }

    function resetAllStates() {
        setIsCreatingCard(false);
        setIsEditingCard(false);
        setCardTitle("");
        setCardText("");
        setEditingCardId(null);
        setIsCreatingSet(false);
        setIsEditingSet(false);
    }

    useEffect(() => {
        if (!isCreatingSet && !isEditingSet) {
            setSetTitle("");
            setSetText("");
            setCards([]);
            navigate("/");
        }
    }, [isCreatingSet, isEditingSet])

    useEffect(() => {
        if (isEditingSet) {
            if (params) {
                const setToEdit = sets.find(set => set.id === params.id) as any;
                const title = setToEdit.title;
                const subtitle = setToEdit.subtitle;
                const cards = setToEdit.cards;

                setSetTitle(title);
                setSetText(subtitle);
                setCards(cards);
            }
        }
    }, [isEditingSet, params])

    useEffect(() => {
        if (!isCreatingCard) {
            setCardTitle("");
            setCardText("");
        }
    }, [isCreatingCard])

    return (
        <section className="w-full bg-background-light dark:bg-dark-background pt-[10dvh] pb-10 relative">
            <ErrorMessage text={error} />
            <ErrorMessage text={cardError} />
            <DeleteMessage text="¿Estas seguro que quieres eliminar esta tarjeta? Esta acción no pude deshacerse." />
            
            <div className="w-full h-full flex flex-col px-5 sm:px-10 md:px-15 lg:px-60 gap-10">
                <header className="flex items-center justify-between">
                    <div className="flex items-center text-center">
                        <div onClick={ () => handleNavigate("/") } 
                            className="flex gap-2 text-base items-center text-text-secondary dark:text-dark-text-primary font-semibold hover:scale-105 transition-all cursor-pointer"
                            >
                                <BsArrowLeft size={25} className="transition-all" />
                                <span>Volver</span>
                        </div>
                    </div>
                    <h2 
                    className="max-md:hidden font-extrabold text-3xl text-center text-transparent bg-clip-text bg-linear-to-r from-brand-300 via-brand-400 to-brand-700 animate-text"
                    >
                        { isCreatingSet ? "Crear Set" : "Editar Set"}
                    </h2>
                    <button 
                        className="flex sticky items-center text-sm font-bold justify-center gap-2 bg-brand-600 p-3.5 rounded-xl text-background-light cursor-pointer hover:scale-105 active:scale-100 active:opacity-70 transition-all"
                        onClick={ () => {
                            saveSet();
                        } }
                        >
                            <FaRegSave size={20} />
                            Guardar
                    </button>
                </header>

                <div className="w-full md:hidden">
                    <h2 
                    className="font-extrabold text-3xl text-center text-transparent bg-clip-text bg-linear-to-r from-brand-300 via-brand-400 to-brand-700 animate-text"
                    >
                        { isCreatingSet ? "Crear Set" : "Editar Set"}
                    </h2>
                </div>

                <div className="w-full min-h-[380px] bg-white dark:bg-dark-card py-8 px-5 lg:px-10 flex flex-col gap-5 rounded-xl shadow-sm shadow-gray-600/20">
                    <h3 className="font-medium text-black dark:text-dark-text-primary text-lg font-sans">Detalles del conjunto</h3>

                    <form onSubmit={(e) => e.preventDefault()} className="w-full flex flex-col gap-10">
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-black dark:text-dark-text-primary" htmlFor="set-name">Nombre del conjunto</label>
                            <input 
                                className={`border-2 rounded-lg min-h-12 pl-3 text-sm outline-none dark:text-dark-text-primary focus:border-brand-200 transition-colors dark:placeholder:text-dark-text-secondary ${ error ? "border-red-500" : "border-gray-100 dark:border-dark-accent" }`} 
                                type="text" 
                                id="set-name" 
                                placeholder="Ej. Números Binarios" 
                                required
                                value={ setTitle }
                                onChange={ (e) => setSetTitle(e.target.value) }
                                maxLength={35}
                                />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-black dark:text-dark-text-primary" htmlFor="set-description">Descripción</label>
                            <textarea 
                                className={`resize-none border-2 border-gray-100 rounded-lg pl-3 pt-3 text-sm outline-none dark:text-dark-text-primary focus:border-brand-200 transition-colors dark:placeholder:text-dark-text-secondary ${ error ? "border-red-500" : "border-gray-100 dark:border-dark-accent" }`}
                                id="set-description" 
                                rows={5} 
                                placeholder="Breve decripción del set..."
                                value={ setText }
                                onChange={ (e) => setSetText(e.target.value) }
                                >

                                </textarea>
                        </div>
                    </form>
                </div>

                <div className="w-full bg-white dark:bg-dark-card px-5 lg:px-10 py-8 flex flex-col gap-5 rounded-xl shadow-sm shadow-gray-600/20">
                    <div className="flex justify-between items-center">
                        <p className="font-medium text-lg dark:text-dark-text-primary">Tarjetas <span>({ cards.length })</span></p>
                        <AddButton onClick={() => setIsCreatingCard(true) } text="Agregar tarjeta" variant="card" />
                    </div>

                    <div className={`w-full px-2 rounded-lg bg-brand-50 dark:bg-dark-accent ${ isCreatingCard || isEditingCard ? "flex" : "hidden" }`}>
                        <form onSubmit={(e) => e.preventDefault()} className="w-full flex flex-col p-4 gap-4">
                            <h2 className="text-lg text-black font-medium dark:text-dark-text-primary">Nueva tarjeta</h2>

                            <div className="flex flex-col gap-10">
                                <div className="flex flex-col md:flex-row gap-5">
                                    <div className="w-full flex flex-col gap-2">
                                        <label className="text-sm text-medium text-text-secondary dark:text-dark-text-primary" htmlFor="front-card">Frente</label>
                                        <textarea 
                                            className={`p-4 border rounded-md placeholder:text-sm outline-none bg-white dark:bg-dark-accent dark:text-dark-text-secondary resize-none focus:border-red-200 dark:focus:border-brand-500 transition-all text-sm ${ cardError ? "border-red-500" : "border-gray-300 dark:border-gray-700" }`}
                                            placeholder="Pregunta o término" 
                                            rows={5} 
                                            id="front-card"
                                            value={ cardTitle }
                                            onChange={(e) => setCardTitle(e.target.value)}
                                            maxLength={100}
                                        >

                                        </textarea>
                                    </div>

                                    <div className="w-full flex flex-col gap-2">
                                        <label className="text-sm text-medium text-text-secondary dark:text-dark-text-primary" htmlFor="back-card">Reverso</label>
                                        <textarea className={`p-4 border rounded-md placeholder:text-sm outline-none bg-white dark:bg-dark-accent dark:text-dark-text-secondary resize-none focus:border-red-200 dark:focus:border-brand-500 transition-all text-sm ${ cardError ? "border-red-500" : "border-gray-300 dark:border-gray-700" }`}
                                            placeholder="Respuesta o definición" 
                                            rows={5} 
                                            id="back-card"
                                            value={ cardText }
                                            onChange={(e) => setCardText(e.target.value)}
                                            maxLength={550}
                                        >
                                        </textarea>
                                    </div>
                                </div>

                                <div className="flex gap-5">
                                    <button 
                                        className="text-sm font-bold justify-center gap-3 bg-brand-600 py-3 px-4 rounded-xl text-background-light cursor-pointer hover:scale-105 active:scale-100 active:opacity-70 transition-all"
                                        type="button"
                                        onClick={ () => { isEditingCard ? saveEditCard() : addCard() } }
                                        >
                                            { isEditingCard ? 'Guardar' : "Agregar" }
                                    </button>
                                    
                                    <button 
                                        className="text-sm font-bold justify-center gap-3 bg-red-400 dark:bg-red-500 py-3 px-4 rounded-xl text-background-light cursor-pointer hover:scale-105 active:scale-100 active:opacity-70 transition-all"
                                        type="button"
                                        onClick={ () => resetCardStates() }
                                        >
                                            Cancelar
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className={`w-full px-5 flex-col gap-5 justify-center items-center mt-10 mb-20 ${ isCreatingCard ? "hidden" : "flex" } ${ cards.length ? "hidden" : "flex" } `}>
                        <BsPlusLg size={50} color="gray" />
                        <h2 className="text-lg font-semibold text-wrap text-center text-text-muted">No hay tarjetas aún. ¡Agrega tu primera tarjeta!</h2>
                    </div>

                    <div id="cards-container" className={`w-full flex-col gap-3 ${ cards.length ? "flex" : "hidden" }`}>
                        {
                            cards.map(card => {
                                return (
                                    <CardPreview onEdit={ () => editCard(card.id) } onDelete={ () => handleDeleteCard(card.id) } key={ card.id } title={ card.title } text={ card.text } />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </section>
    );
}

export default NewSetPage;