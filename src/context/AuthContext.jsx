import { createContext } from "react";
import { loginUser , registerUser } from "../api/auth.api";
import { useState } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const [user , setUser] = useState(null)
    const [loading , setLoading] = useState(false)
    const [error , setError] = useState(null)


    const login = async (data) => {
        try {

            setLoading(true)
            setError(null)

            const response = await loginUser(data)

            const {token , user} = response.data;

            localStorage.setItem("token" , token)

            setUser(user)

            } catch (error) {

            console.log(error.message)

        } finally{

            setLoading(false)

        }
    }

    const register = async (data) => {
        try {

            setLoading(true)
            setError(null)

            await registerUser(data)
            
        } catch (error) {
            console.log(error.message)
        }
    }

    const logOut = () => {
        localStorage.removeItem("token")
        setUser(null)
    }

    return (
        <AuthContext.Provider
           value={{
            user,
            loading,
            error,
            login,
            register,
            logOut
            
           }}
        >
            {children}
        </AuthContext.Provider>
    )


}















