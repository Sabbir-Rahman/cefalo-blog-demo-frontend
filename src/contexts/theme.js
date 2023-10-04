import { createContext, useContext } from "react";

export const ThemeContext = createContext({
    currentTheme: "dark",
    applyDarkTheme: ()=> {},
    applyLightTheme: ()=> {},
})

export const ThemeProvider = ThemeContext.Provider

export default function useTheme(){
    return useContext(ThemeContext)
}