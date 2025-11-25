import { useAppContext } from "../../context/AppContext";
import { IoIosWarning } from "react-icons/io";

type Props = {
    text: string
}

function DeleteMessage({ text }: Props) {

    const { isDeleteModalOpen, toDelteSetId, setIsDeleteModalOpen, setToDeleteSetId, deleteSet, deleteCard, setToDeleteCardId, toDeleteCardId } = useAppContext();

    function handleDeleteSet() {
        deleteSet(toDelteSetId);
        setIsDeleteModalOpen(false);
        setToDeleteSetId("");
    }

    function handleDeleteCard() {
        deleteCard(toDeleteCardId);
        setIsDeleteModalOpen(false);
        setToDeleteCardId("");
    }

    return (
            <>
                <div className={` { ${ isDeleteModalOpen ? "fixed" : "hidden"} } inset-0 absolute z-10 w-vw h-vh bg-transparent backdrop-blur`}></div>
                <div className={`fixed ${ isDeleteModalOpen ? "top-[30%]" : "-top-full" } z-11 -translate-x-1/2 left-1/2 transition-all overflow-hidden text-left rounded-lg max-w-[290px] shadow-xl`}>
                    <div className="p-5 bg-white dark:bg-dark-card">
                        <div className="flex mx-auto bg-red-100 justify-center items-center w-12 h-12 rounded-full">
                            <IoIosWarning size={30} color="red" />
                        </div>

                        <div className="mt-3 text-center">
                        <span className="text-gray-900 dark:text-dark-text-primary font-semibold leading-6">
                            Advertencia
                        </span>

                        <p className="mt-2 text-gray-500 dark:text-dark-text-secondary text-sm leading-5">
                            { text }
                        </p>
                        </div>

                        <div className="mt-3 mx-4 bg-transparent">
                        <button
                            type="button"
                            className="hover:bg-white hover:border-red-500 hover:text-red-500 transition-all cursor-pointer inline-flex w-full justify-center px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md border border-transparent shadow-sm"
                            onClick={ () => toDelteSetId ? handleDeleteSet() : handleDeleteCard() }
                        >
                            Aceptar
                        </button>

                        <button
                            type="button"
                            className=" hover:bg-red-500 hover:border-red-500 hover:text-white cursor-pointer transition-all inline-flex w-full justify-center mt-3 px-4 py-2 bg-white text-gray-700 text-base font-medium rounded-md border border-gray-300 shadow-sm"
                            onClick={ () => {
                                setIsDeleteModalOpen(false);
                                setToDeleteSetId("");
                            }}
                        >
                            Cancelar
                        </button>
                        </div>
                    </div>
                </div>
            </>
    );
}

export default DeleteMessage;