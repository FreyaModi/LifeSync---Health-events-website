import React from 'react'
import Navbar from './navbar'
import imageSlide from './images.json';
import bgImg from '../assets/bg1.png';
import bgImg2 from '../assets/bg2.png';
import Slider from "react-slick"
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Button } from 'react'
import './events.css';

export default function Home() {
  const imageData = JSON.parse(JSON.stringify(imageSlide)).images
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
      };

      

  return (
    <>
      <div >
        <Navbar />

        <div className='bgImg'>
          {/* <img src={bgImg}></img> */}
          <Slider {...settings}> 
          {imageData.map((item) => (
             <div className='card-top-2'>
           <img src={item.imageLink}  />
           </div>
          ))}
          </Slider>
        </div>
        <div>

        </div>
      </div>
    </>

  )
}
