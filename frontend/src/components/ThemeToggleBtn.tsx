import { useTheme } from "../theme/useTheme";

export default function ThemeToggleBtn(){
    const {theme,setTheme}=useTheme();
    return (
        <button
            onClick={() =>
                setTheme(theme === "dark" ? "light" : "dark")
            }
            >
            {theme === "dark" ? "Light" : "Dark"}
        </button>
    );
}
