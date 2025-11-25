import { LuTrash2 } from "react-icons/lu";
import { FiEdit } from "react-icons/fi";
import { TbCards } from "react-icons/tb";
import { IoIosCalendar } from "react-icons/io";

type Props = {
    title: string,
    subtitle: string,
    cardsNum?: number,
    createdAt: string,
    onDelete: () => void;
    onEdit: () => void;
    onStudy: () => void;
    isDisabled: boolean
}

function SetCard({ title, subtitle, cardsNum, createdAt, onDelete, onEdit, onStudy, isDisabled }: Props) {

    return ( 
        <div className="w-full h-full rounded-xl flex flex-col justify-between gap-10 bg-background-card dark:bg-dark-card p-7 shadow-black/20 border-gray-200 hover:scale-101 transition-all shadow-xl">
            <div className="w-full flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                        <p className="text-lg font-medium overflow-hidden text-ellipsis text-nowrap whitespace-nowrap mr-5 text-dark dark:text-white">{ title }</p>
            
                        <div className="flex gap-2">
                            <FiEdit size={30} onClick={ onEdit } className="dark:text-dark-text-primary cursor-pointer rounded-md hover:bg-blue-300 dark:hover:bg-blue-500 p-1 transition-all" />
                            <LuTrash2 size={30} onClick={ onDelete } className="dark:text-dark-text-primary cursor-pointer rounded-md hover:bg-red-200 dark:hover:bg-red-500 p-1 transition-all" />
                        </div>
                    </div>
                    
                    <p className="text-gray-500 dark:text-dark-text-secondary text-base overflow-hidden text-ellipsis text-nowrap whitespace-nowrap mr-10">{ subtitle }</p>
                </div>
                <div className="flex gap-5">
                    <div className="flex gap-2 items-center">
                        <TbCards size={25} className="dark:text-white" />
                        <span className="text-gray-500 dark:text-dark-text-secondary">{ cardsNum }</span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <IoIosCalendar size={20} className="dark:text-white" />
                        <span className="text-gray-500 dark:text-dark-text-secondary">{ createdAt }</span>
                    </div>
                </div>
            </div>
            <button
                onClick={ onStudy }
                className={`w-full rounded-xl bg-brand-600 text-background-accent shadow-xl font-bold p-4 cursor-pointer hover:scale-105 active:scale-100 active:opacity-70 transition-all disabled:bg-gray-100 dark:disabled:bg-gray-700 dark:disabled:text-dark-text-primary disabled:text-gray-400 disabled:hover:scale-100 disabled:cursor-not-allowed`}
                disabled={ isDisabled ? true : false }
                >
                    Estudiar
            </button>
        </div>
     );
}

export default SetCard;