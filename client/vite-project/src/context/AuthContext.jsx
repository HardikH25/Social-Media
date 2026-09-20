import { createContext, useContext, useEffect, useState } from "react";
import { axiosInstance } from "../axiosCalls/axios.js";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {//cannot use async in useeffect and cannot wrap   a useeffect inside a function
        const fetchUser = async () => {
            try {
                const res = await axiosInstance.get('/users/me');
                setUser(res.data.userData);
            } catch (err) {
                console.log(err);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext);