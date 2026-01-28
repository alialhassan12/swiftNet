import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

type Theme = "light" | "dark";

export const ThemeContext = createContext({
    theme: "light" as Theme,
    setTheme: (_: Theme) => {}
});

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>(
        () => (localStorage.getItem("theme") as Theme) || "light"
    );

    useEffect(() => {
        const html = document.documentElement;

        if (theme === "dark") {
        html.classList.add("dark");
        } else {
        html.classList.remove("dark");
        }

        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
        {children}
        </ThemeContext.Provider>
    );
}
