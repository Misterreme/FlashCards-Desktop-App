import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import { useAppContext } from "../../context/AppContext";

type Props = {
    text: string
}

function ErrorMessage({ text }: Props) {

    const { setError, setCardError } = useAppContext();

    return (
        <div className={`fixed ${ text ? "top-20" : "-top-full" } -translate-x-1/2 left-1/2 transition-all max-w-md mx-auto p-4 border border-white rounded-lg bg-linear-to-b from-red-100 to-red-50 flex items-start space-x-3 shadow-md`}>
            <div className="shrink-0">
                <div className="w-10 h-10 flex items-center justify-center bg-white border border-red-300 rounded-full">
                    <span className="text-red-500">
                        <MdOutlineReportGmailerrorred size={25} />
                    </span>
                </div>
            </div>
            <div>
                <h3 className="text-lg font-semibold text-gray-900">¡Error!</h3>
                <p className="text-gray-700 text-sm">
                    { text }
                </p>
            </div>
            <div onClick={ () => {
                        setError("");
                        setCardError("");
                    }}>
                <TiDelete size={30} color="red" className="cursor-pointer" />
            </div>
        </div>
    );
}

export default ErrorMessage;