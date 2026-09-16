import { createContext, useState, useEffect, useContext } from "react";
import { axiosInstance } from "../axiosCalls/axios.js"


//public pages - like login, register, forgot password, reset password, etc - no authentication required
//private pages - like home, profile, settings, etc - authentication required  
//need to deal with two type of pages
// intuition of why we have to use context api - we have to check for the token in the cookies for each page,
// if it exists then we can show the page, else we can redirect the user to login page,
//  now the context api will help us to check for the token in the cookies for each page, 
// and if it exists then we can show the page, else we can redirect the user to login page
// because we can simply import the context api in each page and check for the token in the cookies, 
// if it exists then we can show the page, else we can redirect the user to login page
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    //Whenever use logs in, we need to verify the user identity and set the user state to the user object, so that we can use it in the private pages
    useEffect(() => { // why? - whenever the re renders, we need to check for the token in the cookies.
        axiosInstance.get('/users/me').then((response) => {
            setUser(response.data.userData)
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
    },[])
    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )

}
export const useAuth = () => useContext(AuthContext)