import React, { useState } from 'react'
import { createContext } from 'react'
//here we will create a context to access the variables and functions in any component

export const AppContext = createContext()
//for Context file we create app providerfunction

const AppContextProvider = (props)=>{
    const [user,setUser] = useState(false)
    const [showLogin, setShowLogin] = useState(false);
    const value = {
        user, setUser,showLogin,setShowLogin
    }

    return(
        // AppContext.provider ki value me upar wala value object pass kar diya
        <AppContext.Provider value={value}>   
            {props.children}
        </AppContext.Provider>
    )
}

export default  AppContextProvider
