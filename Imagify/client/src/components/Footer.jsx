import React from 'react'
import { assets } from '../assets/assets'

function Footer() {
  return (
    <div className='flex items-center justify-between gap-4 py-3 mt-10 mb-20'>
        <img src={assets.logo} width={150}/>
        <p className='flex-1  pl-4 text-sm text-gray-500 max-sm:hidden'>
            Copyright || All rights Reserved
        </p>
        <div className='flex gap-2 '>
            <img src={assets.facebook_icon} width={35}/>
            <img src={assets.twitter_icon} width={35}/>
            <img src={assets.instagram_icon} width={35}/>
        </div>
    </div>
  )
}

export default Footer
