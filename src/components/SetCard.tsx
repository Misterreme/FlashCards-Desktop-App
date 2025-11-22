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
        <div className="w-full h-full rounded-xl flex flex-col justify-between gap-10 bg-background-card p-7 shadow-sm shadow-black/20 border-gray-200 hover:scale-101 transition-all">
            <div className="w-full flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                        <p className="text-lg font-medium overflow-hidden text-ellipsis text-nowrap whitespace-nowrap mr-5">{ title }</p>
            
                        <div className="flex gap-2">
                            <FiEdit size={30} onClick={ onEdit } className="cursor-pointer rounded-md hover:bg-blue-300 p-1 transition-all" />
                            <LuTrash2 size={30} onClick={ onDelete } className="cursor-pointer rounded-md hover:bg-red-200 p-1 transition-all" />
                        </div>
                    </div>
                    
                    <p className="text-gray-500 text-base overflow-hidden text-ellipsis text-nowrap whitespace-nowrap mr-10">{ subtitle }</p>
                </div>
                <div className="flex gap-5">
                    <div className="flex gap-2 items-center">
                        <TbCards size={25} />
                        <span className="text-gray-500">{ cardsNum }</span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <IoIosCalendar size={20} />
                        <span className="text-gray-500">{ createdAt }</span>
                    </div>
                </div>
            </div>
            <button
                onClick={ onStudy }
                className={`w-full rounded-xl bg-brand-600 text-background-accent font-bold p-4 cursor-pointer hover:scale-105 active:scale-100 active:opacity-70 transition-all disabled:bg-gray-100 disabled:text-gray-400 disabled:hover:scale-100 disabled:cursor-not-allowed`}
                disabled={ isDisabled ? true : false }
                >
                    Estudiar
            </button>
        </div>
     );
}

export default SetCard;