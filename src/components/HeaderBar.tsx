import Favicon from "../../public/icons/favicon.ico";
import { VscChromeMinimize } from "react-icons/vsc";
import { FaRegWindowRestore } from "react-icons/fa6";
import { TfiClose } from "react-icons/tfi";

function HeaderBar() {
    return ( 
        <header id="header-bar" className="w-full h-[5vh] min-h-[5vh] max-h-[5vh] z-999 fixed top-0">
            <div className="w-full h-full bg-brand-700 flex items-center">
                <div className="w-full h-full flex items-center gap-3 justify-between pl-5">
                    <div className="flex gap-3 items-center">
                        <img src={Favicon} className="w-8 h-8" alt="App Icon" />
                        <h2 className="font-semibold text-xl text-background-light">FlashCards</h2>
                    </div>

                    <div id="window-icons" className="h-full flex items-center">
                        <div className="hover:bg-brand-800 h-full flex items-center px-3" onClick={ () => window.electronAPI.minimize() }>
                            <VscChromeMinimize color="white" size={20} />
                        </div>
                        <div className="hover:bg-brand-800 h-full flex items-center px-4" onClick={ () => window.electronAPI.toggleMaximize() }>
                            <FaRegWindowRestore color="white" size={13} />
                        </div>
                        <div className="hover:bg-red-500 h-full flex items-center px-4" onClick={ () => window.electronAPI.close() }>
                            <TfiClose color="white" size={13} />
                        </div>
                    </div>
                </div>
            </div>
        </header>
     );
}

export default HeaderBar;