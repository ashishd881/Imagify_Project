import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
function Navbar() {

    //now we will get user from Appcontext file by using useContext
    const {user,setShowLogin} = useContext(AppContext)

    const navigate = useNavigate()
  return (
    <div className='flex items-center justify-between py-4 '>
        {/* the image link will open the home page due to / */}
        <Link to='/'>
            <img src={assets.logo} alt="" className='w-28 sm:w-32 lg:w-40'/>
        </Link>

       <div>
            {user ?
            <div className='flex items-center gap-2 sm:gap-3'>
                <button onClick={()=>{navigate('/buyCredit')}} className=' cursor-pointer flex items-center gap-2 bg-blue-100 px-4 sm:px-6 sm: py-3 rounded-full hover:scale-105 transition-all duration-700'>
                    <img className='w-5 h-1/2' src={assets.credit_star}/>
                    <p>Credits Left:50</p>
                </button>
                <p className='text-gray-600 max-sm:hidden pl-4'>Hii</p>
                <div className='relative group'>
                    <img src={assets.profile_icon} className='drop-shadow h-8'/>
                    <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                        <ul className='list-none m-0 p-2 bg-white rounded-md text-sm '>
                            <li className='py-1 px-2 cursor-pointer'>
                                logout
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            :
            <div className='flex items-center gap-2 sm:gap-5'>
                <p onClick={()=>{navigate('/buyCredit')}}  className='cursor-pointer'>Pricing</p>
                <button onClick={()=>setShowLogin(true)} className='bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full'>Login</button>
            </div>}
        </div>
        
        
    </div>
  )
}

export default Navbar
