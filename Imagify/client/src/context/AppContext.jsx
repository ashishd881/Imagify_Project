import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
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
    
    const navigate = useNavigate()
    const loadCreditsData = async()=>{
        try {
            const {data} = await axios.get(backendUrl+ '/api/user/credits',{headers:{token}})
            // console.log(data)
            if(data.success){
                setCredit(data.credits)          //backend me credits hai credit show karne ke liye
                setUser(data.user)
                // console.log("good")
                // console.log(data.credits)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const generateImage = async (prompt)=>{
        try {
            console.log("gppf")
            const {data} = await axios.post(backendUrl+'/api/image/generate-Image',{prompt},{headers:{token}})  //curly braces lag ake prompt bejh diya
            if(data.success){
                loadCreditsData()
                console.log(data)
                return data.resultImage
            }
            else{
                toast.error(data.message)
                loadCreditsData()
                if(data.creditBalance === 0){
                    navigate('/buyCredit')
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const logout = ()=>{
        localStorage.removeItem('token');
        setToken('')
        setUser(null)
    }
    useEffect(()=>{
        if(token)
            loadCreditsData()
    },[token])

    const value = {
        user, setUser,showLogin,setShowLogin,backendUrl,token,setToken,credit,setCredit,loadCreditsData,logout,generateImage
    }

    return(
        // AppContext.provider ki value me upar wala value object pass kar diya
        <AppContext.Provider value={value}>   
            {props.children}
        </AppContext.Provider>
    )
}

export default  AppContextProvider
