import { createContext, useContext } from "react";

export const AuthContext = createContext()

export const AuthContextProvider = AuthContext.Provider

export default function useAuthContext(){
    return useContext(AuthContext)
}