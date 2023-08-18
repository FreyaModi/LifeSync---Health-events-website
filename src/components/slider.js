import React, { useState } from 'react'
import './slider.css'
import bgImg from '../assets/bg1.png';
import bgImg2 from '../assets/bg2.png';
import imageSlide from './images';



export default function Slider() {

  const goToNext=()=>{
    setCurrentState(currentState)
  }
  const[currentState,setCurrentState]=useState(0)
  const bgImageStyle={
    backgroundImage:`url(${imageSlide[currentState].url})`,
    backgroundSize: 'cover',
    height: '896px'
    
  }
  return (
    <div className='container-style'>
      <div style={bgImageStyle}></div>
      <div className='slides-img'>
    {
    imageSlide.map((imageSlide,currentState)=>{
      <span key={currentState} onClick={()=>goToNext(currentState)}>hiiii</span>
    })
    }

        
      </div>
     
    </div>
  
  )
}
