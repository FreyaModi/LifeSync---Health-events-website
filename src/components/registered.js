import React from 'react'
import Event from './events.json';
import './registered.css'
import Navbar from './navbar';
import {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';


export default function Registered() {
  let navigate = useNavigate();
    const eveData = JSON.parse(JSON.stringify(Event)).eventList
/////////////////////////////////////////////////////////////////
const [regEve, setRegEve] = useState([])

const GetRegEve = () => {
  fetch(`${process.env.REACT_APP_API_URL}/api/Event/registeredevent?id=` + sessionStorage.getItem("userid"))
    .then(response => {
      return response.json()
    })
    .then(data => {
      setRegEve(data)
    })
}
const handleclick=()=>{
  navigate('/feedback')
}
useEffect(() => {
  GetRegEve()
}, [])
  //////////////////////////////////////////////////////////////
    const itemsInRows = [];
    for (let i = 0; i < regEve.length; i += 3) {
      itemsInRows.push(regEve.slice(i, i + 3));
    }


  return (
    <div>
        <Navbar/>
        <div>
        <div className='fieldselect'>
                <br></br>
                <button className='btn-21' > Registered Events </button>
                <button className='btn-12' onClick={handleclick}> Attended Events</button>
            </div>
        </div>
        <div className='grid'>
        {itemsInRows.map((rowItems, rowIndex) => (
            <div  key={rowIndex} className='rowindex'>
        {rowItems.map((item) => (
          <div className='colindex'>
           <div className='cards'>
           <div className='cards-top'>
             <h2>{item.event_name}</h2>
               {/* setImg={item.cover_pic}; */}
             <img  src={`data:image/png;base64,${item.cover_pic}`} alt={item.event_name}  />
             {/* <img src= alt={item.event_name} onError={handleErrorImage} /> */}

           </div>
           <div className='cards-bottom'>
             <div className='cards-bottom-left'>
               <h4>{item.event_area}, {item.event_city}</h4>
               <p>Deadline: {item.event_deadline}</p>
             </div>
             <div className='cards-bottom-right'>
               <p>{item.date_from}-{item.date_to}</p>
               <p> {item.duration_from}-{item.duration_to}</p>
             </div>
           </div>
         </div>
         </div>
        ))}
        </div>
        ))}
        </div>
    </div>
  )
}
