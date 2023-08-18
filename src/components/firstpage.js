import React from 'react'
import Navbar1 from './navbar1'
import imageSlide from './images';
import bgImg from '../assets/bg1.png';
import bgImg2 from '../assets/bg2.png';
import Slider from "react-slick"
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Button } from 'react'

export default function Home() {
  return (
    <>
      <div >
        <Navbar1 />

        <div className='bgImg'>
          {/* <img src={bgImg}></img> */}
          <img src={bgImg} className="d-block w-100" alt="..."/>
        </div>
        <div>

        </div>
      </div>
    </>

  )
}
