import React, { useContext } from 'react'
import { assets, plans } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from "motion/react"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

function BuyCredit() {

  const {user,backendUrl,loadCreditsData,token,setShowLogin} = useContext(AppContext)   //app context se use lo le aaye
  const navigate = useNavigate()
  const initPay =async (order)=>{
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name:'Credits payment',
      description:'Credits Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async(response)=>{
        try {
          const { razorpay_order_id } = response;
          // console.log(razorpay_order_id)
          // console.log("goodies")
          const {data} = await axios.post(backendUrl+'/api/user/verify-razor',{ razorpay_order_id },{headers:{token}})
          // console.log(data)
          if(data.success){
            loadCreditsData();
            navigate('/')
            toast.success("Credit Added")
          }
        } catch (error) {
          console.log("yaha se error aa rhai hai")
      console.log(error.message)
          toast.error(error.message)
        }

      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }
  const paymentRazorpay = async(planId)=>{
    try {
      if(!user)
      {
        setShowLogin(true)
      }
      const {data} = await axios.post(backendUrl+ '/api/user/pay-razor',{planId},{headers:{token}})
      console.log(data)
      
      if(data.success){
        initPay(data.order)
      }
    
    } catch (error) {
      // console.log("good")
      // console.log(error.message)
      toast.error(error.message)
    }
  }
  
  return (
    <motion.div className='min-h-[80vh] text-center pt-14 mb-10'
        initial={{ opacity: 0.2, y: 100 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, y: 0}}
        viewport={{ once: true }}>
        <button className='border border-gray-400 px-10 py-2 rounded-full mb-6'>Our Plans</button>
        <h1 className='text-center mb-4'>Choose The Plan</h1>
        <div className='flex flex-wrap justify-center gap-6 text-left'>
            {plans.map((item,index)=>(
              <div key={index} className='bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500'>
                <img src={assets.logo_icon}/>
                <p className='mt-3 mb-1 font-semibold '>{item.id}</p>
                <p className='text-sm'>{item.desc}</p>
                <p className='mt-6'>
                    <span className='text-3xl font-medium'>₹{item.price}</span> / {item.credits} credits</p>
                <button onClick={()=>paymentRazorpay(item.id)} className='w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52 cursor-pointer'>{user ? 'Purchase' : 'Get Started'}</button>
              </div>
            ))}
        </div>
        
    </motion.div>
  )
}

export default BuyCredit
