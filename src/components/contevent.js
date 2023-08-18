import React from 'react'
import Navbar from './navbar'
import { useState, useEffect } from 'react';
import Select from "react-select";
import Event from './events.json';
import City from './cities.json';
import './events.css';
import Slider from "react-slick"
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import defaultImg from '../assets/eve3.jpg';
import { useNavigate } from "react-router-dom";


export default function Contevent() {
    const [date, setDate] = useState(false)
    const [selection, setSelection] = useState('')

    const data = JSON.parse(JSON.stringify(City)).cityList
    const eveData = JSON.parse(JSON.stringify(Event)).eventList
    const handleSubmit = (e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
            e.persist();

        }
    }

    const [defaultImage, setDefaultImage] = useState({});

    const handleErrorImage = (data) => {
        setDefaultImage((prev) => ({
            ...prev,
            [data.target.alt]: data.target.alt,
            linkDefault: defaultImg,
        }));
    };

    const settings = {
        dots: true,
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
                    dots: true,
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
    let navigate = useNavigate();
    const handleSuggest = () => {
        navigate('/uploadevent')
    }



    return (
        <div>
            <Navbar />
            <button className='btn' onClick={handleSuggest}>Suggest an event</button>

            <div className='menu-select'>
                <div>
                    <form id='form' className='flex ' >
                        <Select className='select-city'
                            options={data}
                            onChange={(e) => setSelection(e.value)}
                            value={data.filter(function (option) {
                                // console.log(option, )
                                return option.value === selection;
                            })}
                            label="Select option"
                            placeholder={"City"}
                            menuPlacement="bottom"
                        // required
                        />


                        <button className='btn3'>Search</button>

                    </form>
                </div>
            </div>
            <div className='event-head'>
                <h1>Yoga</h1>
            </div>

            {/* {eveData.map((type) => (
        <div className='subtype-1'>
          {type.subType === "Yoga" ? */}
            <Slider {...settings}>
                {eveData.filter((e) => e.subType === "Yoga").map((item) => (
                    <div className='card'>
                        <div className='card-top'>
                            <h2>{item.eventName}</h2>
                            <img src={item.image1} alt={item.eventName} onError={handleErrorImage} />

                        </div>
                        <div className='card-bottom'>
                            <div className='card-bottom-left'>
                                <h4>{item.area}, {item.city}</h4>
                                <p>Deadline: {item.deadline}</p>
                            </div>
                            <div className='card-bottom-right'>
                                <p>{item.dateFrom}-{item.dateTo}</p>
                                <p> {item.timeFrom}-{item.timeTo}</p>
                            </div>
                        </div>
                    </div>

                ))}
                {/* 
              {
                console.log(eveData.filter((e)=>e.subType == "Zumba"),"5")
              } */}

            </Slider>
            {/* :"" }
        </div>
      ))}  */}
            <br></br>
            <div className='event-head'>
                <h1>Exercise</h1>
            </div>

            <Slider {...settings}>
                {eveData.filter((e) => e.subType === "Exercise").map((item) => (
                    <div className='card'>
                        <div className='card-top'>
                            <h2>{item.eventName}</h2>
                            <img src={item.image1} alt={item.eventName} onError={handleErrorImage} />

                        </div>
                        <div className='card-bottom'>
                            <div className='card-bottom-left'>
                                <h4>{item.area}, {item.city}</h4>
                                <p>Deadline: {item.deadline}</p>
                            </div>
                            <div className='card-bottom-right'>
                                <p>{item.dateFrom}-{item.dateTo}</p>
                                <p> {item.timeFrom}-{item.timeTo}</p>
                            </div>
                        </div>
                    </div>

                ))}
                {/* 
              {
                console.log(eveData.filter((e)=>e.subType == "Zumba"),"5")
              } */}

            </Slider>

            <br></br>
            <div className='event-head'>
                <h1>Zumba</h1>
            </div>

            <Slider {...settings}>
                {eveData.filter((e) => e.subType === "Zumba").map((item) => (
                    <div className='card'>
                        <div className='card-top'>
                            <h2>{item.eventName}</h2>
                            <img src={item.image1} alt={item.eventName} onError={handleErrorImage} />

                        </div>
                        <div className='card-bottom'>
                            <div className='card-bottom-left'>
                                <h4>{item.area}, {item.city}</h4>
                                <p>Deadline: {item.deadline}</p>
                            </div>
                            <div className='card-bottom-right'>
                                <p>{item.dateFrom}-{item.dateTo}</p>
                                <p> {item.timeFrom}-{item.timeTo}</p>
                            </div>
                        </div>
                    </div>

                ))}
                {/* 
              {
                console.log(eveData.filter((e)=>e.subType == "Zumba"),"5")
              } */}

            </Slider>

            <br></br>
            <div className='event-head'>
                <h1>Meditation</h1>
            </div>

            <Slider {...settings}>
                {eveData.filter((e) => e.subType === "Meditation").map((item) => (
                    <div className='card'>
                        <div className='card-top'>
                            <h2>{item.eventName}</h2>
                            <img src={item.image1} alt={item.eventName} onError={handleErrorImage} />

                        </div>
                        <div className='card-bottom'>
                            <div className='card-bottom-left'>
                                <h4>{item.area}, {item.city}</h4>
                                <p>Deadline: {item.deadline}</p>
                            </div>
                            <div className='card-bottom-right'>
                                <p>{item.dateFrom}-{item.dateTo}</p>
                                <p> {item.timeFrom}-{item.timeTo}</p>
                            </div>
                        </div>
                    </div>

                ))}
                {/* 
              {
                console.log(eveData.filter((e)=>e.subType == "Zumba"),"5")
              } */}

            </Slider>

        </div>
    )
}
