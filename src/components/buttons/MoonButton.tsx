import { RiMoonClearLine } from "react-icons/ri";

function MoonButton() {
    return (
        <div id="theme-button">
            <RiMoonClearLine size={30} className="text-black hover:scale-105 cursor-pointer transition-all" />
        </div>
    );
}

export default MoonButton