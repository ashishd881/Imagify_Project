import React from 'react'
import Header from '../components/Header'
import Steps from '../components/Steps'
import Description from '../components/Description'       //this is givieng error here but we commited and made it capital so that it runs render
import Testimonials from '../components/Testimonials'
import GenerateBtn from '../components/GenerateBtn'
import Footer from '../components/Footer'

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
