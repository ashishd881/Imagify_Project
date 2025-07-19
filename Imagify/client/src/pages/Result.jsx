  import React, { useContext, useState } from 'react'
  import { assets } from '../assets/assets'
  import { motion } from "motion/react"
  import { AppContext } from '../context/AppContext'

  function Result() {

    const [image, setImage] = useState(assets.sample_img_1)
    const [isImageLoaded,setIsImageLoaded] = useState(false)
    const [loading,setLoading] = useState(false)
    const [input, setInput] = useState('')
    const {generateImage} = useContext(AppContext)
    const onSubmitHandler = async(e) =>{
      e.preventDefault()
      setLoading(true)
      if(input){
        const image = await generateImage(input)
        setInput('')
        if(image){
          setIsImageLoaded(true)
          setImage(image)
          // console.log(image)
        }
      }
      setLoading(false)
    }
    return (
      <motion.form onSubmit={onSubmitHandler} className='flex flex-col justify-center items-center'
          initial={{ opacity: 0.2, y: 100 }}
          transition={{ duration: 1 }}
          whileInView={{ opacity: 1, y: 0}}
          viewport={{ once: true }}>
        <div>
          <div className='relative '>
            <img src={image} className='max-w-sm rounded'/>
            <span className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${loading ? 'w-full transition-all duration-[1s]':'w-0'}`}></span>
          </div>
            <p  className={!loading ? 'hidden':''}>Loading...</p>
            {!isImageLoaded && 
                <div className='flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full'>
                  <input onChange={(e)=>setInput(e.target.value) } value={input}
                  type="text" placeholder='Describe what you want to generate ' className='flex-1 bg-transparent outline-none ml-1 max-sm:w-20 '/>
                  <button type='submit' className=' text-white bg-zinc-900 sm:px-6 py-3 rounded-full placeholder-color cursor-pointer'>
                    Generate
                  </button>
                </div>
            }
            {isImageLoaded &&
              <div className='flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full'>
                <p onClick={()=>{setIsImageLoaded(false)}} className='bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer'>Generate Another</p>
                <a href={image} download="image.png" className='bg-zinc-900 px-10 py-3 rounded-full cursor-pointer '>Download</a>
                {/* The download attribute in the <a> (anchor) tag in HTML is used to tell the browser to download the linked resource instead of navigating to it. */}
                {/* <img src={image} alt="Generated" className="max-w-sm rounded mt-4" /> */}
 

              </div>
            }
        </div>
      
      </motion.form>
    )
  }

  export default Result
