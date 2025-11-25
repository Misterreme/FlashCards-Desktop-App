import { TiWeatherSunny } from "react-icons/ti";
import { BsMoonStars } from "react-icons/bs";
import useTheme from "../../hooks/useTheme";

function ToggleThemeButton() {
    const { theme, toggleTheme } = useTheme();

    return (
        <div id="theme-button" onClick={ toggleTheme }>
            {
                theme === "light" 
                ? <TiWeatherSunny key="sun" size={30} className="text-white hover:scale-105 cursor-pointer transition-all icon-animate" />
                : <BsMoonStars key="moon" size={20} strokeWidth={0.5} className="text-white hover:scale-105 cursor-pointer transition-all icon-animate" />
            }
        </div>
    );
}

export default ToggleThemeButton;