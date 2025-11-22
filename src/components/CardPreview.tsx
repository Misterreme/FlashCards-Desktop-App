import { FiEdit } from "react-icons/fi";
import { LuTrash2 } from "react-icons/lu";

type Props = {
    title: string,
    text: string,
    onEdit: () => void;
    onDelete: () => void;
}

function CardPreview({ title, text, onDelete, onEdit }: Props) {
    return ( 
        <div className="w-full flex justify-between border-2 border-gray-200 rounded-xl p-4 gap-2 hover:scale-102 hover:bg-gray-300/20 transition-all">
            <div className="flex-1 min-w-0">
                <span className="block text-sm text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">Frente</span>
                <p className="text-base overflow-hidden text-ellipsis text-nowrap whitespace-nowrap">{ title }</p>
            </div>
            <div className="flex-1 min-w-0">
                <span className="block text-sm text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">Reverso</span>
                <p className="text-base overflow-hidden text-ellipsis text-nowrap whitespace-nowrap">{ text }</p>
            </div>
            <div className="flex gap-2 justify-end shrink-0">
                <FiEdit size={30} onClick={ onEdit } className="cursor-pointer rounded-md hover:bg-blue-300 p-1 transition-all" />
                <LuTrash2 size={30} onClick={ onDelete } className="cursor-pointer rounded-md hover:bg-red-200 p-1 transition-all" />
            </div>
        </div>
     );
}

export default CardPreview;