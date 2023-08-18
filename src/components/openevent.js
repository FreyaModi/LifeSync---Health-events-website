import React, { useState, useEffect } from 'react'
import Navbar from './navbar'
import './openevent.css'
import Slider from "react-slick"
import Images from './eveImg.json';
import Event from './events.json';
import { useNavigate } from "react-router-dom";

import axios from 'axios';



export default function Openevent() {
  let navigate = useNavigate();
  const img = JSON.parse(JSON.stringify(Images)).image
  const settings = {
    // dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
          infinite: true,
          // dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },


    ],
  };
  ////////////////////////////////////////////////////////
  const [event, setEvent] = useState([])

  const GetfeedbackEve = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/Event/openevent?id=${sessionStorage.getItem("event_id11")}`)

      .then(response => {
        return response.json()
      })
      .then(data => {
        setEvent(data)
      })
  }

  useEffect(() => {
    GetfeedbackEve()
  }, [])
  ////////////////////////////////////////////////////////
 const handleOnClick=async()=>{
  navigate('/toc');
  const data = {
    "Event_id": sessionStorage.getItem("event_id11"),
    "User_id": sessionStorage.getItem("userid"),

  };

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  try {
    console.log(process.env.REACT_APP_API_URL, "uyuy");
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/Event/booked`, data, { headers });
    
    // Handle the response data here
    console.log('Response:', response.data);

  } catch (error) {
    // Handle error responses here
    console.error('Error:', error);
  }
 }
  return (
    <>
      <div>
        <Navbar />
        <div>
          {event.map((item, j) => (
            <div key={j} className='event-container'>
              <div className='rowNo-1'>
                {item.event_name}
              </div>
              <h2>Organized by {item.event_org}</h2>
              <div className='rowNo-2'>
                <div>
                  <Slider {...settings}>
                    {img.map((imgItem) => (
                      <div className='cards' key={imgItem.id}>
                        <div className='cards-top'>
                          <h2>{imgItem.eventName}</h2>
                          <img src={imgItem.imageLink} alt={imgItem.eventName} />
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
              <div>
                <div className='info'>
                  <div className='info col-1'>
                    <p><b>Date: </b> {item.date_from} - {item.date_to} </p>
                    <p><b>Timings: </b> {item.duration_from} - {item.duration_to}</p>
                    <p><b>Description: </b></p>
                    <p>
                      Lorem ipsum, or lipsum as it is sometimes known, is dummy text used
                      in laying out print, graphic, or web designs. The passage is
                      attributed to an unknown typesetter in the 15th century who is
                      thought to have scrambled parts of Cicero's De Finibus Bonorum et
                      Malorum for use in a type specimen book.
                    </p>
                  </div>
                  <div className='infocol-2'>
                    <p><b>Location:</b> {item.event_address}, {item.event_area}, {item.event_city}</p>
                    <p><b>Organ you want to donate:</b></p>
                    <input type='text' placeholder='Organ Name' />
                  </div>
                </div>
                <button className='bookeve' onClick={handleOnClick} style={{cursor:"pointer"}}>Book Event !</button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </>
  )
}
