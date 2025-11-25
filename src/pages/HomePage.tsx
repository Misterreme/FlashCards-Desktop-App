import { useNavigate } from "react-router-dom";
import AddButton from "../components/AddButton";
import SetCard from "../components/SetCard";
import { useAppContext } from "../context/AppContext";
import { useEffect } from "react";
import { FiBookOpen } from "react-icons/fi";
import DeleteMessage from "../components/notifications/DeleteMessage";

function HomePage() {

    const navigate = useNavigate();
    const { setIsCreatingSet, sets, setSets, setIsEditingSet, setIsStudyngSet, setStudyngSetId, handleDeleteSet } = useAppContext();

    function handleCreateSet() {
        navigate("/sets/new");
        setIsCreatingSet(true);
    }

    function handleEdit(url: string) {
        navigate(url);
        setIsEditingSet(true);
    }

    function handleStudy(url: string, id: string) {
        navigate(url);
        setIsStudyngSet(true);
        setStudyngSetId(id);
    }

    useEffect(() => {
        window.CRUD.loadJSON().then(data => {
            setSets(data);
        })
    }, [])

    return (
        <section id="main-section" className="w-full min-h-full bg-background-light dark:bg-dark-background pt-[10dvh] pb-[5dvh] realtive">
            <DeleteMessage text="¿Estas seguro que quieres eliminar este set? Esta acción no pude deshacerse." />
            <div className="w-full h-full flex flex-col items-center gap-10">
                <div className="flex flex-col items-center gap-15">
                    <div className="flex flex-col items-center justify-center gap-5 px-3">
                        <h1 className="text-center text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-brand-300 via-brand-400 to-brand-700 animate-text">FlashCards</h1>
                        <p className="text-center text-wrap text-lg text-text-primary dark:text-dark-text-primary md:text-xl md:w-1/2">Organiza tus estudios con tarjetas interactivas. Crea conjuntos, estudia y mejora tu memoria.</p>
                    </div>
                    <div>
                        <AddButton onClick={ handleCreateSet } text="Crear nuevo Set" />
                    </div>
                </div>

                <div className="w-full flex flex-col gap-8">
                    <div className="w-full flex flex-col items-center justify-center gap-10">
                        <p className="text-2xl font-bold text-text-secondary dark:text-dark-text-secondary">Mis conjuntos (<span>{ sets.length }</span>)</p>

                        <div className="w-full px-5 md:px-10 lg:px-15 h-full grid grid-cols-1 place-items-center place-content-center gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {
                                sets.map(set => <SetCard 
                                    key={ set.id }
                                    onStudy={ () => handleStudy(`sets/study/${set.id}`, set.id) } 
                                    onEdit={ () => handleEdit(`/sets/edit/${set.id}`) } 
                                    onDelete={ () => handleDeleteSet(set.id)}
                                    isDisabled={ set.cards.length ? false : true }
                                    title={ set.title } 
                                    subtitle={ set.subtitle } 
                                    cardsNum={ set.cards?.length } 
                                    createdAt={ set.createdAt }
                                    />
                                )
                            }
                        </div>
                    </div>

                    <div className={`w-full px-5 flex-col justify-center items-center ${ sets.length ? "hidden" : "flex" } `}>
                        <div className="flex flex-col gap-5 items-center justify-center">
                            <FiBookOpen size={80} className="text-dark dark:text-dark-text-primary" />
                            <h2 className="text-xl font-semibold text-wrap text-center text-text-secondary dark:text-dark-text-secondary">No tienes sets todavia</h2>
                        </div>
                        <p className="text-lg font-semibold text-wrap text-center text-text-muted dark:text-dark-text-muted">¡Comienza creando tu primer conjunto de flashcards!</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HomePage;