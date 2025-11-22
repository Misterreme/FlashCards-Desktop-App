import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { BsArrowLeft } from "react-icons/bs";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useEffect, useState } from "react";

function StudyPage() {

    const navigate = useNavigate();
    const { setError, studyngSetId, isStudyngSet, sets, setStudyngSetId, setIsStudyngSet } = useAppContext();
    const [ index, setIndex ] = useState(0);

    useEffect(() => {
        if (!isStudyngSet && studyngSetId) {
            handleNavigate("/");
        }
    }, [isStudyngSet, studyngSetId])

    function handleNavigate(url: string) {
        setError("");
        navigate(url);
        setStudyngSetId("");
        setIsStudyngSet(false); 
        setIndex(0);
    }
    
    const setToEdit = sets.find(set => set.id === studyngSetId);
    if (!setToEdit) return (
        <div className="w-full h-full flex flex-col gap-5 mt-10 items-center justify-center text-center">
            <h1 className="text-2xl font-bold">Set No encontrado...</h1>
            <div onClick={ () => handleNavigate("/") }
                className="flex gap-2 text-base items-center text-text-secondary font-semibold hover:scale-105 transition-all cursor-pointer"
                >
                    <BsArrowLeft size={25} className="transition-all" />
                    <span>Volver</span>
            </div>
        </div>
    )

    const cards = setToEdit?.cards;
    let currentCard = cards[index];
    let progressBarPercentage = (100 / cards.length) * (index + 1);
    console.log(`${progressBarPercentage}%`);

    return (
        <section className="w-full min-h-full bg-background-light pt-[10dvh] pb-10 relative">
            <div className="w-full h-full flex flex-col px-5 sm:px-10 md:px-15 lg:px-60 gap-10">
                <header className="w-full flex items-center justify-between">
                    <div className="flex items-center text-center">
                        <div onClick={ () => handleNavigate("/") } 
                            className="flex gap-2 text-base items-center text-text-secondary font-semibold hover:scale-105 transition-all cursor-pointer"
                            >
                                <BsArrowLeft size={25} className="transition-all" />
                                <span>Volver</span>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-xl md:text-3xl font-bold text-black mr-5">{ setToEdit?.title }</h2>
                    </div>
                    <span className="hidden md:flex"></span>
                </header>

                <div className="w-full flex flex-col gap-2">
                    <div className="flex justify-between">
                        <p className="text-base text-gray-500 font-semibold">Tarjeta { index + 1 } de { setToEdit?.cards.length }</p>
                        <p className="text-base text-gray-500 font-semibold">{ progressBarPercentage }%</p>
                    </div>

                    <div className="w-full h-2 rounded-xl bg-gray-200">
                        <div
                            style={{width: `${progressBarPercentage}%`}}
                            className={`h-full rounded-xl bg-brand-600 transition-all`}></div>
                    </div>
                </div>

                <div className="w-full flex flex-col gap-5 items-center justify-center mt-10">

                    <div className="w-full flex items-center justify-center">
                        <span className="text-brand-300 text-sm text-shadow-2xs">Pasa el mouse para girar la tarjeta</span>
                    </div>

                    <div className="w-150 h-90 max-[700px]:h-[70dvh] perspective-[1000px] bg-transparent cursor-pointer group">
                        <div className="hover:rotate-y-180 w-full h-full transition-all duration-1000 transform-3d relative rounded-xl shadow-sm">
                            <div className="w-full h-full bg-white border-[#E5E7EB] absolute backface-hidden rounded-xl px-8 py-5 flex flex-col items-center justify-center gap-2 overflow-y-auto overflow-x-hidden">
                                { currentCard && (
                                    <p className="mt-10 w-full text-center text-wrap wrap-break-word">
                                        { currentCard.title }
                                    </p>
                                ) }
                            </div>
                            <div className="rotate-y-180 w-full h-full bg-blue-50 border-2 border-blue-200 absolute backface-hidden rounded-xl p-8 flex flex-col items-center justify-center gap-2">
                                { currentCard && (
                                    <p className="mt-10 w-full text-center text-wrap wrap-break-word">
                                        { currentCard.text }
                                    </p>
                                ) }
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full flex flex-row gap-5 items-center justify-center">
                    <button
                    onClick={ () => setIndex(index - 1) }
                        className="w-[150px] max-[700px]:w-[100px] max-[700px]:text-sm bg-blue-500 text-white rounded-xl px-2 py-3 flex items-center justify-center font-semibold cursor-pointer hover:scale-105 transition-transform gap-4 disabled:bg-gray-100 disabled:text-gray-400 disabled:hover:scale-100 disabled:cursor-not-allowed max-[700px]:gap-1" 
                        id="back-card-button" 
                        data-type="back-button"
                        disabled={ index === 0 ? true : false }
                        >
                            <FaLongArrowAltLeft size={20} />
                            Anterior
                    </button>
            
                    <div className="flex mx-6">
                        <p className="font-semibold text-gray-400"><span id="card-of-buttons">{ index + 1 }</span> / <span id="card-of-total-buttons">{ cards.length }</span></p>
                    </div>
            
                    <button 
                        onClick={ () => setIndex(index + 1) }
                        className="w-[150px] max-[700px]:w-[100px] max-[700px]:text-sm bg-blue-500 text-white rounded-xl px-2 py-3 flex items-center justify-center font-semibold cursor-pointer hover:scale-105 transition-transform gap-4 disabled:bg-gray-100 disabled:text-gray-400 disabled:hover:scale-100 disabled:cursor-not-allowed max-[700px]:gap-1" 
                        id="next-card-button" 
                        data-type="next-button"
                        disabled={ index === cards.length - 1 ? true : false }
                        >
                            Siguiente
                            <FaLongArrowAltRight size={20} />
                    </button>
                </div>
            </div>
        </section>
    );
}

export default StudyPage;