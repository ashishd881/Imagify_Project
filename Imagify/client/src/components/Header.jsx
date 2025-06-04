import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from "motion/react"
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

function Header() {

    const {user,setShowLogin} = useContext(AppContext)
    const navigate = useNavigate()
    const onClickhandler=()=>{
        if(user){
            navigate('/result')
        }else{
            setShowLogin(true)
        }

    }
  return (
    <motion.div className='flex flex-col justify-center items-center text-center my-20'
        initial={{opacity:0.2, y:100}}
        transition={{duration:1}}
        whileInView={{opacity:1, y:0}}
        viewport={{once:true}}
        >
        <motion.div className='text-black inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full  border border-neutral-500'
            initial={{opacity:0, y:-20}}
            animate={{opacity:1}}
            transition={{delay:0.2 ,duration:0.8}}
        >
            <p>Best Text to image Generator</p>
            <img src={assets.star_icon}/>
        </motion.div>
        <motion.h1 className='text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center'
            > 
            Turn text to <span className='text-blue-800'>image</span> ,in seconds.
        </motion.h1>

        <p className='text-center max-w-xl mt-3'> 
            Unleash your Creativity with Ai .Turn your imagination into visual arts in seconds - just type and watch the magic happen.
        </p>
        <motion.button className='sm:text-lg text-white bg-black w-auto mt-8 py-2.5 px-7 flex gap-2 items-center rounded-full' 
            whileHover={{scale:1.05}}
            whileTap={{scale:0.95}}
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{default:{duration:0.5},opacity:{delay:0.8,duration:1}}}
            onClick={onClickhandler}>
            Generate Images
            <img className='h-6' src={assets.star_group}/>
        </motion.button>

        <motion.div className='flex gap-2 py-6'
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{delay:1,duration:1}}>
            {Array(6).fill("").map((items,index)=>(
                <motion.img className='rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10' 
                    src={index%2 ?assets.sample_img_1:assets.sample_img_2} key={index} width={70}
                        whileHover={{scale:1.05, duration:0.1}}
                    />
            ))}
        </motion.div>

        <p>Generated images from imagify!!</p>
    </motion.div>
  )
}

export default Header
