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

export default function Donationevents() {
  //const [date, setDate] = useState(false)
  let navigate = useNavigate();
  const [select, setselect] = useState('');
  const [search, setSearch] = useState('');
  const[id,setId]=useState('');
  // const [img, setImg] = useState('');
  const data = JSON.parse(JSON.stringify(City)).cityList
  const eventData = JSON.parse(JSON.stringify(Event)).eventList
  const handleSubmit = (e) => {

    if (e && e.preventDefault) {
      e.preventDefault();
      e.persist();
    }
  }

  const [defaultImage, setDefaultImage] = useState({});

  const handleErrorImages = (data) => {
    setDefaultImage((prev) => ({
      ...prev,
      [data.target.alt]: data.target.alt,
      linkDefault: defaultImg,
    }));
  };

  const settings1 = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1700,
        settings1: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings1: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 700,
        settings1: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },


    ],
  };

  const handleClicks = (e) => {
    return
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////
  const [donEve, setdonEve] = useState([])

  const GetdonEve = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/Event/donationevent`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setdonEve(data)
      })
  }

  useEffect(() => {
    GetdonEve()
  }, [])
  console.log(select)
  useEffect(() => {
    console.log(id, '=id adter useeffect donation'); // Log the updated id when it changes
    sessionStorage.setItem("event_id11", id)
  }, [id]);
  useEffect(() => {
    GetdonEve()
  }, [])
  //////////////////////////////////////////////////////////////////////////////////////////////////
  //let string1= "data:image/png;base64,".concat({item.Cover_pic})
  return (
    <div>
      <Navbar />

      <div className='menu-select'>
        <div>
          <form id='form' className='flex ' >
            <Select className='select-city'
              options={data}
              onChange={(e) => setselect(e.value)}
              value={data.filter(function (option) {
                // console.log(option, )
                return option.value === select;
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
      <div className='components' onClick={handleClicks}>

        <div className='event-head'>
          <h1>Organ Donation</h1>
        </div>

        {/* {eventData.map((type) => (
        <div className='subtype-1'>
          {type.subType === "Yoga" ? */}
        {donEve.length > 0 && (
          <div>
            <Slider {...settings1}>
              {donEve.filter((e) =>
              {
              // console.log("Search:", search);// Log the value of 'search'
              // console.log("Event:", e); // Log the current event object
              return (
                (select.toLowerCase() === '' ||
                  e.event_city.toLowerCase().includes(select.toLowerCase())) &&
                e.sub_type === "Organ Donation"  );
              })
                .map((item) => (
                
                  <div className='card'   key={item.event_id} onClick={() => {
                    console.log(item.event_id, '=item.event_id before setting id');
                    setId(item.event_id);
                    // sessionStorage.setItem("event_id11", item.event_id);
                    navigate('/openevent',item.event_id);
                    console.log(id , '=id after setting id')
                  }}>
                    <div className='card-top'>
                      <h2>{item.event_name}</h2>
                      {/* setImg={item.cover_pic}; */}
                      <img src={`data:image/png;base64,${item.cover_pic}`} alt={item.event_name} onError={handleErrorImages} />
                      {/* <img src= alt={item.event_name} onError={handleErrorImages} /> */}

                    </div>
                    <div className='card-bottom'>
                      <div className='card-bottom-left'>
                        <h4>{item.event_area}, {item.event_city}</h4>
                        <p>Deadline: {item.event_deadline}</p>
                      </div>
                      <div className='card-bottom-right'>
                        <p>{item.date_from}-{item.date_to}</p>
                        <p> {item.duration_from}-{item.duration_to}</p>
                      </div>
                    </div>
                  </div>

                ))}
              {/* 
              {
                console.log(eventData.filter((e)=>e.subType == "Zumba"),"5")
              } */}

            </Slider>

            <br></br>
            <div className='event-head'>
              <h1>Blood Donation</h1>
            </div>

            <Slider {...settings1}>
              {donEve.filter((e) =>
              {
                // console.log("Search:", search);// Log the value of 'search'
                // console.log("Event:", e); // Log the current event object
                return (
                  (select.toLowerCase() === '' ||
                    e.event_city.toLowerCase().includes(select.toLowerCase())) &&
                  e.sub_type === "Blood Donation"  );
                })
               .map((item) => (

                <div className='card'  key={item.event_id} onClick={() => {
                  console.log(item.event_id, '=item.event_id before setting id');
                  setId(item.event_id);
                  // sessionStorage.setItem("event_id11", item.event_id);
                  navigate('/openevent',item.event_id);
                  console.log(id , '=id after setting id')
                }}>
                  <div className='card-top'>
                    <h2>{item.event_name}</h2>
                    {/* setImg={item.cover_pic}; */}
                    <img src={`data:image/png;base64,${item.cover_pic}`} alt={item.event_name} onError={handleErrorImages} />
                    {/* <img src= alt={item.event_name} onError={handleErrorImages} /> */}

                  </div>
                  <div className='card-bottom'>
                    <div className='card-bottom-left'>
                      <h4>{item.event_area}, {item.event_city}</h4>
                      <p>Deadline: {item.event_deadline}</p>
                    </div>
                    <div className='card-bottom-right'>
                      <p>{item.date_from}-{item.date_to}</p>
                      <p> {item.duration_from}-{item.duration_to}</p>
                    </div>
                  </div>
                </div>

              ))}
              {/* 
              {
                console.log(eventData.filter((e)=>e.subType == "Zumba"),"5")
              } */}

            </Slider>




          </div>
        )}
      </div>
    </div>
  )
}
