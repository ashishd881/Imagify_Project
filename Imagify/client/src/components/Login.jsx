import  { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets'; // Ensure correct path
import { AppContext } from '../context/AppContext';
import { motion } from "motion/react"

function Login() {

    const [state, setState] = useState('Login');
    const {setShowLogin} = useContext(AppContext) 
    useEffect(()=>{
      document.body.style.overflow = 'hidden'
      return (()=>{
        document.body.style.overflow = 'unset'
      })
    },[])

  return (
    <motion.div className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'
        initial={{ opacity: 0.2, y: 100 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, y: 0}}
        viewport={{ once: true }}>
      <form className='relative bg-white p-10 rounded-xl text-slate-500'>
        <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1> 
        <p className='text-sm'>Welcome back! Please {state} to continue</p>
        {
          state !=='Login' && 
            <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'> 
              <img src={assets.profile_icon} className='h-4 w-4' alt="" /> 
              <input type="text" className='outline-none text-sm' placeholder='Full Name' required />
            </div>
        }

        <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5'> 
          <img src={assets.email_icon} className='h-4 w-4' alt="" /> 
          <input type="email" className='outline-none text-sm' placeholder='Email' required />
        </div>
        
        <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5'> 
          <img src={assets.lock_icon} className='h-4 w-4' alt="" /> 
          <input type="password" className='outline-none text-sm' placeholder='Password' required />
        </div>

        <p className='text-sm text-blue-600 my-4 cursor-pointer'>Forget Password</p>
        <button type="submit" className=" cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-full mt-4 hover:bg-blue-600 w-full">
          {state!=='Login'?'Create Account':'Login'}
        </button>

        {state === 'Login' ? <p className='mt-5 text-center'>Don't Have an Account? <span onClick={()=>setState('Signup')} className='text-blue-700 cursor-pointer'>Sign Up</span></p>:<p className='mt-5 text-center'>Already Have an Account <span className='text-blue-700 cursor-pointer' onClick={()=>setState('Login')}>Log in</span></p>}
        
        <img onClick={()=>(setShowLogin(false))} src={assets.cross_icon} className='absolute top-5 right-5 cursor-pointer'/>
    </form>
    </motion.div>
  );
}

export default Login;
