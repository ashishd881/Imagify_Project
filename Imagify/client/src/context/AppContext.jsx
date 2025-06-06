import React, { useState } from 'react'
import { createContext } from 'react'
//here we will create a context to access the variables and functions in any component

export const AppContext = createContext()
//for Context file we create app providerfunction

const AppContextProvider = (props)=>{
    const [user,setUser] = useState(false)
    const [showLogin, setShowLogin] = useState(false);
    //this has been made after backend is coded
    const [token , setToken] = useState(localStorage.getItem('token'))    //if theree is any token available in the browser localstorage it will get stored in the token
    const [credit, setCredit] = useState(false)
    
    const backendUrl =  import.meta.env.VITE_BACKEND_URL
    
    const value = {
        user, setUser,showLogin,setShowLogin,backendUrl,token,setToken,credit,setCredit
    }

    return(
        // AppContext.provider ki value me upar wala value object pass kar diya
        <AppContext.Provider value={value}>   
            {props.children}
        </AppContext.Provider>
    )
}

export default  AppContextProvider
