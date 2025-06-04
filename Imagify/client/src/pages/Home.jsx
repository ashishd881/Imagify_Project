import React from 'react'
import Header from '../components/Header'
import Steps from '../components/Steps'
import Description from '../components/description'
import Testimonials from '../components/Testimonials'
import GenerateBtn from '../components/GenerateBtn'
import Footer from '../components/footer'

function Home() {
  return (
    <div>
      
      <Header/>
      <Steps/>
      <Description/>
      <Testimonials/>
      <GenerateBtn/>
      <Footer/>
    </div>
  )
}

export default Home
